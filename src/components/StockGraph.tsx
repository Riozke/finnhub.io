import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface StockGraphProps {
  stockData: {
    symbol: string;
    priceHistory: { time: string; price: number }[];
  }[];
}

export const StockGraph: React.FC<StockGraphProps> = ({ stockData }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Price Evolution</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart>
          <XAxis dataKey="time" stroke="#8884d8" />
          <YAxis stroke="#8884d8" />
          <Tooltip />
          <Legend />

          {stockData.map((stock) => (
            <Line
              key={stock.symbol}
              type="monotone"
              data={stock.priceHistory}
              dataKey="price"
              name={stock.symbol}
              strokeWidth={2}
              stroke={getStockColor(stock.symbol)}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const getStockColor = (symbol: string) => {
  const colors: Record<string, string> = {
    AAPL: "#1f77b4",
    TSLA: "#ff7f0e",
    AMZN: "#2ca02c",
    MSFT: "#d62728",
  };
  return colors[symbol] || "#8884d8";
};
