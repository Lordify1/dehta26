// src/Pages/Sections/Why.tsx

import { Fade } from "react-awesome-reveal";
import { classMap } from "../Tools/Misc";
import { appUrl } from "@/dapp";
import {
  FaCheckCircle,
  FaHandHoldingUsd,
  FaHandshake,
  FaNetworkWired,
} from "react-icons/fa";

const reasons = [
  {
    title: "Track Record",
    description:
      "Team has evolved projects from Game, AI sectors worth millions of dollars",
    image: (
      <FaCheckCircle
        className={`text-[var(--primary)] mt-2 w-full h-20 object-cover ${classMap.hoverAnimate()}`}
      />
    ),
  },
  {
    title: "Succesful Fundraising",
    description:
      "Contributed to fundraising for projects worth $250K above from partners and sponsors ",
    image: (
      <FaHandHoldingUsd
        className={`text-[var(--primary)] mt-2 w-full h-20 object-cover ${classMap.hoverAnimate()}`}
      />
    ),
  },
  {
    title: "Investor Network",
    description:
      "We have VC partners + sponsors making our normal ticket size worth $250K - $10M",
    image: (
      <FaNetworkWired
        className={`text-[var(--primary)] mt-2 w-full h-20 object-cover ${classMap.hoverAnimate()}`}
      />
    ),
  },
  {
    title: "Investment Focus",
    description:
      "We have a ticket size of $50K personal investment for projects that typically matches our due diligence ",
    image: (
      <FaHandshake
        className={`text-[var(--primary)] mt-2 w-full h-20 object-cover ${classMap.hoverAnimate()}`}
      />
    ),
  },
];

export const Why = () => {
  return (
    <section className="bg-[#0d0f11] text-white px-3 py-10 md:py-10">
      <div className="max-w-6xl mx-auto text-center">
        <Fade triggerOnce cascade>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--primary)]">
            Why Choose <h2 className="text-[var(--secondary)] inline">Us</h2>
          </h2>
          <h6 className="text-gray-400 max-w-3xl mx-auto mb-16">
            We’re more than just an incubator — we’re your growth partner in the
            evolving Web3.0 frontier.
          </h6>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-center">
          {reasons.map((item, i) => (
            <Fade direction="up" delay={i * 100} triggerOnce key={i}>
              <div
                className={`bg-[#121417] border border-[#1e1f22] rounded-xl ${classMap.hoverAnimate()}`}
              >
                <div className="p-2">{item.image}</div>
                <div className="p-2 text-center relative group inline-block">
                  <h3 className={`${classMap.cardTitle()}`}>{item.title}</h3>
                  <button className={`${classMap.tooltipBtn()}`}>i</button>
                  <div className={`${classMap.tooltip()}`}>
                    <small className="text-sm">{item.description}</small>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};
