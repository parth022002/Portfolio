import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, Sparkles, Square } from 'lucide-react';
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
      className={`relative w-full bg-transparent border-0 px-4 py-2 select-none pointer-events-auto transition-all ${className}`}
    >
      <div className="flex items-center justify-between gap-3 max-w-full">
        {/* Left: Avatar with Elegant Glowing Aura */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="relative flex-shrink-0 group cursor-pointer"
            onClick={onToggleMute}
            title={isMuted ? 'Voice Muted (Click to enable)' : 'Voice Enabled (Click to mute)'}
          >
            {/* Subtle Ground Levitation Glow */}
            <div
              className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-7 h-1 rounded-full blur-[2px] transition-all duration-300 pointer-events-none ${
                isSpeaking ? 'bg-sky-400/40 w-9' : 'bg-sky-400/20'
              }`}
            />

            {/* Speaking Concentric Wave Pulses */}
            {isSpeaking && (
              <>
                <span className="absolute -inset-1.5 rounded-full bg-sky-400/20 animate-ping opacity-75 pointer-events-none duration-1000" />
                <span className="absolute -inset-1 rounded-full bg-indigo-500/25 animate-pulse pointer-events-none" />
              </>
            )}

            {/* Organic Glowing Aura Ring */}
            <div
              className={`absolute -inset-0.5 rounded-full transition-all duration-300 pointer-events-none ${
                isSpeaking
                  ? 'bg-gradient-to-tr from-sky-400 via-cyan-300 to-indigo-500 p-[2px] opacity-100 shadow-[0_0_12px_rgba(56,189,248,0.4)]'
                  : 'bg-white/10 group-hover:bg-sky-400/30'
              }`}
            >
              <div className="w-full h-full rounded-full bg-[#090D16]" />
            </div>

            {/* Clear, High-Resolution Profile Core */}
            <div
              style={{
                transform: `perspective(500px) rotateX(${tilt.x + headMotion.pitchX}deg) rotateY(${tilt.y}deg) rotateZ(${headMotion.tiltZ}deg) translateY(${headMotion.bobY}px)`,
                transition: 'transform 0.08s ease-out'
              }}
              className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-white/20 shadow-md"
            >
              <img
                src="/parth-profile.jpg"
                alt="Parth Ahuja"
                className={`w-full h-full object-cover object-top transition-transform duration-300 ${
                  isSpeaking ? 'scale-105' : 'scale-100 group-hover:scale-105'
                }`}
              />

              {/* Natural Eye Blinking Eyelid Overlay */}
              <div
                className="absolute left-0 right-0 top-[38%] h-[8%] bg-[#1E1410] rounded-full transition-transform duration-75 pointer-events-none"
                style={{
                  transform: headMotion.isBlinking ? 'scaleY(1.0)' : 'scaleY(0)',
                  transformOrigin: 'top',
                  opacity: headMotion.isBlinking ? 0.95 : 0
                }}
              />

              {/* Natural Subtle Lip Cadence (Visible When Speaking) */}
              <div
                className="absolute left-[44%] right-[44%] top-[64%] h-[6%] pointer-events-none rounded-full transition-all duration-75"
                style={{
                  transform: `scaleY(${1 + headMotion.jawOpen * 0.25}) scaleX(${1 + headMotion.jawOpen * 0.1}) translateY(${headMotion.jawOpen * 0.3}px)`,
                  background: isSpeaking && headMotion.jawOpen > 0.8
                    ? 'radial-gradient(ellipse at center, rgba(35, 15, 12, 0.85) 0%, rgba(120, 50, 45, 0.6) 60%, transparent 100%)'
                    : 'transparent'
                }}
              />

              {/* Cyan Holographic Tint Flare */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                  isSpeaking ? 'bg-sky-500/10' : 'bg-transparent group-hover:bg-sky-500/5'
                }`}
              />
            </div>
          </div>

          {/* Persona Identity & Live Audio Telemetry */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white text-xs sm:text-sm tracking-tight truncate">
                Parth AI
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-white/5 border border-white/10 text-zinc-300">
                <Sparkles className="w-2.5 h-2.5 text-sky-400" />
                <span>Copilot</span>
              </span>
            </div>

            {/* Dynamic Status / Audio Wave Visualizer */}
            <div className="flex items-center gap-2 mt-0.5">
              {isSpeaking ? (
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5 h-3">
                    {[0.4, 0.9, 1.0, 0.7, 0.5].map((bar, i) => (
                      <span
                        key={i}
                        className="w-0.5 rounded-full bg-gradient-to-t from-sky-400 to-cyan-300 transition-all duration-100"
                        style={{
                          height: `${Math.max(3, Math.min(12, (bar * effectiveAudio + Math.sin(i * 1.6)) * 12))}px`
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-sky-400 font-medium">
                    Speaking answer...
                  </span>
                </div>
              ) : state === 'thinking' ? (
                <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  <span>Analyzing portfolio...</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Ready to converse</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Audio Action Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Stop Audio Button (When speaking) */}
          {isSpeaking && onStopSpeech && (
            <button
              onClick={onStopSpeech}
              className="px-2.5 py-1 rounded-full bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
              title="Stop speaking"
            >
              <Square className="w-3 h-3 fill-current" />
              <span>Stop</span>
            </button>
          )}

          {/* Mute / Unmute Button */}
          {onToggleMute && (
            <button
              onClick={onToggleMute}
              aria-label={isMuted ? 'Unmute voice' : 'Mute voice'}
              title={isMuted ? 'Voice Muted (Click to enable audio)' : 'Voice Enabled (Click to mute)'}
              className={`px-2.5 py-1 rounded-full border text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                isMuted
                  ? 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
                  : 'bg-sky-500/15 border-sky-400/30 text-sky-300 hover:bg-sky-500/25 shadow-[0_0_10px_rgba(56,189,248,0.2)]'
              }`}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Muted</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>Voice</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
