'use client';
import { motion } from 'framer-motion';
import { Bot, Check } from 'lucide-react';

const sentence = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: i * 0.5 },
  }),
};

const letter = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 200,
    },
  },
  hidden: {
    opacity: 0,
    y: 20,
  },
};

const AiMicroDemo = () => {
  const question = 'What should I buy this week?'.split('');
  
  return (
    <motion.div 
      className="rounded-xl border border-white/10 bg-card/80 p-4 backdrop-blur-sm"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      transition={{ delay: 0.8 }}
    >
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <motion.div variants={sentence}>
          {question.map((char, index) => (
            <motion.span key={index} variants={letter}>
              {char}
            </motion.span>
          ))}
        </motion.div>
        <div className="blinking-cursor" />
      </div>
      
      <motion.div 
        className="mt-3 space-y-2 border-t border-white/10 pt-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <p className="text-xs font-semibold text-accent-2 flex items-center gap-2"><Bot size={14}/> Recommended Order:</p>
        <div className="flex items-center gap-2 text-sm text-text-primary"><Check size={16} className="text-green-400"/> Item #12A45B - 24 units</div>
        <div className="flex items-center gap-2 text-sm text-text-primary"><Check size={16} className="text-green-400"/> Item #98C12D - 12 units</div>
        <div className="flex items-center gap-2 text-sm text-text-primary"><Check size={16} className="text-green-400"/> Item #76F89E - 36 units</div>
      </motion.div>
    </motion.div>
  );
};

export default AiMicroDemo;