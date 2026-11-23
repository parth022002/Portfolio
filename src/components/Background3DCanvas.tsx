import React, { useEffect, useRef } from 'react';

interface Particle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
}

interface Point3 {
  x: number;
  y: number;
  z: number;
}

export const Background3DCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates for 3D camera parallax tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0;
    let rotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - width / 2) / (width / 2);
      mouseY = (e.clientY - height / 2) / (height / 2);
      targetRotY = mouseX * 0.45;
      targetRotX = -mouseY * 0.45;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // ==========================================
    // 1. NEURAL CONSTELLATION PARTICLES (110 particles)
    // ==========================================
    const numParticles = 110;
    const particles: Particle3D[] = [];
    const colors = ['#38BDF8', '#818CF8', '#34D399', '#A855F7', '#60A5FA', '#2DD4BF'];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 1800,
        y: (Math.random() - 0.5) * 1800,
        z: Math.random() * 1200 + 100,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        vz: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // ==========================================
    // 2. GEOMETRY GENERATORS
    // ==========================================

    // A. Icosahedron Geometry
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawIcoVerts = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];
    const icoRadius = 150;
    const icosahedronVertices: Point3[] = rawIcoVerts.map(([x, y, z]) => ({
      x: x * (icoRadius / Math.sqrt(1 + phi * phi)),
      y: y * (icoRadius / Math.sqrt(1 + phi * phi)),
      z: z * (icoRadius / Math.sqrt(1 + phi * phi)),
    }));
    const icosahedronEdges: [number, number][] = [];
    for (let i = 0; i < icosahedronVertices.length; i++) {
      for (let j = i + 1; j < icosahedronVertices.length; j++) {
        const dx = icosahedronVertices[i].x - icosahedronVertices[j].x;
        const dy = icosahedronVertices[i].y - icosahedronVertices[j].y;
        const dz = icosahedronVertices[i].z - icosahedronVertices[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (Math.abs(dist - icoRadius * 1.05) < 25) {
          icosahedronEdges.push([i, j]);
        }
      }
    }

    // B. 4D Hypercube / Tesseract Vertices & Edges (16 vertices, 32 edges)
    const tesseractRaw: number[][] = [];
    for (let x of [-1, 1]) {
      for (let y of [-1, 1]) {
        for (let z of [-1, 1]) {
          for (let w of [-1, 1]) {
            tesseractRaw.push([x, y, z, w]);
          }
        }
      }
    }
    const tesseractEdges: [number, number][] = [];
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        let diff = 0;
        for (let k = 0; k < 4; k++) {
          if (tesseractRaw[i][k] !== tesseractRaw[j][k]) diff++;
        }
        if (diff === 1) tesseractEdges.push([i, j]);
      }
    }

    // C. Parametric Torus (R=120, r=40)
    const torusSegmentsU = 18;
    const torusSegmentsV = 9;
    const torusR = 110;
    const torusr = 38;
    const torusBaseVertices: Point3[] = [];
    const torusEdges: [number, number][] = [];

    for (let i = 0; i < torusSegmentsU; i++) {
      const u = (i / torusSegmentsU) * Math.PI * 2;
      for (let j = 0; j < torusSegmentsV; j++) {
        const v = (j / torusSegmentsV) * Math.PI * 2;
        torusBaseVertices.push({
          x: (torusR + torusr * Math.cos(v)) * Math.cos(u),
          y: (torusR + torusr * Math.cos(v)) * Math.sin(u),
          z: torusr * Math.sin(v)
        });
        const curr = i * torusSegmentsV + j;
        const nextV = i * torusSegmentsV + ((j + 1) % torusSegmentsV);
        const nextU = ((i + 1) % torusSegmentsU) * torusSegmentsV + j;
        torusEdges.push([curr, nextV]);
        torusEdges.push([curr, nextU]);
      }
    }

    // D. Octahedral Diamond Crystal (R=115, H=160)
    const octR = 100;
    const octH = 150;
    const octahedronVertices: Point3[] = [
      { x: 0, y: -octH, z: 0 }, // Top
      { x: 0, y: octH, z: 0 },  // Bottom
      { x: octR, y: 0, z: 0 },
      { x: -octR, y: 0, z: 0 },
      { x: 0, y: 0, z: octR },
      { x: 0, y: 0, z: -octR },
    ];
    const octahedronEdges: [number, number][] = [
      [0, 2], [0, 3], [0, 4], [0, 5], // Top pyramid
      [1, 2], [1, 3], [1, 4], [1, 5], // Bottom pyramid
      [2, 4], [4, 3], [3, 5], [5, 2]  // Equator belt
    ];

    // E. Double-Helix Data Strand (2 interwoven spirals with cross rungs)
    const helixPointsCount = 28;
    const helixRadius = 55;
    const helixHeight = 320;
    const helixStrandA: Point3[] = [];
    const helixStrandB: Point3[] = [];
    const helixRungs: [number, number][] = [];

    for (let i = 0; i < helixPointsCount; i++) {
      const t = (i / (helixPointsCount - 1)) * Math.PI * 4;
      const y = (i / (helixPointsCount - 1) - 0.5) * helixHeight;
      helixStrandA.push({
        x: Math.cos(t) * helixRadius,
        y: y,
        z: Math.sin(t) * helixRadius,
      });
      helixStrandB.push({
        x: Math.cos(t + Math.PI) * helixRadius,
        y: y,
        z: Math.sin(t + Math.PI) * helixRadius,
      });
      if (i % 2 === 0) {
        helixRungs.push([i, i]); // connect strand A[i] to strand B[i]
      }
    }

    // F. Chrono-Orbital Rings (3 concentric gimbal rings)
    const ringRadii = [135, 105, 75];
    const ringSegments = 32;

    // Projection FOV
    const fov = 750;

    // Time counter for rotations
    let time = 0;

    // 3D rotation helper
    const rotate3D = (p: Point3, rx: number, ry: number, rz: number): Point3 => {
      // Rotate Y
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = p.x * cosY + p.z * sinY;
      const z1 = -p.x * sinY + p.z * cosY;

      // Rotate X
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      // Rotate Z
      const cosZ = Math.cos(rz);
      const sinZ = Math.sin(rz);
      const x3 = x1 * cosZ - y2 * sinZ;
      const y3 = x1 * sinZ + y2 * cosZ;

      return { x: x3, y: y3, z: z2 };
    };

    // Project 3D point to 2D screen with world offset
    const project = (p: Point3, screenCenterX: number, screenCenterY: number, depthOffset = 650) => {
      const z = p.z + depthOffset;
      if (z <= 20) return null;
      const scale = fov / z;
      return {
        x: screenCenterX + p.x * scale,
        y: screenCenterY + p.y * scale,
        z: z,
        scale: scale,
      };
    };

    // Helper to get element screen position and visibility
    const getSectionAnchor = (id: string, defaultXRatio: number) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const centerY = rect.top + rect.height * 0.45;
      // Visibility calculation with margin
      const inView = centerY > -400 && centerY < height + 400;
      if (!inView) return null;
      // Opacity based on distance to screen center
      const distFromCenter = Math.abs(centerY - height / 2);
      const alpha = Math.max(0, Math.min(1, 1.2 - distFromCenter / (height * 0.85)));
      return {
        x: width * defaultXRatio,
        y: centerY,
        alpha: alpha,
      };
    };

    // ==========================================
    // RENDER LOOP
    // ==========================================
    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      // Smooth camera interpolation with mouse
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      // ----------------------------------------------------
      // A. PERSPECTIVE CYBER GRID PLANE (at bottom horizon)
      // ----------------------------------------------------
      const gridY = height * 0.88;
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
      const gridCols = 16;
      for (let c = 0; c <= gridCols; c++) {
        const xBase = (c / gridCols) * width;
        const xHorizon = width / 2 + (c / gridCols - 0.5) * (width * 0.35);
        ctx.beginPath();
        ctx.moveTo(xBase, height);
        ctx.lineTo(xHorizon, gridY - 80);
        ctx.stroke();
      }
      for (let r = 0; r < 5; r++) {
        const yLine = gridY + (r / 5) * (height - gridY);
        ctx.beginPath();
        ctx.moveTo(0, yLine);
        ctx.lineTo(width, yLine);
        ctx.stroke();
      }

      // ----------------------------------------------------
      // B. NEURAL CONSTELLATION PARTICLES & SYNAPSE LINES
      // ----------------------------------------------------
      const projectedParticles: { x: number; y: number; z: number; size: number; color: string; alpha: number }[] = [];

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Wrap boundaries
        if (p.z <= 60) p.z = 1200;
        if (p.z > 1200) p.z = 60;
        if (p.x < -900) p.x = 900;
        if (p.x > 900) p.x = -900;
        if (p.y < -900) p.y = 900;
        if (p.y > 900) p.y = -900;

        const rotated = rotate3D(p, rotX * 0.3, rotY * 0.3, 0);
        const proj = project(rotated, width / 2, height / 2, 700);

        if (proj && proj.x >= 0 && proj.x <= width && proj.y >= 0 && proj.y <= height) {
          const alpha = Math.max(0.12, Math.min(0.7, (1200 - proj.z) / 1200));
          projectedParticles.push({
            x: proj.x,
            y: proj.y,
            z: proj.z,
            size: Math.max(0.7, p.size * proj.scale * 1.4),
            color: p.color,
            alpha: alpha,
          });

          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, Math.max(0.8, p.size * proj.scale * 1.5), 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw constellation connecting lines between close particles
      ctx.lineWidth = 0.6;
      const maxDistance = 95;
      for (let i = 0; i < projectedParticles.length; i++) {
        for (let j = i + 1; j < projectedParticles.length; j++) {
          const p1 = projectedParticles[i];
          const p2 = projectedParticles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.22 * Math.min(p1.alpha, p2.alpha);
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = lineAlpha;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // ----------------------------------------------------
      // C. 3D SCULPTURE 1: QUANTUM GYROSCOPE & ICOSAHEDRON (Hero Section)
      // ----------------------------------------------------
      const heroAnchor = getSectionAnchor('hero', 0.82) || {
        x: width > 1024 ? width * 0.8 : width * 0.5,
        y: height * 0.35,
        alpha: 0.9,
      };

      if (heroAnchor.alpha > 0.05) {
        const icoRotX = rotX + time * 0.3;
        const icoRotY = rotY + time * 0.5;
        const icoRotZ = time * 0.2;

        const projIco = icosahedronVertices.map((v) => {
          const r = rotate3D(v, icoRotX, icoRotY, icoRotZ);
          return project(r, heroAnchor.x, heroAnchor.y, 650);
        });

        // Edges
        ctx.lineWidth = 1;
        icosahedronEdges.forEach(([i, j]) => {
          const p1 = projIco[i];
          const p2 = projIco[j];
          if (p1 && p2) {
            const edgeAlpha = Math.max(0.04, Math.min(0.35, 200 / ((p1.z + p2.z) / 2))) * heroAnchor.alpha;
            ctx.strokeStyle = `rgba(56, 189, 248, ${edgeAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });

        // Glowing Vertices
        projIco.forEach((p) => {
          if (p) {
            ctx.fillStyle = `rgba(129, 140, 248, ${0.7 * heroAnchor.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2.8 * p.scale, 0, Math.PI * 2);
            ctx.fill();
          }
        });

        // Outer Gimbal Rings around Icosahedron
        ringRadii.forEach((rad, rIdx) => {
          const ringAngleX = time * (0.4 + rIdx * 0.2) + (rIdx === 0 ? rotX : 0);
          const ringAngleY = time * (0.6 - rIdx * 0.25) + (rIdx === 1 ? rotY : 0);
          const ringAngleZ = rIdx * (Math.PI / 3);

          ctx.strokeStyle = rIdx === 0
            ? `rgba(56, 189, 248, ${0.28 * heroAnchor.alpha})`
            : rIdx === 1
            ? `rgba(52, 211, 153, ${0.22 * heroAnchor.alpha})`
            : `rgba(168, 85, 247, ${0.25 * heroAnchor.alpha})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();

          for (let s = 0; s <= ringSegments; s++) {
            const theta = (s / ringSegments) * Math.PI * 2;
            const pt: Point3 = {
              x: Math.cos(theta) * rad * 1.55,
              y: Math.sin(theta) * rad * 1.55,
              z: 0,
            };
            const rotPt = rotate3D(pt, ringAngleX, ringAngleY, ringAngleZ);
            const projRing = project(rotPt, heroAnchor.x, heroAnchor.y, 650);
            if (projRing) {
              if (s === 0) ctx.moveTo(projRing.x, projRing.y);
              else ctx.lineTo(projRing.x, projRing.y);
            }
          }
          ctx.stroke();
        });
      }

      // ----------------------------------------------------
      // D. 3D SCULPTURE 2: 4D HYPERCUBE TESSERACT (Projects Section - Left Margin)
      // ----------------------------------------------------
      const projAnchor = getSectionAnchor('projects', 0.08);
      if (projAnchor && projAnchor.alpha > 0.05) {
        const tessTime = time * 0.8;
        const tessRadius = 110;

        // 4D Rotation in XW and ZW planes, then project to 3D
        const tess3D: Point3[] = tesseractRaw.map(([x, y, z, w]) => {
          // Rotate in X-W plane
          const cosA = Math.cos(tessTime);
          const sinA = Math.sin(tessTime);
          const x1 = x * cosA - w * sinA;
          const w1 = x * sinA + w * cosA;

          // Rotate in Y-Z plane
          const cosB = Math.cos(tessTime * 0.6);
          const sinB = Math.sin(tessTime * 0.6);
          const y1 = y * cosB - z * sinB;
          const z1 = y * sinB + z * cosB;

          // 4D to 3D perspective projection
          const fov4D = 2.4;
          const distance4D = 2.8;
          const scale4D = fov4D / (distance4D - w1);

          return {
            x: x1 * scale4D * tessRadius,
            y: y1 * scale4D * tessRadius,
            z: z1 * scale4D * tessRadius,
          };
        });

        // Rotate in 3D world space
        const projTess = tess3D.map((p3) => {
          const rotP = rotate3D(p3, rotX + time * 0.25, rotY + time * 0.4, 0);
          return project(rotP, projAnchor.x, projAnchor.y, 620);
        });

        // Draw Tesseract Edges
        ctx.lineWidth = 1;
        tesseractEdges.forEach(([i, j]) => {
          const p1 = projTess[i];
          const p2 = projTess[j];
          if (p1 && p2) {
            const edgeAlpha = Math.max(0.05, Math.min(0.4, 190 / ((p1.z + p2.z) / 2))) * projAnchor.alpha;
            ctx.strokeStyle = `rgba(168, 85, 247, ${edgeAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });

        // Vertices
        projTess.forEach((p) => {
          if (p) {
            ctx.fillStyle = `rgba(129, 140, 248, ${0.65 * projAnchor.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2.2 * p.scale, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      // ----------------------------------------------------
      // E. 3D SCULPTURE 3: PARAMETRIC TORUS RING (Skills & Evidence - Right Margin)
      // ----------------------------------------------------
      const skillsAnchor = getSectionAnchor('evidence', 0.92);
      if (skillsAnchor && skillsAnchor.alpha > 0.05) {
        const torusRotX = rotX + time * 0.4;
        const torusRotY = rotY + time * 0.6;
        const torusRotZ = Math.PI / 4 + time * 0.2;

        const projTorus = torusBaseVertices.map((v) => {
          const r = rotate3D(v, torusRotX, torusRotY, torusRotZ);
          return project(r, skillsAnchor.x, skillsAnchor.y, 640);
        });

        ctx.lineWidth = 0.8;
        torusEdges.forEach(([i, j]) => {
          const p1 = projTorus[i];
          const p2 = projTorus[j];
          if (p1 && p2) {
            const edgeAlpha = Math.max(0.03, Math.min(0.28, 170 / ((p1.z + p2.z) / 2))) * skillsAnchor.alpha;
            ctx.strokeStyle = `rgba(52, 211, 153, ${edgeAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      }

      // ----------------------------------------------------
      // F. 3D SCULPTURE 4: OCTAHEDRAL DIAMOND CRYSTAL (Certificates - Left Margin)
      // ----------------------------------------------------
      const certAnchor = getSectionAnchor('certificates', 0.08);
      if (certAnchor && certAnchor.alpha > 0.05) {
        const octRotX = rotX + time * 0.45;
        const octRotY = rotY + time * 0.7;
        const octRotZ = time * 0.3;

        const projOct = octahedronVertices.map((v) => {
          const r = rotate3D(v, octRotX, octRotY, octRotZ);
          return project(r, certAnchor.x, certAnchor.y, 600);
        });

        ctx.lineWidth = 1.2;
        octahedronEdges.forEach(([i, j]) => {
          const p1 = projOct[i];
          const p2 = projOct[j];
          if (p1 && p2) {
            const edgeAlpha = Math.max(0.06, Math.min(0.45, 210 / ((p1.z + p2.z) / 2))) * certAnchor.alpha;
            ctx.strokeStyle = `rgba(244, 63, 94, ${edgeAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });

        // Glowing center core vertex
        const coreProj = project(rotate3D({ x: 0, y: 0, z: 0 }, octRotX, octRotY, octRotZ), certAnchor.x, certAnchor.y, 600);
        if (coreProj) {
          ctx.fillStyle = `rgba(56, 189, 248, ${0.9 * certAnchor.alpha})`;
          ctx.beginPath();
          ctx.arc(coreProj.x, coreProj.y, 4.5 * coreProj.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ----------------------------------------------------
      // G. 3D SCULPTURE 5: DOUBLE-HELIX DATA STRAND (Research Section - Right Margin)
      // ----------------------------------------------------
      const resAnchor = getSectionAnchor('research', 0.92);
      if (resAnchor && resAnchor.alpha > 0.05) {
        const helixAngle = time * 0.8;

        const projA = helixStrandA.map((v) => {
          const r = rotate3D(v, rotX * 0.3, helixAngle, 0.2);
          return project(r, resAnchor.x, resAnchor.y, 600);
        });
        const projB = helixStrandB.map((v) => {
          const r = rotate3D(v, rotX * 0.3, helixAngle, 0.2);
          return project(r, resAnchor.x, resAnchor.y, 600);
        });

        // Draw Strand A line
        ctx.lineWidth = 1.4;
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.35 * resAnchor.alpha})`;
        ctx.beginPath();
        for (let i = 0; i < projA.length; i++) {
          const p = projA[i];
          if (p) {
            if (i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
        }
        ctx.stroke();

        // Draw Strand B line
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.35 * resAnchor.alpha})`;
        ctx.beginPath();
        for (let i = 0; i < projB.length; i++) {
          const p = projB[i];
          if (p) {
            if (i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
        }
        ctx.stroke();

        // Connecting Rungs
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = `rgba(168, 85, 247, ${0.3 * resAnchor.alpha})`;
        helixRungs.forEach(([i, j]) => {
          const p1 = projA[i];
          const p2 = projB[j];
          if (p1 && p2) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      }

      // ----------------------------------------------------
      // H. 3D SCULPTURE 6: CHRONO BEACON & RADAR RINGS (Journey & Contact)
      // ----------------------------------------------------
      const journeyAnchor = getSectionAnchor('journey', 0.08);
      if (journeyAnchor && journeyAnchor.alpha > 0.05) {
        const chronoAngle = time * 0.6;
        const chronoRadius = 130;

        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(244, 63, 94, ${0.25 * journeyAnchor.alpha})`;

        // Double rotating orbital loop
        for (let r = 0; r < 2; r++) {
          ctx.beginPath();
          const rTilt = r === 0 ? chronoAngle : -chronoAngle * 0.7;
          for (let s = 0; s <= 32; s++) {
            const theta = (s / 32) * Math.PI * 2;
            const pt: Point3 = {
              x: Math.cos(theta) * (chronoRadius - r * 30),
              y: Math.sin(theta) * (chronoRadius - r * 30),
              z: 0
            };
            const rotPt = rotate3D(pt, r === 0 ? 0.7 : -0.5, rTilt, r * 0.4);
            const projPt = project(rotPt, journeyAnchor.x, journeyAnchor.y, 630);
            if (projPt) {
              if (s === 0) ctx.moveTo(projPt.x, projPt.y);
              else ctx.lineTo(projPt.x, projPt.y);
            }
          }
          ctx.stroke();
        }
      }

      const contactAnchor = getSectionAnchor('contact', 0.92);
      if (contactAnchor && contactAnchor.alpha > 0.05) {
        const beaconRadius = 140;
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.28 * contactAnchor.alpha})`;
        ctx.beginPath();
        for (let s = 0; s <= 32; s++) {
          const theta = (s / 32) * Math.PI * 2;
          const pt: Point3 = {
            x: Math.cos(theta) * beaconRadius,
            y: Math.sin(theta) * beaconRadius,
            z: 0
          };
          const rotPt = rotate3D(pt, 1.1 + rotX * 0.4, time * 0.5 + rotY * 0.4, 0);
          const projPt = project(rotPt, contactAnchor.x, contactAnchor.y, 620);
          if (projPt) {
            if (s === 0) ctx.moveTo(projPt.x, projPt.y);
            else ctx.lineTo(projPt.x, projPt.y);
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-20 opacity-75 transition-opacity duration-1000"
    />
  );
};
