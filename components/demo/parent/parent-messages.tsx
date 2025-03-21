"use client";

import { useState } from "react";
import { 
  Search, Send, Paperclip, MoreHorizontal, 
  Phone, Video, Image as ImageIcon, File, 
  ChevronDown, ChevronUp, Clock, Check, 
  User, Users, Star, StarOff, Trash
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Message {
  id: number;
  senderId: number;
  senderName: string;
  senderAvatar: string;
  senderRole: string;
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: Array<{
    id: number;
    name: string;
    type: string;
    size: string;
  }>;
}

interface Conversation {
  id: number;
  participants: Array<{
    id: number;
    name: string;
    avatar: string;
    role: string;
    online?: boolean;
  }>;
  lastMessage: {
    content: string;
    timestamp: string;
    senderId: number;
  };
  unreadCount: number;
  starred: boolean;
  messages: Message[];
}

interface ParentMessagesProps {
  conversations: Conversation[];
}

export function ParentMessages({ conversations }: ParentMessagesProps) {
  const [activeConversation, setActiveConversation] = useState<number | null>(
    conversations.length > 0 ? conversations[0].id : null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "starred">("all");
  
  // Get current conversation
  const currentConversation = conversations.find(
    (conversation) => conversation.id === activeConversation
  );
  
  // Filter conversations
  const filteredConversations = conversations.filter((conversation) => {
    // Apply search filter
    const matchesSearch = searchQuery === "" || 
      conversation.participants.some(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      conversation.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    const matchesFilter = 
      filter === "all" || 
      (filter === "unread" && conversation.unreadCount > 0) ||
      (filter === "starred" && conversation.starred);
    
    return matchesSearch && matchesFilter;
  });
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !currentConversation) return;
    
    // In a real app, this would send the message to the server
    // For the demo, we'll just clear the input
    setNewMessage("");
  };
  
  // Toggle star status for a conversation
  const toggleStar = (conversationId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    // In a real app, this would update the server
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] min-h-[600px] overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-4">
          {/* Conversations List */}
          <div className="md:col-span-1 border rounded-lg overflow-hidden flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                <Input
                  placeholder="Search messages..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex justify-between mt-3">
                <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setFilter(value as "all" | "unread" | "starred")}>
                  <TabsList className="grid w-full grid-cols-3 h-8">
                    <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                    <TabsTrigger value="unread" className="text-xs">Unread</TabsTrigger>
                    <TabsTrigger value="starred" className="text-xs">Starred</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length > 0 ? (
                <ul className="divide-y">
                  {filteredConversations.map((conversation) => {
                    // Get the other participant (assuming 1:1 conversations)
                    const otherParticipant = conversation.participants.find(
                      (p) => p.role !== "parent"
                    ) || conversation.participants[0];
                    
                    // Check if this is the active conversation
                    const isActive = conversation.id === activeConversation;
                    
                    return (
                      <li 
                        key={conversation.id}
                        onClick={() => setActiveConversation(conversation.id)}
                        className={`p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors ${
                          isActive ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={otherParticipant.avatar} alt={otherParticipant.name} />
                              <AvatarFallback>{otherParticipant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            {otherParticipant.online && (
                              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-slate-900"></span>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium truncate">{otherParticipant.name}</h4>
                              <div className="flex items-center">
                                <button 
                                  onClick={(e) => toggleStar(conversation.id, e)}
                                  className="text-slate-400 hover:text-amber-400 transition-colors"
                                >
                                  {conversation.starred ? (
                                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                  ) : (
                                    <StarOff className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center mt-1">
                              <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                                {conversation.lastMessage.content}
                              </p>
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-slate-400">{conversation.lastMessage.timestamp}</span>
                                {conversation.unreadCount > 0 && (
                                  <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                                    {conversation.unreadCount}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="mt-1">
                              <Badge variant="outline" className="text-xs px-1 py-0 h-4">
                                {otherParticipant.role}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                  <p className="text-slate-500 dark:text-slate-400">No conversations found</p>
                  <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </div>
            
            <div className="p-3 border-t">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                New Message
              </Button>
            </div>
          </div>
          
          {/* Conversation Detail */}
          <div className="md:col-span-2 border rounded-lg overflow-hidden flex flex-col">
            {currentConversation ? (
              <>
                {/* Conversation Header */}
                <div className="p-4 border-b flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {/* For simplicity, we'll just show the first non-parent participant */}
                    {(() => {
                      const otherParticipant = currentConversation.participants.find(
                        (p) => p.role !== "parent"
                      ) || currentConversation.participants[0];
                      
                      return (
                        <>
                          <Avatar>
                            <AvatarImage src={otherParticipant.avatar} alt={otherParticipant.name} />
                            <AvatarFallback>{otherParticipant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{otherParticipant.name}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {otherParticipant.role} • {otherParticipant.online ? 'Online' : 'Offline'}
                            </p>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Search in Conversation</DropdownMenuItem>
                        <DropdownMenuItem>Notification Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 dark:text-red-400">
                          <Trash className="h-4 w-4 mr-2" />
                          Delete Conversation
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {currentConversation.messages.map((message) => {
                    const isCurrentUser = message.senderRole === "parent";
                    
                    return (
                      <div 
                        key={message.id} 
                        className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex gap-3 max-w-[80%] ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
                          {!isCurrentUser && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                              <AvatarFallback>{message.senderName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                          )}
                          
                          <div className={`space-y-1 ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                            <div 
                              className={`px-4 py-2 rounded-lg ${
                                isCurrentUser 
                                  ? 'bg-blue-500 text-white dark:bg-blue-600' 
                                  : 'bg-slate-100 dark:bg-slate-800'
                              }`}
                            >
                              <p>{message.content}</p>
                              
                              {message.attachments && message.attachments.length > 0 && (
                                <div className="mt-2 space-y-2">
                                  {message.attachments.map((attachment) => (
                                    <div 
                                      key={attachment.id}
                                      className={`flex items-center gap-2 p-2 rounded ${
                                        isCurrentUser 
                                          ? 'bg-blue-600 dark:bg-blue-700' 
                                          : 'bg-slate-200 dark:bg-slate-700'
                                      }`}
                                    >
                                      {attachment.type === 'image' ? (
                                        <ImageIcon className="h-4 w-4" />
                                      ) : (
                                        <File className="h-4 w-4" />
                                      )}
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm truncate">{attachment.name}</p>
                                        <p className="text-xs opacity-70">{attachment.size}</p>
                                      </div>
                                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                        <Download className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            
                            <div className={`flex items-center text-xs text-slate-400 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                              <span>{message.timestamp}</span>
                              {isCurrentUser && (
                                <span className="ml-1">
                                  {message.read ? (
                                    <Check className="h-3 w-3 text-blue-500" />
                                  ) : (
                                    <Clock className="h-3 w-3" />
                                  )}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Message Input */}
                <div className="p-3 border-t">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="rounded-full h-9 w-9 p-0">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      className="flex-1"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      size="sm" 
                      className="rounded-full h-9 w-9 p-0 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                      onClick={handleSendMessage}
                      disabled={newMessage.trim() === ""}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-4">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium">No conversation selected</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  Select a conversation from the list or start a new one
                </p>
                <Button className="mt-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                  New Message
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Missing component definitions
function Download({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function MessageSquare({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
