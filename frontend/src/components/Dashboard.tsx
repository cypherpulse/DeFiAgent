import { useAccount, useConnect } from 'wagmi';
import { Wallet, ArrowUpRight, CircleDollarSign } from 'lucide-react';
import { useContractData } from '@/hooks/useContract';

const Dashboard = () => {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { userETHBalance, owner } = useContractData();

  const isOwner = address && owner && address.toLowerCase() === owner.toLowerCase();

  if (!isConnected) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="card-elevated text-center py-12">
            <Wallet className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Connect Your Wallet</h3>
            <p className="text-muted-foreground mb-6">Connect your wallet to view your deposits and interact with the vault</p>
            <button
              onClick={() => connectors[0] && connect({ connector: connectors[0] })}
              className="btn-primary"
            >
              Connect Wallet
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Your Dashboard</h2>
          {isOwner && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
              Owner
            </span>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* ETH Balance Card */}
          <div className="card-elevated">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-accent">
                  <CircleDollarSign className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="stat-label">Your ETH Deposit</p>
                  <p className="text-2xl font-bold text-foreground">
                    {parseFloat(userETHBalance).toFixed(6)} ETH
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          {/* Wallet Info Card */}
          <div className="card-elevated">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-secondary">
                <Wallet className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <p className="stat-label">Connected Wallet</p>
                <p className="text-sm font-mono text-foreground">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </p>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Network: Base Sepolia
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
