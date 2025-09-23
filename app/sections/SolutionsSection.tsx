// app/sections/SolutionsSection.tsx
'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useScroll, useTime } from 'framer-motion';
import { cn } from '@/lib/utils';
import GradientButton from '@/app/components/ui/GradientButton';
import { Zap, LineChart, BrainCircuit, Package, Megaphone, Bot, AlertCircle, TrendingUp, Cpu } from 'lucide-react';

// --- BACKGROUND & PARTICLES ---

const ParallaxGradientMeshBackground = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;

            constructor(x: number, y: number, color: string) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.color = color;
            }
            update() {
                const dx = mouse.current.x - this.x;
                const dy = mouse.current.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (100 - distance) / 300;
                    this.x += forceDirectionX * force;
                    this.y += forceDirectionY * force;
                }

                this.x += this.speedX;
                this.y += this.speedY;

                if (this.size > 0.1) this.size -= 0.02;
            }
            draw() {
                if (ctx && this.size > 0.1) {
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        let particles: Particle[] = [];
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            if (particles.length < 100) {
                const color = Math.random() > 0.5 ? 'rgba(139, 92, 246, 0.7)' : 'rgba(251, 191, 36, 0.7)';
                particles.push(new Particle(mouse.current.x, mouse.current.y, color));
            }
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                if (particles[i].size <= 0.1) {
                    particles.splice(i, 1);
                    i--;
                }
            }
            requestAnimationFrame(animate);
        };
        animate();

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-10"
            style={{ y }}
        >
            <div className="absolute inset-0 bg-slate-950" />
            <motion.div
                className="absolute inset-0 bg-[radial-gradient(40%_30%_at_10%_10%,rgba(139,92,246,0.1),transparent_80%),radial-gradient(40%_30%_at_90%_90%,rgba(251,191,36,0.1),transparent_80%)]"
                animate={{
                    transform: ['translateX(0%) translateY(0%)', 'translateX(10%) translateY(-10%)', 'translateX(0%) translateY(0%)'],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />
            <canvas ref={canvasRef} className="absolute inset-0 opacity-50" />
        </motion.div>
    );
};


// --- VISUALIZATION SUBCOMPONENTS ---

const ForecastingBarChart = () => {
    const data = [
        { type: 'hist', value: 80 }, { type: 'hist', value: 65 }, { type: 'hist', value: 75 },
        { type: 'hist', value: 90 }, { type: 'hist', value: 85 }, { type: 'hist', value: 100 },
        { type: 'forecast', value: 95 }, { type: 'forecast', value: 110 }, { type: 'forecast', value: 105 }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    };

    const barVariants = {
        hidden: { y: 120, height: 0, opacity: 0 },
        visible: (custom: number) => ({
            y: 120 - custom,
            height: custom,
            opacity: 1,
            transition: { type: 'spring', stiffness: 150, damping: 15 }
        })
    };

    return (
        <motion.div
            className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-800/50 border border-white/10 rounded-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
        >
            <div className="w-full flex justify-between items-center mb-2">
                 <h4 className="text-sm font-bold text-amber-400">Demand Forecast</h4>
                 <div className="flex items-center gap-3 text-xs">
                     <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-slate-600"/><span>Historical</span></div>
                     <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-purple-600"/><span>Forecast</span></div>
                 </div>
            </div>
            <svg viewBox="0 0 280 140" className="w-full h-full overflow-visible">
                {/* Y-axis line */}
                <path d="M0 0 V 120" stroke="#475569" strokeWidth="0.5" />
                {/* X-axis line */}
                <path d="M0 120 H 280" stroke="#475569" strokeWidth="0.5" />
                
                <motion.g variants={containerVariants}>
                    {data.map((d, i) => (
                        <motion.rect
                            key={i}
                            x={i * 30 + 5}
                            width="20"
                            rx="2"
                            className={d.type === 'hist' ? 'fill-slate-600' : 'fill-purple-600'}
                            custom={d.value}
                            variants={barVariants}
                        />
                    ))}
                </motion.g>
            </svg>
        </motion.div>
    );
};


