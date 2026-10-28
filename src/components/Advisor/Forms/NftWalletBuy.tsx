import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { parseEther } from "viem";
import { mainnet } from "wagmi/chains";
import { useChainId, useSendTransaction, useSwitchChain } from "wagmi";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { apiUrl, saleWallet } from "@/App";
import { classMap, LoadingBar } from "@/components/Tools/Misc";
import { useUser } from "@/context/UserContext";

export type TradFiNft = {
  id: string | number;
  name: string;
  cost: number;
  icon?: string;
  kind: "glass" | "nft";
  symbol?: string;
  description?: string;
};

export default function NftWalletBuy({
  nft,
  onPurchased,
}: {
  nft: TradFiNft;
  onPurchased?: () => void;
}) {
  const { open } = useAppKit();
  const { isConnected, address } = useAppKitAccount();
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();
  const { sendTransactionAsync } = useSendTransaction();
  const { getUser, role, syncSidebar } = useUser();
  const [loading, setLoading] = useState(false);
  const [hash, setHash] = useState("");

  const recordPurchase = async (txHash: string) => {
    const payload = {
      nft_id: nft.id,
      glass_id: nft.kind === "glass" ? nft.id : undefined,
      name: nft.name,
      cost: nft.cost,
      price: nft.cost,
      kind: nft.kind,
      wallet_address: address,
      tx_hash: txHash,
      chain_id: mainnet.id,
    };

    const calls = [
      axios.post(`${apiUrl}/api/market/nft/purchase`, payload).then(() => "desk"),
      axios.post(`${apiUrl}/api/tradfi/purchase`, payload).then(() => "tradfi"),
    ];
    if (nft.kind === "glass") {
      calls.push(
        axios
          .post(`${apiUrl}/api/glass/buy`, {
            glass_id: nft.id,
            cost: nft.cost,
            tx_hash: txHash,
            wallet_address: address,
          })
          .then(() => "glass")
      );
    }

    const settled = await Promise.allSettled(calls);
    const ok = settled.some((r) => r.status === "fulfilled");
    if (!ok) {
      toast.error("Paid on-chain, but the desk could not record it. Save your transaction hash.");
      return;
    }
    try {
      getUser?.();
      syncSidebar?.(role);
    } catch {
      /* profile refresh is optional */
    }
    onPurchased?.();
    toast.success("NFT purchased and recorded.");
  };

  const handleBuy = async () => {
    if (!isConnected || !address) {
      open();
      return;
    }
    if (!nft.cost || nft.cost <= 0) {
      toast.error("This NFT has no price yet.");
      return;
    }

    try {
      setLoading(true);
      if (chainId !== mainnet.id) {
        await switchChainAsync({ chainId: mainnet.id });
      }

      const quote = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      const quoteJson = await quote.json();
      const ethUsd = Number(quoteJson?.ethereum?.usd);
      if (!ethUsd) {
        toast.error("Could not price ETH. Try again.");
        return;
      }

      const ethAmount = (nft.cost / ethUsd).toFixed(8);
      const txHash = await sendTransactionAsync({
        to: saleWallet as `0x${string}`,
        value: parseEther(ethAmount),
      });

      setHash(txHash);
      await recordPurchase(txHash);
    } catch (err: any) {
      const message = err?.shortMessage || err?.message || "Wallet purchase was cancelled.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 text-white">
      <div className="rounded-2xl border border-emerald-400/30 bg-black/50 p-3">
        <img src={nft.icon || "/logo.svg"} alt={nft.name} className="mx-auto h-40 w-40 object-contain" />
        <h4 className="mt-3 text-center text-lg font-semibold">{nft.name}</h4>
        <p className="text-center text-emerald-300">${Number(nft.cost).toLocaleString()} · paid in ETH</p>
      </div>
      <button className={classMap.button()} onClick={handleBuy} disabled={loading}>
        {loading ? <LoadingBar /> : isConnected ? `Buy with wallet` : "Connect wallet to buy"}
      </button>
      {address && (
        <p className="text-center text-xs text-white/50">
          {address.slice(0, 6)}…{address.slice(-4)} on Ethereum
        </p>
      )}
      {hash && (
        <a
          className="break-all text-center text-xs text-emerald-300 underline"
          href={`https://etherscan.io/tx/${hash}`}
          target="_blank"
          rel="noreferrer"
        >
          {hash}
        </a>
      )}
    </div>
  );
}
