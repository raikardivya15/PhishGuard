import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  ShieldX, 
  Globe, 
  Lock, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface SecurityAnalysis {
  url: string;
  overallScore: number;
  riskLevel: "safe" | "low" | "medium" | "high" | "critical";
  checks: {
    domainAge: { status: "pass" | "warning" | "fail"; message: string };
    ssl: { status: "pass" | "warning" | "fail"; message: string };
    reputation: { status: "pass" | "warning" | "fail"; message: string };
    phishingIndicators: { status: "pass" | "warning" | "fail"; message: string };
  };
  scanTime: string;
}

interface SecurityResultsProps {
  analysis: SecurityAnalysis;
  onScanNew?: () => void;
}

export const SecurityResults = ({ analysis, onScanNew }: SecurityResultsProps) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "safe": return "text-success bg-success/10 border-success/20";
      case "low": return "text-success bg-success/10 border-success/20";
      case "medium": return "text-warning bg-warning/10 border-warning/20";
      case "high": return "text-destructive bg-destructive/10 border-destructive/20";
      case "critical": return "text-destructive bg-destructive/10 border-destructive/20";
      default: return "text-muted-foreground bg-muted border-border";
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "safe": return <ShieldCheck className="h-5 w-5" />;
      case "low": return <Shield className="h-5 w-5" />;
      case "medium": return <ShieldAlert className="h-5 w-5" />;
      case "high": return <ShieldX className="h-5 w-5" />;
      case "critical": return <ShieldX className="h-5 w-5" />;
      default: return <Shield className="h-5 w-5" />;
    }
  };

  const getCheckIcon = (status: string) => {
    switch (status) {
      case "pass": return <CheckCircle className="h-4 w-4 text-success" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "fail": return <XCircle className="h-4 w-4 text-destructive" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Overall Results Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getRiskIcon(analysis.riskLevel)}
              <div>
                <CardTitle className="text-xl">Security Analysis Complete</CardTitle>
                <CardDescription className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span className="font-mono text-sm">{analysis.url}</span>
                </CardDescription>
              </div>
            </div>
            <Badge 
              variant="outline" 
              className={cn("px-3 py-1 font-medium", getRiskColor(analysis.riskLevel))}
            >
              {analysis.riskLevel.toUpperCase()} RISK
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Security Score</span>
              <span className="text-2xl font-bold">{analysis.overallScore}/100</span>
            </div>
            <Progress 
              value={analysis.overallScore} 
              className="h-3"
            />
          </div>
          <div className="text-xs text-muted-foreground flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Scanned on {analysis.scanTime}
            </div>
            {onScanNew && (
              <Button variant="outline" size="sm" onClick={onScanNew}>
                <RefreshCw className="h-3 w-3 mr-1" />
                Scan New URL
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Checks */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Lock className="h-5 w-5 mr-2" />
              SSL Certificate
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-sm">{analysis.checks.ssl.message}</span>
            {getCheckIcon(analysis.checks.ssl.status)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Domain Reputation
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-sm">{analysis.checks.reputation.message}</span>
            {getCheckIcon(analysis.checks.reputation.status)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Domain Age
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-sm">{analysis.checks.domainAge.message}</span>
            {getCheckIcon(analysis.checks.domainAge.status)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Phishing Indicators
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-sm">{analysis.checks.phishingIndicators.message}</span>
            {getCheckIcon(analysis.checks.phishingIndicators.status)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};