"use client";

import { useState } from "react";
import { ParentDashboard } from "@/components/demo/parent/parent-dashboard";
import { DemoNavbar } from "@/components/demo/shared/demo-navbar";
import { DemoMobileSidebar } from "@/components/demo/shared/demo-mobile-sidebar";

export default function ParentDemoPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DemoNavbar 
        userRole="parent" 
        userName="Sarah Johnson" 
        userAvatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
        onMenuClick={() => setSidebarOpen(true)}
      />
      
      <DemoMobileSidebar 
        userRole="parent"
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <ParentDashboard />
    </div>
  );
}
