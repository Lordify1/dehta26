import { useState } from "react";
import SendRequest from "@/components/Tools/SendRequest";
import { classMap } from "@/components/Tools/Misc";
import { ImageUploadDiv } from "@/components/Tools/Misc";
import {
  FaLink,
  FaFileAlt,
  FaImage,
  FaStickyNote
} from "react-icons/fa";
import { useMisc } from '@/context/MiscContext';
import { apiUrl } from "../../../App";


type Props = {
  offerId: number;
  type: "job" | "task";
};

const EarnFiSubmissionForm = ({ offerId, type }: Props) => {

    const {getEarnFiOffers} = useMisc();
  
  const [data, setData] = useState({
    cv_url: "",
    cover_note: "",
    profile_link: "",
    submission_image: "",
    notes: ""
  });




  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className={classMap.glassCard("p-6")}>

      {/* JOB SUBMISSION */}
      {type === "job" && (
        <>
        <div>
          <label className={classMap.label()}>
            <FaFileAlt className="mr-2 text-[var(--owner)]" />
            CV / Pitch Deck / Profile Link
          </label>

          <input
            name="cv_url"
            className={classMap.input()}
            placeholder="Paste Google Drive, Notion, or portfolio link here"
            value={data.cv_url}
            onChange={handleChange}
            required
          />

          <p className="text-xs text-white/50 mt-1">
            Upload your file to Drive and share the access link.
          </p>
        </div>

        <div>
            <label className={classMap.label()}>
              <FaStickyNote className="mr-2 text-[var(--owner)]" />
              Cover Note
            </label>

            <textarea
              name="cover_note"
              rows={3}
              className={classMap.input()}
              placeholder="Anything we should know?"
              value={data.cover_note}
              onChange={handleChange}
            />
          </div>
          </>
      )}

      {/* TASK SUBMISSION */}
      {type === "task" && (
        <>
          <div>
            <label className={classMap.label()}>
              <FaLink className="mr-2 text-[var(--owner)]" />
              Proof Link
            </label>

            <textarea
              name="profile_link"
              rows={3}
              className={classMap.input()}
              placeholder="Tweet link, post URL, etc"
              value={data.profile_link}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className={classMap.label()}>
              <FaImage className="mr-2 text-[var(--owner)]" />
              Screenshot Proof (optional)
            </label>

            <ImageUploadDiv
              value={data.submission_image}
              uploadUrl={`${apiUrl}/api/upload-file`}
              deleteUrl={`${apiUrl}/api/delete-file`}
              path="/files/earnfi/submissions/"
              label="Upload Screenshot"
              onChange={(url) =>
                setData(prev => ({ ...prev, submission_image: url || "" }))
              }
            />
          </div>

          <div>
            <label className={classMap.label()}>
              <FaStickyNote className="mr-2 text-[var(--owner)]" />
              Notes (optional)
            </label>

            <textarea
              name="notes"
              rows={3}
              className={classMap.input()}
              placeholder="Anything we should know?"
              value={data.notes}
              onChange={handleChange}
            />
          </div>
        </>
      )}

      {/* SUBMIT */}
      <SendRequest
        url={`/api/earnfi/${offerId}/submit`}
        data={
          type === "job"
            ? { cover_note: data.cover_note, cv_url: data.cv_url }
            : {
                submission_link: data.submission_link,
                submission_image: data.submission_image,
                notes: data.notes
              }
        }
        onResponse={() => getEarnFiOffers()}
        method="post"
        text="Submit"
        className="mt-4 w-full"
      />
    </section>
  );
};

export default EarnFiSubmissionForm;