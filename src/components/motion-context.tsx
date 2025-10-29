import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

type MotionContextValue = {
  reduceMotion: boolean;
  toggleMotion: () => void;
};

const MotionContext = createContext<MotionContextValue | undefined>(undefined);

export const MotionProvider = ({ children }: { children: ReactNode }) => {
  const prefersReduced = useMemo(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const [reduceMotion, setReduceMotion] = useState(prefersReduced);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handler = (event: MediaQueryListEvent) => {
      setReduceMotion(event.matches);
    };

    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.reduceMotion = reduceMotion ? 'true' : 'false';
  }, [reduceMotion]);

  const value = useMemo<MotionContextValue>(
    () => ({
      reduceMotion,
      toggleMotion: () => setReduceMotion((prev) => !prev)
    }),
    [reduceMotion]
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
};

export const useMotionContext = () => {
  const context = useContext(MotionContext);

  if (!context) {
    throw new Error('useMotionContext must be used within a MotionProvider');
  }

  return context;
};
