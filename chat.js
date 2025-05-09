console.log("🔍 chat.js se está ejecutando...");
console.log("🔍 Verificando acceso a Firebase desde chat.js:", window.firebase);

if (window.firebase) {
    console.log("✅ Firebase disponible en chat.js:", window.firebase);
} else {
    console.error("🚨 Firebase sigue sin estar accesible en chat.js. Algo está bloqueándolo.");
}
