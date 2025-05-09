console.log("🔍 chat.js se está ejecutando...");
console.log("🔍 Verificando acceso a Firebase desde chat.js:", typeof window.firebase);

setTimeout(() => {
    console.log("🔍 Segunda verificación después de 3 segundos:", typeof window.firebase);
    if (!window.firebase) {
        console.error("🚨 Firebase sigue sin estar accesible en chat.js. Algo lo está bloqueando.");
    } else {
        console.log("✅ Firebase finalmente está disponible en chat.js:", window.firebase);
        iniciarFirebase();
    }
}, 3000);
