import ParticleBackground from '@/components/ParticleBackground';
import { classMap } from '@/components/Tools/Misc';
import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import { FaAssistiveListeningSystems, FaChartBar, FaCoins, FaSearch, FaVoteYea } from 'react-icons/fa';
import {TrendBetData} from '@/data/indexData.jsx'
import { SlideDown, SlideUp } from '../../components/Tools/Misc';
import { IoMedalOutline, IoRocketOutline, IoSettingsOutline, IoTrendingUp } from 'react-icons/io5';



const TrendBetSection: React.FC = () => {
  return (
    <section
      id="trendbet"
      className="relative text-(--primary) py-10 px-6 sm:px-16 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl items-center text-center">
        <h1 className="text-3xl lg:text-6xl mb-4">TrendBet</h1>
        <div className='grid grid-cols-1 gap-3 pt-5 items-center justify-center'>
            <section className='flex flex-row items-center justify-center text-center'>
                <SlideDown className='flex flex-col items-center justify-between text-center' delay={5}>
                    <span className='max-w-5xl p-1'>TrendBet is a prediction-based platform where ideas turn into rewards. Creators launch trends and set options, while participants join in, cast votes, and compete for payouts. Create trends. Predict outcomes. Earn rewards.</span>
                </SlideDown>
            </section>
            <section className="flex flex-row items-center justify-center w-full">
                <object data="/assets/ui/trendbet_all.png" className='w-100 lg:w-130' type="image/png"></object>
            </section>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-10 mt-10">
                <object data="/assets/ui/trend_p.svg" className='w-70' type="image/svg+xml"></object>
                <object data="/assets/ui/trend_c.svg" className='w-70' type="image/svg+xml"></object>
            </div>
        </div>
      </div>
    </section>
  );
};

export default TrendBetSection;