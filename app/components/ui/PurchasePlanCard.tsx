// app/components/ui/PurchasePlanCard.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import GradientButton from './GradientButton';

// --- KPI Data Structure ---

// 1. Defined a proper KPI type interface with a strongly typed `trend` property.
interface Kpi {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  change: string;
  changeType: 'good' | 'bad';
  comment: string;
}

// 2. Applied the Kpi type to the `kpiData` array.
const kpiData: Kpi[] = [
  {
    label: 'Total Purchase Cost',
    value: '$2,485',
    trend: 'down',
    change: '-3.2%',
    changeType: 'good',
    comment: 'vs. last cycle',
  },
  {
    label: 'Projected Service Level',
    value: '98.5%',
    trend: 'up',
    change: '+1.5%',
    changeType: 'good',
    comment: 'to meet targets',
  },
  {
    label: 'Potential Lost Sales Prevented',
    value: '$1,820',
    trend: 'up',
    change: '+$450',
    changeType: 'good',
    comment: 'over next 2 weeks',
  },
  {
    label: 'Manual Review Items',
    value: '3 SKUs',
    trend: 'down',
    change: '-8',
    changeType: 'good',
    comment: 'flagged for review',
  },
];

// 3. The TrendIcon component now correctly receives a valid trend value.
const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'neutral' }) => {
  if (trend === 'up') return <ArrowUp className="h-3 w-3" />;
  if (trend === 'down') return <ArrowDown className="h-3 w-3" />;
  return <Minus className="h-3 w-3" />;
};

export default function PurchasePlanCard() {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md rounded-2xl border border-white/10 bg-card p-6 shadow-2xl shadow-accent/10"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-semibold text-text-primary">Purchase Plan Summary</h3>
        <p className="mt-1 text-sm text-muted-foreground">AI-generated optimal order quantities</p>
      </motion.div>

      {/* KPI Grid */}
      <motion.div
        variants={itemVariants}
        className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6"
      >
        {kpiData.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-lg border border-white/10 bg-white/5 p-4"
          >
            <p className="text-sm text-muted-foreground">{kpi.label}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-text-primary">
              {kpi.value}
            </p>
            <div className="mt-2 flex items-center gap-1 text-xs">
              <span
                className={cn(
                  'flex items-center gap-0.5 rounded-full px-1.5 py-0.5',
                  kpi.changeType === 'good'
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-red-500/10 text-red-400'
                )}
              >
                <TrendIcon trend={kpi.trend} />
                {kpi.change}
              </span>
              <span className="text-muted-foreground">{kpi.comment}</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Action Button */}
      <motion.div variants={itemVariants} className="mt-6">
        <GradientButton className="w-full">
          <span>Review & Approve Plan</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </GradientButton>
      </motion.div>
    </motion.div>
  );
}
