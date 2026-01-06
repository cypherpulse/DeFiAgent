import { useReadContract, useWriteContract, useWatchContractEvent, useAccount } from 'wagmi';
import { parseEther, formatEther, type Abi } from 'viem';
import { baseSepolia } from 'wagmi/chains';
import { CONTRACT_ADDRESS, CONTRACT_ABI, WRITE_ABI } from '@/config/wagmi';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';
import { useCallback } from 'react';

const triggerConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#0052FF', '#00D1FF', '#1E90FF'],
  });
};

export const useContractData = () => {
  const { address } = useAccount();

  const { data: totalDeposited, refetch: refetchTotalDeposited } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'totalDeposited',
  });

  const { data: totalYieldHarvested, refetch: refetchYield } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'totalYieldHarvested',
  });

  const { data: totalFeesCollected, refetch: refetchFees } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'totalFeesCollected',
  });

  const { data: userETHBalance, refetch: refetchUserETH } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'userDepositETH',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const { data: owner } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'owner',
  });

  const { data: estimatedAPY } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'estimatedAPY',
  });

  const refetchAll = useCallback(() => {
    refetchTotalDeposited();
    refetchYield();
    refetchFees();
    refetchUserETH();
  }, [refetchTotalDeposited, refetchYield, refetchFees, refetchUserETH]);

  return {
    totalDeposited: totalDeposited ? formatEther(totalDeposited) : '0',
    totalYieldHarvested: totalYieldHarvested ? formatEther(totalYieldHarvested) : '0',
    totalFeesCollected: totalFeesCollected ? formatEther(totalFeesCollected) : '0',
    userETHBalance: userETHBalance ? formatEther(userETHBalance) : '0',
    owner,
    estimatedAPY: estimatedAPY ? Number(estimatedAPY) / 100 : 0,
    refetchAll,
  };
};

export const useIsAgent = (agentAddress?: `0x${string}`) => {
  const { data: isAgent } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'isAgent',
    args: agentAddress ? [agentAddress] : undefined,
    query: {
      enabled: !!agentAddress && agentAddress.length === 42,
    },
  });

  return isAgent ?? false;
};

export const useDepositETH = () => {
  const { writeContract, isPending, isSuccess, isError } = useWriteContract();
  const { address } = useAccount();
  const { refetchAll } = useContractData();

  const depositETH = (amount: string) => {
    if (!address) return;
    
    writeContract(
      {
        address: CONTRACT_ADDRESS,
        abi: WRITE_ABI as Abi,
        functionName: 'depositETH',
        value: parseEther(amount),
        chain: baseSepolia,
        account: address,
      },
      {
        onSuccess: () => {
          triggerConfetti();
          toast({
            title: '🎉 Deposit Successful!',
            description: `Deposited ${amount} ETH to the vault`,
          });
          setTimeout(refetchAll, 2000);
        },
        onError: () => {
          toast({
            title: 'Deposit Failed',
            description: 'Transaction was rejected or failed',
            variant: 'destructive',
          });
        },
      }
    );
  };

  return { depositETH, isPending, isSuccess, isError };
};

export const useDepositERC20 = () => {
  const { writeContract, isPending, isSuccess, isError } = useWriteContract();
  const { address } = useAccount();
  const { refetchAll } = useContractData();

  const depositERC20 = (tokenAddress: `0x${string}`, amount: bigint) => {
    if (!address) return;
    
    writeContract(
      {
        address: CONTRACT_ADDRESS,
        abi: WRITE_ABI as Abi,
        functionName: 'depositERC20',
        args: [tokenAddress, amount],
        chain: baseSepolia,
        account: address,
      },
      {
        onSuccess: () => {
          triggerConfetti();
          toast({
            title: '🎉 ERC20 Deposit Successful!',
            description: `Token deposited to the vault`,
          });
          setTimeout(refetchAll, 2000);
        },
        onError: () => {
          toast({
            title: 'Deposit Failed',
            description: 'Transaction was rejected or failed',
            variant: 'destructive',
          });
        },
      }
    );
  };

  return { depositERC20, isPending, isSuccess, isError };
};

export const useWithdrawETH = () => {
  const { writeContract, isPending } = useWriteContract();
  const { address } = useAccount();
  const { refetchAll } = useContractData();

  const withdrawETH = (amount: string) => {
    if (!address) return;
    
    writeContract(
      {
        address: CONTRACT_ADDRESS,
        abi: WRITE_ABI as Abi,
        functionName: 'withdrawETH',
        args: [parseEther(amount)],
        chain: baseSepolia,
        account: address,
      },
      {
        onSuccess: () => {
          toast({
            title: '✅ Withdrawal Successful!',
            description: `Withdrew ${amount} ETH from the vault`,
          });
          setTimeout(refetchAll, 2000);
        },
        onError: () => {
          toast({
            title: 'Withdrawal Failed',
            description: 'Only owner can withdraw or insufficient balance',
            variant: 'destructive',
          });
        },
      }
    );
  };

  return { withdrawETH, isPending };
};

