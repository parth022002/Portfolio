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

      // 1. Natural idle breathing & smooth micro-tilt
      const bobY = Math.sin(time * 1.5) * 1.8;
      const idleTilt = Math.sin(time * 0.9) * 1.4;

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
        bobY: bobY + (isSpeaking ? Math.sin(time * 2.8) * 1.0 : 0),
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
      className={`mx-3 sm:mx-4 mb-2 select-none transition-all duration-300 pointer-events-auto ${className}`}
    >
      {/* Floating Glassmorphic Holographic Card Island */}
      <div className="relative rounded-2xl bg-gradient-to-r from-zinc-950/90 via-[#0c1220]/90 to-zinc-950/90 backdrop-blur-xl border border-white/10 p-3 sm:p-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(56,189,248,0.1)] hover:border-sky-500/30 transition-all duration-300">
        
        {/* Subtle Top Holographic Light Accent */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-sky-400/50 to-transparent pointer-events-none" />

        {/* Top Row: Avatar Orb + Identity + Telemetry Badges + Controls */}
        <div className="flex items-center justify-between gap-3">
          {/* Left: Avatar with Rotating Chromatic Ring & Motion */}
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="relative flex-shrink-0 group cursor-pointer"
              onClick={onToggleMute}
              title={isMuted ? 'Voice Muted (Click to enable)' : 'Voice Enabled (Click to mute)'}
            >
              {/* Outer Rotating Conic Gradient Aura Ring */}
              <div
                className={`absolute -inset-1 rounded-full blur-[3px] transition-all duration-500 pointer-events-none ${
                  isSpeaking
                    ? 'bg-gradient-to-tr from-sky-400 via-indigo-500 to-fuchsia-500 opacity-90 animate-spin-slow'
                    : 'bg-gradient-to-tr from-sky-500/30 via-indigo-500/20 to-transparent opacity-60 group-hover:opacity-100'
                }`}
              />

              {/* Speaking Concentric Wave Pulses */}
              {isSpeaking && (
                <>
                  <span className="absolute -inset-2 rounded-full bg-sky-400/25 animate-ping opacity-60 pointer-events-none duration-1000" />
                  <span className="absolute -inset-1 rounded-full bg-indigo-500/30 animate-pulse pointer-events-none" />
                </>
              )}

              {/* Avatar Core Frame */}
              <div
                style={{
                  transform: `perspective(600px) rotateX(${tilt.x + headMotion.pitchX}deg) rotateY(${tilt.y}deg) rotateZ(${headMotion.tiltZ}deg) translateY(${headMotion.bobY}px)`,
                  transition: 'transform 0.08s ease-out'
                }}
                className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white/25 shadow-lg bg-zinc-900"
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

                {/* Holographic Scanline & Subtle Tint */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.25)_51%)] bg-[size:100%_4px] pointer-events-none opacity-20" />
                <div
                  className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                    isSpeaking ? 'bg-sky-500/10' : 'bg-transparent group-hover:bg-sky-500/5'
                  }`}
                />
              </div>

              {/* Floating Levitation Ground Shadow */}
              <div
                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full blur-[2px] transition-all duration-300 pointer-events-none ${
                  isSpeaking ? 'bg-sky-400/50 w-10' : 'bg-sky-400/25'
                }`}
              />
            </div>

            {/* Identity & Status */}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-xs sm:text-sm tracking-tight truncate flex items-center gap-1.5">
                  <span>Parth Ahuja AI</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
                </span>

                {/* Live State Badge */}
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono border transition-all ${
                    isSpeaking
                      ? 'bg-sky-500/20 border-sky-400/40 text-sky-300 animate-pulse'
                      : state === 'thinking'
                      ? 'bg-amber-500/20 border-amber-400/40 text-amber-300'
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
                  <span className="font-semibold uppercase tracking-wider text-[8.5px]">
                    {isSpeaking ? 'Speaking' : state === 'thinking' ? 'Reasoning' : 'Online'}
                  </span>
                </span>
              </div>

              {/* Subtitle / Telemetry */}
              <div className="flex items-center gap-2 mt-0.5 text-[10.5px] text-zinc-400 font-mono">
                <span>Neural Male Voice</span>
                <span className="text-zinc-600">•</span>
                <span className="text-sky-400/90">29 Systems RAG</span>
              </div>
            </div>
          </div>

          {/* Right: Audio Action Controls */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Stop Audio Button (When speaking) */}
            {isSpeaking && onStopSpeech && (
              <button
                onClick={onStopSpeech}
                className="px-2.5 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-xs font-mono flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
                title="Stop speaking"
              >
                <Square className="w-3 h-3 fill-current" />
                <span className="hidden xs:inline">Stop</span>
              </button>
            )}

            {/* Mute / Unmute Button */}
            {onToggleMute && (
              <button
                onClick={onToggleMute}
                aria-label={isMuted ? 'Unmute voice' : 'Mute voice'}
                title={isMuted ? 'Voice Muted (Click to enable audio)' : 'Voice Enabled (Click to mute)'}
                className={`px-2.5 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                  isMuted
                    ? 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white'
                    : 'bg-sky-500/15 border-sky-400/40 text-sky-300 hover:bg-sky-500/25 shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                }`}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-[10px]">Muted</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                    <span className="hidden sm:inline text-[10px]">Voice</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Bottom Row: Dynamic Equalizer Wave Ribbon & Quick Intro Trigger */}
        <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between gap-3">
          {/* 14-Bar Fluid Audio Spectrum Wave Ribbon */}
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <div className="flex items-center gap-0.5 sm:gap-1 h-3.5 px-2 py-0.5 rounded-lg bg-black/40 border border-white/5 w-fit">
              {[0.3, 0.7, 0.9, 0.5, 1.0, 0.6, 0.8, 0.4, 0.9, 0.7, 0.5, 0.8, 0.6, 0.3].map((bar, i) => (
                <span
                  key={i}
                  className={`w-0.5 sm:w-1 rounded-full transition-all duration-100 ${
                    isSpeaking
                      ? 'bg-gradient-to-t from-sky-400 via-indigo-400 to-fuchsia-400'
                      : 'bg-zinc-700/60'
                  }`}
                  style={{
                    height: isSpeaking
                      ? `${Math.max(3, Math.min(13, (bar * effectiveAudio + Math.sin(i * 1.4)) * 13))}px`
                      : `${Math.max(2, Math.sin(i * 0.8) * 4 + 4)}px`
                  }}
                />
              ))}
            </div>
            <span className="text-[10px] text-zinc-400 font-mono truncate pl-0.5">
              {isSpeaking
                ? 'Synthesizing voice response...'
                : state === 'thinking'
                ? 'Analyzing 29 engineering systems...'
                : 'Ask in text or hear live audio'}
            </span>
          </div>

          {/* Quick Interactive Button: Play Executive Pitch */}
          {onPlayExecutivePitch && (
            <button
              onClick={onPlayExecutivePitch}
              className="px-2.5 py-1 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-400/30 hover:border-sky-400 text-sky-300 text-[10px] font-mono flex items-center gap-1 transition-all active:scale-95 flex-shrink-0 cursor-pointer shadow-sm"
              title="Play 30-second executive summary in Parth's voice"
            >
              <Sparkles className="w-3 h-3 text-sky-400" />
              <span>Play Intro Pitch</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
