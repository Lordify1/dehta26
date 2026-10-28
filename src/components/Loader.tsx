import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="relative w-48 h-48">
        <div className="absolute inset-0 rounded-full border-8 border-[#3dffc5] border-t-transparent animate-spin-fast"></div>
        <div className="absolute inset-0 rounded-full border-4 border-[#146b52] blur-sm"></div>
        <div className="absolute inset-0 flex items-center justify-center text-xl sm:text-2xl font-extrabold tracking-widest text-[#3dffc5] animate-pulse">
          FAECES AI
        </div>
      </div>
    </div>
  );
};

export default Loader;
