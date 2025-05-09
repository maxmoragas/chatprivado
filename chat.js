// Conectar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database-compat.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth-compat.js";

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

// Verificar usuario autenticado
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("nickname").innerText = user.email;
    } else {
        window.location.href = "index.html"; // Redirigir si no está autenticado
    }
});

// Referencia al chat en Firebase
const chatRef = ref(db, "chat");

// Enviar mensaje
document.getElementById("sendMessage").addEventListener("click", () => {
    const message = document.getElementById("messageInput").value;
    if (message.trim() !== "") {
        push(chatRef, {
            user: auth.currentUser.email,
            message: message,
            timestamp: Date.now()
        });
        document.getElementById("messageInput").value = "";
    }
});

// Mostrar mensajes en el chat
onChildAdded(chatRef, (snapshot) => {
    const data = snapshot.val();
    const messageElement = document.createElement("p");
    messageElement.innerHTML = `<strong>${data.user}:</strong> ${data.message}`;
    document.getElementById("chatBox").appendChild(messageElement);
});

// Cerrar sesión
document.getElementById("logoutButton").addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    });
});
