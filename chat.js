function iniciarFirebase() {
    console.log("✅ Ejecutando iniciarFirebase...");
    
    if (window.firebase) {
        console.log("🔥 Firebase listo para usarse en chat.js:", window.firebase);

        // Aquí puedes agregar autenticación o conexión a la base de datos
        const auth = window.firebase.auth();
        const database = window.firebase.database();

        console.log("✅ Autenticación Firebase:", auth);
        console.log("✅ Base de datos Firebase:", database);
    } else {
        console.error("🚨 Firebase aún no está disponible en chat.js.");
    }
}
