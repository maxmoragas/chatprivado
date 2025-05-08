// Esperar a que Firebase se haya cargado correctamente antes de inicializarlo
document.addEventListener("DOMContentLoaded", function () {
    if (typeof firebase !== "undefined") {
        // Configuración de Firebase con los datos correctos
        const firebaseConfig = {
            apiKey: "AIzaSyCalxt34jrPFP9VJM5yBFA4BRF2U1_XiZw",
            authDomain: "michatprivado-f704a.firebaseapp.com",
            projectId: "michatprivado-f704a",
            storageBucket: "michatprivado-f704a.appspot.com",
            messagingSenderId: "187774286181",
            appId: "1:187774286181:web:95fc9391a64d3d244e498c"
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

// Función de registro de usuario
async function registerUser(email, password, nickname) {
    try {
        const userCredential = await window.auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        await user.updateProfile({ displayName: nickname });
        await window.db.collection("users").doc(user.uid).set({ nickname, email: user.email, online: true });

        console.log("Usuario registrado con nickname:", nickname);
        window.location.href = "salachat.html"; // Redirigir al chat después del registro
        return true;
    } catch (error) {
        console.error("Error en el registro:", error.message);
        return false;
    }
}

// Función de inicio de sesión
async function loginUser(email, password) {
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

// Hacer accesibles las funciones de autenticación en el entorno global
window.registerUser = registerUser;
window.loginUser = loginUser;
