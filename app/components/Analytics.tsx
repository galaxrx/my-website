'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Script from 'next/script';

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Helper function for GA pageviews
const gtagPageview = (url: string) => {
  if (window.gtag) {
    window.gtag('config', GA_ID as string, {
      page_path: url,
    });
  }
};

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track pageviews for Google Analytics
  useEffect(() => {
    if (GA_ID) {
      const url = pathname + searchParams.toString();
      gtagPageview(url);
    }
  }, [pathname, searchParams]);

  if (!PLAUSIBLE_DOMAIN && !GA_ID) {
    return null;
  }

  return (
    <>
      {PLAUSIBLE_DOMAIN && (
        <Script
          defer
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
        />
      )}
      {GA_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
    </>
  );
}
