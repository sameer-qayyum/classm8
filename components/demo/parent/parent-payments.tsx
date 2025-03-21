"use client";

import { useState } from "react";
import { 
  Calendar, CreditCard, Download, FileText, Filter, 
  ChevronDown, ChevronUp, Check, Clock, AlertCircle, 
  DollarSign, CreditCardIcon, Building, Receipt, Plus
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Payment {
  id: number;
  type: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
  paidDate?: string;
  child: string;
  description: string;
}

interface ParentPaymentsProps {
  payments: Payment[];
}

export function ParentPayments({ payments }: ParentPaymentsProps) {
  const [filter, setFilter] = useState<"all" | "paid" | "pending" | "overdue">("all");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
  // Additional dummy data for payment methods and history
  const paymentMethods = [
    { id: 1, type: "credit", name: "Visa ending in 4242", default: true, expiry: "05/26" },
    { id: 2, type: "bank", name: "Chase Checking Account", default: false, accountNumber: "****6789" },
  ];
  
  const paymentHistory = [
    ...payments,
    { 
      id: 6, 
      type: "Field Trip", 
      amount: 25, 
      status: "paid", 
      dueDate: "Feb 15, 2025", 
      paidDate: "Feb 10, 2025",
      child: "Emma Johnson", 
      description: "Science Museum Field Trip" 
    },
    { 
      id: 7, 
      type: "Lunch", 
      amount: 45, 
      status: "paid", 
      dueDate: "Feb 1, 2025", 
      paidDate: "Jan 28, 2025",
      child: "Both children", 
      description: "February Lunch Program" 
    },
    { 
      id: 8, 
      type: "Supplies", 
      amount: 35, 
      status: "paid", 
      dueDate: "Jan 20, 2025", 
      paidDate: "Jan 18, 2025",
      child: "Noah Johnson", 
      description: "Art Class Supplies" 
    },
  ];
  
  // Calculate payment statistics
  const totalPaid = paymentHistory
    .filter(payment => payment.status === "paid")
    .reduce((sum, payment) => sum + payment.amount, 0);
    
  const totalPending = paymentHistory
    .filter(payment => payment.status === "pending")
    .reduce((sum, payment) => sum + payment.amount, 0);
    
  const totalOverdue = paymentHistory
    .filter(payment => payment.status === "overdue")
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  // Filter and sort payments
  const filteredPayments = paymentHistory.filter(payment => {
    if (filter === "all") return true;
    return payment.status === filter;
  });
  
  const sortedPayments = [...filteredPayments].sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(a.dueDate.replace(',', ''));
      const dateB = new Date(b.dueDate.replace(',', ''));
      return sortOrder === "asc" 
        ? dateA.getTime() - dateB.getTime() 
        : dateB.getTime() - dateA.getTime();
    } else {
      return sortOrder === "asc" 
        ? a.amount - b.amount 
        : b.amount - a.amount;
    }
  });
  
  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Payments & Fees</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Payment History
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
            <CreditCard className="h-4 w-4 mr-2" />
            Make Payment
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Paid</p>
                <h3 className="text-2xl font-bold text-green-700 dark:text-green-300 mt-1">${totalPaid.toFixed(2)}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-800/50 flex items-center justify-center text-green-600 dark:text-green-400">
                <Check className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Pending</p>
                <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-300 mt-1">${totalPending.toFixed(2)}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-800/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Clock className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">Overdue</p>
                <h3 className="text-2xl font-bold text-red-700 dark:text-red-300 mt-1">${totalOverdue.toFixed(2)}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-800/50 flex items-center justify-center text-red-600 dark:text-red-400">
                <AlertCircle className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto">
          <TabsTrigger value="upcoming">Upcoming Payments</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4 mt-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    {filter === "all" ? "All" : filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilter("all")}>
                    <Check className={`h-4 w-4 mr-2 ${filter === "all" ? "opacity-100" : "opacity-0"}`} />
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("paid")}>
                    <Check className={`h-4 w-4 mr-2 ${filter === "paid" ? "opacity-100" : "opacity-0"}`} />
                    Paid
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("pending")}>
                    <Check className={`h-4 w-4 mr-2 ${filter === "pending" ? "opacity-100" : "opacity-0"}`} />
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("overdue")}>
                    <Check className={`h-4 w-4 mr-2 ${filter === "overdue" ? "opacity-100" : "opacity-0"}`} />
                    Overdue
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as "date" | "amount")}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Sort by Date</SelectItem>
                  <SelectItem value="amount">Sort by Amount</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="ghost" size="sm" onClick={toggleSortOrder}>
                {sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
            
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing {filteredPayments.length} of {paymentHistory.length} payments
            </p>
          </div>
          
          <div className="space-y-4">
            {sortedPayments.length > 0 ? (
              sortedPayments.map((payment) => (
                <Card 
                  key={payment.id} 
                  className={`
                    ${payment.status === 'paid' ? 'border-l-4 border-l-green-500' : ''}
                    ${payment.status === 'pending' ? 'border-l-4 border-l-amber-500' : ''}
                    ${payment.status === 'overdue' ? 'border-l-4 border-l-red-500' : ''}
                  `}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`
                          h-10 w-10 rounded-full flex items-center justify-center
                          ${payment.status === 'paid' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : ''}
                          ${payment.status === 'pending' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : ''}
                          ${payment.status === 'overdue' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : ''}
                        `}>
                          <DollarSign className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{payment.type}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {payment.description} • {payment.child}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
                        <div className="flex flex-col items-start sm:items-end">
                          <p className="font-medium">${payment.amount.toFixed(2)}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {payment.status === 'paid' 
                              ? `Paid on ${payment.paidDate}` 
                              : `Due on ${payment.dueDate}`}
                          </p>
                        </div>
                        
                        <Badge className={`
                          ${payment.status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : ''}
                          ${payment.status === 'pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' : ''}
                          ${payment.status === 'overdue' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : ''}
                        `}>
                          {payment.status === 'paid' ? 'Paid' : ''}
                          {payment.status === 'pending' ? 'Pending' : ''}
                          {payment.status === 'overdue' ? 'Overdue' : ''}
                        </Badge>
                        
                        {payment.status !== 'paid' && (
                          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                            Pay Now
                          </Button>
                        )}
                        
                        {payment.status === 'paid' && (
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Receipt
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center p-8 border border-dashed rounded-lg">
                <p className="text-slate-500 dark:text-slate-400">No payments found</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Payment History</CardTitle>
              <CardDescription>View all your past payments</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b dark:border-slate-800">
                      <th className="text-left p-4 text-sm font-medium">Payment</th>
                      <th className="text-left p-4 text-sm font-medium">Amount</th>
                      <th className="text-left p-4 text-sm font-medium">Status</th>
                      <th className="text-left p-4 text-sm font-medium">Date</th>
                      <th className="text-left p-4 text-sm font-medium">For</th>
                      <th className="text-left p-4 text-sm font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory
                      .sort((a, b) => {
                        const dateA = new Date((a.paidDate || a.dueDate).replace(',', ''));
                        const dateB = new Date((b.paidDate || b.dueDate).replace(',', ''));
                        return dateB.getTime() - dateA.getTime();
                      })
                      .map((payment) => (
                        <tr key={payment.id} className="border-b dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="p-4">
                            <div className="font-medium">{payment.type}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">{payment.description}</div>
                          </td>
                          <td className="p-4 font-medium">${payment.amount.toFixed(2)}</td>
                          <td className="p-4">
                            <Badge className={`
                              ${payment.status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : ''}
                              ${payment.status === 'pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' : ''}
                              ${payment.status === 'overdue' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : ''}
                            `}>
                              {payment.status === 'paid' ? 'Paid' : ''}
                              {payment.status === 'pending' ? 'Pending' : ''}
                              {payment.status === 'overdue' ? 'Overdue' : ''}
                            </Badge>
                          </td>
                          <td className="p-4 text-slate-500 dark:text-slate-400">
                            {payment.status === 'paid' ? payment.paidDate : payment.dueDate}
                          </td>
                          <td className="p-4 text-slate-500 dark:text-slate-400">{payment.child}</td>
                          <td className="p-4">
                            {payment.status === 'paid' ? (
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Receipt
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline">
                                Pay Now
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="border-t dark:border-slate-800 p-4 flex justify-between items-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Showing {paymentHistory.length} payments
              </p>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Download Statement
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="methods" className="space-y-4 mt-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-lg font-semibold">Saved Payment Methods</h3>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
          
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <Card key={method.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                        {method.type === 'credit' ? (
                          <CreditCardIcon className="h-5 w-5" />
                        ) : (
                          <Building className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{method.name}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {method.type === 'credit' ? `Expires ${method.expiry}` : method.accountNumber}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {method.default && (
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                          Default
                        </Badge>
                      )}
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {!method.default && (
                            <DropdownMenuItem>Set as Default</DropdownMenuItem>
                          )}
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 dark:text-red-400">Remove</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Auto-Pay Settings</CardTitle>
              <CardDescription>Configure automatic payments for recurring fees</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Receipt className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                    <span>Tuition Fees</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-slate-500 dark:text-slate-400 mr-2">Auto-pay enabled</span>
                    <Switch checked={true} />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Receipt className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                    <span>Lunch Program</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-slate-500 dark:text-slate-400 mr-2">Auto-pay enabled</span>
                    <Switch checked={true} />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Receipt className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                    <span>Extracurricular Activities</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-slate-500 dark:text-slate-400 mr-2">Auto-pay disabled</span>
                    <Switch checked={false} />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t dark:border-slate-800 p-4">
              <Button variant="outline" className="w-full">Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Missing component definition for Switch
function Switch({ checked }: { checked: boolean }) {
  return (
    <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </div>
  );
}
