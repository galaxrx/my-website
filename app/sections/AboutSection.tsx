// app/sections/AboutSection.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ShieldCheck,
  Cpu,
  Sparkles,
  LineChart,
  HeartHandshake,
  Lock,
  BrainCircuit,
  Settings2,
  Users2,
  Link2,
  Cog,
  Bot,
} from "lucide-react";


// ============================================================================
// 1. REUSABLE & VISUALIZATION SUBCOMPONENTS
// ============================================================================

const GradientButton = ({ children, className, ...props }: React.ComponentProps<'button'> & { size?: 'lg' }) => (
  <button className={cn("relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-full", className)} {...props}>
    <span className="absolute w-full h-full bg-gradient-to-br from-amber-500 via-amber-600 to-orange-500 group-hover:from-amber-600 group-hover:via-orange-500 group-hover:to-yellow-500"></span>
    <span className={cn("relative transition-all ease-out bg-slate-950 rounded-full group-hover:bg-opacity-90", props.size === 'lg' ? 'px-8 py-3' : 'px-6 py-3')}>
      <span className="relative text-white">{children}</span>
    </span>
  </button>
);


const AnimatedBackground = () => {
  const stars = React.useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => ({
      id: `star-${i}`,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: `${Math.random() * 1.5 + 0.5}px`,
      delay: Math.random() * 5,
      duration: Math.random() * 2 + 1,
    }));
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-black">
        <motion.div
            className="absolute inset-0 opacity-25"
            style={{
                background: `radial-gradient(circle at 30% 20%, rgba(139, 92, 246, 0.2), transparent 50%),
                             radial-gradient(circle at 70% 80%, rgba(30, 58, 138, 0.3), transparent 50%)`,
            }}
            animate={{
                transform: ['scale(1, 1) rotate(0deg)', 'scale(1.2, 1.1) rotate(5deg)', 'scale(1, 1) rotate(0deg)'],
            }}
            transition={{ duration: 45, ease: 'easeInOut', repeat: Infinity }}
        />
        
        {stars.map(star => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{ top: star.y, left: star.x, width: star.size, height: star.size }}
            animate={{ opacity: [0.1, 1, 0.1] }}
            transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        <motion.div
            className="absolute top-0 left-0 h-0.5 w-24 bg-gradient-to-l from-white to-transparent"
            style={{ rotate: -45 }}
            animate={{ x: ['-10vw', '110vw'], y: ['-10vh', '110vh'] }}
            transition={{ duration: 4, delay: 5, repeat: Infinity, repeatDelay: 10, ease: 'linear' }}
        />
    </div>
  );
};

// --- REVERTED: Restored original icon visualizations ---
const MissionViz = () => (
    <div className="relative w-24 h-16">
        <motion.div
            className="absolute top-1/2 left-1/2"
            style={{ x: "-50%", y: "-50%" }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
            <HeartHandshake className="h-8 w-8 text-amber-400" />
        </motion.div>
    </div>
);

const HowWeWorkViz = () => {
    const steps = [
        { icon: Link2, name: "Connect" },
        { icon: Cog, name: "Configure" },
        { icon: Bot, name: "Automate" }
    ];
    return (
        <div className="flex justify-center items-center h-16 gap-4">
            {steps.map((step, i) => (
                <motion.div
                    key={step.name}
                    className="flex flex-col items-center gap-1"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: i * 0.2 }}
                >
                    <div className="p-2 rounded-full bg-slate-800 border border-slate-700">
                      <step.icon className="h-5 w-5 text-amber-400"/>
                    </div>
                    <span className="text-xs text-slate-400">{step.name}</span>
                </motion.div>
            ))}
        </div>
    );
};

const WhoWeServeViz = () => (
    <div className="flex justify-center items-center h-16">
        {[0, 1, 2].map(i => (
            <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.15 }}
                className="p-2 -mx-1"
            >
                <Users2 className="h-8 w-8 text-amber-400/70" />
            </motion.div>
        ))}
    </div>
);


