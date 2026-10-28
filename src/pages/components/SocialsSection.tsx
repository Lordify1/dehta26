import ParticleBackground from '@/components/ParticleBackground';
import { classMap } from '@/components/Tools/Misc';
import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import { FaAssistiveListeningSystems, FaLink, FaSearch } from 'react-icons/fa';
import {SocialsData} from '@/data/indexData.jsx'
import { Link } from 'react-router-dom';
import { FadeInAnim } from '../../components/Tools/Misc';






const SocialsSection: React.FC = () => {
  return (
    <section
      id="team"
      className="relative text-(--primary) py-10 px-6 sm:px-16 overflow-hidden bg-linear-to-b from-[#363636] to-[#000000]"
    >
      <div className="mx-auto max-w-7xl items-center text-center">
        <h1 className="text-3xl lg:text-6xl mb-10">Dehta Socials</h1>
        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-3 mb-2 items-center justify-around'>
        {SocialsData.map((it:any, ind:any) => {
          return(
            <>
            <FadeInAnim delay={5}>
            <section key={ind} className={``}>
              <div className="flex flex-col items-center text-center justify-center sm:mb-5 space-y-2">
                {it.icon}
                <h4 className='text-2xl'>{it.label}</h4>
                <Link
                target={`_blank`}
                to={`${it.link}`}
                >
                    <FaLink className='text-(--primary)'/>
                </Link>
              </div>
            </section>
            </FadeInAnim>
            </>
          )
        })}
        </div>
      </div>
    </section>
  );
};

export default SocialsSection;