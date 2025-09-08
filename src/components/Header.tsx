import { Shield } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            PhishGuard
          </span>
        </div>
        
        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
};