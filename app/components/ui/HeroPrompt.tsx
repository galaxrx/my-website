// app/components/ui/HeroPrompt.tsx
"use client";

import { Sparkles, CheckCircle } from "lucide-react";

export default function HeroPrompt() {
  return (
    // Outer container for the card-like effect with border and background
    <div className="group relative rounded-xl border border-amber-500/10 bg-slate-900 p-1.5 shadow-[0_0_0_1px_rgba(251,191,36,0.04)_inset] backdrop-blur">
      {/* Inner glow effect on hover */}
      <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(60%_50%_at_50%_10%,rgba(251,191,36,0.1),transparent_70%)]"
      />

      <div className="relative z-10 p-4 text-left"> {/* Added padding here */}
        <div className="flex items-center gap-2 mb-3">
          {/* Styled Sparkles icon for the "pill" effect */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-950/30 px-2.5 py-0.5 text-xs text-amber-300 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            Smart Optimization
          </div>
          {/* Main heading of the prompt */}
          <span className="text-base font-medium text-white">
            Stop guessing, start optimizing.
          </span>
        </div>
        
        {/* Benefit list */}
        <ul className="space-y-2 text-sm text-slate-400 mt-4"> {/* Added margin-top */}
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-green-400/80 mt-0.5 shrink-0" />
            <span>
              <strong>Cut Costs:</strong> Eliminate overstock and prevent costly stockouts with AI-powered recommendations.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-green-400/80 mt-0.5 shrink-0" />
            <span>
              <strong>Automate Everything:</strong> Reclaim hours every week by automating purchase orders and stock management.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-green-400/80 mt-0.5 shrink-0" />
            <span>
              <strong>Get Easy Insights:</strong> Ask your AI CoPilot complex questions in plain English and get instant answers—no spreadsheets required.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}