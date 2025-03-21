"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar as CalendarIcon, Clock, Plus, ChevronLeft, 
  ChevronRight, MoreHorizontal, Check, X, Users, Trash2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface BaseEvent {
  id: number;
  title: string;
  location: string;
}

interface ExternalEvent extends BaseEvent {
  date: string;
  time: string;
}

interface InternalEvent extends BaseEvent {
  date: Date;
  type: string;
}

interface ProcessedEvent extends BaseEvent {
  date: string | Date;
  time?: string;
  type?: string;
  dateObj: Date;
}

interface TeacherScheduleProps {
  classes?: Class[];
  events?: ExternalEvent[];
}

export function TeacherSchedule({ classes = [], events = [] }: TeacherScheduleProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState("calendar");
  
  // Generate days for the current month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  // Dummy events data
  const eventsData: (InternalEvent | ExternalEvent)[] = events.length > 0 ? events : [
    {
      id: 1,
      title: "Math Class - 5A",
      date: new Date(2025, 2, 21, 9, 0), // March 21, 2025, 9:00 AM
      type: "class",
      location: "Room 105"
    },
    {
      id: 2,
      title: "Math Class - 6B",
      date: new Date(2025, 2, 21, 11, 0),
      type: "class",
      location: "Room 102"
    },
    {
      id: 3,
      title: "Parent Meeting - Emma's Parents",
      date: new Date(2025, 2, 21, 14, 0),
      type: "meeting",
      location: "Office"
    },
    {
      id: 4,
      title: "Staff Meeting",
      date: new Date(2025, 2, 21, 15, 0),
      type: "meeting",
      location: "Conference Room"
    },
    {
      id: 5,
      title: "Math Class - 5A",
      date: new Date(2025, 2, 22, 9, 0),
      type: "class",
      location: "Room 101"
    },
    {
      id: 6,
      title: "Office Hours",
      date: new Date(2025, 2, 22, 13, 0),
      type: "office-hours",
      location: "Office"
    }
  ];
  
  // Convert string dates to Date objects for internal events
  const processedEvents: ProcessedEvent[] = eventsData.map(event => {
    // If the event already has a Date object, use it
    if (event.date instanceof Date) {
      return {
        ...event,
        dateObj: event.date
      } as ProcessedEvent;
    }
    
    // Otherwise, convert string dates to Date objects
    let dateObj = new Date();
    
    if (event.date === "Today") {
      // Use today's date
    } else if (event.date === "Tomorrow") {
      dateObj.setDate(dateObj.getDate() + 1);
    } else if (typeof event.date === "string" && event.date.startsWith("Next")) {
      // Handle "Next Monday", "Next Friday", etc.
      const dayOfWeek = event.date.split(" ")[1].toLowerCase();
      const daysMap: Record<string, number> = {
        "monday": 1, "tuesday": 2, "wednesday": 3, "thursday": 4,
        "friday": 5, "saturday": 6, "sunday": 0
      };
      
      const targetDay = daysMap[dayOfWeek];
      if (targetDay !== undefined) {
        const currentDay = dateObj.getDay();
        let daysToAdd = targetDay - currentDay;
        if (daysToAdd <= 0) daysToAdd += 7;
        dateObj.setDate(dateObj.getDate() + daysToAdd + 7); // Add 7 to get to next week
      }
    } else {
      // Try to parse the date string
      try {
        if (typeof event.date === "string") {
          dateObj = new Date(event.date);
        }
      } catch (e) {
        console.error("Could not parse date:", event.date);
      }
    }
    
    return {
      ...event,
      dateObj
    } as ProcessedEvent;
  });
  
  // Availability settings
  const [availability, setAvailability] = useState([
    { day: "Monday", slots: [
      { start: "08:00", end: "16:00", available: true }
    ]},
    { day: "Tuesday", slots: [
      { start: "08:00", end: "16:00", available: true }
    ]},
    { day: "Wednesday", slots: [
      { start: "08:00", end: "16:00", available: true }
    ]},
    { day: "Thursday", slots: [
      { start: "08:00", end: "16:00", available: true }
    ]},
    { day: "Friday", slots: [
      { start: "08:00", end: "16:00", available: true }
    ]}
  ]);
  
  // Filter events for today
  const today = new Date();
  const todayEvents = processedEvents
    .filter(event => {
      const eventDate = event.dateObj || today;
      return eventDate.getDate() === today.getDate() &&
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getFullYear() === today.getFullYear();
    })
    .sort((a, b) => {
      const aTime = a.dateObj?.getTime() || 0;
      const bTime = b.dateObj?.getTime() || 0;
      return aTime - bTime;
    });
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };
  
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Schedule</h2>
          <p className="text-slate-500 dark:text-slate-400">Manage your classes and availability</p>
        </div>
        
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            New Event
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="calendar" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>{monthNames[month]} {year}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="icon" onClick={handlePrevMonth}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={handleNextMonth}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                      <div key={index} className="text-center text-sm font-medium py-1">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                      <div key={`empty-${index}`} className="h-20 p-1 border rounded-md bg-slate-50 dark:bg-slate-800/50 opacity-50"></div>
                    ))}
                    
                    {Array.from({ length: daysInMonth }).map((_, index) => {
                      const day = index + 1;
                      const date = new Date(year, month, day);
                      const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                      
                      // Get events for this day
                      const dayEvents = processedEvents.filter(event => {
                        if (!event.dateObj) return false;
                        return event.dateObj.getDate() === day &&
                          event.dateObj.getMonth() === month &&
                          event.dateObj.getFullYear() === year;
                      });
                      
                      return (
                        <div 
                          key={day} 
                          className={`h-20 p-1 border rounded-md ${isToday ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' : 'bg-white dark:bg-slate-800'} overflow-hidden flex flex-col`}
                        >
                          <div className={`text-xs font-medium self-end rounded-full w-5 h-5 flex items-center justify-center ${isToday ? 'bg-blue-500 text-white' : ''}`}>
                            {day}
                          </div>
                          
                          <div className="flex-1 overflow-hidden">
                            {dayEvents.slice(0, 2).map((event, eventIndex) => (
                              <div 
                                key={eventIndex}
                                className={`text-xs truncate mt-1 px-1 py-0.5 rounded ${
                                  event.type === 'class' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                                    : event.type === 'meeting'
                                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                }`}
                              >
                                {event.title}
                              </div>
                            ))}
                            
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-center mt-1">
                                +{dayEvents.length - 2} more
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                  <CardDescription>{formatDate(today)}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {todayEvents.length > 0 ? (
                      todayEvents.map((event, index) => (
                        <div key={index} className="flex gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <div className="flex flex-col items-center">
                            <div className="text-sm font-medium">{formatTime(event.dateObj || today)}</div>
                            <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-700 my-1"></div>
                            <div className="text-sm font-medium">{formatTime(event.dateObj || today)}</div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{event.title}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{event.location}</p>
                              </div>
                              
                              <Badge
                                className={`${
                                  event.type === 'class' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                                    : event.type === 'meeting'
                                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                }`}
                              >
                                {event.type === 'class' ? 'Class' : event.type === 'meeting' ? 'Meeting' : 'Office Hours'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-slate-500 dark:text-slate-400">
                        <CalendarIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No events scheduled for today</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Upcoming Parent Meetings</CardTitle>
                  <CardDescription>Next 7 days</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {processedEvents.filter(event => 
                      event.type === 'meeting' && 
                      event.title.includes('Parent')
                    ).length > 0 ? (
                      processedEvents
                        .filter(event => event.type === 'meeting' && event.title.includes('Parent'))
                        .map((event, index) => (
                          <div key={index} className="flex justify-between items-center p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {event.title.split('-')[1].trim().split(' ')[0][0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{event.title.split('-')[1].trim()}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  {formatDate(event.dateObj || today)} • {formatTime(event.dateObj || today)}
                                </p>
                              </div>
                            </div>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                <DropdownMenuItem>Cancel</DropdownMenuItem>
                                <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        ))
                    ) : (
                      <div className="text-center py-6 text-slate-500 dark:text-slate-400">
                        <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No parent meetings scheduled</p>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-1" />
                    Schedule New Meeting
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="availability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Office Hours & Availability</CardTitle>
              <CardDescription>Set your regular availability for meetings and office hours</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {availability.map((day, dayIndex) => (
                  <div key={dayIndex} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium">{day.day}</h3>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Time Slot
                      </Button>
                    </div>
                    
                    {day.slots.map((slot, slotIndex) => (
                      <div key={slotIndex} className="flex items-center gap-3 mb-2">
                        <div className="grid grid-cols-2 gap-2 flex-1">
                          <div>
                            <Label htmlFor={`${day.day}-start-${slotIndex}`} className="text-xs">Start Time</Label>
                            <Select defaultValue={slot.start}>
                              <SelectTrigger id={`${day.day}-start-${slotIndex}`}>
                                <SelectValue placeholder="Start time" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 24 }).map((_, hour) => (
                                  <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                                    {hour === 0 ? '12:00 AM' : hour < 12 ? `${hour}:00 AM` : hour === 12 ? '12:00 PM' : `${hour - 12}:00 PM`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor={`${day.day}-end-${slotIndex}`} className="text-xs">End Time</Label>
                            <Select defaultValue={slot.end}>
                              <SelectTrigger id={`${day.day}-end-${slotIndex}`}>
                                <SelectValue placeholder="End time" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 24 }).map((_, hour) => (
                                  <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                                    {hour === 0 ? '12:00 AM' : hour < 12 ? `${hour}:00 AM` : hour === 12 ? '12:00 PM' : `${hour - 12}:00 PM`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button 
                            variant={slot.available ? "default" : "outline"} 
                            size="sm"
                            className={slot.available ? "bg-green-600 hover:bg-green-700" : ""}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Available
                          </Button>
                          
                          <Button variant="outline" size="icon" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    {day.slots.length === 0 && (
                      <div className="text-center py-2 text-slate-500 dark:text-slate-400">
                        <p>No availability set for {day.day}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button variant="outline">Reset to Default</Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600">
                Save Availability
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Parent-Teacher Meeting Settings</CardTitle>
              <CardDescription>Configure how parents can book meetings with you</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="meeting-duration">Default Meeting Duration</Label>
                  <Select defaultValue="30">
                    <SelectTrigger id="meeting-duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="buffer-time">Buffer Time Between Meetings</Label>
                  <Select defaultValue="10">
                    <SelectTrigger id="buffer-time">
                      <SelectValue placeholder="Select buffer time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No buffer</SelectItem>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="advance-notice">Minimum Advance Notice</Label>
                  <Select defaultValue="24">
                    <SelectTrigger id="advance-notice">
                      <SelectValue placeholder="Select advance notice" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                      <SelectItem value="48">48 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="booking-window">Booking Window</Label>
                  <Select defaultValue="14">
                    <SelectTrigger id="booking-window">
                      <SelectValue placeholder="Select booking window" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600">
                Save Meeting Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
