// components/ui/NeuralWave.tsx
'use client'; // <-- ADD THIS LINE

// This component uses CSS for a lightweight, performant animation.
// Add the following keyframes to your global CSS file (e.g., app/globals.css):
/*
@keyframes wave-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
*/

export const NeuralWave = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 animate-[wave-animation_10s_ease_infinite] [background-image:radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(251,191,36,0.15),transparent),radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(14,116,144,0.1),transparent)] [background-size:200%_100%]"
    />
  );
};