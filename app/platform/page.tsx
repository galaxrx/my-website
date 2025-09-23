import { ArrowRight, CheckCircle, Database, Zap, FileText } from 'lucide-react';
import GradientButton from '@/app/components/ui/GradientButton';
import Link from 'next/link';

// Feature data for the platform page
const features = [
  {
    icon: Zap,
    title: "Automated Purchase Order Generation",
    description: "Our AI analyzes forecasts, current stock, and supplier constraints (like MOQs and lead times) to automatically draft optimized purchase orders, saving your team hours of manual work."
  },
  {
    icon: Database,
    title: "Unified Data & POS Integration",
    description: "GALAXRX seamlessly connects to your existing Pharmacy Management System, creating a single source of truth for sales, stock, and supplier data, ensuring all recommendations are based on real-time information."
  },
  {
    icon: FileText,
    title: "Auditable History & Reporting",
    description: "Every change, from stock adjustments to price updates, is logged and auditable. Generate comprehensive reports to track performance and maintain compliance with ease."
  },
  {
    icon: CheckCircle,
    title: "Supplier Performance Tracking",
    description: "Monitor supplier lead times, fill rates, and cost accuracy directly within the platform. Make data-driven decisions about your supplier network to improve reliability and margins."
  },
];

export default function PlatformPage() {
  return (
    <div className="bg-slate-950 text-white">
      {/* Hero Section */}
      <div className="relative bg-slate-950 py-24 md:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(251,191,36,0.08),transparent_60%)]"
        />
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            The GALAXRX Platform
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-slate-400 md:text-lg">
            An end-to-end operating system designed to automate and optimize every aspect of your pharmacy's supply chain.
          </p>
        </div>
      </div>

      {/* Features Grid Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-amber-500/10 bg-slate-900 p-6 shadow-[0_0_0_1px_rgba(251,191,36,0.04)_inset] backdrop-blur">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl border border-amber-400/10 bg-amber-950/20 p-2">
                    <feature.icon className="h-6 w-6 text-amber-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-100">{feature.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 text-center">
         <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl font-semibold">Ready to see it in action?</h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
                Let us show you how GALAXRX can transform your pharmacy's efficiency and profitability.
            </p>
            <div className="mt-8">
                 <GradientButton
                    asChild
                    className="bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-900/40 hover:from-amber-600 hover:to-amber-600"
                  >
                    <Link href="/#contact">Request a Live Demo</Link>
                </GradientButton>
            </div>
         </div>
      </div>
    </div>
  );
}
