console.log("🔍 chat.js se está ejecutando...");
console.log("🔍 Verificando acceso a Firebase desde chat.js:", window.firebase);

document.addEventListener("firebase-load-complete", () => {
    console.log("✅ Firebase disponible en chat.js:", window.firebase);
    iniciarFirebase();
});

// Verificación adicional después de unos segundos
setTimeout(() => {
    console.log("🔍 Segunda verificación después de 3 segundos:", window.firebase);
    if (!window.firebase) {
        console.error("🚨 Firebase sigue sin estar accesible en chat.js. Posibles causas:");
        console.warn("🔍 - `index.html` no está compartiendo correctamente `window.firebase`.");
        console.warn("🔍 - `chat.js` está ejecutándose antes de que Firebase esté disponible.");
    } else {
        iniciarFirebase();
    }
}, 5000);
