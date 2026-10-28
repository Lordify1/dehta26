import { useState } from "react";
import { classMap } from "@/components/Tools/Misc";
import { ComingSoon, DehtaConstruct, EmailVerifyGuard } from "../../Tools/Misc";
import PayButton from "../PayButton";
import { useUser } from "@/context/UserContext";
import { apiUrl } from "../../../App";


const TrendDetail = ({ data }: { data: any }) => {
  const trend = data[0];
  const options = trend.options;
  const [voteInfo, setVoteInfo] = useState({
    amount: "",
    trend_id: "",
    option_id: ""
  });
  const {user} = useUser();

  // selected option
  const [selected, setSelected] = useState<any>(null);

  // calculate percentages if votes exist
  const totalVotes = trend.votes?.length || 0;
  const trendDone = trend.votes?.length === trend?.target_vote ? true : false
  const isOwner = trend?.user_id === user?.id
  const hasVoted = trend.votes?.some((vote: any) => vote.user_id === user?.id) || false;

  const getPercentage = (optionId: number) => {
    if (totalVotes === 0) return 0;
    const count = trend.votes.filter((v: any) => v.option_id === optionId).length;
    return Math.round((count / totalVotes) * 100);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setVoteInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col" key={trend.id}>
    <section className={`w-full p-2 rounded-xl ${classMap.section} flex flex-col gap-2`}>
      <div className="w-full h-full overflow-hidden rounded-md mb-1">
        <img
            src={trend.image || `/logo.svg`}
            // alt={'trend img'}
            loading="lazy"
            className="w-full object-cover mb-2"
            onError={(e) => e.currentTarget.src = '/placeholder.png'}
        />
      </div>
      
      {/* Body */}
      <p className="text-(--primary) opacity-80 mb-1">
        {trend.body}
      </p>

      {/* Options */}
      <div className="flex flex-col gap-3 w-full">
        {options.map((opt: any, index: number) => {
          const percent = getPercentage(opt.id);

          return (
            <div
              key={opt.id}
              onClick={() => {
                if(!trendDone && !isOwner && !hasVoted){
                  setVoteInfo((prev) => ({...prev, option_id: opt.id, trend_id: trend.id}))
                  setSelected(opt);
                }
              }}
              className={`${(!trendDone) ? 'cursor-pointer p-3 rounded-lg border border-(--border) bg-(--card) hover:border-(--owner) transition' : `cursor-not-allowed p-3 rounded-lg border border-(--border) ${opt.is_correct === 1 ? 'bg-(--ceo)' : 'bg-(--card)'}`} 
              ${selected?.id === opt.id ? "border-(--owner) shadow-md" : ""}`}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-(--primary)">{opt.option_text}</span>
                <span className="text-(--owner) text-sm">{percent}%</span>
              </div>

              {/* Percentage Bar */}
              <div className="w-full h-2 bg-(--muted) rounded-full mt-2">
                <div
                  className="h-full bg-(--owner) rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Voting Amount Input */}
      

      {/* {selected && (
        <div className="flex flex-col w-full p-2">
          <ComingSoon/>
        </div>
      )} */}

      {(isOwner && !trendDone) ? (
        // <div className="flex flex-col w-full p-2 items-center justify-center">
        //   <p>You can't vote your Trend Mate</p>
        // </div>
        <></>
      ) : hasVoted ? (
        <div className="flex flex-col w-full p-2 items-center justify-center">
          <p>You voted {trend.votes?.find((vote: any) => vote.user_id === user?.id)?.option_id === selected?.id ? selected?.option_text : trend.options.find((opt: any) => opt.id === trend.votes?.find((vote: any) => vote.user_id === user?.id)?.option_id)?.option_text}. Wait for the Results</p>
        </div>
      ) : selected && (
        user?.email_verified_at ? (
        <div className="flex flex-col w-full p-2 gap-2">
        <div className="bg-(--card) rounded-lg border p-2 border-(--owner) flex flex-col">
          <h3 className="font-semibold text-(--owner)">
            Place Vote On: {selected.option_text}
          </h3>

          <PayButton
          key={selected.id}
          data={voteInfo}
          successUrl={`${apiUrl}/api/trendbet/vote`}
          successMessage="Your vote has been counted!"
          minAmount={2}
          />
        </div>
        </div>) : (
          <EmailVerifyGuard
          height={`w-full`}
          message={`Verify email to Place Vote`}
          />
        )
      )}
    </section>
    </div>
  );
};

export default TrendDetail;