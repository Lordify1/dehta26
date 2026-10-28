import { classMap } from "@/components/Tools/Misc"
import SendRequest from "@/components/Tools/SendRequest";
import { useEffect, useState } from "react";


type FormData = {
  body: string;
  options: string[];
  correct: number | "";
  reward: number;
  status: any
};

type Props = {
  EditData?: any,
  onClose: any,
  onResponse: any,
}

const QuestForm = ({onClose, onResponse, EditData} : Props) => {
  const optionsCount = 4;
  const getQuests = [];

  const [data, setData] = useState<FormData>({
    body: "",
    options: Array(optionsCount).fill(""),
    correct: "",
    reward: 100,
    status: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("option-")) {
      const idx = Number(name.split("-")[1]);
      setData(prev => {
        const opts = [...prev.options];
        opts[idx] = value;
        return { ...prev, options: opts };
      });
      return;
    }

    setData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if(EditData){
      setData((prev) => ({
        ...prev,
        id: EditData.id || "",
        body: EditData.body || "",
        status: EditData.status || "",
      }));
    }
  }, [EditData])

  return (
    <section className="flex flex-col gap-6">

      {/* Question */}
      <div>
        <label className={classMap.label()} htmlFor="body">Quest</label>
        <input
          className={classMap.input()}
          type="text"
          name="body"
          id="body"
          required
          value={data.body}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className={classMap.label()} htmlFor="reward">Reward</label>
        <input
          className={classMap.input()}
          type="number"
          name="reward"
          id="reward"
          required
          value={data.reward}
          onChange={handleChange}
        />
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: optionsCount }).map((_, idx) => (
          <div key={idx}>
            <label className={classMap.label()} htmlFor={`option-${idx}`}>
              Option {idx + 1}
            </label>
            <input
              className={classMap.input()}
              type="text"
              id={`option-${idx}`}
              name={`option-${idx}`}
              value={data.options[idx]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
      </div>

      {/* Correct option selector */}
      {/* Correct option selector – only shows if user filled all options */}
        {data.options.every(opt => opt.trim() !== "") && (
            <div>
                <label className={classMap.label()}>Correct Option</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                {data.options.map((option, idx) => {
                    const active = data.correct === idx;
                    return (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => setData(prev => ({ ...prev, correct: idx }))}
                        className={`
                        w-full p-2 rounded-xl border transition-all
                        ${
                            active
                            ? "bg-(--owner) text-black border-(--owner)"
                            : "bg-white/10 text-white/70 border-white/20 hover:bg-white/20"
                        }
                        `}
                    >
                        {option || `Option ${idx + 1}`}
                    </button>
                    );
                })}
                </div>
            </div>
        )}

      <div>
        <label className={classMap.label()} htmlFor="status">Status</label>
        <select name="status" id="status" required onChange={handleChange} value={data.status} className={classMap.input()}>
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <SendRequest
        url={`/api/admin/quest/save`}
        data={data}
        onResponse={() => {onClose; onResponse}}
        text="Create Quest"
        method="post"
      />
    </section>
  );
};

export default QuestForm;