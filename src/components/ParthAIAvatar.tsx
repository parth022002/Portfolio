import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, Sparkles, Square } from 'lucide-react';
import { AIMeshState } from './ParthAIMesh';

interface ParthAIAvatarProps {
  state: AIMeshState;
  audioLevel?: number; // 0.0 to 1.0 (from audio wave)
  isMuted?: boolean;
  onToggleMute?: () => void;
  onStopSpeech?: () => void;
  onPlayExecutivePitch?: () => void;
  className?: string;
}

export const ParthAIAvatar: React.FC<ParthAIAvatarProps> = ({
  state,
  audioLevel = 0,
  isMuted = false,
  onToggleMute,
  onStopSpeech,
  onPlayExecutivePitch,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Lifelike procedural head motion & speech gestures
  const [headMotion, setHeadMotion] = useState({
    bobY: 0,
    tiltZ: 0,
    pitchX: 0,
    jawOpen: 0,
    isBlinking: false
  });

  // Mouse tilt tracking for subtle 3D perspective
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  // Procedural Head Motion, Conversational Nodding, Eye Blinks, and Natural Lip Cadence
  useEffect(() => {
    let animId: number;
    let time = 0;
    let nextBlinkTime = 3.5;

    const updateMotion = () => {
      time += 0.04;

      const isSpeaking = state === 'speaking';
      const effectiveAudio = isSpeaking ? Math.max(0.3, audioLevel) : 0;

      // 1. Zero-gravity levitation float & micro-tilt
      const bobY = Math.sin(time * 1.6) * 3;
      const idleTilt = Math.sin(time * 0.9) * 1.5;

      // Conversational head nod on speech emphasis beats
      const speakNod = isSpeaking ? Math.sin(time * 4.0) * 2.5 * effectiveAudio : 0;
      const speakRoll = isSpeaking ? Math.cos(time * 2.5) * 1.6 * effectiveAudio : 0;

      // 2. Realistic lip and jaw cadence
      const syllable = Math.max(0, Math.sin(time * 15) * Math.cos(time * 7.5));
      const jawOpen = isSpeaking ? syllable * effectiveAudio * 5 : 0;

      // 3. Realistic eye blink timer (blinks every ~3.5 to 6 seconds for 130ms)
      let isBlinking = false;
      if (time > nextBlinkTime) {
        if (time < nextBlinkTime + 0.14) {
          isBlinking = true;
        } else {
          nextBlinkTime = time + 3.2 + Math.random() * 2.5;
        }
      }

      setHeadMotion({
        bobY: bobY + (isSpeaking ? Math.sin(time * 2.8) * 1.2 : 0),
        tiltZ: idleTilt + speakRoll,
        pitchX: speakNod,
        jawOpen,
        isBlinking
      });

      animId = requestAnimationFrame(updateMotion);
    };

    animId = requestAnimationFrame(updateMotion);
    return () => cancelAnimationFrame(animId);
  }, [state, audioLevel]);

  const isSpeaking = state === 'speaking';
  const effectiveAudio = isSpeaking ? Math.max(0.2, audioLevel) : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`w-full bg-transparent border-0 px-3.5 py-1.5 select-none pointer-events-none transition-all ${className}`}
    >
      {/* Floating Spatial Holographic Row: Avatar Orb + Floating Glass Capsule */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 max-w-full">
        
        {/* 1. Floating 3D Holographic Avatar Orb */}
        <div
          className="relative flex-shrink-0 group cursor-pointer pointer-events-auto"
          onClick={onToggleMute}
          title={isMuted ? 'Voice Muted (Click to enable)' : 'Voice Enabled (Click to mute)'}
        >
          {/* Ambient Ground Levitation Pool Glow */}
          <div
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-full blur-[3px] pointer-events-none transition-all duration-300"
            style={{
              width: `${24 + (1 - headMotion.bobY / 3) * 8}px`,
              height: '4px',
              background: isSpeaking ? 'rgba(56, 189, 248, 0.45)' : 'rgba(56, 189, 248, 0.2)'
            }}
          />

          {/* Continuous Rotating Chromatic Aura Ring (Apple Intelligence Style) */}
          <div
            className="absolute -inset-1 rounded-full pointer-events-none transition-all duration-500"
            style={{
              background: isSpeaking
                ? 'conic-gradient(from 0deg, #38bdf8, #818cf8, #c084fc, #f472b6, #38bdf8)'
                : 'conic-gradient(from 0deg, rgba(56,189,248,0.45), rgba(129,140,248,0.25), rgba(192,132,252,0.45), rgba(56,189,248,0.45))',
              animation: 'spin 5s linear infinite',
              filter: 'blur(3px)',
              opacity: isSpeaking ? 0.95 : 0.55
            }}
          />

          {/* Speaking Concentric Radar Shockwaves */}
          {isSpeaking && (
            <>
              <span className="absolute -inset-2.5 rounded-full border border-sky-400/35 animate-ping opacity-60 pointer-events-none duration-1000" />
              <span className="absolute -inset-1 rounded-full bg-sky-400/25 blur-sm animate-pulse pointer-events-none" />
            </>
          )}

          {/* Avatar Glass Core */}
          <div
            style={{
              transform: `perspective(600px) rotateX(${tilt.x + headMotion.pitchX}deg) rotateY(${tilt.y}deg) rotateZ(${headMotion.tiltZ}deg) translateY(${headMotion.bobY}px)`,
              transition: 'transform 0.08s ease-out'
            }}
            className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full overflow-hidden border-2 border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.6)] bg-zinc-950"
          >
            <img
              src="/parth-profile.jpg"
              alt="Parth Ahuja"
              className={`w-full h-full object-cover object-top transition-transform duration-300 ${
                isSpeaking ? 'scale-105' : 'scale-100 group-hover:scale-105'
              }`}
            />

            {/* Natural Eyelid Blink */}
            <div
              className="absolute left-0 right-0 top-[38%] h-[8%] bg-[#1E1410] rounded-full transition-transform duration-75 pointer-events-none"
              style={{
                transform: headMotion.isBlinking ? 'scaleY(1.0)' : 'scaleY(0)',
                transformOrigin: 'top',
                opacity: headMotion.isBlinking ? 0.95 : 0
              }}
            />

            {/* Natural Lip Cadence */}
            <div
              className="absolute left-[44%] right-[44%] top-[64%] h-[6%] pointer-events-none rounded-full transition-all duration-75"
              style={{
                transform: `scaleY(${1 + headMotion.jawOpen * 0.28}) scaleX(${1 + headMotion.jawOpen * 0.12}) translateY(${headMotion.jawOpen * 0.3}px)`,
                background: isSpeaking && headMotion.jawOpen > 0.8
                  ? 'radial-gradient(ellipse at center, rgba(35, 15, 12, 0.85) 0%, rgba(120, 50, 45, 0.6) 60%, transparent 100%)'
                  : 'transparent'
              }}
            />

            {/* Subtle Holographic Scanline & Light Flare */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.25)_51%)] bg-[size:100%_4px] pointer-events-none opacity-20" />
            <div
              className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                isSpeaking ? 'bg-sky-500/10' : 'bg-transparent group-hover:bg-sky-500/5'
              }`}
            />
          </div>
        </div>

        {/* 2. Floating Frosted Glass Capsule (Zero-card, ultra-sleek pill) */}
        <div
          style={{
            transform: `translateY(${headMotion.bobY * 0.4}px)`,
            transition: 'transform 0.08s ease-out'
          }}
          className="flex-1 min-w-0 flex items-center justify-between gap-2 rounded-full bg-white/[0.04] hover:bg-white/[0.07] backdrop-blur-2xl border border-white/10 px-3.5 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all pointer-events-auto"
        >
          {/* Identity & Status Ribbon */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 transition-all ${
                  isSpeaking
                    ? 'bg-sky-400 shadow-[0_0_8px_#38bdf8] animate-ping'
                    : state === 'thinking'
                    ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24] animate-pulse'
                    : 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                }`}
              />
              <span className="font-semibold text-white text-xs tracking-tight truncate">
                Parth AI
              </span>
            </div>

            {/* Siri / Gemini Style Fluid Wave Ribbon */}
            <div className="flex items-center gap-0.5 sm:gap-1 h-3.5 px-2 py-0.5 rounded-full bg-black/35 border border-white/5">
              {[0.4, 0.8, 1.0, 0.6, 0.9, 0.5, 0.8, 0.3].map((bar, i) => (
                <span
                  key={i}
                  className={`w-0.5 rounded-full transition-all duration-100 ${
                    isSpeaking
                      ? 'bg-gradient-to-t from-sky-400 via-indigo-400 to-fuchsia-400'
                      : 'bg-zinc-600'
                  }`}
                  style={{
                    height: isSpeaking
                      ? `${Math.max(3, Math.min(13, (bar * effectiveAudio + Math.sin(i * 1.5)) * 13))}px`
                      : `${Math.max(2, Math.sin(i * 0.9) * 3 + 4)}px`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Action Pills */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Quick 1-Click Intro Pitch Button */}
            {onPlayExecutivePitch && !isSpeaking && (
              <button
                onClick={onPlayExecutivePitch}
                className="px-2.5 py-0.5 rounded-full bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/30 text-sky-300 text-[10.5px] font-mono flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-sm hover:shadow-[0_0_10px_rgba(56,189,248,0.3)]"
                title="Play 30-second executive voice pitch"
              >
                <Sparkles className="w-2.5 h-2.5 text-sky-400" />
                <span>Pitch</span>
              </button>
            )}

            {/* Stop Speaking Button */}
            {isSpeaking && onStopSpeech && (
              <button
                onClick={onStopSpeech}
                className="px-2.5 py-0.5 rounded-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-[10.5px] font-mono flex items-center gap-1 transition-all shadow-sm active:scale-95 cursor-pointer"
                title="Stop speaking"
              >
                <Square className="w-2.5 h-2.5 fill-current" />
                <span>Stop</span>
              </button>
            )}

            {/* Voice Mute / Unmute Button */}
            {onToggleMute && (
              <button
                onClick={onToggleMute}
                aria-label={isMuted ? 'Unmute voice' : 'Mute voice'}
                title={isMuted ? 'Voice Muted (Click to enable)' : 'Voice Enabled (Click to mute)'}
                className={`p-1 sm:px-2 sm:py-0.5 rounded-full border text-xs font-mono flex items-center gap-1 transition-all cursor-pointer ${
                  isMuted
                    ? 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                    : 'bg-sky-500/20 border-sky-400/40 text-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.25)]'
                }`}
              >
                {isMuted ? (
                  <VolumeX className="w-3 h-3" />
                ) : (
                  <Volume2 className="w-3 h-3 text-sky-400 animate-pulse" />
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
