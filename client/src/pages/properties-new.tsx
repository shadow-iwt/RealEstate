import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { PropertyForm } from "@/components/property-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { InsertProperty } from "@shared/schema";

export default function NewPropertyPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const createPropertyMutation = useMutation({
    mutationFn: async (data: InsertProperty) => {
      return apiRequest("POST", "/api/properties", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({
        title: "Property created",
        description: "New property listing has been added successfully.",
      });
      setLocation("/properties");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create property. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: InsertProperty) => {
    createPropertyMutation.mutate(data);
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/properties">
          <Button variant="ghost" size="icon" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-new-property-title">
            Add New Property
          </h1>
          <p className="text-muted-foreground">
            Create a new property listing
          </p>
        </div>
      </div>

      <PropertyForm
        onSubmit={handleSubmit}
        isLoading={createPropertyMutation.isPending}
      />
    </div>
  );
}
