"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Classm8 has transformed how we manage our school. The administrative burden has been reduced significantly, allowing us to focus on what matters most - education.",
      name: "Dr. Sarah Johnson",
      role: "Principal, Westfield Academy",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
      color: "from-blue-600 to-cyan-500"
    },
    {
      quote: "As a teacher, I love how Classm8 streamlines attendance, grading, and parent communication. It's intuitive and saves me hours of administrative work every week.",
      name: "Michael Chen",
      role: "Science Teacher, Parkview High",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
      color: "from-purple-600 to-pink-500"
    },
    {
      quote: "Having three children in different schools used to be a logistical nightmare. With Classm8, I can track all their activities, assignments, and progress in one place.",
      name: "Amelia Rodriguez",
      role: "Parent of three",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
      color: "from-amber-500 to-orange-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 font-medium text-sm mb-3">
            SUCCESS STORIES
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
            What Our Users Say
          </h2>
          <p className="text-base md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Hear from administrators, teachers, and parents who use Classm8 every day.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              transition={{ duration: 0.5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 rounded-xl transform rotate-1 group-hover:rotate-2 transition-transform"></div>
              <div className="relative bg-white dark:bg-slate-900 rounded-xl p-5 md:p-7 shadow-lg transform group-hover:-translate-y-2 transition-all duration-300">
                <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6">
                  <div className={`bg-gradient-to-r ${testimonial.color} p-2 md:p-3 rounded-full shadow-lg`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  </div>
                </div>
                
                <div className="mb-4 md:mb-6">
                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="italic text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">"{testimonial.quote}"</p>
                </div>
                
                <Separator className="my-4 bg-slate-200 dark:bg-slate-700" />
                
                <div className="flex items-center">
                  <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden mr-3 border-2 border-white dark:border-slate-700 shadow-md">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base">{testimonial.name}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Additional Social Proof */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 md:mt-20 text-center"
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8 text-slate-800 dark:text-white">Trusted by leading educational institutions</h3>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 lg:gap-16 opacity-70">
            <div className="grayscale hover:grayscale-0 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 md:h-14 w-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3L1 9l11 6 9-4.91V17c0 .5.5 1 1 1s1-.5 1-1v-6.34L12 3z"/>
                <path d="M5 13.18v4c0 1.45 2.96 2.63 7 2.63 4.04 0 7-1.18 7-2.63v-4"/>
              </svg>
              <p className="mt-2 font-medium text-sm md:text-base">Westfield Academy</p>
            </div>
            <div className="grayscale hover:grayscale-0 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 md:h-14 w-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
              <p className="mt-2 font-medium text-sm md:text-base">Parkview High</p>
            </div>
            <div className="grayscale hover:grayscale-0 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 md:h-14 w-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              <p className="mt-2 font-medium text-sm md:text-base">Oakridge Schools</p>
            </div>
            <div className="grayscale hover:grayscale-0 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 md:h-14 w-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
              </svg>
              <p className="mt-2 font-medium text-sm md:text-base">Riverdale District</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
