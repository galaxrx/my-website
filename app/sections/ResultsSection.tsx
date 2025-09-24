// app/sections/ResultsSection.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Trophy,
  Target,
  TrendingUp,
  Boxes,
  Timer,
  ClipboardCheck,
  Network,
  BarChart3,
  CheckCircle,
  ArrowRight,
  DollarSign,
  LineChart,
  PieChart,
  BarChartHorizontal,
  Zap,
} from "lucide-react";

// A self-contained GradientButton component to resolve the import error
const GradientButton = ({ children, className, size = 'md', ...props }: { children: React.ReactNode, className?: string, size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    lg: 'px-6 py-3 text-lg font-semibold',
    md: 'px-5 py-2.5 text-base font-medium',
    sm: 'px-4 py-2 text-sm font-medium',
  };

  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center rounded-full overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-blue-950',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};


// --- TYPE DEFINITIONS ---
type OutcomeType =
  | "stockouts"
  | "inventory"
  | "margin"
  | "hours"
  | "confidence"
  | "discipline";

// --- DATA ARRAYS ---
const outcomes = [
  { key: "stockouts" as OutcomeType, icon: Target, title: "Fewer Stockouts", blurb: "AI forecasting and dynamic safety stock ensure the right product is always on the shelf.", kpi: "Service Level: 99.2%" },
  { key: "inventory" as OutcomeType, icon: Boxes, title: "Leaner Inventory", blurb: "Right-size your stock to reduce expiry risk and free up capital from slow-moving products.", kpi: "Stock Value: -$2.1M" },
  { key: "margin" as OutcomeType, icon: TrendingUp, title: "Higher Realized Margin", blurb: "Optimize purchasing and promotion timing to convert inventory into profitable, predictable sell-through.", kpi: "Gross Margin: +3.5%" },
  { key: "hours" as OutcomeType, icon: Timer, title: "Hours Back Each Week", blurb: "Automate routine buying and planning, freeing your team for high-value tasks and Customer care.", kpi: "Time Saved: 8 hrs/wk" },
  { key: "confidence" as OutcomeType, icon: ClipboardCheck, title: "Forecast Confidence", blurb: "Build trust with explainable AI and trend tracking for better, faster, and more confident decisions.", kpi: "Forecast Accuracy: 95%" },
  { key: "discipline" as OutcomeType, icon: Network, title: "Operational Discipline", blurb: "Drive consistent execution across all stores with clear KPIs, exception alerts, and transparent audit trails.", kpi: "Adherence Rate: 100%" },
];

const measurements = [
    { label: "Service Level", value: "98.7%", desc: "Demand fulfilled without stockout.", type: 'progress_ring' },
    { label: "Forecast Quality", value: "+25%", desc: "Improvement in Accuracy.", type: 'sparkline' },
    { label: "Cash Conversion", value: "18 Days", desc: "From 30 days to 18.", type: 'shrinking_bar' },
    { label: "Stock Health", value: "-41%", desc: "Reduction in overstock value.", type: 'progress_ring'},
    { label: "Margin Realization", value: "+12.5%", desc: "Actual vs. planned margin lift.", type: 'sparkline'},
    { label: "Execution Efficiency", value: "90%", desc: "Automated planning decisions.", type: 'progress_ring'},
];

const factors = [ "Data readiness & POS integration.", "Supplier constraints like MOQs.", "Assortment & promotion volatility.", "User adoption & process fit.", "Disciplined operational cadence." ];

// --- ADVANCED VISUALIZATION SUBCOMPONENTS ---

const GradientMesh = () => (
    <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,119,6,0.2),rgba(217,119,6,0)_40%)] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(9,9,11,0.5),rgba(9,9,11,0)_40%)]" />
        <div className="absolute left-1/2 top-1/4 h-64 w-64 -translate-x-1/2 animate-[spin_20s_linear_infinite] bg-[radial-gradient(circle,rgba(217,119,6,0.15),transparent_60%)]" />
    </div>
);

