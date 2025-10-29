const currentYear = new Date().getFullYear();

export const Footer = () => (
  <footer className="border-t border-white/10 py-8">
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-6 text-sm text-white/50 md:flex-row md:justify-between">
      <p>© {currentYear} Marc Iglesias Simón. Todos los derechos reservados.</p>
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/marciglesias"
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-primary focus-ring"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/marciglesias"
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-primary focus-ring"
        >
          LinkedIn
        </a>
      </div>
    </div>
  </footer>
);
