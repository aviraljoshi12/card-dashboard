import { useEffect, useRef, useState, useCallback } from "react";
import { fetchCards } from "../services/api";
import Card from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTimesCircle,
  faInbox,
  faFaceSmileBeam,
} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const CURRENT_USER = "123";

  const [cards, setCards] = useState([]);
  const [activeTab, setActiveTab] = useState("your");
  const [searchTerm, setSearchTerm] = useState("");
  const [cardType, setCardType] = useState("all");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const isFetching = useRef(false);
  const loaderRef = useRef(null);

  const loadCards = useCallback(async () => {
    if (isFetching.current || !hasMore) return;

    isFetching.current = true;
    setLoading(true);

    try {
      const res = await fetchCards(page);

      setCards((prev) => {
        const ids = new Set(prev.map((c) => c.id));
        const unique = res.data.filter((c) => !ids.has(c.id));
        return [...prev, ...unique];
      });

      setPage((p) => p + 1);
      setHasMore(res.hasMore);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, [page, hasMore]);

  const getFilteredCards = () => {
    let filtered = cards;
    if (activeTab === "your")
      filtered = filtered.filter((c) => c.owner_id === CURRENT_USER);
    if (activeTab === "blocked")
      filtered = filtered.filter((c) => c.status === "blocked");
    if (cardType !== "all")
      filtered = filtered.filter((c) => c.card_type === cardType);
    if (searchTerm.trim()) {
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    return filtered;
  };

  const filteredCards = getFilteredCards();

  useEffect(() => {
    loadCards();
  }, []);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching.current) {
          loadCards();
        }
      },
      { threshold: 0.1, rootMargin: "200px" },
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);
    return () => observer.disconnect();
  }, [hasMore, loading, loadCards]);

  useEffect(() => {
    if (!loading && hasMore && filteredCards.length < 8) {
      loadCards();
    }
  }, [activeTab, filteredCards.length, hasMore, loading, loadCards]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-24">
      <h1 className="text-2xl font-semibold mb-6">Card Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-6 border-b pb-3 mb-6">
        {["your", "all", "blocked"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 capitalize transition-colors ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters UI */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">
        <div className="relative w-full md:w-1/3">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <input
            type="text"
            placeholder="Search cards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg pl-10 pr-10 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
          )}
        </div>

        <select
          value={cardType}
          onChange={(e) => setCardType(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-1/4 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="all">All Types</option>
          <option value="burner">Burner</option>
          <option value="subscription">Subscription</option>
        </select>
      </div>

      {/* Cards Grid / Empty State */}
      {filteredCards.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      ) : (
        !loading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300 mx-auto w-full">
            <div className="text-gray-300 text-7xl mb-6">
              <FontAwesomeIcon icon={faInbox} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No cards found
            </h3>
            <p className="text-gray-500 text-center px-4 max-w-md mb-8">
              We couldn't find any cards matching your current filters or search
              query.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setCardType("all");
                setActiveTab("your");
              }}
              className="px-6 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )
      )}

      {/* Loader Section */}
      <div
        ref={loaderRef}
        className="min-h-[150px] flex flex-col justify-center items-center mt-10"
      >
        {loading && (
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 font-medium">Fetching more cards...</p>
          </div>
        )}

        {!hasMore && cards.length > 0 && (
          <div className="flex flex-col items-center gap-2 animate-fadeIn">
            <div className="text-green-400 text-3xl mb-1">
              <FontAwesomeIcon icon={faFaceSmileBeam} />
            </div>
            <p className="text-gray-400 text-sm font-medium italic">
              Yay! You've seen all the cards.
            </p>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-2"></div>
          </div>
        )}
      </div>
    </div>
  );
}