const FloatingParticles = () => (
  <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    {[...Array(15)].map((_, i) => {
      const size = Math.random() * 50 + 20;
      const duration = Math.random() * 15 + 15;
      const delay = Math.random() * -20;
      const isTiny = size < 30;
      return (
        <motion.div
          key={i}
          className={cn("absolute rounded-full bg-gradient-to-br from-amber-500/10 to-amber-600/5", isTiny ? "from-amber-500/30 to-amber-600/15" : "")}
          style={{ width: size, height: size, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          initial={{ opacity: 0, scale: 0.5, y: 100 }}
          animate={{ x: `${(Math.random() - 0.5) * 400}px`, y: `${(Math.random() - 0.5) * 400}px`, opacity: [0, 1, 1, 0], scale: 1, rotate: Math.random() * 180 - 90 }}
          transition={{ duration, repeat: Infinity, repeatType: 'loop', ease: 'linear', delay }}
        />
      );
    })}
  </div>
);

// --- OUTCOME CARD VISUALIZATIONS ---

const StockoutChart = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.8 });
    const pathVariants = {
        initial: { pathLength: 0, pathOffset: 1 },
        animate: { pathLength: 1, pathOffset: 0, transition: { duration: 1.5, ease: "easeInOut" } },
    };
    return (
        <svg ref={ref} width="100%" height="100%" viewBox="0 0 100 50" className="absolute inset-0 h-full w-full opacity-10" preserveAspectRatio="none">
             <motion.path d="M0,40 C10,10 20,50 30,30 C40,10 50,45 60,40 C70,35 80,42 90,40 L100,40" fill="none" stroke="#ef4444" strokeWidth="2" variants={pathVariants} initial="initial" animate={isInView ? "animate" : "initial"} />
             <motion.path d="M0,40 C10,40 20,40 30,40 C40,40 50,40 60,40 C70,40 80,40 90,40 L100,40" fill="none" stroke="#22c55e" strokeWidth="2" variants={pathVariants} initial="initial" animate={isInView ? "animate" : "initial"} transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }} />
             <line x1="0" y1="40" x2="100" y2="40" stroke="#22c55e" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
        </svg>
    );
};

const InventoryBars = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.8 });
    return (
        <svg ref={ref} width="100%" height="100%" viewBox="0 0 100 50" className="absolute inset-0 h-full w-full opacity-10" preserveAspectRatio="none">
            {[...Array(5)].map((_, i) => (
                <motion.rect key={i} x={i * 20 + 5} y="10" width="10" height="30" fill="rgba(245, 158, 11, 0.4)"
                    initial={{ height: 30, y: 10 }}
                    animate={isInView ? { height: Math.random() * 15 + 5, y: 10 + (30 - (Math.random() * 15 + 5)) } : {}}
                    transition={{ duration: 1, delay: 0.2 * i + 0.5, ease: 'easeOut' }}
                />
            ))}
        </svg>
    );
};

const MarginCounter = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.8 });
    return (
        <div ref={ref} className="absolute inset-0 opacity-15">
            {[...Array(5)].map((_, i) => (
                <motion.div key={i} className="absolute" style={{ left: `${Math.random() * 80 + 10}%`, top: '100%' }}>
                    <motion.div initial={{ y: 0, opacity: 0 }} animate={isInView ? { y: -100, opacity: [0, 1, 0] } : {}} transition={{ duration: Math.random() * 2 + 1.5, delay: Math.random() * 1.5, ease: 'easeOut' }}>
                        <DollarSign className="h-6 w-6 text-amber-400" />
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
};

const HoursClock = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.8 });
    return (
        <svg width="100%" height="100%" viewBox="-1 -1 34 34" className="absolute inset-0 h-full w-full opacity-10" preserveAspectRatio="xMidYMid meet">
            <motion.path ref={ref} d="M16 0 A16 16 0 1 1 15.99 0 Z" fill="none" stroke="rgba(245, 158, 11, 0.5)" strokeWidth="4"
                initial={{ pathLength: 1 }}
                animate={isInView ? { pathLength: 0 } : {}}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
            />
            <circle cx="16" cy="16" r="16" fill="none" stroke="rgba(245, 158, 11, 0.1)" strokeWidth="4" />
        </svg>
    );
};

const ConfidenceArc = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.8 });
    return (
        <svg viewBox="0 0 100 55" className="absolute inset-x-0 bottom-0 w-full opacity-10">
            <path d="M10 50 A 40 40 0 0 1 90 50" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="8" fill="none" strokeLinecap="round" />
            <motion.path ref={ref} d="M10 50 A 40 40 0 0 1 90 50" stroke="#f59e0b" strokeWidth="8" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 0.95 } : {}}
                transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
            />
        </svg>
    );
};

