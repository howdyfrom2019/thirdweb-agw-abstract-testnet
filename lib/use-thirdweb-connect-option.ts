"use client";

import { client, SupportedChain, wallets } from "@/lib/thirdweb-config";
import { generatePayload, verifyPayalod } from "@/lib/thirdweb-util";
import { loginAtom } from "@/store/thirdweb-login";
import { useAtom } from "jotai";
import { ConnectButtonProps } from "thirdweb/react";

export default function useThirdwebConnectOption() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(loginAtom);

  return {
    client,
    chain: SupportedChain,
    accountAbstraction: {
      chain: SupportedChain,
      sponsorGas: true,
    },
    auth: {
      getLoginPayload: generatePayload,
      isLoggedIn: async (address) => {
        return isLoggedIn;
      },
      doLogin: async (params) => {
        const { valid } = await verifyPayalod(params);
        if (valid) {
          setIsLoggedIn(true);
        }
      },
      doLogout: async () => {
        setIsLoggedIn(false);
      },
    },
    wallets: wallets,
    showAllWallets: false,
    connectModal: {
      size: "wide",
      showThirdwebBranding: false,
    },
  } satisfies ConnectButtonProps;
}
