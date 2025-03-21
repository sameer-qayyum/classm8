"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, Search, Filter, FileText, Clock, 
  MoreHorizontal, Edit, Trash2, Eye, Download,
  CheckCircle, AlertCircle, FileUp, Calendar
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
import { Progress } from "@/components/ui/progress";

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

interface TeacherAssignmentsProps {
  classes: Class[];
}

export function TeacherAssignments({ classes }: TeacherAssignmentsProps) {
  const [selectedClass, setSelectedClass] = useState<number>(classes[0].id);
  const [selectedTab, setSelectedTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  
  // Dummy data for assignments
  const assignments = [
    {
      id: 1,
      title: "Fractions Quiz",
      description: "Quiz covering addition and subtraction of fractions with different denominators.",
      type: "quiz",
      class: "5A - Mathematics",
      classId: 1,
      dueDate: "2025-03-25",
      createdDate: "2025-03-18",
      status: "active",
      maxScore: 100,
      submissions: 18,
      totalStudents: 24,
      attachments: [
        { name: "fractions_quiz.pdf", size: "245 KB" }
      ]
    },
    {
      id: 2,
      title: "Geometry Worksheet",
      description: "Practice worksheet on calculating area and perimeter of complex shapes.",
      type: "homework",
      class: "5A - Mathematics",
      classId: 1,
      dueDate: "2025-03-22",
      createdDate: "2025-03-15",
      status: "active",
      maxScore: 50,
      submissions: 20,
      totalStudents: 24,
      attachments: [
        { name: "geometry_worksheet.pdf", size: "320 KB" },
        { name: "reference_sheet.pdf", size: "156 KB" }
      ]
    },
    {
      id: 3,
      title: "Algebra Test",
      description: "End of unit test covering basic algebraic expressions and equations.",
      type: "test",
      class: "6B - Mathematics",
      classId: 2,
      dueDate: "2025-03-28",
      createdDate: "2025-03-14",
      status: "active",
      maxScore: 100,
      submissions: 0,
      totalStudents: 26,
      attachments: [
        { name: "algebra_test_prep.pdf", size: "410 KB" }
      ]
    },
    {
      id: 4,
      title: "Word Problems",
      description: "Set of 10 word problems applying mathematical concepts to real-world scenarios.",
      type: "homework",
      class: "5A - Mathematics",
      classId: 1,
      dueDate: "2025-03-10",
      createdDate: "2025-03-03",
      status: "graded",
      maxScore: 20,
      submissions: 23,
      totalStudents: 24,
      attachments: [
        { name: "word_problems.pdf", size: "180 KB" }
      ]
    },
    {
      id: 5,
      title: "Multiplication Practice",
      description: "Practice worksheet for multi-digit multiplication.",
      type: "homework",
      class: "5A - Mathematics",
      classId: 1,
      dueDate: "2025-03-05",
      createdDate: "2025-02-28",
      status: "graded",
      maxScore: 25,
      submissions: 24,
      totalStudents: 24,
      attachments: [
        { name: "multiplication_practice.pdf", size: "150 KB" }
      ]
    }
  ];
  
  // Filter assignments based on selected class, tab, and search query
  const filteredAssignments = assignments.filter(assignment => {
    // Filter by class
    if (selectedClass !== 0 && assignment.classId !== selectedClass) {
      return false;
    }
    
    // Filter by tab (status)
    if (selectedTab === "active" && assignment.status !== "active") {
      return false;
    }
    if (selectedTab === "graded" && assignment.status !== "graded") {
      return false;
    }
    
    // Filter by type
    if (filterType !== "all" && assignment.type !== filterType) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !assignment.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return "Overdue";
    } else if (diffDays === 0) {
      return "Due today";
    } else if (diffDays === 1) {
      return "Due tomorrow";
    } else {
      return `${diffDays} days left`;
    }
  };
  
  const getStatusColor = (status: string, dueDate: string) => {
    if (status === "graded") {
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300";
    }
    
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    } else if (diffDays <= 2) {
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
    } else {
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quiz':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'test':
        return <FileText className="h-4 w-4 text-purple-500" />;
      case 'homework':
        return <FileText className="h-4 w-4 text-emerald-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'quiz':
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case 'test':
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case 'homework':
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
    }
  };
  
  const currentClass = classes.find(c => c.id === selectedClass) || classes[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Assignments</h2>
          <p className="text-slate-500 dark:text-slate-400">Manage homework, quizzes, and tests</p>
        </div>
        
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600">
            <Plus className="h-4 w-4 mr-1" />
            Create Assignment
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <Tabs defaultValue="active" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="graded">Graded</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <Select value={selectedClass.toString()} onValueChange={(value) => setSelectedClass(parseInt(value))}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">All Classes</SelectItem>
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
                    placeholder="Search assignments..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="homework">Homework</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="test">Test</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {filteredAssignments.length > 0 ? (
                <div className="space-y-3">
                  {filteredAssignments.map((assignment) => (
                    <Card key={assignment.id} className="overflow-hidden">
                      <div className="flex flex-col sm:flex-row">
                        <div className="flex-1 p-4">
                          <div className="flex justify-between">
                            <div className="flex items-start gap-3">
                              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800">
                                {getTypeIcon(assignment.type)}
                              </div>
                              
                              <div>
                                <h3 className="font-medium">{assignment.title}</h3>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  <Badge variant="outline">{assignment.class}</Badge>
                                  <Badge className={getTypeColor(assignment.type)}>
                                    {assignment.type.charAt(0).toUpperCase() + assignment.type.slice(1)}
                                  </Badge>
                                  <Badge className={getStatusColor(assignment.status, assignment.dueDate)}>
                                    {assignment.status === "graded" ? "Graded" : getDaysRemaining(assignment.dueDate)}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                {assignment.status === "active" && (
                                  <DropdownMenuItem>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Mark as Graded
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                            {assignment.description}
                          </p>
                          
                          <div className="mt-3">
                            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                              <span>Submissions: {assignment.submissions}/{assignment.totalStudents}</span>
                              <span>{Math.round((assignment.submissions / assignment.totalStudents) * 100)}%</span>
                            </div>
                            <Progress value={(assignment.submissions / assignment.totalStudents) * 100} className="h-1" />
                          </div>
                        </div>
                        
                        <div className="sm:w-48 p-4 bg-slate-50 dark:bg-slate-800/50 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                              <span>Due Date:</span>
                            </div>
                            <p className="font-medium">{formatDate(assignment.dueDate)}</p>
                            
                            <div className="flex items-center gap-1 text-sm mt-3">
                              <FileUp className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                              <span>Attachments:</span>
                            </div>
                            <div className="space-y-1 mt-1">
                              {assignment.attachments.map((attachment, index) => (
                                <div key={index} className="text-sm flex items-center">
                                  <FileText className="h-3 w-3 mr-1 text-slate-500 dark:text-slate-400" />
                                  <span className="truncate">{attachment.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <Button variant="outline" size="sm" className="w-full">
                              {assignment.status === "graded" ? (
                                <>
                                  <Eye className="h-4 w-4 mr-1" />
                                  View Grades
                                </>
                              ) : (
                                <>
                                  <Eye className="h-4 w-4 mr-1" />
                                  View Submissions
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                  <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-lg font-medium">No assignments found</p>
                  <p className="text-sm">Try changing your filters or create a new assignment</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Assignment Stats</CardTitle>
              <CardDescription>Overview of your assignments</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 flex flex-col items-center">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-1">
                    <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm font-medium">Active</span>
                  <span className="text-2xl font-bold">{assignments.filter(a => a.status === "active").length}</span>
                </div>
                
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 flex flex-col items-center">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-1">
                    <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium">Graded</span>
                  <span className="text-2xl font-bold">{assignments.filter(a => a.status === "graded").length}</span>
                </div>
                
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 flex flex-col items-center">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-1">
                    <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <span className="text-sm font-medium">Due Soon</span>
                  <span className="text-2xl font-bold">
                    {assignments.filter(a => {
                      if (a.status !== "active") return false;
                      const today = new Date();
                      const due = new Date(a.dueDate);
                      const diffTime = due.getTime() - today.getTime();
                      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                      return diffDays <= 3 && diffDays >= 0;
                    }).length}
                  </span>
                </div>
                
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 flex flex-col items-center">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/30 mb-1">
                    <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  <span className="text-sm font-medium">Overdue</span>
                  <span className="text-2xl font-bold">
                    {assignments.filter(a => {
                      if (a.status !== "active") return false;
                      const today = new Date();
                      const due = new Date(a.dueDate);
                      const diffTime = due.getTime() - today.getTime();
                      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                      return diffDays < 0;
                    }).length}
                  </span>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Assignment Types</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-20 text-sm">Homework</div>
                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500" 
                        style={{ width: `${(assignments.filter(a => a.type === "homework").length / assignments.length) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-8 text-right text-sm">{assignments.filter(a => a.type === "homework").length}</div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-20 text-sm">Quiz</div>
                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ width: `${(assignments.filter(a => a.type === "quiz").length / assignments.length) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-8 text-right text-sm">{assignments.filter(a => a.type === "quiz").length}</div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-20 text-sm">Test</div>
                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500" 
                        style={{ width: `${(assignments.filter(a => a.type === "test").length / assignments.length) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-8 text-right text-sm">{assignments.filter(a => a.type === "test").length}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Upcoming Due Dates</CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                {assignments
                  .filter(a => {
                    if (a.status !== "active") return false;
                    const today = new Date();
                    const due = new Date(a.dueDate);
                    const diffTime = due.getTime() - today.getTime();
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return diffDays >= 0 && diffDays <= 7;
                  })
                  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                  .map((assignment) => (
                    <div key={assignment.id} className="flex justify-between items-center p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(assignment.type)}
                        <div>
                          <p className="text-sm font-medium">{assignment.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {formatDate(assignment.dueDate)}
                          </p>
                        </div>
                      </div>
                      
                      <Badge className={getStatusColor(assignment.status, assignment.dueDate)}>
                        {getDaysRemaining(assignment.dueDate)}
                      </Badge>
                    </div>
                  ))}
                
                {assignments.filter(a => {
                  if (a.status !== "active") return false;
                  const today = new Date();
                  const due = new Date(a.dueDate);
                  const diffTime = due.getTime() - today.getTime();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  return diffDays >= 0 && diffDays <= 7;
                }).length === 0 && (
                  <div className="text-center py-6 text-slate-500 dark:text-slate-400">
                    <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No assignments due in the next 7 days</p>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4">
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-4 w-4 mr-1" />
                Export Assignment Schedule
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
