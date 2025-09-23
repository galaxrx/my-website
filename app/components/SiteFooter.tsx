// The 'use client' directive is necessary for the smooth-scrolling "Back to top" button.
'use client';

import Link from 'next/link';
import { Twitter, Linkedin, Github, Mail, ArrowUp } from 'lucide-react';
import type { ReactNode } from 'react';

// --- CONFIGURATION ---

// Legal links are now separated as they will be moved to the sub-footer.
const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
];

// Type definition for social links for strong typing
type SocialLink = {
  name: string;
  href: string;
  icon: ReactNode;
};

// Social media links. If this array is empty, the entire "Connect" column will be hidden.
const socialLinks: SocialLink[] = [
  { name: 'Twitter', href: '#', icon: <Twitter size={18} /> },
  { name: 'LinkedIn', href: '#', icon: <Linkedin size={18} /> },
  { name: 'GitHub', href: '#', icon: <Github size={18} /> },
  { name: 'Email', href: '#', icon: <Mail size={18} /> },
];

// --- COMPONENT IMPLEMENTATION ---

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  // Handler for the "Back to top" button
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    // Main footer element with accessibility role
    <footer role="contentinfo" className="w-full bg-card border-t border-white/5 mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Main content area now uses Flexbox for a simpler layout */}
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          
          {/* Column 1: Brand & Tagline */}
          <div className="max-w-sm">
            <h3 className="text-xl font-bold font-heading text-white">GALAXRX</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Intelligent inventory for modern pharmacies.
            </p>
          </div>
          
          {/* Column 2: Social Links (hidden if no links) */}
          {socialLinks.length > 0 && (
            <div>
              <h4 className="font-semibold text-white mb-3">Connect</h4>
              <div className="flex items-center space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GALAXRX on ${link.name}`}
                    className="text-muted-foreground transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-400/40 rounded-full p-1"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sub-footer bar for copyright, legal links, and "Back to top" button */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            &copy; {currentYear} GALAXRX. All rights reserved.
          </p>
          
          {/* Legal links are now placed in the center of the sub-footer */}
          <div className="flex items-center justify-center gap-4">
            {legalLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-xs text-muted-foreground transition-colors hover:text-white hover:underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-amber-400/40 rounded-sm">
                {link.name}
              </Link>
            ))}
          </div>

          <button
            onClick={handleScrollToTop}
            aria-label="Back to top"
            className="group flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-400/40 rounded-md px-2 py-1"
          >
            Back to top
            <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

