import React, { useEffect, useState } from "react";
import { FaVoteYea } from "react-icons/fa";
import { classMap, emptyData, Loading } from "../Tools/Misc";
import { useUser } from "@/context/UserContext";

const TrendBetDB = () => {
  const { user } = useUser();
  const [trendPredictions, setTrendPredictions] = useState<
    Array<{
      question: string;
      option: string;
      reward_amount: number | string;
      is_correct: number;
      amount: any
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.votes && user.votes.length > 0) {
      // Map user votes to the structure we want for display
      const mappedVotes = user.votes.map((v) => ({
        question: v.question?.body ?? "Unknown Question",
        option: v.option?.option_text ?? "Unknown Option",
        reward_amount: v.reward_amount ?? 0,
        is_correct: v.is_correct ?? 0,
        amount: v.amount ?? 0,
      }));

      setTrendPredictions(mappedVotes);
    }

    setIsLoading(false);
  }, [user]);


  return (
    <section className={`${classMap.dehtaCard()} border-(--owner) min-h-[60vh]`}>
      <div className="overflow-y-scroll">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <FaVoteYea /> Trend Predictions
        </h3>
        <div className="space-y-3 w-full overflow-y-auto min-h-60">
          {isLoading ? (
            <Loading />
          ) : trendPredictions && trendPredictions.length > 0 ? (
            trendPredictions.map((tx, index) => (
              <div key={index} className={`${classMap.section}  flex flex-col text-start items-start`}>
                <span className="font-medium">{tx.question}</span>
                <span className="text-sm text-(--owner)">You voted: {tx.option} - ${tx.amount}</span>
                {/* <span
                  className={tx.is_correct === 0 ? "text-red-400" : "text-green-500"}
                >
                  Reward: {tx.reward_amount}
                </span> */}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center">
              {emptyData("Your Trend Predictions will appear here")}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrendBetDB;