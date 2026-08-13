'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Root route just decides where to send the visitor: straight to the
// board if a guest session already exists, otherwise to /login.
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('ablespace_token');
    router.replace(token ? '/board' : '/login');
  }, [router]);

  return null;
}
