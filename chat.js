console.log("🔍 chat.js se está ejecutando...");
console.log("🔍 Verificando acceso a Firebase desde chat.js:", window.firebase);

setTimeout(() => {
    console.log("🔍 Segunda verificación después de 3 segundos:", window.firebase);
    if (!window.firebase) {
        console.error("🚨 Firebase sigue sin estar accesible en chat.js. Algo lo está bloqueando.");
        console.warn("🔍 Posibles causas: script de Firebase no está completamente cargado en index.html, `window.firebase` no se comparte correctamente.");
    } else {
        console.log("✅ Firebase finalmente está disponible en chat.js:", window.firebase);
        iniciarFirebase();
    }
}, 3000);
