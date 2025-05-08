// 🔥 Importación de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

// ✅ Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCalxt34jrPFP9VJM5yBFA4BRF2U1_XiZw",
    authDomain: "michatprivado-f704a.firebaseapp.com",
    projectId: "michatprivado-f704a",
    storageBucket: "michatprivado-f704a.appspot.com",
    messagingSenderId: "187774286181",
    appId: "1:187774286181:web:95fc9391a64d3d244e498c"
};

// 🔥 Inicialización de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// 🔥 Manejo de autenticación
onAuthStateChanged(auth, user => {
    if (user && user.displayName) {
        console.log("✅ Usuario autenticado:", user.displayName);
        setDoc(doc(db, "users", user.uid), {
            nickname: user.displayName,
            email: user.email,
            online: true,
            userId: user.uid
        }, { merge: true });

        if (!window.location.href.includes("chat.html")) {
            window.location.replace("chat.html");
        }
    } else {
        console.log("❌ No hay usuario autenticado, redirigiendo a login...");
    }
});

// 🔥 Función de inicio de sesión
function loginUser() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            console.log("✅ Usuario autenticado:", userCredential.user);
            window.location.replace("chat.html");
        })
        .catch(error => {
            console.error("❌ Error en login:", error.message);
            alert("❌ Error al iniciar sesión: " + error.message);
        });
}
window.loginUser = loginUser;
