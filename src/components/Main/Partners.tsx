// src/Pages/Sections/Partners.tsx

import { appUrl } from "@/dapp";
import axios from "axios";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";

const partnersDum = [
  {
    name: "Giakaa Capital",
    logo: "assets/images/partners/giakaa_capital.jpg",
    link: "https://x.com/giakaacapital",
  },
  {
    name: "Cequire Capital",
    logo: "assets/images/partners/cequire_capital.jpg",
    link: "https://cequire.com/",
  },
  {
    name: "Cequire Capital",
    logo: "assets/images/partners/cequire_capital.jpg",
    link: "https://cequire.com/",
  },
  {
    name: "Cequire Capital",
    logo: "assets/images/partners/cequire_capital.jpg",
    link: "https://cequire.com/",
  },
  {
    name: "Cequire Capital",
    logo: "assets/images/partners/cequire_capital.jpg",
    link: "https://cequire.com/",
  },
  {
    name: "Cequire Capital",
    logo: "assets/images/partners/cequire_capital.jpg",
    link: "https://cequire.com/",
  },
  // Add more partners here if needed
];

export const Partners = ({ partners }) => {
  return (
    <section className="bg-[#0d0f11] py-10 px-3">
      <div className="max-w-4xl mx-auto text-center">
        <Fade triggerOnce>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-5">
            Our{" "}
            <h2 className="text-[var(--secondary)] inline">
              Partners & Sponsors
            </h2>
          </h2>
        </Fade>

        <div className="grid grid-cols-3 w-full md:grid-cols-3 gap-2 items-center justify-center">
          {partners.map((partner: any, i: any) => {
            const logo = JSON.parse(partner.logo);
            return (
              <Fade
                direction="up"
                delay={i * 100}
                triggerOnce
                key={i}
                className=""
              >
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mx-auto grayscale hover:grayscale-0 transition duration-300 ease-in-out"
                >
                  <img
                    src={`${logo[0]?.url}`}
                    alt={partner.name}
                    className="max-h-20 w-auto mx-auto rounded-xl hover:rounded-sm"
                  />
                </a>
              </Fade>
            );
          })}
        </div>
      </div>
    </section>
  );
};
