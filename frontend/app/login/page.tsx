'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGuestLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const { token, name } = await api.guestLogin();
      localStorage.setItem('ablespace_token', token);
      localStorage.setItem('ablespace_name', name);
      router.push('/board');
    } catch {
      setError('Could not start a guest session. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      {/* Ambient gradient mesh - the one deliberate flourish on an
          otherwise quiet, functional app. Muted so it doesn't compete
          with the board itself once you're inside. */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-priority-high/10 blur-3xl" />
      </div>

      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-sm animate-fade-up rounded-card border border-paper-line
                      bg-white/80 p-8 text-center shadow-2xl backdrop-blur-md
                      dark:border-ink-line dark:bg-ink-soft/80">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl
                        bg-gradient-to-br from-brand-500 to-brand-700 font-display text-xl
                        font-bold text-white shadow-glow">
          A
        </div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">AbleSpace Tasks</h1>
        <p className="mt-1.5 text-sm text-ink/50 dark:text-paper/50">
          A focused board for the work that matters today.
        </p>

        <button
          onClick={handleGuestLogin}
          disabled={loading}
          className="group mt-7 flex w-full items-center justify-center gap-2 rounded-lg
                     bg-gradient-to-br from-brand-500 to-brand-600 py-2.5 text-sm font-medium
                     text-white shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {loading ? 'Starting session…' : 'Continue as guest'}
          {!loading && (
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          )}
        </button>

        {error && <p className="mt-3 text-xs text-priority-high">{error}</p>}

        <p className="mt-5 font-mono text-[11px] text-ink/30 dark:text-paper/30">
          no sign-up · a private board is created just for you
        </p>
      </div>
    </div>
  );
}
