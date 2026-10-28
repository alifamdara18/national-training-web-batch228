import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userManuallyPausedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set volume awal yang nyaman (background ambiance)
    audio.volume = 0.35;

    const interactionEvents = ["click", "touchstart", "scroll", "keydown"];

    const removeInteractionListeners = () => {
      interactionEvents.forEach((evt) => {
        window.removeEventListener(evt, handleFirstInteraction);
      });
    };

    const handleFirstInteraction = async () => {
      if (userManuallyPausedRef.current || !audio) return;
      try {
        if (audio.paused) {
          await audio.play();
          setIsPlaying(true);
        }
        removeInteractionListeners();
      } catch {
        // Abaikan jika browser masih menolak sebelum interaksi klik langsung
      }
    };

    // Percobaan autoplay saat mount
    const attemptAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // Autoplay terblokir oleh browser policy:
        setIsPlaying(false);
        // Daftarkan listener interaksi pertama pengguna untuk memutar otomatis
        interactionEvents.forEach((evt) => {
          window.addEventListener(evt, handleFirstInteraction, {
            passive: true,
          });
        });
      }
    };

    attemptAutoplay();

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      removeInteractionListeners();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      userManuallyPausedRef.current = true;
      setIsPlaying(false);
    } else {
      userManuallyPausedRef.current = false;
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Gagal memutar audio:", err);
      }
    }
  };

  return (
    <>
      {/* Elemen Audio Native */}
      <audio
        ref={audioRef}
        loop
        preload="metadata"
        playsInline
      >
        <source src="/Pancaran%20Keyakinan.mp3.mpeg" type="audio/mpeg" />
        <source src="/Pancaran Keyakinan.mp3.mpeg" type="audio/mpeg" />
      </audio>

      {/* Floating Audio Control Button (Gaya Navy & Gold) */}
      <button
        type="button"
        onClick={toggleAudio}
        aria-label={isPlaying ? "Jeda Musik Latar" : "Putar Musik Latar"}
        title={isPlaying ? "Klik untuk Menjeda Musik Latar" : "Klik untuk Memutar Musik Latar"}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl backdrop-blur-md cursor-pointer border select-none group ${
          isPlaying
            ? "bg-navy-900/90 text-gold-300 border-gold-400/60 shadow-[0_0_25px_rgba(212,175,55,0.45)] ring-1 ring-gold-400/50"
            : "bg-navy-950/90 text-slate-200 border-navy-700 hover:border-gold-500/50 hover:text-gold-300 shadow-[0_4px_25px_rgba(0,0,0,0.6)]"
        }`}
      >
        {isPlaying ? (
          <>
            {/* Status Playing: Icon 🔊 dengan efek pendaran emas (gold glow pulse) & Equalizer */}
            <div className="relative flex items-center justify-center">
              <span className="absolute -inset-1.5 rounded-full bg-gold-400/25 animate-ping opacity-75" />
              <Volume2 className="w-5 h-5 text-gold-400 animate-pulse relative z-10 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
            </div>

            {/* Animasi Gelombang Equalizer Halus */}
            <div className="flex items-end gap-0.5 h-3.5 px-0.5">
              <span className="w-0.5 bg-gold-400 rounded-full animate-[bounce_0.8s_ease-in-out_infinite] h-3" />
              <span className="w-0.5 bg-gold-300 rounded-full animate-[bounce_0.6s_ease-in-out_0.2s_infinite] h-2" />
              <span className="w-0.5 bg-yellow-400 rounded-full animate-[bounce_0.7s_ease-in-out_0.4s_infinite] h-3.5" />
            </div>

            <span className="text-xs sm:text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-yellow-300 to-gold-400 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
              🎵 Jeda Musik
            </span>
          </>
        ) : (
          <>
            {/* Status Muted / Paused: Icon 🔇 dengan indikator animasi halus */}
            <div className="relative flex items-center justify-center">
              <VolumeX className="w-5 h-5 text-slate-400 group-hover:text-gold-400 transition-colors" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold-500" />
              </span>
            </div>

            <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-gold-300 transition-colors">
              🎵 Putar Musik
            </span>
          </>
        )}
      </button>
    </>
  );
}
