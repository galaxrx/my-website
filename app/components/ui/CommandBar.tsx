// app/components/ui/CommandBar.tsx

"use client";
import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  DollarSign,
  BrainCircuit,
  ClipboardList,
  LayoutGrid,
  Activity,
  Truck
} from "lucide-react";
import { motion } from "framer-motion";
import { AITaskType } from '@/app/types/ai';

// --- YOUR PREFERRED LIST OF SUGGESTIONS ---
const suggestions: { text: string; task: AITaskType, icon: React.ElementType }[] = [
    { text: "Draft an AI-optimized purchase plan", task: 'generatePurchasePlan', icon: ClipboardList },
    { text: "Forecast demand to prevent stockouts", task: 'forecastDemand', icon: BrainCircuit },
    { text: "Find my dead stock and its value", task: 'askAssistant', icon: DollarSign },
    { text: "Analyze my business health", task: 'analyzeBusiness', icon: Activity },
    { text: "Analyze my top suppliers' performance", task: 'askAssistant', icon: Truck },
    { text: "Suggest a better shelf layout", task: 'optimizeShelves', icon: LayoutGrid },
];

type CommandBarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: (query: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

export default function CommandBar({ query, onQueryChange, onSubmit, inputRef }: CommandBarProps) {
  
  const handleSuggestionClick = (text: string) => {
    onQueryChange(text); // First, update the input text
    onSubmit(text);      // Then, immediately submit the query
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form
        onSubmit={handleFormSubmit}
        className="group relative rounded-2xl border border-white/10 bg-slate-900/80 p-3 backdrop-blur-lg transition-all duration-300 focus-within:border-cyan-400/50 focus-within:shadow-[0_0_20px_0_rgba(34,211,238,0.2)]"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-cyan-300" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Ask GALAXRX to optimize your pharmacy… (or press Cmd+K)"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            aria-label="Ask GALAXRX"
          />
          <button
            type="submit"
            className="inline-flex shrink-0 items-center gap-1 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-foreground ring-offset-2 ring-offset-transparent transition-colors hover:bg-white/[0.1] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Submit query"
          >
            Ask <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-3 flex flex-wrap gap-2"
          aria-label="Suggestions"
        >
          {suggestions.map(({ text, icon: Icon }) => (
              <button
                key={text}
                type="button"
                onClick={() => handleSuggestionClick(text)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-muted-foreground ring-offset-2 ring-offset-transparent transition-colors hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <Icon className="h-3.5 w-3.5" /> {text}
              </button>
            )
          )}
        </motion.div>
      </form>
    </div>
  );
}