import React, { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailerPos, setTrailerPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const trailerPosRef = useRef({ x: -100, y: -100 });
  const targetPosRef = useRef({ x: -100, y: -100 });
  const particleIdRef = useRef(0);

  useEffect(() => {
    // Only enable custom cursor on fine pointer (mouse/trackpad), not touchscreens
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible((prev) => (prev ? prev : true));

      // Create subtle spark particle trail
      if (Math.random() < 0.25) {
        const colors = ['#38BDF8', '#818CF8', '#34D399', '#A855F7'];
        const newParticle: Particle = {
          id: particleIdRef.current++,
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          size: Math.random() * 2.5 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
        };
        setParticles((prev) => [...prev.slice(-15), newParticle]);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Detect hover over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest('a, button, input, textarea, [role="button"], .cursor-pointer');
      if (interactive) {
        setIsHovering(true);
        if (target.closest('a[href^="#"]')) {
          setHoverText('JUMP');
        } else if (target.closest('button')) {
          setHoverText('VIEW');
        } else {
          setHoverText(null);
        }
      } else {
        setIsHovering(false);
        setHoverText(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    // Smooth Lerp loop for trailing outer ring
    const loop = () => {
      const ease = 0.18;
      trailerPosRef.current.x += (targetPosRef.current.x - trailerPosRef.current.x) * ease;
      trailerPosRef.current.y += (targetPosRef.current.y - trailerPosRef.current.y) * ease;

      setTrailerPos({
        x: trailerPosRef.current.x,
        y: trailerPosRef.current.y,
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Clean up fading particles
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 350);
    return () => clearTimeout(timer);
  }, [particles]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Precision Center Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-sky-400 pointer-events-none z-[100] shadow-[0_0_10px_#38BDF8] transition-opacity duration-300"
        style={{
          transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0) scale(${isClicking ? 0.6 : 1})`,
        }}
      />

      {/* 2. Fluid Trailing Ring with Magnetic Expansion */}
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[99] flex items-center justify-center transition-[width,height,background-color,border-color,transform] duration-200 ease-out ${
          isHovering
            ? 'w-14 h-14 -ml-7 -mt-7 bg-sky-500/15 border-2 border-sky-400 backdrop-blur-[1px] shadow-[0_0_20px_rgba(56,189,248,0.35)]'
            : 'w-9 h-9 -ml-[18px] -mt-[18px] bg-transparent border border-sky-400/40'
        } ${isClicking ? 'scale-75' : 'scale-100'}`}
        style={{
          transform: `translate3d(${trailerPos.x}px, ${trailerPos.y}px, 0)`,
        }}
      >
        {isHovering && hoverText && (
          <span className="text-[9px] font-mono font-bold tracking-widest text-sky-200 uppercase select-none animate-pulse">
            {hoverText}
          </span>
        )}
      </div>

      {/* 3. Stardust Particle Wake */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[98] animate-fade-out"
          style={{
            transform: `translate3d(${p.x}px, ${p.y}px, 0)`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 8px ${p.color}`,
          }}
        />
      ))}
    </>
  );
};
