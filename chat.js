console.log("🔍 chat.js se está ejecutando...");
console.log("🔍 Verificando acceso a Firebase desde chat.js:", typeof window.firebase);

document.addEventListener("firebase-load-complete", () => {
    console.log("✅ Firebase ya está disponible en chat.js:", window.firebase);
    iniciarFirebase();
});

setTimeout(() => {
    if (!window.firebase) {
        console.error("🚨 Firebase sigue sin estar accesible en chat.js. Algo está bloqueándolo.");
    }
}, 3000);
