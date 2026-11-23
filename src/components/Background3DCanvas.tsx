import React, { useEffect, useRef } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
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

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Generate 3D Particle Cloud
    const numParticles = 80;
    const particles: Point3D[] = [];
    const colors = ['#38BDF8', '#818CF8', '#34D399', '#A855F7', '#60A5FA'];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 1600,
        y: (Math.random() - 0.5) * 1600,
        z: Math.random() * 1200 + 100,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // 3D Wireframe Icosahedron Geometry vertices
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];
    const icosahedronRadius = 220;
    const vertices = rawVertices.map(([x, y, z]) => ({
      x: x * (icosahedronRadius / Math.sqrt(1 + phi * phi)),
      y: y * (icosahedronRadius / Math.sqrt(1 + phi * phi)),
      z: z * (icosahedronRadius / Math.sqrt(1 + phi * phi)),
    }));

    // Icosahedron Edges
    const edges: [number, number][] = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = vertices[i].x - vertices[j].x;
        const dy = vertices[i].y - vertices[j].y;
        const dz = vertices[i].z - vertices[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        // Normalized edge length for standard icosahedron is ~2*radius/sqrt(1+phi^2)
        if (Math.abs(dist - icosahedronRadius * 1.05) < 30) {
          edges.push([i, j]);
        }
      }
    }

    let geomAngleX = 0;
    let geomAngleY = 0;
    const fov = 700;

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth camera interpolation
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      geomAngleX += 0.003;
      geomAngleY += 0.005;

      const cosX = Math.cos(rotX + geomAngleX);
      const sinX = Math.sin(rotX + geomAngleX);
      const cosY = Math.cos(rotY + geomAngleY);
      const sinY = Math.sin(rotY + geomAngleY);

      // 1. Render 3D Wireframe Polyhedron in Center Background
      const projectedPoly = vertices.map((v) => {
        // Rotate around Y then X
        const x1 = v.x * cosY + v.z * sinY;
        const z1 = -v.x * sinY + v.z * cosY;
        const y2 = v.y * cosX - z1 * sinX;
        const z2 = v.y * sinX + z1 * cosX + 700; // Offset into screen

        const scale = fov / z2;
        return {
          x: width * 0.75 + x1 * scale,
          y: height * 0.35 + y2 * scale,
          z: z2,
          scale,
        };
      });

      // Draw Polyhedron Edges
      ctx.lineWidth = 1;
      edges.forEach(([i, j]) => {
        const p1 = projectedPoly[i];
        const p2 = projectedPoly[j];
        if (p1.z > 100 && p2.z > 100) {
          const depthAlpha = Math.max(0.04, Math.min(0.22, 180 / ((p1.z + p2.z) / 2)));
          ctx.strokeStyle = `rgba(56, 189, 248, ${depthAlpha})`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });

      // Draw Polyhedron Vertices
      projectedPoly.forEach((p) => {
        if (p.z > 100) {
          ctx.fillStyle = 'rgba(129, 140, 248, 0.4)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5 * p.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 2. Render & Drift 3D Particle Cloud
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Wrap around boundaries
        if (p.z <= 50) p.z = 1200;
        if (p.z > 1200) p.z = 50;
        if (p.x < -800) p.x = 800;
        if (p.x > 800) p.x = -800;
        if (p.y < -800) p.y = 800;
        if (p.y > 800) p.y = -800;

        // Apply camera rotation
        const pCosY = Math.cos(rotY);
        const pSinY = Math.sin(rotY);
        const px = p.x * pCosY + p.z * pSinY;
        const pz = -p.x * pSinY + p.z * pCosY;

        if (pz > 30) {
          const scale = fov / pz;
          const projX = width / 2 + px * scale;
          const projY = height / 2 + p.y * scale;

          if (projX >= 0 && projX <= width && projY >= 0 && projY <= height) {
            const alpha = Math.max(0.1, Math.min(0.65, (1200 - pz) / 1200));
            ctx.fillStyle = p.color;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(projX, projY, Math.max(0.8, p.size * scale * 1.5), 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        }
      });

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
      className="fixed inset-0 pointer-events-none -z-20 opacity-40 transition-opacity duration-1000"
    />
  );
};
