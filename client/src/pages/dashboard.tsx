import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/stat-card";
import { LeadCard } from "@/components/lead-card";
import { PropertyCard } from "@/components/property-card";
import { ActivityItem } from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  Building2,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Plus,
} from "lucide-react";
import { Link } from "wouter";
import type { Lead, Property, Activity, Agent } from "@/lib/types";

interface DashboardStats {
  totalLeads: number;
  newLeadsThisWeek: number;
  totalProperties: number;
  activeListings: number;
  totalRevenue: number;
  revenueChange: number;
  conversionRate: number;
  conversionChange: number;
}

export default function Dashboard() {
  const { toast } = useToast();
  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: recentLeads, isLoading: leadsLoading } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
  });

  const { data: featuredProperties, isLoading: propertiesLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const { data: recentActivities, isLoading: activitiesLoading } = useQuery<
    (Activity & { agent?: Agent; lead?: Lead; property?: Property })[]
  >({
    queryKey: ["/api/activities", "limit=5"],
    queryFn: async () => {
      const res = await fetch("/api/activities?limit=5");
      if (!res.ok) throw new Error("Failed to fetch activities");
      return res.json();
    },
  });

  const handleLeadContact = (leadId: string, method: string) => {
    const lead = recentLeads?.find((l) => l.id === leadId);
    const leadName = lead ? `${lead.firstName} ${lead.lastName}` : "Lead";
    
    const methodNames: Record<string, string> = {
      call: "phone call",
      email: "email",
      whatsapp: "WhatsApp message",
    };
    
    toast({
      title: "Contact initiated",
      description: `${methodNames[method] || "Contact"} to ${leadName} has been initiated.`,
    });
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold md:text-3xl" data-testid="text-dashboard-title">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your business.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/leads/new">
            <Button className="gap-2" data-testid="button-add-lead">
              <Plus className="h-4 w-4" />
              Add Lead
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsLoading ? (
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
              value={stats?.totalLeads || 0}
              change={12}
              changeLabel="vs last month"
              icon={Users}
              iconColor="text-blue-600 dark:text-blue-500"
              testId="stat-total-leads"
            />
            <StatCard
              title="Active Listings"
              value={stats?.activeListings || 0}
              change={8}
              changeLabel="vs last month"
              icon={Building2}
              iconColor="text-purple-600 dark:text-purple-500"
              testId="stat-active-listings"
            />
            <StatCard
              title="Revenue"
              value={`$${((stats?.totalRevenue || 0) / 1000).toFixed(0)}k`}
              change={stats?.revenueChange || 0}
              changeLabel="vs last month"
              icon={DollarSign}
              iconColor="text-green-600 dark:text-green-500"
              testId="stat-revenue"
            />
            <StatCard
              title="Conversion Rate"
              value={`${stats?.conversionRate || 0}%`}
              change={stats?.conversionChange || 0}
              changeLabel="vs last month"
              icon={TrendingUp}
              iconColor="text-orange-600 dark:text-orange-500"
              testId="stat-conversion"
            />
          </>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4">
              <CardTitle className="text-lg">Recent Leads</CardTitle>
              <Link href="/leads">
                <Button variant="ghost" size="sm" className="gap-1" data-testid="link-view-all-leads">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {leadsLoading ? (
                <>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-lg border">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  ))}
                </>
              ) : recentLeads && recentLeads.length > 0 ? (
                recentLeads.map((lead) => (
                  <LeadCard key={lead.id} lead={lead} onContact={handleLeadContact} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Users className="h-12 w-12 text-muted-foreground/40 mb-4" />
                  <h3 className="font-medium text-muted-foreground">No leads yet</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add your first lead to get started
                  </p>
                  <Link href="/leads/new">
                    <Button className="mt-4 gap-2" data-testid="button-add-first-lead">
                      <Plus className="h-4 w-4" />
                      Add Lead
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4">
              <CardTitle className="text-lg">Featured Properties</CardTitle>
              <Link href="/properties">
                <Button variant="ghost" size="sm" className="gap-1" data-testid="link-view-all-properties">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {propertiesLoading ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                      <Skeleton className="aspect-[4/3]" />
                      <CardContent className="p-4 space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : featuredProperties && featuredProperties.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Building2 className="h-12 w-12 text-muted-foreground/40 mb-4" />
                  <h3 className="font-medium text-muted-foreground">No properties yet</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add your first property listing
                  </p>
                  <Link href="/properties/new">
                    <Button className="mt-4 gap-2" data-testid="button-add-first-property">
                      <Plus className="h-4 w-4" />
                      Add Property
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {activitiesLoading ? (
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex gap-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : recentActivities && recentActivities.length > 0 ? (
                <div className="space-y-1">
                  {recentActivities.map((activity) => (
                    <ActivityItem
                      key={activity.id}
                      activity={activity}
                      agentName={activity.agent?.fullName}
                      leadName={
                        activity.lead
                          ? `${activity.lead.firstName} ${activity.lead.lastName}`
                          : undefined
                      }
                      propertyTitle={activity.property?.title}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <TrendingUp className="h-10 w-10 text-muted-foreground/40 mb-3" />
                  <p className="text-sm text-muted-foreground">No recent activity</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
