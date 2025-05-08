import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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

onAuthStateChanged(auth, user => {
    if (user) {
        console.log("✅ Usuario autenticado:", user.displayName);
        setDoc(doc(db, "users", user.uid), {
            nickname: user.displayName,
            email: user.email,
            online: true,
            userId: user.uid
        }, { merge: true });

        window.location.replace("chat.html");
    }
});

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
window.loginUser = loginUser;
