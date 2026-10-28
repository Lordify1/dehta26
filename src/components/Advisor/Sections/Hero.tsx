import { advisorUrl } from "@/dapp";
import { classMap } from "@/components/Tools/Misc";
import { Link } from "@inertiajs/react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-[#0f0f0f] text-white overflow-hidden px-6 py-20">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-[#1e40af66] rounded-full blur-3xl top-0 left-0" />
        <div className="absolute w-[500px] h-[500px] bg-[#05966933] rounded-full blur-3xl bottom-0 right-0" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Your <span className="text-[#1e40af]">AI-Powered</span> Startup
          Advisor
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Upload your pitch deck. Get scaling insights. Connect with investors.
        </p>
        <Link
          href={`${advisorUrl}/register`}
          className={`${classMap.button("", "", "", "", "down")} animate-pulse duration-600 text-lg`}
        >
          Get Started Free
        </Link>
      </div>
    </section>
  );
}
