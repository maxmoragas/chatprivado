// Configura Firebase
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Función para registrar usuario con email, contraseña y nickname
async function registerUser(email, password, nickname) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Guarda el nickname en el perfil de Firebase Authentication
        await updateProfile(user, { displayName: nickname });

        // También guardamos el nickname en Firestore
        await setDoc(doc(db, "users", user.uid), { nickname });

        console.log("Usuario registrado con nickname:", nickname);
    } catch (error) {
        console.error("Error en el registro:", error.message);
    }
}

// Función para iniciar sesión y redirigir al chat
async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Recuperamos el nickname del perfil
        const nickname = user.displayName;

        console.log("Usuario logueado con nickname:", nickname);
        localStorage.setItem("nickname", nickname);

        // Redirigir a salachat.html
        window.location.href = "salachat.html";
    } catch (error) {
        console.error("Error en login:", error.message);
    }
}
