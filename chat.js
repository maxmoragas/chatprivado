console.log("🔍 chat.js se está ejecutando...");
console.log("🔍 Verificando Firebase en chat.js:", typeof window.firebase);

function esperarFirebase() {
    if (typeof window.firebase === "undefined") {
        console.warn("⏳ Firebase aún no está listo en chat.js, esperando...");
        setTimeout(esperarFirebase, 1000);
        return;
    }

    console.log("✅ Firebase ya está disponible en chat.js:", window.firebase);
    iniciarFirebase();
}

window.addEventListener("firebase-load-complete", esperarFirebase);
