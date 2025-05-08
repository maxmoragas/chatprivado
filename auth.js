// Configuración de Firebase con tus datos
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_DOMINIO.firebaseapp.com",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET.appspot.com",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage(); // 🔥 Asegurar que Firebase Storage esté inicializado correctamente

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
