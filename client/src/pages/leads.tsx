import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LeadCard } from "@/components/lead-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Filter, Users } from "lucide-react";
import { Link } from "wouter";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Lead } from "@shared/schema";

const statusOptions = [
  { value: "all", label: "All Leads" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "viewing", label: "Viewing" },
  { value: "offer", label: "Offer" },
  { value: "closed", label: "Closed" },
  { value: "lost", label: "Lost" },
];

const pipelineStages = [
  { id: "new", label: "New", color: "bg-blue-500" },
  { id: "contacted", label: "Contacted", color: "bg-yellow-500" },
  { id: "qualified", label: "Qualified", color: "bg-purple-500" },
  { id: "viewing", label: "Viewing", color: "bg-cyan-500" },
  { id: "offer", label: "Offer", color: "bg-orange-500" },
  { id: "closed", label: "Closed", color: "bg-green-500" },
];

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "pipeline">("list");
  const { toast } = useToast();

  const { data: leads, isLoading } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
  });

  const updateLeadMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return apiRequest("PATCH", `/api/leads/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      toast({
        title: "Lead updated",
        description: "Lead status has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update lead status.",
        variant: "destructive",
      });
    },
  });

  const filteredLeads = leads?.filter((lead) => {
    const matchesSearch =
      searchQuery === "" ||
      `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getLeadsByStatus = (status: string) => {
    return filteredLeads?.filter((lead) => lead.status === status) || [];
  };

  const handleStatusChange = (leadId: string, status: string) => {
    updateLeadMutation.mutate({ id: leadId, status });
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold md:text-3xl" data-testid="text-leads-title">
            Leads
          </h1>
          <p className="text-muted-foreground">
            Manage and track your leads through the sales pipeline.
          </p>
        </div>
        <Link href="/leads/new">
          <Button className="gap-2" data-testid="button-new-lead">
            <Plus className="h-4 w-4" />
            New Lead
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-3 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-leads"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40" data-testid="select-status-filter">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "list" | "pipeline")}>
          <TabsList>
            <TabsTrigger value="list" data-testid="tab-list-view">List</TabsTrigger>
            <TabsTrigger value="pipeline" data-testid="tab-pipeline-view">Pipeline</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {viewMode === "list" ? (
        <div className="space-y-3">
          {isLoading ? (
            <>
              {[...Array(5)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-3 w-48" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : filteredLeads && filteredLeads.length > 0 ? (
            filteredLeads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Users className="h-16 w-16 text-muted-foreground/40 mb-4" />
                <h3 className="font-semibold text-lg mb-1">No leads found</h3>
                <p className="text-muted-foreground text-center max-w-sm">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your search or filters."
                    : "Add your first lead to start building your pipeline."}
                </p>
                {!searchQuery && statusFilter === "all" && (
                  <Link href="/leads/new">
                    <Button className="mt-6 gap-2" data-testid="button-add-first-lead">
                      <Plus className="h-4 w-4" />
                      Add Lead
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {pipelineStages.map((stage) => {
            const stageLeads = getLeadsByStatus(stage.id);
            return (
              <div key={stage.id} className="flex-shrink-0 w-72">
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${stage.color}`} />
                        <CardTitle className="text-sm font-medium">
                          {stage.label}
                        </CardTitle>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {stageLeads.length}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                    {isLoading ? (
                      <>
                        {[...Array(2)].map((_, i) => (
                          <div key={i} className="p-3 rounded-lg border space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-32" />
                          </div>
                        ))}
                      </>
                    ) : stageLeads.length > 0 ? (
                      stageLeads.map((lead) => (
                        <div
                          key={lead.id}
                          className="p-3 rounded-lg border bg-card hover-elevate cursor-pointer"
                          data-testid={`pipeline-lead-${lead.id}`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="font-medium text-sm truncate">
                                {lead.firstName} {lead.lastName}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {lead.email}
                              </p>
                            </div>
                          </div>
                          {lead.preferredLocation && (
                            <p className="text-xs text-muted-foreground mt-2 truncate">
                              {lead.preferredLocation}
                            </p>
                          )}
                          {lead.budget && (
                            <Badge variant="outline" className="text-xs mt-2">
                              ${Number(lead.budget).toLocaleString()}
                            </Badge>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <p className="text-xs text-muted-foreground">
                          No leads in this stage
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
