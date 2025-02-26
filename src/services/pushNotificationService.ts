export const requestPushNotificationPermission = async () => {
    if ("Notification" in window && "serviceWorker" in navigator) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            console.log("✅ Notificaciones permitidas");
        } else {
            console.log("❌ Notificaciones bloqueadas");
        }
    }
};
