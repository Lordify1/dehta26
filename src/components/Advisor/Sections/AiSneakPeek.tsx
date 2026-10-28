import { motion } from 'framer-motion';
import { FaBrain } from 'react-icons/fa';

export default function AISneakPeek() {
  return (
    <section className="py-20 bg-[#0b0b0b] border-t border-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#00ffcc] flex justify-center items-center gap-3">
          <FaBrain className="text-2xl text-[#00ffcc]" />
          AI Suggestions Sneak Peek
        </h2>
        <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
          Get a glimpse of how our AI helps founders level up. These are just sample insights—yours will be even smarter.
        </p>

        <motion.div
          className="relative bg-[#101010] border border-gray-800 rounded-lg p-6 text-left text-sm text-gray-300 max-w-3xl mx-auto shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="blur-md select-none pointer-events-none opacity-60">
            🔒 AI Output Sample:
            <ul className="mt-2 list-disc ml-6">
              <li>Add <span className="text-[#00ffcc]">Go-To-Market Strategy</span></li>
              <li><span className="text-[#00ffcc]">Clarify Monetization Path</span> under Revenue Model</li>
              <li>Team slide lacks experience details — <span className="text-[#00ffcc]">highlight key roles</span></li>
              <li>Traction unclear — <span className="text-[#00ffcc]">include metrics or milestones</span></li>
              <li><span className="text-[#00ffcc]">Investor ask</span> missing or vague</li>
            </ul>
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none">
            <span className="text-[#00ffcc] font-bold text-xl bg-[#0b0b0b]/80 px-4 py-2 rounded-lg border border-[#00ffcc]">
              AI Preview Locked 🔒
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