const DisciplineNetwork = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.8 });
    const nodes = [{ cx: 20, cy: 30 }, { cx: 50, cy: 15 }, { cx: 80, cy: 30 }, { cx: 50, cy: 45 }];
    const lines = [{ x1: 20, y1: 30, x2: 50, y2: 15 }, { x1: 50, y1: 15, x2: 80, y2: 30 }, { x1: 80, y1: 30, x2: 50, y2: 45 }, { x1: 50, y1: 45, x2: 20, y2: 30 }];
    return (
        <svg ref={ref} viewBox="0 0 100 60" className="absolute inset-0 h-full w-full opacity-10">
            {lines.map((line, i) => (
                <motion.line key={i} {...line} stroke="rgba(245, 158, 11, 0.5)" strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.2 + 0.5, ease: 'easeInOut' }}
                />
            ))}
            {nodes.map((node, i) => (
                <motion.circle key={i} {...node} r="3" fill="#f59e0b"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ type: 'spring', stiffness: 300, damping: 15, delay: i * 0.2 + 0.2 }}
                />
            ))}
        </svg>
    );
};

const OutcomeCardVisualization = ({ type }: { type: OutcomeType }) => {
    const visualizations: Record<OutcomeType, React.ReactNode> = {
        stockouts: <StockoutChart />,
        inventory: <InventoryBars />,
        margin: <MarginCounter />,
        hours: <HoursClock />,
        confidence: <ConfidenceArc />,
        discipline: <DisciplineNetwork />,
    };
    return <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">{visualizations[type]}</div>;
};

// --- MEASUREMENT TILE VISUALIZATIONS ---

const ProgressRing = ({ value }: { value: string }) => {
    const numericValue = parseFloat(value.replace('%', ''));
    const circumference = 2 * Math.PI * 18; // r = 18
    return (
        <svg className="h-20 w-20" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18" stroke="#1e3a8a" strokeWidth="4" fill="transparent" />
            <motion.circle cx="20" cy="20" r="18" stroke="#f59e0b" strokeWidth="4" fill="transparent" strokeLinecap="round" transform="rotate(-90 20 20)" strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: circumference * (1 - Math.abs(numericValue) / 100) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            />
        </svg>
    );
};

const MetricSparkline = () => (
    <svg width="80" height="40" viewBox="0 0 80 40">
        <motion.path d="M0 30 L15 20 L30 25 L45 10 L60 15 L75 5" fill="none" stroke="#f59e0b" strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
        />
    </svg>
);

const ShrinkingBar = () => (
    <div className="flex w-24 flex-col items-center gap-2">
        <div className="w-full rounded bg-blue-800">
            <motion.div className="h-3 rounded bg-amber-500"
                initial={{ width: '100%' }}
                animate={{ width: '60%' }} // 18/30 = 60%
                transition={{ duration: 1.5, ease: 'easeOut' }}
            />
        </div>
        <div className="flex w-full justify-between text-xs text-blue-300"><span>30d</span><span>18d</span></div>
    </div>
);


const MeasurementViz = ({ m }: { m: { label: string; value: string; type: string } }) => {
    const numericValue = parseFloat(m.value);
    switch (m.type) {
        case 'progress_ring': return <div className="relative"><ProgressRing value={m.value} /><div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">{m.value}</div></div>;
        case 'sparkline': return <div className="flex flex-col items-center"><MetricSparkline /><div className="text-lg font-bold text-white">{m.value}</div></div>;
        case 'shrinking_bar': return <div className="flex flex-col items-center"><ShrinkingBar /><div className="mt-2 text-lg font-bold text-white">{m.value}</div></div>;
        default: return <div className="text-3xl font-bold text-amber-400">{m.value}</div>
    }
}

// --- NEW INVENTORY CONTROL VISUALIZATION ---

