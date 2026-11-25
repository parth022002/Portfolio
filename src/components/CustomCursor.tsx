import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const trailerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const targetPos = useRef({ x: -100, y: -100 });
  const trailerPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable custom cursor on fine pointer (mouse/trackpad), never on touchscreens
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) setIsVisible(true);

      // Direct GPU transform update for center dot (instant, zero React re-render)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => {
      setIsVisible(false);
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (trailerRef.current) trailerRef.current.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (trailerRef.current) trailerRef.current.style.opacity = '1';
    };

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

    // High-performance Lerp loop running via direct style mutation
    const loop = () => {
      const ease = 0.2;
      trailerPos.current.x += (targetPos.current.x - trailerPos.current.x) * ease;
      trailerPos.current.y += (targetPos.current.y - trailerPos.current.y) * ease;

      if (trailerRef.current) {
        trailerRef.current.style.transform = `translate3d(${trailerPos.current.x}px, ${trailerPos.current.y}px, 0)`;
      }

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
  }, [isVisible]);

  return (
    <>
      {/* 1. Precision Center Dot (Direct GPU Transform) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-sky-400 pointer-events-none z-[100] shadow-[0_0_10px_#38BDF8] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      />

      {/* 2. Fluid Trailing Ring with Magnetic Expansion (Direct GPU Transform) */}
      <div
        ref={trailerRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[99] flex items-center justify-center transition-[width,height,background-color,border-color,opacity] duration-200 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isHovering
            ? 'w-14 h-14 -ml-7 -mt-7 bg-sky-500/15 border-2 border-sky-400 backdrop-blur-[1px] shadow-[0_0_20px_rgba(56,189,248,0.35)]'
            : 'w-9 h-9 -ml-[18px] -mt-[18px] bg-transparent border border-sky-400/40'
        } ${isClicking ? 'scale-75' : 'scale-100'}`}
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      >
        {isHovering && hoverText && (
          <span className="text-[9px] font-mono font-bold tracking-widest text-sky-200 uppercase select-none animate-pulse">
            {hoverText}
          </span>
        )}
      </div>
    </>
  );
};
