"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Calendar, Clock, FileText, MessageSquare, 
  BookOpen, Bell, ChevronRight, Users,
  CheckCircle, XCircle, AlertCircle, User,
  BarChart3, ClipboardList, UserCheck, Settings
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { TeacherAttendance } from "./teacher-attendance";
import { TeacherGrading } from "./teacher-grading";
import { TeacherSchedule } from "./teacher-schedule";
import { TeacherAssignments } from "./teacher-assignments";
import { TeacherMessages } from "./teacher-messages";

export function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Dummy data for classes
  const classes = [
    {
      id: 1,
      name: "5A - Mathematics",
      grade: "5th Grade",
      room: "Room 105",
      time: "9:00 AM - 10:30 AM",
      students: 24,
      attendanceToday: {
        present: 22,
        absent: 1,
        late: 1
      },
      upcomingAssignments: [
        { id: 1, title: "Fractions Quiz", dueDate: "Tomorrow", type: "quiz" },
        { id: 2, title: "Geometry Worksheet", dueDate: "Friday", type: "homework" },
      ],
      recentGrades: {
        average: 85,
        distribution: [3, 8, 10, 2, 1] // A, B, C, D, F
      }
    },
    {
      id: 2,
      name: "6B - Science",
      grade: "6th Grade",
      room: "Room 203",
      time: "11:00 AM - 12:30 PM",
      students: 26,
      attendanceToday: {
        present: 24,
        absent: 2,
        late: 0
      },
      upcomingAssignments: [
        { id: 1, title: "Ecosystem Project", dueDate: "Next Monday", type: "project" },
        { id: 2, title: "Lab Report", dueDate: "Thursday", type: "report" },
      ],
      recentGrades: {
        average: 88,
        distribution: [5, 12, 7, 2, 0] // A, B, C, D, F
      }
    },
    {
      id: 3,
      name: "5C - English",
      grade: "5th Grade",
      room: "Room 108",
      time: "1:30 PM - 3:00 PM",
      students: 23,
      attendanceToday: {
        present: 21,
        absent: 1,
        late: 1
      },
      upcomingAssignments: [
        { id: 1, title: "Book Report", dueDate: "Next Friday", type: "report" },
        { id: 2, title: "Vocabulary Test", dueDate: "Wednesday", type: "test" },
      ],
      recentGrades: {
        average: 82,
        distribution: [2, 9, 8, 3, 1] // A, B, C, D, F
      }
    }
  ];
  
  // Dummy data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Faculty Meeting",
      date: "Today",
      time: "3:30 PM - 4:30 PM",
      location: "Staff Room"
    },
    {
      id: 2,
      title: "Parent-Teacher Conferences",
      date: "Tomorrow",
      time: "4:00 PM - 7:00 PM",
      location: "Classrooms"
    },
    {
      id: 3,
      title: "Professional Development Day",
      date: "Next Friday",
      time: "All Day",
      location: "Auditorium"
    }
  ];
  
  // Dummy data for recent messages
  const recentMessages = [
    {
      id: 1,
      from: "Sarah Johnson (Emma's Mom)",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      message: "Hi Mr. Wilson, Emma will be absent tomorrow due to a doctor's appointment.",
      time: "Today, 8:45 AM",
      unread: true
    },
    {
      id: 2,
      from: "Principal Roberts",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      message: "Please remember to submit your field trip proposal by Friday.",
      time: "Yesterday, 4:15 PM",
      unread: false
    },
    {
      id: 3,
      from: "Michael Brown (Jake's Dad)",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      message: "When would be a good time to discuss Jake's recent test performance?",
      time: "Yesterday, 2:30 PM",
      unread: true
    }
  ];

  return (
    <div className="container px-4 py-6 max-w-7xl mx-auto">
      <Tabs value={activeTab} defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList className="grid w-full sm:w-auto grid-cols-3 sm:grid-cols-6 h-auto gap-2">
            <TabsTrigger value="overview" className="px-3 py-2 text-xs sm:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="attendance" className="px-3 py-2 text-xs sm:text-sm">Attendance</TabsTrigger>
            <TabsTrigger value="grading" className="px-3 py-2 text-xs sm:text-sm">Grading</TabsTrigger>
            <TabsTrigger value="assignments" className="px-3 py-2 text-xs sm:text-sm">Assignments</TabsTrigger>
            <TabsTrigger value="schedule" className="px-3 py-2 text-xs sm:text-sm">Schedule</TabsTrigger>
            <TabsTrigger value="messages" className="px-3 py-2 text-xs sm:text-sm">Messages</TabsTrigger>
          </TabsList>
          
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 gap-1">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Messages</span>
            </Button>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-4">
          {/* Welcome Card */}
          <Card className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
            <CardContent className="pt-6 pb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Welcome, David!</h2>
                  <p className="text-purple-100 mt-1">Here's what's happening with your classes today</p>
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
                    <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                    <h3 className="text-xl md:text-2xl font-bold mt-1">{classes.reduce((sum, c) => sum + c.students, 0)}</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <Users className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Classes Today</p>
                    <h3 className="text-xl md:text-2xl font-bold mt-1">{classes.length}</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-pink-600 dark:text-pink-300" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Assignments Due</p>
                    <h3 className="text-xl md:text-2xl font-bold mt-1">
                      {classes.reduce((sum, c) => sum + c.upcomingAssignments.filter(a => a.dueDate === "Tomorrow").length, 0)}
                    </h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                    <ClipboardList className="h-5 w-5 text-amber-600 dark:text-amber-300" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Messages</p>
                    <h3 className="text-xl md:text-2xl font-bold mt-1">{recentMessages.filter(m => m.unread).length}</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Today's Classes */}
          <h3 className="text-lg font-semibold mt-6 mb-3">Today's Classes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.map((classItem) => (
              <Card key={classItem.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{classItem.name}</h4>
                        <p className="text-sm text-muted-foreground">{classItem.room} • {classItem.time}</p>
                      </div>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                        {classItem.students} Students
                      </Badge>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm font-medium text-muted-foreground mb-2">Today's Attendance</p>
                      <div className="flex gap-3">
                        <div className="flex items-center gap-1.5">
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          <span className="text-sm">{classItem.attendanceToday.present} Present</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          <span className="text-sm">{classItem.attendanceToday.absent} Absent</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                          <span className="text-sm">{classItem.attendanceToday.late} Late</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Upcoming Assignments</p>
                      {classItem.upcomingAssignments.map((assignment) => (
                        <div key={assignment.id} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            <span className="text-sm">{assignment.title}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{assignment.dueDate}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setActiveTab("attendance")}
                      >
                        Take Attendance
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setActiveTab("grading")}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Upcoming Events */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
              <Button variant="ghost" size="sm" className="gap-1" onClick={() => setActiveTab("schedule")}>
                <span>View Schedule</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              {upcomingEvents.slice(0, 2).map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">{event.date} • {event.time}</p>
                          <p className="text-sm text-muted-foreground">{event.location}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Messages */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Recent Messages</h3>
              <Button variant="ghost" size="sm" className="gap-1" onClick={() => setActiveTab("messages")}>
                <span>View All</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              {recentMessages.filter(m => m.unread).slice(0, 2).map((message) => (
                <Card key={message.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={message.avatar} alt={message.from} />
                        <AvatarFallback>{message.from.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{message.from}</h4>
                          {message.unread && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
                        </div>
                        <p className="text-sm mt-1">{message.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{message.time}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="attendance">
          <TeacherAttendance classes={classes} />
        </TabsContent>

        <TabsContent value="grading">
          <TeacherGrading classes={classes} />
        </TabsContent>

        <TabsContent value="assignments">
          <TeacherAssignments classes={classes} />
        </TabsContent>

        <TabsContent value="schedule">
          <TeacherSchedule events={upcomingEvents} />
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <TeacherMessages classes={classes} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
