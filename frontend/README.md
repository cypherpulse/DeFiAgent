# DeFiAgent Frontend

[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-yellow)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Components-black)](https://ui.shadcn.com/)

## Overview

The DeFiAgent frontend is a modern React application built with TypeScript, Vite, and Tailwind CSS. It provides a user-friendly interface for interacting with the DeFiAgent smart contract on Base, allowing users to deposit assets, grant AI agent permissions, and monitor their yield farming activities.

## Features

- **Wallet Integration**: Connect MetaMask or other Web3 wallets
- **Asset Deposits**: Deposit ETH and ERC20 tokens (USDC, etc.)
- **Agent Management**: Grant and revoke permissions for AI agents
- **Dashboard**: Real-time monitoring of deposits, yields, and fees
- **Responsive Design**: Mobile-first design with shadcn/ui components

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Web3**: Wagmi + Viem for blockchain interactions
- **State Management**: TanStack Query for server state
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:8080](http://localhost:8080) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── config/             # Configuration files
│   └── types/              # TypeScript type definitions
├── index.html              # Main HTML file
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── components.json         # shadcn/ui configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Environment Variables

Create a `.env` file in the frontend directory with the following variables:

```env
VITE_BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
VITE_DEFI_AGENT_CONTRACT_ADDRESS=0x409E9222f69B11F84bC9e54794061315E27f5F64
```

## Contributing

1. Follow the existing code style and conventions
2. Write clear, concise commit messages
3. Test your changes thoroughly
4. Update documentation as needed

## License

MIT License - see [LICENSE](../../LICENSE) for details.
