import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";
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
const storage = getStorage(app);

document.getElementById("enviar").addEventListener("click", sendMessage);

async function sendMessage() {
    const user = auth.currentUser;
    if (!user) {
        alert("❌ Debes estar autenticado para enviar mensajes.");
        return;
    }

    const message = document.getElementById("mensaje").value.trim();
    const file = document.getElementById("imagen").files[0];

    if (!message && !file) {
        alert("❌ Debes ingresar un mensaje o seleccionar una imagen.");
        return;
    }

    let imageUrl = null;

    if (file) {
        const storageRef = ref(storage, `images/${user.uid}/${file.name}`);
        try {
            await uploadBytes(storageRef, file);
            imageUrl = await getDownloadURL(storageRef);
        } catch (error) {
            console.error("Error al subir imagen:", error);
            alert("❌ Error al subir imagen: " + error.message);
            return;
        }
    }

    try {
        await addDoc(collection(db, "messages"), {
            userId: user.uid,
            message: message ? message : "📷 Imagen enviada",
            imageUrl: imageUrl,
            timestamp: new Date()
        });

        alert("✅ Mensaje enviado correctamente.");
        document.getElementById("mensaje").value = "";
        document.getElementById("imagen").value = "";
    } catch (error) {
        console.error("Error al enviar mensaje:", error);
        alert("❌ Error al enviar mensaje: " + error.message);
    }
}

function loadMessages() {
    const messagesRef = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    onSnapshot(messagesRef, (snapshot) => {
        const mensajesDiv = document.getElementById("mensajes");
        mensajesDiv.innerHTML = "";

        snapshot.forEach((doc) => {
            const data = doc.data();
            const msgElement = document.createElement("p");
            msgElement.textContent = data.message;

            if (data.imageUrl) {
                const imgElement = document.createElement("img");
                imgElement.src = data.imageUrl;
                imgElement.style.maxWidth = "200px";
                mensajesDiv.appendChild(imgElement);
            }

            mensajesDiv.appendChild(msgElement);
        });
    });
}

window.sendMessage = sendMessage;
loadMessages();
