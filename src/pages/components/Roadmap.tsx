import React, { useState } from 'react';
import { Slide } from 'react-awesome-reveal';
import clsx from 'clsx';

type Phase = {
  title: string;
  key: string;
  items: string[];
};

const phases: Phase[] = [
  {
    title: 'Q2 2025 – Launch Phase',
    key: 'q2',
    items: [
      'Token launch (DEX listing + early liquidity)',
      'Community campaigns and viral memetics',
      'Alpha version of FAECES AI Bot on Telegram/X',
      'Real-time crypto sentiment feed (basic signals)',
    ],
  },
  {
    title: 'Q3 2025 – Utility Development',
    key: 'q3',
    items: [
      'Launch FAECES AI Research Panel (web app)',
      'KPI & Whitepaper scanner v1 (Top 100 tokens)',
      'Narrative Tracker: Early signal detection for Web3 trends',
      'Onboarding meme influencers & Web3 KOLs',
      'Strategic partnerships with analytics protocols',
    ],
  },
  {
    title: 'Q4 2025 – Expansion & Gamification',
    key: 'q4',
    items: [
      'Gamified ecosystem (Quests, XP, DAO Voting)',
      'FAECES Pro – Personalized dashboards and alerts',
      'Integration with major L2s (Solana, Base, zkSync)',
      'Community DAO tools',
    ],
  },
  {
    title: 'Q1 2026 – Monetization & Scaling',
    key: 'q1',
    items: [
      'SaaS model for FAECES AI tools (Freemium)',
      'API access for funds, researchers, dApps',
      'FAECES staking model with product perks',
      'Listings on centralized exchanges (Tier 2+)',
    ],
  },
];

const getCurrentQuarterKey = (): string | null => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const quarterMap: { [key: number]: string } = {
    0: 'q1', 1: 'q1', 2: 'q1',
    3: 'q2', 4: 'q2', 5: 'q2',
    6: 'q3', 7: 'q3', 8: 'q3',
    9: 'q4', 10: 'q4', 11: 'q4',
  };

  const currentQuarter = quarterMap[month];
  const is2025 = year === 2025;
  return is2025 ? currentQuarter : null;
};

const Roadmap: React.FC = () => {
  const [active] = useState<string | null>(getCurrentQuarterKey());

  return (
    <section
      id="roadmap"
      className="relative py-20 px-6 sm:px-10 text-[var(--primary)]"
    >
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-16 text-center">Product Roadmap</h2>
      <div className="relative max-w-3xl mx-auto space-y-28">
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)] z-0" />

        {phases.map((phase) => (
          <Slide key={phase.key} direction="up" triggerOnce>
            <div
              id={phase.key}
              className="relative flex flex-col items-center z-10"
            >
              <div className={clsx(
                'absolute -top-10 left-1/2 transform -translate-x-1/2 z-10',
                'w-12 h-12 rounded-full border-4 text-sm font-bold flex items-center justify-center',
                active === phase.key
                  ? 'bg-[var(--accent-foreground)] border-[var(--border)] text-[var(--secondary)]'
                  : 'bg-[var(--accent)] border-[var(--border)] text-[var(--primary)]'
              )}>
                {phase.title.split(' ')[0]}
              </div>

              <div className={clsx(
                'w-full bg-[var(--accent)] border-l-4 p-6 sm:p-8 rounded-lg transition-all duration-300',
                active === phase.key ? 'border-[var(--foreground)] shadow-lg' : 'border-[var(--primary-foreground)]'
              )}>
                <h3 className="text-2xl font-bold mb-4">{phase.title}</h3>
                <ul className="list-disc list-inside text-[var(--primary)] space-y-2 text-base">
                  {phase.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Slide>
        ))}
      </div>
    </section>
  );
};

export default Roadmap;
