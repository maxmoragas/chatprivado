document.addEventListener("DOMContentLoaded", () => {
    const firebaseConfig = {
        apiKey: "AIzaSyCalxt34jrPFP9VJM5yBFA4BRF2U1_XiZw",
        authDomain: "michatprivado-f704a.firebaseapp.com",
        projectId: "michatprivado-f704a",
        storageBucket: "michatprivado-f704a.appspot.com",
        messagingSenderId: "187774286181",
        appId: "1:187774286181:web:95fc9391a64d3d244e498c"
    };

    firebase.initializeApp(firebaseConfig);
    window.firebase = firebase;  
});

function registrarUsuario() {
    const nickname = document.getElementById("nickname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            localStorage.setItem("nickname", nickname);
            console.log("✅ Registro exitoso:", userCredential.user.email);
            window.location.href = "chat.html";
        })
        .catch(error => {
            console.error("🚨 Error al registrar:", error);
        });
}

function loginUsuario() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            window.location.href = "chat.html";
        })
        .catch(error => {
            console.error("🚨 Error en login:", error);
        });
}
