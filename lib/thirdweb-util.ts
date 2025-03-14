"use server";

import { client } from "@/lib/thirdweb-config";
import { createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";

const privateKey = process.env.THIRDWEB_ADMIN_PRIVATE_KEY;

const thirdwebAuth = createAuth({
  domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
  adminAccount: privateKeyToAccount({ client, privateKey }),
  client,
});

export const generatePayload = thirdwebAuth.generatePayload;

export const verifyPayalod = thirdwebAuth.verifyPayload;
