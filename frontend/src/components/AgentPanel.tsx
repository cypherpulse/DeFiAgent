import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Bot, UserPlus, UserMinus, Loader2, Sprout, RefreshCw } from 'lucide-react';
import { useGrantAgent, useRevokeAgent, useAgentHarvest, useAgentRebalance, useIsAgent, useContractData } from '@/hooks/useContract';

const AgentPanel = () => {
  const { address, isConnected } = useAccount();
  const { owner } = useContractData();
  const [agentAddress, setAgentAddress] = useState('');
  const [checkAddress, setCheckAddress] = useState('');
  const [harvestAmount, setHarvestAmount] = useState('');

  const { grantAgent, isPending: isGranting } = useGrantAgent();
  const { revokeAgent, isPending: isRevoking } = useRevokeAgent();
  const { agentHarvest, isPending: isHarvesting } = useAgentHarvest();
  const { agentRebalance, isPending: isRebalancing } = useAgentRebalance();
  
  const isAgentStatus = useIsAgent(checkAddress as `0x${string}` | undefined);
  const isOwner = address && owner && address.toLowerCase() === owner.toLowerCase();

  const handleGrantAgent = async () => {
    if (!agentAddress) return;
    await grantAgent(agentAddress as `0x${string}`);
    setAgentAddress('');
  };

  const handleRevokeAgent = async () => {
    if (!agentAddress) return;
    await revokeAgent(agentAddress as `0x${string}`);
    setAgentAddress('');
  };

  const handleHarvest = async () => {
    if (!harvestAmount) return;
    await agentHarvest(harvestAmount);
    setHarvestAmount('');
  };

  if (!isConnected) return null;

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-semibold text-foreground mb-6">Agent Management</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Grant/Revoke Agent */}
          <div className="card-elevated">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-accent">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Manage Agents</h3>
              {isOwner && (
                <span className="ml-auto text-xs text-primary font-medium">Owner Only</span>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Agent Address
                </label>
                <input
                  type="text"
                  placeholder="0x..."
                  value={agentAddress}
                  onChange={(e) => setAgentAddress(e.target.value)}
                  className="input-base font-mono text-sm"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleGrantAgent}
                  disabled={isGranting || !agentAddress || !isOwner}
                  className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isGranting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <UserPlus className="w-4 h-4" />
                  )}
                  Grant
                </button>
                <button
                  onClick={handleRevokeAgent}
                  disabled={isRevoking || !agentAddress || !isOwner}
                  className="btn-secondary flex items-center justify-center gap-2 disabled:opacity-50 text-destructive"
                >
                  {isRevoking ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <UserMinus className="w-4 h-4" />
                  )}
                  Revoke
                </button>
              </div>
            </div>

            {/* Check Agent Status */}
            <div className="mt-6 pt-6 border-t border-border">
              <label className="block text-sm font-medium text-foreground mb-2">
                Check Agent Status
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="0x..."
                  value={checkAddress}
                  onChange={(e) => setCheckAddress(e.target.value)}
                  className="input-base font-mono text-sm flex-1"
                />
              </div>
              {checkAddress && checkAddress.length === 42 && (
                <div className="mt-3 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isAgentStatus ? 'bg-success' : 'bg-muted-foreground'}`} />
                  <span className="text-sm text-foreground">
                    {isAgentStatus ? 'Is an Agent' : 'Not an Agent'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Harvest & Rebalance */}
          <div className="card-elevated">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-success/10">
                <Sprout className="w-5 h-5 text-success" />
              </div>
              <h3 className="font-semibold text-foreground">Agent Actions</h3>
              <span className="ml-auto text-xs text-muted-foreground font-medium">Agent Only</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Simulate Harvest (Yield Amount in ETH)
                </label>
                <input
                  type="number"
                  step="0.001"
                  min="0"
                  placeholder="0.01"
                  value={harvestAmount}
                  onChange={(e) => setHarvestAmount(e.target.value)}
                  className="input-base"
                />
              </div>
              
              <button
                onClick={handleHarvest}
                disabled={isHarvesting || !harvestAmount}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isHarvesting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sprout className="w-4 h-4" />
                )}
                Harvest Yield
              </button>

              <div className="pt-4 border-t border-border">
                <button
                  onClick={() => agentRebalance()}
                  disabled={isRebalancing}
                  className="btn-secondary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isRebalancing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  Rebalance Portfolio
                </button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Placeholder for future rebalancing logic
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentPanel;
