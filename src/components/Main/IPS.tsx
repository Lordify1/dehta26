import React from "react";
import { appUrl } from "@/dapp";
import { Fade } from "react-awesome-reveal";
import { classMap } from "../Tools/Misc";
import {
  FaClock,
  FaLaptopCode,
  FaMapMarkedAlt,
  FaMoneyCheck,
  FaPuzzlePiece,
  FaSeedling,
  FaStream,
} from "react-icons/fa";

const IncubationProgramStructure = () => {
  return (
    <section className="bg-[#0d0f11] text-white py-10 px-3 md:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <Fade direction="up" triggerOnce>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[#3dffc5]">
            Incubation{" "}
            <h2 className="text-[#00ffb3] inline">Payment Structure</h2>
          </h2>
          <h5 className="text-gray-400 max-w-3xl mx-auto mb-5">
            Discover our flexible payment structure designed to support
            early-stage founders.
          </h5>
        </Fade>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5 items-center">
        {/* Left Side – Text */}
        <Fade triggerOnce direction="left">
          <ul className="ips">
            <li
              className={`text-2xl mb-4 bg-[#111215] border border-[#1e1f22] rounded-xl p-4 ${classMap.hoverAnimate()}`}
            >
              <FaClock className="text-[var(--secondary)] inline me-1" />
              <span className="text-[var(--primary)] font-bold">
                {" "}
                DURATION:
              </span>{" "}
              3 MONTHS
            </li>
            <li
              className={`text-2xl mb-4 bg-[#111215] border border-[#1e1f22] rounded-xl p-4 ${classMap.hoverAnimate()}`}
            >
              <FaLaptopCode className="text-[var(--secondary)] inline me-1" />
              <span className="text-[var(--primary)] font-bold">
                FORMAT:
              </span>{" "}
              ONLINE
            </li>
            <li
              className={`text-2xl mb-4 bg-[#111215] border border-[#1e1f22] rounded-xl p-4 ${classMap.hoverAnimate()}`}
            >
              <FaStream className="text-[var(--secondary)] inline me-1" />
              <span className="text-[var(--primary)] font-bold">
                KEY PHASES:
              </span>{" "}
              Application, Onboarding, Mentorship, Demo Day
            </li>
            <li
              className={`text-2xl mb-4 bg-[#111215] border border-[#1e1f22] rounded-xl p-4 ${classMap.hoverAnimate()}`}
            >
              <FaPuzzlePiece className="text-[var(--secondary)] inline me-1" />
              <span className="text-[var(--primary)] font-bold">
                VALUE ADDED COMPONENT:
              </span>{" "}
              Fundraising opportunities, Founder Network, Events, Project
              branding and scaling
            </li>
            <li
              className={`text-2xl mb-4 bg-[#111215] border border-[#1e1f22] rounded-xl p-4 ${classMap.hoverAnimate()}`}
            >
              <FaMoneyCheck className="text-[var(--secondary)] inline me-1" />
              <span className="text-[var(--primary)] font-bold">
                PAYMENT OPTIONS:
              </span>{" "}
              $3000 and 2% Token Equity{" "}
              <small className="font-extralight">
                {" "}
                - Negotiable percentage
              </small>
            </li>
          </ul>
        </Fade>
        {/* Right Side – Image */}
        <Fade className="hidden md:block" triggerOnce direction="right">
          <div
            className={` w-full p-2 h-full bg-[#111215] border border-[#1e1f22] rounded-xl ${classMap.hoverAnimate()}`}
          >
            <FaSeedling
              className={`text-[var(--primary)] p-2 rounded-lg w-full h-full object-cover ${classMap.hoverAnimate()}`}
            />
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default IncubationProgramStructure;
