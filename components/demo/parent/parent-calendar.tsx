"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  child: string;
}

interface ParentCalendarProps {
  events: Event[];
}

export function ParentCalendar({ events }: ParentCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  
  // Additional dummy data for the calendar
  const calendarEvents = [
    ...events,
    { 
      id: 4, 
      title: "Math Test", 
      date: "Mar 24, 2025", 
      time: "10:00 AM",
      location: "Room 103",
      child: "Emma Johnson"
    },
    { 
      id: 5, 
      title: "School Holiday", 
      date: "Mar 31, 2025", 
      time: "All Day",
      location: "N/A",
      child: "Both children"
    },
    { 
      id: 6, 
      title: "Reading Assessment", 
      date: "Apr 5, 2025", 
      time: "9:30 AM",
      location: "Library",
      child: "Noah Johnson"
    },
    { 
      id: 7, 
      title: "Parent Association Meeting", 
      date: "Apr 8, 2025", 
      time: "6:00 PM",
      location: "School Cafeteria",
      child: "N/A"
    },
    { 
      id: 8, 
      title: "End of Term", 
      date: "Apr 15, 2025", 
      time: "3:00 PM",
      location: "N/A",
      child: "Both children"
    }
  ];
  
  // Get current month name and year
  const currentMonth = date ? date.toLocaleString('default', { month: 'long' }) : '';
  const currentYear = date ? date.getFullYear() : '';
  
  // Function to go to previous month
  const previousMonth = () => {
    if (date) {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() - 1);
      setDate(newDate);
    }
  };
  
  // Function to go to next month
  const nextMonth = () => {
    if (date) {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() + 1);
      setDate(newDate);
    }
  };
  
  // Function to go to today
  const goToToday = () => {
    setDate(new Date());
  };
  
  // Filter events for the selected date
  const selectedDateStr = date ? date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  }) : '';
  
  // Convert date strings to comparable format
  const formatDateString = (dateStr: string) => {
    const [month, day, year] = dateStr.split(', ')[0].split(' ');
    const monthMap: {[key: string]: string} = {
      'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
      'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
    };
    return `${monthMap[month]}/${day}/${year}`;
  };
  
  const eventsForSelectedDate = calendarEvents.filter(event => {
    const eventDateStr = formatDateString(event.date);
    return eventDateStr === selectedDateStr;
  });
  
  // Function to determine if a date has events
  const hasEvents = (day: Date) => {
    const dayStr = day.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    });
    
    return calendarEvents.some(event => {
      const eventDateStr = formatDateString(event.date);
      return eventDateStr === dayStr;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">School Calendar</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Subscribe
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="month" className="w-full" onValueChange={(value) => setView(value as "month" | "week" | "day")}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <TabsList className="grid w-full sm:w-auto grid-cols-3 h-auto">
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="day">Day</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <TabsContent value="month" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <div className="md:col-span-5">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{currentMonth} {currentYear}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    modifiers={{
                      hasEvents: (day) => hasEvents(day),
                    }}
                    modifiersClassNames={{
                      hasEvents: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 font-bold",
                    }}
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    {date ? date.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric' 
                    }) : ''}
                  </CardTitle>
                  <CardDescription>
                    {eventsForSelectedDate.length} {eventsForSelectedDate.length === 1 ? 'event' : 'events'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {eventsForSelectedDate.length > 0 ? (
                    <ul className="divide-y dark:divide-slate-800">
                      {eventsForSelectedDate.map((event) => (
                        <li key={event.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex flex-col items-center justify-center text-blue-600 dark:text-blue-400">
                              <CalendarIcon className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">{event.title}</h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                {event.time} • {event.location}
                              </p>
                              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                                {event.child}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-center text-slate-500 dark:text-slate-400">
                      <p>No events scheduled for this day</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Event
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="week" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Week View</CardTitle>
              <CardDescription>
                {date ? `Week of ${date.toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric' 
                })}` : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                  <div key={index} className="text-center font-medium text-sm p-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 7 }).map((_, index) => {
                  const dayDate = new Date(date || new Date());
                  const currentDay = dayDate.getDay(); // 0 = Sunday, 6 = Saturday
                  dayDate.setDate(dayDate.getDate() - currentDay + index);
                  
                  const dayEvents = calendarEvents.filter(event => {
                    const eventDateStr = formatDateString(event.date);
                    const thisDayStr = dayDate.toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: '2-digit', 
                      day: '2-digit' 
                    });
                    return eventDateStr === thisDayStr;
                  });
                  
                  const isToday = new Date().toDateString() === dayDate.toDateString();
                  
                  return (
                    <div 
                      key={index} 
                      className={`border rounded-lg p-2 min-h-[120px] ${
                        isToday ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800' : ''
                      }`}
                    >
                      <div className="text-right mb-1">
                        <span className={`text-sm inline-block rounded-full w-6 h-6 flex items-center justify-center ${
                          isToday ? 'bg-blue-500 text-white' : ''
                        }`}>
                          {dayDate.getDate()}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 3).map((event, eventIndex) => (
                          <div 
                            key={eventIndex} 
                            className="text-xs p-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 truncate"
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="text-xs text-center text-slate-500">
                            +{dayEvents.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="day" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">
                {date ? date.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                }) : ''}
              </CardTitle>
              <CardDescription>
                {eventsForSelectedDate.length} {eventsForSelectedDate.length === 1 ? 'event' : 'events'} scheduled
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Morning', 'Afternoon', 'Evening'].map((timeOfDay, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-medium mb-2">{timeOfDay}</h3>
                    <div className="space-y-2">
                      {eventsForSelectedDate
                        .filter(event => {
                          const hour = parseInt(event.time.split(':')[0]);
                          if (timeOfDay === 'Morning' && (hour < 12 || event.time.includes('AM'))) return true;
                          if (timeOfDay === 'Afternoon' && ((hour >= 12 && hour < 17) || event.time.includes('PM'))) return true;
                          if (timeOfDay === 'Evening' && (hour >= 17 || event.time.includes('PM'))) return true;
                          return false;
                        })
                        .map((event) => (
                          <Card key={event.id} className="border-l-4 border-l-blue-500">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{event.title}</h4>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    {event.time} • {event.location}
                                  </p>
                                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                                    {event.child}
                                  </p>
                                </div>
                                <Button variant="outline" size="sm">Details</Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      }
                      {eventsForSelectedDate.filter(event => {
                        const hour = parseInt(event.time.split(':')[0]);
                        if (timeOfDay === 'Morning' && (hour < 12 || event.time.includes('AM'))) return true;
                        if (timeOfDay === 'Afternoon' && ((hour >= 12 && hour < 17) || event.time.includes('PM'))) return true;
                        if (timeOfDay === 'Evening' && (hour >= 17 || event.time.includes('PM'))) return true;
                        return false;
                      }).length === 0 && (
                        <div className="text-center p-4 border border-dashed rounded-lg text-slate-500 dark:text-slate-400">
                          <p>No events scheduled for {timeOfDay.toLowerCase()}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t dark:border-slate-800 p-4">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Event for This Day
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-slate-800">
                  <th className="text-left p-4 text-sm font-medium">Event</th>
                  <th className="text-left p-4 text-sm font-medium">Date & Time</th>
                  <th className="text-left p-4 text-sm font-medium">Location</th>
                  <th className="text-left p-4 text-sm font-medium">For</th>
                  <th className="text-left p-4 text-sm font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {calendarEvents
                  .sort((a, b) => {
                    const dateA = new Date(a.date.replace(',', ''));
                    const dateB = new Date(b.date.replace(',', ''));
                    return dateA.getTime() - dateB.getTime();
                  })
                  .slice(0, 5)
                  .map((event) => (
                    <tr key={event.id} className="border-b dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-4">
                        <div className="font-medium">{event.title}</div>
                      </td>
                      <td className="p-4 text-slate-500 dark:text-slate-400">
                        <div>{event.date}</div>
                        <div className="text-sm">{event.time}</div>
                      </td>
                      <td className="p-4 text-slate-500 dark:text-slate-400">{event.location}</td>
                      <td className="p-4 text-slate-500 dark:text-slate-400">{event.child}</td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm">Details</Button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
