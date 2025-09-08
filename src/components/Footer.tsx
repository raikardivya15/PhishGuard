import { Shield } from "lucide-react";

export const Footer = () => {

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container py-12">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Logo and Description */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              PhishGuard
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Advanced phishing detection using machine learning to protect against cyber threats in real-time.
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 PhishGuard. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Powered by advanced ML algorithms
          </p>
        </div>
      </div>
    </footer>
  );
};