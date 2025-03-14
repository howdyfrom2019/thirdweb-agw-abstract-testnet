"use client";

import useThirdwebConnectOption from "@/lib/use-thirdweb-connect-option";
import { ConnectButton } from "thirdweb/react";

export default function ThirdwebConnectButton() {
  const options = useThirdwebConnectOption();
  return <ConnectButton {...options} />;
}
