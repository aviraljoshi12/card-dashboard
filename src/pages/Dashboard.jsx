import { useEffect, useState } from "react";
import { fetchCards } from "../services/api";
import Card from "../components/Card";

export default function Dashboard() {
  const CURRENT_USER = "123";

  const [cards, setCards] = useState([]);
  const [activeTab, setActiveTab] = useState("your");

  const loadCards = async () => {
    const data = await fetchCards();
    setCards(data);
  };

  const getFilteredCards = () => {
    if (activeTab === "your") {
      return cards.filter((card) => card.owner_id === CURRENT_USER);
    }

    if (activeTab === "blocked") {
      return cards.filter((card) => card.status === "blocked");
    }

    return cards;
  };

  useEffect(() => {
    loadCards();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-6">Card Dashboard</h1>

      {/* Tabs Placeholder */}
      <div className="flex gap-6 border-b pb-3 mb-6 ">
        {["your", "all", "blocked"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 capitalize ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search cards..."
          className="border rounded-lg px-4 py-2 w-full md:w-1/3"
        />

        {/* Filter */}
        <select className="border rounded-lg px-4 py-2 w-full md:w-1/4">
          <option>All Types</option>
          <option>Burner</option>
          <option>Subscription</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredCards().map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
