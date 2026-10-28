import { Link } from "react-router-dom";

export default function AESubmissionDetail({ submission }) {
  const isJob = submission.offer?.type === "job";


  const files = JSON.parse(submission?.submission_files ?? [])

  return (
    <div className="space-y-4">
      <div>
        <strong>Applicant</strong>
        <p>
          {submission.user?.name || submission.full_name}
        </p>
      </div>

      <div>
        <strong>Email</strong>
        <p>{submission.user?.email}</p>
      </div>

      {isJob ? (
        <>
          <div className="block">
            <strong>CV</strong>
            <Link to={submission.cv_url} target="_blank text-underline text-[#3dffc5]">View</Link>
          </div>
          {/* <div>
            <strong>Profile</strong>
            <a href={submission.profile_link} target="_blank">Open</a>
          </div> */}
          <div>
            <strong>Cover Note</strong>
            <p>{submission.cover_note}</p>
          </div>
        </>
      ) : (
        <>
          <div>
            <strong>Link</strong>
            <Link to={submission.profile_link} target="_blank">{submission.profile_link}</Link>
          </div>
          <div>
            <strong>Screenshot Proof</strong>
            <img src={files[0]}/>
          </div>
          <div>
            <strong>Notes</strong>
            <p>{submission.notes}</p>
          </div>
        </>
      )}

      {submission.reject_reason && (
        <div className="text-red-500">
          <strong>Reject Reason</strong>
          <p>{submission.reject_reason}</p>
        </div>
      )}
    </div>
  );
}
