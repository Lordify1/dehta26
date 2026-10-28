import { appUrl } from "@/dapp";
import { Fade } from "react-awesome-reveal";
import { classMap } from "../Tools/Misc";

export const About = () => {
  return (
    <section className="bg-[#0d0f11] text-white py-10 px-3 md:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <Fade direction="up" triggerOnce>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#3dffc5]">
            About <h2 className="text-[#00ffb3] inline">PhiFinance</h2>
          </h2>
          <h6 className="text-gray-400 max-w-3xl mx-auto mb-5">
            The launchpad empowering Web3 innovators to build and scale the
            future of decentralized technology.
          </h6>
        </Fade>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side – Image */}
        <Fade triggerOnce direction="left">
          <div
            className={`w-full h-full bg-[#111215] border border-[#1e1f22] rounded-xl p-4 ${classMap.hoverAnimate()}`}
          >
            <img
              src={`${appUrl}/assets/images/phi/logo.png`}
              alt="About PhiFinance"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </Fade>

        {/* Right Side – Text */}
        <Fade triggerOnce direction="right">
          <div className="p-2">
            <p className="text-lg text-gray-300 leading-relaxed">
              PHI FINANCE is a forward-thinking startup incubator at the
              intersection of tech, web3, crypto, blockchain, and DeFi.
            </p>
            <p className="mt-6 text-gray-300">
              We empower the next generation of founders by providing tailored
              support, strategic mentorship, and vital resources to help early
              stage Startups scale in the decentralized world.
            </p>
            <p className="mt-6 text-gray-300">
              Our mission is to nurture innovation and drive adoption in the
              Web3 space, bridging the gap between groundbreaking ideas and
              sustainable execution.
            </p>
            <p className="mt-6 text-gray-300">
              Whether you're building the next DeFi protocol, blockchain
              infrastructure, or Web3 platform, PHI FINANCE offers the network,
              guidance, and tools to help you thrive
            </p>
          </div>
        </Fade>
      </div>
    </section>
  );
};
