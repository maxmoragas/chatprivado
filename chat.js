function esperarFirebase() {
    if (window.firebase && window.firebase.database) {
        console.log("✅ Firebase detectado en chat.js:", window.firebase);
        iniciarFirebase();
    } else {
        console.error("🚨 Firebase aún no está disponible en chat.js. Intentando nuevamente en 3 segundos...");
        setTimeout(esperarFirebase, 3000);
    }
}

esperarFirebase();
