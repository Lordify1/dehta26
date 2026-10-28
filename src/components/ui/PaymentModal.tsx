import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaCircleNotch, FaTimes, FaCheck, FaQrcode } from "react-icons/fa";
import axios from "axios"; // Your existing import

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  data?: Record<string, any>;
  apiUrl: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  data = {},
  apiUrl,
}) => {
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [polling, setPolling] = useState(false);
  const [pollCount, setPollCount] = useState(0);

  // Poll payment status every 2 seconds
  useEffect(() => {
    let pollInterval: NodeJS.Timeout | null = null;

    if (polling && paymentData?.payment_id) {
      pollInterval = setInterval(async () => {
        try {
          const res = await axios.get(
            `${apiUrl}/api/payment/status?payment_id=${paymentData.payment_id}`
          );

          if (res.data?.ok) {
            const status = res.data.payment?.status;
            setPaymentStatus(status);

            // Stop polling on confirmed or finished
            if (["confirmed", "finished"].includes(status)) {
              setPolling(false);
              toast.success("Payment confirmed!");
              setTimeout(() => onClose(), 2000);
            }

            setPollCount((prev) => prev + 1);
          }
        } catch (error) {
          console.error("Status check failed:", error);
        }
      }, 2000);
    }

    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [polling, paymentData?.payment_id, apiUrl, onClose]);

  const startPayment = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${apiUrl}/api/payment/create`, {
        amount,
        data,
      });

      console.log(res.data.data)

      const payment = res.data?.data;
      if (!payment?.payment_url) {
        toast.error("Payment URL not returned. Check your NOWPayments settings.");
        return;
      }

      setPaymentData(payment);
      setPaymentStatus("waiting");
      setPolling(true);
      setPollCount(0);
    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error(error?.response?.data?.message || "Failed to create payment");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-bold">Crypto Payment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl transition"
            disabled={polling}
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!paymentData ? (
            // Initial state - show amount and start button
            <div className="text-center space-y-6">
              <div>
                <p className="text-gray-600 text-sm">Amount to pay</p>
                <p className="text-4xl font-bold text-[#3dffc5]">${amount}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                <p>💳 You can pay with 70+ cryptocurrencies</p>
              </div>

              <button
                onClick={startPayment}
                disabled={loading}
                className="w-full bg-[#0d6b52] hover:bg-[#14936e] disabled:bg-[#146b52] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
              >
                {loading ? (
                  <>
                    <FaCircleNotch className="animate-spin" />
                    Creating payment...
                  </>
                ) : (
                  "Proceed to Payment"
                )}
              </button>
            </div>
          ) : (
            // Payment active - show details
            <div className="space-y-6">
              {/* Status Badge */}
              <div className="text-center">
                {paymentStatus === "waiting" && (
                  <span className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
                    ⏳ Waiting for payment...
                  </span>
                )}
                {paymentStatus === "confirming" && (
                  <span className="inline-block bg-[#12382e] text-[#3dffc5] px-4 py-2 rounded-full text-sm font-semibold">
                    ⏱️ Confirming payment...
                  </span>
                )}
                {["confirmed", "finished"].includes(paymentStatus) && (
                  <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center justify-center gap-2">
                    <FaCheck /> Payment confirmed!
                  </span>
                )}
              </div>

              {/* Amount */}
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-600 text-sm mb-1">Amount</p>
                <p className="text-2xl font-bold">${paymentData.price_amount}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Pay in <strong>{paymentData.pay_currency}</strong>
                </p>
              </div>

              {/* Payment Info */}
              <div className="bg-[#10241e] p-4 rounded-lg space-y-3">
                <p className="text-sm text-gray-700 font-semibold">
                  📋 Payment Details
                </p>

                <div className="space-y-2 text-xs">
                  <div>
                    <p className="text-gray-600 mb-1">Order ID</p>
                    <p className="font-mono bg-white p-2 rounded border break-all">
                      {paymentData.order_id}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Payment ID</p>
                    <p className="font-mono bg-white p-2 rounded border break-all">
                      {paymentData.payment_id}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <a
                  href={paymentData.payment_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <FaQrcode /> Open Payment Page
                </a>

                <button
                  onClick={() => copyToClipboard(paymentData.payment_url)}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg text-sm transition"
                >
                  Copy Payment Link
                </button>
              </div>

              {/* Polling status */}
              {polling && (
                <div className="text-center text-xs text-gray-500">
                  🔄 Checking payment... ({pollCount} checks)
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;