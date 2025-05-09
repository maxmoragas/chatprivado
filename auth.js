document.addEventListener("DOMContentLoaded", () => {
    if (typeof firebase === "undefined") {
        console.error("🚨 Firebase no está disponible. Verifica que está correctamente cargado en index.html.");
        return;
    }

    console.log("✅ Firebase cargado correctamente:", firebase);

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

    // Inicio de sesión con redirección a chat.html
    document.getElementById("loginButton").addEventListener("click", () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log("✅ Inicio de sesión exitoso:", userCredential.user);
                alert("Bienvenido");

                // Redirigir al chat después del login exitoso
                window.location.href = "chat.html";
            })
            .catch((error) => {
                console.error("🚨 Error en el login:", error.message);
                alert("Error: " + error.message);
            });
    });
});
