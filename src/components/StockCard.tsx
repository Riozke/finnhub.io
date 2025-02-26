interface StockCardProps {
  symbol: string;
  price: number;
  changePercent: number;
  alertPrice: number;
}

export const StockCard: React.FC<StockCardProps> = ({
  symbol,
  price,
  changePercent,
  alertPrice,
}) => {
  const isAboveAlert = price >= alertPrice;
  const bgColor = isAboveAlert
    ? "bg-green-100 border-green-400"
    : "bg-red-100 border-red-400";
  const textColor = isAboveAlert ? "text-green-600" : "text-red-600";

  return (
    <div className={`p-4 border-l-4 rounded-lg shadow-sm ${bgColor}`}>
      <h3 className="text-lg font-bold">{symbol}</h3>
      <p className="text-gray-600">
        Price: <span className="font-semibold">{price.toFixed(2)} USD</span>
      </p>
      <p className={`${textColor} font-semibold`}>
        Change: {changePercent.toFixed(2)}%
      </p>
      <p className="text-sm text-gray-500">
        Alert at: <span className="font-medium">{alertPrice} USD</span>
      </p>
    </div>
  );
};
