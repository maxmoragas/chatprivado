// Cargar Firebase desde el CDN sin usar "import"
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
const auth = firebase.auth();
const db = firebase.firestore();

// Función de registro de usuario
async function registerUser(email, password, nickname) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        await user.updateProfile({ displayName: nickname });
        await db.collection("users").doc(user.uid).set({ nickname, email: user.email });

        console.log("Usuario registrado con nickname:", nickname);
        return true;
    } catch (error) {
        console.error("Error en el registro:", error.message);
        return false;
    }
}
