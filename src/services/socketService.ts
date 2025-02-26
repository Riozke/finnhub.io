import io from "socket.io-client";

const socket = io(`wss://ws.finnhub.io?token=${process.env.REACT_APP_FINNHUB_API_KEY}`);

export const subscribeToStock = (symbol: string) => {
  socket.emit("subscribe", symbol);
};

export const unsubscribeFromStock = (symbol: string) => {
  socket.emit("unsubscribe", symbol);
};

export const listenToStockUpdates = (callback: (data: any) => void) => {
  socket.on("stock_update", callback);
};
