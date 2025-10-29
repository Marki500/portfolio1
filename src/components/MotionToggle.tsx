import { useMotionContext } from './motion-context';

export const MotionToggle = () => {
  const { reduceMotion, toggleMotion } = useMotionContext();

  return (
    <button
      type="button"
      onClick={toggleMotion}
      className="glass flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition hover:shadow-glow focus-ring"
      aria-pressed={reduceMotion}
    >
      <span
        className="inline-flex h-5 w-10 items-center rounded-full bg-white/10 p-1 transition"
        role="presentation"
      >
        <span
          className={`h-3.5 w-3.5 rounded-full bg-primary transition-transform duration-300 ${reduceMotion ? 'translate-x-5' : ''}`}
        />
      </span>
      <span>{reduceMotion ? 'Motion: Reducido' : 'Motion: Vivo'}</span>
    </button>
  );
};
