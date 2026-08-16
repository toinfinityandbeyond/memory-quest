// User-facing copy for the welcome screen. Spanish is the game's end-user language.
// Kept separate from components so content can change without touching logic.
export interface WelcomeContent {
  title: string;
  welcomeMessage: string;
  primaryActionLabel: string;
  comingSoonHint: string;
}

export const welcome: WelcomeContent = {
  title: 'Juego de Memoria',
  welcomeMessage: '¡Hola! ¿Preparad@ para poner a prueba tu memoria?',
  primaryActionLabel: 'Jugar',
  comingSoonHint: 'Muy pronto…',
};
