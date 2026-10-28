import axios from "axios";
import { classMap } from "../Tools/Misc";
import { apiUrl } from "../../App";
import { useAdmin } from "@/context/AdminContext";

export default function ATVotesView() {
  const { selectedVotes, setSelectedVotes } = useAdmin();

  const changeStatus = async (id: number, status: number) => {
    try {
      const resp = await axios.post(
        `${apiUrl}/api/admin/trendbet/update/paid/status/${id}/${status}`
      );

      const updatedVote = resp?.data?.vote;

      setSelectedVotes((prev: any[]) =>
        prev.map(v => (v.id === updatedVote.id ? updatedVote : v))
      );
    } catch (err) {
      console.error("Failed to update vote status", err);
    }
  };

  const STATUS_OPTIONS = [
    { value: 1, text: "Paid Out" },
    { value: 0, text: "Not Paid" },
  ];

  if (!selectedVotes?.length) {
    return <p className="text-center text-gray-400">No votes selected</p>;
  }

  return (
    <div className="space-y-4">
      {selectedVotes.map((it: any) => (
        <div
          key={it.id}
          className={`${classMap.glassCard()} flex items-center justify-between`}
        >
          <section>
            <p className="font-medium">{it?.user?.username}</p>
            <p
              className={
                it?.option?.is_correct === 1
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {it?.option?.option_text}
            </p>
          </section>

          <section className="flex flex-col items-end gap-2">
            {it?.option?.is_correct === 1 && (
              <select
                value={it?.paid_out}
                onChange={e =>
                  changeStatus(it.id, Number(e.target.value))
                }
                className={classMap.select()}
              >
                {STATUS_OPTIONS.map(s => (
                  <option key={s.value} value={s.value}>
                    {s.text}
                  </option>
                ))}
              </select>
            )}
            <p className="font-semibold">${it?.amount}</p>
          </section>
        </div>
      ))}
    </div>
  );
}