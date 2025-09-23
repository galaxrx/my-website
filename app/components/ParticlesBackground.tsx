'use client';

import { useRef, useEffect, useCallback } from 'react';

// Helper function to get color from CSS variables
const getCssVar = (name: string) => {
    if (typeof window === 'undefined') return '#000000';
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
};

class Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;

  constructor(canvasWidth: number, canvasHeight: number, color: string) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.radius = Math.random() * 1.5 + 1;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update(canvasWidth: number, canvasHeight: number) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
    if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;
  }
}

interface ParticlesBackgroundProps {
    particleCount?: number;
    connectionDistance?: number;
}

const ParticlesBackground = ({ particleCount = 40, connectionDistance = 100 }: ParticlesBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>();

  const goldColor = useRef<string>('#FFD700');
  const cyanColor = useRef<string>('#22D3EE');
  const lineColor = useRef<string>('rgba(255, 215, 0, 0.2)');

  const createParticles = useCallback((canvas: HTMLCanvasElement) => {
    particles.current = [];
    const particleColors = [goldColor.current, cyanColor.current];
    for (let i = 0; i < particleCount; i++) {
        const color = particleColors[i % particleColors.length];
        particles.current.push(new Particle(canvas.width, canvas.height, color));
    }
  }, [particleCount]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.current.forEach(p => {
      p.update(canvas.width, canvas.height);
      p.draw(ctx);
    });

    for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
            const p1 = particles.current[i];
            const p2 = particles.current[j];
            const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

            if (dist < connectionDistance) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = lineColor.current;
                ctx.lineWidth = 1 - dist / connectionDistance;
                ctx.stroke();
            }
        }
    }
    
    animationFrameId.current = requestAnimationFrame(animate);
  }, [connectionDistance]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Re-fetch colors in case of theme change
        goldColor.current = getCssVar('--gold') || '#FFD700';
        cyanColor.current = getCssVar('--accent-2') || '#22D3EE';
        lineColor.current = `rgba(${parseInt(goldColor.current.slice(1,3),16)}, ${parseInt(goldColor.current.slice(3,5),16)}, ${parseInt(goldColor.current.slice(5,7),16)}, 0.1)`;
        createParticles(canvas);
    };

    const handleVisibilityChange = () => {
        if (document.hidden) {
            cancelAnimationFrame(animationFrameId.current!);
        } else {
            animationFrameId.current = requestAnimationFrame(animate);
        }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    animationFrameId.current = requestAnimationFrame(animate);
    
    return () => {
        window.removeEventListener('resize', resizeCanvas);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        cancelAnimationFrame(animationFrameId.current!);
    };
  }, [animate, createParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
    />
  );
};

export default ParticlesBackground;