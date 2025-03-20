"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function UserTypesSection() {
  const userTypes = [
    {
      id: "admin",
      title: "School Administrators",
      description: "Powerful tools to manage your entire school ecosystem efficiently.",
      features: [
        "Complete school oversight dashboard",
        "Staff management and scheduling",
        "Financial reporting and analytics",
        "Campus-wide announcements",
        "System configuration and user management"
      ],
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop",
      color: "from-blue-600 to-cyan-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0 3.32 3.32 2.5 2.5 0 0 0 3.62-2.38v-.01A2.5 2.5 0 0 0 12 4.5Z" />
          <path d="M4.5 19a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.04-3 2.5 2.5 0 0 0-3.32-3.32A2.5 2.5 0 0 0 4.5 16.5V19Z" />
          <path d="M19.5 5a2.5 2.5 0 0 0-4.96.44 2.5 2.5 0 0 0 2.04 3 2.5 2.5 0 0 0 3.32-3.32A2.5 2.5 0 0 0 19.5 2.5V5Z" />
          <path d="M12 19.5a2.5 2.5 0 0 0 4.96.46 2.5 2.5 0 0 0 1.98-3 2.5 2.5 0 0 0-3.32-3.32 2.5 2.5 0 0 0-3.62 2.38v.01a2.5 2.5 0 0 0 0 3.47Z" />
        </svg>
      )
    },
    {
      id: "teachers",
      title: "Teachers",
      description: "Streamline classroom management and student engagement.",
      features: [
        "Digital attendance tracking",
        "Assignment creation and grading",
        "Student performance analytics",
        "Parent communication tools",
        "Classroom resources management"
      ],
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop",
      color: "from-purple-600 to-pink-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    {
      id: "parents",
      title: "Parents",
      description: "Stay connected with your children's education journey.",
      features: [
        "Real-time updates on attendance and grades",
        "Direct messaging with teachers",
        "Permission slips and forms",
        "Fee payment portal",
        "Multiple children management across schools"
      ],
      image: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?q=80&w=2069&auto=format&fit=crop",
      color: "from-amber-500 to-orange-600",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 font-medium text-sm mb-4">
            TAILORED EXPERIENCE
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Designed For Everyone
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Classm8 provides specialized features for different user roles in the educational ecosystem.
          </p>
        </motion.div>

        <Tabs defaultValue="admin" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12 p-1 bg-slate-100 dark:bg-slate-800 rounded-full">
            {userTypes.map((type) => (
              <TabsTrigger 
                key={type.id} 
                value={type.id} 
                className="text-lg py-3 rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <div className={`bg-gradient-to-r ${type.color} p-1.5 rounded-full text-white`}>
                    {type.icon}
                  </div>
                  <span>{type.title}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {userTypes.map((type) => (
            <TabsContent key={type.id} value={type.id} className="mt-0">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
              >
                <div className="order-2 lg:order-1">
                  <div className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-r ${type.color} text-white font-semibold mb-6`}>
                    {type.title}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800 dark:text-white">
                    Specialized Tools for {type.title}
                  </h3>
                  <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">{type.description}</p>
                  
                  <div className="space-y-4">
                    {type.features.map((feature, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start bg-slate-50 dark:bg-slate-800 p-4 rounded-lg"
                      >
                        <div className={`mr-4 p-2 rounded-full bg-gradient-to-r ${type.color} text-white flex-shrink-0`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 dark:text-white">{feature}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <button className={`px-6 py-3 rounded-full bg-gradient-to-r ${type.color} text-white font-semibold hover:shadow-lg transition-shadow`}>
                      Learn More About {type.title}
                    </button>
                  </div>
                </div>
                
                <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden order-1 lg:order-2 shadow-2xl">
                  <Image
                    src={type.image}
                    alt={type.title}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent`}></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-full bg-gradient-to-r ${type.color} text-white`}>
                          {type.icon}
                        </div>
                        <h4 className="text-white font-semibold">{type.title} Dashboard</h4>
                      </div>
                      <p className="text-white/90">Intuitive interface designed specifically for {type.title.toLowerCase()}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
