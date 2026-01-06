import { ConnectButton, NetworkStatus } from './Hero';
import { Bot } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold gradient-text">DeFiAgent</span>
          </div>

          {/* Network Status - Desktop */}
          <div className="hidden md:block">
            <NetworkStatus />
          </div>

          {/* Connect Button */}
          <ConnectButton />
        </div>

        {/* Network Status - Mobile */}
        <div className="md:hidden pb-4">
          <NetworkStatus />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;