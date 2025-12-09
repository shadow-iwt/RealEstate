import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Zap, TrendingUp, AlertCircle } from "lucide-react";

interface ScoredLead {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  conversionProbability: number;
  timeToConversionDays?: number;
  riskFactors: string[];
  recommendedActions: string[];
  confidence: number;
  lastScored?: string;
}

interface PredictionStats {
  totalLeads: number;
  highProbability: number;
  mediumProbability: number;
  lowProbability: number;
  averageConversionProb: number;
  averageConfidence: number;
  topRiskFactors: { factor: string; frequency: number }[];
  topActions: { action: string; frequency: number }[];
  lastPredictionDate?: string;
}

const getProbabilityColor = (prob: number) => {
  if (prob >= 0.7) return "bg-green-500";
  if (prob >= 0.4) return "bg-yellow-500";
  return "bg-red-500";
};

const getProbabilityBadge = (prob: number) => {
  if (prob >= 0.7) return "default";
  if (prob >= 0.4) return "secondary";
  return "destructive";
};

export default function PredictiveLeadScoringPage() {
  const { toast } = useToast();
  const [scoredLeads, setScoredLeads] = useState<ScoredLead[]>([]);
  const [sortBy, setSortBy] = useState<"probability" | "confidence">("probability");

  // Score leads
  const scoreMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/ai/score-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ batchSize: 100 }),
      });
      if (!response.ok) throw new Error("Failed to score leads");
      return response.json();
    },
    onSuccess: (data) => {
      const sorted = (data.scoredLeads || []).sort((a: ScoredLead, b: ScoredLead) =>
        sortBy === "probability"
          ? b.conversionProbability - a.conversionProbability
          : b.confidence - a.confidence
      );
      setScoredLeads(sorted);
      toast({
        title: "Success",
        description: `Scored ${data.scoredCount} leads`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to score leads",
        variant: "destructive",
      });
    },
  });

  // Get prediction statistics
  const { data: stats, isLoading: statsLoading } = useQuery<PredictionStats>({
    queryKey: ["/api/ai/score-leads/stats"],
    queryFn: async () => {
      const response = await fetch("/api/ai/score-leads/stats");
      if (!response.ok) throw new Error("Failed to fetch stats");
      return response.json();
    },
  });

  // Retrain model
  const retrainMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/ai/score-leads/retrain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (!response.ok) throw new Error("Failed to retrain model");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Model retrained successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to retrain model",
        variant: "destructive",
      });
    },
  });

  const sortedLeads = [...scoredLeads].sort((a, b) =>
    sortBy === "probability"
      ? b.conversionProbability - a.conversionProbability
      : b.confidence - a.confidence
  );

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Predictive Lead Scoring</h1>
          <p className="text-muted-foreground">
            AI-powered lead scoring and conversion probability prediction
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => retrainMutation.mutate()}
            disabled={retrainMutation.isPending}
            variant="outline"
          >
            {retrainMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Retraining...
              </>
            ) : (
              <>
                <TrendingUp className="mr-2 h-4 w-4" />
                Retrain Model
              </>
            )}
          </Button>
          <Button
            onClick={() => scoreMutation.mutate()}
            disabled={scoreMutation.isPending}
            size="lg"
          >
            {scoreMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scoring...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Score Leads
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="leads" className="w-full">
        <TabsList>
          <TabsTrigger value="leads">Scored Leads ({scoredLeads.length})</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="space-y-4">
          <div className="flex gap-2 items-center">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Button
              variant={sortBy === "probability" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("probability")}
            >
              Probability
            </Button>
            <Button
              variant={sortBy === "confidence" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("confidence")}
            >
              Confidence
            </Button>
          </div>

          {scoredLeads.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground">
                  Click "Score Leads" to get predictions
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {sortedLeads.map((lead) => (
                <Card key={lead.id} className="hover:bg-muted/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">
                            {lead.firstName} {lead.lastName}
                          </h3>
                          {lead.email && (
                            <p className="text-sm text-muted-foreground">{lead.email}</p>
                          )}
                        </div>
                        <Badge variant={getProbabilityBadge(lead.conversionProbability)}>
                          {(lead.conversionProbability * 100).toFixed(0)}% Conversion
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Conversion Probability</span>
                          <span className="font-semibold">
                            {(lead.conversionProbability * 100).toFixed(1)}%
                          </span>
                        </div>
                        <Progress
                          value={lead.conversionProbability * 100}
                          className="h-2"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Model Confidence</span>
                          <span className="font-semibold">
                            {(lead.confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                        <Progress value={lead.confidence * 100} className="h-2" />
                      </div>

                      {lead.timeToConversionDays && (
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            Estimated time to conversion: {lead.timeToConversionDays} days
                          </span>
                        </div>
                      )}

                      {lead.riskFactors.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-semibold flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            Risk Factors
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {lead.riskFactors.map((factor, idx) => (
                              <Badge key={idx} variant="destructive" className="text-xs">
                                {factor}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {lead.recommendedActions.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-semibold">Recommended Actions</p>
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            {lead.recommendedActions.map((action, idx) => (
                              <li key={idx}>{action}</li>
                            ))}
                          </ul>
                        </div>
                      )}
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
                  <CardTitle>Total Leads Scored</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.totalLeads}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Average Conversion Probability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {(stats.averageConversionProb * 100).toFixed(0)}%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>High Probability Leads</CardTitle>
                  <CardDescription>70%+ conversion chance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.highProbability}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Medium Probability Leads</CardTitle>
                  <CardDescription>40-70% conversion chance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.mediumProbability}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Low Probability Leads</CardTitle>
                  <CardDescription>Below 40% conversion chance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.lowProbability}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Model Confidence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {(stats.averageConfidence * 100).toFixed(0)}%
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Last Prediction</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    {stats.lastPredictionDate
                      ? new Date(stats.lastPredictionDate).toLocaleString()
                      : "Never"}
                  </p>
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

        <TabsContent value="insights" className="space-y-4">
          {statsLoading ? (
            <Card className="text-center py-12">
              <CardContent>
                <Loader2 className="mx-auto h-8 w-8 animate-spin" />
              </CardContent>
            </Card>
          ) : stats ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Top Risk Factors</CardTitle>
                  <CardDescription>Most common conversion blockers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stats.topRiskFactors.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-sm">{item.factor}</span>
                        <Badge variant="outline">{item.frequency}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommended Actions</CardTitle>
                  <CardDescription>Most impactful next steps</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stats.topActions.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-sm">{item.action}</span>
                        <Badge variant="outline">{item.frequency}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground">No insights available</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
