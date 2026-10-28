import React, { useEffect, useState } from "react";
import { FaUsers, FaVoteYea } from "react-icons/fa";
import { classMap, emptyData, formatDatePretty, Loading } from "../Tools/Misc";
import { useUser } from "@/context/UserContext";

const ReferralList = () => {
  const { user } = useUser();
  const [referrals, setReferrals] = useState<
    Array<{
      referred: any,
      created_at: string
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.referrals && user.referrals.length > 0) {
      const mappedReferrals = user.referrals.map((v) => ({
        referred: v?.referred,
        created_at: v?.created_at ?? "",
      }));

      setReferrals(mappedReferrals);
    }

    setIsLoading(false);
  }, [user]);

  return (
    <section className={`${classMap.dehtaCard()} border-(--owner) min-h-[60vh]`}>
      <div className="overflow-y-scroll">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <FaUsers /> Your Referrals {user?.referrals.length > 0 ? ('- ' + user?.referrals.length) : ''}
        </h3>
        <div className="space-y-3 w-full overflow-y-auto min-h-60">
          {isLoading ? (
            <Loading />
          ) : referrals && referrals.length > 0 ? (
            referrals.map((tx, index) => (
              <div key={index} className={`${classMap.section}  flex flex-col text-start items-start`}>
                <p>{tx.referred?.username}</p>
                <small className="opacity-70">{formatDatePretty(tx?.created_at)}</small>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center">
              {emptyData("Your Referrals will appear here")}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReferralList;