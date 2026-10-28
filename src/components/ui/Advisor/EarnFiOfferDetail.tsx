import { classMap } from "@/components/Tools/Misc";
import {
  FaBriefcase,
  FaTasks,
  FaBuilding,
  FaMoneyBillWave,
  FaUsers,
  FaCheckCircle,
  FaClock
} from "react-icons/fa";
import EarnFiSubmissionForm from "../../Advisor/Forms/EarnFiSubmissionForm";
import { useUser } from "@/context/UserContext";
import { CopyToClipboard, NotAuth } from "../../Tools/Misc";
import { appUrl } from "../../../App";
import { offerLink, offerOrigin } from "@/lib/offerOrigin";


type EarnFiOffer = {
  id: number;
  type: "job" | "task";
  title: string;
  description: string;
  organization_name: string;
  organization_logo?: string;
  reward_amount: number;
  reward_type: string;
  currency: string;
  employment_type?: string;
  job_duration?: string;
  max_participants?: number;
  current_participants?: number;
  proof_requirements?: string;
  is_funded: boolean;
  expires_at?: string;
  slug?: any;
};

type Props = {
  offer: EarnFiOffer;
};

const EarnFiOfferDetail = ({ offer }: Props) => {

    const {user} = useUser()
    const origin = offerOrigin(offer);
    const link = offerLink(offer);
    const direct = origin === "direct";


  return (
    <section className="max-w-3xl mx-auto space-y-6">
      <div className={`rounded-2xl border p-4 ${direct ? "border-emerald-400/40 bg-emerald-400/10" : "border-amber-300/40 bg-amber-300/10"}`}>
        <p className="text-xs font-bold tracking-[0.2em]">{direct ? "DIRECT LINK" : "INDIRECT LINK"}</p>
        <p className="mt-1 text-sm text-white/80">
          {direct
            ? "This partner contacted Dehta directly. Treated as legit."
            : "External opportunity. It can be useful, but tread carefully."}
        </p>
        {link && (
          <a href={link} target="_blank" rel="noreferrer" className="mt-2 block break-all text-sm underline">
            {link}
          </a>
        )}
      </div>

      {/* HEADER */}
      <div className={classMap.glassCard("p-6")}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white mb-1">
              {offer.title}
            </h1>

            <p className="text-white/70 flex items-center gap-2">
              <FaBuilding className="opacity-70" />
              {offer.organization_name}
            </p>
          </div>

          <div className="flex flex-col items-end space-y-2">
            <span className={classMap.badge(offer.is_funded ? "success" : "error")}>
              {offer.is_funded ? "FUNDED" : "NOT FUNDED"}
            </span>

            {
              <CopyToClipboard
              text={`${appUrl}/earnfi?slug=${offer.slug.toLowerCase()}&type=${offer.type}`}
              alertMessage={`Offer Link Copied`}
              />
            }
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className={classMap.glassCard()}>
        <h3 className={classMap.sectionHeader()}>
          {offer.type === "job" ? "Job Description" : "Task Description"}
        </h3>
        <p className="text-white/80 leading-relaxed mt-2 whitespace-pre-wrap">
          {offer.description}
        </p>
      </div>

      {/* META GRID */}
      <div className="grid grid-cols-1 gap-4">

        {/* Reward */}
        <div className={classMap.glassEffect()}>
          <FaMoneyBillWave className="mb-2 text-[var(--owner)]" />
          <p className="text-sm opacity-70">Reward</p>
          <p className="font-bold text-lg">
            ${offer.reward_amount} {offer.currency}
            <span className="text-sm opacity-60 ml-1">
              / {offer.reward_type.replace('_', ' ').toUpperCase()}
            </span>
          </p>
        </div>

        {/* Expiry */}
        {offer.expires_at && (
          <div className={classMap.glassEffect()}>
            <FaClock className="mb-2 text-[var(--owner)]" />
            <p className="text-sm opacity-70">Expires</p>
            <p className="font-semibold">
              {new Date(offer.expires_at).toLocaleDateString()}
            </p>
          </div>
        )}

        {/* JOB META */}
        {offer.type === "job" && (
          <>
            <div className={`${classMap.glassEffect('p-3')} block items-center justify-center`}>
              <FaBriefcase className="mb-2 text-[var(--owner)]" />
              <p className="text-sm opacity-70">Employment Type</p>
              <p className="font-semibold">{offer.employment_type?.toUpperCase()}</p>
            </div>

            {offer.job_duration && (
              <div className={classMap.glassEffect()}>
                <FaClock className="mb-2 text-[var(--owner)]" />
                <p className="text-sm opacity-70">Duration</p>
                <p className="font-semibold">{offer.job_duration} DAYS</p>
              </div>
            )}
          </>
        )}

        {/* TASK META */}
        {offer.type === "task" && (
          <>
            <div className={classMap.glassEffect()}>
              <FaUsers className="mb-2 text-[var(--owner)]" />
              <p className="text-sm opacity-70">Participants</p>
              <p className="font-semibold">
                {offer.current_participants} / {offer.max_participants || "∞"}
              </p>
            </div>

            <div className={classMap.glassEffect()}>
              <FaCheckCircle className="mb-2 text-[var(--owner)]" />
              <p className="text-sm opacity-70">Proof Required</p>
              <p className="text-sm opacity-90 whitespace-pre-wrap">
                {offer.proof_requirements}
              </p>
            </div>
          </>
        )}
      </div>

      {/* APPLY SECTION */}
      <div>
        <h3 className={classMap.sectionHeader()}>
          {offer.type === "job" ? "Apply for this Job" : "Submit Task Proof"}
        </h3>

        {user ? (
            <EarnFiSubmissionForm
          offerId={offer.id}
          type={offer.type}
        />
        ) : (
            <NotAuth action="to Contribute"/>
        )}
      </div>
    </section>
  );
};

export default EarnFiOfferDetail;