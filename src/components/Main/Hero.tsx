import { appUrl } from "@/dapp";
import { Link } from "@inertiajs/react";
import { Fade } from "react-awesome-reveal";
import { classMap } from "../Tools/Misc";

export const Hero = () => {
  return (
    <section className="min-h-screen bg-[#0d0f11] flex items-center px-3 md:px-2">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-24 md:py-32">
        {/* Text Content */}
        <Fade direction="up" cascade>
          <div className="">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#3dffc5]">
              <h1 className="text-[#00ffb3] inline">PhiFinance is</h1>
              <br />
              EMPOWERING
              <br />
            </h1>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-[#3dffc5]">
              WEB3 INNOVATION
            </h2>
            <h6 className="text-lg md:text-xl text-gray-300 max-w-xl">
              PhiFinance - Your Trusted Partners For Web3 Incubation
            </h6>
            {/* <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/get-started"
                className="bg-[#00ffb3] hover:bg-[#3dffc5] text-black px-6 py-3 rounded-lg font-semibold transition"
              >
                Get Started
              </Link>
              <Link
                href="/platform"
                className="border border-[#00ffb3] hover:bg-[#3dffc5] text-[#00ffb3] hover:text-black px-6 py-3 rounded-lg font-semibold transition"
              >
                Explore Platform
              </Link>
            </div> */}
          </div>
        </Fade>

        {/* Placeholder for Animation or Image */}
        <Fade direction="right">
          <div className="w-full h-[350px] md:h-[450px] rounded-xl flex items-center justify-center text-gray-400 video-container">
            <video
              src={`${appUrl}/assets/videos/hero.mp4`}
              className={`bg-[#3dffc5]/10 border border-[#00ffb3]/30 rounded-xl ${classMap.hoverAnimate()}`}
              autoPlay
              muted
              loop
              onContextMenu={() => false}
            ></video>
          </div>
        </Fade>
      </div>
    </section>
  );
};
