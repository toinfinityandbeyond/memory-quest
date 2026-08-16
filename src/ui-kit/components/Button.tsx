export interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: 'primary';
  className?: string;
  /** id of an element that describes the button (e.g. a "coming soon" hint). */
  'aria-describedby'?: string;
}

/**
 * Primary action button following DESIGN.md: Teal surface with a 4px bottom-offset
 * shadow that collapses on press (the "push" effect). Comfortable tap target (>=44px)
 * for children. When disabled it is visually muted and completely inert.
 */
export function Button({
  label,
  disabled = false,
  onClick,
  variant = 'primary',
  className = '',
  ...rest
}: ButtonProps) {
  void variant; // only 'primary' exists today; kept for future variants

  const base =
    'inline-flex select-none items-center justify-center rounded px-8 py-3 min-h-[44px] ' +
    'text-label-bold uppercase transition-transform duration-100 focus-visible:outline-none ' +
    'focus-visible:ring-4 focus-visible:ring-primary-container';

  const enabled =
    'bg-primary text-on-primary cursor-pointer ' +
    'shadow-[0_4px_0_theme(colors.on-primary-container)] ' +
    'active:translate-y-1 active:shadow-[0_1px_0_theme(colors.on-primary-container)]';

  const off = 'bg-primary text-on-primary opacity-40 cursor-not-allowed shadow-none';

  return (
    <button
      type="button"
      disabled={disabled}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      className={`${base} ${disabled ? off : enabled} ${className}`.trim()}
      {...rest}
    >
      {label}
    </button>
  );
}
