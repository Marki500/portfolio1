import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MotionToggle } from './MotionToggle';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Servicios', href: '#services' },
  { label: 'Sobre mí', href: '#about' },
  { label: 'Testimonios', href: '#testimonials' },
  { label: 'Contacto', href: '#contact' }
];

export const Header = () => {
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.nav-item', {
        y: -20,
        opacity: 0,
        stagger: 0.08,
        delay: 0.4,
        duration: 0.6,
        ease: 'power3.out'
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl transition-all duration-500"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 glass rounded-full mt-4">
        <a
          href="#home"
          className="text-lg font-semibold tracking-[0.3em] uppercase text-white/90 hover:text-white focus-ring"
        >
          Marc Iglesias
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-white/70 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              className="nav-item group relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-widest transition hover:text-white focus-ring"
              href={item.href}
            >
              <span className="absolute inset-0 -z-10 rounded-full bg-white/10 opacity-0 transition group-hover:opacity-100" />
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <MotionToggle />
        </div>
      </div>
    </header>
  );
};
