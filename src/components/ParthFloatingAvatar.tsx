import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, Sparkles, Radio } from 'lucide-react';
import { AIMeshState } from './ParthAIMesh';

interface ParthFloatingAvatarProps {
  state: AIMeshState;
  audioLevel?: number; // 0.0 to 1.0 (from audio wave)
  isMuted?: boolean;
  onToggleMute?: () => void;
  className?: string;
}

interface AvatarPoint {
  origX: number;
  origY: number;
  origZ: number;
  r: number;
  g: number;
  b: number;
  alpha: number;
  isJaw: boolean;
  isLip: boolean;
  isBrow: boolean;
}

export const ParthFloatingAvatar: React.FC<ParthFloatingAvatarProps> = ({
  state,
  audioLevel = 0,
  isMuted = false,
  onToggleMute,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<AvatarPoint[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load and sample Parth's profile image into transparent 3D face mesh with anatomical tags
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/parth-profile.jpg';

    img.onload = () => {
      const sampleW = 56;
      const sampleH = 56;
      const offscreen = document.createElement('canvas');
      offscreen.width = sampleW;
      offscreen.height = sampleH;
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      offCtx.drawImage(img, 0, 0, sampleW, sampleH);
      const imgData = offCtx.getImageData(0, 0, sampleW, sampleH).data;

      const points: AvatarPoint[] = [];
      const worldSize = 140; // Scaled for compact floating widget

      for (let y = 0; y < sampleH; y++) {
        for (let x = 0; x < sampleW; x++) {
          const idx = (y * sampleW + x) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          const a = imgData[idx + 3];

          // Compute normalized brightness (luminance)
          const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          // Radial circular/oval vignette mask to dissolve edges into pure transparency
          const dx = (x - sampleW * 0.5) / (sampleW * 0.48);
          const dy = (y - sampleH * 0.52) / (sampleH * 0.48);
          const distSq = dx * dx + dy * dy;

          if (distSq > 1.0) continue;

          // Soft feathered alpha falloff towards the borders
          const edgeFalloff = Math.max(0, 1 - Math.sqrt(distSq));
          const alpha = (a / 255) * edgeFalloff * (0.35 + luma * 0.65);

          if (alpha < 0.1) continue;

          const origX = (x / sampleW - 0.5) * worldSize;
          const origY = (y / sampleH - 0.5) * worldSize;
          // Z-depth displacement from facial highlights
          const origZ = (luma - 0.45) * 30;

          // Anatomical feature segmentation for realistic speech movement
          const normY = y / sampleH;
          const normX = Math.abs(x / sampleW - 0.5);

          const isJaw = normY > 0.62 && normY < 0.85 && normX < 0.3;
          const isLip = normY > 0.54 && normY <= 0.66 && normX < 0.22;
          const isBrow = normY > 0.32 && normY < 0.44 && normX < 0.32;

          points.push({
            origX,
            origY,
            origZ,
            r,
            g,
            b,
            alpha,
            isJaw,
            isLip,
            isBrow
          });
        }
      }

      pointsRef.current = points;
      setIsLoaded(true);
    };
  }, []);

  // Track cursor for subtle head tracking
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseRef.current.targetX = nx * 0.6;
    mouseRef.current.targetY = ny * 0.6;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.targetX = 0;
    mouseRef.current.targetY = 0;
  }, []);

  // Main 3D Holographic Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.038;

      const width = (canvas.width = canvas.parentElement?.clientWidth || 140);
      const height = (canvas.height = canvas.parentElement?.clientHeight || 160);

      // 100% TRANSPARENT CANVAS CLEAR (NO BACKGROUND)
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.07;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.07;

      const centerX = width / 2;
      const centerY = height / 2 + 5;
      const focalLength = 220;

      // 1. Natural Organic Movements
      // Idle Lissajous breathing
      const idleYaw = Math.sin(time * 0.8) * 0.09;
      const idlePitch = Math.cos(time * 0.6) * 0.06;

      // Conversational speaking gestures
      let speakNod = 0;
      let speakTilt = 0;
      let jawDrop = 0;
      let lipWave = 0;
      let browLift = 0;

      const isSpeaking = state === 'speaking';
      const effectiveAudio = isSpeaking ? Math.max(0.25, audioLevel) : 0;

      if (isSpeaking) {
        // Natural rhythmic conversational head nod on emphasized beats
        speakNod = Math.sin(time * 3.8) * 0.06 * effectiveAudio;
        speakTilt = Math.cos(time * 2.4) * 0.04 * effectiveAudio;

        // Syllable cycle for mouth opening/closing
        const syllableCycle = Math.max(0, Math.sin(time * 15) * Math.cos(time * 7.5));
        jawDrop = syllableCycle * effectiveAudio * 9;
        lipWave = Math.sin(time * 16) * effectiveAudio * 4;
        browLift = Math.sin(time * 2.0) * 0.02 * effectiveAudio;
      } else if (state === 'thinking') {
        speakNod = Math.sin(time * 4.5) * 0.03;
      }

      const rotY = idleYaw + speakTilt + mouseRef.current.x;
      const rotX = idlePitch + speakNod - mouseRef.current.y + browLift;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // 2. Render Acoustic Floating Rings Behind Head (When Speaking)
      if (isSpeaking) {
        ctx.save();
        ctx.translate(centerX, centerY - 10);
        for (let ring = 1; ring <= 3; ring++) {
          const ringRad = 45 + ((time * 30 + ring * 22) % 45);
          const ringAlpha = Math.max(0, 0.4 - ringRad / 90) * effectiveAudio;
          ctx.strokeStyle = `rgba(56, 189, 248, ${ringAlpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(0, 0, ringRad, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 3. Project 3D Face Mesh Points
      const points = pointsRef.current;
      const projected: Array<{ sx: number; sy: number; sz: number; p: AvatarPoint; glow: boolean }> = [];

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        let xDisp = 0;
        let yDisp = 0;
        let zDisp = 0;

        if (isSpeaking) {
          if (pt.isJaw) {
            yDisp += jawDrop;
            zDisp += Math.sin(time * 12) * jawDrop * 0.4;
          }
          if (pt.isLip) {
            yDisp += jawDrop * 0.65;
            xDisp += (pt.origX / 60) * lipWave;
            zDisp += Math.sin(time * 14) * 3 * effectiveAudio;
          }
          if (pt.isBrow) {
            yDisp -= 2.5 * effectiveAudio;
          }
        } else if (state === 'thinking') {
          zDisp += Math.sin(time * 8 + pt.origX * 0.1) * 3;
        }

        const currentX = pt.origX + xDisp;
        const currentY = pt.origY + yDisp;
        const currentZ = pt.origZ + zDisp;

        // 3D Matrix Rotation (Y then X)
        const x1 = currentX * cosY + currentZ * sinY;
        const z1 = currentZ * cosY - currentX * sinY;

        const y2 = currentY * cosX - z1 * sinX;
        const z2 = z1 * cosX + currentY * sinX;

        // Perspective Projection
        const scale = focalLength / (focalLength + z2 + 130);
        const sx = centerX + x1 * scale;
        const sy = centerY + y2 * scale;

        projected.push({
          sx,
          sy,
          sz: z2,
          p: pt,
          glow: (pt.isLip && isSpeaking) || (state === 'thinking' && Math.sin(time * 4 + pt.origY * 0.1) > 0.8)
        });
      }

      // 4. Render Subtle Holographic Wireframe Ties
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i += 4) {
        const p1 = projected[i];
        if (p1.p.alpha < 0.25) continue;

        const nextIdx = i + 1;
        if (nextIdx < projected.length) {
          const p2 = projected[nextIdx];
          const distSq = (p1.sx - p2.sx) * (p1.sx - p2.sx) + (p1.sy - p2.sy) * (p1.sy - p2.sy);
          if (distSq < 100) {
            ctx.strokeStyle = isSpeaking
              ? `rgba(56, 189, 248, ${0.1 + effectiveAudio * 0.2})`
              : 'rgba(255, 255, 255, 0.06)';
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            ctx.stroke();
          }
        }
      }

      // 5. Render 3D Point Cloud Nodes with Authentic Pixel Colors
      for (let i = 0; i < projected.length; i++) {
        const item = projected[i];
        const pt = item.p;

        let nodeColor: string;
        let nodeSize = 1.4;

        if (item.glow) {
          nodeColor = '#38BDF8';
          nodeSize = 2.2;
        } else if (isSpeaking && (pt.isLip || pt.isJaw)) {
          // Subtle warm resonance on speaking lips/jaw
          nodeColor = `rgba(${Math.min(255, pt.r + 30)}, ${Math.min(255, pt.g + 60)}, 255, ${pt.alpha + effectiveAudio * 0.3})`;
          nodeSize = 1.6 + effectiveAudio * 0.7;
        } else {
          nodeColor = `rgba(${pt.r}, ${pt.g}, ${pt.b}, ${pt.alpha})`;
        }

        ctx.fillStyle = nodeColor;
        ctx.fillRect(item.sx, item.sy, nodeSize, nodeSize);
      }

      // 6. Floating Cybernetic Embers (Drifting particles from shoulders)
      for (let ember = 0; ember < 5; ember++) {
        const emberX = centerX + Math.sin(time * 1.5 + ember * 2.1) * 45;
        const emberY = centerY + 35 - ((time * 20 + ember * 35) % 80);
        const emberAlpha = Math.max(0, 0.5 - ((time * 20 + ember * 35) % 80) / 80);
        ctx.fillStyle = `rgba(56, 189, 248, ${emberAlpha})`;
        ctx.fillRect(emberX, emberY, 1.2, 1.2);
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
      onClick={onToggleMute}
      title={isMuted ? 'Voice Muted (Click avatar to unmute)' : 'Voice Enabled (Click avatar to mute)'}
      className={`relative bg-transparent select-none cursor-pointer group ${className}`}
    >
      {/* 100% Transparent Canvas with Parth's 3D Face Hologram */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block filter drop-shadow-[0_0_12px_rgba(56,189,248,0.25)] group-hover:drop-shadow-[0_0_18px_rgba(56,189,248,0.45)] transition-all"
      />

      {/* Floating Audio Equalizer & Status Pill Directly Below Avatar */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/80 border border-sky-400/30 backdrop-blur-md shadow-lg pointer-events-auto">
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            state === 'speaking'
              ? 'bg-sky-400 animate-ping'
              : state === 'thinking'
              ? 'bg-amber-400 animate-pulse'
              : 'bg-emerald-400'
          }`}
        />
        <span className="text-[9px] font-mono text-zinc-300 tracking-wider uppercase font-semibold">
          {state === 'speaking' ? 'Speaking' : state === 'thinking' ? 'Thinking' : 'Parth AI'}
        </span>

        {onToggleMute && (
          <div className="text-zinc-400 group-hover:text-white transition-colors ml-0.5">
            {isMuted ? (
              <VolumeX className="w-2.5 h-2.5 text-zinc-500" />
            ) : (
              <Volume2 className="w-2.5 h-2.5 text-sky-400" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
