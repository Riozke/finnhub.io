export const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
        console.warn("Este navegador no soporta notificaciones.");
        return;
    }

    if (Notification.permission === "granted") {
        return;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
        console.warn("Permiso de notificación denegado.");
    }
};

export const sendStockAlertNotification = (symbol: string, price: number) => {
    if (Notification.permission === "granted") {
        new Notification(`⚠️ Alerta de Precio: ${symbol}`, {
            body: `El precio cayó a $${price}`,
            icon: "/stock-alert-icon.png",
        });
    }
};
