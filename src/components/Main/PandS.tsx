import React, { useEffect, useState } from "react";
import { appUrl } from "@/dapp";
import { Fade } from "react-awesome-reveal";
import { classMap, colorMap } from "../Tools/Misc";
import {
  FaBan,
  FaChartLine,
  FaExclamationTriangle,
  FaHandHoldingUsd,
  FaLightbulb,
  FaMoneyBillWave,
  FaProjectDiagram,
  FaPuzzlePiece,
  FaRoad,
  FaRocket,
  FaTimesCircle,
  FaUserSlash,
} from "react-icons/fa";

const ProblemAndSolution = () => {
  const [view, setView] = useState("p");

  const toggleView = () => {
    const preferred = localStorage.getItem("pandsView");

    if (!preferred || preferred !== view) {
      localStorage.setItem("pandsView", view);
    }
  };

  const solutions = [
    {
      title: "Tailored Incubation",
      description:
        "Tailored mentorship, technical support, and founder resources built for crypto Startups.",
      image: (
        <FaRocket
          className={`text-[var(--primary)] mt-2 w-full h-20 object-cover ${classMap.hoverAnimate()}`}
        />
      ),
    },
    {
      title: "Venture Access",
      description:
        "PHI FINANCE connects founders to strategic funding grants, and a curated network of investors and partners.",
      image: (
        <FaHandHoldingUsd
          className={`text-[var(--primary)] mt-2 w-full h-20 object-cover ${classMap.hoverAnimate()}`}
        />
      ),
    },
    {
      title: "Growth Enablement",
      description:
        "By providing go-to-market support, community growth strategies, and UX guidance to help Startups scale and reach mainstream users",
      image: (
        <FaChartLine
          className={`text-[var(--primary)] mt-2 w-full h-20 object-cover ${classMap.hoverAnimate()}`}
        />
      ),
    },
    {
      title: "Community Connect",
      description:
        "PHI FINANCE builds a collaborative network of founders, developers, and advisors to foster innovation and shared success.",
      image: (
        <FaProjectDiagram
          className={`text-[var(--primary)] mt-2 w-full h-20 object-cover ${classMap.hoverAnimate()}`}
        />
      ),
    },
  ];

  const problems = [
    {
      title: "Web-3 Startup Gaps",
      description:
        "Most incubators aren't equipped for the unique needs of blockchain and crypto Startups.",
      image: (
        <FaUserSlash
          className={`text-[var(--danger)] mt-2 w-full h-20 object-cover ${classMap.hoverAnimate()}`}
        />
      ),
    },
    {
      title: "Funding Barriers",
      description:
        " Early-stage Web3 founders struggle to find investors, grants, and expert guidance",
      image: (
        <FaBan
          className={`text-[var(--danger)] mt-2 w-full h-20 object-cover ${classMap.hoverAnimate()}`}
        />
      ),
    },
    {
      title: "Scaling Roadblocks",
      description:
        "Startups face challenges growing communities & creating user-friendly blockchain products.",
      image: (
        <FaRoad
          className={`text-[var(--danger)] mt-2 w-full h-20 object-cover ${classMap.hoverAnimate()}`}
        />
      ),
    },
    {
      title: "Ecosystem Silos",
      description:
        "Many Web3 builders operate in silos, lacking the community & connections needed to collaborate,share knowledge & grow together",
      image: (
        <FaPuzzlePiece
          className={`text-[var(--danger)] mt-2 w-full h-20 object-cover ${classMap.hoverAnimate()}`}
        />
      ),
    },
  ];

  useEffect(() => {
    toggleView();
  }, [view]);

  return (
    <section className="bg-[#0d0f11] text-white py-10 px-3 md:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <Fade direction="up" triggerOnce>
          <h2 className="text-2xl md:text-4xl font-bold mb-2 text-[#3dffc5]">
            The Phi <h2 className="text-[#00ffb3] inline">Effect</h2>
          </h2>
          <h6 className="text-gray-400 max-w-3xl mx-auto mb-2">
            The Problems and Our Solutions
          </h6>
          <div className="mb-4">
            <button
              onClick={() => setView("s")}
              className={`${classMap.button("", "", "", "", "left")}, ${view === "s" ? "opacity-30" : "opacity-100"}, disabled:cursor-not-allowed disabled:opacity-30`}
              disabled={view === "s" ? true : false}
            >
              Solutions
            </button>
            <button
              onClick={() => setView("p")}
              className={`${classMap.button("bg-red-600", "", "", "", "right")}, ${view === "p" ? "opacity-30" : "opacity-100"}, disabled:cursor-not-allowed disabled:bg-red-600 disabled:opacity-30 border-red-600 hover:bg-red-600`}
              disabled={view === "p" ? true : false}
            >
              Problems
            </button>
          </div>
        </Fade>
      </div>

      <div className="max-w-6xl text-center mx-auto grid md:grid-cols-2 gap-5 items-center">
        {/* Image  */}
        <Fade className="hidden md:block" triggerOnce direction="left">
          <div
            className={`w-full h-full bg-[#111215] border border-[#1e1f22] rounded-xl p-4 ${view === "p" ? "hover:border-red-500" : classMap.hoverAnimate()}`}
          >
            <Fade>
              {view === "p" ? (
                <FaExclamationTriangle
                  className={`text-[var(--danger)] p-2 rounded-lg w-full h-full object-cover ${classMap.hoverAnimate()}`}
                />
              ) : (
                <FaLightbulb
                  className={`text-[var(--primary)] p-2 rounded-lg w-full h-full object-cover ${classMap.hoverAnimate()}`}
                />
              )}
            </Fade>
          </div>
        </Fade>

        {/* Text  */}
        {view === "p" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
            {problems.map((item, key) => {
              return (
                <Fade key={key} triggerOnce direction="right">
                  <div
                    className={`bg-[#111315] border border-[#1e1f22] rounded-xl ${view === "p" ? "hover:border-red-500" : classMap.hoverAnimate()}`}
                  >
                    <div className="p-2">{item.image}</div>
                    <div className="p-2 text-center relative group inline-block">
                      <h3
                        className={`${classMap.cardTitle()} ${view === "p" ? colorMap.text_danger : colorMap.text_primary} mb-2 text-center`}
                      >
                        {item.title}
                      </h3>
                      <button className={`${classMap.tooltipBtn()}`}>i</button>
                      <div className={`${classMap.tooltip()}`}>
                        <small className="text-sm">{item.description}</small>
                      </div>
                    </div>
                  </div>
                </Fade>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
            {solutions.map((item, key) => {
              return (
                <Fade key={key} triggerOnce direction="right">
                  <div
                    className={`bg-[#111315] border border-[#1e1f22] rounded-xl ${classMap.hoverAnimate()}`}
                  >
                    <div className="p-2">{item.image}</div>
                    <div className="p-2 text-center relative group inline-block">
                      <h3
                        className={`${classMap.cardTitle()} ${view === "p" ? colorMap.text_danger : colorMap.text_primary} mb-2 text-center`}
                      >
                        {item.title}
                      </h3>
                      <button className={`${classMap.tooltipBtn()}`}>i</button>
                      <div className={`${classMap.tooltip()}`}>
                        <small className="text-sm">{item.description}</small>
                      </div>
                    </div>
                  </div>
                </Fade>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProblemAndSolution;
