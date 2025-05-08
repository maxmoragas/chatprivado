import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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

function registerUser() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
            window.location.replace("login.html");
        })
        .catch(error => {
            alert("❌ Error al registrar: " + error.message);
        });
}

function loginUser() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.replace("chat.html");
        })
        .catch(error => {
            alert("❌ Error al iniciar sesión: " + error.message);
        });
}

window.registerUser = registerUser;
window.loginUser = loginUser;
