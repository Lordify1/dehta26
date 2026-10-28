import { classMap } from "../../Tools/Misc";
import { useMisc } from '@/context/MiscContext';
import { useOffCanvas } from '@/context/OffCanvasContext';
import { IoShield, IoShieldCheckmark } from "react-icons/io5";
import { offerLink, offerOrigin } from "@/lib/offerOrigin";


type JobType = {
  title?: string;
  position?: string;
  reward_amount: string;
  reward_type: string;
  job_duration?: string;
  organization_name?: string;
  is_funded?: boolean;
  logo?: string;
  slug?: any;
  origin?: string;
  external_url?: string;
};

type TaskType = {
  title: string;
  reward_amount: string;
  reward_type: string;
  max_participants?: number;
  current_participants?: number;
  platform?: string;
  is_funded?: boolean;
  icon?: string;
  slug?: any;
  origin?: string;
  external_url?: string;
};

type Props = {
  type: 'job' | 'tasks';
  Job?: JobType;
  Task?: TaskType;
  row?: boolean;
};


const EarnFiCard = ({ type, Job, Task, row = false }: Props) => {
  const {setEarnFiOffer} = useMisc();
  const { setShowOffCanvas, setOffId, SetOfftitle } = useOffCanvas();
  const item: any = type === "job" ? Job : Task;
  const origin = offerOrigin(item);
  const direct = origin === "direct";
  const link = offerLink(item);

  const open = () => {
    setEarnFiOffer(item);
    setOffId('submit_job_or_task');
    setShowOffCanvas(true);
    SetOfftitle(`${type === "job" ? "Job" : "Task"} ${String(item?.slug || item?.title || "").toUpperCase()}`);
  };

  if (row) {
    return (
      <tr className="border-b border-white/10">
        <td className="py-3 pr-3 font-medium">{item?.title || item?.position}</td>
        <td className="py-3 pr-3">${item?.reward_amount} {item?.reward_type}</td>
        <td className="py-3 pr-3 text-white/60">{item?.organization_name || item?.platform || "Open desk"}</td>
        <td className="py-3">
          <button className="text-[#3dffc5] underline" onClick={open}>Open</button>
        </td>
      </tr>
    );
  }

  return (
    <div className={`w-full rounded-2xl border p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] ${direct ? "border-emerald-400/40 bg-[#07140e]" : "border-amber-400/40 bg-[#161006]"}`}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className={`rounded-full px-2 py-1 text-[10px] font-bold tracking-[0.16em] ${direct ? "bg-emerald-400 text-black" : "bg-amber-300 text-black"}`}>
          {direct ? "DIRECT" : "INDIRECT"}
        </span>
        {item?.is_funded ? <IoShieldCheckmark title="Funded" className="text-emerald-400"/> : <IoShield title="Not Funded" className="text-red-400"/>}
      </div>

      <h3 className="text-lg font-semibold text-white">{item?.title || item?.position}</h3>
      <p className="mt-1 text-sm text-white/60">
        {item?.organization_name || item?.platform || "Open desk"} · ${item?.reward_amount} {item?.reward_type}
      </p>
      <p className={`mt-3 text-xs leading-relaxed ${direct ? "text-emerald-200/80" : "text-amber-100/80"}`}>
        {direct
          ? "Partner contacted Dehta directly. Treated as legit."
          : "External opportunity. Useful, but tread carefully."}
      </p>
      {link && (
        <a href={link} target="_blank" rel="noreferrer" className="mt-2 block truncate text-xs text-white/50 underline">
          {link}
        </a>
      )}

      <button className={`${classMap.button()} mt-4 w-full`} onClick={open}>
        {type === "job" ? "Open job" : "Open task"}
      </button>
    </div>
  );
};

export default EarnFiCard;
