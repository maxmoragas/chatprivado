// Esperar a que Firebase se haya cargado correctamente antes de inicializarlo
document.addEventListener("DOMContentLoaded", function () {
    if (typeof firebase !== "undefined") {
        // Configuración de Firebase
        const firebaseConfig = {
            apiKey: "TU_API_KEY",
            authDomain: "TU_AUTH_DOMAIN",
            projectId: "TU_PROJECT_ID",
            storageBucket: "TU_STORAGE_BUCKET",
            messagingSenderId: "TU_MESSAGING_SENDER_ID",
            appId: "TU_APP_ID"
        };

        // Inicializar Firebase
        firebase.initializeApp(firebaseConfig);
        window.auth = firebase.auth();
        window.db = firebase.firestore();

        console.log("✅ Firebase inicializado correctamente.");
    } else {
        console.error("❌ Firebase no se cargó correctamente.");
    }
});

// Función de inicio de sesión
async function loginUser(email, password) {
    if (!window.auth) {
        console.error("❌ Firebase Auth no está definido.");
        return false;
    }

    try {
        const userCredential = await window.auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        console.log("Usuario logeado:", user.displayName);
        window.location.href = "salachat.html"; // Redirigir al chat después del login
        return true;
    } catch (error) {
        console.error("Error en el inicio de sesión:", error.message);
        return false;
    }
}

// Hacer accesible la función de inicio de sesión en el entorno global
window.loginUser = loginUser;
