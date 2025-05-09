// 🔥 Inicializar Firebase sin `import {}` para evitar errores
document.addEventListener("DOMContentLoaded", () => {
    if (typeof firebase === "undefined") {
        console.error("🚨 Firebase NO se ha cargado correctamente.");
        return;
    }

    console.log("✅ Firebase cargado correctamente.");

    const firebaseConfig = {
        apiKey: "AIzaSyCalxt34jrPFP9VJM5yBFA4BRF2U1_XiZw",
        authDomain: "michatprivado-f704a.firebaseapp.com",
        databaseURL: "https://michatprivado-f704a-default-rtdb.firebaseio.com",
        projectId: "michatprivado-f704a",
        storageBucket: "michatprivado-f704a.appspot.com",
        messagingSenderId: "187774286181",
        appId: "1:187774286181:web:95fc9391a64d3d244e498c"
    };

    firebase.initializeApp(firebaseConfig);
    window.auth = firebase.auth();
    window.db = firebase.database();

    console.log("✅ Firebase está listo para autenticación y base de datos.");
});
