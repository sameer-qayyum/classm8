"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, CalendarDays, Clock, MapPin, Users } from "lucide-react";

// Sample data
const events = [
  {
    id: 1,
    title: "Staff Meeting",
    date: new Date(2025, 2, 21), // March 21, 2025
    time: "3:30 PM - 4:30 PM",
    location: "Staff Room",
    type: "meeting",
    attendees: ["All Teachers", "Admin Staff"]
  },
  {
    id: 2,
    title: "Parent-Teacher Conferences",
    date: new Date(2025, 2, 22), // March 22, 2025
    time: "4:00 PM - 7:00 PM",
    location: "Classrooms",
    type: "conference",
    attendees: ["All Teachers", "Parents"]
  },
  {
    id: 3,
    title: "Science Fair",
    date: new Date(2025, 2, 25), // March 25, 2025
    time: "9:00 AM - 2:00 PM",
    location: "School Gymnasium",
    type: "event",
    attendees: ["All Students", "All Teachers", "Parents"]
  },
  {
    id: 4,
    title: "Professional Development Day",
    date: new Date(2025, 2, 28), // March 28, 2025
    time: "All day",
    location: "Conference Center",
    type: "training",
    attendees: ["All Teachers", "Admin Staff"]
  },
  {
    id: 5,
    title: "School Board Meeting",
    date: new Date(2025, 3, 2), // April 2, 2025
    time: "6:00 PM - 8:00 PM",
    location: "Board Room",
    type: "meeting",
    attendees: ["School Board", "Principal", "Department Heads"]
  },
  {
    id: 6,
    title: "Spring Break",
    date: new Date(2025, 3, 6), // April 6, 2025
    time: "All week",
    location: "N/A",
    type: "holiday",
    attendees: ["All Students", "All Teachers", "All Staff"]
  },
];

export function AdminCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showAddEventDialog, setShowAddEventDialog] = useState(false);
  
  // Get events for the selected date
  const selectedDateEvents = events.filter(event => 
    date && 
    event.date.getDate() === date.getDate() &&
    event.date.getMonth() === date.getMonth() &&
    event.date.getFullYear() === date.getFullYear()
  );
  
  // Get all dates with events for highlighting in the calendar
  const eventDates = events.map(event => event.date);
  
  // Function to determine if a date has an event
  const hasEvent = (day: Date) => {
    return eventDates.some(eventDate => 
      eventDate.getDate() === day.getDate() &&
      eventDate.getMonth() === day.getMonth() &&
      eventDate.getFullYear() === day.getFullYear()
    );
  };
  
  // Function to get event type color
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "conference":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "event":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "training":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case "holiday":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300";
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">School Calendar</h2>
        <Dialog open={showAddEventDialog} onOpenChange={setShowAddEventDialog}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <PlusCircle className="h-4 w-4" />
              <span>Add Event</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>
                Create a new event in the school calendar.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="eventTitle">Event Title</Label>
                <Input id="eventTitle" placeholder="e.g., Staff Meeting" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="eventDate">Date</Label>
                  <Input id="eventDate" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="eventTime">Time</Label>
                  <Input id="eventTime" placeholder="e.g., 3:30 PM - 4:30 PM" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="eventLocation">Location</Label>
                <Input id="eventLocation" placeholder="e.g., Staff Room" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="eventType">Event Type</Label>
                <Select defaultValue="meeting">
                  <SelectTrigger id="eventType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="holiday">Holiday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="eventDescription">Description</Label>
                <Textarea id="eventDescription" placeholder="Enter event details..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="eventAttendees">Attendees</Label>
                <Input id="eventAttendees" placeholder="e.g., All Teachers, Admin Staff" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddEventDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddEventDialog(false)}>
                Create Event
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>
              View and manage school events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiers={{
                hasEvent: eventDates
              }}
              modifiersClassNames={{
                hasEvent: "bg-primary/10 font-bold text-primary"
              }}
            />
            <div className="mt-4 flex flex-wrap gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs">Meeting</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-xs">Conference</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs">Event</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-xs">Training</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-xs">Holiday</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {date ? (
                <span>
                  Events for {date.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
              ) : (
                <span>Select a date to view events</span>
              )}
            </CardTitle>
            <CardDescription>
              {selectedDateEvents.length === 0 ? (
                <span>No events scheduled for this date</span>
              ) : (
                <span>{selectedDateEvents.length} event{selectedDateEvents.length !== 1 ? 's' : ''} scheduled</span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <CalendarDays className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Events Scheduled</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  There are no events scheduled for this date. Click "Add Event" to create one.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedDateEvents.map((event) => (
                  <div key={event.id} className="flex flex-col p-4 rounded-lg border">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium">{event.title}</h3>
                      <Badge className={getEventTypeColor(event.type)}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Time</p>
                          <p className="text-sm text-muted-foreground">{event.time}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Location</p>
                          <p className="text-sm text-muted-foreground">{event.location}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2 mt-4">
                      <Users className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Attendees</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {event.attendees.map((attendee, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {attendee}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm" className="text-red-600">Delete</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>
            Next 30 days of scheduled events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium">Event</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Date & Time</th>
                    <th className="h-12 px-4 text-left align-middle font-medium hidden md:table-cell">Location</th>
                    <th className="h-12 px-4 text-left align-middle font-medium hidden lg:table-cell">Type</th>
                    <th className="h-12 px-4 text-left align-middle font-medium w-[100px]">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {events
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .map((event) => (
                      <tr key={event.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle font-medium">{event.title}</td>
                        <td className="p-4 align-middle">
                          <div className="flex flex-col">
                            <span>
                              {event.date.toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </span>
                            <span className="text-xs text-muted-foreground">{event.time}</span>
                          </div>
                        </td>
                        <td className="p-4 align-middle hidden md:table-cell">{event.location}</td>
                        <td className="p-4 align-middle hidden lg:table-cell">
                          <Badge className={getEventTypeColor(event.type)}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil">
                                <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                                <path d="m15 5 4 4"/>
                              </svg>
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2">
                                <path d="M3 6h18"/>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                                <line x1="10" x2="10" y1="11" y2="17"/>
                                <line x1="14" x2="14" y1="11" y2="17"/>
                              </svg>
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
