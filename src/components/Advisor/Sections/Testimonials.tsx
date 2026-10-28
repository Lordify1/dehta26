import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Lena Obasi",
    role: "Founder, KoraTech",
    quote: "PHI.AI didn’t just review my pitch—it reshaped my whole funding approach. Got 2 callbacks in a week!"
  },
  {
    name: "Mark Delgado",
    role: "Investor, Lumos Ventures",
    quote: "The filtering tool is fire 🔥. Found 4 startups aligned with my thesis in 10 mins."
  },
  {
    name: "Ifeanyi Daramola",
    role: "Startup Advisor",
    quote: "The AI insights are sharper than some VCs I’ve met. This platform will shake the ecosystem fr."
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#0e0e0e] border-t border-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12 text-white">What They’re Saying</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-[#151515] border border-gray-800 rounded-xl p-6 text-left shadow-lg hover:shadow-md hover:border-[#00ffcc] transition"
            >
              <p className="text-gray-300 italic mb-4">“{t.quote}”</p>
              <h4 className="text-white font-semibold">{t.name}</h4>
              <p className="text-sm text-gray-500">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
