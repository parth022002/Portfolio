import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, Sparkles, Cpu, Radio, ChevronDown, ChevronUp, Square } from 'lucide-react';
import { AIMeshState } from './ParthAIMesh';

interface ParthAIAvatarProps {
  state: AIMeshState;
  audioLevel?: number; // 0.0 to 1.0 (from audio wave)
  isMuted?: boolean;
  onToggleMute?: () => void;
  onStopSpeech?: () => void;
  className?: string;
}

export const ParthAIAvatar: React.FC<ParthAIAvatarProps> = ({
  state,
  audioLevel = 0,
  isMuted = false,
  onToggleMute,
  onStopSpeech,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Mouse tilt tracking for 3D perspective
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -12, y: x * 12 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  // Cybernetic Canvas Overlay: 3D rotating rings, facial landmark mesh, and acoustic soundwaves
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isCollapsed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.04;
      const width = (canvas.width = canvas.parentElement?.clientWidth || 120);
      const height = (canvas.height = canvas.parentElement?.clientHeight || 120);

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const isSpeaking = state === 'speaking';
      const effectiveAudio = isSpeaking ? Math.max(0.3, audioLevel) : 0;

      // 1. Acoustic Expanding Shockwaves when speaking
      if (isSpeaking) {
        ctx.save();
        ctx.translate(centerX, centerY);
        for (let ring = 1; ring <= 3; ring++) {
          const radius = 42 + ((time * 25 + ring * 18) % 35);
          const alpha = Math.max(0, 0.45 - (radius - 42) / 35) * effectiveAudio;
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(0, 0, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 2. Rotating Cybernetic HUD Target Rings
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(time * 0.25);
      ctx.strokeStyle = isSpeaking ? 'rgba(56, 189, 248, 0.4)' : 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.arc(0, 0, 48 + effectiveAudio * 4, 0, Math.PI * 2);
      ctx.stroke();

      ctx.rotate(-time * 0.5);
      ctx.strokeStyle = isSpeaking ? 'rgba(99, 102, 241, 0.45)' : 'rgba(255, 255, 255, 0.08)';
      ctx.setLineDash([2, 14]);
      ctx.beginPath();
      ctx.arc(0, 0, 54 + effectiveAudio * 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 3. 3D Facial Landmark Neural Constellation Nodes
      const landmarkPoints = [
        { x: -16, y: -8, z: 5 }, // Left eye
        { x: 16, y: -8, z: 5 },  // Right eye
        { x: 0, y: 4, z: 12 },   // Nose bridge tip
        { x: -12, y: 18, z: 4 }, // Left lip corner
        { x: 12, y: 18, z: 4 },  // Right lip corner
        { x: 0, y: 22, z: 6 },   // Lower lip
        { x: 0, y: 30, z: 8 },   // Chin anchor
        { x: -26, y: 12, z: -2 },// Left cheek
        { x: 26, y: 12, z: -2 }, // Right cheek
        { x: 0, y: -24, z: 6 }   // Forehead center
      ];

      // Speaking jaw articulation
      const jawDrop = isSpeaking ? Math.sin(time * 16) * effectiveAudio * 4 : 0;
      const headNod = isSpeaking ? Math.sin(time * 4) * 2 * effectiveAudio : 0;

      ctx.save();
      ctx.translate(centerX, centerY + headNod);

      // Render wireframe links between facial landmarks
      ctx.strokeStyle = isSpeaking ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 0.8;
      ctx.setLineDash([]);
      ctx.beginPath();

      // Eye to nose to chin constellation
      ctx.moveTo(landmarkPoints[0].x, landmarkPoints[0].y);
      ctx.lineTo(landmarkPoints[2].x, landmarkPoints[2].y);
      ctx.lineTo(landmarkPoints[1].x, landmarkPoints[1].y);

      ctx.moveTo(landmarkPoints[2].x, landmarkPoints[2].y);
      ctx.lineTo(landmarkPoints[3].x, landmarkPoints[3].y + jawDrop);
      ctx.lineTo(landmarkPoints[5].x, landmarkPoints[5].y + jawDrop);
      ctx.lineTo(landmarkPoints[4].x, landmarkPoints[4].y + jawDrop);
      ctx.lineTo(landmarkPoints[2].x, landmarkPoints[2].y);

      ctx.moveTo(landmarkPoints[5].x, landmarkPoints[5].y + jawDrop);
      ctx.lineTo(landmarkPoints[6].x, landmarkPoints[6].y + jawDrop * 1.2);

      ctx.stroke();

      // Render glowing constellation node dots
      landmarkPoints.forEach((pt, i) => {
        const yAdjust = (i === 3 || i === 4 || i === 5 || i === 6) ? jawDrop : 0;
        ctx.fillStyle = isSpeaking ? '#38BDF8' : 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y + yAdjust, isSpeaking ? 1.8 : 1.2, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      // 4. Floating cybernetic embers rising up
      for (let e = 0; e < 4; e++) {
        const ex = centerX + Math.sin(time * 2 + e * 2.2) * 35;
        const ey = centerY + 30 - ((time * 18 + e * 25) % 65);
        const eAlpha = Math.max(0, 0.4 - ((time * 18 + e * 25) % 65) / 65);
        ctx.fillStyle = `rgba(56, 189, 248, ${eAlpha})`;
        ctx.fillRect(ex, ey, 1.4, 1.4);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [state, audioLevel, isCollapsed]);

  // Conversational speaking dynamic scale and nod
  const isSpeaking = state === 'speaking';
  const effectiveAudio = isSpeaking ? Math.max(0.2, audioLevel) : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full transition-all duration-300 bg-gradient-to-r from-zinc-950 via-[#0B101D] to-zinc-950 border-b border-white/10 select-none ${
        isCollapsed ? 'py-2 px-3 sm:px-4' : 'py-3 sm:py-3.5 px-3 sm:px-4'
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left: The Clear Holographic 3D Avatar Portal */}
        <div className="flex items-center gap-3">
          <div
            style={{
              transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.15s ease-out'
            }}
            className="relative flex-shrink-0 group cursor-pointer"
            onClick={onToggleMute}
            title={isMuted ? 'Voice Muted (Click to enable)' : 'Voice Enabled (Click to mute)'}
          >
            {/* Outer Holographic Energy Glow */}
            <div
              className={`absolute -inset-1 rounded-full blur-md transition-all duration-300 ${
                isSpeaking
                  ? 'bg-gradient-to-r from-sky-500 via-teal-400 to-indigo-500 opacity-80 animate-pulse'
                  : 'bg-sky-500/20 opacity-40 group-hover:opacity-75'
              }`}
            />

            {/* Clear, High-Resolution Profile Core */}
            <div
              className={`relative rounded-full overflow-hidden border-2 transition-all duration-300 shadow-xl ${
                isCollapsed ? 'w-10 h-10' : 'w-16 h-16 sm:w-20 sm:h-20'
              } ${
                isSpeaking
                  ? 'border-sky-400 ring-4 ring-sky-500/30'
                  : 'border-white/20 group-hover:border-sky-400/60'
              }`}
            >
              <img
                src="/parth-profile.jpg"
                alt="Parth Ahuja AI Persona"
                className={`w-full h-full object-cover object-top transition-transform duration-300 ${
                  isSpeaking ? 'scale-105' : 'scale-100 group-hover:scale-105'
                }`}
              />

              {/* Holographic Scanline Overlay on face */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.35)_51%)] bg-[size:100%_4px] pointer-events-none opacity-40" />

              {/* Cyan Holographic Tint Flare */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                  isSpeaking ? 'bg-sky-500/15' : 'bg-transparent group-hover:bg-sky-500/10'
                }`}
              />
            </div>

            {/* Canvas Overlay for 3D Cybernetic Mesh & Acoustic Wave Rings */}
            {!isCollapsed && (
              <canvas
                ref={canvasRef}
                className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none z-10"
              />
            )}
          </div>

          {/* Persona Identity & Live Audio Telemetry */}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-xs sm:text-sm tracking-wide">
                Parth AI Digital Twin
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 font-mono">
                3D MESH
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1">
              {/* Live State Badge */}
              <span
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono border ${
                  isSpeaking
                    ? 'bg-sky-500/20 border-sky-400/40 text-sky-300 animate-pulse'
                    : state === 'thinking'
                    ? 'bg-amber-500/20 border-amber-400/40 text-amber-300 animate-pulse'
                    : 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSpeaking
                      ? 'bg-sky-400 animate-ping'
                      : state === 'thinking'
                      ? 'bg-amber-400'
                      : 'bg-emerald-400'
                  }`}
                />
                <span className="font-semibold uppercase tracking-wider text-[9px]">
                  {isSpeaking ? 'Speaking...' : state === 'thinking' ? 'Analyzing...' : 'Online & Ready'}
                </span>
              </span>

              {/* Live Audio Equalizer Frequency Bars */}
              <div className="flex items-center gap-0.5 h-3 px-1.5 py-0.5 rounded bg-zinc-900 border border-white/5">
                {[0.4, 0.8, 1.0, 0.6, 0.9, 0.5, 0.7, 0.3].map((bar, i) => (
                  <span
                    key={i}
                    className={`w-0.5 rounded-full transition-all duration-100 ${
                      isSpeaking ? 'bg-sky-400' : 'bg-zinc-600'
                    }`}
                    style={{
                      height: isSpeaking
                        ? `${Math.max(2, Math.min(12, (bar * effectiveAudio + Math.sin(i * 1.5)) * 12))}px`
                        : '2.5px'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Audio Mute, Stop & Collapse Controls */}
        <div className="flex items-center gap-1.5">
          {/* Stop Audio Button (When speaking) */}
          {isSpeaking && onStopSpeech && (
            <button
              onClick={onStopSpeech}
              className="px-2.5 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-[11px] font-mono flex items-center gap-1 transition-all"
              title="Stop speaking"
            >
              <Square className="w-3 h-3 fill-current" />
              <span className="hidden sm:inline">Stop</span>
            </button>
          )}

          {/* Mute / Unmute Button */}
          {onToggleMute && (
            <button
              onClick={onToggleMute}
              aria-label={isMuted ? 'Unmute voice' : 'Mute voice'}
              title={isMuted ? 'Voice Muted (Click to enable audio)' : 'Voice Enabled (Click to mute)'}
              className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-all ${
                isMuted
                  ? 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white'
                  : 'bg-sky-500/20 border-sky-400/40 text-sky-300 hover:bg-sky-500/30 shadow-[0_0_12px_rgba(56,189,248,0.25)]'
              }`}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[10px]">Muted</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  <span className="hidden sm:inline text-[10px]">Voice On</span>
                </>
              )}
            </button>
          )}

          {/* Collapse / Expand Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg border border-white/10 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title={isCollapsed ? 'Expand AI Presenter Stage' : 'Minimize AI Presenter Stage'}
            aria-label={isCollapsed ? 'Expand stage' : 'Minimize stage'}
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
