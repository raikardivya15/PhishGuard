import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Search, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface UrlScannerProps {
  onScan: (url: string) => void;
  isScanning: boolean;
  onReset?: () => void;
}

export const UrlScanner = ({ onScan, isScanning, onReset }: UrlScannerProps) => {
  const [url, setUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);

  useEffect(() => {
    if (onReset) {
      const resetHandler = () => {
        setUrl("");
        setIsValidUrl(true);
      };
      // Call reset when onReset function reference changes
      resetHandler();
    }
  }, [onReset]);

  const validateUrl = (inputUrl: string) => {
    try {
      new URL(inputUrl);
      return true;
    } catch {
      return inputUrl === "" || /^https?:\/\//.test(inputUrl);
    }
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
    setIsValidUrl(validateUrl(value));
  };

  const handleScan = () => {
    if (url && isValidUrl) {
      onScan(url);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && url && isValidUrl && !isScanning) {
      handleScan();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
          <Shield className="h-6 w-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold">URL Security Scanner</CardTitle>
        <CardDescription>
          Enter a URL to analyze for potential phishing threats and security risks
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="relative">
            <Input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              onKeyPress={handleKeyPress}
              className={cn(
                "pl-4 pr-4 py-3 text-lg",
                !isValidUrl && "border-destructive focus-visible:ring-destructive"
              )}
              disabled={isScanning}
            />
            {!isValidUrl && (
              <div className="flex items-center mt-2 text-sm text-destructive">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Please enter a valid URL
              </div>
            )}
          </div>
          <Button
            onClick={handleScan}
            disabled={!url || !isValidUrl || isScanning}
            className="w-full py-3 text-lg font-medium"
            size="lg"
          >
            {isScanning ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                Scanning...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Analyze URL
              </>
            )}
          </Button>
        </div>
        <div className="text-xs text-muted-foreground text-center">
          We analyze URLs for phishing attempts, malware, and other security threats
        </div>
      </CardContent>
    </Card>
  );
};