console.log("🔍 chat.js se está ejecutando...");

let intentosFirebase = 0; // Contador de intentos

function esperarFirebase() {
    if (window.firebase && window.firebase.database) {
        console.log("✅ Firebase finalmente detectado en chat.js:", window.firebase);
        iniciarFirebase();
    } else if (intentosFirebase < 5) { // Máximo 5 intentos
        intentosFirebase++;
        console.error(`🚨 Firebase aún no está disponible en chat.js. Intentando nuevamente (${intentosFirebase}/5)...`);
        setTimeout(esperarFirebase, 3000);
    } else {
        console.error("❌ No se pudo cargar Firebase en chat.js después de 5 intentos.");
    }
}

esperarFirebase();
