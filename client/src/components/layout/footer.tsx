import { Shield, Heart } from "lucide-react";
import bankBrosLogo from "@assets/ChatGPT_Image_Aug_11_2025_11_49_29_AM-1-3_1757068578890.jpg";

export function Footer() {
  return (
    <footer className="py-12 bg-card/50 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src={bankBrosLogo} alt="BankBros" className="w-8 h-8 rounded-lg object-cover" />
            <span className="text-lg font-bold text-gradient">BankBros</span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-6">
            Gambling can be addictive. Please play responsibly.
          </p>
          
          <div className="flex justify-center items-center space-x-6 mb-6">
            <a
              href="https://www.begambleaware.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-secondary transition-colors flex items-center"
              data-testid="link-responsible-gaming"
            >
              <Heart className="mr-2" size={16} />
              BeGambleAware.org
            </a>
          </div>
          
          <p className="text-xs text-muted-foreground" data-testid="text-copyright">
            © 2025 BankBros. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
