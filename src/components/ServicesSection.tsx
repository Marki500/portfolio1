import { useRef } from 'react';

import { useScrollReveal } from './useScrollReveal';

const services = [
  {
    title: 'WordPress avanzado',
    description: 'Themes y plugins a medida, headless con Next/Astro, WooCommerce optimizado y automatizaciones.',
    icon: '🪐'
  },
  {
    title: 'Apps React / Node',
    description: 'SPAs y backends modulares con React, Node.js, GraphQL/REST, pruebas E2E y CI/CD.',
    icon: '⚛️'
  },
  {
    title: 'Performance & SEO técnico',
    description: 'Core Web Vitals, auditorías Lighthouse, optimización de assets, datos estructurados y tracking.',
    icon: '🚀'
  },
  {
    title: 'DevOps y Cloud',
    description: 'Docker, despliegues automatizados, servidores Apache/Nginx, Cloudflare, monitorización 24/7.',
    icon: '☁️'
  }
];

export const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef, '.service-card', { stagger: 0.12 });

  return (
    <section id="services" ref={sectionRef} className="relative py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <div className="max-w-2xl">
          <h2 className="section-title">Servicios</h2>
          <p className="mt-4 text-white/70">
            Desde sitios corporativos inmersivos hasta arquitecturas headless y pipelines DevOps listos para escalar.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.title}
              className="service-card glass card-hover flex h-full flex-col gap-4 rounded-3xl border border-white/10 p-8"
            >
              <span className="text-4xl" aria-hidden>
                {service.icon}
              </span>
              <h3 className="text-xl font-semibold text-white">{service.title}</h3>
              <p className="text-sm text-white/70">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
