// Configuración de Firebase con tus datos
const firebaseConfig = {
    apiKey: "AIzaSyCalxt34jrPFP9VJM5yBFA4BRF2U1_XiZw",
    authDomain: "michatprivado-f704a.firebaseapp.com",
    projectId: "michatprivado-f704a",
    storageBucket: "michatprivado-f704a.appspot.com",
    messagingSenderId: "187774286181",
    appId: "1:187774286181:web:95fc9391a64d3d244e498c"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Manejo de autenticación
document.addEventListener("DOMContentLoaded", function () {
    auth.onAuthStateChanged(user => {
        if (user && user.displayName) {
            console.log("✅ Usuario autenticado:", user.displayName);
            db.collection("users").doc(user.uid).set({
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
});
