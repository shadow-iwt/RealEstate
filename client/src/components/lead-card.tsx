import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MessageSquare, MoreVertical, MapPin, DollarSign } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Lead } from "@shared/schema";

interface LeadCardProps {
  lead: Lead;
  onStatusChange?: (leadId: string, status: string) => void;
  onContact?: (leadId: string, method: string) => void;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  contacted: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  qualified: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  viewing: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  offer: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  closed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  lost: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export function LeadCard({ lead, onStatusChange, onContact }: LeadCardProps) {
  const initials = `${lead.firstName[0]}${lead.lastName[0]}`.toUpperCase();
  const fullName = `${lead.firstName} ${lead.lastName}`;
  const formattedBudget = lead.budget
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(Number(lead.budget))
    : null;

  return (
    <Card className="hover-elevate transition-all duration-200" data-testid={`lead-card-${lead.id}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-medium truncate" data-testid={`lead-name-${lead.id}`}>
                {fullName}
              </h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8" data-testid={`lead-menu-${lead.id}`}>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onStatusChange?.(lead.id, "contacted")}>
                    Mark as Contacted
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onStatusChange?.(lead.id, "qualified")}>
                    Mark as Qualified
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onStatusChange?.(lead.id, "viewing")}>
                    Schedule Viewing
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <Badge
                variant="secondary"
                className={`${statusColors[lead.status || "new"]} border-0 text-xs`}
              >
                {lead.status?.charAt(0).toUpperCase() + lead.status?.slice(1)}
              </Badge>
              {lead.source && (
                <Badge variant="outline" className="text-xs">
                  {lead.source}
                </Badge>
              )}
            </div>

            <div className="flex flex-col gap-1 mt-3 text-sm text-muted-foreground">
              {lead.preferredLocation && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="truncate">{lead.preferredLocation}</span>
                </div>
              )}
              {formattedBudget && (
                <div className="flex items-center gap-2">
                  <DollarSign className="h-3.5 w-3.5" />
                  <span>Budget: {formattedBudget}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 mt-4">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1.5 text-xs"
                onClick={() => onContact?.(lead.id, "call")}
                data-testid={`lead-call-${lead.id}`}
              >
                <Phone className="h-3.5 w-3.5" />
                Call
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1.5 text-xs"
                onClick={() => onContact?.(lead.id, "email")}
                data-testid={`lead-email-${lead.id}`}
              >
                <Mail className="h-3.5 w-3.5" />
                Email
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1.5 text-xs"
                onClick={() => onContact?.(lead.id, "whatsapp")}
                data-testid={`lead-whatsapp-${lead.id}`}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
