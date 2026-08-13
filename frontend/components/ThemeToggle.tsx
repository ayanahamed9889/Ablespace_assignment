'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

// Renders a placeholder until mounted to avoid a server/client mismatch,
// since the real theme is only known once localStorage is read in-browser.
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-9 w-9" />;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="group relative flex h-9 w-9 items-center justify-center rounded-full
                 border border-paper-line dark:border-ink-line
                 bg-white dark:bg-ink-soft
                 hover:border-brand-500 transition-colors"
    >
      <Sun
        size={16}
        strokeWidth={2.25}
        className={`absolute transition-all duration-300 text-priority-medium
          ${isDark ? 'scale-0 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`}
      />
      <Moon
        size={16}
        strokeWidth={2.25}
        className={`absolute transition-all duration-300 text-brand-400
          ${isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-90 opacity-0'}`}
      />
    </button>
  );
}
