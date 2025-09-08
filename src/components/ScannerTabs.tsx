import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UrlScanner } from "./UrlScanner";
import { EmailScanner } from "./EmailScanner";
import { Link, Mail } from "lucide-react";

interface ScannerTabsProps {
  onScan: (url: string) => void;
  isScanning: boolean;
  onReset?: () => void;
}

export const ScannerTabs = ({ onScan, isScanning, onReset }: ScannerTabsProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="url" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger value="url" className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            URL Scanner
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Scanner
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="url" className="mt-6">
          <UrlScanner onScan={onScan} isScanning={isScanning} onReset={onReset} />
        </TabsContent>
        
        <TabsContent value="email" className="mt-6">
          <EmailScanner />
        </TabsContent>
      </Tabs>
    </div>
  );
};