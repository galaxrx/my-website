"use client";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from 'next/link';
import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import {
  LineChart,
  Cpu,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Database,
  ShoppingCart,
  Box,
  CalendarClock,
  Tag,
  AlertTriangle,
  MonitorSmartphone, // for POS
  Truck,             // for Supplier
  PackageSearch,     // for Inventory
  BrainCircuit,      // for AI Nodes
  Pill,              // for Capsules
  BarChart3,         // for Charts
  ClipboardPen,      // for Prescriptions (PMS)
  Beaker,            // for Mortar/Compounding
  LayoutGrid,        // for Shelf
  Waypoints,         // for Flow/Graph
} from "lucide-react";

// ============================================================================
// 1. ADVANCED VISUALIZATION SUBCOMPONENTS (PHARMACY-THEMED)
// ============================================================================

/**
 * AI Pillar: An animated capsule infused with data streams, with an AI brain pulsing within.
 * This directly connects the concept of AI to the core pharmaceutical product.
 */
const SmartCapsule = () => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className="w-full h-full flex justify-center items-center"
      aria-label="AI-powered smart capsule visualization"
      role="img"
    >
      <svg width="160" height="90" viewBox="0 0 160 90">
        <defs>
          <linearGradient id="capsuleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
              <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
              </feMerge>
          </filter>
        </defs>

        {/* Data streams flowing into the capsule */}
        {!shouldReduceMotion && (
          <>
            <motion.path d="M 10 25 C 40 15, 50 55, 70 45" fill="none" stroke="#fbbF24" strokeWidth="1.5" strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" from="20" to="0" dur="2s" repeatCount="indefinite" />
            </motion.path>
            <motion.path d="M 10 65 C 40 75, 50 35, 70 45" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" from="-20" to="0" dur="2.5s" repeatCount="indefinite" />
            </motion.path>
          </>
        )}
        
        {/* Capsule Body */}
        <g transform="translate(80, 45)">
          <motion.path
            d="M -30 -15 A 15 15 0 0 1 -30 15 L 30 15 A 15 15 0 0 1 30 -15 Z"
            fill="url(#capsuleGradient)"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1"
            filter="url(#glow)"
          />
          <motion.path
            d="M -30 -15 A 15 15 0 0 1 -30 15"
            fill="#1e40af"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1"
          />
        </g>

        {/* AI Brain Icon Inside */}
        <motion.g
          initial={{ scale: 0.9, opacity: 0.7 }}
          animate={!shouldReduceMotion ? { scale: [0.9, 1, 0.9], opacity: [0.7, 1, 0.7] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <BrainCircuit x="68" y="33" className="h-6 w-6 text-amber-300" />
        </motion.g>
      </svg>
    </motion.div>
  );
};


/**
 * Inventory Pillar: An intelligent shelf map showing stock levels and AI-driven optimizations.
 * Visualizes real-time inventory adjustments and data-driven placement.
 */
const NeuralShelfMap = () => {
    const shouldReduceMotion = useReducedMotion();
    const shelves = [
        { items: [0.8, 0.9, 0.5, 0.7, 0.9, 0.6] },
        { items: [0.4, 0.3, 0.8, 0.9, 0.7, 0.5] },
        { items: [0.9, 0.6, 0.7, 0.4, 0.8, 0.9] },
    ];
    const itemWidth = 18;
    const itemGap = 6;
    const shelfHeight = 28;
    const totalWidth = shelves[0].items.length * (itemWidth + itemGap) - itemGap;

    return (
        <div className="w-full h-full flex justify-center items-center p-4" aria-label="AI-powered inventory shelf map visualization" role="img">
            <svg width="100%" height="100%" viewBox={`0 0 ${totalWidth} ${shelves.length * shelfHeight + 10}`}>
                <defs>
                    <linearGradient id="shelfItemGradient" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#ca8a04" />
                        <stop offset="100%" stopColor="#fde047" />
                    </linearGradient>
                </defs>
                {shelves.map((shelf, shelfIndex) => (
                    <g key={shelfIndex} transform={`translate(0, ${shelfIndex * shelfHeight})`}>
                        {shelf.items.map((level, itemIndex) => {
                            const x = itemIndex * (itemWidth + itemGap);
                            return (
                                <motion.rect
                                    key={itemIndex}
                                    x={x}
                                    y={shelfHeight - (shelfHeight * level)}
                                    width={itemWidth}
                                    height={shelfHeight * level}
                                    rx="2"
                                    fill="url(#shelfItemGradient)"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: shelfHeight * level, opacity: 1 }}
                                    transition={{ delay: (shelfIndex * 0.2) + (itemIndex * 0.05), type: 'spring', stiffness: 200, damping: 20 }}
                                >
                                  {!shouldReduceMotion && (
                                    <animate
                                        attributeName="opacity"
                                        values="1;0.7;1"
                                        dur={`${2 + Math.random() * 2}s`}
                                        repeatCount="indefinite"
                                        begin={`${Math.random()}s`}
                                    />
                                  )}
                                </motion.rect>
                            );
                        })}
                    </g>
                ))}
            </svg>
        </div>
    );
};


