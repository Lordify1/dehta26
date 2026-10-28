import { classMap } from "@/components/Tools/Misc"
import SendRequest from "@/components/Tools/SendRequest";
import { useState } from "react";
import { ImageUploadDiv } from "../../Tools/Misc";
import { apiUrl } from "../../../App";
import { useMisc } from "@/context/MiscContext";


type FormData = {
  title: string;
  body: string;
  options: string[];
  correct: number | "";
  image: any
};

const TrendBetCreatorForm = () => {
  const optionsCount = 4;
  const {getTrends} = useMisc()

  const [data, setData] = useState<FormData>({
    title: "",
    body: "",
    options: Array(optionsCount).fill(""),
    correct: "",
    image: ""
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

  return (
    <section className="flex flex-col gap-6">

      {/* Question */}
      <div>
        <label className={classMap.label()} htmlFor="body">Question</label>
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

      <ImageUploadDiv
      value={data.image || ""}
      onChange={(fileUrl) => setData((prev) => ({...prev, image: fileUrl}))}
      uploadUrl={`${apiUrl}/api/upload-file`}
      deleteUrl={`${apiUrl}/api/delete-file`}
      path="/files/trendbets/"
      />

      <SendRequest
        url={`/api/trendbet/create`}
        data={data}
        onResponse={() => getTrends()}
        text="Create Trend"
        method="post"
      />
    </section>
  );
};

export default TrendBetCreatorForm;