import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AgentCard } from "@/components/agent-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, UserCheck, LayoutGrid, List, Building2, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import type { Agent } from "@shared/schema";

const specializationOptions = [
  { value: "all", label: "All Specializations" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "luxury", label: "Luxury" },
  { value: "rentals", label: "Rentals" },
];

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const { data: agents, isLoading } = useQuery<Agent[]>({
    queryKey: ["/api/agents"],
  });

  const filteredAgents = agents?.filter((agent) => {
    const matchesSearch =
      searchQuery === "" ||
      agent.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialization =
      specializationFilter === "all" ||
      agent.specialization?.toLowerCase() === specializationFilter;

    return matchesSearch && matchesSpecialization;
  });

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold md:text-3xl" data-testid="text-agents-title">
            Agents
          </h1>
          <p className="text-muted-foreground">
            Manage your team and track agent performance.
          </p>
        </div>
        <Button className="gap-2" data-testid="button-new-agent">
          <Plus className="h-4 w-4" />
          Add Agent
        </Button>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-agents"
            />
          </div>
          <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
            <SelectTrigger className="w-44" data-testid="select-specialization">
              <SelectValue placeholder="Specialization" />
            </SelectTrigger>
            <SelectContent>
              {specializationOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex rounded-lg border p-1">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode("grid")}
            data-testid="button-grid-view"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "table" ? "secondary" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode("table")}
            data-testid="button-table-view"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        viewMode === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6 flex flex-col items-center">
                  <Skeleton className="h-20 w-20 rounded-full mb-4" />
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Deals</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-10 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-12" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )
      ) : filteredAgents && filteredAgents.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        ) : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Deals</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.map((agent) => {
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
                    <TableRow key={agent.id} data-testid={`agent-row-${agent.id}`}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={agent.avatar || undefined} />
                            <AvatarFallback className="bg-primary/10 text-primary text-sm">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{agent.fullName}</p>
                            <p className="text-sm text-muted-foreground">{agent.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {agent.specialization && (
                          <Badge variant="secondary">{agent.specialization}</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span className="tabular-nums">{agent.totalDeals || 0}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <span className="tabular-nums">{formattedRevenue}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={agent.isActive ? "default" : "secondary"}
                          className={agent.isActive ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : ""}
                        >
                          {agent.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        )
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <UserCheck className="h-16 w-16 text-muted-foreground/40 mb-4" />
            <h3 className="font-semibold text-lg mb-1">No agents found</h3>
            <p className="text-muted-foreground text-center max-w-sm">
              {searchQuery || specializationFilter !== "all"
                ? "Try adjusting your search or filters."
                : "Add your first agent to build your team."}
            </p>
            {!searchQuery && specializationFilter === "all" && (
              <Button className="mt-6 gap-2" data-testid="button-add-first-agent">
                <Plus className="h-4 w-4" />
                Add Agent
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
