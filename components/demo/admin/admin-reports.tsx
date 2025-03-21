"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Download, Filter, Printer, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, FileText } from "lucide-react";
import { DateRange } from "react-day-picker";

// Sample data for attendance report
const attendanceData = [
  { name: "1st Grade", present: 95, absent: 5, late: 2 },
  { name: "2nd Grade", present: 92, absent: 8, late: 3 },
  { name: "3rd Grade", present: 88, absent: 12, late: 5 },
  { name: "4th Grade", present: 90, absent: 10, late: 4 },
  { name: "5th Grade", present: 93, absent: 7, late: 3 },
  { name: "6th Grade", present: 91, absent: 9, late: 4 },
];

// Sample data for performance report
const performanceData = [
  { name: "1st Grade", average: 85 },
  { name: "2nd Grade", average: 82 },
  { name: "3rd Grade", average: 78 },
  { name: "4th Grade", average: 80 },
  { name: "5th Grade", average: 83 },
  { name: "6th Grade", average: 81 },
];

// Sample data for teacher performance
const teacherPerformanceData = [
  { name: "Emma Johnson", rating: 4.8, classes: 3, students: 72 },
  { name: "Michael Chen", rating: 4.7, classes: 3, students: 68 },
  { name: "Sarah Williams", rating: 4.9, classes: 2, students: 46 },
  { name: "David Rodriguez", rating: 4.6, classes: 3, students: 70 },
  { name: "Lisa Thompson", rating: 4.8, classes: 2, students: 48 },
  { name: "Robert Johnson", rating: 4.5, classes: 3, students: 66 },
  { name: "Jennifer Lee", rating: 4.7, classes: 2, students: 44 },
  { name: "Thomas Wilson", rating: 4.6, classes: 3, students: 72 },
];

// Sample data for enrollment trends
const enrollmentData = [
  { month: "Jan", students: 520 },
  { month: "Feb", students: 525 },
  { month: "Mar", students: 530 },
  { month: "Apr", students: 535 },
  { month: "May", students: 540 },
  { month: "Jun", students: 545 },
  { month: "Jul", students: 540 },
  { month: "Aug", students: 550 },
  { month: "Sep", students: 565 },
  { month: "Oct", students: 570 },
  { month: "Nov", students: 575 },
  { month: "Dec", students: 580 },
];

// Sample data for fee collection
const feeCollectionData = [
  { name: "Collected", value: 85, color: "#4ade80" },
  { name: "Pending", value: 10, color: "#facc15" },
  { name: "Overdue", value: 5, color: "#f87171" },
];

// COLORS
const COLORS = ["#4ade80", "#facc15", "#f87171", "#60a5fa"];

