import { FormEvent, useMemo, useRef, useState } from 'react';

import { useScrollReveal } from './useScrollReveal';

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef, '.contact-animate', { stagger: 0.12 });

  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const errorMessage = useMemo(() => {
    if (status === 'error') {
      return 'Por favor completa todos los campos correctamente.';
    }
    if (status === 'success') {
      return 'Gracias por tu mensaje. Te responderé muy pronto.';
    }
    return '';
  }, [status]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    const newErrors: typeof errors = {};
    if (!name) newErrors.name = 'Introduce tu nombre';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Introduce un email válido';
    if (!message) newErrors.message = 'Escribe un mensaje';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setStatus('error');
      return;
    }

    setStatus('success');
    form.reset();
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 lg:flex-row">
        <div className="contact-animate flex-1 space-y-6">
          <h2 className="section-title">Contacto</h2>
          <p className="text-white/70">
            Cuéntame qué necesitas y construyamos una experiencia memorable y escalable para tu marca.
          </p>
          <div className="space-y-3 text-sm text-white/60">
            <p>Disponible para proyectos freelance, consultorías técnicas y refuerzos de equipo.</p>
            <a
              href="mailto:hola@marciglesias.dev"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-cyanSoft focus-ring"
            >
              Enviar email directo
              <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
        <div className="contact-animate flex-1">
          <form
            className="glass flex flex-col gap-5 rounded-3xl border border-white/10 p-8"
            onSubmit={handleSubmit}
            noValidate
          >
            <div>
              <label htmlFor="name" className="text-sm font-semibold text-white">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus-ring"
                placeholder="Tu nombre"
                required
                aria-invalid={errors.name ? 'true' : 'false'}
              />
              {errors.name ? (
                <p className="mt-2 text-xs text-rose-300" role="alert">
                  {errors.name}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-semibold text-white">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus-ring"
                placeholder="tu@email.com"
                required
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email ? (
                <p className="mt-2 text-xs text-rose-300" role="alert">
                  {errors.email}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-semibold text-white">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                className="mt-2 h-32 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus-ring"
                placeholder="Cuéntame sobre tu proyecto"
                required
                aria-invalid={errors.message ? 'true' : 'false'}
              />
              {errors.message ? (
                <p className="mt-2 text-xs text-rose-300" role="alert">
                  {errors.message}
                </p>
              ) : null}
            </div>
            <button type="submit" className="cta focus-ring">
              Enviar mensaje
            </button>
            <p className="min-h-[1.25rem] text-xs text-white/60" aria-live="polite">
              {errorMessage}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
