import React from 'react';
import { Link } from 'react-router-dom';
import { classMap, FadeInAnim, SlideRight } from '../../components/Tools/Misc';

const GlassSection: React.FC = () => {
  return (
    <section
      id="tradfi"
      className="relative text-(--primary) py-10 px-6 sm:px-16 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl items-center">
        <div className='grid grid-cols-1 gap-3 mb-2 items-center justify-between'>
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center lg:justify-between">
              <FadeInAnim delay={5} threshold={0.70}>
                <section className='flex items-center justify-center'>
                    <img src='/assets/ui/glass_nft.png' alt="TradFi NFT" className='animate-pulse transition-all duration-initial'/>
                </section>
              </FadeInAnim>
                <section className='flex flex-col items-start justify-center w-full p-4 space-x-3'>
                <SlideRight>
                    <p className="text-xs tracking-[0.35em] text-emerald-400">TRADFI</p>
                    <h1 className='text-3xl lg:text-6xl'>Live tape.</h1>
                    <h1 className='text-3xl lg:text-6xl'>Operator signals.</h1>
                    <span className='text-sm mt-2'>The marketplace is gone. TradFi is the desk: futures, forex, and degen calls, with your size and P&L.</span>
                    <Link to="/tradfi" className={`${classMap.button()} mt-5 inline-block`}>Open TradFi</Link>
                </SlideRight>
                </section>
            </div>
        </div>
      </div>
    </section>
  );
};

export default GlassSection;