/**
 * Procurement Pillar: A dynamic flow showing demand signals being processed into supplier orders.
 * This visualization clearly demonstrates the automated, intelligent purchasing workflow.
 */
const AutomatedPharmacyOrderFlow = () => {
  const shouldReduceMotion = useReducedMotion();

  const stages = [
    { id: 'demand', icon: ClipboardPen, cx: 30, cy: 50 },
    { id: 'ai', icon: BrainCircuit, cx: 90, cy: 50 },
    { id: 'inventory', icon: Database, cx: 150, cy: 25 },
    { id: 'order', icon: ShoppingCart, cx: 150, cy: 75 },
    { id: 'supplier', icon: Truck, cx: 210, cy: 75 },
  ];

  const connections = [
    { path: 'M 40 50 H 80' },
    { path: 'M 100 50 Q 125 50, 140 35' },
    { path: 'M 100 50 Q 125 50, 140 65' },
    { path: 'M 160 75 H 200' },
  ];

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0.5 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: i * 0.4, type: 'spring', stiffness: 300, damping: 15 },
    }),
  };

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: { delay: (i * 0.4) + 0.3, duration: 0.5, ease: 'easeInOut' },
    }),
  };

  return (
    <div className="w-full h-full flex justify-center items-center p-4" aria-label="Automated pharmacy procurement workflow visualization" role="img">
      <svg width="240" height="100" viewBox="0 0 240 100">
        <defs>
            <filter id="iconGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        
        {/* Connections */}
        {!shouldReduceMotion && connections.map((conn, i) => (
          <motion.path
            key={i}
            d={conn.path}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeLinecap="round"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            custom={i}
          />
        ))}

        {/* Icons */}
        {stages.map((stage, i) => (
          <motion.g 
            key={stage.id}
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            custom={i}
          >
            <circle cx={stage.cx} cy={stage.cy} r="12" fill={shouldReduceMotion ? "#3b82f6" : "transparent"} stroke="#f59e0b" strokeWidth="1" />
            <stage.icon
              x={stage.cx - 8}
              y={stage.cy - 8}
              className="h-4 w-4 text-amber-300"
              filter={stage.id === 'ai' ? 'url(#iconGlow)' : undefined}
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
};


// ============================================================================
// 2. PILLAR & SECTION CONFIGURATION
// ============================================================================
const pillars = [
  {
    icon: LineChart,
    title: "Predictive Forecasting & AI",
    visualization: <SmartCapsule />,
    blurb:
      "Our AI delivers precise, explainable forecasts by analyzing your unique sales data, seasonality, and market trends.",
    bullets: ["Models seasonality & promos", "Explainable AI recommendations", "Learns from your sales patterns"],
    cta: { text: "Learn About Our AI", href: "/responsible-ai" }
  },
  {
    icon: LayoutGrid,
    title: "Data-Driven Inventory Optimization",
    visualization: <NeuralShelfMap />,
    blurb:
      "Get a live, intelligent view of your stock. Our system suggests optimal shelf levels and flags slow-movers to reduce waste.",
    bullets: ["Visualizes stock utilization", "Flags expiry & overstock risks", "Optimizes product placement"],
    cta: { text: "Explore Data Security", href: "/security" }
  },
  {
    icon: Waypoints,
    title: "Automated & Intelligent Procurement",
    visualization: <AutomatedPharmacyOrderFlow />,
    blurb:
      "Automate purchase orders based on predictive demand, supplier lead times, and your business rules, not just static numbers.",
    bullets: ["Factors in lead time & order cycles", "Aligns with promotional calendars", "Prevents stockouts & excess capital tie-up"],
    cta: { text: "View Platform Features", href: "/platform" }
  },
];

const GradientButton = ({ children, className, ...props }: React.ComponentProps<'button'>) => (
  <button className={cn("relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-full", className)} {...props}>
    <span className="absolute w-full h-full bg-gradient-to-br from-amber-500 via-amber-600 to-orange-500 group-hover:from-amber-600 group-hover:via-orange-500 group-hover:to-yellow-500"></span>
    <span className="relative px-6 py-3 transition-all ease-out bg-slate-950 rounded-full group-hover:bg-opacity-90">
      <span className="relative text-white">{children}</span>
    </span>
  </button>
);

const AnimatedGradientBackground = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
            className="absolute top-0 left-0 w-[150%] h-[150%] opacity-20"
            style={{
                background: `radial-gradient(circle at 20% 20%, #4a2d04, transparent 40%),
                             radial-gradient(circle at 80% 30%, #2c1d4f, transparent 40%),
                             radial-gradient(circle at 50% 80%, #0c3a5b, transparent 40%)`,
            }}
            animate={{
                x: ['-25%', '0%', '-25%'],
                y: ['-25%', '0%', '-25%'],
                rotate: [0, 15, 0],
            }}
            transition={{
                duration: 25,
                ease: 'easeInOut',
                repeat: Infinity,
            }}
        />
    </div>
);


const ParallaxParticles = ({ target }: { target: React.RefObject<HTMLElement> }) => {
  const { scrollYProgress } = useScroll({ target });
  const shouldReduceMotion = useReducedMotion();

  const particles = [
    { y: useTransform(scrollYProgress, [0, 1], ['-20%', '120%']), x: '10vw', opacity: 0.5, scale: 0.8, component: <BrainCircuit/> },
    { y: useTransform(scrollYProgress, [0, 1], ['0%', '100%']), x: '85vw', opacity: 0.4, scale: 0.6, component: <Pill/> },
    { y: useTransform(scrollYProgress, [0, 1], ['50%', '150%']), x: '5vw', opacity: 0.3, scale: 0.5, component: <BarChart3/> },
    { y: useTransform(scrollYProgress, [0, 1], ['-10%', '90%']), x: '90vw', opacity: 0.6, scale: 0.9, component: <BrainCircuit/> },
    { y: useTransform(scrollYProgress, [0, 1], ['20%', '110%']), x: '50vw', opacity: 0.2, scale: 0.4, component: <Pill/> },
    { y: useTransform(scrollYProgress, [0, 1], ['30%', '130%']), x: '25vw', opacity: 0.25, scale: 0.45, component: <Database/> },
  ];

  if (shouldReduceMotion) return null;

  return (
    <>
      {particles.map((p, i) => (
        <motion.div key={i} className="absolute text-amber-400/50" style={{ y: p.y, x: p.x, opacity: p.opacity, scale: p.scale }}>
          {p.component}
        </motion.div>
      ))}
    </>
  );
};


// ============================================================================
// 3. MAIN SECTION COMPONENT
// ============================================================================
export default function WhyGalaxrxSection() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="why-galaxrx"
      ref={sectionRef}
      aria-labelledby="why-title"
      className="relative bg-slate-950 py-24 md:py-32 lg:py-40 overflow-hidden" 
    >
      <AnimatedGradientBackground />
      <ParallaxParticles target={sectionRef} />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-950/30 px-3 py-1 text-sm text-amber-300 backdrop-blur"
          >
            <Sparkles className="h-4 w-4 text-amber-400" />
            Built for modern pharmacies
          </div>

          <h2
            id="why-title"
            className={cn(
              "mt-4 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl font-heading" 
            )}
          >
            The smartest way to manage your pharmacy inventory
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-balance text-lg md:text-xl lg:text-2xl text-slate-400">
            GALAXRX blends predictive AI and smart UX to turn your pharmacy data into confident, decisive action.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
              whileHover={!shouldReduceMotion ? { y: -5, scale: 1.02, rotateY: -2, rotateX: 2 } : {}}
              style={{ transformStyle: "preserve-3d" }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-amber-500/10 bg-slate-900/80 p-6 shadow-lg backdrop-blur-md"
            >
              <motion.div
                className="absolute inset-0 border-2 border-amber-400/50 rounded-2xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: !shouldReduceMotion ? 1 : 0 }}
                style={{
                  background: 'radial-gradient(circle at 50% 50%, transparent 50%, rgba(251, 191, 36, 0.1))',
                  transform: 'translateZ(-10px)'
                }}
              />
              <div className="flex-grow">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl border border-amber-400/10 bg-amber-950/20 p-2.5">
                    <pillar.icon className="h-6 w-6 text-amber-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-100">{pillar.title}</h3>
                </div>

                <div
                  className="my-4 overflow-hidden rounded-xl border border-amber-400/20 bg-slate-900/60 backdrop-blur-sm h-36 md:h-40 lg:h-44 relative"
                  aria-hidden="true"
                >
                  {pillar.visualization}
                </div>

                <p className="mt-6 text-base leading-relaxed text-slate-400">{pillar.blurb}</p>
                <ul className="mt-5 space-y-2 text-base text-slate-300/90">
                  {pillar.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-2 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-amber-400/70" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-6">
                <Link 
                  href={pillar.cta.href} 
                  className="group/link relative inline-flex items-center gap-1.5 text-base font-medium text-amber-300 transition-colors hover:text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400/40 rounded-md"
                >
                  <span className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 transform bg-amber-300 transition-transform duration-300 group-hover/link:scale-x-100"></span>
                  {pillar.cta.text}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 text-base text-slate-400"
        >
          <motion.div
            initial={{ scale: 1 }}
            whileInView={!shouldReduceMotion ? { scale: [1, 1.2, 1], transition: { duration: 1, ease: 'easeInOut', delay: 0.5 } } : {}}
            viewport={{ once: true, amount: 0.5 }}
          >
            <ShieldCheck className="h-5 w-5 text-amber-400" />
          </motion.div>
          <span>Privacy-first • Role-based access • Full data export controls</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mt-10 flex max-w-md flex-col items-center gap-3 text-center md:mt-14"
        >
          <div className="relative">
             <motion.div
              className="absolute -inset-2 rounded-full bg-amber-500/30 blur-xl"
              animate={!shouldReduceMotion ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <GradientButton>
              <a href="#contact">Get a Demo</a>
            </GradientButton>
          </div>
          <p className="text-base text-slate-400">
            See how automation and explainable AI can transform your pharmacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}