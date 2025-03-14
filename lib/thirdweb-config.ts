import { abstractWallet } from "@abstract-foundation/agw-react/thirdweb";
import { createThirdwebClient } from "thirdweb";
import { abstract, abstractTestnet } from "thirdweb/chains";
import { inAppWallet, walletConnect } from "thirdweb/wallets";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!;
const secretKey = process.env.THIRDWEB_SECRET_KEY;

export const client = createThirdwebClient(
  secretKey
    ? { secretKey }
    : {
        clientId,
      }
);

export const SupportedChain =
  process.env.NEXT_PUBLIC_APP_ENV === "DEV" ? abstractTestnet : abstract;

export const wallets = [
  inAppWallet({ auth: { options: ["google"] } }),
  abstractWallet(),
  walletConnect(),
];

export const ABSTRACT_TEST_CONTRACT_ADDRESS =
  "0x3d8b8d0905008eba937f1f3bbeb7AE6171b30c7f";
