"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { CalendarIcon, UsersIcon, BookOpenIcon, BellIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample data
const attendanceData = [
  { name: "Mon", present: 92, absent: 8 },
  { name: "Tue", present: 95, absent: 5 },
  { name: "Wed", present: 88, absent: 12 },
  { name: "Thu", present: 91, absent: 9 },
  { name: "Fri", present: 85, absent: 15 },
];

const enrollmentData = [
  { name: "Grade 1", students: 68 },
  { name: "Grade 2", students: 72 },
  { name: "Grade 3", students: 65 },
  { name: "Grade 4", students: 78 },
  { name: "Grade 5", students: 82 },
  { name: "Grade 6", students: 75 },
];

const userDistributionData = [
  { name: "Teachers", value: 45, color: "#4f46e5" },
  { name: "Students", value: 450, color: "#06b6d4" },
  { name: "Parents", value: 680, color: "#10b981" },
  { name: "Staff", value: 25, color: "#f59e0b" },
];

const recentActivities = [
  { 
    id: 1, 
    type: "user", 
    action: "New teacher registered", 
    name: "Emma Johnson", 
    time: "10 minutes ago",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  },
  { 
    id: 2, 
    type: "calendar", 
    action: "New event created", 
    name: "Parent-Teacher Conference", 
    time: "1 hour ago",
    date: "April 15, 2025"
  },
  { 
    id: 3, 
    type: "attendance", 
    action: "Attendance report submitted", 
    name: "Grade 5A - Mathematics", 
    time: "2 hours ago",
    stats: "22 present, 2 absent"
  },
  { 
    id: 4, 
    type: "notification", 
    action: "System notification sent", 
    name: "School closure due to weather", 
    time: "Yesterday",
    recipients: "All users"
  },
];

const upcomingEvents = [
  { id: 1, title: "Staff Meeting", date: "Today", time: "3:30 PM" },
  { id: 2, title: "Parent-Teacher Conferences", date: "Tomorrow", time: "4:00 PM - 7:00 PM" },
  { id: 3, title: "Science Fair", date: "March 25", time: "9:00 AM - 2:00 PM" },
  { id: 4, title: "Professional Development Day", date: "March 28", time: "All day" },
];

export function AdminOverview() {
  const [timeRange, setTimeRange] = useState("week");
  
  return (
    <div className="space-y-4">
      {/* Quick stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <h3 className="text-2xl font-bold mt-1">450</h3>
                <p className="text-xs text-emerald-500 mt-1">+12 this month</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <UsersIcon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Classes</p>
                <h3 className="text-2xl font-bold mt-1">28</h3>
                <p className="text-xs text-emerald-500 mt-1">+2 this month</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                <BookOpenIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-300" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Attendance Rate</p>
                <h3 className="text-2xl font-bold mt-1">92%</h3>
                <p className="text-xs text-red-500 mt-1">-2% from last week</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-violet-100 dark:bg-violet-900 flex items-center justify-center">
                <CalendarIcon className="h-6 w-6 text-violet-600 dark:text-violet-300" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <h3 className="text-2xl font-bold mt-1">750</h3>
                <p className="text-xs text-emerald-500 mt-1">+25 this month</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                <UsersIcon className="h-6 w-6 text-amber-600 dark:text-amber-300" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Weekly Attendance</CardTitle>
            <CardDescription>Average attendance rate by day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Rate']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                      borderRadius: '6px',
                      border: '1px solid #e2e8f0'
                    }}
                  />
                  <Bar dataKey="present" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">User Distribution</CardTitle>
            <CardDescription>Breakdown of user types</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="h-[200px] w-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {userDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [value, 'Users']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                      borderRadius: '6px',
                      border: '1px solid #e2e8f0'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {userDistributionData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                  <span className="text-sm">{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Activity and events row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>Latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    {activity.type === "user" ? (
                      <Avatar>
                        <AvatarImage src={activity.avatar} alt={activity.name} />
                        <AvatarFallback>{activity.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ) : activity.type === "calendar" ? (
                      <CalendarIcon className="h-5 w-5 text-blue-500" />
                    ) : activity.type === "attendance" ? (
                      <UsersIcon className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <BellIcon className="h-5 w-5 text-amber-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                      <p className="font-medium">{activity.action}</p>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.name}</p>
                    {activity.stats && <p className="text-xs mt-1">{activity.stats}</p>}
                    {activity.date && <p className="text-xs mt-1">{activity.date}</p>}
                    {activity.recipients && <p className="text-xs mt-1">To: {activity.recipients}</p>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Events</CardTitle>
            <CardDescription>Next scheduled activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex flex-col p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{event.title}</h4>
                    <Badge variant={event.date === "Today" ? "default" : event.date === "Tomorrow" ? "secondary" : "outline"}>
                      {event.date}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{event.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
