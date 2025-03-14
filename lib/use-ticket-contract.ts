// use-ticket-contract.ts
"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  createThirdwebClient,
  getContract,
  sendTransaction,
  ThirdwebContract,
  waitForReceipt,
} from "thirdweb";
import { abstract, abstractTestnet } from "thirdweb/chains";
import { claimTo } from "thirdweb/extensions/erc721";
import {
  useActiveAccount,
  useActiveWalletChain,
  useSwitchActiveWalletChain,
} from "thirdweb/react";

export interface TicketContractParams {
  contractAddress: `0x${string}`;
}

const supportedChain =
  process.env.NEXT_PUBLIC_APP_ENV === "DEV" ? abstractTestnet : abstract;

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!;
const secretKey = process.env.THIRDWEB_SECRET_KEY;

export const client = createThirdwebClient(
  secretKey
    ? { secretKey }
    : {
        clientId,
      }
);

export default function useTicketContract(params: TicketContractParams) {
  const { contractAddress } = params ?? {};
  const [isSubmitting, setIsSubmitting] = useState(false);

  const switchChain = useSwitchActiveWalletChain();
  const account = useActiveAccount();
  const chain = useActiveWalletChain();

  const contract: ThirdwebContract = getContract({
    client,
    address: contractAddress,
    chain: abstractTestnet,
  });

  const verifyBeforeInteraction = async () => {
    // step 1. check if the user is connected to the wallet
    if (!account?.address) {
      toast("Please connect your wallet first.");
      return false;
    }

    // step 2. check if the user registered wallet address is the same as the connected wallet address
    // if (session?.address.toLowerCase() !== account.address.toLowerCase()) {
    // toast('Please connect with the registered wallet address.');
    //return false;
    //}

    // step 3. check if the user is connected to the correct chain
    if (chain?.id !== supportedChain.id) {
      await switchChain(supportedChain);
    }
    return true;
  };

  /**
   *
   * @returns transactionHash: `0x${string}`
   */
  const claimNFT = async (count = BigInt(1)) => {
    setIsSubmitting(true);
    try {
      const isValid = await verifyBeforeInteraction();
      if (!isValid) throw new Error("Invalid connection");

      const transaction = claimTo({
        contract,
        to: account?.address!,
        quantity: count,
      });

      const { transactionHash } = await sendTransaction({
        transaction,
        account: account!,
      });

      const receipt = await waitForReceipt({
        client,
        chain: supportedChain,
        transactionHash: transactionHash,
      });

      return receipt.transactionHash;
    } catch (e) {
      const error = e as { code: number; message: string; data?: string };
      // Error occurs because the user isn't listed in WL.
      if (error.code === 3) {
        toast(
          `[${error.message}] You might be not eligible for this condition.`
        );
        return;
      }

      // User canceled before wallet interaction.
      if (error.code === 4001) {
        toast(`[${error.message}] User canceled before wallet interaction.`);
        return;
      }

      toast(error.message);

      return Promise.reject(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    contract,
    claimNFT,
    isSubmitting,
  };
}
