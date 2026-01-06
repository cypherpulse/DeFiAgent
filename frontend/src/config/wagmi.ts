import { http, createConfig } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

// Configure wagmi without ConnectKit's getDefaultConfig to avoid EventEmitter issues
export const config = createConfig({
  chains: [baseSepolia],
  connectors: [
    injected(),
    walletConnect({
      projectId: 'defiagent-yield-vault',
      metadata: {
        name: 'DeFiAgent',
        description: 'Autonomous Yield Harvesting on Base',
        url: 'https://defiagent.io',
        icons: ['https://defiagent.io/logo.png'],
      },
    }),
  ],
  transports: {
    [baseSepolia.id]: http('https://sepolia.base.org'),
  },
});

export const CONTRACT_ADDRESS = '0x409E9222f69B11F84bC9e54794061315E27f5F64' as const;

export const CONTRACT_ABI = [
  {"type":"constructor","inputs":[{"name":"_treasury","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},
  {"type":"function","name":"PERFORMANCE_FEE_BPS","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},
  {"type":"function","name":"agentHarvest","inputs":[{"name":"yieldAmount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},
  {"type":"function","name":"agentRebalance","inputs":[],"outputs":[],"stateMutability":"nonpayable"},
  {"type":"function","name":"depositERC20","inputs":[{"name":"token","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},
  {"type":"function","name":"depositETH","inputs":[],"outputs":[],"stateMutability":"payable"},
  {"type":"function","name":"estimatedAPY","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"pure"},
  {"type":"function","name":"getTotalDeposited","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},
  {"type":"function","name":"getUserBalance","inputs":[{"name":"user","type":"address","internalType":"address"}],"outputs":[{"name":"ethBalance","type":"uint256","internalType":"uint256"},{"name":"erc20Balances","type":"uint256[]","internalType":"uint256[]"}],"stateMutability":"view"},
  {"type":"function","name":"grantAgent","inputs":[{"name":"agent","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},
  {"type":"function","name":"isAgent","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},
  {"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},
  {"type":"function","name":"renounceOwnership","inputs":[],"outputs":[],"stateMutability":"nonpayable"},
  {"type":"function","name":"revokeAgent","inputs":[{"name":"agent","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},
  {"type":"function","name":"totalDeposited","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},
  {"type":"function","name":"totalFeesCollected","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},
  {"type":"function","name":"totalYieldHarvested","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},
  {"type":"function","name":"transferOwnership","inputs":[{"name":"newOwner","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},
  {"type":"function","name":"treasury","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},
  {"type":"function","name":"userDepositERC20","inputs":[{"name":"","type":"address","internalType":"address"},{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},
  {"type":"function","name":"userDepositETH","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},
  {"type":"function","name":"withdrawERC20","inputs":[{"name":"token","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},
  {"type":"function","name":"withdrawETH","inputs":[{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},
  {"type":"event","name":"AgentGranted","inputs":[{"name":"agent","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},
  {"type":"event","name":"AgentRevoked","inputs":[{"name":"agent","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},
  {"type":"event","name":"Deposited","inputs":[{"name":"user","type":"address","indexed":true,"internalType":"address"},{"name":"token","type":"address","indexed":false,"internalType":"address"},{"name":"amount","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},
  {"type":"event","name":"OwnershipTransferred","inputs":[{"name":"previousOwner","type":"address","indexed":true,"internalType":"address"},{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},
  {"type":"event","name":"YieldHarvested","inputs":[{"name":"agent","type":"address","indexed":true,"internalType":"address"},{"name":"yieldAmount","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"fee","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},
  {"type":"error","name":"OwnableInvalidOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}]},
  {"type":"error","name":"OwnableUnauthorizedAccount","inputs":[{"name":"account","type":"address","internalType":"address"}]},
  {"type":"error","name":"ReentrancyGuardReentrantCall","inputs":[]},
  {"type":"error","name":"SafeERC20FailedOperation","inputs":[{"name":"token","type":"address","internalType":"address"}]}
] as const;

// Simpler ABI for write functions
export const WRITE_ABI = [
  {"type":"function","name":"depositETH","inputs":[],"outputs":[],"stateMutability":"payable"},
  {"type":"function","name":"depositERC20","inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},
  {"type":"function","name":"withdrawETH","inputs":[{"name":"amount","type":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},
  {"type":"function","name":"grantAgent","inputs":[{"name":"agent","type":"address"}],"outputs":[],"stateMutability":"nonpayable"},
  {"type":"function","name":"revokeAgent","inputs":[{"name":"agent","type":"address"}],"outputs":[],"stateMutability":"nonpayable"},
  {"type":"function","name":"agentHarvest","inputs":[{"name":"yieldAmount","type":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},
  {"type":"function","name":"agentRebalance","inputs":[],"outputs":[],"stateMutability":"nonpayable"},
];
