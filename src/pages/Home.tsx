import { useEffect } from "react";
import { StockForm } from "../components/StockForm";
import { StockCard } from "../components/StockCard";
import { StockGraph } from "../components/StockGraph";
import { useStockData } from "../hooks/useStockData";
import { requestNotificationPermission } from "../services/notificationService";

export const Home: React.FC = () => {
  const { stocks, addStock } = useStockData();

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">
        📈 Real-Time Stock Tracker
      </h1>

      <StockForm onAddStock={addStock} />

      {stocks.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            {stocks.map((stock) => (
              <StockCard key={stock.symbol} {...stock} />
            ))}
          </div>
          <StockGraph stockData={stocks} />
        </>
      ) : (
        <p className="text-center text-gray-500">
          Add a stock to get started 🚀
        </p>
      )}
    </div>
  );
};
