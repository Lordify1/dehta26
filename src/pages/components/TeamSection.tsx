import ParticleBackground from '@/components/ParticleBackground';
import { classMap } from '@/components/Tools/Misc';
import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import { FaAssistiveListeningSystems, FaLink, FaSearch } from 'react-icons/fa';
import {TeamData} from '@/data/indexData.jsx'
import { Link } from 'react-router-dom';
import { FadeInAnim } from '../../components/Tools/Misc';






const TeamSection: React.FC = () => {
  return (
    <section
      id="team"
      className="relative text-(--secondary) py-10 px-6 sm:px-16 overflow-hidden bg-white/90"
    >
      <div className="mx-auto max-w-7xl items-center text-center">
        <h1 className="text-3xl lg:text-6xl mb-10">Dehta Team</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-2 items-center justify-items-center'>
        {TeamData.map((it:any, ind:any) => {
          return(
            <>
            <FadeInAnim delay={5}>
              <div className="flex flex-col items-start justify-start text-start sm:mb-5 space-y-2 text-black">
                <img src={`${it.image}`} className='rounded-md w-50' alt="" />
                <Link to={it.link} target='_blank' className='text-2xl font-semibold'>{it.name}</Link>
                <span className='text-black/70'>{it.position}</span>
              </div>
            </FadeInAnim>
            </>
          )
        })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;