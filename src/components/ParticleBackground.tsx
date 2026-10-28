import React, { useEffect } from 'react';

const particlesOptions: ISourceOptions = {
  fullScreen: { enable: false },
  particles: {
    number: { value: 50, density: { enable: true, area: 800 } },
    color: { value: '#3dffc5' },
    shape: { type: 'circle' },
    opacity: {
      value: 0.3,
      random: { enable: true, minimumValue: 0.1 },
      anim: { enable: true, speed: 1, minimumValue: 0.1, sync: false }
    },
    size: {
      value: 3,
      random: { enable: true, minimumValue: 1 },
      anim: { enable: false }
    },
    move: {
      enable: true,
      speed: 0.6,
      direction: 'none',
      random: false,
      straight: false,
      outModes: { default: 'out' }
    },
    links: {
      enable: true,
      distance: 150,
      color: '#3dffc5',
      opacity: 0.15,
      width: 1
    }
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'repulse' },
      onClick: { enable: true, mode: 'push' }
    },
    modes: {
      repulse: { distance: 100 },
      push: { quantity: 4 }
    }
  },
  detectRetina: true
};

const ParticleBackground: React.FC = () => {

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1000,
        pointerEvents: 'none',
      }}
    >
      {/* <Particles options={particlesOptions} /> */}
    </div>
  );
};

export default ParticleBackground;
