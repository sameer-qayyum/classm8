"use client";

import { useState } from "react";
import { AdminDashboard } from "@/components/demo/admin/admin-dashboard";
import { DemoNavbar } from "@/components/demo/shared/demo-navbar";
import { DemoMobileSidebar } from "@/components/demo/shared/demo-mobile-sidebar";

export default function AdminDemoPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DemoNavbar 
        userRole="admin" 
        userName="Michael Roberts" 
        userAvatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
        onMenuClick={() => setSidebarOpen(true)}
      />
      
      <DemoMobileSidebar 
        userRole="admin"
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <AdminDashboard />
    </div>
  );
}
