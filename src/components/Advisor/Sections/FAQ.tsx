import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const faqs = [
  {
    question: "Is it free to use PHI AI?",
    answer: "Yes! You can get started for free. We offer early access to founders and investors during beta.",
  },
  {
    question: "How does the AI analyze my pitch deck?",
    answer: "Our AI scans your deck for business model, traction, and team structure to suggest growth areas.",
  },
  {
    question: "Can I update my deck after uploading?",
    answer: "Yes, you can replace or re-upload decks anytime from your dashboard.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#0f0f0f] text-white py-16 px-4 md:px-10" id="faq">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">Got Questions?</h2>
        <p className="text-center text-gray-400 mb-10">Here’s what founders and investors usually ask.</p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-[#333] rounded-lg p-5 transition-all duration-300 bg-[#151515]"
            >
              <button
                onClick={() => toggle(index)}
                className="flex justify-between items-center w-full text-left text-white text-lg font-medium"
              >
                {faq.question}
                <FaChevronDown
                  className={`transform transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 text-gray-300 text-sm mt-3 ${
                  openIndex === index ? 'max-h-[200px]' : 'max-h-0'
                }`}
              >
                {openIndex === index && <p>{faq.answer}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
