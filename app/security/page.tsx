'use client';

import { Suspense } from 'react';
import { Lock, ShieldCheck, DatabaseZap, EyeOff } from 'lucide-react';
import Link from 'next/link';
import GradientButton from '@/app/components/ui/GradientButton';

const securityPillars = [
  {
    icon: ShieldCheck,
    title: "Encryption at Rest & In-Transit",
    description: "Your data is protected using industry-standard AES-256 encryption when stored and TLS 1.3 encryption while in transit between our services and your pharmacy."
  },
  {
    icon: DatabaseZap,
    title: "Robust Access Controls",
    description: "GALAXRX enforces strict, role-based access controls. Team members only see the data and features relevant to their role, protecting sensitive financial and operational information."
  },
  {
    icon: EyeOff,
    title: "Data Privacy & Ownership",
    description: "Your pharmacy's data is your own. We act only as a processor and never share or sell your data. You can request a full export of your data at any time."
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
              <Lock className="h-8 w-8 text-amber-400" />
            </div>
            <h1 className="font-heading text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Security & Trust
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-slate-400 md:text-lg">
              We are committed to protecting your pharmacy's data with enterprise-grade security and a privacy-first approach.
            </p>
          </div>
        </div>

        {/* Pillars Section */}
        <div className="py-16 md:py-24">
          <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto space-y-12">
                  {securityPillars.map((pillar) => (
                      <div key={pillar.title} className="flex items-start gap-6">
                          <div className="rounded-xl border border-amber-400/10 bg-amber-950/20 p-2 mt-1">
                              <pillar.icon className="h-6 w-6 text-amber-400" />
                          </div>
                          <div>
                              <h3 className="text-lg font-semibold text-gray-100">{pillar.title}</h3>
                              <p className="mt-2 text-sm leading-relaxed text-slate-400">{pillar.description}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="py-24 text-center">
           <div className="container mx-auto px-4">
              <h2 className="font-heading text-3xl font-semibold">Have a security question?</h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                  Our team is happy to provide our security documentation and answer any questions you may have.
              </p>
              <div className="mt-8">
                   <GradientButton
                      asChild
                      className="bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-900/40 hover:from-amber-600 hover:to-amber-600"
                    >
                      <Link href="/#contact">Contact Us</Link>
                  </GradientButton>
              </div>
           </div>
        </div>
      </div>
    </Suspense>
  );
}