const PrincipleCard = ({ icon: Icon, title, desc, delay }: { icon: React.ElementType, title: string, desc: string, delay: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <motion.div
            key={title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: delay * 0.05 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative rounded-2xl border border-amber-500/10 bg-slate-900/50 p-6 overflow-hidden"
        >
            <div className="mb-2 flex items-center gap-3">
                <Icon className="h-5 w-5 text-amber-400" />
                <div className="text-base font-bold text-gray-100">{title}</div>
            </div>
            <p className="text-base text-slate-400">{desc}</p>
            <AnimatePresence>
            {isHovered && (
                <motion.svg
                    className="absolute bottom-0 left-0 w-full h-4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <path d="M0 8 C 20 2, 40 12, 60 8 S 100 2, 120 8" stroke="rgba(251,191,36,0.4)" fill="none" strokeWidth="2" />
                </motion.svg>
            )}
            </AnimatePresence>
        </motion.div>
    );
};

// ============================================================================
// 2. MAIN SECTION COMPONENT
// ============================================================================
export default function AboutSection() {
  const principles = [
    { icon: Cpu, title: "Automation-First", desc: "Design for busy teams. Default to automation with clear, human approvals." },
    { icon: LineChart, title: "Evidence-Driven", desc: "Track KPIs and forecast quality transparently; learn and improve week over week." },
    { icon: BrainCircuit, title: "Explainable AI", desc: "Show what drives a recommendation. No black boxes, no guesswork." },
    { icon: ShieldCheck, title: "Trust by Design", desc: "Security, privacy, and audit trails are built in—not bolted on." },
  ];
  
  return (
    <motion.section
      id="about"
      aria-labelledby="about-title"
      className="relative py-24 md:py-32"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <AnimatedBackground />

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-950/30 px-3 py-1 text-sm text-amber-300 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            Our Vision
          </div>
          <h2 id="about-title" className="font-heading mt-4 text-3xl font-bold leading-tight tracking-tight text-gray-200 md:text-4xl">
            About <span className="text-amber-400">GALAXRX</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-slate-400 md:text-lg">
            We believe inventory should fund growth—not friction. GALAXRX blends AI, proven operations science, and an effortless experience to turn everyday data into confident, repeatable decisions.
          </p>
        </div>

        {/* --- Main "About" Photo --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="relative mx-auto mt-12 max-w-3xl rounded-2xl border border-amber-500/10 bg-slate-900/50 p-2 shadow-2xl shadow-black/40 backdrop-blur-md lg:mt-16"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/About.png"
            alt="A modern and clean pharmacy interior"
            className="w-full rounded-xl"
            loading="lazy"
          />
        </motion.div>

        {/* --- REVERTED: Restored original card data and rendering logic --- */}
        <div className="mx-auto mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3">
            {[
              { title: "Our Mission", viz: <MissionViz />, text: "Help pharmacies buy smarter and serve patients better by automating the hard parts—forecasting, inventory, and purchasing—without adding complexity." },
              { title: "How We Work", viz: <HowWeWorkViz />, text: "We connect your data, configure to your KPIs, and automate purchase plans for your review—approve, and you're done." },
              { title: "Who We Serve", viz: <WhoWeServeViz />, text: "Independent pharmacies and small groups that need enterprise-grade optimization—delivered with clarity, speed, and trust." },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, scale: 1.03, boxShadow: "0px 10px 30px rgba(251, 191, 36, 0.1)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative flex flex-col rounded-2xl border border-amber-500/10 bg-slate-900/50 p-6 backdrop-blur-md overflow-hidden"
              >
                  <h3 className="text-lg font-bold text-gray-100">{card.title}</h3>
                  <div className="flex-grow flex items-center justify-center my-4">{card.viz}</div>
                  <p className="text-base leading-relaxed text-slate-400 text-center">{card.text}</p>
              </motion.div>
            ))}
        </div>

        {/* Principles Grid */}
        <div className="mt-12 md:mt-16">
          <h3 className="text-center text-xl font-bold text-white">Our Principles</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
               <PrincipleCard key={p.title} {...p} delay={i} />
            ))}
          </div>
        </div>

        {/* Security and AI Blocks */}
        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-2">
            <div className="group rounded-2xl border border-amber-500/10 bg-slate-900/50 p-6 backdrop-blur-md">
                <div className="mb-2 flex items-center gap-3">
                    <Lock className="h-5 w-5 text-amber-400 transition-transform group-hover:scale-110" />
                    <h3 className="text-lg font-bold text-gray-100">Security & Privacy</h3>
                </div>
                <motion.ul layout className="space-y-2 pl-5 text-base text-slate-400 list-disc marker:text-amber-400/60">
                    <li>Role-based access with least-privilege defaults.</li>
                    <li>Audit trails for approvals and purchasing actions.</li>
                    <li>Export controls and environment-level data isolation.</li>
                </motion.ul>
            </div>
            <div className="group rounded-2xl border border-amber-500/10 bg-slate-900/50 p-6 backdrop-blur-md">
                <div className="mb-2 flex items-center gap-3">
                    <BrainCircuit className="h-5 w-5 text-amber-400 transition-transform group-hover:scale-110" />
                    <h3 className="text-lg font-bold text-gray-100">Responsible AI</h3>
                </div>
                <motion.ul layout className="space-y-2 pl-5 text-base text-slate-400 list-disc marker:text-amber-400/60">
                    <li>Explainable recommendations with visible assumptions.</li>
                    <li>Human-in-the-loop approvals for high-impact orders.</li>
                    <li>Continuous monitoring of forecast and uplift models.</li>
                </motion.ul>
            </div>
        </div>

        {/* CTA Section */}
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto mt-12 flex max-w-md flex-col items-center gap-3 text-center md:mt-16"
        >
            <div className="relative">
                <motion.div
                  className="absolute -inset-3 rounded-full bg-amber-500/20 blur-xl"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <GradientButton size="lg">
                    <a href="#contact">Talk to the team</a>
                </GradientButton>
            </div>
            <p className="text-base text-slate-400">
                Learn how GALAXRX fits your data, suppliers, and buying rhythms.
            </p>
        </motion.div>
      </div>
    </motion.section>
  );
}