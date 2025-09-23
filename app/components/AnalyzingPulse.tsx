import { cn } from '../cn'; // Corrected Path

interface AnalyzingPulseProps {
  className?: string;
}

// ... rest of the component is unchanged
const AnalyzingPulse = ({ className }: AnalyzingPulseProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn("w-24 h-24", className)}
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#glow)">
        <circle cx="50" cy="50" r="10" fill="hsl(var(--accent-2))">
          <animate
            attributeName="r"
            values="10;20;10"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="1;0.5;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="50" cy="50" r="15" fill="none"
          stroke="hsl(var(--accent))" strokeWidth="1"
        >
          <animate
            attributeName="r"
            values="15;35;15"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="1;0;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="50" cy="50" r="25" fill="none"
          stroke="hsl(var(--accent))" strokeWidth="0.5"
        >
          <animate
            attributeName="r"
            values="25;45;25"
            dur="2s"
            begin="0.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="1;0;1"
            dur="2s"
            begin="0.5s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
};

export default AnalyzingPulse;