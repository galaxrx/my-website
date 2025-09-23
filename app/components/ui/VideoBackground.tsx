// app/components/ui/VideoBackground.tsx
'use client';

type Props = {
  src: string;
  poster?: string;
  className?: string;
};

export default function VideoBackground({ src, poster, className }: Props) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-20 overflow-hidden ${className ?? ''}`}
      aria-hidden
    >
      <video
        key={src}
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/60" />
    </div>
  );
}