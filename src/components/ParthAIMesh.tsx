import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, Sparkles, Cpu, Radio, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

export type AIMeshState = 'idle' | 'thinking' | 'speaking';

interface ParthAIMeshProps {
  state: AIMeshState;
  audioLevel?: number; // 0.0 to 1.0 (from audio wave)
  isMuted?: boolean;
  onToggleMute?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

interface MeshPoint {
  origX: number;
  origY: number;
  origZ: number;
  x: number;
  y: number;
  z: number;
  r: number;
  g: number;
  b: number;
  alpha: number;
  isFaceCenter: boolean;
}

export const ParthAIMesh: React.FC<ParthAIMeshProps> = ({
  state,
  audioLevel = 0,
  isMuted = false,
  onToggleMute,
  isCollapsed = false,
  onToggleCollapse,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const pointsRef = useRef<MeshPoint[]>([]);
  const gridDimRef = useRef<{ cols: number; rows: number }>({ cols: 0, rows: 0 });
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Load and sample Parth's profile image into a 3D point cloud & wireframe mesh
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/parth-profile.jpg';

    img.onload = () => {
      const sampleW = 64;
      const sampleH = 64;
      const offscreen = document.createElement('canvas');
      offscreen.width = sampleW;
      offscreen.height = sampleH;
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      offCtx.drawImage(img, 0, 0, sampleW, sampleH);
      const imgData = offCtx.getImageData(0, 0, sampleW, sampleH).data;

      const points: MeshPoint[] = [];
      const worldSize = 220; // 3D coordinates scale
      const stepX = worldSize / sampleW;
      const stepY = worldSize / sampleH;

      for (let y = 0; y < sampleH; y++) {
        for (let x = 0; x < sampleW; x++) {
          const idx = (y * sampleW + x) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          const a = imgData[idx + 3];

          // Compute normalized brightness (luminance)
          const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          // Radial circular mask to create a floating cybernetic avatar
          const dx = x - sampleW / 2;
          const dy = y - sampleH / 2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxRadius = sampleW * 0.48;

          if (dist > maxRadius) continue;

          // 3D displacement: Facial highlights protrude forward in Z-depth
          const origX = (x / sampleW - 0.5) * worldSize;
          const origY = (y / sampleH - 0.5) * worldSize;
          const origZ = (luma - 0.45) * 40;

          // Mark mouth/jaw speaking anchor
          const isFaceCenter = dist < sampleW * 0.18 && y > sampleH * 0.45 && y < sampleH * 0.75;

          const edgeFalloff = Math.max(0, 1 - dist / maxRadius);
          const alpha = (a / 255) * edgeFalloff * (0.4 + luma * 0.6);

          points.push({
            origX,
            origY,
            origZ,
            x: origX,
            y: origY,
            z: origZ,
            r,
            g,
            b,
            alpha,
            isFaceCenter
          });
        }
      }

      pointsRef.current = points;
      gridDimRef.current = { cols: sampleW, rows: sampleH };
      setIsLoaded(true);
    };
  }, []);

