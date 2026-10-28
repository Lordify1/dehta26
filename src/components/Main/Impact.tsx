import React from "react";
import { Fade } from "react-awesome-reveal";
import { classMap } from "../Tools/Misc";
import { appUrl } from "@/dapp";

const Impact = () => {
  const impacts = [
    {
      name: "Stabble",
      desc: "Provided $1M OTC investment and strategic VCs Introduction",
      image: `${appUrl}/assets/images/impact/stabble.png`,
      link: "https://stabble.org/",
    },
    {
      name: "Mirror Gains (TradeFi)",
      desc: "Introduction to KOLs & Volume gainers & strategic Dex partnership",
      image: `${appUrl}/assets/images/impact/mirror_gains.jpg`,
      link: "https://www.mirrorgains.com/",
    },
    {
      name: "Mars4",
      desc: "Onboarded an x2 marketing from just introduction tobuyers in network ",
      image: `${appUrl}/assets/images/impact/mars4.jpg`,
      link: "https://www.mars4.me/",
    },
    {
      name: "Myax",
      desc: "Strategic VC connection and partnerships",
      image: `${appUrl}/assets/images/impact/myax.jpg`,
      link: "https://sesamelabs.xyz/myax/",
    },
  ];

  return (
    <section className="bg-[#0d0f11] text-white px-3 py-10 md:py-10">
      <div className="max-w-6xl mx-auto text-center">
        <Fade triggerOnce cascade>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[var(--primary)]">
            Our <h2 className="text-[var(--secondary)] inline">Impact</h2> So
            Far
          </h2>
          <h5 className="text-gray-400 max-w-3xl mx-auto mb-5">
            Some evidence of our Impact since inception
          </h5>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {impacts.map((item, i) => (
            <Fade direction="up" delay={i * 100} triggerOnce key={i}>
              <div
                className={`bg-[#111315] border border-[#1e1f22] rounded-xl flex flex-col h-full shadow-md hover:shadow-lg transition ${classMap.hoverAnimate()}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className={`rounded-t-xl w-full h-48 object-cover`}
                />
                <div className="p-6 flex flex-col flex-1 text-start">
                  <a
                    href={item.link}
                    target="_blank"
                    className="text-1xl font-semibold text-[#00ffb3] mb-2"
                  >
                    <h3>{item.name}</h3>
                  </a>
                  <p className="text-gray-300 flex-1">{item.desc}</p>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;
