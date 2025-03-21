"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Calendar, Clock, FileText, MessageSquare, 
  BookOpen, CreditCard, Bell, ChevronRight,
  CheckCircle, XCircle, AlertCircle, User
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ParentChildren } from "./parent-children";
import { ParentCalendar } from "./parent-calendar";
import { ParentPayments } from "./parent-payments";
import { ParentMessages } from "./parent-messages";
// import { ParentNotifications } from "./parent-notifications";

export function ParentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Dummy data for children
  const children = [
    {
      id: 1,
      name: "Emma Johnson",
      age: 10,
      grade: "5th Grade",
      school: "Oakridge Elementary",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      attendance: 95,
      performance: 88,
      homeworkCompleted: 92,
      upcomingEvents: [
        { id: 1, title: "Math Test", date: "Tomorrow", type: "test" },
        { id: 2, title: "Science Project Due", date: "Friday", type: "assignment" },
      ],
      recentGrades: [
        { id: 1, subject: "Math", grade: "A-", date: "Mar 18" },
        { id: 2, subject: "English", grade: "B+", date: "Mar 15" },
        { id: 3, subject: "Science", grade: "A", date: "Mar 12" },
      ]
    },
    {
      id: 2,
      name: "Noah Johnson",
      age: 7,
      grade: "2nd Grade",
      school: "Oakridge Elementary",
      avatar: "https://images.unsplash.com/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      attendance: 98,
      performance: 82,
      homeworkCompleted: 85,
      upcomingEvents: [
        { id: 1, title: "Reading Assessment", date: "Thursday", type: "test" },
        { id: 2, title: "Field Trip", date: "Next Monday", type: "event" },
      ],
      recentGrades: [
        { id: 1, subject: "Reading", grade: "B+", date: "Mar 17" },
        { id: 2, subject: "Math", grade: "B", date: "Mar 14" },
        { id: 3, subject: "Art", grade: "A+", date: "Mar 10" },
      ]
    }
  ];
  
  // Dummy data for notifications
  const notifications = [
    { 
      id: 1, 
      title: "Permission Slip Required", 
      description: "Please sign the permission slip for Emma's field trip to the Science Museum.", 
      date: "2 hours ago",
      unread: true,
      type: "urgent"
    },
    { 
      id: 2, 
      title: "Parent-Teacher Conference", 
      description: "Reminder: Your conference with Ms. Wilson is scheduled for tomorrow at 4:30 PM.", 
      date: "Yesterday",
      unread: true,
      type: "reminder"
    },
    { 
      id: 3, 
      title: "School Closure", 
      description: "The school will be closed on Friday, March 24th for teacher professional development.", 
      date: "2 days ago",
      unread: false,
      type: "info"
    }
  ];
  
  // Dummy data for upcoming payments
  const payments = [
    { 
      id: 1, 
      type: "Field Trip Fee", 
      amount: 25.00, 
      status: "pending" as "pending" | "overdue" | "paid",
      dueDate: "Mar 25, 2025",
      description: "Science Museum Field Trip",
      child: "Emma Johnson"
    },
    { 
      id: 2, 
      type: "Lunch Account", 
      amount: 50.00, 
      status: "pending" as "pending" | "overdue" | "paid",
      dueDate: "Mar 30, 2025",
      description: "Monthly Lunch Payment",
      child: "Both children"
    },
    { 
      id: 3, 
      type: "School Supplies", 
      amount: 35.50, 
      status: "pending" as "pending" | "overdue" | "paid",
      dueDate: "Apr 5, 2025",
      description: "Art Supplies for Spring Term",
      child: "Noah Johnson"
    },
    { 
      id: 4, 
      type: "Tuition", 
      amount: 250.00, 
      status: "overdue" as "pending" | "overdue" | "paid",
      dueDate: "Mar 15, 2025",
      description: "Monthly Tuition Payment",
      child: "Both children"
    },
    { 
      id: 5, 
      type: "After School Program", 
      amount: 75.00, 
      status: "paid" as "pending" | "overdue" | "paid",
      paidDate: "Mar 9, 2025",
      dueDate: "Mar 10, 2025",
      description: "Chess Club - Spring Session",
      child: "Emma Johnson"
    }
  ];
  
  // Dummy data for upcoming events
  const events = [
    { 
      id: 1, 
      title: "Parent-Teacher Conference", 
      date: "Mar 22, 2025", 
      time: "4:30 PM",
      location: "Room 103",
      child: "Emma Johnson"
    },
    { 
      id: 2, 
      title: "Spring Concert", 
      date: "Mar 28, 2025", 
      time: "6:00 PM",
      location: "School Auditorium",
      child: "Both children"
    },
    { 
      id: 3, 
      title: "Field Trip - Science Museum", 
      date: "Apr 2, 2025", 
      time: "9:00 AM - 3:00 PM",
      location: "City Science Museum",
      child: "Emma Johnson"
    }
  ];
  
  // Dummy data for conversations
  const conversations = [
    {
      id: 1,
      participants: [
        {
          id: 101,
          name: "Sarah Johnson",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
          role: "parent",
        },
        {
          id: 201,
          name: "Ms. Wilson",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
          role: "teacher",
          online: true,
        }
      ],
      lastMessage: {
        content: "Emma did a great job on her math test this week...",
        timestamp: "10:23 AM",
        senderId: 201,
      },
      unreadCount: 2,
      starred: true,
      messages: [
        {
          id: 1001,
          senderId: 201,
          senderName: "Ms. Wilson",
          senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
          senderRole: "teacher",
          content: "Hello Mrs. Johnson, I wanted to let you know that Emma did a great job on her math test this week. She scored 92% and showed excellent problem-solving skills.",
          timestamp: "Yesterday, 10:23 AM",
          read: true,
        },
        {
          id: 1002,
          senderId: 101,
          senderName: "Sarah Johnson",
          senderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
          senderRole: "parent",
          content: "That's wonderful news! We've been practicing at home. Thank you for letting me know.",
          timestamp: "Yesterday, 11:45 AM",
          read: true,
        },
        {
          id: 1003,
          senderId: 201,
          senderName: "Ms. Wilson",
          senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
          senderRole: "teacher",
          content: "I also wanted to remind you about the upcoming parent-teacher conference on March 22nd at 4:30 PM. Will you be able to attend?",
          timestamp: "Yesterday, 12:30 PM",
          read: true,
        },
        {
          id: 1004,
          senderId: 101,
          senderName: "Sarah Johnson",
          senderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
          senderRole: "parent",
          content: "Yes, I've marked it on my calendar. Looking forward to discussing Emma's progress in more detail.",
          timestamp: "Yesterday, 1:15 PM",
          read: true,
        },
        {
          id: 1005,
          senderId: 201,
          senderName: "Ms. Wilson",
          senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
          senderRole: "teacher",
          content: "Great! Also, Emma has been selected to participate in the upcoming math olympiad. I've attached the permission form that needs to be signed.",
          timestamp: "Today, 9:05 AM",
          read: false,
          attachments: [
            {
              id: 1,
              name: "Math_Olympiad_Permission.pdf",
              type: "file",
              size: "245 KB",
            }
          ]
        },
        {
          id: 1006,
          senderId: 201,
          senderName: "Ms. Wilson",
          senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
          senderRole: "teacher",
          content: "Here's also a photo from yesterday's class activity where Emma was presenting her project.",
          timestamp: "Today, 9:08 AM",
          read: false,
          attachments: [
            {
              id: 2,
              name: "Emma_Project_Presentation.jpg",
              type: "image",
              size: "1.2 MB",
            }
          ]
        }
      ]
    },
    {
      id: 2,
      participants: [
        {
          id: 101,
          name: "Sarah Johnson",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
          role: "parent",
        },
        {
          id: 202,
          name: "Mr. Thompson",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
          role: "teacher",
          online: false,
        }
      ],
      lastMessage: {
        content: "I wanted to share some great news about Noah's reading...",
        timestamp: "Yesterday",
        senderId: 202,
      },
      unreadCount: 1,
      starred: false,
      messages: [
        {
          id: 2001,
          senderId: 202,
          senderName: "Mr. Thompson",
          senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
          senderRole: "teacher",
          content: "Hello Mrs. Johnson, I wanted to share some great news about Noah's reading progress. He's moved up two reading levels since the beginning of the semester!",
          timestamp: "Yesterday, 3:45 PM",
          read: false,
        }
      ]
    },
    {
      id: 3,
      participants: [
        {
          id: 101,
          name: "Sarah Johnson",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
          role: "parent",
        },
        {
          id: 203,
          name: "Principal Adams",
          avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
          role: "admin",
          online: true,
        }
      ],
      lastMessage: {
        content: "Please find attached our monthly newsletter with important...",
        timestamp: "Mar 15",
        senderId: 203,
      },
      unreadCount: 0,
      starred: true,
      messages: [
        {
          id: 3001,
          senderId: 203,
          senderName: "Principal Adams",
          senderAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
          senderRole: "admin",
          content: "Dear Parents, Please find attached our monthly newsletter with important dates and announcements for March. Note that the school will be closed on March 24th for teacher professional development.",
          timestamp: "Mar 15, 2025, 9:00 AM",
          read: true,
          attachments: [
            {
              id: 3,
              name: "March_Newsletter.pdf",
              type: "file",
              size: "1.5 MB",
            }
          ]
        },
        {
          id: 3002,
          senderId: 101,
          senderName: "Sarah Johnson",
          senderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
          senderRole: "parent",
          content: "Thank you for the newsletter. I've noted the school closure date.",
          timestamp: "Mar 15, 2025, 10:30 AM",
          read: true,
        }
      ]
    }
  ];

  return (
    <div className="container px-4 py-6 max-w-7xl mx-auto">
      <Tabs value={activeTab} defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList className="grid w-full sm:w-auto grid-cols-3 sm:grid-cols-5 h-auto gap-2">
            <TabsTrigger value="overview" className="px-4 py-2">Overview</TabsTrigger>
            <TabsTrigger value="children" className="px-4 py-2">My Children</TabsTrigger>
            <TabsTrigger value="calendar" className="px-4 py-2">Calendar</TabsTrigger>
            <TabsTrigger value="payments" className="px-4 py-2">Payments</TabsTrigger>
            <TabsTrigger value="messages" className="px-4 py-2">Messages</TabsTrigger>
          </TabsList>
          
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 gap-1">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Messages</span>
            </Button>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-4">
          {/* Welcome Card */}
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white">
            <CardContent className="pt-6 pb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Welcome, Sarah!</h2>
                  <p className="text-blue-100 mt-1">Here's what's happening with your children today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Upcoming Events</p>
                    <h3 className="text-xl md:text-2xl font-bold mt-1">{events.length}</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Messages</p>
                    <h3 className="text-xl md:text-2xl font-bold mt-1">{conversations.filter(c => c.unreadCount > 0).length}</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Payments Due</p>
                    <h3 className="text-xl md:text-2xl font-bold mt-1">{payments.filter(p => p.status === "pending" || p.status === "overdue").length}</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Notifications</p>
                    <h3 className="text-xl md:text-2xl font-bold mt-1">{notifications.filter(n => n.unread).length}</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-amber-600 dark:text-amber-300" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Children Overview */}
          <h3 className="text-lg font-semibold mt-6 mb-3">Your Children</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {children.map((child) => (
              <Card key={child.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    <div className="p-4 sm:p-6 flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={child.avatar} alt={child.name} />
                          <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{child.name}</h4>
                          <p className="text-sm text-muted-foreground">{child.grade} • {child.school}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Attendance</p>
                          <p className="text-lg font-semibold mt-1">{child.attendance}%</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Performance</p>
                          <p className="text-lg font-semibold mt-1">{child.performance}%</p>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full mt-4"
                        onClick={() => setActiveTab("children")}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Important Notifications */}
          {notifications.some(n => n.unread && n.type === "urgent") && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Important Notifications</h3>
              <Card className="border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900/20">
                <CardContent className="p-4">
                  {notifications.filter(n => n.unread && n.type === "urgent").map((notification) => (
                    <div key={notification.id} className="flex gap-3 items-start">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">{notification.title}</h4>
                        <p className="text-sm mt-1">{notification.description}</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="default">Take Action</Button>
                          <Button size="sm" variant="outline">Dismiss</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Upcoming Events */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
              <Button variant="ghost" size="sm" className="gap-1" onClick={() => setActiveTab("calendar")}>
                <span>View Calendar</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              {events.slice(0, 2).map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">{event.date} • {event.time}</p>
                          <p className="text-sm text-muted-foreground">{event.child}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="children">
          <ParentChildren children={children} />
        </TabsContent>

        <TabsContent value="calendar">
          <ParentCalendar events={events} />
        </TabsContent>

        <TabsContent value="payments">
          <ParentPayments payments={payments} />
        </TabsContent>

        <TabsContent value="messages">
          <ParentMessages conversations={conversations} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
