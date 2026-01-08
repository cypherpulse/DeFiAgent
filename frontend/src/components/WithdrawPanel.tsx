import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ArrowUpFromLine, Loader2, ShieldAlert } from 'lucide-react';
import { useWithdrawETH, useContractData } from '@/hooks/useContract';

const WithdrawPanel = () => {
  const { address, isConnected } = useAccount();
  const { owner, userETHBalance } = useContractData();
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const { withdrawETH, isPending } = useWithdrawETH();

  const isOwner = address && owner && address.toLowerCase() === owner.toLowerCase();

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) return;
    await withdrawETH(withdrawAmount);
    setWithdrawAmount('');
  };

  if (!isConnected) return null;

  return (
    <div className="card-elevated">
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-accent">
            <ArrowUpFromLine className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Withdraw Funds</h3>
            <p className="text-sm text-muted-foreground">Remove ETH from the vault</p>
          </div>
        </div>

        {!isOwner ? (
          <div className="text-center py-8">
            <ShieldAlert className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="font-semibold text-foreground mb-2">Owner Access Required</h4>
            <p className="text-muted-foreground text-sm">
              Only the contract owner can withdraw funds from the vault.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary">
              <span className="text-sm text-muted-foreground">Available Balance</span>
              <span className="font-semibold text-foreground">{parseFloat(userETHBalance).toFixed(6)} ETH</span>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Withdraw Amount (ETH)
              </label>
              <input
                type="number"
                step="0.001"
                min="0"
                max={userETHBalance}
                placeholder="0.1"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="input-base"
              />
            </div>

            <button
              onClick={handleWithdraw}
              disabled={isPending || !withdrawAmount || parseFloat(withdrawAmount) <= 0}
              className="btn-secondary w-full flex items-center justify-center gap-2 text-destructive disabled:opacity-50 disabled:cursor-not-allowed border-destructive/30 hover:bg-destructive/10"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Withdrawing...
                </>
              ) : (
                <>
                  <ArrowUpFromLine className="w-5 h-5" />
                  Withdraw ETH
                </>
              )}
            </button>

            <p className="text-xs text-muted-foreground text-center">
              Withdrawal will be sent to your connected wallet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawPanel;
