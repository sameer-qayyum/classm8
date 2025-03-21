"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Home, Users, Calendar, BookOpen, FileText, 
  MessageSquare, Bell, Settings, LogOut, BarChart3,
  UserCheck, Briefcase, CreditCard, School, ClipboardList
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DemoMobileSidebarProps {
  userRole: "parent" | "teacher" | "admin";
  isOpen: boolean;
  onClose: () => void;
}

export function DemoMobileSidebar({ userRole, isOpen, onClose }: DemoMobileSidebarProps) {
  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const parentMenuItems = [
    { icon: Home, label: "Dashboard", href: "/demo/parent" },
    { icon: Users, label: "My Children", href: "/demo/parent/children" },
    { icon: Calendar, label: "School Calendar", href: "/demo/parent/calendar" },
    { icon: BookOpen, label: "Homework", href: "/demo/parent/homework" },
    { icon: FileText, label: "Permission Notes", href: "/demo/parent/notes" },
    { icon: MessageSquare, label: "Messages", href: "/demo/parent/messages" },
    { icon: Bell, label: "Notifications", href: "/demo/parent/notifications" },
    { icon: CreditCard, label: "Payments", href: "/demo/parent/payments" },
    { icon: Settings, label: "Settings", href: "/demo/parent/settings" },
  ];

  const teacherMenuItems = [
    { icon: Home, label: "Dashboard", href: "/demo/teacher" },
    { icon: Users, label: "My Classes", href: "/demo/teacher/classes" },
    { icon: UserCheck, label: "Attendance", href: "/demo/teacher/attendance" },
    { icon: BookOpen, label: "Assignments", href: "/demo/teacher/assignments" },
    { icon: BarChart3, label: "Grades", href: "/demo/teacher/grades" },
    { icon: Calendar, label: "Schedule", href: "/demo/teacher/schedule" },
    { icon: MessageSquare, label: "Messages", href: "/demo/teacher/messages" },
    { icon: Bell, label: "Notifications", href: "/demo/teacher/notifications" },
    { icon: Settings, label: "Settings", href: "/demo/teacher/settings" },
  ];

  const adminMenuItems = [
    { icon: Home, label: "Dashboard", href: "/demo/admin" },
    { icon: School, label: "School Management", href: "/demo/admin/school" },
    { icon: Users, label: "Staff & Students", href: "/demo/admin/users" },
    { icon: ClipboardList, label: "Attendance Reports", href: "/demo/admin/attendance" },
    { icon: Briefcase, label: "Classes", href: "/demo/admin/classes" },
    { icon: Calendar, label: "Calendar", href: "/demo/admin/calendar" },
    { icon: CreditCard, label: "Finance", href: "/demo/admin/finance" },
    { icon: MessageSquare, label: "Communications", href: "/demo/admin/communications" },
    { icon: Settings, label: "Settings", href: "/demo/admin/settings" },
  ];

  const menuItems = 
    userRole === "parent" ? parentMenuItems :
    userRole === "teacher" ? teacherMenuItems :
    adminMenuItems;

  const roleColors = {
    parent: "from-blue-600 to-cyan-500",
    teacher: "from-purple-600 to-pink-500",
    admin: "from-emerald-600 to-teal-500"
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-slate-900 z-50 shadow-xl overflow-y-auto"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg overflow-hidden bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-bold">C8</span>
                  </div>
                  <span className="font-bold text-lg">Classm8</span>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="mb-6">
                <div className={`h-24 rounded-lg bg-gradient-to-r ${roleColors[userRole]} flex items-center justify-center mb-4`}>
                  <h3 className="text-white text-xl font-bold capitalize">{userRole} Portal</h3>
                </div>
              </div>
              
              <nav>
                <ul className="space-y-1">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link 
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        onClick={onClose}
                      >
                        <item.icon className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <div className="mt-8 pt-4 border-t dark:border-slate-800">
                <Link 
                  href="/demo"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-red-500"
                  onClick={onClose}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Exit Demo</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
