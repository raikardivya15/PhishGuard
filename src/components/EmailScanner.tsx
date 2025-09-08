import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Search, AlertTriangle, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

export const EmailScanner = () => {
  const [emailContent, setEmailContent] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    if (!emailContent.trim()) return;
    
    setIsScanning(true);
    // Simulate scanning
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsScanning(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEmailContent(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
          <Mail className="h-6 w-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold">Email Security Scanner</CardTitle>
        <CardDescription>
          Analyze email content for phishing attempts, suspicious links, and malicious attachments
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <input
                type="file"
                accept=".txt,.eml,.msg"
                onChange={handleFileUpload}
                className="hidden"
                id="email-upload"
              />
              <label htmlFor="email-upload">
                <Button variant="outline" className="w-full" asChild>
                  <div className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Email File
                  </div>
                </Button>
              </label>
            </div>
            <div className="text-sm text-muted-foreground">or</div>
          </div>
          
          <Textarea
            placeholder="Paste email headers and content here..."
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            rows={8}
            className="font-mono text-sm"
          />
          
          <Button
            onClick={handleScan}
            disabled={!emailContent.trim() || isScanning}
            className="w-full py-3 text-lg font-medium"
            size="lg"
          >
            {isScanning ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                Analyzing Email...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Scan Email
              </>
            )}
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground text-center">
          We analyze email headers, content, links, and attachments for threats
        </div>
      </CardContent>
    </Card>
  );
};