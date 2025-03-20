"use client";

import { 
  CalendarDays, 
  ClipboardCheck, 
  Clock, 
  CreditCard, 
  FileText, 
  GraduationCap, 
  Users 
} from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    {
      icon: <ClipboardCheck className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-white" />,
      title: "Attendance",
      description: "Track student attendance in real-time with automated notifications to parents for absences.",
      color: "from-blue-600 to-cyan-500",
      delay: 0.1
    },
    {
      icon: <CalendarDays className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-white" />,
      title: "School Calendar",
      description: "Comprehensive calendar system for school events, holidays, and important dates.",
      color: "from-purple-600 to-pink-500",
      delay: 0.2
    },
    {
      icon: <FileText className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-white" />,
      title: "Permission Notes",
      description: "Digital permission slips with e-signatures for field trips and special activities.",
      color: "from-amber-500 to-orange-600",
      delay: 0.3
    },
    {
      icon: <Clock className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-white" />,
      title: "Parent-Teacher Meetings",
      description: "Easy scheduling system for parent-teacher conferences with automatic reminders.",
      color: "from-emerald-500 to-teal-600",
      delay: 0.4
    },
    {
      icon: <GraduationCap className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-white" />,
      title: "Student Performance",
      description: "Detailed analytics and reporting on student academic progress and achievements.",
      color: "from-indigo-600 to-blue-700",
      delay: 0.5
    },
    {
      icon: <Users className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-white" />,
      title: "Homework",
      description: "Centralized homework assignments with submission tracking and feedback.",
      color: "from-rose-500 to-red-600",
      delay: 0.6
    },
    {
      icon: <CreditCard className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-white" />,
      title: "Fees/Payments",
      description: "Secure payment processing for school fees with detailed transaction history.",
      color: "from-violet-600 to-purple-700",
      delay: 0.7
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 font-medium text-sm mb-3">
            POWERFUL FEATURES
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Comprehensive School Management
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Classm8 provides all the tools needed to streamline school operations and enhance communication.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              transition={{ duration: 0.5, delay: feature.delay }}
              className="group relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
              
              <div className="relative p-5 md:p-6 lg:p-8 h-full flex flex-col">
                <div className="bg-white/20 rounded-xl p-3 md:p-4 w-fit mb-4 md:mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-white">{feature.title}</h3>
                <p className="text-white/90 text-sm md:text-base flex-grow">{feature.description}</p>
                
                <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-white/20">
                  <span className="inline-flex items-center text-white text-sm md:text-base font-medium">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 md:mt-20 bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl p-6 md:p-8 shadow-xl"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">500+</div>
              <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">Schools Using Classm8</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">98%</div>
              <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">Customer Satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">50k+</div>
              <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2 bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">35%</div>
              <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">Time Saved on Admin</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
