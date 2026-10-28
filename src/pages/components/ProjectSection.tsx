import ParticleBackground from '@/components/ParticleBackground';
import { classMap } from '@/components/Tools/Misc';
import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import { FaAssistiveListeningSystems, FaSearch } from 'react-icons/fa';
import {ProjectsData} from '@/data/indexData.jsx'
import { Link } from 'react-router-dom';
import { FadeInAnim, SlideUp } from '../../components/Tools/Misc';

const marketData = [
  {
    label: 'TAM',
    value: '$15 Billion',
    tooltip: 'Total Addressable Market',
    className: 'text--[var(--owner)]'
  },
  {
    label: 'SAM',
    value: '$3 Billion',
    tooltip: 'Serviceable Available Market',
    className: 'text-[var(--owner)]'
  },
  {
    label: 'SOM',
    value: '$30 Million',
    tooltip: 'Serviceable Obtainable Market',
    className: 'text-[var(--owner)]',
    sub: '(300k active users)'
  },
  {
    label: 'Problem Size',
    value: '$3–4 Billion/year',
    tooltip: 'Annual losses from hype, scams, and rug pulls',
    className: 'text-red-400'
  },
];





const ProjectSection: React.FC = () => {
  return (
    <section
      id="projects"
      className="relative text-[--primary] py-20 px-6 sm:px-10 overflow-hidden"
    >
      <div className="mx-auto items-center text-center w-full">
        <h1 className="text-3xl lg:text-6xl mb-1">BUILDFi</h1>
        <span className='mb-2'>Create, List, and grow your project at Dehta</span>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 space-y-5 mt-5 mb-5 items-center justify-items-center'>
        {ProjectsData.map((it:any, ind:any) => {
          return(
            <>
            <SlideUp delay={4}>
            <section key={ind} className={`flex flex-col items-start justify-center text-start`}>
              <object data={`${it.icon}`} className="w-10" type="image/svg+xml"></object> 
              <h4 className='text-2xl'>{it.label}</h4>
              <span className='w-70 text-white opacity-50'>{it.text}</span>
            </section>
            </SlideUp>
            </>
          )
        })}
        </div>
        <div className="flex flex-col items-center justify-center pt-3">
          <FadeInAnim delay={7}>
            <Link to={`/register`} className={`${classMap.button()}`}>
                Get Started
            </Link>
          </FadeInAnim>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;