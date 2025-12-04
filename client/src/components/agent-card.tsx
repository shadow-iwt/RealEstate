import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, Building2, TrendingUp } from "lucide-react";
import type { Agent } from "@shared/schema";
import { Link } from "wouter";

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const initials = agent.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const formattedRevenue = agent.totalRevenue
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(Number(agent.totalRevenue))
    : "$0";

  return (
    <Card className="hover-elevate transition-all duration-200" data-testid={`agent-card-${agent.id}`}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src={agent.avatar || undefined} alt={agent.fullName} />
            <AvatarFallback className="bg-primary/10 text-primary text-xl font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>

          <h3 className="font-semibold text-lg" data-testid={`agent-name-${agent.id}`}>
            {agent.fullName}
          </h3>
          
          {agent.specialization && (
            <Badge variant="secondary" className="mt-2">
              {agent.specialization}
            </Badge>
          )}

          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4" />
              <span className="tabular-nums">{agent.totalDeals || 0} deals</span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4" />
              <span className="tabular-nums">{formattedRevenue}</span>
            </div>
          </div>

          {agent.bio && (
            <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
              {agent.bio}
            </p>
          )}

          <div className="flex items-center gap-2 mt-6 w-full">
            <Button variant="outline" size="sm" className="flex-1 gap-2" data-testid={`agent-call-${agent.id}`}>
              <Phone className="h-4 w-4" />
              Call
            </Button>
            <Button variant="outline" size="sm" className="flex-1 gap-2" data-testid={`agent-email-${agent.id}`}>
              <Mail className="h-4 w-4" />
              Email
            </Button>
          </div>

          <Link href={`/agents/${agent.id}`} className="w-full mt-2">
            <Button variant="default" className="w-full" data-testid={`agent-view-${agent.id}`}>
              View Profile
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
