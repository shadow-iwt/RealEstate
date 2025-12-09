import { cn } from "@/lib/utils";
import { Check, CheckCheck, Clock } from "lucide-react";
import type { Message } from "@/lib/types";
import { format } from "date-fns";

interface MessageBubbleProps {
  message: Message;
}

const statusIcons: Record<string, React.ReactNode> = {
  pending: <Clock className="h-3 w-3" />,
  sent: <Check className="h-3 w-3" />,
  delivered: <CheckCheck className="h-3 w-3" />,
  read: <CheckCheck className="h-3 w-3 text-blue-500" />,
  failed: <span className="text-destructive text-xs">Failed</span>,
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isOutbound = message.direction === "outbound";
  const time = message.sentAt || message.createdAt;
  const formattedTime = time ? format(new Date(time), "h:mm a") : "";

  return (
    <div
      className={cn(
        "flex",
        isOutbound ? "justify-end" : "justify-start"
      )}
      data-testid={`message-bubble-${message.id}`}
    >
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2.5",
          isOutbound
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-muted rounded-bl-md"
        )}
      >
        <p className="text-sm whitespace-pre-wrap break-words">
          {message.content}
        </p>
        <div
          className={cn(
            "flex items-center justify-end gap-1.5 mt-1",
            isOutbound ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          <span className="text-[10px]">{formattedTime}</span>
          {isOutbound && (
            <span className="flex items-center">
              {statusIcons[message.status || "pending"]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
