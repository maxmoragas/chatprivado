async function registerUser(email, password, nickname) {
    try {
        const userCredential = await window.auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        await user.updateProfile({ displayName: nickname });
        await window.db.collection("users").doc(user.uid).set({ nickname, email: user.email, online: true });

        console.log("✅ Usuario registrado con nickname:", nickname);
        window.location.href = "salachat.html"; // Redirigir al chat después del registro
        return true;
    } catch (error) {
        console.error("❌ Error en el registro:", error.message);
        return false;
    }
}

// 💡 **IMPORTANTE:** Asegurar que la función sea accesible globalmente
window.registerUser = registerUser;
