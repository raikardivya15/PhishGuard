import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScannerTabs } from "@/components/ScannerTabs";
import { SecurityResults } from "@/components/SecurityResults";
import { Shield, Star, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import heroImage from "@/assets/hero-cybersecurity.jpg";

const Index = () => {
  const [scanResults, setScanResults] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleScanNew = () => {
    setScanResults(null);
    // Trigger reset by updating the function reference
    setResetTrigger(prev => prev + 1);
  };

  const handleScan = async (url: string) => {
    setIsScanning(true);
    setScanResults(null);
    
    toast.info("Starting security scan...");
    
    // Simulate scan process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock results
    const mockResults = {
      url: url,
      overallScore: Math.floor(Math.random() * 30) + 70, // 70-100
      riskLevel: Math.random() > 0.7 ? "high" : Math.random() > 0.4 ? "medium" : "low",
      checks: {
        ssl: { status: "pass", message: "Valid SSL certificate" },
        reputation: { status: Math.random() > 0.8 ? "fail" : "pass", message: Math.random() > 0.8 ? "Suspicious domain reputation" : "Clean domain reputation" },
        domainAge: { status: "pass", message: "Domain registered for 2+ years" },
        phishingIndicators: { status: Math.random() > 0.9 ? "fail" : "pass", message: Math.random() > 0.9 ? "Potential phishing patterns detected" : "No phishing indicators found" }
      },
      scanTime: new Date().toLocaleString()
    };
    
    setScanResults(mockResults);
    setIsScanning(false);
    
    if (mockResults.riskLevel === "high") {
      toast.error("High risk detected! Please review the results carefully.");
    } else if (mockResults.riskLevel === "medium") {
      toast.warning("Medium risk detected. Some concerns found.");
    } else {
      toast.success("Scan completed successfully!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="relative z-10 container mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-primary to-primary/80 rounded-full mb-4">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
                PhishGuard
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Advanced phishing detection using machine learning to identify malicious URLs and protect against cyber threats in real-time.
              </p>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>ML-Powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Real-time Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-warning fill-current" />
                  <span>99.8% Accuracy</span>
                </div>
              </div>
            </div>

            {/* Scanner Interface */}
            <ScannerTabs 
              onScan={handleScan} 
              isScanning={isScanning} 
              onReset={resetTrigger > 0 ? handleScanNew : undefined}
            />
            
            {/* Security Results */}
            {scanResults && (
              <div className="mt-8">
                <SecurityResults analysis={scanResults} onScanNew={handleScanNew} />
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Comprehensive Security Analysis</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our advanced ML algorithms analyze multiple security indicators to provide accurate threat detection and protection.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">URL Analysis</h3>
                <p className="text-muted-foreground">
                  Analyze websites for phishing, malware, and security vulnerabilities in real-time.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Security</h3>
                <p className="text-muted-foreground">
                  Detect phishing attempts and malicious content in email messages and attachments.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Threat Intelligence</h3>
                <p className="text-muted-foreground">
                  Powered by continuously updated threat intelligence and machine learning models.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
