import { Brain } from 'lucide-react';
import { welcome } from '../content/welcome';
import { Button } from '../ui-kit/components/Button';
import { Icon } from '../ui-kit/components/Icon';

/**
 * The single screen for this phase: a warm, Spanish-language welcome that applies
 * the DESIGN.md identity. The primary action ("Jugar") is shown but disabled as a
 * preview of the game, with a "coming soon" hint.
 */
export function WelcomeScreen() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-card-gap p-section-padding text-center">
      <div className="flex flex-col items-center gap-card-gap">
        <span
          className="flex h-20 w-20 items-center justify-center rounded-xl bg-primary-container text-on-primary-container shadow-[0_4px_0_theme(colors.primary)]"
          aria-hidden="true"
        >
          <Icon icon={Brain} size={40} />
        </span>

        <h1 className="text-headline-lg-mobile text-on-surface sm:text-headline-xl">
          {welcome.title}
        </h1>

        <p className="max-w-md text-body-md text-on-surface-variant">
          {welcome.welcomeMessage}
        </p>
      </div>

      <div className="flex flex-col items-center gap-base">
        <Button
          label={welcome.primaryActionLabel}
          disabled
          aria-describedby="coming-soon-hint"
        />
        <span id="coming-soon-hint" className="text-label-bold uppercase text-outline">
          {welcome.comingSoonHint}
        </span>
      </div>
    </main>
  );
}
