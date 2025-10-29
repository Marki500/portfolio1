import { useRef } from 'react';

import { useScrollReveal } from './useScrollReveal';

const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Astro',
  'Tailwind',
  'PHP / WordPress',
  'Node.js',
  'Express',
  'MySQL / MariaDB',
  'Prisma (básico)',
  'Docker',
  'Apache / Nginx',
  'Virtualmin / Plesk',
  'Cloudflare',
  'Figma / Photoshop (básico)',
  'Vercel / Netlify'
];

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef, '.about-chip', { stagger: 0.05 });

  return (
    <section id="about" ref={sectionRef} className="relative py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 lg:flex-row">
        <div className="flex-1 space-y-6">
          <h2 className="section-title">Sobre mí</h2>
          <p className="text-white/70">
            Proactivo, resolutivo y detallista; me gusta dejarlo todo perfecto y orientado a rendimiento y seguridad.
            Disfruto colaborando con equipos de producto, diseño y marketing para alinear tecnología con negocio.
          </p>
          <div className="grid gap-4 text-sm text-white/60 md:grid-cols-2">
            <div className="glass rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white">Foco actual</h3>
              <p className="mt-2 text-white/70">
                Arquitecturas headless, automatización con IA y despliegues reproducibles con Docker.
              </p>
            </div>
            <div className="glass rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white">Valores</h3>
              <p className="mt-2 text-white/70">Calidad, comunicación clara y documentación útil para el equipo.</p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="glass rounded-3xl border border-white/10 p-8">
            <h3 className="text-lg font-semibold text-white">Skillset</h3>
            <ul className="mt-6 flex flex-wrap gap-3">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="about-chip rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/70"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
