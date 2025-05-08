// Configurar Firebase con los datos proporcionados
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
const db = firebase.firestore();

// Manejar el estado de autenticación y redirigir correctamente
auth.onAuthStateChanged(user => {
    if (user) {
        console.log("✅ Usuario autenticado:", user.displayName);

        // Guardar usuario en Firestore con estado "online"
        db.collection("users").doc(user.uid).set({
            nickname: user.displayName || "Usuario",
            email: user.email,
            online: true,
            userId: user.uid,
            projectId: firebaseConfig.projectId
        }, { merge: true });

        // 🔥 Redirigir al chat de forma segura
        setTimeout(() => {
            window.location.assign("chat.html");
        }, 2000);
    } else {
        console.log("❌ No hay usuario autenticado, redirigiendo a login...");
        window.location.assign("login.html");
    }
});

// Función para iniciar sesión con validación
function login(email, password) {
    if (!email || !password) {
        alert("❌ Debes ingresar tu email y contraseña!");
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;

            // Guardar estado "online" al iniciar sesión
            db.collection("users").doc(user.uid).set({
                online: true
            }, { merge: true });

            console.log("✅ Inicio de sesión exitoso:", user.displayName);

            setTimeout(() => {
                window.location.assign("chat.html");
            }, 2000);
        })
        .catch(error => {
            console.error("❌ Error en el login:", error.message);
            alert("❌ Error al iniciar sesión: " + error.message);
        });
}

// Función para registrar usuario con validación
function register(email, password, nickname) {
    if (!email || !password || !nickname) {
        alert("❌ Debes ingresar email, contraseña y un nombre!");
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            let user = userCredential.user;

            return db.collection("users").doc(user.uid).set({
                nickname: nickname,
                email: user.email,
                online: true,
                userId: user.uid,
                projectId: firebaseConfig.projectId
            });
        })
        .then(() => {
            console.log("✅ Usuario registrado correctamente!");

            // 🔥 Solo redirigir después de que el usuario se haya guardado en Firestore
            setTimeout(() => {
                window.location.assign("chat.html");
            }, 2000);
        })
        .catch(error => {
            console.error("❌ Error al registrarse:", error.message);
            alert("❌ Error al registrarse: " + error.message);
        });
}

// Función para cerrar sesión
function logout() {
    const user = auth.currentUser;
    if (user) {
        db.collection("users").doc(user.uid).set({
            online: false
        }, { merge: true });
    }

    auth.signOut()
        .then(() => {
            console.log("✅ Sesión cerrada correctamente.");
            window.location.assign("login.html");
        })
        .catch(error => {
            console.error("❌ Error al cerrar sesión:", error.message);
        });
}
