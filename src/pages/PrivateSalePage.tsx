import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import SaleTimer from "./components/PrivateSalePage/SaleTimer";
import { classMap } from "@/components/Tools/Misc";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { appUrl, saleWallet } from "@/dapp";
import axios from "axios";
import { PresaleBtn } from "../components/Tools/Misc";
import { apiUrl } from "../App";
import PayButton from "../components/ui/PayButton";

const TOKEN_PRICE = 0.007; // USD per token
const C_ADDRESS = "0x57299E7A2c1544429Bcf9FdAad5b364D20EEF797";
const BASE_USD = 1; // placeholder until live rate

const PrivateSalePage: React.FC = () => {
  const copyAddress = () => {
    navigator.clipboard.writeText(C_ADDRESS);
    toast.success("Contract address copied!");
  };

  return (
    <Layout>
      <Helmet>
        <title>$Dehta Token Private Sale</title>
      </Helmet>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start justify-items-center p-4 mt-20 text-white">
        {/* Left Hero */}
        <section className="w-full flex flex-col text-center">
          <h2 className="text-5xl font-black drop-shadow-xl leading-tight max-w-xs">
            OG Private Sale Party!!
          </h2>
        </section>

        {/* Center Form */}
        <section className="max-w-5xl w-full flex flex-col items-center space-y-6">
          <p className={classMap.subText}>
            Secure your{" "}
            <span className="font-semibold text-(--owner)">$DTA</span> tokens
            before the doors close.
          </p>

          <div className={classMap.glassCard("p-5 w-full text-center")}>
            <p className="text-white/70 text-sm">1 $DTA = $0.007</p>
          </div>

          <div className={classMap.glassCard("p-6 w-full space-y-2")}>
            <h3 className="font-bold text-white">Contract Address</h3>
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="font-mono text-sm break-all flex-1">
                {C_ADDRESS}
              </span>
              <button onClick={copyAddress} className={classMap.button()}>
                Copy
              </button>
            </div>

            <h3 className="font-semibold text-xl text-white">Amount</h3>

            <PayButton
              data={{
                payout_address: "Aw8Cs5vACghhHFUSJ7UhUDwddPksjqb5CPpM6nD2rZ1E",
                payout_currency: "sol",
              }}
              privateSale={true}
              successUrl={`${apiUrl}/api/private-sale/verify`}
              minAmount={30}
              maxAmount={750}
            />

            <p className="text-xs text-white/50 text-center">
              Tokens are delivered after verification.
            </p>
          </div>
        </section>

        {/* Right Hero Mirror */}
        <section className="w-full flex flex-col text-center">
          <h2 className="text-5xl font-black drop-shadow-xl leading-tight max-w-xs opacity-50">
            OG Private Sale Party!!
          </h2>
        </section>
      </div>
    </Layout>
  );
};

export default PrivateSalePage;
