import { useEffect, useState } from "react";
import { classMap } from "@/components/Tools/Misc";
import SendRequest from "@/components/Tools/SendRequest";
import {
  FaBriefcase,
  FaTasks,
  FaMoneyBillWave,
  FaBuilding,
  FaCalendarAlt,
  FaUsers,
  FaClipboardList,
  FaDollarSign,
  FaClock,
  FaHashtag,
  FaICursor
} from "react-icons/fa";
import { useMisc } from '@/context/MiscContext';
import { IoNotificationsCircle } from "react-icons/io5";

type EarnFiCreateFormProps = {
  type: "job" | "task";
};

type EarnFiOfferFormData = {
  type: "job" | "task";
  title: string;
  description: string;
  organization_name: string;
  reward_type: "fixed" | "monthly" | "per_task";
  reward_amount: string;
  currency: string;
  escrow_ref: string;
  origin: "direct" | "indirect";
  external_url?: string;
  expires_at?: string;

  // Job only
  employment_type?: "one_time" | "contract" | "monthly";
  job_duration?: string;

  // Task only
  max_participants?: string;
  proof_requirements?: string;
};

const EarnFiCreateForm = ({ type }: EarnFiCreateFormProps) => {

  const {getEarnFiOffers} = useMisc()

  const [data, setData] = useState<EarnFiOfferFormData>({
    type: "",
    title: "",
    description: "",
    organization_name: "",
    reward_type: type === "job" ? "monthly" : "per_task",
    reward_amount: "",
    currency: "USD",
    escrow_ref: "",
    origin: "direct",
    external_url: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setData(prev => ({...prev, type: type}))
  }, [type])

  const [agreeToFee, setAgreeToFee] = useState(false);

  const rewardAmountNum = type === 'job' ? Number(data.reward_amount) || 0 : Number(data?.reward_amount) *  Number(data?.max_participants);
  const platformFee = rewardAmountNum * 0.05;

  return (
    <section className="flex flex-col gap-4">

      {/* Title */}
      <div>
        <label className={classMap.label()}>
          <FaBriefcase className="inline mr-2 opacity-70 text-[var(--owner)]" />
          Offer Title
        </label>
        <input
          className={classMap.input()}
          name="title"
          value={data.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className={classMap.label()}>
          <FaClipboardList className="inline mr-2 opacity-70 text-[var(--owner)]" />
          Description
        </label>
        <textarea
          className={classMap.input()}
          name="description"
          value={data.description}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>

      {/* Organization */}
      <div>
        <label className={classMap.label()}>
          <FaBuilding className="inline mr-2 opacity-70 text-[var(--owner)]" />
          Organization / Project Name
        </label>
        <input
          className={classMap.input()}
          name="organization_name"
          value={data.organization_name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Reward */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={classMap.label()}>
            <FaMoneyBillWave className="inline mr-2 opacity-70 text-[var(--owner)]" />
            Reward Type
          </label>
          <select 
            className={`${classMap.select()} [&>option]:bg-slate-900 [&>option]:text-white`}
            name="reward_type"
            value={data.reward_type}
            onChange={handleChange}
          >
            {type === "job" && <option value="monthly">Monthly</option>}
            <option value="fixed">Fixed</option>
            {type === "task" && <option value="per_task">Per Task</option>}
          </select>
        </div>

        <div>
          <label className={classMap.label()}>
            <FaDollarSign className="inline mr-2 opacity-70 text-[var(--owner)]"/>
            Amount
            </label>
          <input
            className={classMap.input()}
            name="reward_amount"
            value={data.reward_amount}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <label className={classMap.label()}>Listing lane</label>
        <select
          className={`${classMap.select()} [&>option]:bg-slate-900 [&>option]:text-white`}
          name="origin"
          value={data.origin}
          onChange={handleChange}
        >
          <option value="direct">Direct — partner contacted Dehta</option>
          <option value="indirect">Indirect — external opportunity</option>
        </select>
        <p className="mt-2 text-xs text-white/60">
          Direct means the partner came to the platform and is treated as legit. Indirect stays visible, but people are told to tread carefully.
        </p>
      </div>

      {data.origin === "indirect" && (
        <div>
          <label className={classMap.label()}>External link</label>
          <input
            className={classMap.input()}
            name="external_url"
            value={data.external_url || ""}
            onChange={handleChange}
            placeholder="https://"
            required
          />
        </div>
      )}

      {/* Expiry */}
      <div>
        <label className={classMap.label()}>
          <FaCalendarAlt className="inline mr-2 opacity-70 text-[var(--owner)]" />
          Expiration Date
        </label>
        <input
          type="date"
          className={classMap.input()}
          name="expires_at"
          onChange={handleChange}
        />
      </div>

      {/* JOB ONLY */}
      {type === "job" && (
        <>
          <div>
            <label className={classMap.label()}>
              <FaBriefcase className="inline mr-2 opacity-70 text-[var(--owner)]" />
              Employment Type
            </label>
            <select 
              className={`${classMap.select()} [&>option]:bg-slate-900 [&>option]:text-white`}
              name="employment_type"
              onChange={handleChange}
            >
              <option value="one_time">One-time</option>
              <option value="contract">Contract</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div>
            <label className={classMap.label()}>
                <FaClock className="inline mr-2 opacity-70 text-[var(--owner)]"/>
                Job Duration</label>
            <input
              className={classMap.input()}
              name="job_duration"
              placeholder="e.g. 14 days"
              onChange={handleChange}
            />
          </div>
        </>
      )}

      {/* TASK ONLY */}
      {type === "task" && (
        <>
          <div>
            <label className={classMap.label()}>
              <FaUsers className="inline mr-2 opacity-70 text-[var(--owner)]" />
              Max Participants
            </label>
            <input
              className={classMap.input()}
              name="max_participants"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className={classMap.label()}>
              <FaTasks className="inline mr-2 opacity-70 text-[var(--owner)]" />
              Proof Requirements
            </label>
            <textarea
              className={classMap.input()}
              name="proof_requirements"
              rows={3}
              placeholder="Tweet link + screenshot, etc"
              onChange={handleChange}
            />
          </div>
        </>
      )}

      <div className={`${classMap.glassEffect("p-4")} mb-4`}>
        <p className="text-sm text-white/80 leading-relaxed">
            Dehta Labs uses an escrow system to protect participants.
            Before your offer is published, you are required to pre-fund
            <span className="font-semibold text-white mx-1"> {type === 'job' ? '50%' : '100%'}</span>
            of the total payout.
        </p>
      </div>

      <div>
        <label className={classMap.label()}>
            <FaHashtag className="inline mr-2 opacity-70 text-[var(--owner)]" />
            Escrow Transaction Hash
        </label>

        <input
            className={classMap.input()}
            name="escrow_ref"
            value={data.escrow_ref}
            onChange={handleChange}
            placeholder="Paste the blockchain transaction hash here"
            required
        />

        <div className={`${classMap.glassEffect("p-4")} space-y-3`}>
  <div className="flex items-start gap-2 mt-3">
    <IoNotificationsCircle className="mt-[2px] text-[var(--owner)]" />
    <p className="text-sm text-white/80 leading-relaxed">
      To activate this offer, you must pre-fund
      <span className="font-semibold text-white mx-1">
        {type === "job" ? "50%" : "100%"}
      </span>
      of the total reward amount via escrow.
    </p>
  </div>

  <div className="grid grid-cols-2 gap-3 text-sm">
    <div>
      <p className="text-white/50">Wallet</p>
      <p className="font-mono text-white break-all">
        0xb7dAD77514A1e63eADe8cf3DA172481274AC5330
      </p>
    </div>

    <div>
      <p className="text-white/50">Network</p>
      <p className="text-white">Base ETH</p>
    </div>
  </div>

  <p className="text-xs text-white/50">
    Paste the transaction hash below after completing payment.
    Offers without a valid escrow transaction will not be approved.
  </p>
</div>

        </div>
      <div className={`${classMap.glassEffect("p-4")} space-y-2`}>
        {/* <p className="text-sm text-white/80 leading-relaxed">
          Dehta Labs charges a
          <span className="font-semibold text-white mx-1">5%</span>
          platform fee on every offer created.
        </p> */}

        {/* {rewardAmountNum > 0 && (
          <p className="text-sm text-white/70">
            You will be paying
            <span className="font-semibold text-white mx-1">
              ${platformFee.toFixed(2)}
            </span>
            as a platform fee.
          </p>
        )} */}

        {/* <label className="flex items-start gap-2 mt-2 cursor-pointer">
          <input
            type="checkbox"
            checked={agreeToFee}
            onChange={(e) => setAgreeToFee(e.target.checked)}
            className="mt-1"
          />
          <span className="text-sm text-white/70 leading-snug">
            I understand and agree to pay the 5% platform fee to Dehta Labs.
          </span>
        </label> */}
      </div>

      {/* Submit */}
      <SendRequest
        url="/api/earnfi/create"
        data={data}
        onResponse={() => getEarnFiOffers()}
        method="post"
        text={`Create ${type === "job" ? "Job" : "Task"}`}
        className="mt-4"
        // disabled={!agreeToFee}
      />
    </section>
  );
};

export default EarnFiCreateForm;