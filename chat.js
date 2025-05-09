console.log("🔍 chat.js se está ejecutando...");
console.log("🔍 Verificando Firebase en chat.js:", typeof window.firebase);

window.addEventListener("firebase-load-complete", () => {
    console.log("🔍 Probando acceso a Firebase desde chat.js:", window.firebase);

    if (!window.firebase) {
        console.error("🚨 Firebase sigue sin estar disponible en chat.js. Deteniendo ejecución.");
        return;
    }

    console.log("✅ Firebase ya está disponible en chat.js:", window.firebase);
    iniciarFirebase();
});