const InventoryControlVisualizer = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const [isOptimized, setIsOptimized] = useState(false);

    const bars = React.useMemo(() => Array.from({ length: 15 }, (_, i) => ({
        chaoticHeight: Math.random() * 40 + 5,
        orderedHeight: 25,
        delay: i * 0.05,
    })), []);

    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => setIsOptimized(true), 1200);
            return () => clearTimeout(timer);
        }
    }, [isInView]);

    const barVariants = {
        chaotic: (p: { chaoticHeight: number }) => ({
            height: p.chaoticHeight,
            y: 50 - p.chaoticHeight,
            fill: "#ef4444",
        }),
        ordered: (p: { orderedHeight: number, delay: number }) => ({
            height: [p.orderedHeight, p.orderedHeight * 1.1, p.orderedHeight],
            y: [50 - p.orderedHeight, 50 - p.orderedHeight * 1.1, 50 - p.orderedHeight],
            fill: "#22c55e",
            transition: {
                fill: { duration: 0.8, ease: 'easeInOut', delay: p.delay },
                height: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: p.delay, repeatDelay: 1.5 },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: p.delay, repeatDelay: 1.5 },
            }
        })
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-2xl border border-amber-500/10 bg-blue-950/50 p-6 backdrop-blur-md"
        >
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-white">From Volatile Stock to Balanced Inventory</h3>
                    <p className="mt-1 text-blue-300">Eliminate costly stockouts and overstock with AI-driven precision.</p>
                </div>
                <motion.div
                    className="flex flex-shrink-0 items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium"
                    animate={{
                        color: isOptimized ? '#22c55e' : '#ef4444',
                        borderColor: isOptimized ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                        backgroundColor: isOptimized ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'
                    }}
                    transition={{ duration: 1, delay: 1.2 }}
                >
                    <motion.div
                        className="h-2 w-2 rounded-full"
                        animate={{ backgroundColor: isOptimized ? '#22c55e' : '#ef4444' }}
                        transition={{ duration: 1, delay: 1.2 }}
                    />
                     <div className="relative h-5 w-[110px] overflow-hidden">
                        <AnimatePresence>
                            <motion.span
                                key={isOptimized ? 'Predictive' : 'Reactive'}
                                className="absolute inset-0"
                                initial={{ y: "120%" }}
                                animate={{ y: "0%" }}
                                exit={{ y: "-120%" }}
                                transition={{ duration: 0.5, ease: 'circOut', delay: 1 }}
                            >
                                {isOptimized ? 'Optimized' : 'Volatile'}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
            <div className="relative mt-4 h-48 w-full rounded-lg bg-black/20" ref={ref}>
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <motion.line
                        x1="0" y1="25" x2="100" y2="25"
                        stroke="#22c55e" strokeWidth="0.5" strokeDasharray="2 2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isOptimized ? 0.6 : 0 }}
                        transition={{ duration: 1, delay: 1.5 }}
                    />
                    {bars.map((bar, i) => (
                        <motion.rect
                            key={i}
                            x={(100 / bars.length) * i + (100 / bars.length) * 0.15}
                            width={(100 / bars.length) * 0.7}
                            rx="1"
                            custom={bar}
                            variants={barVariants}
                            initial="chaotic"
                            animate={isOptimized ? "ordered" : "chaotic"}
                        />
                    ))}
                </svg>
            </div>
        </motion.div>
    );
};


// --- CORE COMPONENTS ---

const OutcomeCard = ({ o }: { o: (typeof outcomes)[0] }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 20 });
    const springY = useSpring(y, { stiffness: 300, damping: 20 });
    const rotateX = useTransform(springY, [-150, 150], [10, -10]);
    const rotateY = useTransform(springX, [-150, 150], [-10, 10]);

    return (
        <motion.div
            key={o.title}
            style={{ rotateX, rotateY, perspective: 1000 }}
            onMouseMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); x.set(e.clientX - rect.left - rect.width / 2); y.set(e.clientY - rect.top - rect.height / 2);}}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            className="group relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-amber-500/20 to-blue-800/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <article className="relative h-full overflow-hidden rounded-2xl border border-amber-500/10 bg-blue-950/50 p-6 shadow-2xl shadow-black/30 backdrop-blur-md min-h-[220px]">
                <div className="flex items-center gap-4">
                    <div className="rounded-xl border border-amber-400/10 bg-amber-950/30 p-2.5">
                        <o.icon className="h-7 w-7 text-amber-400" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-100">{o.title}</h3>
                </div>
                <p className="mt-4 text-base leading-relaxed text-blue-300">{o.blurb}</p>
                <OutcomeCardVisualization type={o.key} />
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute bottom-4 right-4 rounded-full bg-blue-950/70 px-3 py-1 text-xs font-medium text-amber-300 backdrop-blur-sm border border-amber-500/10"
                    >
                        {o.kpi}
                    </motion.div>
                </AnimatePresence>
            </article>
        </motion.div>
    );
};


