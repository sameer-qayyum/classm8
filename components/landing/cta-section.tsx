"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useId } from "react";

export default function CTASection() {
  // Define fixed positions for the animated shapes to prevent hydration errors
  const bubbles = [
    { width: 120, height: 180, top: 82, left: 41, animX: 20, animY: -15, duration: 12 },
    { width: 90, height: 150, top: 43, left: 10, animX: -25, animY: 20, duration: 15 },
    { width: 95, height: 75, top: 10, left: 22, animX: 15, animY: 25, duration: 10 }
  ];

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 opacity-90"></div>
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {bubbles.map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-10"
            style={{
              width: `${bubble.width}px`,
              height: `${bubble.height}px`,
              top: `${bubble.top}%`,
              left: `${bubble.left}%`,
            }}
            animate={{
              x: [0, bubble.animX],
              y: [0, bubble.animY],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-10 shadow-2xl border border-white/20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-white font-medium text-sm mb-4">
                    GET STARTED TODAY
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    Transform Your School Management
                  </h2>
                  <p className="text-base md:text-lg text-white/90 mb-6 leading-relaxed">
                    Join hundreds of educational institutions that have streamlined their operations with Classm8. Our team is ready to guide you through every step of the implementation process.
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button size="default" className="bg-white text-indigo-700 hover:bg-white/90 rounded-full px-6 font-medium">
                      Request Demo
                    </Button>
                    <Button size="default" variant="outline" className="text-white border-white/30 hover:bg-white/10 rounded-full px-6 font-medium">
                      Contact Sales
                    </Button>
                  </div>
                  
                  <div className="mt-6 flex items-center">
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="relative w-8 h-8 rounded-full border-2 border-indigo-600 overflow-hidden">
                          <img 
                            src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 1}.jpg`} 
                            alt={`User ${i}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="ml-3">
                      <p className="text-white text-sm font-medium">Join 2,000+ educators</p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-white text-xs">4.9/5</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative mt-6 lg:mt-0"
              >
                <div className="absolute -top-4 -left-4 -right-4 -bottom-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl transform rotate-2 opacity-70 hidden sm:block"></div>
                <div className="relative bg-slate-900 rounded-xl p-5 border border-slate-700 shadow-xl">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-white font-bold text-lg">Request a Demo</h3>
                    <div className="bg-indigo-600 p-1.5 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-white/80 text-xs font-medium mb-1">School Name</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter your school name"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-xs font-medium mb-1">Email Address</label>
                      <input 
                        type="email" 
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-xs font-medium mb-1">Role</label>
                      <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <option>Administrator</option>
                        <option>Teacher</option>
                        <option>IT Staff</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-white/80 text-xs font-medium mb-1">School Size</label>
                      <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <option>Less than 100 students</option>
                        <option>100-500 students</option>
                        <option>500-1000 students</option>
                        <option>1000+ students</option>
                      </select>
                    </div>
                    
                    <Button className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg">
                      Schedule Demo
                    </Button>
                    
                    <p className="text-white/60 text-xs text-center mt-3">
                      By scheduling a demo, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
