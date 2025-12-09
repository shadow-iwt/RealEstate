import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Building2,
  Bell,
  MessageSquare,
  Shield,
  Palette,
  Save,
  Mail,
  Phone,
  Globe,
  Check,
} from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    newLeads: true,
    messages: true,
    propertyViews: false,
    weeklyReports: true,
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-semibold md:text-3xl" data-testid="text-settings-title">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account and application preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="flex-wrap">
          <TabsTrigger value="profile" className="gap-2" data-testid="tab-profile">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="company" className="gap-2" data-testid="tab-company">
            <Building2 className="h-4 w-4" />
            Company
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2" data-testid="tab-notifications">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="whatsapp" className="gap-2" data-testid="tab-whatsapp">
            <MessageSquare className="h-4 w-4" />
            WhatsApp
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2" data-testid="tab-appearance">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and contact details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    data-testid="button-upload-avatar"
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) {
                          toast({
                            title: "Photo uploaded",
                            description: "Your profile photo has been updated."
                          });
                        }
                      };
                      input.click();
                    }}
                  >
                    Upload Photo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    JPG, PNG or GIF. Max 2MB.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" data-testid="input-first-name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" data-testid="input-last-name" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john.doe@realestate.com"
                    className="pl-9"
                    data-testid="input-email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="pl-9"
                    data-testid="input-phone"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} className="gap-2" data-testid="button-save-profile">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
              <CardDescription>
                Manage your company information and branding.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" defaultValue="RealEstate Pro" data-testid="input-company-name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="website"
                    type="url"
                    defaultValue="https://realestatepro.com"
                    className="pl-9"
                    data-testid="input-website"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Input id="address" defaultValue="123 Business Ave, Miami, FL 33101" data-testid="input-address" />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} className="gap-2" data-testid="button-save-company">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you want to receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Lead Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when a new lead is captured.
                  </p>
                </div>
                <Switch
                  checked={notifications.newLeads}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, newLeads: checked })
                  }
                  data-testid="switch-new-leads"
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Message Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when you receive a new message.
                  </p>
                </div>
                <Switch
                  checked={notifications.messages}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, messages: checked })
                  }
                  data-testid="switch-messages"
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Property View Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when your listings are viewed.
                  </p>
                </div>
                <Switch
                  checked={notifications.propertyViews}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, propertyViews: checked })
                  }
                  data-testid="switch-property-views"
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a weekly summary of your performance.
                  </p>
                </div>
                <Switch
                  checked={notifications.weeklyReports}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, weeklyReports: checked })
                  }
                  data-testid="switch-weekly-reports"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="whatsapp" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Integration</CardTitle>
              <CardDescription>
                Configure your WhatsApp Business API settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-green-800 dark:text-green-300">Connected</p>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    WhatsApp Business is connected and ready to use.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsappNumber">WhatsApp Business Number</Label>
                <Input
                  id="whatsappNumber"
                  defaultValue="+1 (555) 000-0000"
                  disabled
                  data-testid="input-whatsapp-number"
                />
              </div>

              <div className="space-y-2">
                <Label>Auto-Reply Settings</Label>
                <div className="p-4 rounded-lg border space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium text-sm">Welcome Message</p>
                      <p className="text-xs text-muted-foreground">
                        Automatically greet new contacts.
                      </p>
                    </div>
                    <Badge variant="secondary">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium text-sm">Out of Hours Reply</p>
                      <p className="text-xs text-muted-foreground">
                        Auto-reply outside business hours.
                      </p>
                    </div>
                    <Badge variant="outline">Disabled</Badge>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  data-testid="button-configure-whatsapp"
                  onClick={() => {
                    toast({
                      title: "WhatsApp Configuration",
                      description: "Redirecting to WhatsApp settings page..."
                    });
                  }}
                >
                  Configure Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how the application looks.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setTheme("light")}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      theme === "light"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    data-testid="button-theme-light"
                  >
                    <div className="h-20 rounded-md bg-white border mb-3" />
                    <p className="text-sm font-medium">Light</p>
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      theme === "dark"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    data-testid="button-theme-dark"
                  >
                    <div className="h-20 rounded-md bg-gray-900 border border-gray-700 mb-3" />
                    <p className="text-sm font-medium">Dark</p>
                  </button>
                  <button
                    onClick={() => setTheme("system")}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      theme === "system"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    data-testid="button-theme-system"
                  >
                    <div className="h-20 rounded-md bg-gradient-to-r from-white to-gray-900 border mb-3" />
                    <p className="text-sm font-medium">System</p>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
