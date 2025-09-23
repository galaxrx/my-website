'use client';

import { Suspense } from 'react';
import { BrainCircuit, UserCheck, Sparkles, Scale } from 'lucide-react';
import Link from 'next/link';
import GradientButton from '@/app/components/ui/GradientButton';

const principles = [
  {
    icon: Sparkles,
    title: "Explainable & Transparent AI",
    description: "We believe AI should not be a black box. GALAXRX provides clear explanations for its recommendations, showing you the key drivers—like seasonality, recent sales trends, or promotional uplift—so you can trust the 'why' behind the suggestion."
  },
  {
    icon: UserCheck,
    title: "Pharmacist in the Loop",
    description: "Our AI is a CoPilot, not an AutoPilot. It is designed to augment your team's expertise by handling the repetitive, data-heavy tasks. Final decisions always rest with your professional pharmacists, who can review, adjust, and approve all AI-generated plans."
  },
  {
    icon: Scale,
    title: "Fairness & Continuous Learning",
    description: "Our models are continuously monitored for accuracy and fairness. The system learns from your pharmacy's unique sales patterns and adapts over time, ensuring the recommendations become even more tailored and accurate."
  }
];

export default function Page() {
  return (
    <Suspense fallback={null}>
      <div className="bg-slate-950 text-white">
        {/* Hero Section */}
        <div className="relative bg-slate-950 py-24 md:py-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(251,191,36,0.08),transparent_60%)]"
          />
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center rounded-full border border-amber-400/10 bg-amber-950/20 p-3 mb-4">
              <BrainCircuit className="h-8 w-8 text-amber-400" />
            </div>
            <h1 className="font-heading text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Responsible AI for Pharmacy
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-slate-400 md:text-lg">
              Our commitment is to build AI that is transparent, trustworthy, and designed to empower—not replace—pharmacy professionals.
            </p>
          </div>
        </div>

        {/* Principles Section */}
        <div className="py-16 md:py-24">
          <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto space-y-12">
                  {principles.map((principle) => (
                      <div key={principle.title} className="flex items-start gap-6">
                          <div className="rounded-xl border border-amber-400/10 bg-amber-950/20 p-2 mt-1">
                              <principle.icon className="h-6 w-6 text-amber-400" />
                          </div>
                          <div>
                              <h3 className="text-lg font-semibold text-gray-100">{principle.title}</h3>
                              <p className="mt-2 text-sm leading-relaxed text-slate-400">{principle.description}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="py-24 text-center">
           <div className="container mx-auto px-4">
              <h2 className="font-heading text-3xl font-semibold">Explore the Platform</h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                  See our principles in action and discover how our AI can benefit your pharmacy.
              </p>
              <div className="mt-8">
                   <GradientButton
                      asChild
                      className="bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-900/40 hover:from-amber-600 hover:to-amber-600"
                    >
                      <Link href="/platform">View Platform Features</Link>
                  </GradientButton>
              </div>
           </div>
        </div>
      </div>
    </Suspense>
  );
}