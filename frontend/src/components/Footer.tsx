import { Github, Twitter, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">D</span>
            </div>
            <span className="font-semibold text-foreground">DeFiAgent</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://sepolia.basescan.org/address/0x409E9222f69B11F84bC9e54794061315E27f5F64"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Contract
            </a>
            <a
              href="https://base.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Base
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            Base Sepolia Testnet • 0.75% Performance Fee
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
