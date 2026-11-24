import React, { useEffect, useState } from 'react';

export const CursorSpotlight: React.FC = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="hidden md:block fixed pointer-events-none -z-10 w-[600px] h-[600px] rounded-full blur-[100px] transition-transform duration-75 ease-out opacity-75"
      style={{
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, rgba(129, 140, 248, 0.04) 40%, transparent 70%)',
        transform: `translate3d(${pos.x - 300}px, ${pos.y - 300}px, 0)`,
      }}
    />
  );
};
