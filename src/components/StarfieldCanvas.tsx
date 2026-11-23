import React, { useEffect, useRef } from 'react';

interface Star3D {
  x: number;
  y: number;
  z: number;
  vz: number;
  baseSize: number;
  color: string;
  twinkleSpeed: number;
  twinklePhase: number;
  isTechFlare: boolean;
  spikeLength: number;
}

interface ShootingStar {
  x: number;
  y: number;
  dx: number;
  dy: number;
  length: number;
  speed: number;
  life: number;
  maxLife: number;
  color: string;
}

export const StarfieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Parallax & Camera coordinates
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0;
    let rotY = 0;

    // Scroll tracking
    let scrollY = window.scrollY;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - width / 2) / (width / 2);
      mouseY = (e.clientY - height / 2) / (height / 2);
      targetRotY = mouseX * 0.45;
      targetRotX = -mouseY * 0.45;
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      scrollVelocity = (currentY - lastScrollY) * 0.05;
      lastScrollY = currentY;
      scrollY = currentY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // ==========================================
    // 1. DE-CLUTTERED 3D STARFIELD (Spacious ~75 stars)
    // ==========================================
    const numStars = 75;
    const stars: Star3D[] = [];
    const starColors = [
      '#FFFFFF', // Diamond White
      '#BAE6FD', // Ice Sky
      '#38BDF8', // Cyan Blue
      '#818CF8', // Soft Indigo
      '#A855F7', // Electric Violet
    ];

    for (let i = 0; i < numStars; i++) {
      const isTech = i < 4; // Only 4 subtle, elegant anchor flares
      stars.push({
        x: (Math.random() - 0.5) * 2200,
        y: (Math.random() - 0.5) * 2200,
        z: Math.random() * 1400 + 100,
        vz: -(Math.random() * 0.8 + 0.4), // calm, gentle cosmic glide
        baseSize: isTech ? Math.random() * 1.5 + 2.0 : Math.random() * 1.2 + 0.8,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        twinkleSpeed: Math.random() * 0.03 + 0.02,
        twinklePhase: Math.random() * Math.PI * 2,
        isTechFlare: isTech,
        spikeLength: isTech ? Math.random() * 14 + 10 : 0,
      });
    }

    // ==========================================
    // 2. DELICATE SHOOTING STAR (Infrequent, 1 at a time)
    // ==========================================
    let activeShootingStar: ShootingStar | null = null;
    let lastShootingStarTime = Date.now();

    const spawnShootingStar = () => {
      const startX = (Math.random() - 0.1) * width;
      const startY = Math.random() * (height * 0.4);
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
      const speed = Math.random() * 7 + 8;
      const length = Math.random() * 90 + 60;
      const streakColors = ['#FFFFFF', '#38BDF8', '#BAE6FD', '#818CF8'];

      activeShootingStar = {
        x: startX,
        y: startY,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        length,
        speed,
        life: 0,
        maxLife: Math.random() * 35 + 30,
        color: streakColors[Math.floor(Math.random() * streakColors.length)],
      };
    };

    const fov = 750;
    let time = 0;

    // ==========================================
    // RENDER LOOP
    // ==========================================
    const render = () => {
      time += 0.016;

      // Dampen scroll velocity smoothly
      scrollVelocity *= 0.9;

      // Fill canvas directly with clean dark OLED base
      ctx.fillStyle = '#07090E';
      ctx.fillRect(0, 0, width, height);

      // Smooth camera interpolation with gentle responsiveness
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Trigger a shooting star rarely (every 7 to 10 seconds)
      if (!activeShootingStar && Date.now() - lastShootingStarTime > 7500 && Math.random() < 0.3) {
        spawnShootingStar();
        lastShootingStarTime = Date.now();
      }

      // ----------------------------------------------------
      // A. RENDER 3D STARS & SUBTLE TECH FLARES (NO CLUTTER)
      // ----------------------------------------------------
      stars.forEach((star) => {
        // Move star forward through 3D space with gentle velocity + scroll response
        const effectiveVz = star.vz - scrollVelocity;
        star.z += effectiveVz;

        // Wrap boundaries
        if (star.z < 50) {
          star.z = 1500;
          star.x = (Math.random() - 0.5) * 2200;
          star.y = (Math.random() - 0.5) * 2200;
        } else if (star.z > 1500) {
          star.z = 50;
        }

        // Apply 3D camera rotation
        const x1 = star.x * cosY + star.z * sinY;
        const z1 = -star.x * sinY + star.z * cosY;
        const y2 = star.y * cosX - z1 * sinX;
        const z2 = star.y * sinX + z1 * cosX + 600;

        if (z2 <= 20) return;

        const scale = fov / z2;
        const projX = width / 2 + x1 * scale;
        const projY = height / 2 + y2 * scale;

        if (projX >= -20 && projX <= width + 20 && projY >= -20 && projY <= height + 20) {
          // Dynamic twinkle scintillation
          const twinkle = 0.65 + 0.35 * Math.sin(time * star.twinkleSpeed * 60 + star.twinklePhase);
          const depthAlpha = Math.max(0.15, Math.min(0.85, (1500 - z2) / 1200));
          const finalAlpha = depthAlpha * twinkle;

          // 1. Draw Star Core (Clean, sharp luminous point)
          const currentSize = Math.max(0.8, star.baseSize * scale * 1.4);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = finalAlpha;
          ctx.beginPath();
          ctx.arc(projX, projY, currentSize, 0, Math.PI * 2);
          ctx.fill();

          // 2. Soft Radial Glow Halo for Anchor Stars
          if (star.isTechFlare || star.baseSize > 2.0) {
            const glowGrad = ctx.createRadialGradient(projX, projY, 0, projX, projY, currentSize * 4.5);
            glowGrad.addColorStop(0, star.color);
            glowGrad.addColorStop(0.35, 'rgba(56, 189, 248, 0.2)');
            glowGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = glowGrad;
            ctx.beginPath();
            ctx.arc(projX, projY, currentSize * 4.5, 0, Math.PI * 2);
            ctx.fill();
          }

          // 3. Delicate 4-Point Tech Flare (✦) - Only for the 4 anchor stars
          if (star.isTechFlare && finalAlpha > 0.3) {
            const flareAngle = time * 0.3 + star.twinklePhase;
            const spike = star.spikeLength * scale * (0.8 + 0.2 * Math.sin(time * 2 + star.twinklePhase));

            ctx.lineWidth = 0.8;
            ctx.strokeStyle = star.color;
            ctx.globalAlpha = finalAlpha * 0.55;

            ctx.save();
            ctx.translate(projX, projY);
            ctx.rotate(flareAngle);

            // Subtle cross beams
            ctx.beginPath();
            ctx.moveTo(-spike, 0);
            ctx.lineTo(spike, 0);
            ctx.moveTo(0, -spike);
            ctx.lineTo(0, spike);
            ctx.stroke();

            ctx.restore();
          }
        }
      });

      // ----------------------------------------------------
      // B. RENDER SINGLE DELICATE SHOOTING STAR (When Active)
      // ----------------------------------------------------
      if (activeShootingStar) {
        const s = activeShootingStar;
        s.life++;
        s.x += s.dx;
        s.y += s.dy;

        const progress = s.life / s.maxLife;
        const streakAlpha = Math.sin(progress * Math.PI) * 0.75;

        const tailX = s.x - (s.dx / s.speed) * s.length;
        const tailY = s.y - (s.dy / s.speed) * s.length;

        // Faint glowing gradient tail
        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(0.25, s.color);
        grad.addColorStop(0.7, 'rgba(56, 189, 248, 0.2)');
        grad.addColorStop(1, 'transparent');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.globalAlpha = streakAlpha;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Small head point
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = streakAlpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        if (s.life >= s.maxLife) {
          activeShootingStar = null;
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
