import { Link } from 'react-router-dom';
import { classMap, FadeInAnim } from '../../components/Tools/Misc';

const GlowLine = ({ text, className = '' }: { text: string; className?: string }) => (
  <span className={className}>
    {text.split(' ').map((word, i) => (
      <span key={`${word}-${i}`} className="earnfi-word" style={{ animationDelay: `${i * 0.14}s` }}>
        {word}{' '}
      </span>
    ))}
  </span>
);

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="herobg relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24 text-center sm:px-20"
    >
      <div className="lens-stage relative mb-6 flex h-72 w-full items-center justify-center sm:h-80">
        <span className="lens-orbit" />
        <span className="lens-orbit lens-orbit-delay" />
        <img
          src="/assets/ui/lens.png"
          alt="Lens token"
          className="lens-dancer w-44 sm:w-56"
        />
      </div>
      <FadeInAnim delay={6} duration={1500}>
        <div className="mx-auto max-w-5xl space-y-4">
          <h1 className="text-5xl font-semibold lg:text-7xl">
            <GlowLine text="Earn without a ceiling" />
          </h1>
          <p className="earnfi-explain text-lg">
            EarnFi is the workstation. Take direct partner jobs or marked outside tasks, get paid, and keep going.
          </p>
          <Link to="/earnfi" className={`${classMap.button()} mt-4 inline-block`}>
            Open EarnFi
          </Link>
        </div>
      </FadeInAnim>
    </section>
  );
};

export default HeroSection;
