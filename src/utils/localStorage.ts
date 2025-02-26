const STORAGE_KEY = "stockData";

interface StockData {
    symbol: string;
    price: number;
    changePercent: number;
    alertPrice: number;
    priceHistory: { time: string; price: number }[];
}

export const saveStocksToStorage = (stocks: StockData[]) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stocks));
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
};

export const getStocksFromStorage = (): StockData[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error loading from localStorage:", error);
        return [];
    }
};
