"use client";

import { useState } from "react";
import { TeacherDashboard } from "@/components/demo/teacher/teacher-dashboard";
import { DemoNavbar } from "@/components/demo/shared/demo-navbar";
import { DemoMobileSidebar } from "@/components/demo/shared/demo-mobile-sidebar";

export default function TeacherDemoPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DemoNavbar 
        userRole="teacher" 
        userName="David Wilson" 
        userAvatar="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
        onMenuClick={() => setSidebarOpen(true)}
      />
      
      <DemoMobileSidebar 
        userRole="teacher"
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <TeacherDashboard />
    </div>
  );
}
