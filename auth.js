// Esperar a que Firebase se haya cargado correctamente antes de inicializarlo
document.addEventListener("DOMContentLoaded", function () {
    if (typeof firebase !== "undefined") {
        // Configuración de Firebase
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

        console.log("Firebase inicializado correctamente.");

        // Detectar usuarios online
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const userRef = firebase.firestore().collection("users").doc(user.uid);
                userRef.update({ online: true });

                // Detectar cuando el usuario cierre la página
                window.addEventListener("beforeunload", () => {
                    userRef.update({ online: false });
                });
            }
        });
    } else {
        console.error("Firebase no se cargó correctamente.");
    }
});

// Hacer accesible la función de registro en el entorno global
window.registerUser = async function(email, password, nickname) {
    try {
        const userCredential = await window.auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        await user.updateProfile({ displayName: nickname });
        await window.db.collection("users").doc(user.uid).set({ nickname, email: user.email, online: true });

        console.log("Usuario registrado con nickname:", nickname);
        window.location.href = "salachat.html"; // Redirigir al chat después del login
        return true;
    } catch (error) {
        console.error("Error en el registro:", error.message);
        return false;
    }
};
