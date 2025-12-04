import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageSquare, Mail, Calendar, FileText, CheckCircle2 } from "lucide-react";
import type { Activity } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

interface ActivityItemProps {
  activity: Activity;
  agentName?: string;
  leadName?: string;
  propertyTitle?: string;
}

const activityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  call: Phone,
  message: MessageSquare,
  email: Mail,
  viewing: Calendar,
  note: FileText,
  task: CheckCircle2,
};

const activityColors: Record<string, string> = {
  call: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  message: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  email: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  viewing: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  note: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
  task: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
};

export function ActivityItem({
  activity,
  agentName,
  leadName,
  propertyTitle,
}: ActivityItemProps) {
  const Icon = activityIcons[activity.type] || FileText;
  const colorClass = activityColors[activity.type] || activityColors.note;
  
  const timeAgo = activity.createdAt
    ? formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })
    : "";

  const agentInitials = agentName
    ? agentName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  return (
    <div className="flex gap-4 py-4" data-testid={`activity-item-${activity.id}`}>
      <div className="flex flex-col items-center">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
            {agentInitials}
          </AvatarFallback>
        </Avatar>
        <div className="w-px flex-1 bg-border mt-2" />
      </div>

      <div className="flex-1 min-w-0 pb-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <div className={`flex h-6 w-6 items-center justify-center rounded-md ${colorClass}`}>
              <Icon className="h-3.5 w-3.5" />
            </div>
            <span className="font-medium">{activity.title}</span>
            {activity.isCompleted && (
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                Completed
              </Badge>
            )}
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {timeAgo}
          </span>
        </div>

        {activity.description && (
          <p className="mt-2 text-sm text-muted-foreground">
            {activity.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2 mt-3">
          {agentName && (
            <Badge variant="outline" className="text-xs">
              Agent: {agentName}
            </Badge>
          )}
          {leadName && (
            <Badge variant="outline" className="text-xs">
              Lead: {leadName}
            </Badge>
          )}
          {propertyTitle && (
            <Badge variant="outline" className="text-xs">
              Property: {propertyTitle}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
