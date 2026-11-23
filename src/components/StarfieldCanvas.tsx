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
  z: number;
  dx: number;
  dy: number;
  length: number;
  speed: number;
  life: number;
  maxLife: number;
  color: string;
}

interface TechPulse {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
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

    // Parallax coordinates
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0;
    let rotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - width / 2) / (width / 2);
      mouseY = (e.clientY - height / 2) / (height / 2);
      targetRotY = mouseX * 0.35;
      targetRotX = -mouseY * 0.35;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // ==========================================
    // 1. GENERATE 3D STARFIELD (220 stars)
    // ==========================================
    const numStars = 220;
    const stars: Star3D[] = [];
    const starColors = [
      '#FFFFFF', // Diamond White
      '#38BDF8', // Cyan / Sky Blue
      '#818CF8', // Indigo / Violet
      '#34D399', // Mint / Emerald
      '#A855F7', // Electric Purple
      '#BAE6FD', // Ice Blue
    ];

    for (let i = 0; i < numStars; i++) {
      const isTech = i < 18; // 18 special tech flare anchor stars
      stars.push({
        x: (Math.random() - 0.5) * 2200,
        y: (Math.random() - 0.5) * 2200,
        z: Math.random() * 1400 + 100,
        vz: -(Math.random() * 0.6 + 0.3), // gentle forward glide
        baseSize: isTech ? Math.random() * 2 + 2.2 : Math.random() * 1.5 + 0.8,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        twinkleSpeed: Math.random() * 0.04 + 0.02,
        twinklePhase: Math.random() * Math.PI * 2,
        isTechFlare: isTech,
        spikeLength: isTech ? Math.random() * 18 + 14 : 0,
      });
    }

    // ==========================================
    // 2. SHOOTING STARS / STAR BREAK STREAKS
    // ==========================================
    const shootingStars: ShootingStar[] = [];
    let lastShootingStarTime = 0;

    const spawnShootingStar = () => {
      const startX = (Math.random() - 0.2) * width;
      const startY = Math.random() * (height * 0.45);
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.4; // diagonal ~45 degrees
      const speed = Math.random() * 9 + 8;
      const length = Math.random() * 110 + 70;
      const streakColors = ['#38BDF8', '#818CF8', '#2DD4BF', '#FFFFFF'];

      shootingStars.push({
        x: startX,
        y: startY,
        z: Math.random() * 400 + 200,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        length,
        speed,
        life: 0,
        maxLife: Math.random() * 45 + 35,
        color: streakColors[Math.floor(Math.random() * streakColors.length)],
      });
    };

    // ==========================================
    // 3. TECH RADAR PULSES
    // ==========================================
    const techPulses: TechPulse[] = [];
    let lastPulseTime = 0;

    const spawnTechPulse = (x: number, y: number, color: string) => {
      techPulses.push({
        x,
        y,
        radius: 4,
        maxRadius: Math.random() * 35 + 25,
        alpha: 0.6,
        color,
      });
    };

    const fov = 750;
    let time = 0;

    // ==========================================
    // RENDER LOOP
    // ==========================================
    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Smooth camera interpolation
      rotX += (targetRotX - rotX) * 0.04;
      rotY += (targetRotY - rotY) * 0.04;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Periodically trigger shooting stars
      if (Date.now() - lastShootingStarTime > 2800 && Math.random() < 0.45) {
        spawnShootingStar();
        lastShootingStarTime = Date.now();
      }

      // Projected stars array for constellation lines
      const projectedStars: { x: number; y: number; z: number; color: string; alpha: number }[] = [];

      // ----------------------------------------------------
      // A. RENDER 3D STARS & TECH FLARES
      // ----------------------------------------------------
      stars.forEach((star) => {
        // Move star forward through 3D space
        star.z += star.vz;
        if (star.z < 60) {
          star.z = 1500;
          star.x = (Math.random() - 0.5) * 2200;
          star.y = (Math.random() - 0.5) * 2200;
        }

        // Apply camera rotation
        const x1 = star.x * cosY + star.z * sinY;
        const z1 = -star.x * sinY + star.z * cosY;
        const y2 = star.y * cosX - z1 * sinX;
        const z2 = star.y * sinX + z1 * cosX + 600;

        if (z2 <= 20) return;

        const scale = fov / z2;
        const projX = width / 2 + x1 * scale;
        const projY = height / 2 + y2 * scale;

        if (projX >= -50 && projX <= width + 50 && projY >= -50 && projY <= height + 50) {
          // Dynamic twinkle scintillation
          const twinkle = 0.65 + 0.35 * Math.sin(time * star.twinkleSpeed * 60 + star.twinklePhase);
          const depthAlpha = Math.max(0.12, Math.min(0.85, (1500 - z2) / 1200));
          const finalAlpha = depthAlpha * twinkle;

          projectedStars.push({
            x: projX,
            y: projY,
            z: z2,
            color: star.color,
            alpha: finalAlpha,
          });

          // Draw Star Core
          const currentSize = Math.max(0.7, star.baseSize * scale * 1.6);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = finalAlpha;
          ctx.beginPath();
          ctx.arc(projX, projY, currentSize, 0, Math.PI * 2);
          ctx.fill();

          // Soft Halo Glow for bright stars
          if (star.isTechFlare || star.baseSize > 2.0) {
            const glowGrad = ctx.createRadialGradient(projX, projY, 0, projX, projY, currentSize * 5);
            glowGrad.addColorStop(0, star.color);
            glowGrad.addColorStop(0.4, 'rgba(56, 189, 248, 0.25)');
            glowGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = glowGrad;
            ctx.beginPath();
            ctx.arc(projX, projY, currentSize * 5, 0, Math.PI * 2);
            ctx.fill();
          }

          // ----------------------------------------------------
          // B. 4-POINT TECH DIFFRACTION FLARES (✦)
          // ----------------------------------------------------
          if (star.isTechFlare && finalAlpha > 0.3) {
            const spike = star.spikeLength * scale * (0.85 + 0.25 * Math.sin(time * 3 + star.twinklePhase));

            ctx.lineWidth = 0.9;
            ctx.strokeStyle = star.color;
            ctx.globalAlpha = finalAlpha * 0.75;

            // Horizontal & Vertical cross beams
            ctx.beginPath();
            ctx.moveTo(projX - spike, projY);
            ctx.lineTo(projX + spike, projY);
            ctx.moveTo(projX, projY - spike);
            ctx.lineTo(projX, projY + spike);
            ctx.stroke();

            // Diagonal secondary micro-spikes for that space telescope / cyber finish
            const subSpike = spike * 0.45;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(projX - subSpike, projY - subSpike);
            ctx.lineTo(projX + subSpike, projY + subSpike);
            ctx.moveTo(projX - subSpike, projY + subSpike);
            ctx.lineTo(projX + subSpike, projY - subSpike);
            ctx.stroke();

            // Randomly trigger subtle tech radar beacon ring
            if (Date.now() - lastPulseTime > 2500 && Math.random() < 0.2) {
              spawnTechPulse(projX, projY, star.color);
              lastPulseTime = Date.now();
            }
          }
        }
      });

      // ----------------------------------------------------
      // C. TECH CONSTELLATION MESH (Subtle Synapse Links)
      // ----------------------------------------------------
      ctx.lineWidth = 0.6;
      const maxConnectDist = 85;
      for (let i = 0; i < projectedStars.length; i++) {
        for (let j = i + 1; j < projectedStars.length; j++) {
          const s1 = projectedStars[i];
          const s2 = projectedStars[j];
          const dx = s1.x - s2.x;
          const dy = s1.y - s2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const lineAlpha = (1 - dist / maxConnectDist) * 0.18 * Math.min(s1.alpha, s2.alpha);
            ctx.strokeStyle = s1.color;
            ctx.globalAlpha = lineAlpha;
            ctx.beginPath();
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.stroke();
          }
        }
      }

      // ----------------------------------------------------
      // D. RENDER SHOOTING STAR BREAKS (Cosmic Streaks)
      // ----------------------------------------------------
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life++;
        s.x += s.dx;
        s.y += s.dy;

        const progress = s.life / s.maxLife;
        const streakAlpha = Math.sin(progress * Math.PI) * 0.85; // smooth fade in and out

        const tailX = s.x - (s.dx / s.speed) * s.length;
        const tailY = s.y - (s.dy / s.speed) * s.length;

        // Gradient streak tail
        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        grad.addColorStop(0, s.color);
        grad.addColorStop(0.25, 'rgba(56, 189, 248, 0.7)');
        grad.addColorStop(0.7, 'rgba(129, 140, 248, 0.25)');
        grad.addColorStop(1, 'transparent');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = streakAlpha;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Glowing streak head node
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = streakAlpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
        ctx.fill();

        if (s.life >= s.maxLife) {
          shootingStars.splice(i, 1);
        }
      }

      // ----------------------------------------------------
      // E. RENDER TECH RADAR PULSES
      // ----------------------------------------------------
      for (let i = techPulses.length - 1; i >= 0; i--) {
        const p = techPulses[i];
        p.radius += 0.65;
        p.alpha -= 0.015;

        if (p.alpha <= 0 || p.radius >= p.maxRadius) {
          techPulses.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = p.color;
        ctx.lineWidth = 0.8;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-20 opacity-80 transition-opacity duration-1000"
    />
  );
};
