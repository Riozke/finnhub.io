export const requestPushNotificationPermission = async () => {
  if ("Notification" in window && "serviceWorker" in navigator) {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("✅ Notifications allowed");
    } else {
      console.log("❌ Notifications blocked");
    }
  }
};