export default function OfferDetails({ offer }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold">Title</h3>
        <p>{offer.title}</p>
      </div>

      <div>
        <h3 className="font-semibold">Type</h3>
        <p>{offer.type}</p>
      </div>

      <div>
        <h3 className="font-semibold">Description</h3>
        <p>{offer.description}</p>
      </div>

      <div>
        <h3 className="font-semibold">Requirements</h3>
        <pre className="bg-muted p-3 rounded">
          {JSON.stringify(offer.requirements, null, 2)}
        </pre>
      </div>

      <div>
        <h3 className="font-semibold">Reward</h3>
        <p>
          {offer.reward_amount} {offer.currency}
        </p>
      </div>

      <div>
        <h3 className="font-semibold">Escrow Reference</h3>
        <p className="break-all">{offer.escrow_reference}</p>
      </div>

      <div>
        <h3 className="font-semibold">Submissions</h3>
        <p>{offer.submissions_count}</p>
      </div>

      <div>
        <h3 className="font-semibold">Created By</h3>
        <p>{offer.creator?.name}</p>
      </div>
    </div>
  );
}
