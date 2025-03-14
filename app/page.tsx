"use client";

import Button from "@/components/button";
import ThirdwebConnectButton from "@/components/thirdweb-connect-button";
import { cn } from "@/lib/tailwind-util";
import {
  ABSTRACT_TEST_CONTRACT_ADDRESS,
  SupportedChain,
} from "@/lib/thirdweb-config";
import useTicketContract from "@/lib/use-ticket-contract";
import { loginAtom } from "@/store/thirdweb-login";
import { useAtomValue } from "jotai";
import { toast } from "sonner";
import {
  useActiveAccount,
  useActiveWalletChain,
  useSwitchActiveWalletChain,
} from "thirdweb/react";

export default function Home() {
  const account = useActiveAccount();
  const isLoggedin = useAtomValue(loginAtom);
  const activeChain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();
  const { claimNFT, isSubmitting } = useTicketContract({
    contractAddress: ABSTRACT_TEST_CONTRACT_ADDRESS,
  });

  const handleSwitchChain = async () => {
    await switchChain(SupportedChain);
  };

  const handleClickClaimBtn = async () => {
    try {
      const txHash = await claimNFT(); // error occurs here.
      console.log(txHash);
      if (!txHash) return;

      toast("NFT successfully claimed!");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast(error.message);
      }
    }
  };

  return (
    <main className={"my-20 flex flex-col w-full"}>
      <article
        className={
          "flex flex-col gap-5 max-w-96 w-full mx-auto border rounded-2xl border-zinc-100 p-8"
        }
      >
        <section className={"flex flex-col gap-2"}>
          <p className={"text-lg"}>1. Connect Thirdweb Wallet</p>
          <p className={"text-zinc-400 text-sm"}>
            Please connect with AGW wallet
          </p>
          <ThirdwebConnectButton />
        </section>
        <section className={"relative flex flex-col gap-2 mt-10"}>
          <p className={"text-lg"}>2. Switch Chain</p>
          <p className={"text-zinc-400 text-sm"}>
            Please switch chain as {SupportedChain.name}
          </p>
          <Button
            disabled={activeChain?.id === SupportedChain.id}
            onClick={handleSwitchChain}
          >
            Shift Chain
          </Button>
          <p className={"text-zinc-600 text-base"}>
            Active Chain:{" "}
            {activeChain ? `[${activeChain.id}] ${activeChain.name}` : "-"}
          </p>
          <div
            className={cn([
              "hidden absolute w-full h-full inset-0 bg-white backdrop-blur-md",
              (!account || !isLoggedin) && "block",
            ])}
          />
        </section>
        <section className={"relative flex flex-col gap-2 mt-10"}>
          <p className={"text-lg"}>3. Claim NFT</p>
          <Button disabled={isSubmitting} onClick={handleClickClaimBtn}>
            {isSubmitting ? "Submitting...." : "Claim My NFT"}
          </Button>
          <p className={"text-zinc-600 text-base"}>txId: </p>
          <div
            className={cn([
              "hidden absolute w-full h-full inset-0 bg-white backdrop-blur-md",
              (!account ||
                !isLoggedin ||
                activeChain?.id !== SupportedChain.id) &&
                "block",
            ])}
          />
        </section>
      </article>
    </main>
  );
}