const InventorySim = () => {
    const [isOptimized, setIsOptimized] = useState(false);
    useEffect(() => {
        const interval = setInterval(() => setIsOptimized(prev => !prev), 4000);
        return () => clearInterval(interval);
    }, []);

    const chaoticPath = "M0,60 C40,10 60,110 100,70 S140,0 180,60 S220,130 260,80";
    const optimizedPath = "M0,70 C40,65 60,75 100,72 S140,68 180,70 S220,73 260,70";

    const spring = useSpring(0, { stiffness: 100, damping: 15 });
    useEffect(() => {
        spring.set(isOptimized ? 1 : 0);
    }, [isOptimized, spring]);

    const d = useTransform(spring, [0, 1], [chaoticPath, optimizedPath]);

    return (
        <motion.div whileHover={{ scale: 1.05 }} className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-800/50 border border-white/10 rounded-lg transition-all duration-300">
            <svg viewBox="0 0 260 140" className="w-full h-4/5 overflow-visible">
                <defs>
                    <linearGradient id="bandGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgba(5, 150, 105, 0)" />
                        <stop offset="50%" stopColor="rgba(5, 150, 105, 0.2)" />
                        <stop offset="100%" stopColor="rgba(5, 150, 105, 0)" />
                    </linearGradient>
                </defs>
                <rect x="0" y="50" width="260" height="40" fill="url(#bandGradient)" />
                <path d="M0 50 H 260" stroke="#10b981" strokeDasharray="2" strokeWidth="0.5" />
                <path d="M0 90 H 260" stroke="#10b981" strokeDasharray="2" strokeWidth="0.5" />
                <text x="265" y="75" fill="#94a3b8" fontSize="10" textAnchor="start">Optimal Zone</text>
                <motion.path d={d} stroke={isOptimized ? "#f59e0b" : "#94a3b8"} strokeWidth="2.5" fill="none" />
                {/* Bouncing dot */}
                <motion.circle r="4" fill={isOptimized ? "#f59e0b" : "#94a3b8"}>
                    <animateMotion dur="4s" repeatCount="indefinite" path={isOptimized ? optimizedPath : chaoticPath} />
                </motion.circle>
            </svg>
            <div className="text-sm mt-2 text-slate-400 text-center px-2">
                <AnimatePresence mode="wait">
                    <motion.div key={isOptimized ? 'opt' : 'chaos'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        {isOptimized ? "AI maintains inventory within the optimal band." : "Manual ordering leads to volatile stock levels."}
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

const PromoRaceChart = () => {
    const promoData = [
        { name: 'Vitamin C', uplift: 70, color: '#f59e0b' },
        { name: 'Allergy Relief', uplift: 50, color: '#84cc16' },
        { name: 'Cold & Flu', uplift: 90, color: '#3b82f6' },
        { name: 'Pain Relief', uplift: 40, color: '#a855f7' },
        { name: 'Gift Sets', uplift: 85, color: '#ec4899' },
    ];
    const [data, setData] = useState(promoData);
    const [month, setMonth] = useState('October');
    const months = ['October', 'November', 'December', 'January'];

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prevData =>
                prevData.map(item => ({ ...item, uplift: Math.max(20, Math.min(100, item.uplift + Math.random() * 20 - 10)) })).sort((a, b) => b.uplift - a.uplift)
            );
            setMonth(prevMonth => {
                const currentIndex = months.indexOf(prevMonth);
                return months[(currentIndex + 1) % months.length];
            });
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div whileInView="visible" viewport={{ once: true, amount: 0.5 }} transition={{ staggerChildren: 0.1 }} className="w-full h-full flex flex-col p-4 bg-slate-800/50 border border-white/10 rounded-lg">
            <div className="flex justify-between items-baseline mb-3">
                <h4 className="font-bold text-amber-400 text-sm">Promotion Uplift</h4>
                <AnimatePresence mode="wait">
                    <motion.h5 key={month} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-mono text-lg text-white">{month}</motion.h5>
                </AnimatePresence>
            </div>
            <div className="flex-grow space-y-2 relative">
                <AnimatePresence>
                    {data.map((item, index) => (
                        <motion.div
                            key={item.name}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, y: index * 36 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="absolute w-full h-8"
                            whileHover={{ scale: 1.03 }}
                        >
                            <div className="flex items-center h-full group">
                                <span className="text-xs text-slate-300 w-28 truncate pr-2">{item.name}</span>
                                <div className="flex-1 bg-slate-700 rounded-full h-full overflow-hidden">
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: item.color }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.uplift}%` }}
                                        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                                    />
                                </div>
                                <span className="text-xs font-mono text-white w-12 text-right pl-2">{item.uplift.toFixed(0)}%</span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

const AgentReply = () => {
    const baseText = "High Risk: Atorvastatin 20mg. Sales velocity is up 30%. Projected stockout in 2 days.";
    const [displayText, setDisplayText] = useState('');
    const [showChart, setShowChart] = useState(false);

    useEffect(() => {
        setDisplayText('');
        setShowChart(false);
        let i = 0;
        const interval = setInterval(() => {
            setDisplayText(baseText.substring(0, i));
            i++;
            if (i > baseText.length) {
                clearInterval(interval);
                setShowChart(true);
            }
        }, 30);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full flex flex-col p-4 bg-slate-800/50 border border-white/10 rounded-lg space-y-3 justify-end">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="p-3 max-w-[80%] rounded-lg bg-slate-700 self-start text-slate-200 text-sm">
                Show me my biggest stockout risk this week.
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="p-3 max-w-[80%] rounded-lg bg-purple-600/30 border border-purple-500/50 self-end text-slate-200 text-sm space-y-2">
                <p>
                    {displayText}
                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="inline-block w-0.5 h-4 bg-slate-200 ml-1" />
                </p>
                {showChart && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-2">
                        <div className="text-xs text-red-300 mb-1">Stockout Risk: 85%</div>
                        <div className="w-full bg-red-900/50 rounded-full h-2">
                            <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 0.8, ease: 'easeOut' }} className="bg-red-500 h-2 rounded-full" />
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};


const PurchasePlanCardViz = () => {
    const [isOptimized, setIsOptimized] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setIsOptimized(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const count = useSpring(0, { mass: 0.5, stiffness: 100, damping: 20 });
    const progressValue = useTransform(count, [0, 240], [0, 100]);
    const progress = useTransform(progressValue, p => `${p}%`);

    useEffect(() => {
        if(isOptimized) {
            count.set(240);
        }
    }, [isOptimized, count]);

    return (
        <motion.div className="relative w-full h-full" whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 300 } }}>
            <AnimatePresence>
                {isOptimized && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.6, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-600 to-amber-500 blur-md"
                    />
                )}
            </AnimatePresence>
            <div className="relative w-full h-full p-6 bg-slate-900 rounded-lg border border-white/10 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-center">
                        <h4 className="font-bold text-white text-lg">Purchase Plan: #3108</h4>
                        <AnimatePresence>
                            {isOptimized && (
                                <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full flex items-center gap-1">
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}><BrainCircuit size={12} /></motion.div> Optimized
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                    <p className="text-sm text-slate-400 mt-1">Generated: 22 Sep 2025</p>
                </div>
                <div className="space-y-3 mt-4">
                    <div className="w-full bg-slate-700/50 rounded-full h-2.5">
                        <motion.div className="bg-gradient-to-r from-purple-500 to-amber-500 h-2.5 rounded-full" style={{ width: progress }} />
                    </div>
                    <div className="flex justify-between items-center text-slate-300"><span className="flex items-center gap-2"><Package size={16} /> Amoxicillin 500mg</span> <span>192 units</span></div>
                    <div className="flex justify-between items-center text-slate-300"><span className="flex items-center gap-2"><Package size={16} /> Atorvastatin 20mg</span> <span>48 units</span></div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 text-right">
                    <span className="text-amber-400 font-bold text-xl">
                        Total: <motion.span>{useTransform(count, v => Math.round(v))}</motion.span> units
                    </span>
                </div>
            </div>
        </motion.div>
    );
};


// --- MAIN DATA & COMPONENT ---
const solutionsCopy = {
    headline: "A Smarter Workflow, From Forecast to Fulfillment",
    subheadline: "GALAXRX integrates every step of inventory management into a single, intelligent platform designed for pharmacy operations.",
    cards: [
        { key: 'forecast', shortLabel: "AI Forecasting", icon: Zap, title: "Predictive Forecasting", blurb: "Our AI anticipates demand, accounting for seasonality and trends to achieve up to 95% forecast accuracy.", viz: ForecastingBarChart },
        { key: 'optimize', shortLabel: "Inventory Optimization", icon: TrendingUp, title: "Dynamic Optimization", blurb: "Automate safety stock, reorder points, and order quantities to reduce stockouts by over 40%.", viz: InventorySim },
        { key: 'promotion', shortLabel: "Promotion Planning", icon: Megaphone, title: "Promotion Planning", blurb: "Our AI recommends the optimal discount strategy for a portfolio of products to maximize revenue while protecting margins.", viz: PromoRaceChart },
        { key: 'purchasePlanCard', shortLabel: "Automated Purchasing", icon: BrainCircuit, title: "Intelligent Purchasing", blurb: "Generate constraint-aware purchase orders in seconds, not hours, saving your team valuable time each week.", viz: PurchasePlanCardViz },
        { key: 'agent', shortLabel: "AI Agent", icon: Bot, title: "Your AI Agent", blurb: "A 24/7 assistant to flag issues, answer questions, and automate routine inventory analysis.", viz: AgentReply },
    ],
    cta: { primaryCtaText: "Explore Platform Features", primaryCtaSubcopy: "See a full breakdown of our powerful, pharmacy-first toolset." }
};
type SolutionCardKey = typeof solutionsCopy.cards[0]['key'];

export default function SolutionsSection() {
    const [activeSolution, setActiveSolution] = useState<SolutionCardKey>(solutionsCopy.cards[0].key);
    const activeCardData = solutionsCopy.cards.find((card) => card.key === activeSolution);
    const time = useTime();
    const rotate = useTransform(time, [0, 4000], [0, 360], { clamp: false });

    const x = useMotionValue(0); const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 40 }); const springY = useSpring(y, { stiffness: 300, damping: 40 });
    const rotateX = useTransform(springY, [-100, 100], [4, -4]); const rotateY = useTransform(springX, [-100, 100], [-4, 4]);

    const cardVariants = {
        initial: { opacity: 0, filter: 'blur(10px)', scale: 0.95, y: 20 },
        animate: { opacity: 1, filter: 'blur(0px)', scale: 1, y: 0 },
        exit: { opacity: 0, filter: 'blur(10px)', scale: 0.95, y: -20 },
    };

    const backgroundMorph: Record<SolutionCardKey, string> = {
        forecast: 'radial-gradient(at 20% 20%, hsla(260, 80%, 60%, 0.2), transparent 50%)',
        optimize: 'radial-gradient(at 80% 20%, hsla(150, 70%, 50%, 0.2), transparent 50%)',
        promotion: 'radial-gradient(at 80% 80%, hsla(330, 80%, 60%, 0.2), transparent 50%)',
        purchasePlanCard: 'radial-gradient(at 20% 80%, hsla(40, 90%, 60%, 0.2), transparent 50%)',
        agent: 'radial-gradient(at 50% 50%, hsla(220, 80%, 70%, 0.2), transparent 50%)',
    };

    return (
        <motion.section id="solutions" aria-labelledby="solutions-title" className="relative" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
            <ParallaxGradientMeshBackground />
            <div className="container mx-auto py-24 px-4 md:py-32">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 id="solutions-title" className="font-heading text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">{solutionsCopy.headline}</h2>
                    <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-slate-400 md:text-xl">{solutionsCopy.subheadline}</p>
                </div>

                <div className="relative mt-12 flex flex-wrap items-center justify-center gap-1 md:gap-2">
                    {solutionsCopy.cards.map((card) => (
                        <button key={card.key} onClick={() => setActiveSolution(card.key)}
                        className={cn('relative rounded-full px-4 py-2.5 text-base font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950', activeSolution === card.key ? 'text-white' : 'text-slate-400 hover:text-white')}>
                            {card.shortLabel}
                            {activeSolution === card.key && (<motion.div layoutId="active-solution-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />)}
                        </button>
                    ))}
                </div>

                <div className="relative mx-auto mt-10 w-full max-w-5xl">
                    <AnimatePresence mode="wait">
                        {activeCardData && (
                            <motion.div key={activeCardData.key} style={{ rotateX, rotateY, perspective: 1200 }} onMouseMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); x.set(e.clientX - rect.left - rect.width / 2); y.set(e.clientY - rect.top - rect.height / 2); }} onMouseLeave={() => { x.set(0); y.set(0); }} className="min-h-[26rem] rounded-3xl border border-white/10 bg-slate-900/50 p-1 shadow-2xl shadow-black/40 backdrop-blur-xl md:min-h-[24rem] md:p-1.5">
                                <motion.div
                                    variants={cardVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="h-full w-full rounded-[20px] p-6 md:p-10"
                                >
                                    <div className="grid h-full grid-cols-1 items-center gap-8 md:grid-cols-2">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-4">
                                                <div className="rounded-lg border border-amber-400/10 bg-amber-950/20 p-3"><activeCardData.icon className="h-7 w-7 text-amber-400" aria-hidden="true" /></div>
                                                <h3 className="text-2xl font-bold text-gray-100">{activeCardData.title}</h3>
                                            </div>
                                            <p className="mt-4 text-lg text-slate-300">{activeCardData.blurb}</p>
                                        </div>
                                        <div className="h-56 w-full">
                                            <activeCardData.viz />
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="absolute inset-0 -z-10 rounded-3xl"
                                    initial={{ opacity: 0, backgroundImage: backgroundMorph[activeSolution as SolutionCardKey] }}
                                    animate={{ opacity: 1, backgroundImage: backgroundMorph[activeSolution as SolutionCardKey] }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8 }}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }} className="mx-auto mt-16 flex max-w-md flex-col items-center gap-4 text-center">
                    <div className="relative">
                         <motion.div style={{ rotate }} className="absolute -inset-8 -z-10 flex items-center justify-center opacity-20">
                            <Cpu size={80} className="text-amber-400" />
                        </motion.div>
                        <GradientButton size="lg" className="group relative overflow-hidden bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-900/40 hover:from-amber-600 hover:to-amber-600">
                             <motion.div
                                className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#fde047_0%,#f59e0b_50%,#fde047_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                            />
                            <a href="#contact" className="relative">{solutionsCopy.cta.primaryCtaText}</a>
                        </GradientButton>
                    </div>

                    <p className="text-base text-slate-400">{solutionsCopy.cta.primaryCtaSubcopy}</p>
                </motion.div>
            </div>
        </motion.section>
    );
}