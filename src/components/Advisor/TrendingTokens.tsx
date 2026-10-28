import React, { useEffect, useState } from "react";
import { FaChartLine } from "react-icons/fa";
import { classMap, emptyData, Loading } from "../Tools/Misc";

const TrendingTokens = () => {
  const [trendingTokens, setTrendingTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const apiKey = import.meta.env.VITE_CR_API

  const fetchTrending = async () => {
    try {
      const res = await fetch(
        "https://api.coinranking.com/v2/coins?limit=5&orderBy=change&orderDirection=desc",
        {
          headers: {
            "x-access-token": apiKey
          }
        }
      );

      const data = await res.json();
      const coins = data?.data?.coins || [];

      // Sort by rank just to be safe
      const sorted = coins.sort((a, b) => a.rank - b.rank);

      setTrendingTokens(sorted);
    } catch (err) {
      console.error("Error loading trending tokens:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <section className={`${classMap.dehtaCard()} border-(--owner) min-h-[60vh]`}>
      <div className="overflow-y-scroll">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <FaChartLine /> Top 5 Trending Tokens
        </h3>

        <div className="space-y-3 w-full overflow-y-auto min-h-60">
          {isLoading ? (
            <Loading />
          ) : trendingTokens.length > 0 ? (
            trendingTokens.map((tx, index) => (
              <div
                key={index}
                className={`${classMap.section} flex items-center justify-between text-start py-2`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[var(--owner)]">#{tx.rank}</span>

                  <img
                    src={tx.iconUrl}
                    alt={tx.symbol}
                    className="w-6 h-6 rounded-full"
                  />

                  <div className="flex flex-col">
                    <span className="font-semibold">{tx.name}</span>
                    <span className="text-sm opacity-60">{tx.symbol}</span>
                  </div>
                </div>

                <span className="font-bold">
                  ${Number(tx.price).toLocaleString()}
                </span>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center">
              {emptyData("Trending Tokens will appear here")}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrendingTokens;
