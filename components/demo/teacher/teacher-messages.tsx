"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, Plus, Send, Paperclip, MoreHorizontal, 
  ChevronDown, Phone, Video, Users, Star, StarOff,
  Clock, CheckCheck, ArrowLeft, ArrowRight, Filter
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea"; // Ensure Textarea is properly imported
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Class {
  id: number;
  name: string;
  grade: string;
  room: string;
  time: string;
  students: number;
}

interface TeacherMessagesProps {
  classes: Class[];
}

export function TeacherMessages({ classes }: TeacherMessagesProps) {
  const [selectedTab, setSelectedTab] = useState("parents");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [messageText, setMessageText] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  
  // Dummy data for conversations
  const conversations = [
    {
      id: 1,
      type: "parent",
      name: "Sarah Thompson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      studentName: "Emma Thompson",
      studentGrade: "5A",
      lastMessage: "Thank you for the update on Emma's progress. We'll work on those math problems at home.",
      lastMessageTime: "10:30 AM",
      unread: true,
      starred: true,
      messages: [
        {
          id: 1,
          sender: "Sarah Thompson",
          senderType: "parent",
          content: "Hello Ms. Johnson, I wanted to check in on Emma's progress in math class. She mentioned she's having trouble with fractions.",
          timestamp: "Yesterday, 3:45 PM",
          read: true
        },
        {
          id: 2,
          sender: "You",
          senderType: "teacher",
          content: "Hi Sarah, thanks for reaching out. Emma is doing well overall, but you're right that she's having some challenges with adding fractions with different denominators. I've provided her with some extra practice sheets.",
          timestamp: "Yesterday, 4:30 PM",
          read: true
        },
        {
          id: 3,
          sender: "Sarah Thompson",
          senderType: "parent",
          content: "Thank you for the update on Emma's progress. We'll work on those math problems at home.",
          timestamp: "Today, 10:30 AM",
          read: false
        }
      ]
    },
    {
      id: 2,
      type: "parent",
      name: "Michael Martinez",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      studentName: "Jacob Martinez",
      studentGrade: "5A",
      lastMessage: "Jacob will be absent tomorrow due to a doctor's appointment.",
      lastMessageTime: "Yesterday",
      unread: false,
      starred: false,
      messages: [
        {
          id: 1,
          sender: "Michael Martinez",
          senderType: "parent",
          content: "Jacob will be absent tomorrow due to a doctor's appointment.",
          timestamp: "Yesterday, 2:15 PM",
          read: true
        }
      ]
    },
    {
      id: 3,
      type: "parent",
      name: "Jennifer Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      studentName: "Olivia Wilson",
      studentGrade: "5A",
      lastMessage: "Is there anything Olivia needs to prepare for the upcoming math test?",
      lastMessageTime: "Mar 18",
      unread: false,
      starred: true,
      messages: [
        {
          id: 1,
          sender: "Jennifer Wilson",
          senderType: "parent",
          content: "Is there anything Olivia needs to prepare for the upcoming math test?",
          timestamp: "Mar 18, 9:20 AM",
          read: true
        },
        {
          id: 2,
          sender: "You",
          senderType: "teacher",
          content: "Hi Jennifer, Olivia should review the fractions and decimals chapters we covered in the last two weeks. I've also shared a study guide with all students today in class.",
          timestamp: "Mar 18, 11:45 AM",
          read: true
        }
      ]
    },
    {
      id: 4,
      type: "student",
      name: "Noah Johnson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      studentName: "Noah Johnson",
      studentGrade: "5A",
      lastMessage: "Ms. Johnson, I'm having trouble with problem #5 on the homework.",
      lastMessageTime: "Mar 17",
      unread: false,
      starred: false,
      messages: [
        {
          id: 1,
          sender: "Noah Johnson",
          senderType: "student",
          content: "Ms. Johnson, I'm having trouble with problem #5 on the homework.",
          timestamp: "Mar 17, 7:30 PM",
          read: true
        }
      ]
    },
    {
      id: 5,
      type: "class",
      name: "5A - Mathematics",
      avatar: "",
      studentName: "",
      studentGrade: "5A",
      lastMessage: "Reminder: Math quiz tomorrow on fractions and decimals. Don't forget to study!",
      lastMessageTime: "Mar 15",
      unread: false,
      starred: false,
      messages: [
        {
          id: 1,
          sender: "You",
          senderType: "teacher",
          content: "Reminder: Math quiz tomorrow on fractions and decimals. Don't forget to study!",
          timestamp: "Mar 15, 3:00 PM",
          read: true
        }
      ]
    }
  ];
  
  // Filter conversations based on selected tab and search query
  const filteredConversations = conversations.filter(conversation => {
    // Filter by tab
    if (selectedTab === "parents" && conversation.type !== "parent") {
      return false;
    }
    if (selectedTab === "students" && conversation.type !== "student") {
      return false;
    }
    if (selectedTab === "classes" && conversation.type !== "class") {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !conversation.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by type
    if (filterType === "unread" && !conversation.unread) {
      return false;
    }
    if (filterType === "starred" && !conversation.starred) {
      return false;
    }
    
    return true;
  });
  
  const currentConversation = conversations.find(c => c.id === selectedConversation);
  
  const handleSendMessage = () => {
    if (!messageText.trim() || !currentConversation) return;
    
    // In a real app, this would send the message to the backend
    // For now, we'll just clear the input
    setMessageText("");
  };
  
  const toggleStar = (conversationId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    // In a real app, this would update the starred status in the backend
  };
  
  const formatMessageTime = (timeString: string) => {
    // Simple function to format time - in a real app, this would use proper date formatting
    return timeString;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Messages</h2>
          <p className="text-slate-500 dark:text-slate-400">Communicate with parents, students, and classes</p>
        </div>
        
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600">
            <Plus className="h-4 w-4 mr-1" />
            New Message
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <Card className="h-[calc(100vh-220px)] flex flex-col">
            <CardHeader className="pb-3 flex-shrink-0">
              <Tabs defaultValue="parents" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="parents">Parents</TabsTrigger>
                  <TabsTrigger value="students">Students</TabsTrigger>
                  <TabsTrigger value="classes">Classes</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <div className="px-4 pb-2 flex-shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <Input
                    type="search"
                    placeholder="Search messages..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter Messages</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setFilterType("all")}>
                      All Messages
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType("unread")}>
                      Unread Messages
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType("starred")}>
                      Starred Messages
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <CardContent className="flex-1 overflow-auto p-0">
              <div className="divide-y">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((conversation) => (
                    <div 
                      key={conversation.id} 
                      className={`p-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 ${selectedConversation === conversation.id ? 'bg-slate-50 dark:bg-slate-800/50' : ''}`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="flex items-start gap-3">
                        {conversation.type === "class" ? (
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                            <Users className="h-5 w-5" />
                          </div>
                        ) : (
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={conversation.avatar} alt={conversation.name} />
                            <AvatarFallback>{conversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-1">
                              <p className="font-medium truncate">{conversation.name}</p>
                              <button 
                                className="text-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400"
                                onClick={(e: React.MouseEvent) => toggleStar(conversation.id, e)} // Add type for parameter 'e'
                              >
                                {conversation.starred ? (
                                  <Star className="h-4 w-4 fill-yellow-500" />
                                ) : (
                                  <StarOff className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                            <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                              {conversation.lastMessageTime}
                            </span>
                          </div>
                          
                          {conversation.type === "parent" && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              Parent of {conversation.studentName} • {conversation.studentGrade}
                            </p>
                          )}
                          
                          <p className="text-sm text-slate-600 dark:text-slate-300 truncate mt-1">
                            {conversation.lastMessage}
                          </p>
                          
                          <div className="flex justify-between items-center mt-1">
                            {conversation.unread && (
                              <Badge className="bg-blue-500 text-white dark:bg-blue-600 h-2 w-2 rounded-full p-0" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                    <p>No messages found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          {currentConversation ? (
            <Card className="h-[calc(100vh-220px)] flex flex-col">
              <CardHeader className="pb-3 border-b flex-shrink-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {currentConversation.type === "class" ? (
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                        <Users className="h-5 w-5" />
                      </div>
                    ) : (
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={currentConversation.avatar} alt={currentConversation.name} />
                        <AvatarFallback>{currentConversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div>
                      <CardTitle className="text-lg">{currentConversation.name}</CardTitle>
                      {currentConversation.type === "parent" && (
                        <CardDescription>
                          Parent of {currentConversation.studentName} • {currentConversation.studentGrade}
                        </CardDescription>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Contact Info</DropdownMenuItem>
                        <DropdownMenuItem>Mark All as Read</DropdownMenuItem>
                        <DropdownMenuItem>Mute Conversation</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 dark:text-red-400">
                          Block Contact
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-auto py-4 px-4">
                <div className="space-y-4">
                  {currentConversation.messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.senderType === "teacher" ? "justify-end" : "justify-start"}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.senderType === "teacher" 
                            ? "bg-blue-500 text-white dark:bg-blue-600" 
                            : "bg-slate-100 dark:bg-slate-800"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div 
                          className={`flex justify-between items-center mt-1 text-xs ${
                            message.senderType === "teacher" 
                              ? "text-blue-100" 
                              : "text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          <span>{message.timestamp}</span>
                          {message.senderType === "teacher" && (
                            <CheckCheck className="h-3 w-3 ml-1" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="border-t pt-3 flex-shrink-0">
                <div className="flex items-end gap-2 w-full">
                  <Textarea 
                    placeholder="Type a message..." 
                    className="min-h-[80px]"
                    value={messageText}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessageText(e.target.value)} // Add type for parameter 'e'
                  />
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ) : (
            <Card className="h-[calc(100vh-220px)] flex items-center justify-center">
              <div className="text-center p-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 mx-auto mb-4">
                  <Send className="h-8 w-8 text-slate-500 dark:text-slate-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Select a conversation</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                  Choose a conversation from the list to view messages and start communicating.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
