import io from "socket.io-client";

const socket = io("wss://ws.finnhub.io?token=cuv9en1r01qpi6ru45m0cuv9en1r01qpi6ru45mg");

export const subscribeToStock = (symbol: string) => {
  socket.emit("subscribe", symbol);
};

export const unsubscribeFromStock = (symbol: string) => {
  socket.emit("unsubscribe", symbol);
};

export const listenToStockUpdates = (callback: (data: any) => void) => {
  socket.on("stock_update", callback);
};
