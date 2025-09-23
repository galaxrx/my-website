// components/ui/ParticleOrbs.tsx
'use client';
import { motion } from 'framer-motion';

const Orb = ({ x, y, size, color, delay, duration }: any) => (
  <motion.div
    className={`absolute rounded-full ${color} blur-3xl mix-blend-plus-lighter`}
    style={{
      width: size,
      height: size,
      top: `${y}%`,
      left: `${x}%`,
    }}
    animate={{
      x: [0, Math.random() * 100 - 50, 0],
      y: [0, Math.random() * 100 - 50, 0],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
      delay: delay,
    }}
  />
);

export const ParticleOrbs = () => {
  const orbs = [
    { x: 10, y: 20, size: 200, color: 'bg-amber-500/15', delay: 0, duration: 25 },
    { x: 80, y: 30, size: 250, color: 'bg-sky-900/25', delay: 2, duration: 30 },
    { x: 20, y: 70, size: 150, color: 'bg-amber-400/15', delay: 4, duration: 20 },
    { x: 60, y: 80, size: 300, color: 'bg-sky-800/25', delay: 1, duration: 35 },
  ];

  return (
    <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
      {orbs.map((orb, i) => <Orb key={i} {...orb} />)}
    </div>
  );
};