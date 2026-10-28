import { classMap } from "@/components/Tools/Misc";
import SendRequest from "@/components/Tools/SendRequest";
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";

type WithdrawalFormData = {
  usdc_address: string;
  amount: string;
};

const LensWithdrawal = () => {
  const { user } = useUser();

  const [data, setData] = useState<WithdrawalFormData>({
    usdc_address: "",
    amount: "",
  });

  useEffect(() => {
    if (user) {
      setData({
        usdc_address: user.usdc_address || "",
        amount: "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const withdrawals = user?.withdrawals || [];

  return (
    <section className="flex flex-col gap-4">
      {/* WITHDRAWAL FORM */}
      <div className="p-3 rounded bg-gray-100/5">
        <h3 className="font-semibold mb-2">Withdraw LENS</h3>

        <div className="mb-2">
          <label className={classMap.label()}>Available Balance</label>
          <div className="text-sm text-muted-foreground">
            {user?.total_lens ?? 0} LENS
          </div>
        </div>

        <div>
          <label className={classMap.label()} htmlFor="usdc_address">
            USDC Address
          </label>
          <input
            className={classMap.input()}
            type="text"
            name="usdc_address"
            id="usdc_address"
            value={data.usdc_address}
            disabled
          />
        </div>

        <div>
          <label className={classMap.label()} htmlFor="amount">
            Amount (LENS)
          </label>
          <input
            className={classMap.input()}
            type="number"
            name="amount"
            id="amount"
            min={0}
            max={user?.total_lens || 0}
            placeholder="Enter amount"
            value={data.amount}
            onChange={handleChange}
            required
          />
        </div>

        <SendRequest
          url="/api/lens/withdraw"
          method="post"
          data={data}
          text="Withdraw LENS"
          className="mt-3"
        />
      </div>

      {/* WITHDRAWAL HISTORY */}
      <div className="p-3 rounded bg-gray-100/5">
        <h3 className="font-semibold mb-2">Withdrawal History</h3>

        {withdrawals.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No withdrawals yet. Everyone starts somewhere.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Amount</th>
                  <th className="text-left p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((w: any, index: number) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="p-2">
                      {new Date(w.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-2">{w.amount} LENS</td>
                    <td className="p-2 capitalize">{w.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default LensWithdrawal;
