import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Download, Database } from "lucide-react";

interface EnrichedLead {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  location?: string;
  enrichmentScore: number;
  completeness: number;
  dataQuality: string;
  sources: string[];
  lastEnriched?: string;
}

interface EnrichmentStats {
  totalLeads: number;
  enrichedLeads: number;
  averageCompleteness: number;
  averageQuality: number;
  dataSourceCount: number;
  qualityDistribution: Record<string, number>;
  lastEnrichmentDate?: string;
}

export default function LeadEnrichmentPage() {
  const { toast } = useToast();
  const [enrichedLeads, setEnrichedLeads] = useState<EnrichedLead[]>([]);
  const [fileInput, setFileInput] = useState<File | null>(null);

  // Enrich leads
  const enrichMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      if (fileInput) {
        formData.append("file", fileInput);
      }
      
      const response = await fetch("/api/ai/enrich-leads", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to enrich leads");
      return response.json();
    },
    onSuccess: (data) => {
      setEnrichedLeads(data.enrichedLeads || []);
      toast({
        title: "Success",
        description: `Enriched ${data.enrichedCount} leads`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to enrich leads",
        variant: "destructive",
      });
    },
  });

  // Get enrichment statistics
  const { data: stats, isLoading: statsLoading } = useQuery<EnrichmentStats>({
    queryKey: ["/api/ai/enrich-leads/stats"],
    queryFn: async () => {
      const response = await fetch("/api/ai/enrich-leads/stats");
      if (!response.ok) throw new Error("Failed to fetch stats");
      return response.json();
    },
  });

  // Batch enrich
  const batchEnrichMutation = useMutation({
    mutationFn: async (format: "csv" | "json") => {
      const response = await fetch("/api/ai/enrich-leads/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ format, minQuality: "medium" }),
      });
      if (!response.ok) throw new Error("Failed to batch enrich");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `enriched-leads.${format === "csv" ? "csv" : "json"}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Leads enriched and exported",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to enrich leads",
        variant: "destructive",
      });
    },
  });

  // Verify data quality
  const verifyMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/ai/enrich-leads/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadIds: enrichedLeads.map((l) => l.id) }),
      });
      if (!response.ok) throw new Error("Failed to verify data");
      return response.json();
    },
    onSuccess: (data) => {
      setEnrichedLeads(data.leads || []);
      toast({
        title: "Success",
        description: `Verified ${data.verifiedCount} leads`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to verify leads",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Lead Enrichment</h1>
          <p className="text-muted-foreground">
            Enrich leads with comprehensive data from multiple sources
          </p>
        </div>
      </div>

      <Tabs defaultValue="enrich" className="w-full">
        <TabsList>
          <TabsTrigger value="enrich">Enrich Leads</TabsTrigger>
          <TabsTrigger value="leads">Enriched Leads ({enrichedLeads.length})</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="enrich" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Leads to Enrich</CardTitle>
              <CardDescription>
                Upload a CSV or JSON file containing leads to enrich
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept=".csv,.json"
                  onChange={(e) => setFileInput(e.target.files?.[0] || null)}
                  className="hidden"
                  id="file-input"
                />
                <label htmlFor="file-input" className="cursor-pointer block">
                  <Upload className="mx-auto h-8 w-8 mb-2 text-muted-foreground" />
                  <p className="font-semibold">Click to upload</p>
                  <p className="text-sm text-muted-foreground">
                    CSV or JSON (max 10MB)
                  </p>
                  {fileInput && (
                    <p className="text-sm text-green-600 mt-2">
                      Selected: {fileInput.name}
                    </p>
                  )}
                </label>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => enrichMutation.mutate()}
                  disabled={enrichMutation.isPending || !fileInput}
                  size="lg"
                  className="flex-1"
                >
                  {enrichMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enriching...
                    </>
                  ) : (
                    <>
                      <Database className="mr-2 h-4 w-4" />
                      Start Enrichment
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Batch Enrichment</CardTitle>
              <CardDescription>
                Enrich all leads in the system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => batchEnrichMutation.mutate("csv")}
                  disabled={batchEnrichMutation.isPending}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Batch Enrich (CSV)
                </Button>
                <Button
                  variant="outline"
                  onClick={() => batchEnrichMutation.mutate("json")}
                  disabled={batchEnrichMutation.isPending}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Batch Enrich (JSON)
                </Button>
                <Button
                  variant="outline"
                  onClick={() => verifyMutation.mutate()}
                  disabled={verifyMutation.isPending || enrichedLeads.length === 0}
                >
                  Verify Data Quality
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          {enrichedLeads.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground">
                  No enriched leads yet. Upload a file to get started.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {enrichedLeads.map((lead) => (
                <Card key={lead.id} className="hover:bg-muted/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h3 className="font-semibold">
                          {lead.firstName} {lead.lastName}
                        </h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          {lead.company && <p>Company: {lead.company}</p>}
                          {lead.jobTitle && <p>Title: {lead.jobTitle}</p>}
                          {lead.location && <p>Location: {lead.location}</p>}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Contact</p>
                        <div className="space-y-1 text-sm">
                          {lead.email && <p>{lead.email}</p>}
                          {lead.phone && <p>{lead.phone}</p>}
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="flex gap-2 justify-end flex-wrap">
                          <Badge variant="outline">{lead.dataQuality}</Badge>
                          {lead.sources.map((source) => (
                            <Badge key={source} variant="secondary" className="text-xs">
                              {source}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-sm">
                          <p className="font-semibold">
                            {(lead.enrichmentScore * 100).toFixed(0)}% Enrichment
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(lead.completeness * 100).toFixed(0)}% Complete
                          </p>
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
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.totalLeads}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Enriched Leads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.enrichedLeads}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Average Completeness</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {(stats.averageCompleteness * 100).toFixed(0)}%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Quality Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {(stats.averageQuality * 100).toFixed(0)}%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.dataSourceCount}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Last Enrichment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    {stats.lastEnrichmentDate
                      ? new Date(stats.lastEnrichmentDate).toLocaleString()
                      : "Never"}
                  </p>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Quality Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(stats.qualityDistribution || {}).map(([quality, count]) => (
                      <div key={quality} className="flex justify-between items-center">
                        <span className="capitalize">{quality}</span>
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