const MeasurementTile = ({ m, i }: { m: (typeof measurements)[0]; i: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative overflow-hidden rounded-2xl border border-amber-500/10 bg-blue-900 p-5 h-40 flex flex-col justify-center"
        >
            <AnimatePresence mode="wait">
                {!isHovered ? (
                    <motion.div key="text" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-center">
                        <div className="text-base font-semibold text-gray-100">{m.label}</div>
                        <div className="mt-2 text-4xl font-bold text-amber-400">{m.value}</div>
                        <div className="mt-1 text-sm text-blue-300">{m.desc}</div>
                    </motion.div>
                ) : (
                    <motion.div key="viz" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="absolute inset-0 flex items-center justify-center">
                        <MeasurementViz m={m} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const ImpactFactor = ({ f, i }: { f: string; i: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.9 });
    return (
        <motion.li
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="flex items-start gap-3 text-base text-blue-200"
        >
            <svg className="mt-1 h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.circle cx="12" cy="12" r="10" stroke="#1e3a8a" strokeWidth="2"/>
                <motion.path d="M7.75 12.5L10.58 15.25L16.25 9.75" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 + i * 0.15 }}
                />
            </svg>
            <span>{f}</span>
        </motion.li>
    );
};

// --- MAIN SECTION COMPONENT ---
export default function ResultsSection() {
  return (
    <section id="results" aria-labelledby="results-title" className="relative overflow-hidden bg-blue-950 py-24 md:py-32">
        <GradientMesh />
        <FloatingParticles />
        <div className="container relative mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-950/30 px-3 py-1 text-sm font-medium text-amber-300 backdrop-blur">
                    <Trophy className="h-4 w-4 text-amber-400" />
                    Credible, Measurable Impact
                </div>
                <h2 id="results-title" className="font-heading mt-4 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">Evidence-Based Performance</h2>
                <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-blue-300 md:text-xl">We deliver measurable improvements week after week, with transparent KPIs that track real-world impact.</p>
            </motion.div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {outcomes.map((o) => (<OutcomeCard o={o} key={o.key} />))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55 }} className="mt-20 md:mt-24">
                <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-wider text-amber-300">
                    <BarChart3 className="h-5 w-5 text-amber-400" />
                    <span>How We Measure Success</span>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{measurements.map((m, i) => (<MeasurementTile m={m} i={i} key={m.label} />))}</div>
            </motion.div>
            
            <div className="mt-20 md:mt-24">
                <InventoryControlVisualizer />
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55 }} className="mt-20 md:mt-24">
                <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-wider text-amber-300">
                    <Network className="h-5 w-5 text-amber-400" />
                    <span>What Drives Impact</span>
                </div>
                <ul className="mt-6 grid list-none gap-x-8 gap-y-4 pl-0 sm:grid-cols-2">{factors.map((f, i) => (<ImpactFactor f={f} i={i} key={f} />))}</ul>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }} className="relative mx-auto mt-20 flex max-w-lg flex-col items-center gap-4 text-center md:mt-24">
                <div className="pointer-events-none absolute -top-1/2 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/4">
                    {[...Array(3)].map((_, i) => (
                        <motion.div key={i} className="absolute inset-0 rounded-full border-2" style={{ borderColor: 'rgba(217, 119, 6, 0.3)', background: `radial-gradient(circle, rgba(217,119,6,0.1) 0%, rgba(217,119,6,0) 60%)`}}
                            initial={{ scale: 0.8, opacity: 0.5 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 4, ease: "linear", repeat: Infinity, delay: i * 1.33 }}
                        />
                    ))}
                </div>
                <motion.div
                    className="absolute -top-8"
                    animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <Zap className="h-8 w-8 text-amber-400/80 -rotate-12" />
                </motion.div>
                <GradientButton size="lg" className="group bg-gradient-to-br from-amber-500 to-amber-600 text-blue-950 shadow-lg shadow-amber-900/40 hover:from-amber-600 hover:to-amber-600">
                    <span className="absolute inset-0 block overflow-hidden">
                       <span className="absolute inset-0 -translate-x-full transform-gpu skew-x-[-20deg] animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                    </span>
                    <a href="#contact" className="relative flex items-center gap-2">
                        <span>See The Impact</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                </GradientButton>
                <p className="text-base text-blue-300">We’ll baseline your KPIs first, then track improvements—so results speak for themselves.</p>
            </motion.div>
        </div>
    </section>
  );
}