import React from "react";
import { Fade } from "react-awesome-reveal";
import { classMap } from "@/components/Tools/Misc";
import { appUrl } from "@/dapp";

const PrivateSaleCTA: React.FC = () => {
  return (
    <section id="privatesale" className=" text-primary py-20 px-6 sm:px-16">
      <Fade triggerOnce>
        <div className="max-w-3xl mx-auto text-center border border-[var(--border)] rounded-lg shadow-lg p-10 hover:shadow-[var(--hover)] transition-all">
          <h2 className="text-3xl font-bold">Private Sale</h2>
          <small className="text-primary">Join 30k+ bullish ones</small>
          <p className="mt-4 text-lg text-accent-foreground mb-6">
            Early supporters get first dibs on the $FAECES token before the
            public launch.
          </p>
          <a
            to={`${appUrl}/private_sale/faeces`}
            target="_blank"
            className={`${classMap.button("", "", "", "", "down")}`}
          >
            Join Private Sale
          </a>
        </div>
      </Fade>
    </section>
  );
};

export default PrivateSaleCTA;
