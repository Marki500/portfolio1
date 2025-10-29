import { useRef } from 'react';

import { useScrollReveal } from './useScrollReveal';

const testimonials = [
  {
    quote:
      'Marc entendió las necesidades del ecommerce desde el primer momento y entregó un sitio rapidísimo con integraciones complejas.',
    name: 'Laura Gómez',
    role: 'CMO en Nova Retail'
  },
  {
    quote:
      'Su enfoque en rendimiento y seguridad nos permitió migrar a una arquitectura moderna sin downtime y con documentación impecable.',
    name: 'Carlos Muñoz',
    role: 'CTO en Orbit SaaS'
  },
  {
    quote:
      'Siempre propone mejoras y automatizaciones que ahorran tiempo al equipo. Trabajar con él es sinónimo de tranquilidad.',
    name: 'Sandra Pérez',
    role: 'Project Manager en Creativa Studio'
  }
];

export const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef, '.testimonial-card', { stagger: 0.18 });

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <div className="max-w-2xl">
          <h2 className="section-title">Testimonios</h2>
          <p className="mt-4 text-white/70">Opiniones de profesionales con los que he colaborado estrechamente.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="testimonial-card glass flex h-full flex-col gap-6 rounded-3xl border border-white/10 p-8"
            >
              <blockquote className="text-sm text-white/70">“{testimonial.quote}”</blockquote>
              <figcaption className="text-sm">
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-white/50">{testimonial.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
