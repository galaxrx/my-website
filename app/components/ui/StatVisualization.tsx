// app/components/ui/StatVisualization.tsx
'use client';
import { motion } from 'framer-motion';
import { CountUpStat } from './CountUpStat';

export const StatVisualization = () => {
  const circleVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 0.40, 
      opacity: 1,
      transition: { duration: 2, ease: 'easeOut', delay: 0.8 },
    },
  };

  return (
    <motion.div
      className="relative flex h-48 w-48 items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" stroke="#334155" strokeWidth="3" fill="none" />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="url(#gradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          variants={circleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>
      </svg>
      <div className="text-center">
        <h3 className="text-4xl font-bold tracking-tight text-white">
          +<CountUpStat end={15} suffix="%" />
        </h3>
        <p className="text-sm text-slate-400">Margin Uplift</p>
      </div>
    </motion.div>
  );
};