import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyCalxt34jrPFP9VJM5yBFA4BRF2U1_XiZw",
    authDomain: "michatprivado-f704a.firebaseapp.com",
    projectId: "michatprivado-f704a",
    storageBucket: "michatprivado-f704a.appspot.com",
    messagingSenderId: "187774286181",
    appId: "1:187774286181:web:95fc9391a64d3d244e498c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function sendMessage() {
    const user = auth.currentUser;
    if (!user) {
        alert("❌ Debes estar autenticado para enviar mensajes.");
        return;
    }

    const message = document.getElementById("message").value.trim();
    if (!message) {
        alert("❌ El mensaje no puede estar vacío.");
        return;
    }

    try {
        await addDoc(collection(db, "messages"), {
            userId: user.uid,
            message: message,
            timestamp: new Date()
        });
        alert("✅ Mensaje enviado correctamente.");
        document.getElementById("message").value = "";
    } catch (error) {
        console.error("Error al enviar mensaje:", error);
        alert("❌ Error al enviar mensaje: " + error.message);
    }
}

window.sendMessage = sendMessage;
