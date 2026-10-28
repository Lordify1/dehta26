import { useState } from "react";
import { classMap, emptyData, Loading, TimeAgo } from "../Tools/Misc";
import { FaMoneyCheck } from "react-icons/fa";


type Props = {
    userTransact: any
}

const LensActivity = ({userTransact}: Props) => {

    const [transactions, setTransactions] = useState(userTransact);
    const [isLoading, setIsLoading] = useState(true);

    setInterval(() => {
      if(transactions) setIsLoading(false)
    }, 1000);

    return(
        <section className={`${classMap.dehtaCard()} border-(--owner) max-h-[60vh]`}>
          <div className="overflow-y-scroll">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <FaMoneyCheck/> Recent Lens Activity
            </h3>
            <div className="space-y-3 w-full overflow-y-auto min-h-80">
              {isLoading ? (<Loading/>) : (transactions ? (transactions.map((tx, index) => (
                <div
                  key={index}
                  className={`${classMap.section} flex flex-col text-start items-start`}
                >
                  <span>{tx.description}</span>
                  <span className={tx.method === 'minus' ? "text-red-400" : "text-[var(--owner)]"}>
                   {tx.method === 'plus' ? '+' : '-'}{tx.amount}
                  </span>
                </div>
              ))) : (emptyData('No Lens Activity Yet')))}
            </div>
          </div>
        </section>
    )
}


export default LensActivity