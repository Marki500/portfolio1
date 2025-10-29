import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import { SceneCanvas } from '../three/SceneCanvas';
import { useMotionContext } from './motion-context';

const techBadges = ['WordPress', 'React', 'Node', 'Docker', 'Tailwind', 'Cloudflare', 'IA'];

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { reduceMotion } = useMotionContext();

  useEffect(() => {
    if (!heroRef.current || reduceMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-title span', {
        yPercent: 110,
        opacity: 0,
        stagger: 0.08,
        duration: 0.9
      })
        .from(
          '.hero-subtitle',
          {
            y: 20,
            opacity: 0,
            duration: 0.8
          },
          '-=0.4'
        )
        .from(
          '.hero-cta',
          {
            y: 10,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6
          },
          '-=0.4'
        );
    }, heroRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  useEffect(() => {
    if (!heroRef.current || reduceMotion) return;

    const buttons = Array.from(heroRef.current.querySelectorAll<HTMLAnchorElement>('.hero-cta'));

    const handlePointerMove = (event: PointerEvent) => {
      const target = event.currentTarget as HTMLAnchorElement;
      const rect = target.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      gsap.to(target, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.4,
        ease: 'power3.out'
      });
    };

    const handlePointerLeave = (event: PointerEvent) => {
      const target = event.currentTarget as HTMLAnchorElement;
      gsap.to(target, { x: 0, y: 0, duration: 0.5, ease: 'power3.out' });
    };

    buttons.forEach((button) => {
      button.addEventListener('pointermove', handlePointerMove);
      button.addEventListener('pointerleave', handlePointerLeave);
    });

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener('pointermove', handlePointerMove);
        button.removeEventListener('pointerleave', handlePointerLeave);
      });
    };
  }, [reduceMotion]);

  return (
    <section id="home" ref={heroRef} className="relative flex min-h-screen items-center pt-32">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-12 md:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-8">
          <div className="space-y-6">
            <h1 className="hero-title text-4xl font-extrabold leading-tight text-white md:text-6xl">
              <span className="block">Transforming ideas</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-cyanSoft">
                into digital experiences
              </span>
            </h1>
            <p className="hero-subtitle max-w-xl text-lg text-white/70 md:text-xl">
              Full-Stack Developer — WordPress, React, Node.js, Tailwind, Docker. Gestión de servidores (Apache/Nginx,
              Virtualmin/Plesk), dominios y Cloudflare. Integración de IA.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#portfolio"
                className="hero-cta inline-flex items-center rounded-full border border-primary/60 bg-primary/20 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-glow transition hover:bg-primary/40 focus-ring"
              >
                Ver trabajos
              </a>
              <a
                href="#contact"
                className="hero-cta inline-flex items-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white/80 transition hover:text-white focus-ring"
              >
                Contactar
              </a>
            </div>
          </div>
          <div className="glass flex flex-wrap gap-3 rounded-2xl border border-white/10 p-5">
            {techBadges.map((badge) => (
              <span
                key={badge}
                className="glass inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/80 shadow-lg shadow-primary/20"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
        <div className="relative flex flex-1 items-center justify-center">
          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="relative h-52 w-52 overflow-hidden rounded-full border border-white/20 bg-white/10 p-1 shadow-glow md:h-64 md:w-64">
              {/* TODO: Sustituir por retrato real en public/assets/marc.jpg */}
              <img
                src="/assets/marc-placeholder.svg"
                data-final-src="/assets/marc.jpg"
                alt="Marc Iglesias Simón"
                className="h-full w-full rounded-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 rounded-full border border-white/20" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white">Marc Iglesias Simón</h2>
              <p className="text-sm uppercase tracking-[0.4em] text-white/50">Full-Stack Developer</p>
            </div>
          </div>
          <div className="scene-canvas-wrapper absolute inset-0 -z-10">
            <SceneCanvas />
          </div>
        </div>
      </div>
    </section>
  );
};