export const useGrantAgent = () => {
  const { writeContract, isPending } = useWriteContract();
  const { address } = useAccount();

  const grantAgent = (agentAddress: `0x${string}`) => {
    if (!address) return;
    
    writeContract(
      {
        address: CONTRACT_ADDRESS,
        abi: WRITE_ABI as Abi,
        functionName: 'grantAgent',
        args: [agentAddress],
        chain: baseSepolia,
        account: address,
      },
      {
        onSuccess: () => {
          triggerConfetti();
          toast({
            title: '🤖 Agent Granted!',
            description: `${agentAddress.slice(0, 6)}...${agentAddress.slice(-4)} is now an agent`,
          });
        },
        onError: () => {
          toast({
            title: 'Grant Failed',
            description: 'Only owner can grant agent status',
            variant: 'destructive',
          });
        },
      }
    );
  };

  return { grantAgent, isPending };
};

export const useRevokeAgent = () => {
  const { writeContract, isPending } = useWriteContract();
  const { address } = useAccount();

  const revokeAgent = (agentAddress: `0x${string}`) => {
    if (!address) return;
    
    writeContract(
      {
        address: CONTRACT_ADDRESS,
        abi: WRITE_ABI as Abi,
        functionName: 'revokeAgent',
        args: [agentAddress],
        chain: baseSepolia,
        account: address,
      },
      {
        onSuccess: () => {
          toast({
            title: '❌ Agent Revoked',
            description: `${agentAddress.slice(0, 6)}...${agentAddress.slice(-4)} is no longer an agent`,
          });
        },
        onError: () => {
          toast({
            title: 'Revoke Failed',
            description: 'Only owner can revoke agent status',
            variant: 'destructive',
          });
        },
      }
    );
  };

  return { revokeAgent, isPending };
};

export const useAgentHarvest = () => {
  const { writeContract, isPending } = useWriteContract();
  const { address } = useAccount();
  const { refetchAll } = useContractData();

  const agentHarvest = (yieldAmount: string) => {
    if (!address) return;
    
    writeContract(
      {
        address: CONTRACT_ADDRESS,
        abi: WRITE_ABI as Abi,
        functionName: 'agentHarvest',
        args: [parseEther(yieldAmount)],
        chain: baseSepolia,
        account: address,
      },
      {
        onSuccess: () => {
          triggerConfetti();
          toast({
            title: '🌾 Yield Harvested!',
            description: `Harvested ${yieldAmount} ETH yield`,
          });
          setTimeout(refetchAll, 2000);
        },
        onError: () => {
          toast({
            title: 'Harvest Failed',
            description: 'Only agents can harvest yield',
            variant: 'destructive',
          });
        },
      }
    );
  };

  return { agentHarvest, isPending };
};

export const useAgentRebalance = () => {
  const { writeContract, isPending } = useWriteContract();
  const { address } = useAccount();

  const agentRebalance = () => {
    if (!address) return;
    
    writeContract(
      {
        address: CONTRACT_ADDRESS,
        abi: WRITE_ABI as Abi,
        functionName: 'agentRebalance',
        chain: baseSepolia,
        account: address,
      },
      {
        onSuccess: () => {
          toast({
            title: '⚖️ Rebalance Initiated',
            description: 'Portfolio rebalancing in progress',
          });
        },
        onError: () => {
          toast({
            title: 'Rebalance Failed',
            description: 'Only agents can rebalance',
            variant: 'destructive',
          });
        },
      }
    );
  };

  return { agentRebalance, isPending };
};

export const useContractEvents = () => {
  const queryClient = useQueryClient();

  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    eventName: 'Deposited',
    onLogs: () => {
      toast({
        title: '💰 New Deposit',
        description: `User deposited funds to the vault`,
      });
      queryClient.invalidateQueries();
    },
  });

  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    eventName: 'YieldHarvested',
    onLogs: () => {
      toast({
        title: '🌾 Yield Harvested',
        description: `Agent harvested yield from the vault`,
      });
      queryClient.invalidateQueries();
    },
  });

  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    eventName: 'AgentGranted',
    onLogs: () => {
      toast({
        title: '🤖 Agent Granted',
        description: `New agent has been granted access`,
      });
    },
  });

  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    eventName: 'AgentRevoked',
    onLogs: () => {
      toast({
        title: '❌ Agent Revoked',
        description: `Agent access has been revoked`,
      });
    },
  });
};
