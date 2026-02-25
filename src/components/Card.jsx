import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faSync } from "@fortawesome/free-solid-svg-icons";

export default function Card({ card }) {
  const isBurner = card.card_type === "burner";
  const total = card.spent.value + card.available_to_spend.value;
  const percentage = (card.spent.value / total) * 100;

  const AVATAR_COLORS = [
    "bg-blue-100 text-blue-600 border-blue-200",
    "bg-purple-100 text-purple-600 border-purple-200",
    "bg-pink-100 text-pink-600 border-pink-200",
    "bg-indigo-100 text-indigo-600 border-indigo-200",
    "bg-teal-100 text-teal-600 border-teal-200",
    "bg-orange-100 text-orange-600 border-orange-200",
  ];

  const colorIndex = card.name.length % AVATAR_COLORS.length;
  const selectedColor = AVATAR_COLORS[colorIndex];

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
      {/* Top Row */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3 mb-4">
          {/* Logo Section */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border ${selectedColor} ring-2 ring-white`}
          >
            {card.name.charAt(0)}
          </div>
          <div>
            <h2 className="font-bold text-gray-900 leading-tight">
              {card.name}
            </h2>
            <p className="text-xs text-gray-500">{card.budget_name}</p>
          </div>
        </div>

        {/* Card Type Badge */}
        <span
          className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md flex items-center gap-1.5 ${
            isBurner
              ? "bg-orange-50 text-orange-600"
              : "bg-blue-50 text-blue-600"
          }`}
        >
          <FontAwesomeIcon
            icon={isBurner ? faFire : faSync}
            className="text-[12px]"
          />
          {isBurner ? "Burner" : "Subscription"}
        </span>
      </div>

      {/* Spending Info */}
      <div className="my-4">
        <div
          className="w-full bg-gray-100 rounded-full h-2.5 cursor-help"
          title={`${percentage.toFixed(0)}% of budget spent`}
        >
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              percentage >= 100 ? "bg-red-500" : "bg-pink-500"
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-400 uppercase font-semibold">
          <span>Spent</span>
          <span>Available</span>
        </div>
        <div className="flex justify-between text-sm font-bold">
          <span className="text-pink-600">
            {card.spent.value} {card.spent.currency}
          </span>
          <span className="text-green-600">
            {card.available_to_spend.value} {card.available_to_spend.currency}
          </span>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex justify-between items-center text-sm">
        {/* Expiry OR Limit */}
        <div className="text-gray-500">
          {isBurner ? (
            <>Expiry: {new Date(card.expiry).toLocaleDateString()}</>
          ) : (
            <>
              Limit: {card.limit} {card.spent.currency}
            </>
          )}
        </div>

        {/* Status */}
        <div
          className={`flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-full ${
            card.status === "active"
              ? "text-green-600 bg-green-50"
              : "text-red-600 bg-red-50"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              card.status === "active" ? "bg-green-600" : "bg-red-600"
            }`}
          ></span>
          <span className="capitalize">{card.status}</span>
        </div>
      </div>
    </div>
  );
}
