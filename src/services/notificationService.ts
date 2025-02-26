export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.warn("This browser does not support notifications.");
    return;
  }

  if (Notification.permission === "granted") {
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.warn("Notification permission denied.");
  }
};

export const sendStockAlertNotification = (symbol: string, price: number) => {
  if (Notification.permission === "granted") {
    new Notification(`⚠️ Price Alert: ${symbol}`, {
      body: `The price dropped to $${price}`,
      icon: "/stock-alert-icon.png",
    });
  }
};