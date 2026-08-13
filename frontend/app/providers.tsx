'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

// next-themes writes the chosen theme to localStorage under "theme" and
// toggles the "dark" class on <html>, which Tailwind's darkMode:'class'
// picks up. This is what makes the theme choice persist across refreshes.
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
