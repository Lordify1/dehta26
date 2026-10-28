import { ReactNode, useEffect, useState } from "react";
import { Footer } from "@/components/Main/Footer";
import { Header } from "@/components/Main/Header";
import { Hero } from "@/components/Main/Hero";
import { About } from "@/components/Main/About";
import { Services } from "@/components/Main/Services";
import { Why } from "@/components/Main/Why";
import { Partners } from "@/components/Main/Partners";
import { Newsletter } from "@/components/Main/NewsLetter";
import { Team } from "@/components/Main/Team";
import { Contact } from "@/components/Main/Contact";
import { CTA } from "@/components/Main/CTA";
import axios from "axios";
import { appUrl } from "@/dapp";
import ProblemAndSolution from "@/components/Main/PandS";
import Impact from "@/components/Main/Impact";
import IncubationProgramStructure from "@/components/Main/IPS";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [partners, setPartners] = useState([]);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    axios
      .get(appUrl + "/partners/get")
      .then((res: any) => {
        setPartners(res.data);
        // console.log(res)
      })
      .catch((res) => console.log(res));

    axios
      .get(appUrl + "/team/get")
      .then((res: any) => {
        setTeam(res.data);
        // console.log(res)
      })
      .catch((res) => console.log(res));
  }, []);

  return (
    <div className="flex flex-col bg-[#0e0e0e] text-white" scroll-region={true}>
      <Header />
      <main className="flex-grow">
        <Hero />
        <ProblemAndSolution />
        <Services />
        <IncubationProgramStructure />
        <Why />
        <Impact />
        <Partners partners={partners} />
        <About />
        <Team teamData={team} />
        <Newsletter />
        <Contact />
        {/* <CTA/> */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
