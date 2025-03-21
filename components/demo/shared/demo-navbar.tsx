"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Bell, Menu, MessageSquare, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface DemoNavbarProps {
  userRole: "parent" | "teacher" | "admin";
  userName: string;
  userAvatar: string;
  onMenuClick: () => void;
}

export function DemoNavbar({ userRole, userName, userAvatar, onMenuClick }: DemoNavbarProps) {
  const [notifications, setNotifications] = useState(3);
  const [messages, setMessages] = useState(2);
  
  const roleColors = {
    parent: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    teacher: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    admin: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
  };
  
  const roleBadgeText = {
    parent: "Parent",
    teacher: "Teacher",
    admin: "Administrator"
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-slate-900/75 dark:border-slate-800">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>
          
          <Link href="/demo" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="text-white font-bold text-lg">C8</span>
              </motion.div>
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">Classm8</span>
          </Link>
          
          <Badge variant="outline" className={`${roleColors[userRole]} hidden sm:flex`}>
            {roleBadgeText[userRole]}
          </Badge>
        </div>
        
        <div className="relative max-w-md w-full hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-9 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                {notifications}
              </span>
            )}
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <MessageSquare className="h-5 w-5" />
            {messages > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                {messages}
              </span>
            )}
          </Button>
          
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{userRole}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
