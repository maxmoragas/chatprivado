import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc, orderBy, query, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "michatprivado.firebaseapp.com",
    projectId: "michatprivado",
    storageBucket: "michatprivado.appspot.com",
    messagingSenderId: "TU_MESSAGING_ID",
    appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

document.addEventListener("DOMContentLoaded", function () {
    onAuthStateChanged(auth, user => {
        if (!user) {
            alert("❌ Error: Usuario no autenticado.");
            window.location.replace("login.html");
            return;
        }

        document.getElementById("enviar").addEventListener("click", async () => {
            const mensajeTexto = document.getElementById("mensaje").value.trim();
            if (!mensajeTexto) return;

            await addDoc(collection(db, "mensajes"), {
                usuario: user.displayName,
                mensaje: mensajeTexto,
                timestamp: new Date()
            });

            document.getElementById("mensaje").value = "";
        });
    });
});
