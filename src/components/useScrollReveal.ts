import { MutableRefObject, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useMotionContext } from './motion-context';

gsap.registerPlugin(ScrollTrigger);

type Options = {
  stagger?: number;
  y?: number;
  delay?: number;
};

export const useScrollReveal = (
  ref: MutableRefObject<HTMLElement | null>,
  selector: string,
  options: Options = {}
) => {
  const { reduceMotion } = useMotionContext();

  useEffect(() => {
    if (!ref.current || reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.set(selector, { opacity: 0, y: options.y ?? 30 });
      gsap.to(selector, {
        opacity: 1,
        y: 0,
        stagger: options.stagger ?? 0.1,
        delay: options.delay ?? 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%'
        }
      });
    }, ref);

    return () => ctx.revert();
  }, [options.delay, options.stagger, options.y, reduceMotion, ref, selector]);
};
