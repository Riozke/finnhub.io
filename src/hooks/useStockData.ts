import { useState, useEffect, useCallback } from "react";
import { saveStocksToStorage, getStocksFromStorage } from "../utils/localStorage";
import { sendStockAlertNotification } from "../services/notificationService";

interface StockData {
    symbol: string;
    price: number;
    changePercent: number;
    alertPrice: number;
    priceHistory: { time: string; price: number }[];
}

export const useStockData = () => {
    const [stocks, setStocks] = useState<StockData[]>(getStocksFromStorage());
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`wss://ws.finnhub.io?token=${process.env.REACT_APP_FINNHUB_API_KEY}`); setSocket(ws);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "trade") {
                updateStockPrice(data.data[0].s, data.data[0].p);
            }
        };

        return () => ws.close();
    }, []);

    useEffect(() => {
        saveStocksToStorage(stocks);
    }, [stocks]);

    const updateStockPrice = useCallback((symbol: string, newPrice: number) => {
        setStocks((prevStocks) =>
            prevStocks.map((stock) => {
                const isBelowAlert = newPrice < stock.alertPrice;

                if (isBelowAlert) {
                    sendStockAlertNotification(symbol, newPrice);
                }

                return stock.symbol === symbol
                    ? {
                        ...stock,
                        price: newPrice,
                        priceHistory: [
                            ...stock.priceHistory,
                            { time: new Date().toLocaleTimeString(), price: newPrice },
                        ],
                    }
                    : stock;
            })
        );
    }, []);

    const addStock = useCallback((symbol: string, alertPrice: number) => {
        if (stocks.some((s) => s.symbol === symbol)) return;

        const newStock: StockData = {
            symbol,
            price: 0,
            changePercent: 0,
            alertPrice,
            priceHistory: [],
        };

        setStocks((prev) => [...prev, newStock]);
        socket?.send(JSON.stringify({ type: "subscribe", symbol }));
    }, [stocks, socket]);

    return { stocks, addStock };
};
