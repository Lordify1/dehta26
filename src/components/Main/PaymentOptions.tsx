import React from "react";
import { appUrl } from "@/dapp";
import axios from "axios";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";

const PaymentOptions = () => {
  return (
    <section className="bg-[#0d0f11] py-10 px-3">
      <div className="max-w-4xl mx-auto text-center">
        <Fade triggerOnce>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-8">
            <span className="text-[var(--secondary)]">Payment </span>Options
          </h2>
        </Fade>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 items-center justify-center"></div>
      </div>
    </section>
  );
};

export default PaymentOptions;
