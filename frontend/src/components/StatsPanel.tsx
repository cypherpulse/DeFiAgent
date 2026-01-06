import { Wallet, TrendingUp, Coins, Percent } from 'lucide-react';
import { useContractData } from '@/hooks/useContract';

const StatsPanel = () => {
  const { totalDeposited, totalYieldHarvested, totalFeesCollected, estimatedAPY } = useContractData();

  const stats = [
    {
      label: 'Total Value Locked',
      value: `${parseFloat(totalDeposited).toFixed(4)} ETH`,
      icon: Wallet,
      accent: 'primary',
    },
    {
      label: 'Total Yield Harvested',
      value: `${parseFloat(totalYieldHarvested).toFixed(4)} ETH`,
      icon: TrendingUp,
      accent: 'success',
    },
    {
      label: 'Total Fees Collected',
      value: `${parseFloat(totalFeesCollected).toFixed(6)} ETH`,
      icon: Coins,
      accent: 'muted',
    },
    {
      label: 'Estimated APY',
      value: `${estimatedAPY}%`,
      icon: Percent,
      accent: 'primary',
    },
  ];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-semibold text-foreground mb-6">Global Vault Stats</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="card-elevated group hover:scale-[1.02] transition-transform duration-200">
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`p-2 rounded-xl ${
                    stat.accent === 'success'
                      ? 'bg-success/10'
                      : stat.accent === 'muted'
                      ? 'bg-muted'
                      : 'bg-accent'
                  }`}
                >
                  <stat.icon
                    className={`w-5 h-5 ${
                      stat.accent === 'success'
                        ? 'text-success'
                        : stat.accent === 'muted'
                        ? 'text-muted-foreground'
                        : 'text-primary'
                    }`}
                  />
                </div>
              </div>
              <p className="stat-value mb-1">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsPanel;
