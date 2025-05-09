import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

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
const provider = new GoogleAuthProvider();

// Manejo de autenticación y redirección
document.getElementById("loginButton").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Usuario autenticado:", result.user);
      actualizarNickname(result.user);
      window.location.href = "chat.html"; // Redirigir después de iniciar sesión
    })
    .catch((error) => {
      console.error("Error al iniciar sesión:", error);
    });
});

document.getElementById("logoutButton").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("Usuario cerró sesión.");
      document.getElementById("nickname").textContent = "Invitado";
      window.location.href = "index.html"; // Redirigir al cerrar sesión
    })
    .catch((error) => {
      console.error("Error al cerrar sesión:", error);
    });
});

// Actualizar nickname en la interfaz
function actualizarNickname(user) {
  const nicknameElement = document.getElementById("nickname");
  if (user) {
    nicknameElement.textContent = user.displayName || "Usuario sin nombre";
  } else {
    nicknameElement.textContent = "Invitado";
  }
}

// Verificación de estado de autenticación
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuario autenticado automáticamente:", user);
    actualizarNickname(user);
  } else {
    console.log("No hay usuario autenticado.");
    document.getElementById("nickname").textContent = "Invitado";
  }
});
