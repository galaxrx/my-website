// app/sections/ContactSection.tsx
'use client'; 

import { motion } from 'framer-motion';
import ContactForm from "@/app/components/ContactForm";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function ContactSection() {
  return (
    <motion.section
      id="contact"
      // Change: Set a deep navy background for the whole section
      className="relative w-full bg-slate-950 py-20 sm:py-32"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
        {/* Change: Added the same subtle gold radial gradient for consistency */}
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/2 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(251,191,36,0.08),transparent_80%)]"
        />

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">
        <motion.div variants={itemVariants} className="max-w-md">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">
            Ready to See the Future?
          </h2>
          <p className="text-lg text-slate-400 mb-6">
            Let's talk about how GALAXRX can transform your pharmacy's inventory management. Fill out the form, and a specialist will get in touch to schedule your personalized demo.
          </p>
          <div className="space-y-4">
            <div className="flex items-start">
                {/* Change: Styled the numbered steps with the gold theme */}
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-amber-950/40 flex items-center justify-center mr-4">
                  <span className="text-amber-400 font-bold">1</span>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-100">Connect & Discuss</h4>
                    <p className="text-sm text-slate-400">Tell us your goals. We'll listen.</p>
                </div>
            </div>
            <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-amber-950/40 flex items-center justify-center mr-4">
                  <span className="text-amber-400 font-bold">2</span>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-100">Get a Live Demo</h4>
                    <p className="text-sm text-slate-400">See the platform in action with your data.</p>
                </div>
            </div>
            <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-amber-950/40 flex items-center justify-center mr-4">
                  <span className="text-amber-400 font-bold">3</span>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-100">Automate & Grow</h4>
                    <p className="text-sm text-slate-400">Implement the future of pharmacy purchasing.</p>
                </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants} 
          // Change: Styled the form container card to match the navy/gold theme
          className="bg-slate-900 p-8 rounded-2xl border border-amber-500/10 shadow-2xl shadow-amber-950/30"
        >
          <ContactForm />
        </motion.div>
      </div>
    </motion.section>
  );
}