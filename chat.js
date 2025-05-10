console.log("🔍 chat.js se está ejecutando...");

function esperarFirebase() {
    if (window.firebase) {
        console.log("✅ Firebase detectado en chat.js:", window.firebase);
        iniciarFirebase();
    } else {
        console.error("🚨 Firebase aún no está disponible en chat.js. Intentando nuevamente...");
        setTimeout(esperarFirebase, 1000);
    }
}

esperarFirebase();
