import { appUrl } from "@/dapp";
import React from "react";
import { Slide, Fade } from "react-awesome-reveal";

const AboutFaeces: React.FC = () => {
  return (
    <section
      id="about"
      className="aboutbg d-flex justify-between items-center w-full bg-[var(--accent)]  text-[var(--primary)] py-20 px-6 sm:px-16 flex flex-col md:flex-row gap-12 relative overflow-hidden"
    >
      {/* Background tech overlays */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--accent)] rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--accent)] rounded-full opacity-15 blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <Slide direction="left" triggerOnce>
        <div className="flex-1 max-w-md">
          <img
            src={`${appUrl}/images/sections/about/about_left.png`}
            alt="AI Research Illustration"
            className="rounded-lg hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Slide>

      {/* Text */}
      <Fade direction="left" triggerOnce>
        <div className="flex-1 space-y-6 max-w-lg">
          <h2 className="text-4xl font-extrabold tracking-wide mb-4">
            About <span className="text-[var(--owner)]">FAECES AI</span>
          </h2>
          <p className="text-[var(--primary)] text-lg leading-relaxed">
            FAECES AI is a powerful research and sentiment analysis tool for
            Web3 investors. It helps you track real-time market sentiment,
            analyze[var(--primary)]whitepapers, detect emerging narratives, and
            compare blockchain ecosystems with unparalleled precision.
          </p>
          <ul className="list-disc list-inside text-[var(--primary)] space-y-3 text-base">
            <li>Real-time sentiment tracking across crypto markets</li>
            <li>AI-powered[var(--primary)]whitepaper and KPI summarization</li>
            <li>Early detection of hype cycles and trend shifts</li>
            <li>Cross-chain ecosystem growth comparison</li>
            <li>Biometric security for signup, login and wallet creation</li>
          </ul>
          <p className="text-[var(--primary)] italic mt-6">
            All powered by{" "}
            <span className="font-semibold text-[var(--primary)]">$FAECES</span>
            , the memecoin that rides the wave from Bitcoin dominance dumps to
            altcoin pumps.
          </p>
        </div>
      </Fade>

      {/* Image */}
      <Slide direction="right" triggerOnce>
        <div className="flex-1 max-w-md">
          <img
            src={`${appUrl}/images/sections/about/about_right.png`}
            alt="AI Research Illustration"
            className="rounded-lg hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Slide>
    </section>
  );
};

export default AboutFaeces;
