import type { LucideIcon, LucideProps } from 'lucide-react';

export interface IconProps extends LucideProps {
  /** A lucide-react icon component, e.g. `Brain` from 'lucide-react'. */
  icon: LucideIcon;
}

/**
 * Thin wrapper over lucide-react so icon usage stays consistent and swappable.
 * Size/color default to comfortable, token-friendly values but can be overridden.
 */
export function Icon({ icon: LucideGlyph, size = 24, ...props }: IconProps) {
  return <LucideGlyph size={size} aria-hidden={props['aria-label'] ? undefined : true} {...props} />;
}
