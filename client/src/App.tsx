import { Switch, Route, useLocation } from "wouter";
import React, { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Bell, Search, Trash2, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import LeadsPage from "@/pages/leads";
import NewLeadPage from "@/pages/leads-new";
import PropertiesPage from "@/pages/properties";
import NewPropertyPage from "@/pages/properties-new";
import AgentsPage from "@/pages/agents";
import NewAgentPage from "@/pages/agents-new";
import MessagesPage from "@/pages/messages";
import AnalyticsPage from "@/pages/analytics";
import SettingsPage from "@/pages/settings";
import LeadHunterPage from "@/pages/lead-hunter";
import LeadEnrichmentPage from "@/pages/lead-enrichment";
import LeadScoringPage from "@/pages/lead-scoring";
import LandingPage from "@/pages/landing";
import LoginPage from "@/pages/login";
import SignupPage from "@/pages/signup";
import FeaturesPage from "@/pages/features";
import PricingPage from "@/pages/pricing";
import SecurityPage from "@/pages/security";
import AboutPage from "@/pages/about";
import BlogPage from "@/pages/blog";
import CareersPage from "@/pages/careers";
import DocsPage from "@/pages/docs";
import APIPage from "@/pages/api";
import SupportPage from "@/pages/support";

function Router() {
  const [location] = useLocation();

  // For public routes, show without sidebar
  const isPublicRoute = ["/landing", "/login", "/signup", "/features", "/pricing", "/security", "/about", "/blog", "/careers", "/docs", "/api", "/support"].includes(location);
  
  if (isPublicRoute) {
    return (
      <Switch>
        <Route path="/landing" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/features" component={FeaturesPage} />
        <Route path="/pricing" component={PricingPage} />
        <Route path="/security" component={SecurityPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/careers" component={CareersPage} />
        <Route path="/docs" component={DocsPage} />
        <Route path="/api" component={APIPage} />
        <Route path="/support" component={SupportPage} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  // For authenticated routes, show with sidebar
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/leads" component={LeadsPage} />
      <Route path="/leads/new" component={NewLeadPage} />
      <Route path="/properties" component={PropertiesPage} />
      <Route path="/properties/new" component={NewPropertyPage} />
      <Route path="/agents" component={AgentsPage} />
      <Route path="/agents/new" component={NewAgentPage} />
      <Route path="/messages" component={MessagesPage} />
      <Route path="/analytics" component={AnalyticsPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/lead-hunter" component={LeadHunterPage} />
      <Route path="/lead-enrichment" component={LeadEnrichmentPage} />
      <Route path="/lead-scoring" component={LeadScoringPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

// Redirect component for home route
function HomeRedirect() {
  const [, setLocation] = useLocation();
  
  const isAuthenticated = typeof window !== "undefined" && 
    !!localStorage.getItem("authToken");

  React.useEffect(() => {
    if (isAuthenticated) {
      setLocation("/"); // Stay on dashboard
    } else {
      setLocation("/landing"); // Redirect to landing page
    }
  }, [setLocation, isAuthenticated]);

  return null;
}

function AppLayout() {
  const [, setLocation] = useLocation();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New lead from John Smith", time: "5 minutes ago", icon: "👤", link: "/leads" },
    { id: 2, title: "Property viewing scheduled", time: "1 hour ago", icon: "🏠", link: "/properties" },
    { id: 3, title: "Message from agent Sarah", time: "2 hours ago", icon: "💬", link: "/messages" },
  ]);

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const handleNotificationClick = (link: string, id: number) => {
    setLocation(link);
    removeNotification(id);
    setNotificationsOpen(false);
  };

  const [location] = useLocation();
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  // Check if current location is a public/landing page route
  const isPublicRoute = ["/landing", "/login", "/signup", "/features", "/pricing", "/security", "/about", "/blog", "/careers", "/docs", "/api", "/support"].includes(location);

  // For public routes, render without sidebar
  if (isPublicRoute) {
    return (
      <div>
        <Router />
      </div>
    );
  }

  // For protected routes, render with sidebar
  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1 min-w-0">
          <header className="sticky top-0 z-50 flex h-14 items-center justify-between gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <div className="hidden md:flex relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search leads, properties, agents..."
                  className="pl-9 w-64 lg:w-80"
                  data-testid="input-global-search"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative" data-testid="button-notifications">
                    <Bell className="h-4 w-4" />
                    {notifications.length > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                      >
                        {notifications.length}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b">
                      <h2 className="font-semibold">Notifications</h2>
                      {notifications.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={clearAllNotifications}
                        >
                          Clear all
                        </Button>
                      )}
                    </div>
                    {notifications.length > 0 ? (
                      <ScrollArea className="h-96">
                        <div className="flex flex-col">
                          {notifications.map((notification) => (
                            <div
                              key={notification.id}
                              onClick={() => handleNotificationClick(notification.link, notification.id)}
                              className="flex items-start gap-3 p-4 border-b hover:bg-accent/50 transition-colors last:border-0 cursor-pointer group"
                            >
                              <div className="text-2xl mt-0.5">{notification.icon}</div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm">{notification.title}</p>
                                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                              </div>
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeNotification(notification.id);
                                  }}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                >
                                  <ArrowRight className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    ) : (
                      <div className="p-8 text-center text-muted-foreground">
                        <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No notifications yet</p>
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <Router />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function MainApp() {
  const [location] = useLocation();

  return <AppLayout />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        <TooltipProvider>
          <MainApp />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
