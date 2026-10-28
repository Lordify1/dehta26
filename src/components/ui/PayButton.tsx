import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "../../App";
import { classMap, Loading, LoadingBar, showAlert } from "../Tools/Misc";
import { useMisc } from "@/context/MiscContext";
import { useOffCanvas } from "../../context/OffCanvasContext";

type PayProps = {
  data?: any,
  successUrl: string,
  successMessage?: string,
  minAmount?: number,
  maxAmount?: number,
  privateSale?: boolean
}

export default function PayButton({data, successUrl, successMessage, minAmount, maxAmount, privateSale}:PayProps) {
  const [invoiceUrl, setInvoiceUrl] = useState(null);
  const {getTrends} = useMisc();  
  const [tokenAmount, setTokenAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const {setShowOffCanvas} = useOffCanvas()
  const TOKEN_PRICE = 0.007; 
  const [payInfo, setPayInfo] = useState<any>({
    amount: "",
    ...data
  })


  const startPolling = (orderId: string) => {
    const poll = setInterval(async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/payment/status/${orderId}`);

        if (res.data.status === "confirmed" || res.data.status === "finished" || res.data.status === 'partially_paid') {
          clearInterval(poll);

          // close iframe
          setInvoiceUrl(null);
          setLoading(true);

          // register vote
          let nextRes
          if(privateSale){
            nextRes = await axios.post(successUrl, {
              order_id: orderId,
              token_amount: tokenAmount,
              amount: payInfo.amount
            });
          }else{
            nextRes = await axios.post(successUrl, {
              order_id: orderId
            });
          }

          setLoading(false);
          setShowOffCanvas(false)
          showAlert(nextRes, 'success')
          getTrends();
        }

      } catch (e) {
        console.log(e)
        showAlert(e, 'error')
        setLoading(false);
      }
    }, 5000); // every 5 seconds
  };

  const handlePay = async () => {
    if (!payInfo.amount) return toast.error('Please provide an amount!');

    if (minAmount && payInfo.amount < minAmount) return toast.error(`Minumum amount is $${minAmount}!`);

    if (maxAmount && payInfo.amount > maxAmount) return toast.error(`Maximum amount is $${maxAmount}!`);

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

  const handleUsdChange = (v: string) => {
    const parsed = parseFloat(v);
    setTokenAmount(parsed ? parsed / TOKEN_PRICE : 0);
  };

  return (
    <div className="flex flex-col gap-1">

      {!invoiceUrl && (
        <>
          <input
            type="number"
            value={payInfo.amount}
            onChange={(e) => {
              setPayInfo(prev => ({ ...prev, amount: e.target.value }));
              privateSale && handleUsdChange(e.target.value)
            }}
            placeholder="Enter amount"
            className={`${classMap.input()}`}
          />

          {privateSale && tokenAmount > 0 && (
              <p className="text-sm text-white">
                You’ll receive about
                <span className="font-bold ml-1 text-(--owner)">
                  {tokenAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} $DTA
                </span>
              </p>
            )}

          <button
            onClick={handlePay}
            disabled={loading}
            className={`${classMap.button()}`}
          >
            {loading ? <LoadingBar/> : "Pay"}
          </button>
        </>
      )}

      {loading && (
        <Loading/>
      )}

      {invoiceUrl && (
      <>
        <div className="flex flex-row items-end">
          <button className={`${classMap.button()} btn-sm`}
          onClick={() => {
            setInvoiceUrl(null)
          }} 
          >Cancel</button>
        </div>
        <iframe
          src={invoiceUrl}
          width="100%"
          height="696px"
          style={{ overflowY: "hidden", marginTop: "20px" }}
        >
          <span>Can't Load Widget</span>
        </iframe>
      </>
      )}
    </div>
  );

}