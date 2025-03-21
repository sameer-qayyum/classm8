"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function DemoPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  
  const roles = [
    {
      id: "parent",
      title: "Parent",
      description: "Monitor your children's progress, communicate with teachers, and stay updated on school activities.",
      image: "https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      color: "from-blue-500 to-cyan-400",
      link: "/demo/parent"
    },
    {
      id: "teacher",
      title: "Teacher",
      description: "Manage your classes, track attendance, grade assignments, and communicate with parents.",
      image: "https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      color: "from-purple-500 to-pink-400",
      link: "/demo/teacher"
    },
    {
      id: "admin",
      title: "Administrator",
      description: "Oversee school operations, manage staff, monitor performance metrics, and ensure smooth functioning.",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      color: "from-emerald-500 to-teal-400",
      link: "/demo/admin"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Explore Classm8 Demo
          </h1>
          <p className="text-base md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Choose a user role to experience Classm8 from different perspectives
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {roles.map((role) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: roles.findIndex(r => r.id === role.id) * 0.1 }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card className="overflow-hidden h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48">
                  <Image
                    src={role.image}
                    alt={role.title}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-tr ${role.color} opacity-70`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-3xl font-bold text-white">{role.title}</h2>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-slate-600 dark:text-slate-300 mb-6">{role.description}</p>
                  <Link href={role.link} className="w-full">
                    <Button 
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    >
                      Enter {role.title} View
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link href="/">
            <Button variant="outline" className="mx-auto">
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
