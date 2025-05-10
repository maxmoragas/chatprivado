console.log("🔍 chat.js se está ejecutando...");
console.log("🔍 Verificando acceso a Firebase desde chat.js:", window.firebase);

// Función para inicializar Firebase en chat.js
function iniciarFirebase() {
    console.log("✅ Ejecutando iniciarFirebase...");
    
    if (window.firebase) {
        console.log("🔥 Firebase listo para usarse en chat.js:", window.firebase);

        // Aquí puedes agregar autenticación, base de datos, o cualquier otra función de Firebase
        const auth = window.firebase.auth();
        const database = window.firebase.database();

        console.log("✅ Autenticación Firebase:", auth);
        console.log("✅ Base de datos Firebase:", database);
    } else {
        console.error("🚨 Firebase aún no está disponible en chat.js.");
    }
}

// Esperar a que Firebase se cargue en `window.firebase`
window.addEventListener("firebase-load-complete", iniciarFirebase);

// Verificación adicional después de unos segundos
setTimeout(() => {
    console.log("🔍 Segunda verificación después de 3 segundos:", window.firebase);
    if (!window.firebase) {
        console.error("🚨 Firebase sigue sin estar accesible en chat.js. Algo lo está bloqueando.");
    } else {
        iniciarFirebase();
    }
}, 3000);
