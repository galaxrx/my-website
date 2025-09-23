// app/components/ui/SmartVideo.tsx

'use client';

import { useEffect, useRef } from 'react';

/**
 * A client-side video component that only plays when in the viewport
 * and respects the 'prefers-reduced-motion' media query.
 * It accepts all standard HTMLVideoElement props.
 */
export default function SmartVideo(
  props: React.VideoHTMLAttributes<HTMLVideoElement>,
) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Do not autoplay if the user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) {
      videoElement.pause();
      return;
    }

    // Set up the Intersection Observer to play/pause the video
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Play the video, catching any potential browser errors
          videoElement.play().catch(() => {});
        } else {
          videoElement.pause();
        }
      },
      {
        // Start playing when the video is about 35% visible
        threshold: 0.35,
      },
    );

    observer.observe(videoElement);

    // Cleanup: disconnect the observer when the component unmounts
    return () => observer.disconnect();
  }, []);

  return <video ref={videoRef} {...props} />;
}