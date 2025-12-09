import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Download, RefreshCw, Search } from "lucide-react";

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  source: string;
  intent: string;
  qualityScore: number;
  isQualified: boolean;
  createdAt?: string;
}

interface HuntStats {
  totalLeads: number;
  totalQualifiedLeads: number;
  qualificationRate: number;
  sourceBreakdown: Record<string, number>;
  intentBreakdown: Record<string, number>;
  averageQualityScore: number;
  lastHuntDate?: string;
}

export default function LeadHunterPage() {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);

  // Hunt for leads
  const huntMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/ai/hunt-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (!response.ok) throw new Error("Failed to hunt leads");
      return response.json();
    },
    onSuccess: (data) => {
      setLeads(data.leads || []);
      toast({
        title: "Success",
        description: `Found ${data.leadCount} leads`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to hunt for leads",
        variant: "destructive",
      });
    },
  });

  // Get hunt statistics
  const { data: stats, isLoading: statsLoading } = useQuery<HuntStats>({
    queryKey: ["/api/ai/hunt-leads/stats"],
    queryFn: async () => {
      const response = await fetch("/api/ai/hunt-leads/stats");
      if (!response.ok) throw new Error("Failed to fetch stats");
      return response.json();
    },
  });

  // Export leads
  const exportMutation = useMutation({
    mutationFn: async (format: "json" | "csv") => {
      const response = await fetch("/api/ai/hunt-leads/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ format, onlyQualified: true }),
      });
      if (!response.ok) throw new Error("Failed to export leads");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `leads.${format === "csv" ? "csv" : "json"}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Leads exported successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to export leads",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Lead Hunter</h1>
          <p className="text-muted-foreground">
            Automatically hunt and qualify leads from multiple sources
          </p>
        </div>
        <Button
          onClick={() => huntMutation.mutate()}
          disabled={huntMutation.isPending}
          size="lg"
        >
          {huntMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Hunting...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Start Hunt
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="leads" className="w-full">
        <TabsList>
          <TabsTrigger value="leads">Leads ({leads.length})</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => exportMutation.mutate("json")}
              disabled={exportMutation.isPending || leads.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Export JSON
            </Button>
            <Button
              variant="outline"
              onClick={() => exportMutation.mutate("csv")}
              disabled={exportMutation.isPending || leads.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>

          {leads.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground">
                  Click "Start Hunt" to find leads
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {leads.map((lead) => (
                <Card key={lead.id} className="hover:bg-muted/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {lead.firstName} {lead.lastName}
                        </h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          {lead.email && <p>Email: {lead.email}</p>}
                          {lead.phone && <p>Phone: {lead.phone}</p>}
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="flex gap-2 justify-end">
                          <Badge variant={lead.isQualified ? "default" : "secondary"}>
                            {lead.isQualified ? "Qualified" : "Unqualified"}
                          </Badge>
                          <Badge variant="outline">{lead.source}</Badge>
                          <Badge variant="outline">{lead.intent}</Badge>
                        </div>
                        <div className="text-sm font-semibold">
                          Score: {(lead.qualityScore * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          {statsLoading ? (
            <Card className="text-center py-12">
              <CardContent>
                <Loader2 className="mx-auto h-8 w-8 animate-spin" />
              </CardContent>
            </Card>
          ) : stats ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Total Leads</CardTitle>
                  <CardDescription>All leads hunted</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.totalLeads}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Qualified Leads</CardTitle>
                  <CardDescription>High-quality prospects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.totalQualifiedLeads}</div>
                  <p className="text-sm text-muted-foreground">
                    {(stats.qualificationRate * 100).toFixed(1)}% qualification rate
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Average Quality Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {(stats.averageQualityScore * 100).toFixed(0)}%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Last Hunt</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    {stats.lastHuntDate
                      ? new Date(stats.lastHuntDate).toLocaleString()
                      : "Never"}
                  </p>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Leads by Source</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(stats.sourceBreakdown || {}).map(([source, count]) => (
                      <div key={source} className="flex justify-between items-center">
                        <span className="capitalize">{source}</span>
                        <Badge variant="outline">{count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Leads by Intent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(stats.intentBreakdown || {}).map(([intent, count]) => (
                      <div key={intent} className="flex justify-between items-center">
                        <span className="capitalize">{intent}</span>
                        <Badge variant="outline">{count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground">No statistics available</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
