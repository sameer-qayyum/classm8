"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  BookOpen, Calendar, CheckCircle, ChevronRight, 
  Clock, FileText, MessageSquare, BarChart3, 
  User, BookOpenCheck, AlertCircle, Award
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface ChildProps {
  id: number;
  name: string;
  age: number;
  grade: string;
  school: string;
  avatar: string;
  attendance: number;
  performance: number;
  homeworkCompleted: number;
  upcomingEvents: Array<{
    id: number;
    title: string;
    date: string;
    type: string;
  }>;
  recentGrades: Array<{
    id: number;
    subject: string;
    grade: string;
    date: string;
  }>;
}

interface ParentChildrenProps {
  children: ChildProps[];
}

export function ParentChildren({ children }: ParentChildrenProps) {
  const [selectedChild, setSelectedChild] = useState<number>(children[0].id);
  
  // Additional dummy data for the selected child
  const childDetails = {
    subjects: [
      { id: 1, name: "Mathematics", teacher: "Ms. Wilson", grade: "A-", progress: 85 },
      { id: 2, name: "English", teacher: "Mr. Thompson", grade: "B+", progress: 78 },
      { id: 3, name: "Science", teacher: "Dr. Martinez", grade: "A", progress: 92 },
      { id: 4, name: "Social Studies", teacher: "Mrs. Johnson", grade: "B", progress: 75 },
      { id: 5, name: "Art", teacher: "Ms. Lee", grade: "A+", progress: 98 },
      { id: 6, name: "Physical Education", teacher: "Mr. Davis", grade: "A", progress: 90 },
    ],
    attendance: {
      present: 85,
      late: 3,
      absent: 2,
      excused: 5,
      total: 95,
      recentAbsences: [
        { date: "Mar 10, 2025", reason: "Doctor's appointment", excused: true },
        { date: "Feb 25, 2025", reason: "Illness", excused: true },
      ]
    },
    homework: [
      { id: 1, subject: "Mathematics", title: "Fractions Worksheet", dueDate: "Tomorrow", status: "completed" },
      { id: 2, subject: "English", title: "Book Report", dueDate: "Mar 25", status: "in-progress" },
      { id: 3, subject: "Science", title: "Ecosystem Project", dueDate: "Mar 28", status: "not-started" },
      { id: 4, subject: "Social Studies", title: "History Timeline", dueDate: "Apr 2", status: "completed" },
    ],
    behavior: {
      positive: [
        { id: 1, note: "Helped a classmate with their work", date: "Mar 18, 2025", teacher: "Ms. Wilson" },
        { id: 2, note: "Excellent participation in class discussion", date: "Mar 15, 2025", teacher: "Mr. Thompson" },
      ],
      needs_improvement: [
        { id: 1, note: "Talking during quiet work time", date: "Mar 14, 2025", teacher: "Dr. Martinez" },
      ]
    },
    achievements: [
      { id: 1, title: "Math Olympiad Participant", date: "Feb 2025", icon: "medal" },
      { id: 2, title: "Perfect Attendance - January", date: "Jan 2025", icon: "calendar" },
      { id: 3, title: "Student of the Month", date: "Dec 2024", icon: "star" },
    ]
  };

  const child = children.find(c => c.id === selectedChild) || children[0];

  return (
    <div className="space-y-6">
      {/* Child Selector */}
      <div className="flex flex-wrap gap-3">
        {children.map((child) => (
          <button
            key={child.id}
            onClick={() => setSelectedChild(child.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              selectedChild === child.id 
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" 
                : "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            }`}
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src={child.avatar} alt={child.name} />
              <AvatarFallback>{child.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{child.name}</span>
          </button>
        ))}
      </div>

      {/* Child Profile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={child.avatar} alt={child.name} />
                  <AvatarFallback>{child.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{child.name}</h2>
                <p className="text-slate-500 dark:text-slate-400">{child.grade} • {child.age} years old</p>
                <p className="text-slate-500 dark:text-slate-400 mt-1">{child.school}</p>
                
                <div className="grid grid-cols-3 gap-4 w-full mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{child.attendance}%</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Attendance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{child.performance}%</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Performance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{child.homeworkCompleted}%</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Homework</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Recent Grades</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y dark:divide-slate-800">
                {child.recentGrades.map((grade) => (
                  <li key={grade.id} className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-medium">{grade.subject}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{grade.date}</p>
                    </div>
                    <Badge className={`
                      ${grade.grade.startsWith('A') ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' : ''}
                      ${grade.grade.startsWith('B') ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : ''}
                      ${grade.grade.startsWith('C') ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' : ''}
                      ${grade.grade.startsWith('D') || grade.grade.startsWith('F') ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : ''}
                    `}>
                      {grade.grade}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="border-t dark:border-slate-800 p-4">
              <Button variant="outline" className="w-full">View All Grades</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Achievements</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y dark:divide-slate-800">
                {childDetails.achievements.map((achievement) => (
                  <li key={achievement.id} className="p-4 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                      <Award className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{achievement.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{achievement.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Middle and Right Columns - Detailed Info */}
        <div className="md:col-span-2 space-y-4">
          <Tabs defaultValue="academics" className="w-full">
            <TabsList className="grid grid-cols-4 w-full h-auto">
              <TabsTrigger value="academics" className="text-xs sm:text-sm">Academics</TabsTrigger>
              <TabsTrigger value="attendance" className="text-xs sm:text-sm">Attendance</TabsTrigger>
              <TabsTrigger value="homework" className="text-xs sm:text-sm">Homework</TabsTrigger>
              <TabsTrigger value="behavior" className="text-xs sm:text-sm">Behavior</TabsTrigger>
            </TabsList>
            
            <TabsContent value="academics" className="space-y-4 mt-4">
              <h3 className="text-lg font-semibold">Academic Performance</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {childDetails.subjects.map((subject) => (
                  <Card key={subject.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{subject.name}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Teacher: {subject.teacher}</p>
                        </div>
                        <Badge className={`
                          ${subject.grade.startsWith('A') ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' : ''}
                          ${subject.grade.startsWith('B') ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : ''}
                          ${subject.grade.startsWith('C') ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' : ''}
                          ${subject.grade.startsWith('D') || subject.grade.startsWith('F') ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : ''}
                        `}>
                          {subject.grade}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message Teachers
              </Button>
            </TabsContent>
            
            <TabsContent value="attendance" className="space-y-4 mt-4">
              <h3 className="text-lg font-semibold">Attendance Record</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{childDetails.attendance.present}</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Present</p>
                  </CardContent>
                </Card>
                <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{childDetails.attendance.late}</p>
                    <p className="text-sm text-amber-700 dark:text-amber-300">Late</p>
                  </CardContent>
                </Card>
                <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">{childDetails.attendance.absent}</p>
                    <p className="text-sm text-red-700 dark:text-red-300">Absent</p>
                  </CardContent>
                </Card>
                <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{childDetails.attendance.excused}</p>
                    <p className="text-sm text-purple-700 dark:text-purple-300">Excused</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Recent Absences</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {childDetails.attendance.recentAbsences.length > 0 ? (
                    <ul className="divide-y dark:divide-slate-800">
                      {childDetails.attendance.recentAbsences.map((absence, index) => (
                        <li key={index} className="p-4 flex justify-between items-center">
                          <div>
                            <h4 className="text-sm font-medium">{absence.date}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{absence.reason}</p>
                          </div>
                          <Badge variant={absence.excused ? "outline" : "default"} className={absence.excused ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : ""}>
                            {absence.excused ? "Excused" : "Unexcused"}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-center text-slate-500 dark:text-slate-400">
                      <p>No recent absences</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t dark:border-slate-800 p-4">
                  <Button variant="outline" className="w-full">Report Absence</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="homework" className="space-y-4 mt-4">
              <h3 className="text-lg font-semibold">Homework Assignments</h3>
              <div className="grid grid-cols-1 gap-4">
                {childDetails.homework.map((homework) => (
                  <Card key={homework.id} className={`
                    ${homework.status === 'completed' ? 'border-l-4 border-l-green-500' : ''}
                    ${homework.status === 'in-progress' ? 'border-l-4 border-l-amber-500' : ''}
                    ${homework.status === 'not-started' ? 'border-l-4 border-l-red-500' : ''}
                  `}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{homework.title}</h4>
                            {homework.status === 'completed' && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Subject: {homework.subject}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Due: <span className={`
                              ${homework.dueDate === 'Tomorrow' ? 'text-amber-600 dark:text-amber-400 font-medium' : ''}
                            `}>{homework.dueDate}</span>
                          </p>
                        </div>
                        <Badge className={`
                          ${homework.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : ''}
                          ${homework.status === 'in-progress' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' : ''}
                          ${homework.status === 'not-started' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : ''}
                        `}>
                          {homework.status === 'completed' ? 'Completed' : ''}
                          {homework.status === 'in-progress' ? 'In Progress' : ''}
                          {homework.status === 'not-started' ? 'Not Started' : ''}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 flex-1">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View All Assignments
                </Button>
                <Button variant="outline" className="flex-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  Homework Calendar
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="behavior" className="space-y-4 mt-4">
              <h3 className="text-lg font-semibold">Behavior Notes</h3>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-green-600 dark:text-green-400">Positive Behavior</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {childDetails.behavior.positive.length > 0 ? (
                    <ul className="divide-y dark:divide-slate-800">
                      {childDetails.behavior.positive.map((note) => (
                        <li key={note.id} className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 flex-shrink-0 mt-1">
                              <CheckCircle className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm">{note.note}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <p className="text-xs text-slate-500 dark:text-slate-400">{note.teacher}</p>
                                <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
                                <p className="text-xs text-slate-400 dark:text-slate-500">{note.date}</p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-center text-slate-500 dark:text-slate-400">
                      <p>No positive behavior notes</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-amber-600 dark:text-amber-400">Areas for Improvement</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {childDetails.behavior.needs_improvement.length > 0 ? (
                    <ul className="divide-y dark:divide-slate-800">
                      {childDetails.behavior.needs_improvement.map((note) => (
                        <li key={note.id} className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1">
                              <AlertCircle className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm">{note.note}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <p className="text-xs text-slate-500 dark:text-slate-400">{note.teacher}</p>
                                <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
                                <p className="text-xs text-slate-400 dark:text-slate-500">{note.date}</p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-center text-slate-500 dark:text-slate-400">
                      <p>No improvement notes</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                <MessageSquare className="h-4 w-4 mr-2" />
                Discuss with Teacher
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
