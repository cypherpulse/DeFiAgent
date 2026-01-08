import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ArrowDownToLine, Coins, Loader2 } from 'lucide-react';
import { useDepositETH, useDepositERC20 } from '@/hooks/useContract';
import { parseUnits } from 'viem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DepositPanel = () => {
  const { isConnected } = useAccount();
  const [ethAmount, setEthAmount] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');

  const { depositETH, isPending: isDepositingETH } = useDepositETH();
  const { depositERC20, isPending: isDepositingERC20 } = useDepositERC20();

  const handleDepositETH = async () => {
    if (!ethAmount || parseFloat(ethAmount) <= 0) return;
    await depositETH(ethAmount);
    setEthAmount('');
  };

  const handleDepositERC20 = async () => {
    if (!tokenAddress || !tokenAmount || parseFloat(tokenAmount) <= 0) return;
    try {
      await depositERC20(tokenAddress as `0x${string}`, parseUnits(tokenAmount, 18));
      setTokenAddress('');
      setTokenAmount('');
    } catch (error) {
      console.error('ERC20 deposit failed:', error);
    }
  };

  if (!isConnected) return null;

  return (
    <div className="card-elevated">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-accent">
            <ArrowDownToLine className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Deposit Funds</h3>
            <p className="text-sm text-muted-foreground">Add ETH or ERC20 tokens to the vault</p>
          </div>
        </div>

        <Tabs defaultValue="eth" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="eth" className="flex items-center gap-2">
              <ArrowDownToLine className="w-4 h-4" />
              ETH
            </TabsTrigger>
            <TabsTrigger value="erc20" className="flex items-center gap-2">
              <Coins className="w-4 h-4" />
              ERC20
            </TabsTrigger>
          </TabsList>

          <TabsContent value="eth" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Amount (ETH)
              </label>
              <input
                type="number"
                step="0.001"
                min="0"
                placeholder="0.1"
                value={ethAmount}
                onChange={(e) => setEthAmount(e.target.value)}
                className="input-base"
              />
            </div>
            <button
              onClick={handleDepositETH}
              disabled={isDepositingETH || !ethAmount}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDepositingETH ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Depositing...
                </>
              ) : (
                <>
                  <ArrowDownToLine className="w-5 h-5" />
                  Deposit ETH
                </>
              )}
            </button>
          </TabsContent>

          <TabsContent value="erc20" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Token Address
              </label>
              <input
                type="text"
                placeholder="0x..."
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                className="input-base font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Amount
              </label>
              <input
                type="number"
                step="0.001"
                min="0"
                placeholder="100"
                value={tokenAmount}
                onChange={(e) => setTokenAmount(e.target.value)}
                className="input-base"
              />
            </div>
            <button
              onClick={handleDepositERC20}
              disabled={isDepositingERC20 || !tokenAddress || !tokenAmount}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDepositingERC20 ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Depositing...
                </>
              ) : (
                <>
                  <Coins className="w-5 h-5" />
                  Deposit ERC20
                </>
              )}
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Make sure to approve the token first
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DepositPanel;
