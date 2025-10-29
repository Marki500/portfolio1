import { useRef } from 'react';

import { useScrollReveal } from './useScrollReveal';

type Project = {
  title: string;
  description: string;
  tags: string[];
  link: string;
  imagePlaceholder: string;
  imageFinal: string;
};

const projects: Project[] = [
  {
    title: 'Nebula Commerce',
    description: 'Ecommerce escalable con headless WordPress + Next.js, caching avanzado y analítica personalizada.',
    tags: ['WordPress', 'Next.js', 'WooCommerce'],
    link: '#',
    imagePlaceholder: '/assets/projects/placeholder.svg',
    imageFinal: '/assets/projects/nebula.jpg',
    // TODO: Sustituir placeholder por captura real en /public/assets/projects/nebula.jpg
  },
  {
    title: 'Orbital Learning',
    description: 'Plataforma de cursos con React y Strapi, integración de pagos y dashboards gamificados.',
    tags: ['React', 'Strapi', 'Tailwind'],
    link: '#',
    imagePlaceholder: '/assets/projects/placeholder.svg',
    imageFinal: '/assets/projects/orbital.jpg',
    // TODO: Sustituir placeholder por captura real en /public/assets/projects/orbital.jpg
  },
  {
    title: 'Aurora Labs',
    description: 'Sitio corporativo animado con Astro + Tailwind, despliegues automatizados y Lighthouse 98/100.',
    tags: ['Astro', 'Tailwind', 'Cloudflare'],
    link: '#',
    imagePlaceholder: '/assets/projects/placeholder.svg',
    imageFinal: '/assets/projects/aurora.jpg',
    // TODO: Sustituir placeholder por captura real en /public/assets/projects/aurora.jpg
  },
  {
    title: 'Atlas SaaS',
    description: 'Dashboard SaaS multi-tenant con React Query, gráficas en tiempo real y RBAC seguro.',
    tags: ['React', 'Node', 'PostgreSQL'],
    link: '#',
    imagePlaceholder: '/assets/projects/placeholder.svg',
    imageFinal: '/assets/projects/atlas.jpg',
    // TODO: Sustituir placeholder por captura real en /public/assets/projects/atlas.jpg
  },
  {
    title: 'Velocity WP',
    description: 'Optimización integral de WordPress con Edge Caching, Cloudflare Workers y Core Web Vitals 95+.',
    tags: ['WordPress', 'Cloudflare', 'DevOps'],
    link: '#',
    imagePlaceholder: '/assets/projects/placeholder.svg',
    imageFinal: '/assets/projects/velocity.jpg',
    // TODO: Sustituir placeholder por captura real en /public/assets/projects/velocity.jpg
  },
  {
    title: 'Quantum Docs',
    description: 'Intranet documental con autenticación SSO, firma digital y despliegue Docker orquestado.',
    tags: ['Node', 'Docker', 'MariaDB'],
    link: '#',
    imagePlaceholder: '/assets/projects/placeholder.svg',
    imageFinal: '/assets/projects/quantum.jpg',
    // TODO: Sustituir placeholder por captura real en /public/assets/projects/quantum.jpg
  }
];

export const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef, '.portfolio-card', { stagger: 0.15 });

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <div className="max-w-2xl">
          <h2 className="section-title">Portfolio destacado</h2>
          <p className="mt-4 text-white/70">
            Proyectos seleccionados donde combiné storytelling, performance y soluciones a medida para sectores retail,
            educación y SaaS.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="portfolio-card glass group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* TODO: Sustituir por captura real en {project.imageFinal} */}
                <img
                  src={project.imagePlaceholder}
                  data-final-src={project.imageFinal}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div>
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{project.description}</p>
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-cyanSoft focus-ring"
                >
                  Ver proyecto
                  <span aria-hidden>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
