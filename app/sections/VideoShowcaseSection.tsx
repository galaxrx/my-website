// app/sections/VideoShowcaseSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function VideoShowcaseSection() {
  return (
    <section id="ai-showcase" className="relative bg-slate-950 py-24 md:py-32">
      {/* Change: Added gold radial gradient background to match the theme */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(251,191,36,0.08),transparent_60%)]"
      />

      <div className="container mx-auto px-4">
        <motion.div 
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Change: Added themed "pill" badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-950/30 px-3 py-1 text-xs text-amber-300 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            AI in Action
          </div>

          <h2 className="font-heading mt-4 text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
            Complex Pharmacy Analysis, Simplified by Chat
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-slate-400 md:text-lg">
            Save hours of manual work. Simply ask our intelligent AI chatbot your most complex questions and get instant, actionable analysis. Turn difficult data into an easy conversation.
          </p>
        </motion.div>

        {/* Video Player with Themed Browser Frame */}
        <motion.div 
          className="group relative mx-auto mt-12 max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Change: Styled video frame to match theme */}
          <div className="relative rounded-xl border border-amber-500/10 bg-slate-900 p-1.5 shadow-[0_0_0_1px_rgba(251,191,36,0.04)_inset] backdrop-blur">
            <div
                // Change: Hover glow effect added to the frame
                className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(60%_50%_at_50%_10%,rgba(251,191,36,0.1),transparent_70%)]"
            />
            <div className="rounded-t-md bg-slate-900/50 px-4 py-2 flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-slate-700"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-slate-700"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-slate-700"></div>
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-b-md">
              <video
                src="/videos/chatbot-demo.mp4" 
                poster="/videos/chatbot-demo-poster.jpg" 
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}