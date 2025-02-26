import { useState, useEffect, useCallback } from "react";
import { saveStocksToStorage, getStocksFromStorage } from "../utils/localStorage";
import { sendStockAlertNotification } from "../services/notificationService";

interface StockData {
  symbol: string;
  price: number;
  changePercent: number;
  alertPrice: number;
  priceHistory: { time: string; price: number }[];
  notified: boolean;
}

export const useStockData = () => {
  const [stocks, setStocks] = useState<StockData[]>(getStocksFromStorage());
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const updateStockPrice = useCallback((symbol: string, newPrice: number) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) => {
        if (stock.symbol !== symbol) return stock;

        const isBelowAlert = newPrice < stock.alertPrice;
        const shouldNotify = isBelowAlert && !stock.notified;
        const resetNotification = !isBelowAlert ? false : stock.notified;

        if (shouldNotify) {
          sendStockAlertNotification(symbol, newPrice);
        }

        return {
          ...stock,
          price: newPrice,
          priceHistory: [
            ...stock.priceHistory,
            { time: new Date().toLocaleTimeString(), price: newPrice },
          ],
          notified: shouldNotify ? true : resetNotification,
        };
      })
    );
  }, []);

  useEffect(() => {
    const token = import.meta.env.VITE_FINNHUB_API_KEY;
    if (!token) {
      console.error("Finnhub API key is missing");
      return;
    }

    const ws = new WebSocket(`wss://ws.finnhub.io?token=${token}`);
    setSocket(ws);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "trade") {
        updateStockPrice(data.data[0].s, data.data[0].p);
      }
    };

    return () => ws.close();
  }, [updateStockPrice]);

  useEffect(() => {
    saveStocksToStorage(stocks);
  }, [stocks]);

  const addStock = useCallback((symbol: string, alertPrice: number) => {
    if (stocks.some((s) => s.symbol === symbol)) return;

    const newStock: StockData = {
      symbol,
      price: 0,
      changePercent: 0,
      alertPrice,
      priceHistory: [],
      notified: false
    };

    setStocks((prev) => [...prev, newStock]);
    socket?.send(JSON.stringify({ type: "subscribe", symbol }));
  }, [stocks, socket]);

  return { stocks, addStock };
};
