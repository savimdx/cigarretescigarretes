import React, { useState, useEffect } from 'react';
import { Clock, Flame } from 'lucide-react';

interface HeaderBannerProps {
  timeLeft?: number;
}

const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Ignored
    }
  }
};

export default function HeaderBanner({ timeLeft }: HeaderBannerProps) {
  const [secondsLeft, setSecondsLeft] = useState<number>(15 * 60);

  useEffect(() => {
    if (timeLeft !== undefined) return;

    const savedTime = safeLocalStorage.getItem('projeto_livre_banner_timer_15');
    let initialTime = 15 * 60;

    if (savedTime) {
      const parsed = parseInt(savedTime, 10);
      if (parsed > 0 && parsed <= 15 * 60) {
        initialTime = parsed;
      }
    }

    setSecondsLeft(initialTime);

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          safeLocalStorage.setItem('projeto_livre_banner_timer_15', (15 * 60).toString());
          return 15 * 60;
        }
        const updated = prev - 1;
        safeLocalStorage.setItem('projeto_livre_banner_timer_15', updated.toString());
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const activeSeconds = timeLeft !== undefined ? timeLeft : secondsLeft;

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className="bg-[#dc2626] text-white py-2.5 px-4 fixed top-0 inset-x-0 w-full z-50 shadow-md flex justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm font-black tracking-wide border-b border-[#b91c1c] select-none">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 fill-amber-300 shrink-0 animate-pulse" />
          <span className="font-black tracking-wider text-white uppercase text-xs sm:text-sm md:text-base drop-shadow-sm">
            ABANDONE ESTE VÍCIO PARA SEMPRE!!!
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-black/25 px-2.5 sm:px-3 py-1 rounded-lg border border-white/20 font-mono text-white text-xs sm:text-sm font-extrabold shadow-inner shrink-0">
          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
          <span className="tracking-widest">{formatTime(activeSeconds)}</span>
        </div>
      </div>
      {/* Spacer to prevent content from jumping under fixed banner */}
      <div className="h-11 sm:h-12 w-full" aria-hidden="true" />
    </>
  );
}
