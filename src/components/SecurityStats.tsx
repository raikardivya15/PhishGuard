import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Zap, Globe, Activity, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export const SecurityStats = () => {
  const [scansToday, setScansToday] = useState(2847);
  const [activeUsers, setActiveUsers] = useState(1254);
  const [threatsBlocked, setThreatsBlocked] = useState(347);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setScansToday(prev => prev + Math.floor(Math.random() * 3));
      if (Math.random() > 0.7) {
        setActiveUsers(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      }
      if (Math.random() > 0.8) {
        setThreatsBlocked(prev => prev + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: Activity,
      value: scansToday.toLocaleString(),
      label: "Scans Today",
      description: "Real-time threat analysis",
      trend: "+12% from yesterday"
    },
    {
      icon: Users,
      value: activeUsers.toLocaleString(),
      label: "Active Users",
      description: "Currently protected",
      trend: "Online now"
    },
    {
      icon: Shield,
      value: threatsBlocked.toLocaleString(),
      label: "Threats Blocked",
      description: "In the last 24 hours",
      trend: "+8% from yesterday"
    },
    {
      icon: Globe,
      value: "99.8%",
      label: "Detection Rate",
      description: "ML-powered accuracy",
      trend: "Industry leading"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <CardContent className="p-6">
            <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
            <div className="text-xs text-muted-foreground mb-2">{stat.description}</div>
            <div className="text-xs text-primary font-medium flex items-center justify-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {stat.trend}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};