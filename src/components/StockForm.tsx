import { useState } from "react";

interface StockFormProps {
  onAddStock: (symbol: string, alertPrice: number) => void;
}

const STOCK_OPTIONS = [
  { label: "Apple (AAPL)", value: "AAPL" },
  { label: "Tesla (TSLA)", value: "TSLA" },
  { label: "Amazon (AMZN)", value: "AMZN" },
  { label: "Microsoft (MSFT)", value: "MSFT" },
];

export const StockForm: React.FC<StockFormProps> = ({ onAddStock }) => {
  const [selectedStock, setSelectedStock] = useState(STOCK_OPTIONS[0].value);
  const [alertPrice, setAlertPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(alertPrice);

    if (isNaN(price) || price <= 0) {
      alert("Please enter a valid price");
      return;
    }

    onAddStock(selectedStock, price);
    setAlertPrice("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-4 space-y-4"
    >
      <h2 className="text-lg font-semibold">Add Stock</h2>

      <label className="block">
        <span className="text-gray-700">Select a stock:</span>
        <select
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value)}
        >
          {STOCK_OPTIONS.map((stock) => (
            <option key={stock.value} value={stock.value}>
              {stock.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-gray-700">Alert price ($):</span>
        <input
          type="number"
          step="0.01"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Example: 150.00"
          value={alertPrice}
          onChange={(e) => setAlertPrice(e.target.value)}
        />
      </label>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      >
        Add Stock
      </button>
    </form>
  );
};
