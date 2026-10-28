import React, { useEffect, useRef, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import phifinance from '../../lib/images/partners/phifinance.png'
import kommunita from '../../lib/images/partners/kommunita.png'
import clsglobal from '../../lib/images/partners/clsglobal.png'
import gempad from '../../lib/images/partners/gempad.png'

const partners = [
  { name: 'Kommunitas’s official', url: 'https://x.com/kommunitasnet?s=21', img: kommunita },
  { name: 'CLS global', url: 'https://x.com/coinliquidity?s=21', img: clsglobal },
  { name: 'Gempad', url: 'https://x.com/thegempad?s=21', img: gempad },
  { name: 'Phi Finance', url: 'https://x.com/phiweb3bull?s=21', img: phifinance }
];


const Partners: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPos = 0;
    let animationFrameId: number;

    const scrollStep = () => {
      if (!scrollContainer || isPaused) {
        animationFrameId = requestAnimationFrame(scrollStep);
        return;
      }

      scrollPos += 0.7;
      if (scrollPos >= scrollContainer.scrollWidth / 2) {
        scrollPos = 0;
      }
      scrollContainer.scrollLeft = scrollPos;

      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const duplicatedPartners = [...partners, ...partners];

  return (
    <Fade triggerOnce>
      <section
        id="partners"
        className="text-primary py-16 px-6 sm:px-16"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center tracking-wide">
          Partners & Collaborations
        </h2>

        <div
          ref={scrollRef}
          className="flex gap-8 max-w-6xl mx-auto overflow-x-hidden select-none cursor-default"
          style={{ whiteSpace: 'nowrap' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {duplicatedPartners.map(({ name, url, img }, i) => (
            <a
              key={`${name}-${i}`}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-[120px] h-[72px] relative snap-center"
              style={{ flex: '0 0 auto' }}
            >
              <img
                src={img}
                alt={name}
                loading="lazy"
                className="w-full h-full object-contain filter grayscale drop-shadow-md transition duration-300 ease-in-out hover:grayscale-0 hover:scale-110"
              />
            </a>
          ))}
        </div>
      </section>
    </Fade>
  );
};

export default Partners;
