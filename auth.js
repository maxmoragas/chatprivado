import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCalxt34jrPFP9VJM5yBFA4BRF2U1_XiZw",
    authDomain: "michatprivado-f704a.firebaseapp.com",
    projectId: "michatprivado-f704a",
    storageBucket: "michatprivado-f704a.appspot.com",
    messagingSenderId: "187774286181",
    appId: "1:187774286181:web:95fc9391a64d3d244e498c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

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
