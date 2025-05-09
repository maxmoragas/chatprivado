import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";


// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCalxt34jrPFP9VJM5yBFA4BRF2U1_XiZw",
    authDomain: "michatprivado-f704a.firebaseapp.com",
    projectId: "michatprivado-f704a",
    storageBucket: "michatprivado-f704a.appspot.com",
    messagingSenderId: "187774286181",
    appId: "1:187774286181:web:95fc9391a64d3d244e498c"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Registro de usuarios
document.getElementById("registerButton").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("✅ Usuario registrado con éxito:", userCredential.user);
            alert("Registro exitoso");
        })
        .catch((error) => {
            console.error("🚨 Error en el registro:", error.message);
            alert("Error en el registro: " + error.message);
        });
});

// Inicio de sesión
document.getElementById("loginButton").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("✅ Sesión iniciada correctamente:", userCredential.user);
            alert("Login exitoso");
        })
        .catch((error) => {
            console.error("🚨 Error en el login:", error.message);
            alert("Error en el login: " + error.message);
        });
});
