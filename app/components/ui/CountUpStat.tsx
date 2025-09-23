// app/components/ui/CountUpStat.tsx
'use client';
import CountUp from 'react-countup'; // Requires `npm install react-countup`
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const CountUpStat = ({ end, decimals, suffix }: { end: number; decimals?: number; suffix: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <strong ref={ref} className="font-semibold text-white">
      {isInView ? <CountUp start={0} end={end} duration={2.5} decimals={decimals} /> : 0}
      {suffix}
    </strong>
  );
};