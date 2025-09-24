// app/sections/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ShieldCheck, Lock, CheckCircle } from 'lucide-react';
import VideoBackground from '../components/ui/VideoBackground';

// Dynamically import new and existing components
import { CursorGlow } from '../components/ui/CursorGlow';
import { ParticleOrbs } from '../components/ui/ParticleOrbs';
import { StatCard } from '../components/ui/StatCard';
import { NeuralWave } from '../components/ui/NeuralWave';

const HeroPrompt = dynamic(() => import('../components/ui/HeroPrompt'), { ssr: false });

const SecurityBadges = () => {
  const badgeVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.5 + i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  const badges = [
    { icon: <ShieldCheck size={14} />, text: 'Security First' },
    { icon: <Lock size={14} />, text: 'Privacy by Design' },
    { icon: <CheckCircle size={14} />, text: 'SOC2-Ready' },
  ];

  return (
    <div className="mt-8 flex items-center justify-center gap-4 text-xs text-slate-400">
      {badges.map((badge, i) => (
        <motion.div
          key={i}
          className="group flex items-center gap-1.5"
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={badgeVariants}
        >
          <span className="text-amber-400/80 transition-colors group-hover:text-amber-300">
            {badge.icon}
          </span>
          <span className="transition-colors group-hover:text-slate-300">{badge.text}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default function Hero() {
  return (
    <section id="hero" className="relative w-full min-h-[100svh] overflow-hidden pt-[var(--header-h)]">
      <CursorGlow />
      <VideoBackground src="/videos/galaxrx-hero-loop.mp4" poster="/videos/galaxrx-hero-poster.png" />
      <div aria-hidden="true" className="absolute inset-0 z-10 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-slate-950/60" />
      <div className="absolute inset-0 z-5">
        <ParticleOrbs />
      </div>
      <div className="container relative z-20 mx-auto flex min-h-[calc(100svh-var(--header-h))] flex-col items-center justify-center gap-12 text-center">
        <motion.div
          className="flex flex-col items-center gap-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
          }}
        >
          {/* --- CHANGE: Optimized font style for better visibility and accessibility --- */}
          <motion.h1
            className="font-heading font-bold tracking-normal text-white text-balance leading-snug text-[clamp(2rem,4.5vw,3.5rem)] max-w-4xl"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } }}
          >
            Next-Gen Pharmacy Business Intelligence Platform
          </motion.h1>

          {/* --- StatCards remain for dynamic visualizations --- */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } }}
           >
            <StatCard value={30} label="Inventory Cost Reduction" />
            <StatCard value={40} label="Service Level Increase" />
          </motion.div>

          <motion.div
            className="w-full max-w-xl"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } }}
          >
            <div className="group relative rounded-xl p-px bg-white/5 before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:bg-gradient-to-br before:from-amber-400/50 before:to-transparent before:opacity-0 before:transition-opacity hover:before:opacity-100">
              <div className="relative overflow-hidden rounded-[11px] bg-slate-900/80 p-1 backdrop-blur-sm">
                <NeuralWave />
                <HeroPrompt />
              </div>
            </div>
            <p className="mt-2 text-center text-xs text-slate-500">
              No sample data? We’ll simulate with templates.
            </p>
          </motion.div>
        </motion.div>
        
        <SecurityBadges />
      </div>
    </section>
  );
}