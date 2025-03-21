"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Save, Upload, Download, RefreshCw, Shield, Bell, Mail, Smartphone, Globe, Users, Lock, Database } from "lucide-react";

export function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">System Settings</h2>
          <p className="text-muted-foreground">
            Manage application settings and preferences
          </p>
        </div>
        <Button className="gap-1">
          <Save className="h-4 w-4" />
          <span>Save All Changes</span>
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="md:w-64 flex-shrink-0">
          <CardContent className="p-4">
            <nav className="flex flex-col space-y-1">
              <Button 
                variant={activeTab === "general" ? "default" : "ghost"} 
                className="justify-start" 
                onClick={() => setActiveTab("general")}
              >
                <Globe className="h-4 w-4 mr-2" />
                General
              </Button>
              <Button 
                variant={activeTab === "users" ? "default" : "ghost"} 
                className="justify-start" 
                onClick={() => setActiveTab("users")}
              >
                <Users className="h-4 w-4 mr-2" />
                User Management
              </Button>
              <Button 
                variant={activeTab === "security" ? "default" : "ghost"} 
                className="justify-start" 
                onClick={() => setActiveTab("security")}
              >
                <Shield className="h-4 w-4 mr-2" />
                Security
              </Button>
              <Button 
                variant={activeTab === "notifications" ? "default" : "ghost"} 
                className="justify-start" 
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button 
                variant={activeTab === "integrations" ? "default" : "ghost"} 
                className="justify-start" 
                onClick={() => setActiveTab("integrations")}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Integrations
              </Button>
              <Button 
                variant={activeTab === "database" ? "default" : "ghost"} 
                className="justify-start" 
                onClick={() => setActiveTab("database")}
              >
                <Database className="h-4 w-4 mr-2" />
                Database
              </Button>
            </nav>
          </CardContent>
        </Card>
        
        <div className="flex-1">
          {activeTab === "general" && (
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure basic application settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">School Information</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="schoolName">School Name</Label>
                      <Input id="schoolName" defaultValue="Oakridge Elementary School" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="schoolAddress">Address</Label>
                      <Input id="schoolAddress" defaultValue="123 Education Lane, Learning City, LC 12345" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="schoolPhone">Phone Number</Label>
                        <Input id="schoolPhone" defaultValue="(555) 123-4567" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="schoolEmail">Email</Label>
                        <Input id="schoolEmail" defaultValue="info@oakridge.edu" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="schoolWebsite">Website</Label>
                      <Input id="schoolWebsite" defaultValue="https://www.oakridge.edu" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="timezone">Timezone</Label>
                        <p className="text-sm text-muted-foreground">
                          Set the default timezone for the application
                        </p>
                      </div>
                      <Select defaultValue="America/New_York">
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                          <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Date Format</Label>
                        <p className="text-sm text-muted-foreground">
                          Set the default date format
                        </p>
                      </div>
                      <Select defaultValue="MM/DD/YYYY">
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Language</Label>
                        <p className="text-sm text-muted-foreground">
                          Set the default language
                        </p>
                      </div>
                      <Select defaultValue="en">
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable maintenance mode to restrict access
                        </p>
                      </div>
                      <Switch id="maintenanceMode" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure security and access control settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Authentication</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Password Policy</Label>
                        <p className="text-sm text-muted-foreground">
                          Require strong passwords
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Require 2FA for all admin accounts
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Session Timeout</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically log out inactive users
                        </p>
                      </div>
                      <Select defaultValue="30">
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select timeout" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Data Protection</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Data Encryption</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable encryption for sensitive data
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Automatic Backups</Label>
                        <p className="text-sm text-muted-foreground">
                          Schedule regular data backups
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Backup Frequency</Label>
                        <p className="text-sm text-muted-foreground">
                          How often to back up data
                        </p>
                      </div>
                      <Select defaultValue="daily">
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure system and user notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>New User Registration</Label>
                        <p className="text-sm text-muted-foreground">
                          Send email when new users register
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>System Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Send email for important system alerts
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Weekly Reports</Label>
                        <p className="text-sm text-muted-foreground">
                          Send weekly summary reports
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">SMS Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable SMS</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow sending SMS notifications
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Emergency Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Send SMS for emergency situations
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {activeTab === "users" && (
            <Card>
              <CardHeader>
                <CardTitle>User Management Settings</CardTitle>
                <CardDescription>
                  Configure user registration and access settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Registration</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Invite-Only Registration</Label>
                        <p className="text-sm text-muted-foreground">
                          Require invitation for new users
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Admin Approval</Label>
                        <p className="text-sm text-muted-foreground">
                          Require admin approval for new accounts
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Default User Role</Label>
                        <p className="text-sm text-muted-foreground">
                          Set default role for new users
                        </p>
                      </div>
                      <Select defaultValue="teacher">
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrator</SelectItem>
                          <SelectItem value="teacher">Teacher</SelectItem>
                          <SelectItem value="parent">Parent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Access Control</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Teacher Access Level</Label>
                        <p className="text-sm text-muted-foreground">
                          Configure what teachers can access
                        </p>
                      </div>
                      <Select defaultValue="standard">
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="limited">Limited</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="extended">Extended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Parent Access Level</Label>
                        <p className="text-sm text-muted-foreground">
                          Configure what parents can access
                        </p>
                      </div>
                      <Select defaultValue="standard">
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="limited">Limited</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="extended">Extended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {activeTab === "integrations" && (
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>
                  Connect with external services and APIs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-blue-100">
                        <Mail className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <h4 className="font-medium">Email Service</h4>
                        <p className="text-sm text-muted-foreground">Connect to email provider</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Connected</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-purple-100">
                        <Smartphone className="h-5 w-5 text-purple-700" />
                      </div>
                      <div>
                        <h4 className="font-medium">SMS Provider</h4>
                        <p className="text-sm text-muted-foreground">Connect to SMS service</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Connected</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-amber-100">
                        <Globe className="h-5 w-5 text-amber-700" />
                      </div>
                      <div>
                        <h4 className="font-medium">Calendar Service</h4>
                        <p className="text-sm text-muted-foreground">Connect to calendar provider</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-red-100">
                        <Lock className="h-5 w-5 text-red-700" />
                      </div>
                      <div>
                        <h4 className="font-medium">Payment Gateway</h4>
                        <p className="text-sm text-muted-foreground">Connect to payment processor</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {activeTab === "database" && (
            <Card>
              <CardHeader>
                <CardTitle>Database Management</CardTitle>
                <CardDescription>
                  Manage database operations and backups
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-md bg-amber-50 border border-amber-200 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800">Database Operations</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      These operations can affect system data. Use with caution.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Backup Database</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Create a complete backup of the system database
                      </p>
                      <Button className="w-full gap-1" variant="outline">
                        <Download className="h-4 w-4" />
                        <span>Create Backup</span>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Restore Database</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Restore from a previous backup file
                      </p>
                      <Button className="w-full gap-1" variant="outline">
                        <Upload className="h-4 w-4" />
                        <span>Restore Backup</span>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Recent Backups</h3>
                  <div className="rounded-md border">
                    <div className="relative w-full overflow-auto">
                      <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-12 px-4 text-left align-middle font-medium">Backup Name</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Size</th>
                            <th className="h-12 px-4 text-left align-middle font-medium w-[100px]">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                          {[
                            { name: "backup_20250321_0800.sql", date: "Mar 21, 2025 08:00 AM", size: "42.5 MB" },
                            { name: "backup_20250320_0800.sql", date: "Mar 20, 2025 08:00 AM", size: "42.3 MB" },
                            { name: "backup_20250319_0800.sql", date: "Mar 19, 2025 08:00 AM", size: "42.1 MB" },
                            { name: "backup_20250318_0800.sql", date: "Mar 18, 2025 08:00 AM", size: "41.9 MB" },
                          ].map((backup, index) => (
                            <tr key={index} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                              <td className="p-4 align-middle font-medium">{backup.name}</td>
                              <td className="p-4 align-middle">{backup.date}</td>
                              <td className="p-4 align-middle">{backup.size}</td>
                              <td className="p-4 align-middle">
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="icon">
                                    <Download className="h-4 w-4" />
                                    <span className="sr-only">Download</span>
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <RefreshCw className="h-4 w-4" />
                                    <span className="sr-only">Restore</span>
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
