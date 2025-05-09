import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

// Configuración de Firebase con tus datos
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
const provider = new GoogleAuthProvider();

// Función para iniciar sesión con Google
function loginUser() {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("✅ Usuario autenticado:", result.user);
      window.location.href = "chat.html"; // Redirigir al chat después de iniciar sesión
    })
    .catch((error) => {
      console.error("🚨 Error al iniciar sesión:", error.message);
    });
}

// Verifica que el botón existe antes de asignarle el evento
const loginButton = document.getElementById("loginButton");
if (loginButton) {
  loginButton.addEventListener("click", loginUser);
}

// Función para cerrar sesión
function logoutUser() {
  signOut(auth)
    .then(() => {
      console.log("✅ Usuario cerró sesión.");
      window.location.href = "index.html"; // Redirigir al inicio
    })
    .catch((error) => {
      console.error("🚨 Error al cerrar sesión:", error.message);
    });
}

// Verifica que el botón existe antes de asignarle el evento
const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
  logoutButton.addEventListener("click", logoutUser);
}

// Verificación de autenticación en tiempo real
onAuthStateChanged(auth, (user) => {
  const nicknameElement = document.getElementById("nickname");
  if (nicknameElement) {
    nicknameElement.textContent = user ? user.displayName || "Usuario sin nombre" : "Invitado";
  }
});
