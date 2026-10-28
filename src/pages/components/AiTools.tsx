import { appUrl } from "@/dapp";
import React from "react";
import { Fade, Slide } from "react-awesome-reveal";

const tools = [
  {
    title: "Real-Time Sentiment",
    desc: "Track market moods and sentiment signals as they unfold.",
    img: "/images/tools/sentiment.jpg",
  },
  {
    title: "Whitepaper & KPI Scanner",
    desc: "Summarize whitepapers, rank KPIs, and spot the real potential.",
    img: "/images/tools/whitepaper.jpg",
  },
  {
    title: "Ecosystem Comparisons",
    desc: "Compare growth across chains and protocols in real time.",
    img: "/images/tools/comparism.jpg",
  },
  {
    title: "Narrative Tracker",
    desc: "Identify early hype cycles and trend shifts pre mainstream.",
    img: "/images/tools/tracker.jpg",
  },
];

const AiTools: React.FC = () => {
  return (
    <section
      id="tools"
      className="relative text-[var(--primary)] py-16 px-6 sm:px-16 overflow-hidden"
    >
      {/* Background tech shapes */}
      <div className="absolute top-10 left-0 w-40 h-40 bg-[var(--accent)] rounded-full opacity-20 blur-3xl pointer-events-none animate-float"></div>
      <div className="absolute bottom-16 right-10 w-64 h-64 bg-[var(--bg)] rounded-full opacity-15 blur-3xl pointer-events-none animate-float animation-delay-2000"></div>

      <Fade cascade damping={0.3} duration={1200} triggerOnce>
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-12 text-center tracking-wide">
          AI-Powered Tools
        </h2>
      </Fade>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-7xl mx-auto">
        {tools.map(({ title, desc, img }, i) => (
          <Slide key={i} direction="up" triggerOnce delay={i * 200}>
            <div
              className={`relative group rounded-xl border border-[var(--border)] p-6 bg-[var(--accent)] bg-opacity-50 cursor-pointer overflow-hidden transition-all duration-500 hover:rounded-3xl  backdrop-blur-md
              }`}
            >
              {/* Animated border ring */}
              <span className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[var(--border)] animate-border-spin pointer-events-none"></span>

              {/* Image */}
              <img
                src={`${appUrl}${img}`}
                alt={title}
                className="w-full rounded-md mb-5 shadow-md"
              />

              <h3 className="text-xl font-semibold mb-3 text-[var(--primary)] group-hover:text-[var(--hover)] transition duration-300">
                {title}
              </h3>
              <p className="text-[--primary-foreground] text-base leading-relaxed">
                {desc}
              </p>
            </div>
          </Slide>
        ))}
      </div>
    </section>
  );
};

export default AiTools;
