function iniciarFirebase() {
    console.log("✅ Ejecutando iniciarFirebase...");
    
    // Aquí puedes agregar la lógica de autenticación o conexión a la base de datos
    if (window.firebase) {
        console.log("🔥 Firebase listo para usarse:", window.firebase);
    } else {
        console.error("🚨 Firebase aún no está disponible.");
    }
}
