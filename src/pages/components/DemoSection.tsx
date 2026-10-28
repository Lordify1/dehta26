import { appUrl } from "@/dapp";
import React from "react";
import { Fade } from "react-awesome-reveal";

const DemoSection: React.FC = () => {
  return (
    <Fade triggerOnce>
      <section
        id="demo"
        className="text-[var(--background)] py-20 px-6 sm:px-16"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 tracking-tight">
            Faeces AI Demo
          </h2>

          {/* Tall Portrait Video */}
          <div className="w-full max-w-sm mx-auto h-[900px] overflow-hidden rounded-lg shadow-lg border bg-[var(--foreground)]">
            <video
              src={`${appUrl}/video/demo.mp4`}
              autoPlay
              muted
              loop
              playsInline
              controls
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>
    </Fade>
  );
};

export default DemoSection;
