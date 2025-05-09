console.log("🔍 chat.js se está ejecutando...");
console.log("🔍 Verificando acceso a Firebase desde chat.js:", typeof window.firebase);

window.addEventListener("firebase-load-complete", () => {
    console.log("✅ Firebase finalmente disponible en chat.js:", window.firebase);
    iniciarFirebase();
});

setTimeout(() => {
    if (!window.firebase) {
        console.error("🚨 Firebase sigue sin estar accesible en chat.js. Algo lo está bloqueando.");
    }
}, 5000);
