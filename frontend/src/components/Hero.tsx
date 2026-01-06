import { useConnect, useAccount, useDisconnect, useSwitchChain, useChainId } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { Zap, Bot, TrendingUp, Shield, Wallet, ChevronDown, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';

export const ConnectButton = () => {
  const { connectors, connect, isPending } = useConnect();
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const [showMenu, setShowMenu] = useState(false);

  const isOnCorrectNetwork = chain?.id === baseSepolia.id;

  if (isConnected && address) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={`text-lg px-8 py-4 flex items-center gap-2 ${
            isOnCorrectNetwork ? 'btn-primary' : 'btn-secondary'
          }`}
        >
          <div className={`w-2 h-2 rounded-full animate-pulse ${
            isOnCorrectNetwork ? 'bg-success' : 'bg-warning'
          }`} />
          {address.slice(0, 6)}...{address.slice(-4)}
          {!isOnCorrectNetwork && <AlertTriangle className="w-4 h-4 text-warning" />}
          <ChevronDown className="w-4 h-4" />
        </button>

        {showMenu && (
          <div className="absolute top-full mt-2 right-0 w-48 card-elevated p-2 z-50">
            {!isOnCorrectNetwork && (
              <button
                onClick={() => {
                  switchChain({ chainId: baseSepolia.id });
                  setShowMenu(false);
                }}
                disabled={isSwitching}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-secondary text-warning font-medium transition-colors flex items-center gap-2"
              >
                <AlertTriangle className="w-4 h-4" />
                Switch to Base Sepolia
              </button>
            )}
            <button
              onClick={() => {
                disconnect();
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-secondary text-destructive font-medium transition-colors"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        disabled={isPending}
        className="btn-primary text-lg px-8 py-4 flex items-center gap-2"
      >
        <Zap className="w-5 h-5" />
        {isPending ? 'Connecting...' : 'Connect Wallet'}
      </button>

      {showMenu && (
        <div className="absolute top-full mt-2 right-0 w-64 card-elevated p-2 z-50">
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              onClick={() => {
                connect({ connector });
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-secondary flex items-center gap-3 transition-colors"
            >
              <Wallet className="w-5 h-5 text-primary" />
              <span className="font-medium">{connector.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const NetworkStatus = () => {
  const { isConnected, chain } = useAccount();
  const { switchChain, isPending: isSwitching } = useSwitchChain();

  if (!isConnected) return null;

  const isOnCorrectNetwork = chain?.id === baseSepolia.id;

  return (
    <div className="mb-6 animate-fade-in">
      {isOnCorrectNetwork ? (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm font-medium text-success">Connected to Base Sepolia</span>
        </div>
      ) : (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 border border-warning/20">
          <AlertTriangle className="w-4 h-4 text-warning" />
          <span className="text-sm font-medium text-warning">
            Wrong network: {chain?.name || 'Unknown'}
          </span>
          <button
            onClick={() => switchChain({ chainId: baseSepolia.id })}
            disabled={isSwitching}
            className="ml-2 px-3 py-1 text-xs bg-warning text-warning-foreground rounded-md hover:bg-warning/80 transition-colors disabled:opacity-50"
          >
            {isSwitching ? 'Switching...' : 'Switch'}
          </button>
        </div>
      )}
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-6 animate-fade-in">
            <Bot className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Base Sepolia Testnet</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight animate-fade-in">
            DeFiAgent:{' '}
            <span className="gradient-text">Autonomous Yield</span>
            <br />
            Harvesting on Base
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in">
            Deposit funds → Grant AI agents → Watch them compound yield with{' '}
            <span className="font-semibold text-primary">0.75% performance fee</span>
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in">
            <ConnectButton />
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary border border-border">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Non-custodial</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary border border-border">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-sm font-medium text-foreground">Auto-compound</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary border border-border">
              <Bot className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">AI-powered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
