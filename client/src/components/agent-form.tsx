import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { insertAgentSchema } from "@/lib/schemas";

const agentFormSchema = insertAgentSchema.extend({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
});

type AgentFormData = z.infer<typeof agentFormSchema>;

interface AgentFormProps {
  onSubmit: (data: AgentFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  defaultValues?: Partial<AgentFormData>;
}

export function AgentForm({ onSubmit, onCancel, isLoading, defaultValues }: AgentFormProps) {
  const form = useForm<AgentFormData>({
    resolver: zodResolver(agentFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      specialization: "residential",
      licenseNumber: "",
      bio: "",
      isActive: true,
      ...defaultValues,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      data-testid="input-agent-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                        data-testid="input-agent-email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+1 (555) 000-0000"
                        {...field}
                        data-testid="input-agent-phone"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="specialization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialization</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-specialization">
                          <SelectValue placeholder="Select specialization" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                        <SelectItem value="rentals">Rentals</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="licenseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="RE123456"
                        {...field}
                        data-testid="input-license-number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief bio about the agent..."
                      {...field}
                      data-testid="input-agent-bio"
                      className="min-h-24"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-6">
              <Button 
                type="button" 
                variant="outline" 
                data-testid="button-cancel"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                data-testid="button-submit-agent"
              >
                {isLoading ? "Adding Agent..." : "Add Agent"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
