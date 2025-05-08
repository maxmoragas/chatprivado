import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCalxt34jrPFP9VJM5yBFA4BRF2U1_XiZw",
    authDomain: "michatprivado-f704a.firebaseapp.com",
    projectId: "michatprivado-f704a",
    storageBucket: "michatprivado-f704a.appspot.com",
    messagingSenderId: "187774286181",
    appId: "1:187774286181:web:95fc9391a64d3d244e498c"
};

const app = initializeApp(firebaseConfig);
console.log("🔥 Firebase inicializado correctamente:", app);

const auth = getAuth(app);

function registerUser() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("❌ Debes ingresar un correo y una contraseña válidos.");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
            window.location.replace("login.html");
        })
        .catch(error => {
            console.error("Error al registrar:", error);
            alert("❌ Error al registrar: " + error.message);
        });
}

function loginUser() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("❌ Debes ingresar un correo y una contraseña válidos.");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.replace("chat.html");
        })
        .catch(error => {
            console.error("Error al iniciar sesión:", error);
            alert("❌ Error al iniciar sesión: " + error.message);
        });
}

window.registerUser = registerUser;
window.loginUser = loginUser;
