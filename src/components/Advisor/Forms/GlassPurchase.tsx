import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "@/App";
import { classMap, LoadingBar } from "@/components/Tools/Misc";
import { FaDollarSign } from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import { Loading } from "../../Tools/Misc";



export default function GlassPurchase({price, glass_id, data}:{data?:object,glass_id?:any, price:any}) {
  const [invoiceUrl, setInvoiceUrl] = useState(null);
  const { getUser, role, syncSidebar } = useUser();
    
  const [loading, setLoading] = useState(false);
  const [payInfo, setPayInfo] = useState({
    amount: price,
    glass_id: glass_id
  })


  const startPolling = (orderId: string) => {
    const poll = setInterval(async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/payment/status/${orderId}`);

        if (res.data.status === "confirmed" || res.data.status === "finished" || res.data.status === 'Partially_paid') {
          clearInterval(poll);

          // close iframe
          setInvoiceUrl(null);
          setLoading(true);

          // register vote
          await axios.post(`${apiUrl}/api/glass/buy`, {
            glass_id: glass_id,
            cost: price
          });

          getUser();
          syncSidebar(role)
          setLoading(false);

          toast.success("Glass Purchased Successfully!");
        }

      } catch (e) {
        console.log("Polling error", e);
      }
    }, 5000); // every 5 seconds
  };


  const handlePay = async () => {
    if (!payInfo.amount) return toast.error('Please provide an amount!');

    try {
      setLoading(true);
      const res = await axios.post(
        `${apiUrl}/api/payment/create-invoice`,
        payInfo
      );

      const url = res.data?.invoice_url;
      if (!url) {
        toast.error("No Payment URL. Please try again");
        return;
      }

      const formatUrl = new URL(url);
      const iid = formatUrl.searchParams.get('iid')
      const newUrl:any = `https://nowpayments.io/embeds/payment-widget?iid=${iid}`
      setInvoiceUrl(newUrl);

      setTimeout(() => {
        startPolling(res.data.order_id);
      }, 1000);

    } catch (err) {
      console.log(err);
      toast.error("Payment failed to initialize.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPayInfo((prev) => ({...prev, amount: price}))
  }, [])

  return (
    <div className="flex flex-col gap-1 col-span-1 overflow-x-scroll">
                    {data && <div
                        key={data.id}
                        className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto p-2"
                      >
                        <div className="flex flex-col items-center text-center w-full">
                          <div className={`${data?.color ? `bg-${data?.color}` : 'bg-(--owner)'} rounded-lg p-3 mb-3 flex items-center justify-center`}>
                            <img
                              src={data.icon}
                              alt={data.name}
                              className="w-50 h-50 object-contain mx-auto"
                            />
                          </div>
    
                          <h4 className="font-semibold text-lg truncate w-full">{data.name}</h4>
                        </div>
                    </div>}
      {!invoiceUrl && (
        <>
          <button
            onClick={handlePay}
            disabled={loading}
            className={`${classMap.button()}`}
          >
            {loading ? <LoadingBar/> :  `Pay $ ${data?.cost}`}
          </button>
        </>
      )}

      {loading && (
        <Loading/>
      )}

      {invoiceUrl && (
        <iframe
          src={invoiceUrl}
          scrolling="no"
          width="100%"
          height="696px"
          style={{ overflowY: "hidden", marginTop: "20px" }}
        >
            <span>Can't Load Widget</span>
        </iframe>
      )}
    </div>
  );

}