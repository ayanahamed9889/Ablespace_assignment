'use client';

import { ThemeToggle } from './ThemeToggle';

export function Navbar({ userName }: { userName?: string }) {
  const initial = userName?.replace('Guest ', '#') || '';

  return (
    <header className="sticky top-0 z-10 border-b border-paper-line dark:border-ink-line
                        bg-paper/80 dark:bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg
                          bg-gradient-to-br from-brand-500 to-brand-700
                          text-sm font-bold text-white shadow-glow">
            A
          </div>
          <span className="font-display text-[17px] font-semibold tracking-tight">
            AbleSpace
          </span>
        </div>

        <div className="flex items-center gap-3">
          {userName && (
            <span className="hidden items-center gap-1.5 rounded-full border border-paper-line
                             dark:border-ink-line bg-white dark:bg-ink-soft
                             px-3 py-1 font-mono text-xs text-ink/60 dark:text-paper/60 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-status-done" />
              {userName}
            </span>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
