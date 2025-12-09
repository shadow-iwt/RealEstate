import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Building2,
  DollarSign,
  TrendingUp,
  UserCheck,
  Clock,
  Target,
  BarChart3,
} from "lucide-react";
import { useState } from "react";
import type { Lead, Property, Agent } from "@/lib/types";

interface AnalyticsData {
  totalLeads: number;
  leadsThisMonth: number;
  leadConversionRate: number;
  totalProperties: number;
  activeListings: number;
  soldThisMonth: number;
  totalRevenue: number;
  revenueThisMonth: number;
  avgDealSize: number;
  avgDaysToClose: number;
  topAgents: Agent[];
  leadsBySource: { source: string; count: number }[];
  leadsByStatus: { status: string; count: number }[];
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d");

  const { data: analytics, isLoading } = useQuery<AnalyticsData>({
    queryKey: ["/api/analytics", timeRange],
  });

  const { data: leads } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
  });

  const { data: agents } = useQuery<Agent[]>({
    queryKey: ["/api/agents"],
  });

  const leadsBySource = leads?.reduce((acc, lead) => {
    const source = lead.source || "Unknown";
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  const leadsByStatus = leads?.reduce((acc, lead) => {
    const status = lead.status || "new";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  const totalLeads = leads?.length || 0;

  const statusColors: Record<string, string> = {
    new: "bg-blue-500",
    contacted: "bg-yellow-500",
    qualified: "bg-purple-500",
    viewing: "bg-cyan-500",
    offer: "bg-orange-500",
    closed: "bg-green-500",
    lost: "bg-red-500",
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold md:text-3xl" data-testid="text-analytics-title">
            Analytics
          </h1>
          <p className="text-muted-foreground">
            Track performance metrics and business insights.
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-36" data-testid="select-time-range">
            <SelectValue placeholder="Time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-8 w-16" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <>
            <StatCard
              title="Total Leads"
              value={totalLeads}
              change={18}
              changeLabel="vs last period"
              icon={Users}
              iconColor="text-blue-600 dark:text-blue-500"
              testId="stat-total-leads"
            />
            <StatCard
              title="Conversion Rate"
              value={`${((leadsByStatus["closed"] || 0) / Math.max(totalLeads, 1) * 100).toFixed(1)}%`}
              change={5}
              changeLabel="vs last period"
              icon={Target}
              iconColor="text-green-600 dark:text-green-500"
              testId="stat-conversion"
            />
            <StatCard
              title="Active Agents"
              value={agents?.filter(a => a.isActive).length || 0}
              icon={UserCheck}
              iconColor="text-purple-600 dark:text-purple-500"
              testId="stat-active-agents"
            />
            <StatCard
              title="Avg. Response Time"
              value="2.4h"
              change={-12}
              changeLabel="vs last period"
              icon={Clock}
              iconColor="text-orange-600 dark:text-orange-500"
              testId="stat-response-time"
            />
          </>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Lead Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(leadsByStatus).map(([status, count]) => {
              const percentage = totalLeads > 0 ? (count / totalLeads) * 100 : 0;
              return (
                <div key={status}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${statusColors[status] || "bg-gray-500"}`} />
                      <span className="text-sm font-medium capitalize">{status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm tabular-nums">{count}</span>
                      <Badge variant="secondary" className="text-xs">
                        {percentage.toFixed(0)}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
            {Object.keys(leadsByStatus).length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Users className="h-10 w-10 text-muted-foreground/40 mb-3" />
                <p className="text-sm text-muted-foreground">No lead data available</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Lead Sources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(leadsBySource)
              .sort(([, a], [, b]) => b - a)
              .map(([source, count]) => {
                const percentage = totalLeads > 0 ? (count / totalLeads) * 100 : 0;
                return (
                  <div key={source}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium capitalize">{source}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm tabular-nums">{count}</span>
                        <Badge variant="secondary" className="text-xs">
                          {percentage.toFixed(0)}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            {Object.keys(leadsBySource).length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <TrendingUp className="h-10 w-10 text-muted-foreground/40 mb-3" />
                <p className="text-sm text-muted-foreground">No source data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Top Performing Agents
          </CardTitle>
        </CardHeader>
        <CardContent>
          {agents && agents.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {agents
                .sort((a, b) => (b.totalDeals || 0) - (a.totalDeals || 0))
                .slice(0, 6)
                .map((agent, index) => {
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
                    <div
                      key={agent.id}
                      className="flex items-center gap-4 p-4 rounded-lg border"
                      data-testid={`top-agent-${agent.id}`}
                    >
                      <div className="relative">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                          {initials}
                        </div>
                        {index < 3 && (
                          <div className={`absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 ? "bg-yellow-500 text-yellow-950" :
                            index === 1 ? "bg-gray-300 text-gray-800" :
                            "bg-orange-400 text-orange-950"
                          }`}>
                            {index + 1}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{agent.fullName}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{agent.totalDeals || 0} deals</span>
                          <span>{formattedRevenue}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <UserCheck className="h-12 w-12 text-muted-foreground/40 mb-4" />
              <p className="text-muted-foreground">No agent data available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
