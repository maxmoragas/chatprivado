document.addEventListener("DOMContentLoaded", () => {
    if (!window.auth || !window.db) {
        console.error("🚨 Firebase NO se ha cargado correctamente.");
        return;
    }

    console.log("✅ Firebase está listo para el chat.");
});
