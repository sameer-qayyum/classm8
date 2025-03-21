"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, Filter, ChevronDown, Download, 
  Save, Plus, Trash2, BarChart3, FileText,
  CheckCircle, AlertCircle, SortAsc, SortDesc
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

interface TeacherGradingProps {
  classes: Class[];
}

export function TeacherGrading({ classes }: TeacherGradingProps) {
  const [selectedClass, setSelectedClass] = useState<number>(classes[0].id);
  const [selectedAssignment, setSelectedAssignment] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "grade">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [grades, setGrades] = useState<Record<number, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  // Dummy data for students
  const students = [
    {
      id: 101,
      name: "Emma Thompson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      grade: "A-",
      score: 92,
    },
    {
      id: 102,
      name: "Jacob Martinez",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      grade: "B+",
      score: 88,
    },
    {
      id: 103,
      name: "Olivia Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      grade: "A",
      score: 95,
    },
    {
      id: 104,
      name: "Noah Johnson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      grade: "C+",
      score: 78,
    },
    {
      id: 105,
      name: "Sophia Davis",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      grade: "B",
      score: 85,
    },
    {
      id: 106,
      name: "Ethan Brown",
      avatar: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      grade: "B-",
      score: 82,
    }
  ];
  
  // Dummy data for assignments
  const assignments = [
    {
      id: 1,
      title: "Fractions Quiz",
      type: "quiz",
      date: "Mar 15, 2025",
      maxScore: 100,
      average: 86,
      submitted: 24,
      total: 24
    },
    {
      id: 2,
      title: "Geometry Worksheet",
      type: "homework",
      date: "Mar 12, 2025",
      maxScore: 50,
      average: 42,
      submitted: 22,
      total: 24
    },
    {
      id: 3,
      title: "Algebra Test",
      type: "test",
      date: "Mar 8, 2025",
      maxScore: 100,
      average: 81,
      submitted: 24,
      total: 24
    },
    {
      id: 4,
      title: "Word Problems",
      type: "homework",
      date: "Mar 5, 2025",
      maxScore: 20,
      average: 17,
      submitted: 23,
      total: 24
    }
  ];
  
  // Initialize grades if not set
  if (Object.keys(grades).length === 0) {
    const initialGrades: Record<number, string> = {};
    students.forEach(student => {
      initialGrades[student.id] = student.score.toString();
    });
    setGrades(initialGrades);
  }
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Sort students
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc" 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      return sortOrder === "asc" 
        ? parseInt(grades[a.id] || "0") - parseInt(grades[b.id] || "0")
        : parseInt(grades[b.id] || "0") - parseInt(grades[a.id] || "0");
    }
  });
  
  const handleGradeChange = (studentId: number, value: string) => {
    // Only allow numbers
    if (/^[0-9]*$/.test(value)) {
      setGrades(prev => ({
        ...prev,
        [studentId]: value
      }));
    }
  };
  
  const handleSaveGrades = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      
      // Reset after showing success message
      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
    }, 1000);
  };
  
  const toggleSort = (field: "name" | "grade") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };
  
  const currentClass = classes.find(c => c.id === selectedClass) || classes[0];
  const currentAssignment = assignments.find(a => a.id === selectedAssignment) || assignments[0];
  
  // Calculate statistics
  const scores = Object.values(grades).map(g => parseInt(g || "0"));
  const average = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  const highest = scores.length > 0 ? Math.max(...scores) : 0;
  const lowest = scores.length > 0 ? Math.min(...scores) : 0;
  
  // Grade distribution
  const gradeDistribution = {
    A: scores.filter(score => score >= 90).length,
    B: scores.filter(score => score >= 80 && score < 90).length,
    C: scores.filter(score => score >= 70 && score < 80).length,
    D: scores.filter(score => score >= 60 && score < 70).length,
    F: scores.filter(score => score < 60).length
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Grading</h2>
          <p className="text-slate-500 dark:text-slate-400">Manage student grades and assessments</p>
        </div>
        
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            New Assignment
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600">
            <BarChart3 className="h-4 w-4 mr-1" />
            Grade Analysis
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
                  <CardDescription>{currentAssignment.title} • {currentAssignment.date}</CardDescription>
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
                  <Select value={selectedAssignment.toString()} onValueChange={(value) => setSelectedAssignment(parseInt(value))}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select assignment" />
                    </SelectTrigger>
                    <SelectContent>
                      {assignments.map((assignment) => (
                        <SelectItem key={assignment.id} value={assignment.id.toString()}>
                          {assignment.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="rounded-md border">
                <div className="grid grid-cols-12 bg-slate-50 dark:bg-slate-800 p-3 rounded-t-md border-b">
                  <div 
                    className="col-span-7 font-medium flex items-center cursor-pointer"
                    onClick={() => toggleSort("name")}
                  >
                    Student
                    {sortBy === "name" && (
                      sortOrder === "asc" ? 
                        <SortAsc className="h-4 w-4 ml-1" /> : 
                        <SortDesc className="h-4 w-4 ml-1" />
                    )}
                  </div>
                  <div 
                    className="col-span-5 font-medium text-right sm:text-left flex items-center justify-end sm:justify-start cursor-pointer"
                    onClick={() => toggleSort("grade")}
                  >
                    Score / {currentAssignment.maxScore}
                    {sortBy === "grade" && (
                      sortOrder === "asc" ? 
                        <SortAsc className="h-4 w-4 ml-1" /> : 
                        <SortDesc className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </div>
                
                <div className="divide-y">
                  {sortedStudents.map((student) => (
                    <div key={student.id} className="grid grid-cols-12 p-3 items-center">
                      <div className="col-span-7 flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Current Grade: {student.grade}
                          </p>
                        </div>
                      </div>
                      
                      <div className="col-span-5 flex items-center justify-end sm:justify-start gap-2">
                        <Input
                          type="text"
                          value={grades[student.id] || ""}
                          onChange={(e) => handleGradeChange(student.id, e.target.value)}
                          className="w-16 text-center"
                        />
                        
                        <div className="w-8 text-center">
                          {parseInt(grades[student.id] || "0") >= 90 ? (
                            <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">A</Badge>
                          ) : parseInt(grades[student.id] || "0") >= 80 ? (
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">B</Badge>
                          ) : parseInt(grades[student.id] || "0") >= 70 ? (
                            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">C</Badge>
                          ) : parseInt(grades[student.id] || "0") >= 60 ? (
                            <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">D</Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">F</Badge>
                          )}
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
                Export Grades
              </Button>
              
              <Button 
                onClick={handleSaveGrades} 
                disabled={isSaving}
                className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
              >
                <Save className="h-4 w-4 mr-1" />
                {isSaving ? 'Saving...' : 'Save Grades'}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Grade Statistics</CardTitle>
              <CardDescription>{currentAssignment.title}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 flex flex-col items-center">
                  <span className="text-sm font-medium">Average</span>
                  <span className="text-2xl font-bold">{average}</span>
                </div>
                
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 flex flex-col items-center">
                  <span className="text-sm font-medium">Highest</span>
                  <span className="text-2xl font-bold">{highest}</span>
                </div>
                
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 flex flex-col items-center">
                  <span className="text-sm font-medium">Lowest</span>
                  <span className="text-2xl font-bold">{lowest}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Grade Distribution</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 text-center">
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">A</Badge>
                    </div>
                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500" 
                        style={{ width: `${(gradeDistribution.A / students.length) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-8 text-right text-sm">{gradeDistribution.A}</div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-8 text-center">
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">B</Badge>
                    </div>
                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ width: `${(gradeDistribution.B / students.length) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-8 text-right text-sm">{gradeDistribution.B}</div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-8 text-center">
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">C</Badge>
                    </div>
                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-500" 
                        style={{ width: `${(gradeDistribution.C / students.length) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-8 text-right text-sm">{gradeDistribution.C}</div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-8 text-center">
                      <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">D</Badge>
                    </div>
                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-orange-500" 
                        style={{ width: `${(gradeDistribution.D / students.length) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-8 text-right text-sm">{gradeDistribution.D}</div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-8 text-center">
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">F</Badge>
                    </div>
                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500" 
                        style={{ width: `${(gradeDistribution.F / students.length) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-8 text-right text-sm">{gradeDistribution.F}</div>
                  </div>
                </div>
              </div>
              
              {isSaved && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-3 rounded-lg border border-emerald-200 bg-emerald-50 dark:bg-emerald-900/10 dark:border-emerald-900/30"
                >
                  <p className="text-sm text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Grades successfully saved!
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Recent Assignments</CardTitle>
              <CardDescription>Latest graded work</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                {assignments.map((assignment) => (
                  <div 
                    key={assignment.id} 
                    className={`flex justify-between items-center p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer ${selectedAssignment === assignment.id ? 'bg-slate-50 dark:bg-slate-800/50' : ''}`}
                    onClick={() => setSelectedAssignment(assignment.id)}
                  >
                    <div className="flex items-center gap-2">
                      {assignment.type === 'quiz' || assignment.type === 'test' ? (
                        <FileText className="h-4 w-4 text-blue-500" />
                      ) : (
                        <FileText className="h-4 w-4 text-emerald-500" />
                      )}
                      <div>
                        <p className="text-sm font-medium">{assignment.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{assignment.date}</p>
                      </div>
                    </div>
                    <Badge variant="outline">
                      Avg: {assignment.average}/{assignment.maxScore}
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
