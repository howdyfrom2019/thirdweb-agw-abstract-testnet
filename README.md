# Thirdweb-AGW-Testnet

<img src="./readme/demo.png" alt="./readme/demo.png">

[Click to go demo page](https://thirdweb-agw-abstract-testnet.vercel.app)

## Overview

> For verifying abstract testnet rpc is not working when using Thirdweb and AGW.

## How to reproduce the error. (in local)

- yarn version: v1.22.22
- node version: v22.12.0

### 1. Clone project and Install the packages

```bash
git clone https://github.com/howdyfrom2019/thirdweb-agw-abstract-testnet.git
cd [your-path]
yarn install # or npm install
```

### 2. Fill out .env file

```bash
# Please create a new .env file and copy and paste the props key and put value from your project.

# put DEV or PROD (for choosing different chain configuration)
NEXT_PUBLIC_APP_ENV=DEV

# for signature hostname
NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN=localhost:3000

# configure below with test client
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=
THIRDWEB_SECRET_KEY=
THIRDWEB_ADMIN_PRIVATE_KEY=
```

It needs thirdweb client and secret key and admin private key for thirdweb auth.

### 3. Run development server

```bash
yarn dev # or npm run dev
```

### 4. Check in local

```bash
http://localhost:3000
```

## My result

I configure with abstract testent, but the origin url of rpc is `api.mainnet.abs.xyz`

<img src="./readme/result.png" alt="./readme/result.png" />
