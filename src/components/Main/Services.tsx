import { Fade } from "react-awesome-reveal";
import { classMap } from "../Tools/Misc";
import { appUrl } from "@/dapp";
import { Team } from "./Team";
import {
  FaGavel,
  FaUsers,
  FaHandshake,
  FaCoins,
  FaChartLine,
  FaRocket,
  FaExchangeAlt,
  FaChartPie,
} from "react-icons/fa";

const services = [
  {
    title: "Legal Support",
    description: "Guidance on legal and operational matters for Web3 startups.",
    image: (
      <FaGavel
        className={`text-[var(--primary)] mt-2 w-full h-20 object-cover ${classMap.hoverAnimate()}`}
      />
    ),
  },
  {
    title: "Mentorship",
    description: "Connect with experts and build a strong community.",
    image: (
      <FaUsers
        className={`text-[var(--primary)] mt-2 w-full h-20 object-cover ${classMap.hoverAnimate()}`}
      />
    ),
  },
  {
    title: "Brand Partners",
    description: "Access to essential partnerships for growth.",
    image: (
      <FaHandshake
        className={`text-[var(--primary)] mt-2 w-full h-20 object-cover ${classMap.hoverAnimate()}`}
      />
    ),
  },
  {
    title: "IDC/ICO Fundraising",
    description: "Support for token fundraising and investor outreach.",
    image: (
      <FaCoins
        className={`text-[var(--primary)] mt-2 w-full h-20 object-cover ${classMap.hoverAnimate()}`}
      />
    ),
  },
  {
    title: "VC Fundraising",
    description: "Connect with venture capital for funding.",
    image: (
      <FaChartLine
        className={`text-[var(--primary)] mt-2 w-full h-20 object-cover ${classMap.hoverAnimate()}`}
      />
    ),
  },
  {
    title: "GTM Strategy",
    description: "Go-to-market execution and launch support.",
    image: (
      <FaRocket
        className={`text-[var(--primary)] mt-2 w-full h-20 object-cover ${classMap.hoverAnimate()}`}
      />
    ),
  },
  {
    title: "Exchange Listing",
    description: "Assistance with CEX/DEX listings.",
    image: (
      <FaExchangeAlt
        className={`text-[var(--primary)] mt-2 w-full h-20 object-cover ${classMap.hoverAnimate()}`}
      />
    ),
  },
  {
    title: "Market Making",
    description: "Liquidity and market making services.",
    image: (
      <FaChartPie
        className={`text-[var(--primary)] mt-2 w-full h-20 object-cover ${classMap.hoverAnimate()}`}
      />
    ),
  },
];

export const Services = () => {
  return (
    <section className="bg-[#0d0f11] text-white py-10 px-3 md:px-10">
      <div className="max-w-7xl text-center mx-auto">
        <Fade triggerOnce cascade>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[var(--primary)]">
            What we <h2 className="text-[var(--secondary)] inline">Offer</h2>
          </h2>
          <h5 className="text-gray-400 max-w-3xl mx-auto mb-16">
            PhiFinance is more than just an incubator — we're a launchpad for
            Web3 pioneers.
          </h5>
        </Fade>

        <div className="grid gap-5 md:grid-cols-4">
          {services.map((service, idx) => (
            <Fade key={idx} direction="up" cascade triggerOnce>
              <div
                className={`bg-[#121417] border border-[#1e1f22] rounded-xl ${classMap.hoverAnimate()}`}
              >
                <div className="p-2">{service.image}</div>
                <div className="p-2 text-center relative group inline-block">
                  <h3 className={`${classMap.cardTitle()}`}>{service.title}</h3>
                  <button className={`${classMap.tooltipBtn()} `}>i</button>
                  <div className={`${classMap.tooltip()}`}>
                    <small className="text-sm">{service.description}</small>
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
