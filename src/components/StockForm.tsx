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
      alert("Por favor, ingresa un precio válido");
      return;
    }

    onAddStock(selectedStock, price);
    setAlertPrice(""); // Resetear input
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-4 space-y-4"
    >
      <h2 className="text-lg font-semibold">Añadir Acción</h2>

      {/* Dropdown de selección */}
      <label className="block">
        <span className="text-gray-700">Selecciona una acción:</span>
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

      {/* Input de precio de alerta */}
      <label className="block">
        <span className="text-gray-700">Precio de alerta ($):</span>
        <input
          type="number"
          step="0.01"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Ejemplo: 150.00"
          value={alertPrice}
          onChange={(e) => setAlertPrice(e.target.value)}
        />
      </label>

      {/* Botón de agregar */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      >
        Añadir Acción
      </button>
    </form>
  );
};