  // Mouse / Touch tracking for interactive 3D perspective tilt
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseRef.current.targetX = nx * 0.8;
    mouseRef.current.targetY = ny * 0.8;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.targetX = 0;
    mouseRef.current.targetY = 0;
  }, []);

  // Main 3D Canvas Rendering & Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.035;

      const width = (canvas.width = canvas.parentElement?.clientWidth || 320);
      const height = (canvas.height = canvas.parentElement?.clientHeight || 200);

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse tilt interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Base rotation with idle breathing
      const rotY = Math.sin(time * 0.8) * 0.12 + mouseRef.current.x;
      const rotX = Math.cos(time * 0.6) * 0.08 - mouseRef.current.y;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const centerX = width / 2;
      const centerY = height / 2;
      const focalLength = 300;

      // Scanning line for "thinking" state
      const scanY = state === 'thinking' ? Math.sin(time * 2.5) * 80 : -999;

      // Audio reactive modulation
      const effectiveAudio = state === 'speaking' ? Math.max(0.2, audioLevel) : 0;

      // 1. Render Cybernetic Background Target Reticles & Ambient Glow
      const ambientGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 110);
      if (state === 'speaking') {
        ambientGrad.addColorStop(0, `rgba(56, 189, 248, ${0.15 + effectiveAudio * 0.2})`);
        ambientGrad.addColorStop(0.6, `rgba(99, 102, 241, ${0.08 + effectiveAudio * 0.1})`);
        ambientGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else if (state === 'thinking') {
        ambientGrad.addColorStop(0, 'rgba(168, 85, 247, 0.2)');
        ambientGrad.addColorStop(0.6, 'rgba(56, 189, 248, 0.08)');
        ambientGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        ambientGrad.addColorStop(0, 'rgba(56, 189, 248, 0.08)');
        ambientGrad.addColorStop(0.6, 'rgba(14, 165, 233, 0.03)');
        ambientGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }
      ctx.fillStyle = ambientGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 110, 0, Math.PI * 2);
      ctx.fill();

      // Cybernetic Circular HUD Rings
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(time * 0.2);
      ctx.strokeStyle = state === 'speaking' ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 12]);
      ctx.beginPath();
      ctx.arc(0, 0, 85 + effectiveAudio * 12, 0, Math.PI * 2);
      ctx.stroke();

      ctx.rotate(-time * 0.4);
      ctx.strokeStyle = state === 'speaking' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.05)';
      ctx.setLineDash([2, 18]);
      ctx.beginPath();
      ctx.arc(0, 0, 96 + effectiveAudio * 6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 2. Transform and Project 3D Points
      const points = pointsRef.current;
      const projected: Array<{ sx: number; sy: number; sz: number; p: MeshPoint; glow: boolean }> = [];

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        // Harmonic speaking wave vibration
        let zDisp = 0;
        let xDisp = 0;
        let yDisp = 0;

        if (state === 'speaking') {
          // Acoustic wave ripples outwards from mouth
          const distToMouth = Math.sqrt(pt.origX * pt.origX + (pt.origY - 25) * (pt.origY - 25));
          const ripple = Math.sin(time * 12 - distToMouth * 0.12) * effectiveAudio;
          zDisp = ripple * (pt.isFaceCenter ? 14 : 7);
          xDisp = (pt.origX / 100) * ripple * 4;
          yDisp = (pt.origY / 100) * ripple * 4;
        } else if (state === 'thinking') {
          zDisp = Math.sin(time * 6 + pt.origX * 0.05) * 4;
        }

        const currentX = pt.origX + xDisp;
        const currentY = pt.origY + yDisp;
        const currentZ = pt.origZ + zDisp;

        // 3D Rotations
        // 1. Rotate around Y axis
        const x1 = currentX * cosY + currentZ * sinY;
        const z1 = currentZ * cosY - currentX * sinY;

        // 2. Rotate around X axis
        const y2 = currentY * cosX - z1 * sinX;
        const z2 = z1 * cosX + currentY * sinX;

        // Perspective projection
        const scale = focalLength / (focalLength + z2 + 180);
        const sx = centerX + x1 * scale;
        const sy = centerY + y2 * scale;

        // Check if scanning laser intersects this point
        const isNearScan = state === 'thinking' && Math.abs(currentY - scanY) < 12;

        projected.push({
          sx,
          sy,
          sz: z2,
          p: pt,
          glow: isNearScan
        });
      }

      // 3. Render Cybernetic Connecting Wireframe Links (Every ~4th point to maintain 60 FPS)
      ctx.lineWidth = 0.6;
      for (let i = 0; i < projected.length; i += 3) {
        const p1 = projected[i];
        if (p1.p.alpha < 0.2) continue;

        // Connect to a nearby neighbor
        const nextIdx = i + 1;
        if (nextIdx < projected.length) {
          const p2 = projected[nextIdx];
          const distSq = (p1.sx - p2.sx) * (p1.sx - p2.sx) + (p1.sy - p2.sy) * (p1.sy - p2.sy);
          if (distSq < 140) {
            ctx.strokeStyle = state === 'speaking'
              ? `rgba(56, 189, 248, ${0.12 + effectiveAudio * 0.25})`
              : 'rgba(255, 255, 255, 0.05)';
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            ctx.stroke();
          }
        }
      }

      // 4. Render 3D Point Cloud Nodes with Authentic Image Colors
      for (let i = 0; i < projected.length; i++) {
        const item = projected[i];
        const pt = item.p;

        let nodeColor: string;
        let nodeSize = 1.6;

        if (item.glow) {
          nodeColor = '#38BDF8';
          nodeSize = 2.8;
        } else if (state === 'speaking' && pt.isFaceCenter) {
          // Vivid voice highlight on mouth / jaw region
          const mix = effectiveAudio * 0.5;
          nodeColor = `rgba(${Math.min(255, pt.r + 40)}, ${Math.min(255, pt.g + 80)}, 255, ${pt.alpha + mix})`;
          nodeSize = 1.9 + effectiveAudio * 1.2;
        } else {
          nodeColor = `rgba(${pt.r}, ${pt.g}, ${pt.b}, ${pt.alpha})`;
        }

        ctx.fillStyle = nodeColor;
        ctx.fillRect(item.sx, item.sy, nodeSize, nodeSize);
      }

      // 5. Laser Scanline overlay when thinking
      if (state === 'thinking') {
        const scanScreenY = centerY + scanY;
        const grad = ctx.createLinearGradient(centerX - 80, scanScreenY, centerX + 80, scanScreenY);
        grad.addColorStop(0, 'rgba(56, 189, 248, 0)');
        grad.addColorStop(0.5, 'rgba(56, 189, 248, 0.7)');
        grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(centerX - 80, scanScreenY);
        ctx.lineTo(centerX + 80, scanScreenY);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [state, audioLevel]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full transition-all duration-300 ${
        isCollapsed ? 'h-11' : 'h-[175px] sm:h-[195px]'
      } bg-gradient-to-b from-[#090D16] via-[#0B101D] to-[#070A12] border-b border-white/10 overflow-hidden select-none ${className}`}
    >
      {/* Background Cybernetic Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Main 3D Canvas (Only rendered when expanded) */}
      {!isCollapsed && (
        <canvas
          ref={canvasRef}
          className="w-full h-full block cursor-grab active:cursor-grabbing"
        />
      )}

      {/* Top Left: Persona Identity & Neural Architecture Tag */}
      <div className="absolute top-2.5 left-3 flex items-center gap-2 pointer-events-none">
        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
          <Cpu className="w-3.5 h-3.5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-white tracking-wide">
            <span>PARTH AI PERSONA</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30 font-mono">
              3D MESH
            </span>
          </div>
          {!isCollapsed && (
            <div className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
              <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
              <span>Voice & Corpus Grounded</span>
            </div>
          )}
        </div>
      </div>

      {/* Top Right: Sound Mute / Unmute, Collapse Toggle & Live State Pill */}
      <div className="absolute top-2.5 right-3 flex items-center gap-1.5">
        {onToggleMute && (
          <button
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute AI Voice' : 'Mute AI Voice'}
            title={isMuted ? 'Voice Muted (Click to enable audio)' : 'Voice Enabled (Click to mute)'}
            className={`p-1.5 rounded-lg border transition-all ${
              isMuted
                ? 'bg-zinc-900/90 border-white/10 text-zinc-400 hover:text-white'
                : 'bg-sky-500/20 border-sky-500/40 text-sky-300 hover:bg-sky-500/30 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
            }`}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-pulse" />}
          </button>
        )}

        <div className="px-2 py-0.5 rounded-full bg-zinc-900/90 border border-white/10 text-[10px] font-mono text-zinc-300 flex items-center gap-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              state === 'speaking'
                ? 'bg-sky-400 animate-ping'
                : state === 'thinking'
                ? 'bg-amber-400 animate-pulse'
                : 'bg-emerald-400'
            }`}
          />
          <span className="uppercase text-[9px] tracking-wider font-semibold">
            {state === 'speaking' ? 'Speaking...' : state === 'thinking' ? 'Analyzing...' : 'Online'}
          </span>
        </div>

        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Expand 3D Mesh' : 'Minimize 3D Mesh'}
            title={isCollapsed ? 'Expand 3D Face Mesh' : 'Minimize 3D Face Mesh'}
            className="p-1.5 rounded-lg border border-white/10 bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            {isCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Bottom Center: Animated Audio Equalizer Waveform */}
      <div className={`absolute ${isCollapsed ? 'bottom-2.5 left-1/2 -translate-x-1/2' : 'bottom-2.5 left-1/2 -translate-x-1/2'} flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-950/80 border border-white/10 backdrop-blur-md shadow-lg pointer-events-none`}>
        <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest mr-1">
          {state === 'speaking' ? 'VOICE FREQ' : 'SPEECH SYNTH'}
        </span>
        <div className="flex items-center gap-0.5 h-3">
          {[0.3, 0.7, 1.0, 0.5, 0.8, 0.4, 0.9, 0.6, 0.3].map((h, i) => (
            <span
              key={i}
              className={`w-0.5 rounded-full transition-all duration-100 ${
                state === 'speaking' ? 'bg-sky-400' : 'bg-zinc-600'
              }`}
              style={{
                height:
                  state === 'speaking'
                    ? `${Math.max(3, Math.min(14, (h * (audioLevel || 0.6) + Math.sin(i * 1.5)) * 14))}px`
                    : '3px'
              }}
            />
          ))}
        </div>
      </div>

      {/* Corner Cybernetic HUD Brackets */}
      {!isCollapsed && (
        <>
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-sky-400/50 pointer-events-none" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-sky-400/50 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-sky-400/50 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-sky-400/50 pointer-events-none" />
        </>
      )}
    </div>
  );
};
