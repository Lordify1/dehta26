import { classMap } from '@/components/Tools/Misc';
import React from 'react';
import { Link } from 'react-router-dom';

const lanes = [
  {
    label: 'Direct jobs',
    text: 'Partners who came to Dehta. These are treated as legit work.',
  },
  {
    label: 'Direct tasks',
    text: 'Short paid actions from the same verified partners. Clock in and finish.',
  },
  {
    label: 'Indirect, marked',
    text: 'Outside opportunities that can still pay. They stay labeled so you tread carefully.',
  },
];

const GlowLine = ({ text, className = '' }: { text: string; className?: string }) => (
  <span className={className}>
    {text.split(' ').map((word, i) => (
      <span key={`${word}-${i}`} className="earnfi-word" style={{ animationDelay: `${i * 0.16}s` }}>
        {word}{' '}
      </span>
    ))}
  </span>
);

const WhyFaecesAI: React.FC = () => {
  return (
    <section id="why" className="overflow-hidden px-6 py-16 sm:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col items-center space-y-3 text-center">
          <h6 className={`${classMap.glassEffect()} earnfi-chip`}>EarnFi</h6>
          <h1 className="text-5xl font-semibold md:text-6xl">
            <GlowLine text="Make money. Then make more." />
          </h1>
          <p className="earnfi-explain max-w-3xl">
            This floor is for people who want to earn: jobs and tasks, split into direct partner work and indirect leads.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {lanes.map((lane, index) => (
            <article key={lane.label} className={`${classMap.indexCard()} earnfi-card min-h-52`} style={{ animationDelay: `${index * 0.25}s` }}>
              <p className="text-2xl font-medium">
                <GlowLine text={lane.label} />
              </p>
              <p className="earnfi-explain mt-3">{lane.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link to="/earnfi" className={classMap.button()}>Enter the workstation</Link>
        </div>
      </div>
    </section>
  );
};

export default WhyFaecesAI;
