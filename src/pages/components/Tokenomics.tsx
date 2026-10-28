import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Tokenomics: React.FC = () => {
  const labels = [
    'Presale',
    'Community',
    'Development',
    'Team',
    'Investors',
    'Airdrop',
    'Marketing',
  ];

  const dataValues = [15, 25, 15, 10, 15, 5, 15];

  const colors = [
    '#3dffc5', // mint
    '#8b5cf6', // purple
    '#10b981', // green
    '#f59e0b', // amber
    '#ef4444', // red
    '#eab308', // yellow
    '#6366f1', // indigo
  ];

  const data = {
    labels,
    datasets: [
      {
        label: '% Allocation',
        data: dataValues,
        backgroundColor: colors,
        borderColor: '#1f2937',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '',
          padding: 20,
          boxWidth: 16,
        },
      },
      tooltip: {
        backgroundColor: '#111827',
        titleColor: '#fff',
        bodyColor: '#d1d5db',
      },
    },
  };

  return (
    <section
      id="tokenomics"
      className="bg-accent text-[var(--secondary)] py-20 px-6 sm:px-16"
    >
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-12 text-center">Tokenomics</h2>
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-8">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
          <Doughnut data={data}  options={options} />
        </div>
        <div className="text-center text-lg sm:text-xl font-semibold text-[var(--primary)] mt-4">
          Total Supply: <span className="text-[var(--accent-foreground)]">420M $FAECES</span>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
