// components/ui/SparklineViz.tsx
'use client';
import { motion } from 'framer-motion';

export const SparklineViz = () => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: 'easeInOut', delay: 1 },
    },
  };

  return (
    <motion.svg
      width="60"
      height="24"
      viewBox="0 0 60 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="inline-block"
    >
      <motion.path
        d="M2 20C10.1667 15.8333 22.4 -2.2 30 5C37.6 12.2 45.8333 13.1667 58 2"
        stroke="url(#sparkline-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={pathVariants}
      />
      <defs>
        <linearGradient id="sparkline-gradient" x1="0" y1="0" x2="60" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" stopOpacity="0" />
          <stop offset="1" stopColor="#FBBF24" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};