import { Fade } from "react-awesome-reveal";

export const CTA = () => {
  return (
    <section className="py-20 bg-[#0d0f11] text-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <Fade direction="left" triggerOnce>
          <div className="rounded-lg overflow-hidden shadow-lg border border-gray-800">
            <video
              className="w-full h-full object-cover"
              controls
              poster="https://placehold.co/600x400?text=How+It+Works"
            >
              <source src="/assets/videos/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </Fade>

        <Fade direction="right" triggerOnce>
          <div>
            <h2 className="text-4xl font-bold mb-4 text-[#4db8ff]">See It in Action</h2>
            <p className="text-gray-400 mb-6">
              Watch how PhiFinance empowers your journey through Web3 with powerful tools, smart onboarding,
              seamless, and real-time.
            </p>
            <a
              href="/explore"
              className="inline-block px-6 py-3 bg-[#19e68c] text-black font-semibold rounded hover:bg-[#15c67a] transition"
            >
              Check it Out
            </a>
          </div>
        </Fade>
      </div>
    </section>
  );
};
