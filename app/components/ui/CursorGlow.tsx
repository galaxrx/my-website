// components/ui/CursorGlow.tsx
'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export const CursorGlow = () => {
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothMouse = {
    x: useSpring(mouse.x, { stiffness: 300, damping: 50, mass: 0.5 }),
    y: useSpring(mouse.y, { stiffness: 300, damping: 50, mass: 0.5 }),
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouse.x, mouse.y]);

  return (
    <motion.div
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
      }}
      className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 z-50 h-[500px] w-[500px] rounded-full bg-amber-400/10 blur-[150px]"
    />
  );
};