"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoreHorizontal, Search, Filter, PlusCircle, Users, Clock, CalendarDays, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Sample data
const classes = [
  {
    id: 1,
    name: "5A - Mathematics",
    grade: "5th Grade",
    room: "Room 101",
    schedule: "Mon, Wed, Fri 9:00 AM - 10:30 AM",
    teacher: {
      name: "Emma Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
    },
    students: 24,
    attendance: 92,
  },
  {
    id: 2,
    name: "5A - Science",
    grade: "5th Grade",
    room: "Room 102",
    schedule: "Tue, Thu 9:00 AM - 10:30 AM",
    teacher: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
    },
    students: 24,
    attendance: 95,
  },
  {
    id: 3,
    name: "5A - English",
    grade: "5th Grade",
    room: "Room 103",
    schedule: "Mon, Wed, Fri 11:00 AM - 12:30 PM",
    teacher: {
      name: "Sarah Williams",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
    },
    students: 23,
    attendance: 88,
  },
  {
    id: 4,
    name: "5A - History",
    grade: "5th Grade",
    room: "Room 104",
    schedule: "Tue, Thu 11:00 AM - 12:30 PM",
    teacher: {
      name: "David Rodriguez",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
    },
    students: 24,
    attendance: 90,
  },
  {
    id: 5,
    name: "5A - Art",
    grade: "5th Grade",
    room: "Art Studio",
    schedule: "Fri 1:30 PM - 3:00 PM",
    teacher: {
      name: "Lisa Thompson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
    },
    students: 24,
    attendance: 97,
  },
  {
    id: 6,
    name: "4B - Mathematics",
    grade: "4th Grade",
    room: "Room 105",
    schedule: "Mon, Wed, Fri 9:00 AM - 10:30 AM",
    teacher: {
      name: "Robert Johnson",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
    },
    students: 22,
    attendance: 93,
  },
  {
    id: 7,
    name: "4B - Science",
    grade: "4th Grade",
    room: "Room 106",
    schedule: "Tue, Thu 9:00 AM - 10:30 AM",
    teacher: {
      name: "Jennifer Lee",
      avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
    },
    students: 22,
    attendance: 91,
  },
  {
    id: 8,
    name: "6C - Mathematics",
    grade: "6th Grade",
    room: "Room 107",
    schedule: "Mon, Wed, Fri 9:00 AM - 10:30 AM",
    teacher: {
      name: "Thomas Wilson",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
    },
    students: 26,
    attendance: 89,
  },
];

const grades = [
  { id: 1, name: "1st Grade", classes: 4, students: 88, teachers: 4 },
  { id: 2, name: "2nd Grade", classes: 4, students: 92, teachers: 4 },
  { id: 3, name: "3rd Grade", classes: 4, students: 96, teachers: 5 },
  { id: 4, name: "4th Grade", classes: 5, students: 110, teachers: 6 },
  { id: 5, name: "5th Grade", classes: 5, students: 115, teachers: 6 },
  { id: 6, name: "6th Grade", classes: 5, students: 120, teachers: 7 },
];

export function AdminClasses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("classes");
  const [showAddClassDialog, setShowAddClassDialog] = useState(false);
  
  const filteredClasses = () => {
    if (!searchQuery) return classes;
    
    return classes.filter(cls => 
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Class Management</CardTitle>
              <CardDescription>
                Manage classes, schedules, and assignments
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Dialog open={showAddClassDialog} onOpenChange={setShowAddClassDialog}>
                <DialogTrigger asChild>
                  <Button className="gap-1">
                    <PlusCircle className="h-4 w-4" />
                    <span className="hidden sm:inline">Add Class</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Class</DialogTitle>
                    <DialogDescription>
                      Create a new class and assign a teacher.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="className">Class Name</Label>
                      <Input id="className" placeholder="e.g., 5A - Mathematics" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="grade">Grade</Label>
                      <Select defaultValue="5">
                        <SelectTrigger id="grade">
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1st Grade</SelectItem>
                          <SelectItem value="2">2nd Grade</SelectItem>
                          <SelectItem value="3">3rd Grade</SelectItem>
                          <SelectItem value="4">4th Grade</SelectItem>
                          <SelectItem value="5">5th Grade</SelectItem>
                          <SelectItem value="6">6th Grade</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="teacher">Teacher</Label>
                      <Select defaultValue="emma">
                        <SelectTrigger id="teacher">
                          <SelectValue placeholder="Select teacher" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emma">Emma Johnson</SelectItem>
                          <SelectItem value="michael">Michael Chen</SelectItem>
                          <SelectItem value="sarah">Sarah Williams</SelectItem>
                          <SelectItem value="david">David Rodriguez</SelectItem>
                          <SelectItem value="lisa">Lisa Thompson</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="room">Room</Label>
                      <Input id="room" placeholder="e.g., Room 101" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="schedule">Schedule</Label>
                      <Input id="schedule" placeholder="e.g., Mon, Wed, Fri 9:00 AM - 10:30 AM" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAddClassDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setShowAddClassDialog(false)}>
                      Create Class
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="classes" value={viewMode} onValueChange={setViewMode} className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <TabsList className="grid grid-cols-2 w-full sm:w-auto">
                <TabsTrigger value="classes">Classes</TabsTrigger>
                <TabsTrigger value="grades">Grades</TabsTrigger>
              </TabsList>
              
              <div className="flex w-full sm:w-auto gap-2">
                <div className="relative flex-1 sm:flex-none sm:min-w-[240px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search classes..."
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
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>5th Grade</DropdownMenuItem>
                    <DropdownMenuItem>4th Grade</DropdownMenuItem>
                    <DropdownMenuItem>Mathematics</DropdownMenuItem>
                    <DropdownMenuItem>Science</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Reset filters</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <TabsContent value="classes" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredClasses().map((cls) => (
                  <Card key={cls.id} className="overflow-hidden">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{cls.name}</CardTitle>
                          <CardDescription>{cls.grade} • {cls.room}</CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Edit class</DropdownMenuItem>
                            <DropdownMenuItem>View schedule</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Delete class</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center gap-3 mt-3">
                        <Avatar>
                          <AvatarImage src={cls.teacher.avatar} alt={cls.teacher.name} />
                          <AvatarFallback>{cls.teacher.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{cls.teacher.name}</p>
                          <p className="text-xs text-muted-foreground">Teacher</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{cls.students} Students</span>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Attendance</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={cls.attendance} className="h-2" />
                            <span className="text-xs">{cls.attendance}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Schedule</span>
                        </div>
                        <p className="text-xs mt-1">{cls.schedule}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="grades" className="space-y-4">
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">Grade</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Classes</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Students</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Teachers</th>
                        <th className="h-12 px-4 text-left align-middle font-medium w-[70px]"></th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {grades.map((grade) => (
                        <tr key={grade.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle font-medium">{grade.name}</td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4 text-muted-foreground" />
                              <span>{grade.classes}</span>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{grade.students}</span>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{grade.teachers}</span>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View details</DropdownMenuItem>
                                <DropdownMenuItem>View classes</DropdownMenuItem>
                                <DropdownMenuItem>View teachers</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Edit grade</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t px-6 py-4">
          <div className="text-xs text-muted-foreground">
            Showing <strong>{viewMode === "classes" ? filteredClasses().length : grades.length}</strong> of <strong>{viewMode === "classes" ? classes.length : grades.length}</strong> {viewMode}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
