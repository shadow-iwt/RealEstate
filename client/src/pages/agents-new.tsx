import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { AgentForm } from "@/components/agent-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { InsertAgent } from "@/lib/types";

export default function NewAgentPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const createAgentMutation = useMutation({
    mutationFn: async (data: InsertAgent) => {
      const response = await apiRequest("POST", "/api/agents", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/agents"] });
      toast({
        title: "Agent added",
        description: "New agent has been added successfully.",
      });
      setLocation("/agents");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add agent. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: InsertAgent) => {
    createAgentMutation.mutate(data);
  };

  const handleCancel = () => {
    setLocation("/agents");
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/agents">
          <Button variant="ghost" size="icon" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-new-agent-title">
            Add New Agent
          </h1>
          <p className="text-muted-foreground">
            Create a new agent profile and add them to your team.
          </p>
        </div>
      </div>

      <AgentForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={createAgentMutation.isPending} />
    </div>
  );
}
