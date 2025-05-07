import { getFirestore, collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";

const db = getFirestore();
let usersOnline = [];
let currentNickname = localStorage.getItem("nickname");

// Verificar autenticación antes de entrar al chat
if (!currentNickname) {
    window.location.href = "login.html"; // Redirigir si no está autenticado
} else {
    document.getElementById("nickname").innerText = currentNickname;
    usersOnline.push(currentNickname);
    updateUsers();
}

// Función para actualizar la lista de usuarios en línea
function updateUsers() {
    document.getElementById("users").innerHTML = "Usuarios en línea: " + usersOnline.join(", ");
}

// Función para enviar mensajes y guardarlos en Firebase
async function sendMessage(event) {
    if (event.key === "Enter") {
        sendMessageManual();
    }
}

async function sendMessageManual() {
    let messageInput = document.getElementById("input");
    let message = messageInput.value.trim();
    
    if (currentNickname !== "" && message !== "") {
        try {
            await addDoc(collection(db, "mensajes"), {
                nickname: currentNickname,
                texto: message,
                timestamp: new Date()
            });

            messageInput.value = ""; // Limpiar el input después de enviar
        } catch (error) {
            console.error("Error al guardar mensaje:", error);
        }
    }
}

// Función para mostrar mensajes en tiempo real desde Firebase
onSnapshot(collection(db, "mensajes"), (snapshot) => {
    let chatBox = document.getElementById("chat");
    chatBox.innerHTML = ""; // Limpiar el chat antes de mostrar mensajes actualizados

    snapshot.forEach(doc => {
        let data = doc.data();
        chatBox.innerHTML += `<p><strong>${data.nickname}:</strong> ${data.texto}</p>`;
    });
});

// Función para cerrar sesión
function logout() {
    localStorage.removeItem("nickname");
    window.location.href = "login.html"; // Redirigir al login
}
