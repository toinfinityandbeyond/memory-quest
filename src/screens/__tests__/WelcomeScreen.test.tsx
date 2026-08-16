import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WelcomeScreen } from '../WelcomeScreen';
import { welcome } from '../../content/welcome';

describe('WelcomeScreen', () => {
  it('renders the title, welcome message and the "Jugar" action (WC-1)', () => {
    render(<WelcomeScreen />);

    expect(
      screen.getByRole('heading', { name: welcome.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(welcome.welcomeMessage)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: welcome.primaryActionLabel }),
    ).toBeInTheDocument();
  });

  it('shows the primary action as disabled (WC-2)', () => {
    render(<WelcomeScreen />);

    expect(
      screen.getByRole('button', { name: welcome.primaryActionLabel }),
    ).toBeDisabled();
  });

  it('does not navigate, error, or change state when the disabled action is clicked (WC-3)', async () => {
    const user = userEvent.setup();
    render(<WelcomeScreen />);

    const button = screen.getByRole('button', {
      name: welcome.primaryActionLabel,
    });

    // Clicking a disabled control must be inert and must not throw.
    await user.click(button);

    expect(button).toBeDisabled();
    expect(button).toBeInTheDocument();
  });
});
