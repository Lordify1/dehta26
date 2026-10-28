import { useState } from "react";
import SendRequest from "../Tools/SendRequest";
import { classMap } from "../Tools/Misc";
import { useAdmin } from '@/context/AdminContext';


type PayData = {
    payout_tx_hash: string
}

export default function PaySubmission({ submission }: {submission:any}) {

    const {
        getEarnFiSubmissions,
    } = useAdmin();

    const [data, setData] = useState<PayData>({
        payout_tx_hash: submission?.payout_tx_hash
    })

    const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

  return (
    <div className="space-y-2">
      <section>
        <label htmlFor="" className={`${classMap.label()}`}>Input TX Hash</label>
        <input 
        type="text" 
        name="payout_tx_hash"
        value={data.payout_tx_hash}
        className={`${classMap.input()}`}
        onChange={handleChange}
        />
      </section>
      <SendRequest
        url={`/api/admin/earnfi/submissions/${submission?.id}/paid`}
        data={data}
        onResponse={() => getEarnFiSubmissions()}
        method="post"
        text={`Update Pay Status`}
        className="mt-3 w-full"
      />
    </div>
  );
}
