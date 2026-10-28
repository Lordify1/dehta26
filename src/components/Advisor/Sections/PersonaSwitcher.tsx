// Sections/PersonaSwitcher.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUpload, FaChartLine, FaStar, FaFilter } from 'react-icons/fa';

export default function PersonaSwitcher() {
  const [selected, setSelected] = useState<"founders" | "investors" | null>(null);

  const renderContent = () => {
    if (!selected) {
      return (
        <motion.div
          key="default"
          className="h-[340px] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-center text-gray-300">
            Built to Decide
          </h2>
        </motion.div>
      );
    }

    return (
      <motion.div
        key={selected}
        className="grid md:grid-cols-2 gap-8 h-[340px] items-center justify-center text-left"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        {selected === "founders" ? (
          <>
            <div>
              <h3 className="text-3xl font-bold text-[#00ffcc] mb-2">For Founders</h3>
              <p className="text-gray-400 mb-4">
                Upload your pitch deck, and let our AI highlight what to improve — from monetization to GTM strategy.
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2"><FaUpload className="text-[#00ffcc]" /> Upload Decks Instantly</li>
                <li className="flex items-center gap-2"><FaChartLine className="text-[#00ffcc]" /> Get Tailored Growth Advice</li>
                <li className="flex items-center gap-2"><FaStar className="text-[#00ffcc]" /> Boost Investor Visibility</li>
              </ul>
            </div>
            <div className="hidden md:flex justify-center">
              <img src="https://placehold.co/1000x500/00ffcc/000" alt="Founder View" className="w-72 rounded-lg shadow-lg border border-gray-700" />
            </div>
          </>
        ) : (
          <>
            <div>
              <h3 className="text-3xl font-bold text-[#00c0ff] mb-2">For Investors</h3>
              <p className="text-gray-400 mb-4">
                Discover and rank startups, get clarity at a glance, and invest in data-backed potential.
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2"><FaFilter className="text-[#00c0ff]" /> Filter by Industry & Traction</li>
                <li className="flex items-center gap-2"><FaStar className="text-[#00c0ff]" /> Rate Startups Easily</li>
                <li className="flex items-center gap-2"><FaChartLine className="text-[#00c0ff]" /> Smart Investor Dashboard</li>
              </ul>
            </div>
            <div className="hidden md:flex justify-center">
              <img src="https://placehold.co/1000x500/00c0ff/000" alt="Investor View" className="w-72 rounded-lg shadow-lg border border-gray-700" />
            </div>
          </>
        )}
      </motion.div>
    );
  };

  return (
    <section className="py-20 bg-[#101010] border-t border-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="mb-10 flex justify-center gap-4">
          {["founders", "investors"].map((role) => (
            <button
              key={role}
              onClick={() => setSelected(selected === role ? null : role)}
              className={`px-6 py-2 rounded-full font-medium border transition ${
                selected === role
                  ? "bg-[#00ffcc] text-black border-[#00ffcc]"
                  : "bg-transparent text-white border-white hover:bg-white hover:text-black"
              }`}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      </div>
    </section>
  );
}