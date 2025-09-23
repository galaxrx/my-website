import {
  BrainCircuit,
  AreaChart,
  PackageSearch,
  Megaphone,
  Truck,
  BotMessageSquare,
  ClipboardList, // Added new icon
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Define a type for the card data for better TypeScript support
export type SolutionCard = {
  // Added 'purchasePlanCard' to the union type
  key:
    | "kpi"
    | "forecast"
    | "inventory"
    | "promo"
    | "purchase"
    | "agent"
    | "purchasePlanCard";
  icon: LucideIcon;
  title: string;
  shortLabel: string;
  blurb: string;
  bullets?: [string, string, string]; // Made bullets optional
  microProof: string;
};

export const solutionsCopy = {
  headline: "The Pharmacy Operations Platform",
  subheadline:
    "GALAXRX unifies your data and automates daily decisions, from forecasting demand to placing the perfect purchase order—all in one place.",
  cards: [
    {
      key: "kpi",
      icon: AreaChart,
      title: "Clarity on Performance",
      shortLabel: "Insights",
      blurb:
        "Track real-time pharmacy KPIs on a custom dashboard that flags risks and surfaces growth opportunities automatically.",
      bullets: [
        "Monitor real-time stock health",
        "Identify slow and dead movers",
        "Track service level trends",
      ],
      microProof: "Customized for pharmacy metrics",
    },
    {
      key: "forecast",
      icon: BrainCircuit,
      title: "AI-Powered Forecasting",
      shortLabel: "Forecasting",
      blurb:
        "Our hybrid models predict demand with precision, capturing seasonality, holidays, and promotional uplift so you're never caught short.",
      bullets: [
        "Models adapt to local trends",
        "Seasonality and events built-in",
        "Forecasts update continuously",
      ],
      microProof: "Built-in explainability",
    },
    // --- NEW INTERACTIVE CARD ---
    {
      key: "purchasePlanCard",
      icon: ClipboardList,
      title: "Actionable Purchase Plans",
      shortLabel: "Purchase Plan UI",
      blurb:
        "Turn forecasts into actionable orders with a single click. Our AI considers lead times, supplier minimums, and budget constraints to build the perfect plan.",
      // No bullets needed; we will render the component
      microProof: "Saves hours of manual work weekly",
    },
    {
      key: "inventory",
      icon: PackageSearch,
      title: "Optimized Stock Levels",
      shortLabel: "Inventory",
      blurb:
        "Automate Min/Max/OM logic and safety stock to hold exactly what you need, reducing carrying costs and eliminating stockouts.",
      bullets: [
        "Lower capital holding costs",
        "Prevent costly stockouts",
        "Right-size your entire portfolio",
      ],
      microProof: "Tunable service level targets",
    },
    {
      key: "promo",
      icon: Megaphone,
      title: "Smarter Promotion Planning",
      shortLabel: "Promotions",
      blurb:
        "Model promotional uplift and test discount scenarios to accelerate sell-through, maximize margin, and improve cash flow.",
      bullets: [
        "Simulate margin and revenue impact",
        "Accelerate product sell-through",
        "Free up working capital faster",
      ],
      microProof: "Integrated with forecasting",
    },
    {
      key: "purchase",
      icon: Truck,
      title: "Intelligent Purchasing",
      shortLabel: "Purchasing",
      blurb:
        "Receive automated, data-driven purchase recommendations that account for supplier lead times, constraints, and portfolio goals.",
      bullets: [
        "Factor in supplier lead times",
        "Optimize for margin and turns",
        "Automate purchase order creation",
      ],
      microProof: "Constraint-aware logic",
    },
    {
      key: "agent",
      icon: BotMessageSquare,
      title: "Your AI Assistant",
      shortLabel: "AI Agent",
      blurb:
        "Ask plain-language questions about your data and receive instant, actionable answers and guided next steps from your AI copilot.",
      bullets: [
        "Ask questions, get answers",
        "Find insights without reports",
        "Guided, actionable next steps",
      ],
      microProof: "Natural language interface",
    },
  ] as SolutionCard[],
  cta: {
    primaryCtaText: "See The Platform",
    primaryCtaSubcopy:
      "Request a live demo and see how GALAXRX can transform your pharmacy's efficiency.",
  },
  seo: {
    metaTitle: "AI Pharmacy Inventory Management Solutions | GALAXRX",
    metaDescription:
      "Explore GALAXRX solutions for AI-powered forecasting, inventory optimization, promotion planning, and intelligent purchasing for pharmacies.",
  },
} as const;
