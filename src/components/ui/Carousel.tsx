import { useState, useEffect } from "react";

export default function Carousel({
  items,
  perView = { base: 1, md: 2, lg: 4 }
}) {
  const [visible, setVisible] = useState(perView.base);
  const [index, setIndex] = useState(0);

  // handle responsive breakpoints
  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setVisible(perView.lg || perView.md || perView.base);
      else if (window.innerWidth >= 768) setVisible(perView.md || perView.base);
      else setVisible(perView.base);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [perView]);

  const maxIndex = Math.ceil(items.length / visible) - 1;

  const next = () => setIndex(i => Math.min(i + 1, maxIndex));
  const prev = () => setIndex(i => Math.max(i - 1, 0));

  return (
    <div className="w-full flex items-center gap-3 overflow-hidden">
      <button onClick={prev} className="px-3 py-1 border rounded">←</button>

      <div className="relative w-full overflow-hidden">
        <div 
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${index * 100}%)`,
            width: `${(items.length / visible) * 100}%`,
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="p-2"
              style={{
                width: `${100 / visible}%`
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <button onClick={next} className="px-3 py-1 border rounded">→</button>
    </div>
  );
}
