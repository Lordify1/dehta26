import ParticleBackground from '@/components/ParticleBackground';
import { classMap } from '@/components/Tools/Misc';
import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import { FaAssistiveListeningSystems, FaCoins, FaSearch } from 'react-icons/fa';
import {LensInfo} from '@/data/indexData.jsx'
import Lens from '../../assets/dehta_logo.png'
import { FadeInAnim, SlideRight, SlideUp } from '../../components/Tools/Misc';



const LensSection: React.FC = () => {
  return (
    <section
      id="lens"
      className="relative text-[--primary] py-10 px-6 sm:px-16 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl items-center text-center">
        <div className='flex flex-col lg:flex-row items-center justify-center'>
          <FadeInAnim delay={5}>
            <section className='flex flex-col items-start text-start justify-center w-full'>
                <img src={Lens} alt="lens_image" className='w-50 animate-pulse transition-all duration-initial' />
                <section className='w-full p-5 max-w-5xl space-x-0.5'>
                  <h3 className='mb-3 text-3xl'>Lens Token</h3>
                  <p>Lens is the platform’s digital fuel. You earn it by checking in, unlocking achievements, or diving deeper into the ecosystem. Spend it to get AI-powered project analysis, purchase Glass NFTs, or unlock premium actions. It’s the gateway to everything valuable happening on the platform.</p>
              </section>
            </section>
          </FadeInAnim>
          <SlideUp>
                <object data="/assets/ui/lens.png" className='w-100' type="image/png"></object>
          </SlideUp>
        </div>
      </div>
    </section>
  );
};

export default LensSection;