import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageBubble } from "@/components/message-bubble";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  Send,
  Plus,
  Phone,
  MessageSquare,
  Settings,
  Zap,
  Clock,
  Check,
} from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Lead, Message, MessageTemplate } from "@/lib/types";

interface ConversationThread {
  lead: Lead;
  messages: Message[];
  lastMessage?: Message;
}

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  const { data: leads, isLoading: leadsLoading } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
  });

  const { data: messages, isLoading: messagesLoading } = useQuery<Message[]>({
    queryKey: ["/api/messages", selectedLeadId],
    queryFn: async () => {
      const res = await fetch(`/api/messages?leadId=${selectedLeadId}`);
      if (!res.ok) throw new Error("Failed to fetch messages");
      return res.json();
    },
    enabled: !!selectedLeadId,
  });

  const { data: templates } = useQuery<MessageTemplate[]>({
    queryKey: ["/api/message-templates"],
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (data: { leadId: string; content: string }) => {
      const response = await apiRequest("POST", "/api/messages", {
        leadId: data.leadId,
        content: data.content,
        direction: "outbound",
        channel: "whatsapp",
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages", selectedLeadId] });
      setNewMessage("");
      toast({
        title: "Message sent",
        description: "Your message has been sent via WhatsApp.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const filteredLeads = leads?.filter((lead) => {
    const fullName = `${lead.firstName} ${lead.lastName}`.toLowerCase();
    return (
      searchQuery === "" ||
      fullName.includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery)
    );
  });

  const selectedLead = leads?.find((lead) => lead.id === selectedLeadId);

  const handleSendMessage = () => {
    if (!selectedLeadId || !newMessage.trim()) return;
    sendMessageMutation.mutate({
      leadId: selectedLeadId,
      content: newMessage.trim(),
    });
  };

  const handleTemplateSelect = (template: MessageTemplate) => {
    setNewMessage(template.content);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] p-4 md:p-6 lg:p-8 gap-6">
      <Card className="w-80 flex-shrink-0 flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-lg">Conversations</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {leads?.length || 0}
            </Badge>
          </div>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-conversations"
            />
          </div>
        </CardHeader>
        <ScrollArea className="flex-1">
          <div className="px-4 pb-4 space-y-1">
            {leadsLoading ? (
              <>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                ))}
              </>
            ) : filteredLeads && filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => {
                const initials = `${lead.firstName[0]}${lead.lastName[0]}`.toUpperCase();
                const isSelected = selectedLeadId === lead.id;
                return (
                  <button
                    key={lead.id}
                    onClick={() => setSelectedLeadId(lead.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                      isSelected
                        ? "bg-primary/10"
                        : "hover-elevate"
                    }`}
                    data-testid={`conversation-${lead.id}`}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">
                        {lead.firstName} {lead.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {lead.phone}
                      </p>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <MessageSquare className="h-10 w-10 text-muted-foreground/40 mb-3" />
                <p className="text-sm text-muted-foreground">No conversations</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>

      <Card className="flex-1 flex flex-col">
        {selectedLead ? (
          <>
            <CardHeader className="flex-row items-center justify-between gap-4 border-b pb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {`${selectedLead.firstName[0]}${selectedLead.lastName[0]}`.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">
                    {selectedLead.firstName} {selectedLead.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{selectedLead.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  data-testid="button-call-lead"
                  onClick={() => {
                    toast({
                      title: "Calling...",
                      description: `Initiating call to ${selectedLead?.phone}`
                    });
                  }}
                >
                  <Phone className="h-4 w-4" />
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" data-testid="button-templates">
                      <Zap className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Message Templates</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2 mt-4">
                      {templates && templates.length > 0 ? (
                        templates.map((template) => (
                          <button
                            key={template.id}
                            onClick={() => handleTemplateSelect(template)}
                            className="w-full p-3 text-left rounded-lg border hover-elevate"
                            data-testid={`template-${template.id}`}
                          >
                            <p className="font-medium text-sm">{template.name}</p>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                              {template.content}
                            </p>
                          </button>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <p className="text-sm">No templates available</p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>

            <ScrollArea className="flex-1 p-4">
              {messagesLoading ? (
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                      <Skeleton className="h-16 w-48 rounded-2xl" />
                    </div>
                  ))}
                </div>
              ) : messages && messages.length > 0 ? (
                <div className="space-y-3">
                  {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground/40 mb-4" />
                  <h3 className="font-medium text-muted-foreground">No messages yet</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Start a conversation with {selectedLead.firstName}
                  </p>
                </div>
              )}
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="min-h-[80px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  data-testid="input-message"
                />
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MessageSquare className="h-3.5 w-3.5" />
                  WhatsApp
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || sendMessageMutation.isPending}
                  className="gap-2"
                  data-testid="button-send-message"
                >
                  <Send className="h-4 w-4" />
                  Send
                </Button>
              </div>
            </div>
          </>
        ) : (
          <CardContent className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-1">Select a Conversation</h3>
            <p className="text-muted-foreground max-w-sm">
              Choose a contact from the list to view and send messages via WhatsApp.
            </p>
          </CardContent>
        )}
      </Card>

      <Card className="w-72 flex-shrink-0 hidden xl:flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Automation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-sm">Auto Follow-up</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Automatically send follow-up messages to leads after 24 hours of no response.
            </p>
            <Badge variant="secondary" className="mt-2 text-xs">
              Enabled
            </Badge>
          </div>

          <div className="p-3 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-sm">Quick Replies</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Use templates for faster responses to common questions.
            </p>
            <Badge variant="secondary" className="mt-2 text-xs">
              {templates?.length || 0} templates
            </Badge>
          </div>

          <div className="p-3 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Check className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-sm">Lead Qualification</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Auto-qualify leads based on their responses and engagement.
            </p>
            <Badge variant="outline" className="mt-2 text-xs">
              Coming Soon
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
