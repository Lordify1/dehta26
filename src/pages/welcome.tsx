// Home.tsx
import React from "react";
import Layout from "./components/Layout";
import HeroSection from "./components/HeroSection";
import WhyFaecesAI from "./components/WhyFaecesAI";
import { Helmet } from "react-helmet-async";
import { appName } from "@/dapp";
import SaleTimer from "./components/PrivateSalePage/SaleTimer";
import FAQ from "./components/Faq";
import LensSection from "./components/LensSection";
import GlassSection from "./components/GlassSection";
import TrendBetSection from "./components/TrendBetSection";
import ProjectSection from "./components/ProjectSection";
import TeamSection from "./components/TeamSection";
import SocialsSection from "./components/SocialsSection";

const Home: React.FC = () => {
  return (
    <>
      <SaleTimer header={true} />
      <Layout showNavs={true}>
        <Helmet>
          <title>The Future of Crypto Intelligence - {appName}</title>
          <link rel="preconnect" href="https://fonts.bunny.net" />
          <link
            href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
            rel="stylesheet"
          />
        </Helmet>
        <HeroSection />
        <WhyFaecesAI />
        <LensSection />
        <GlassSection />
        <TrendBetSection />
        <ProjectSection />
        <TeamSection />
        <SocialsSection />
        <FAQ />
      </Layout>
    </>
  );
};

export default Home;
