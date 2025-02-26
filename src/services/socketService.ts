import io from "socket.io-client";

const token = import.meta.env.VITE_FINNHUB_API_KEY;

if (!token) {
  console.error("Finhub API key is missing");
}

const socket = io(`wss://ws.finnhub.io?token=${token}`);

export const subscribeToStock = (symbol: string) => {
  socket.emit("subscribe", symbol);
};

export const unsubscribeFromStock = (symbol: string) => {
  socket.emit("unsubscribe", symbol);
};

export const listenToStockUpdates = (callback: (data: any) => void) => {
  socket.on("stock_update", callback);
};
