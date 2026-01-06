import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsPanel from "@/components/StatsPanel";
import Dashboard from "@/components/Dashboard";
import DepositPanel from "@/components/DepositPanel";
import AgentPanel from "@/components/AgentPanel";
import WithdrawPanel from "@/components/WithdrawPanel";
import Footer from "@/components/Footer";
import { useContractEvents } from "@/hooks/useContract";

const Index = () => {
  useContractEvents();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <StatsPanel />
      <Dashboard />
      <DepositPanel />
      <AgentPanel />
      <WithdrawPanel />
      <Footer />
    </div>
  );
};

export default Index;