export function AdminReports() {
  const [reportType, setReportType] = useState("attendance");
  const [chartType, setChartType] = useState("bar");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 2, 1), // March 1, 2025
    to: new Date(2025, 2, 31), // March 31, 2025
  });
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Reports & Analytics</CardTitle>
              <CardDescription>
                View and generate reports on attendance, performance, and more
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-1">
                <Printer className="h-4 w-4" />
                <span className="hidden sm:inline">Print</span>
              </Button>
              <Button variant="outline" className="gap-1">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="col-span-1">
              <div className="space-y-2">
                <Label>Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="attendance">Attendance Report</SelectItem>
                    <SelectItem value="performance">Student Performance</SelectItem>
                    <SelectItem value="teacher">Teacher Performance</SelectItem>
                    <SelectItem value="enrollment">Enrollment Trends</SelectItem>
                    <SelectItem value="fee">Fee Collection</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="col-span-1">
              <div className="space-y-2">
                <Label>Chart Type</Label>
                <div className="flex gap-2">
                  <Button 
                    variant={chartType === "bar" ? "default" : "outline"} 
                    size="sm" 
                    className="flex-1"
                    onClick={() => setChartType("bar")}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Bar
                  </Button>
                  <Button 
                    variant={chartType === "line" ? "default" : "outline"} 
                    size="sm" 
                    className="flex-1"
                    onClick={() => setChartType("line")}
                  >
                    <LineChartIcon className="h-4 w-4 mr-2" />
                    Line
                  </Button>
                  <Button 
                    variant={chartType === "pie" ? "default" : "outline"} 
                    size="sm" 
                    className="flex-1"
                    onClick={() => setChartType("pie")}
                  >
                    <PieChartIcon className="h-4 w-4 mr-2" />
                    Pie
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="space-y-2">
                <Label>Date Range</Label>
                <DatePickerWithRange 
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-muted/40 p-6 rounded-lg">
            <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h3 className="text-lg font-medium">
                {reportType === "attendance" && "Attendance Report"}
                {reportType === "performance" && "Student Performance Report"}
                {reportType === "teacher" && "Teacher Performance Report"}
                {reportType === "enrollment" && "Enrollment Trends"}
                {reportType === "fee" && "Fee Collection Status"}
              </h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  <span>Filter</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Detailed Report</span>
                </Button>
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {(() => {
                  if (reportType === "attendance") {
                    if (chartType === "bar") {
                      return (
                        <BarChart
                          data={attendanceData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="present" fill="#4ade80" name="Present %" />
                          <Bar dataKey="absent" fill="#f87171" name="Absent %" />
                          <Bar dataKey="late" fill="#facc15" name="Late %" />
                        </BarChart>
                      );
                    } else if (chartType === "line") {
                      return (
                        <LineChart
                          data={attendanceData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="present" stroke="#4ade80" name="Present %" />
                          <Line type="monotone" dataKey="absent" stroke="#f87171" name="Absent %" />
                          <Line type="monotone" dataKey="late" stroke="#facc15" name="Late %" />
                        </LineChart>
                      );
                    } else if (chartType === "pie") {
                      return (
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Present", value: 91.5 },
                              { name: "Absent", value: 8.5 },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            <Cell fill="#4ade80" />
                            <Cell fill="#f87171" />
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      );
                    }
                  } else if (reportType === "performance") {
                    if (chartType === "bar") {
                      return (
                        <BarChart
                          data={performanceData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="average" fill="#60a5fa" name="Average Score" />
                        </BarChart>
                      );
                    } else if (chartType === "line") {
                      return (
                        <LineChart
                          data={performanceData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="average" stroke="#60a5fa" name="Average Score" />
                        </LineChart>
                      );
                    } else if (chartType === "pie") {
                      return (
                        <PieChart>
                          <Pie
                            data={performanceData.map(item => ({ name: item.name, value: item.average }))}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {performanceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      );
                    }
                  } else if (reportType === "teacher") {
                    if (chartType === "bar") {
                      return (
                        <BarChart
                          data={teacherPerformanceData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="rating" fill="#60a5fa" name="Rating" />
                        </BarChart>
                      );
                    } else if (chartType === "line") {
                      return (
                        <LineChart
                          data={teacherPerformanceData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="rating" stroke="#60a5fa" name="Rating" />
                        </LineChart>
                      );
                    } else if (chartType === "pie") {
                      return (
                        <PieChart>
                          <Pie
                            data={teacherPerformanceData.map(item => ({ name: item.name, value: item.students }))}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ${value}`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {teacherPerformanceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      );
                    }
                  } else if (reportType === "enrollment") {
                    if (chartType === "bar") {
                      return (
                        <BarChart
                          data={enrollmentData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="students" fill="#60a5fa" name="Total Students" />
                        </BarChart>
                      );
                    } else if (chartType === "line") {
                      return (
                        <LineChart
                          data={enrollmentData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="students" stroke="#60a5fa" name="Total Students" />
                        </LineChart>
                      );
                    } else if (chartType === "pie") {
                      return (
                        <PieChart>
                          <Pie
                            data={[
                              { name: "1st Grade", value: 90 },
                              { name: "2nd Grade", value: 95 },
                              { name: "3rd Grade", value: 100 },
                              { name: "4th Grade", value: 110 },
                              { name: "5th Grade", value: 115 },
                              { name: "6th Grade", value: 120 },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ${value}`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            <Cell fill="#4ade80" />
                            <Cell fill="#facc15" />
                            <Cell fill="#f87171" />
                            <Cell fill="#60a5fa" />
                            <Cell fill="#c084fc" />
                            <Cell fill="#f472b6" />
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      );
                    }
                  } else if (reportType === "fee") {
                    if (chartType === "bar") {
                      return (
                        <BarChart
                          data={feeCollectionData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="value" name="Percentage">
                            {feeCollectionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      );
                    } else if (chartType === "line") {
                      return (
                        <LineChart
                          data={feeCollectionData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="value" stroke="#60a5fa" name="Percentage" />
                        </LineChart>
                      );
                    } else if (chartType === "pie") {
                      return (
                        <PieChart>
                          <Pie
                            data={feeCollectionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ${value}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {feeCollectionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      );
                    }
                  }
                  
                  // Default fallback chart to ensure we always return a valid React element
                  return (
                    <BarChart
                      data={attendanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="present" fill="#4ade80" name="Present %" />
                      <Bar dataKey="absent" fill="#f87171" name="Absent %" />
                    </BarChart>
                  );
                })()}
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t px-6 py-4">
          <div className="text-xs text-muted-foreground">
            Data shown for period: {dateRange?.from?.toLocaleDateString()} - {dateRange?.to?.toLocaleDateString()}
          </div>
          <Button>Generate Full Report</Button>
        </CardFooter>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>
              Previously generated reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Monthly Attendance Report", date: "Mar 15, 2025", type: "PDF" },
                { name: "Student Performance Q1", date: "Mar 10, 2025", type: "Excel" },
                { name: "Teacher Evaluation Summary", date: "Mar 5, 2025", type: "PDF" },
                { name: "Fee Collection Status", date: "Mar 1, 2025", type: "Excel" },
                { name: "Enrollment Trends 2024-2025", date: "Feb 25, 2025", type: "PDF" },
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-md ${report.type === "PDF" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{report.name}</p>
                      <p className="text-xs text-muted-foreground">{report.date}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Reports</CardTitle>
            <CardDescription>
              Automatically generated reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Weekly Attendance Summary", frequency: "Every Monday", next: "Mar 25, 2025", status: "Active" },
                { name: "Monthly Performance Report", frequency: "1st of month", next: "Apr 1, 2025", status: "Active" },
                { name: "Quarterly Fee Collection", frequency: "End of quarter", next: "Jun 30, 2025", status: "Active" },
                { name: "Teacher Evaluation", frequency: "End of semester", next: "Jun 15, 2025", status: "Paused" },
                { name: "Yearly Enrollment Analysis", frequency: "Yearly", next: "Jan 15, 2026", status: "Active" },
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{report.name}</p>
                      <div className={`px-2 py-0.5 rounded-full text-xs ${report.status === "Active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                        {report.status}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <p className="text-xs text-muted-foreground">{report.frequency}</p>
                      <p className="text-xs text-muted-foreground">Next: {report.next}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper component for labels
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {children}
    </div>
  );
}
