export default function How() {
  const steps = [
    {
      step: 1,
      title: "Upload Your Deck",
      desc: "Submit your startup pitch deck in PDF or PPTX format. Our system takes it from there.",
    },
    {
      step: 2,
      title: "AI Analysis Begins",
      desc: "We analyze your business model, traction, and team to provide scale-ready insights.",
    },
    {
      step: 3,
      title: "Get Recommendations",
      desc: "Receive actionable suggestions and gain visibility with Web3-aligned investors.",
    },
  ];

  return (
    <section className="bg-[#111111] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-14">How It Works</h2>
        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="border border-gray-800 rounded-lg p-6 hover:border-[#059669] transition duration-300 bg-[#181818]"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full border border-[#059669] mb-4 mx-auto text-[#059669] font-bold text-lg">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
