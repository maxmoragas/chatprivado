// Inicializar Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCalxt34jrPFP9VJM5yBFA4BRF2U1_XiZw",
    authDomain: "michatprivado-f704a.firebaseapp.com",
    projectId: "michatprivado-f704a",
    storageBucket: "michatprivado-f704a.appspot.com",
    messagingSenderId: "187774286181",
    appId: "1:187774286181:web:95fc9391a64d3d244e498c"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Registro de usuario
document.getElementById("registerButton").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("✅ Registro exitoso:", userCredential.user);
            alert("Registro completado");
        })
        .catch((error) => {
            console.error("🚨 Error en el registro:", error.message);
            alert("Error: " + error.message);
        });
});

// Inicio de sesión
document.getElementById("loginButton").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("✅ Inicio de sesión exitoso:", userCredential.user);
            alert("Bienvenido");
        })
        .catch((error) => {
            console.error("🚨 Error en el login:", error.message);
            alert("Error: " + error.message);
        });
});
