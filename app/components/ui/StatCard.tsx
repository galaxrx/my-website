// app/components/ui/StatCard.tsx
'use client';
import { motion } from 'framer-motion';
import CountUp from 'react-countup'; // --- CHANGE: Imports CountUp directly
import { useInView } from 'framer-motion'; // --- CHANGE: Imports hooks directly
import { useRef } from 'react'; // --- CHANGE: Imports hooks directly

interface StatCardProps {
  value: number;
  label: string;
}

export const StatCard = ({ value, label }: StatCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const circleVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: value / 100,
      opacity: 1,
      transition: { duration: 2, ease: 'easeOut', delay: 0.5 },
    },
  };

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 rounded-lg bg-slate-800/50 p-6 text-center w-48">
      <div className="relative h-28 w-28">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="#334155" strokeWidth="6" fill="none" />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#gradient)"
            strokeWidth="6"
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
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-3xl font-bold text-white">
            {/* --- CHANGE: CountUp logic is now directly inside this component --- */}
            <strong className="font-bold">
              {isInView ? <CountUp start={0} end={value} duration={2.5} /> : 0}%
            </strong>
          </h3>
        </div>
      </div>
      <p className="text-sm text-slate-300">{label}</p>
    </div>
  );
};