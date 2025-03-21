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
import { MoreHorizontal, Search, UserPlus, Mail, Phone, School, MapPin, Filter } from "lucide-react";

// Sample data
const teachers = [
  {
    id: 1,
    name: "Emma Johnson",
    email: "emma.johnson@classm8.edu",
    phone: "(555) 123-4567",
    role: "Math Teacher",
    grade: "5th Grade",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@classm8.edu",
    phone: "(555) 234-5678",
    role: "Science Teacher",
    grade: "4th Grade",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  },
  {
    id: 3,
    name: "Sarah Williams",
    email: "sarah.williams@classm8.edu",
    phone: "(555) 345-6789",
    role: "English Teacher",
    grade: "6th Grade",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  },
  {
    id: 4,
    name: "David Rodriguez",
    email: "david.rodriguez@classm8.edu",
    phone: "(555) 456-7890",
    role: "History Teacher",
    grade: "5th Grade",
    status: "inactive",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    email: "lisa.thompson@classm8.edu",
    phone: "(555) 567-8901",
    role: "Art Teacher",
    grade: "All Grades",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  }
];

const parents = [
  {
    id: 1,
    name: "Robert Smith",
    email: "robert.smith@example.com",
    phone: "(555) 987-6543",
    children: ["Emily Smith (3A)", "Jacob Smith (5B)"],
    status: "active",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  },
  {
    id: 2,
    name: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    phone: "(555) 876-5432",
    children: ["Sophia Lee (4C)"],
    status: "active",
    avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  },
  {
    id: 3,
    name: "Thomas Wilson",
    email: "thomas.wilson@example.com",
    phone: "(555) 765-4321",
    children: ["Ethan Wilson (6A)"],
    status: "active",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  },
  {
    id: 4,
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    phone: "(555) 654-3210",
    children: ["Isabella Garcia (2B)", "Lucas Garcia (5A)"],
    status: "inactive",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  },
  {
    id: 5,
    name: "James Brown",
    email: "james.brown@example.com",
    phone: "(555) 543-2109",
    children: ["Oliver Brown (1A)"],
    status: "active",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  }
];

const staff = [
  {
    id: 1,
    name: "Patricia Miller",
    email: "patricia.miller@classm8.edu",
    phone: "(555) 432-1098",
    role: "Principal",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  },
  {
    id: 2,
    name: "Richard Taylor",
    email: "richard.taylor@classm8.edu",
    phone: "(555) 321-0987",
    role: "Vice Principal",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  },
  {
    id: 3,
    name: "Susan Anderson",
    email: "susan.anderson@classm8.edu",
    phone: "(555) 210-9876",
    role: "School Counselor",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  },
  {
    id: 4,
    name: "Kevin Martin",
    email: "kevin.martin@classm8.edu",
    phone: "(555) 109-8765",
    role: "IT Administrator",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  },
  {
    id: 5,
    name: "Nancy White",
    email: "nancy.white@classm8.edu",
    phone: "(555) 098-7654",
    role: "School Nurse",
    status: "inactive",
    avatar: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  }
];

// Define types for our user data
type BaseUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  avatar: string;
};

type Teacher = BaseUser & {
  role: string;
  grade: string;
};

type Parent = BaseUser & {
  children: string[];
};

type Staff = BaseUser & {
  role: string;
};

type User = Teacher | Parent | Staff;

export function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [userType, setUserType] = useState("teachers");
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  
  const filteredUsers = (): User[] => {
    let users: User[] = [];
    
    if (userType === "teachers") {
      users = teachers as Teacher[];
    } else if (userType === "parents") {
      users = parents as Parent[];
    } else if (userType === "staff") {
      users = staff as Staff[];
    }
    
    if (!searchQuery) return users;
    
    return users.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ('role' in user && user.role.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage teachers, parents, and staff accounts
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
                <DialogTrigger asChild>
                  <Button className="gap-1">
                    <UserPlus className="h-4 w-4" />
                    <span className="hidden sm:inline">Invite User</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Invite New User</DialogTitle>
                    <DialogDescription>
                      Send an invitation to join the Classm8 platform.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="user@example.com" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="role">Role</Label>
                      <Select defaultValue="teacher">
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="teacher">Teacher</SelectItem>
                          <SelectItem value="parent">Parent</SelectItem>
                          <SelectItem value="staff">Staff</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setShowInviteDialog(false)}>
                      Send Invitation
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="teachers" value={userType} onValueChange={setUserType} className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <TabsList className="grid grid-cols-3 w-full sm:w-auto">
                <TabsTrigger value="teachers">Teachers</TabsTrigger>
                <TabsTrigger value="parents">Parents</TabsTrigger>
                <TabsTrigger value="staff">Staff</TabsTrigger>
              </TabsList>
              
              <div className="flex w-full sm:w-auto gap-2">
                <div className="relative flex-1 sm:flex-none sm:min-w-[240px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
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
                    <DropdownMenuItem>Active</DropdownMenuItem>
                    <DropdownMenuItem>Inactive</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Reset filters</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <TabsContent value="teachers" className="space-y-4">
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr>
                        <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Contact</th>
                        <th className="h-12 px-4 text-left align-middle font-medium hidden md:table-cell">{userType === "teachers" ? "Grade/Subject" : userType === "parents" ? "Children" : "Role"}</th>
                        <th className="h-12 px-4 text-left align-middle font-medium hidden lg:table-cell">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium w-[70px]"></th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {filteredUsers().map((user) => (
                        <tr key={user.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                {('grade' in user) && (
                                  <p className="text-xs text-muted-foreground">{user.grade}</p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs">{user.email}</span>
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                <Phone className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs">{user.phone}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle hidden md:table-cell">
                            {('role' in user) && (
                              <div className="flex items-center gap-1">
                                <School className="h-3 w-3 text-muted-foreground" />
                                <span className="text-sm">{user.role}</span>
                              </div>
                            )}
                            {('children' in user) && (
                              <div className="flex flex-col gap-1">
                                {user.children ? user.children.map((child: string, index: number) => (
                                  <span key={index} className="text-sm">{child}</span>
                                )) : (
                                  <span className="text-sm text-muted-foreground">N/A</span>
                                )}
                              </div>
                            )}
                            {('grade' in user) && (
                              <div className="flex flex-col gap-1">
                                <span className="text-sm">{user.grade}</span>
                              </div>
                            )}
                          </td>
                          <td className="p-4 align-middle hidden lg:table-cell">
                            <Badge variant={user.status === "active" ? "default" : "secondary"}>
                              {user.status}
                            </Badge>
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
                                <DropdownMenuItem>View profile</DropdownMenuItem>
                                <DropdownMenuItem>Edit user</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Reset password</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
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
            Showing <strong>{filteredUsers().length}</strong> of <strong>{filteredUsers().length}</strong> users
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
