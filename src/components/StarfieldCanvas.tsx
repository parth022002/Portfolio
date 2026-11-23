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
  ringRadius: number;
  ringTilt: number;
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

    // Parallax & Camera coordinates
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0;
    let rotY = 0;

    // Scroll tracking for cosmic warp effect
    let scrollY = window.scrollY;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - width / 2) / (width / 2);
      mouseY = (e.clientY - height / 2) / (height / 2);
      targetRotY = mouseX * 0.65;
      targetRotX = -mouseY * 0.65;
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      scrollVelocity = (currentY - lastScrollY) * 0.08;
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
    // 1. GENERATE 3D COSMIC STARFIELD (250 stars)
    // ==========================================
    const numStars = 250;
    const stars: Star3D[] = [];
    const starColors = [
      '#FFFFFF', // Diamond White
      '#38BDF8', // Cyan / Sky Blue
      '#818CF8', // Indigo / Violet
      '#34D399', // Mint / Emerald
      '#A855F7', // Electric Purple
      '#67E8F9', // Luminous Cyan
    ];

    for (let i = 0; i < numStars; i++) {
      const isTech = i < 22; // 22 prominent tech anchor stars
      stars.push({
        x: (Math.random() - 0.5) * 2400,
        y: (Math.random() - 0.5) * 2400,
        z: Math.random() * 1400 + 100,
        vz: -(Math.random() * 1.4 + 0.8), // visible continuous forward flight
        baseSize: isTech ? Math.random() * 2.5 + 2.4 : Math.random() * 1.8 + 1.0,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        twinkleSpeed: Math.random() * 0.05 + 0.03,
        twinklePhase: Math.random() * Math.PI * 2,
        isTechFlare: isTech,
        spikeLength: isTech ? Math.random() * 24 + 16 : 0,
        ringRadius: isTech ? Math.random() * 16 + 12 : 0,
        ringTilt: Math.random() * Math.PI,
      });
    }

    // ==========================================
    // 2. SHOOTING STARS / STAR BREAK STREAKS
    // ==========================================
    const shootingStars: ShootingStar[] = [];
    let lastShootingStarTime = 0;

    const spawnShootingStar = () => {
      const startX = (Math.random() - 0.2) * width;
      const startY = Math.random() * (height * 0.5);
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.45;
      const speed = Math.random() * 12 + 10;
      const length = Math.random() * 140 + 90;
      const streakColors = ['#38BDF8', '#818CF8', '#2DD4BF', '#FFFFFF', '#67E8F9'];

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
        maxRadius: Math.random() * 42 + 28,
        alpha: 0.7,
        color,
      });
    };

    const fov = 750;
    let time = 0;

    // ==========================================
    // RENDER LOOP
    // ==========================================
    const render = () => {
      time += 0.018;

      // Dampen scroll velocity smoothly
      scrollVelocity *= 0.92;

      // Fill canvas directly with dark OLED base
      ctx.fillStyle = '#07090E';
      ctx.fillRect(0, 0, width, height);

      // Smooth camera interpolation with high responsiveness
      rotX += (targetRotX - rotX) * 0.06;
      rotY += (targetRotY - rotY) * 0.06;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Trigger shooting stars every 2.2s
      if (Date.now() - lastShootingStarTime > 2200 && Math.random() < 0.6) {
        spawnShootingStar();
        lastShootingStarTime = Date.now();
      }

      // Projected stars array for constellation lines
      const projectedStars: { x: number; y: number; z: number; color: string; alpha: number }[] = [];

      // ----------------------------------------------------
      // A. RENDER 3D STARS, FLIGHT TRAILS & TECH FLARES
      // ----------------------------------------------------
      stars.forEach((star) => {
        // Move star forward through 3D space with continuous velocity + scroll velocity
        const effectiveVz = star.vz - scrollVelocity * 1.5;
        star.z += effectiveVz;

        // Wrap boundaries
        if (star.z < 50) {
          star.z = 1500;
          star.x = (Math.random() - 0.5) * 2400;
          star.y = (Math.random() - 0.5) * 2400;
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

        if (projX >= -60 && projX <= width + 60 && projY >= -60 && projY <= height + 60) {
          // Dynamic twinkle scintillation
          const twinkle = 0.7 + 0.3 * Math.sin(time * star.twinkleSpeed * 60 + star.twinklePhase);
          const depthAlpha = Math.max(0.18, Math.min(0.95, (1500 - z2) / 1100));
          const finalAlpha = depthAlpha * twinkle;

          projectedStars.push({
            x: projX,
            y: projY,
            z: z2,
            color: star.color,
            alpha: finalAlpha,
          });

          // 1. Draw 3D Motion Trail (Depth Streak)
          const trailLength = Math.max(1.5, Math.abs(effectiveVz) * scale * 5);
          ctx.strokeStyle = star.color;
          ctx.lineWidth = Math.max(0.8, star.baseSize * scale * 0.8);
          ctx.globalAlpha = finalAlpha * 0.45;
          ctx.beginPath();
          ctx.moveTo(projX, projY);
          ctx.lineTo(projX - (x1 * scale * 0.02), projY - (y2 * scale * 0.02) - trailLength);
          ctx.stroke();

          // 2. Draw Star Core
          const currentSize = Math.max(1.0, star.baseSize * scale * 1.8);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = finalAlpha;
          ctx.beginPath();
          ctx.arc(projX, projY, currentSize, 0, Math.PI * 2);
          ctx.fill();

          // 3. Soft Radial Glow Halo
          if (star.isTechFlare || star.baseSize > 2.0) {
            const glowGrad = ctx.createRadialGradient(projX, projY, 0, projX, projY, currentSize * 6);
            glowGrad.addColorStop(0, star.color);
            glowGrad.addColorStop(0.35, 'rgba(56, 189, 248, 0.3)');
            glowGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = glowGrad;
            ctx.beginPath();
            ctx.arc(projX, projY, currentSize * 6, 0, Math.PI * 2);
            ctx.fill();
          }

          // ----------------------------------------------------
          // B. 4-POINT TECH DIFFRACTION FLARES & 3D ORBITAL RINGS
          // ----------------------------------------------------
          if (star.isTechFlare && finalAlpha > 0.25) {
            const flareAngle = time * 0.6 + star.twinklePhase;
            const spike = star.spikeLength * scale * (0.9 + 0.25 * Math.sin(time * 3 + star.twinklePhase));

            ctx.lineWidth = 1.2;
            ctx.strokeStyle = star.color;
            ctx.globalAlpha = finalAlpha * 0.85;

            // Rotating Cross Beams
            ctx.save();
            ctx.translate(projX, projY);
            ctx.rotate(flareAngle);

            ctx.beginPath();
            ctx.moveTo(-spike, 0);
            ctx.lineTo(spike, 0);
            ctx.moveTo(0, -spike);
            ctx.lineTo(0, spike);
            ctx.stroke();

            // Diagonal secondary micro-spikes
            const subSpike = spike * 0.45;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(-subSpike, -subSpike);
            ctx.lineTo(subSpike, subSpike);
            ctx.moveTo(-subSpike, subSpike);
            ctx.lineTo(subSpike, -subSpike);
            ctx.stroke();

            // 3D Orbital Gyroscopic Ring around anchor star
            const ringR = star.ringRadius * scale * 1.8;
            ctx.lineWidth = 0.8;
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
            ctx.beginPath();
            ctx.ellipse(0, 0, ringR, ringR * 0.4, star.ringTilt + time * 0.4, 0, Math.PI * 2);
            ctx.stroke();

            ctx.restore();

            // Randomly trigger subtle tech radar beacon pulse
            if (Date.now() - lastPulseTime > 2200 && Math.random() < 0.25) {
              spawnTechPulse(projX, projY, star.color);
              lastPulseTime = Date.now();
            }
          }
        }
      });

      // ----------------------------------------------------
      // C. TECH CONSTELLATION SYNAPSE MESH (Connecting Links)
      // ----------------------------------------------------
      ctx.lineWidth = 0.7;
      const maxConnectDist = 95;
      for (let i = 0; i < projectedStars.length; i++) {
        for (let j = i + 1; j < projectedStars.length; j++) {
          const s1 = projectedStars[i];
          const s2 = projectedStars[j];
          const dx = s1.x - s2.x;
          const dy = s1.y - s2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const lineAlpha = (1 - dist / maxConnectDist) * 0.22 * Math.min(s1.alpha, s2.alpha);
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
      // D. RENDER SHOOTING STAR BREAKS (Radiant Cosmic Streaks)
      // ----------------------------------------------------
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life++;
        s.x += s.dx;
        s.y += s.dy;

        const progress = s.life / s.maxLife;
        const streakAlpha = Math.sin(progress * Math.PI) * 0.95; // radiant fade

        const tailX = s.x - (s.dx / s.speed) * s.length;
        const tailY = s.y - (s.dy / s.speed) * s.length;

        // Glowing gradient tail
        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(0.2, s.color);
        grad.addColorStop(0.65, 'rgba(56, 189, 248, 0.35)');
        grad.addColorStop(1, 'transparent');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2;
        ctx.globalAlpha = streakAlpha;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Glowing streak head node
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = streakAlpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2.4, 0, Math.PI * 2);
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
        p.radius += 0.8;
        p.alpha -= 0.015;

        if (p.alpha <= 0 || p.radius >= p.maxRadius) {
          techPulses.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1;
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
