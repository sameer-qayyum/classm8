"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle, XCircle, Clock, Search, 
  Filter, ChevronDown, CheckCheck, RotateCcw,
  Calendar, ArrowLeft, ArrowRight, Download,
  AlertCircle
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
  attendanceToday: {
    present: number;
    absent: number;
    late: number;
  };
  upcomingAssignments: Array<{
    id: number;
    title: string;
    dueDate: string;
    type: string;
  }>;
  recentGrades: {
    average: number;
    distribution: number[];
  };
}

interface TeacherAttendanceProps {
  classes: Class[];
}

export function TeacherAttendance({ classes }: TeacherAttendanceProps) {
  const [selectedClass, setSelectedClass] = useState<number>(classes[0].id);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState<Record<number, 'present' | 'absent' | 'late' | 'excused' | 'pending'>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Dummy data for students
  const students = [
    {
      id: 101,
      name: "Emma Thompson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      grade: "5th Grade",
      attendanceHistory: [
        { date: "2025-03-20", status: "present" },
        { date: "2025-03-19", status: "present" },
        { date: "2025-03-18", status: "present" },
        { date: "2025-03-17", status: "absent" },
        { date: "2025-03-16", status: "present" },
      ]
    },
    {
      id: 102,
      name: "Jacob Martinez",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      grade: "5th Grade",
      attendanceHistory: [
        { date: "2025-03-20", status: "present" },
        { date: "2025-03-19", status: "late" },
        { date: "2025-03-18", status: "present" },
        { date: "2025-03-17", status: "present" },
        { date: "2025-03-16", status: "present" },
      ]
    },
    {
      id: 103,
      name: "Olivia Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      grade: "5th Grade",
      attendanceHistory: [
        { date: "2025-03-20", status: "present" },
        { date: "2025-03-19", status: "present" },
        { date: "2025-03-18", status: "present" },
        { date: "2025-03-17", status: "present" },
        { date: "2025-03-16", status: "present" },
      ]
    },
    {
      id: 104,
      name: "Noah Johnson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      grade: "5th Grade",
      attendanceHistory: [
        { date: "2025-03-20", status: "absent" },
        { date: "2025-03-19", status: "absent" },
        { date: "2025-03-18", status: "present" },
        { date: "2025-03-17", status: "present" },
        { date: "2025-03-16", status: "present" },
      ]
    },
    {
      id: 105,
      name: "Sophia Davis",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      grade: "5th Grade",
      attendanceHistory: [
        { date: "2025-03-20", status: "present" },
        { date: "2025-03-19", status: "present" },
        { date: "2025-03-18", status: "late" },
        { date: "2025-03-17", status: "present" },
        { date: "2025-03-16", status: "present" },
      ]
    },
    {
      id: 106,
      name: "Ethan Brown",
      avatar: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      grade: "5th Grade",
      attendanceHistory: [
        { date: "2025-03-20", status: "present" },
        { date: "2025-03-19", status: "present" },
        { date: "2025-03-18", status: "present" },
        { date: "2025-03-17", status: "present" },
        { date: "2025-03-16", status: "late" },
      ]
    }
  ];
  
  // Initialize attendance status using useEffect
  useEffect(() => {
    if (Object.keys(attendanceStatus).length === 0) {
      const initialStatus: Record<number, 'present' | 'absent' | 'late' | 'excused' | 'pending'> = {};
      students.forEach(student => {
        const todayRecord = student.attendanceHistory.find(record => record.date === "2025-03-21");
        initialStatus[student.id] = todayRecord?.status as any || 'pending';
      });
      setAttendanceStatus(initialStatus);
      setIsInitialized(true);
    }
  }, []);
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAttendanceChange = (studentId: number, status: 'present' | 'absent' | 'late' | 'excused' | 'pending') => {
    setAttendanceStatus(prev => ({
      ...prev,
      [studentId]: status
    }));
  };
  
  const handleSubmitAttendance = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1000);
  };
  
  const handleMarkAllPresent = () => {
    const updatedStatus: Record<number, 'present' | 'absent' | 'late' | 'excused' | 'pending'> = {};
    students.forEach(student => {
      updatedStatus[student.id] = 'present';
    });
    setAttendanceStatus(updatedStatus);
  };
  
  const handleResetAttendance = () => {
    const updatedStatus: Record<number, 'present' | 'absent' | 'late' | 'excused' | 'pending'> = {};
    students.forEach(student => {
      updatedStatus[student.id] = 'pending';
    });
    setAttendanceStatus(updatedStatus);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'absent':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'late':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'excused':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />;
      case 'absent':
        return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
      case 'late':
        return <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
      case 'excused':
        return <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      default:
        return null;
    }
  };
  
  const currentClass = classes.find(c => c.id === selectedClass) || classes[0];
  
  const attendanceSummary = {
    total: students.length,
    present: Object.values(attendanceStatus).filter(status => status === 'present').length,
    absent: Object.values(attendanceStatus).filter(status => status === 'absent').length,
    late: Object.values(attendanceStatus).filter(status => status === 'late').length,
    excused: Object.values(attendanceStatus).filter(status => status === 'excused').length,
    pending: Object.values(attendanceStatus).filter(status => status === 'pending').length,
  };
  
  const presentPercentage = Math.round((attendanceSummary.present / attendanceSummary.total) * 100);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Previous and next day navigation
  const navigateDate = (direction: 'prev' | 'next') => {
    const currentDate = new Date(selectedDate);
    if (direction === 'prev') {
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setSelectedDate(currentDate.toISOString().split('T')[0]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Attendance</h2>
          <p className="text-slate-500 dark:text-slate-400">Manage student attendance records</p>
        </div>
        
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button variant="outline" size="sm" onClick={() => navigateDate('prev')}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Previous Day
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigateDate('next')}>
            Next Day
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>{currentClass.name}</CardTitle>
                  <CardDescription>{formatDate(selectedDate)}</CardDescription>
                </div>
                
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <Select value={selectedClass.toString()} onValueChange={(value) => setSelectedClass(parseInt(value))}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((classItem) => (
                        <SelectItem key={classItem.id} value={classItem.id.toString()}>
                          {classItem.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <Input
                    type="search"
                    placeholder="Search students..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <Button variant="outline" size="sm" onClick={handleMarkAllPresent}>
                    <CheckCheck className="h-4 w-4 mr-1" />
                    Mark All Present
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleResetAttendance}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                </div>
              </div>
              
              <div className="rounded-md border">
                <div className="grid grid-cols-12 bg-slate-50 dark:bg-slate-800 p-3 rounded-t-md border-b">
                  <div className="col-span-6 font-medium">Student</div>
                  <div className="col-span-6 font-medium text-right sm:text-left">Attendance Status</div>
                </div>
                
                <div className="divide-y">
                  {isInitialized && filteredStudents.map((student) => (
                    <div key={student.id} className="grid grid-cols-12 p-3 items-center">
                      <div className="col-span-6 flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{student.grade}</p>
                        </div>
                      </div>
                      
                      <div className="col-span-6">
                        <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end sm:justify-start gap-2">
                          <div className="flex items-center gap-1">
                            {attendanceStatus[student.id] !== 'pending' && (
                              <Badge className={getStatusColor(attendanceStatus[student.id])}>
                                {attendanceStatus[student.id].charAt(0).toUpperCase() + attendanceStatus[student.id].slice(1)}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`p-1 ${attendanceStatus[student.id] === 'present' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' : ''}`}
                              onClick={() => handleAttendanceChange(student.id, 'present')}
                            >
                              <CheckCircle className="h-5 w-5" />
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`p-1 ${attendanceStatus[student.id] === 'absent' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : ''}`}
                              onClick={() => handleAttendanceChange(student.id, 'absent')}
                            >
                              <XCircle className="h-5 w-5" />
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`p-1 ${attendanceStatus[student.id] === 'late' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' : ''}`}
                              onClick={() => handleAttendanceChange(student.id, 'late')}
                            >
                              <Clock className="h-5 w-5" />
                            </Button>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="p-1">
                                  <ChevronDown className="h-5 w-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleAttendanceChange(student.id, 'excused')}>
                                  Mark as Excused
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAttendanceChange(student.id, 'pending')}>
                                  Clear Status
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export Attendance
              </Button>
              
              <Button 
                onClick={handleSubmitAttendance} 
                disabled={isSubmitting || attendanceSummary.pending > 0}
                className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Attendance'}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Attendance Summary</CardTitle>
              <CardDescription>Today's attendance statistics</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Present Rate</span>
                <span className="text-sm font-medium">{presentPercentage}%</span>
              </div>
              
              <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-500" 
                  style={{ width: `${presentPercentage}%` }}
                ></div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 flex flex-col items-center">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-1">
                    <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium">Present</span>
                  <span className="text-2xl font-bold">{attendanceSummary.present}</span>
                </div>
                
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 flex flex-col items-center">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/30 mb-1">
                    <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  <span className="text-sm font-medium">Absent</span>
                  <span className="text-2xl font-bold">{attendanceSummary.absent}</span>
                </div>
                
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 flex flex-col items-center">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-1">
                    <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <span className="text-sm font-medium">Late</span>
                  <span className="text-2xl font-bold">{attendanceSummary.late}</span>
                </div>
                
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 flex flex-col items-center">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-1">
                    <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm font-medium">Excused</span>
                  <span className="text-2xl font-bold">{attendanceSummary.excused}</span>
                </div>
              </div>
              
              {attendanceSummary.pending > 0 && (
                <div className="mt-4 p-3 rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-900/30">
                  <p className="text-sm text-amber-800 dark:text-amber-300 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {attendanceSummary.pending} students still need attendance marked
                  </p>
                </div>
              )}
              
              {isSubmitted && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-3 rounded-lg border border-emerald-200 bg-emerald-50 dark:bg-emerald-900/10 dark:border-emerald-900/30"
                >
                  <p className="text-sm text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Attendance successfully submitted!
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
              <CardDescription>Last 5 days</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                {students[0].attendanceHistory.map((record, index) => (
                  <div key={index} className="flex justify-between items-center p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <span className="text-sm font-medium">{formatDate(record.date)}</span>
                    <Badge className={getStatusColor(record.status)}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)} Rate: {Math.round(Math.random() * 10 + 85)}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
