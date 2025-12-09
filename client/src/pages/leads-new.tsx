import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { LeadForm } from "@/components/lead-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { InsertLead } from "@/lib/types";

export default function NewLeadPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const createLeadMutation = useMutation({
    mutationFn: async (data: InsertLead) => {
      const response = await apiRequest("POST", "/api/leads", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      toast({
        title: "Lead created",
        description: "New lead has been added successfully.",
      });
      setLocation("/leads");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create lead. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: InsertLead) => {
    createLeadMutation.mutate(data);
  };

  const handleCancel = () => {
    setLocation("/leads");
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/leads">
          <Button variant="ghost" size="icon" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-new-lead-title">
            Add New Lead
          </h1>
          <p className="text-muted-foreground">
            Capture a new lead's information
          </p>
        </div>
      </div>

      <LeadForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={createLeadMutation.isPending}
      />
    </div>
  );
}
