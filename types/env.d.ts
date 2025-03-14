declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_APP_ENV: "DEV" | "PROD";
    NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN: "localhost:3000";
    NEXT_PUBLIC_THIRDWEB_CLIENT_ID: string;
    THIRDWEB_SECRET_KEY: string;
    THIRDWEB_ADMIN_PRIVATE_KEY: string;
  }
}
