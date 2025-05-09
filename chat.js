// Importar Firebase correctamente
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database-compat.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth-compat.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage-compat.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCalxt34jrPFP9VJM5yBFA4BRF2U1_XiZw",
    authDomain: "michatprivado-f704a.firebaseapp.com",
    databaseURL: "https://michatprivado-f704a-default-rtdb.firebaseio.com",
    projectId: "michatprivado-f704a",
    storageBucket: "michatprivado-f704a.appspot.com",
    messagingSenderId: "187774286181",
    appId: "1:187774286181:web:95fc9391a64d3d244e498c"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Verificar usuario autenticado
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("nickname").innerText = "LLA Bragado";
    } else {
        window.location.href = "index.html"; // Redirigir si no está autenticado
    }
});

// Referencia al chat en Firebase
const chatRef = ref(db, "chat");

// Enviar mensaje de texto
document.getElementById("sendMessage").addEventListener("click", () => {
    const message = document.getElementById("messageInput").value;
    if (message.trim() !== "") {
        push(chatRef, {
            user: "LLA Bragado",
            message: message,
            timestamp: Date.now()
        });
        document.getElementById("messageInput").value = "";
    }
});

// Enviar imagen
document.getElementById("fileInput").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const fileRef = storageRef(storage, "uploads/" + file.name);
        uploadBytes(fileRef, file).then(() => {
            getDownloadURL(fileRef).then((url) => {
                push(chatRef, {
                    user: "LLA Bragado",
                    image: url,
                    timestamp: Date.now()
                });
            });
        });
    }
});

// Mostrar mensajes en el chat
onChildAdded(chatRef, (snapshot) => {
    const data = snapshot.val();
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");

    if (data.message) {
        messageElement.innerHTML = `<strong>${data.user}:</strong> ${data.message}`;
    } else if (data.image) {
        messageElement.innerHTML = `<strong>${data.user}:</strong> <img src="${data.image}" alt="Imagen enviada" style="max-width: 200px;">`;
    }

    messageElement.classList.add(data.user === "LLA Bragado" ? "sent" : "received");
    document.getElementById("chatBox").appendChild(messageElement);
});

// Cerrar sesión
document.getElementById("logoutButton").addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    });
});
