export default function Features() {
  const features = [
    {
      role: "Founders",
      title: "Upload. Improve. Pitch.",
      desc: "Upload your deck, receive real-time suggestions, and improve your chances of raising funds.",
    },
    {
      role: "AI Engine",
      title: "Analyze & Advise",
      desc: "Smart AI evaluates your startup deck and returns tailored scaling strategies instantly.",
    },
    {
      role: "Investors",
      title: "Discover & Invest",
      desc: "Filter through quality startups based on metrics you care about and make data-driven moves.",
    }
  ];

  return (
    <section className="bg-[#0d0d0d] text-white py-20 px-6 border-t border-[#1a1a1a]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-14">What You Can Do</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-10 p-2">
          {features.map((item, i) => (
            <div
              key={i}
              className="bg-[#161616] border border-gray-800 rounded-xl p-10 hover:border-[#00ffcc] transition-all"
            >
              <h3 className="text-sm text-[#00ffcc] uppercase font-medium mb-1">{item.role}</h3>
              <h4 className="text-xl font-bold mb-2">{item.title}</h4>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
