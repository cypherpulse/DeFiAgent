import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsPanel from "@/components/StatsPanel";
import Dashboard from "@/components/Dashboard";
import DepositPanel from "@/components/DepositPanel";
import AgentPanel from "@/components/AgentPanel";
import WithdrawPanel from "@/components/WithdrawPanel";
import Footer from "@/components/Footer";
import { Section, CardGrid } from "@/components/ui/layout";
import { useContractEvents } from "@/hooks/useContract";

const Index = () => {
  useContractEvents();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Stats Overview */}
      <Section className="bg-muted/30">
        <StatsPanel />
      </Section>

      {/* Main Dashboard Area */}
      <Section>
        <CardGrid
          title="Your DeFiAgent Dashboard"
          subtitle="Monitor your deposits, yields, and manage AI agents"
          cols={{ default: '1', lg: '1' }}
        >
          <Dashboard />
        </CardGrid>
      </Section>

      {/* Action Panels */}
      <Section className="bg-muted/20">
        <CardGrid
          title="Vault Actions"
          subtitle="Deposit funds, manage agents, and withdraw earnings"
          cols={{ default: '1', md: '2', xl: '3' }}
        >
          <DepositPanel />
          <AgentPanel />
          <WithdrawPanel />
        </CardGrid>
      </Section>

      <Footer />
    </div>
  );
};

export default Index;
