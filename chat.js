function esperarFirebase() {
    if (window.firebase && window.firebase.database) {
        console.log("✅ Firebase finalmente detectado en chat.js:", window.firebase);
        iniciarFirebase();
    } else {
        console.error("🚨 Firebase aún no está disponible en chat.js. Esperando evento...");
        window.addEventListener("firebase-load-complete", esperarFirebase);
    }
}
