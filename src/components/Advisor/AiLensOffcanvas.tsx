import React, { useContext, useEffect, useState } from "react";
import { OffCanvasContext } from "@/context/OffCanvasContext";
import axios from "axios";
import { appUrl } from "@/dapp";
import { classMap, Loading, parseAIResponse } from "@/components/Tools/Misc";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function AiLensOffcanvas({ projectId, projectName, lensData }) {
  const { setShowOffCanvas } = useContext(OffCanvasContext);
  const [isPaying, setIsPaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiData, setAiData] = useState(null);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  // --- Parse AI Lens Data ---
  useEffect(() => {
    if (lensData) {
      try {
        const parsed =
          typeof lensData.data === "string"
            ? JSON.parse(lensData.data)
            : lensData.data;

        if (parsed?.raw_text) {
          const jsonMatch = parsed.raw_text.match(/```json([\s\S]*?)```/);
          if (jsonMatch) {
            const cleanJSON = JSON.parse(jsonMatch[1]);
            setAiData(cleanJSON);
            setHasAnalyzed(true);
            return;
          }
        }

        setAiData(parsed);
        setHasAnalyzed(true);
      } catch (err) {
        console.error("Error parsing lensData:", err);
      }
    }
  }, [lensData]);

  // --- Animation Variants ---
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.4, ease: "easeOut" },
    }),
  };

  // --- Handlers ---
  // --- Handlers ---
  const handleLens = async () => {
    setIsPaying(true);
    try {
      const res = await axios.post(`${appUrl}/ai/lens-project`, {
        project_id: projectId,
        project_name: projectName,
      });

      if (res.data.status === "success") {
        const cleanData = parseAIResponse(res.data.ai_analysis);
        if (cleanData) {
          setAiData(cleanData);
          setHasAnalyzed(true);
          // console.log("✅ Parsed AI Data:", cleanData);
          toast.success("AI analysis completed successfully!");
        } else {
          toast.error("Could not parse AI response.");
        }
      } else {
        toast.error(
          res.data.message || "Something went wrong during analysis.",
        );
      }
    } catch (err) {
      console.error("❌ AI Lens Error:", err);
      toast.error("An error occurred while analyzing the project.");
    } finally {
      setIsPaying(false);
    }
  };

  const handleNewRequest = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${appUrl}/ai/lens-project`, {
        project_id: projectId,
        project_name: projectName,
        refresh: true,
      });

      if (res.data.status === "success") {
        const cleanData = parseAIResponse(res.data.ai_analysis);
        if (cleanData) {
          setAiData(cleanData);
          // console.log("♻️ Refreshed AI Data:", cleanData);
          toast.success("AI analysis refreshed successfully!");
        } else {
          toast.error("Failed to parse refreshed analysis.");
        }
      } else {
        toast.error("Failed to refresh AI analysis.");
      }
    } catch (err) {
      console.error("❌ New Request Error:", err);
      toast.error("Error sending new request. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Payment Screen ---
  if (!hasAnalyzed) {
    return (
      <div className="text-center space-y-4 p-6">
        <p className="text-lg font-semibold text-[var(--primary)]">
          This analysis costs{" "}
          <span className="text-[var(--owner)] font-bold">100 Lens</span>.
        </p>
        {/* <p className="opacity-75 text-sm">
          AI will generate a deep startup evaluation report for your project.
        </p> */}

        <div className="flex justify-center mt-6">
          <button
            className={classMap.button("bg-transparent", "bg-[var(--muted)]")}
            onClick={() => setShowOffCanvas(false)}
            disabled={isPaying}
          >
            Cancel
          </button>
          <button
            onClick={handleLens}
            disabled={isPaying}
            className={classMap.button(
              "bg-[var(--owner)] text-white hover:bg-[var(--owner)]/80",
              "",
              "",
              "",
              "right",
            )}
          >
            {isPaying ? "Analyzing..." : "Approve & Analyze"}
          </button>
        </div>
      </div>
    );
  }

  // --- Main Render ---
  return (
    <div className="space-y-8 p-5 text-[var(--primary)] ">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl bg-[var(--muted)]/10 p-5 border border-[var(--muted)]/30 backdrop-blur-sm shadow-lg"
          >
            <h2 className="text-xl font-bold text-[var(--owner)] mb-2">
              {projectName}
            </h2>
            <p className="text-sm opacity-80">{aiData?.overview}</p>
          </motion.div>

          {[
            {
              title: "Market Analysis",
              content: (
                <div className={classMap.sectionInfo()}>
                  <InfoRow
                    label="Industry Context"
                    value={aiData.market_analysis?.industry_context}
                  />
                  <InfoRow
                    label="Target Audience"
                    value={aiData.market_analysis?.target_audience}
                  />
                  <InfoRow
                    label="Competition Outlook"
                    value={aiData.market_analysis?.competition_outlook}
                  />
                </div>
              ),
            },
            {
              title: "Product Evaluation",
              content: (
                <div className={classMap.sectionInfo()}>
                  <InfoRow
                    label="Problem"
                    value={aiData.product_evaluation?.problem}
                  />
                  <InfoRow
                    label="Solution"
                    value={aiData.product_evaluation?.solution}
                  />
                  <InfoRow
                    label="Tech Stack"
                    value={aiData.product_evaluation?.tech_stack}
                  />
                  <InfoRow
                    label="Traction"
                    value={aiData.product_evaluation?.traction}
                  />
                </div>
              ),
            },
            {
              title: "Business Evaluation",
              content: (
                <div className={classMap.sectionInfo()}>
                  <InfoRow
                    label="Business Model"
                    value={aiData.business_evaluation?.business_model}
                  />
                  <InfoRow
                    label="Financials Summary"
                    value={aiData.business_evaluation?.financials_summary}
                  />
                  <InfoRow
                    label="Team Overview"
                    value={aiData.business_evaluation?.team_overview}
                  />
                  <InfoRow
                    label="Stage"
                    value={aiData.business_evaluation?.stage}
                  />
                  <InfoRow
                    label="Launch Date"
                    value={aiData.business_evaluation?.launch_date}
                  />
                </div>
              ),
            },
            {
              title: "Risks & Opportunities",
              content: (
                <div className="grid gap-5 mt-2">
                  {Object.entries(aiData.risk_and_opportunities || {}).map(
                    ([key, value], i) => (
                      <motion.div
                        key={i}
                        custom={i}
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className="rounded-lg border border-[var(--muted)]/20 bg-[var(--muted)]/10 p-4"
                      >
                        <h4 className="font-semibold text-[var(--owner)] mb-1 capitalize">
                          {key.replace("_", " ")}
                        </h4>
                        <ul className="list-disc list-inside text-xs opacity-80">
                          {value?.map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      </motion.div>
                    ),
                  )}
                </div>
              ),
            },
            // {
            //   title: "AI Recommendations",
            //   content: (
            //     <ul className="list-decimal list-inside space-y-2 text-sm opacity-90 pl-2">
            //       {aiData.ai_suggestions?.map((s, i) => (
            //         <li key={i} className="leading-snug">
            //           {s}
            //         </li>
            //       ))}
            //     </ul>
            //   ),
            // },
          ].map((section, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className={`${classMap.pageSection()} border border-[var(--muted)]/30 rounded-2xl p-5 shadow-sm bg-[var(--muted)]/5`}
            >
              <h3 className={classMap.sectionHeader()}>{section.title}</h3>
              {section.content}
            </motion.div>
          ))}

          <div className="flex justify-center mt-8">
            <button
              onClick={handleNewRequest}
              disabled={isLoading}
              className={classMap.button()}
            >
              {isLoading ? "Refreshing..." : "Send New Request (100 Lens)"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// --- Helper Subcomponent ---
function InfoRow({ label, value }) {
  return (
    <p className="text-sm mt-2">
      <span className="font-semibold text-[var(--owner)]">{label}:</span>{" "}
      <span className="opacity-85">{value}</span>
    </p>
  );
}
