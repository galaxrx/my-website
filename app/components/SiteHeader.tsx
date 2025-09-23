'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

// --- Helper Utilities & Data ---

// Basic cn utility to merge class names, assuming it's not available from an external library.
const cn = (...classes: (string | boolean | undefined | null)[]) => {
  return classes.filter(Boolean).join(' ');
};

const navItems = [
  { name: 'Why GALAXRX', href: '#why-galaxrx' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'About', href: '#about' },
  { name: 'Contact Us', href: '#contact' },
];

// --- Subcomponents for Modularity ---

/**
 * A base GradientButton component to resolve the dependency error.
 * This can be customized further or replaced with your actual component.
 */
const GradientButton = ({ children, className, ...props }: React.ComponentProps<'button'>) => {
  return (
    <button
      className={cn(
        'font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-full px-5 py-2.5',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * Renders the logo and title/subtitle.
 */
const HeaderTitle = () => {
  return (
    <div className="flex flex-shrink-0 items-center gap-x-3 md:gap-x-4">
      <img
        src="/logo.png"
        alt="GALAXRX Logo"
        className="block h-24 w-auto md:h-28"
      />
      <div className="flex flex-col">
        <span className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          GALAX<span style={{ color: '#B8860B' }}>RX</span>
        </span>
        <span className="text-sm font-semibold tracking-tight text-slate-300">
          AI-Powered Pharmacy Copilot
        </span>
      </div>
      <span className="sr-only">GALAXRX Home</span>
    </div>
  );
};


// Custom hook for Intersection Observer
const useScrollSpy = (ids: string[], options?: IntersectionObserverInit) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id.substring(1)));

    observer.current?.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);

    elements.forEach((el) => {
      if (el) observer.current?.observe(el);
    });

    return () => observer.current?.disconnect();
  }, [ids, options]);

  return activeId;
};


const SiteHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const navItemHrefs = navItems.map(item => item.href);
  const activeSection = useScrollSpy(navItemHrefs, {
    rootMargin: '-50% 0px -50% 0px',
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const mobileMenuVariants = {
    closed: { opacity: 0, y: '-10%', filter: 'blur(8px)', transition: { duration: 0.3, ease: "easeOut" } },
    open: { opacity: 1, y: '0%', filter: 'blur(0px)', transition: { duration: 0.4, ease: "easeIn" } },
  };

  return (
    <header className="sticky top-4 z-50 mx-auto max-w-7xl rounded-full border border-white/10 bg-slate-950/80 backdrop-blur-lg supports-[backdrop-filter]:bg-slate-950/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <a href="#" aria-label="GALAXRX Home">
          <HeaderTitle />
        </a>

        <nav aria-label="Primary" className="hidden lg:flex lg:flex-1 lg:justify-center">
          <ul role="list" className="flex items-center gap-x-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <a href={item.href} className={cn("relative rounded-md px-4 py-2 text-base font-bold text-slate-300 transition-colors duration-200 hover:text-white", activeSection === item.href.substring(1) && "text-white")}>
                  {item.name}
                  {activeSection === item.href.substring(1) && (
                     <motion.span layoutId="active-nav-underline" className="absolute bottom-1 left-3 right-3 h-1 rounded-full bg-amber-400" transition={{ type: 'spring', stiffness: 350, damping: 30 }}/>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <GradientButton className="bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 text-base font-bold">
            <a href="#contact" className="block px-2 py-1">Get a Demo</a>
          </GradientButton>
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-400"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Open main menu</span>
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={isOpen ? 'x' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={shouldReduceMotion ? {} : mobileMenuVariants}
            className="absolute inset-x-0 top-full rounded-xl border border-white/10 bg-slate-950/90 backdrop-blur-lg lg:hidden"
          >
            <div className="space-y-1 px-4 pb-3 pt-2 sm:px-6 lg:px-8">
              {navItems.map(item => (
                 <a key={item.name} href={item.href} className="block rounded-md px-3 py-3 text-lg font-bold text-slate-300 hover:bg-slate-800 hover:text-white" onClick={() => setIsOpen(false)}>
                  {item.name}
                 </a>
              ))}
              <div className="border-t border-white/10 pt-4 mt-4">
                <GradientButton className="w-full bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 text-lg font-bold">
                  <a href="#contact" onClick={() => setIsOpen(false)} className="block w-full text-center">
                     Get a Demo
                   </a>
                </GradientButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default SiteHeader;