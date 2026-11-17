import { effect, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  // Começa com a preferência do sistema operacional.
  private readonly dark = signal(window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Somente leitura para quem consome o serviço.
  readonly isDark = this.dark.asReadonly();

  constructor() {
    // Sempre que o tema muda, atualiza o atributo no <html>.
    effect(() =>
      document.documentElement.setAttribute('data-theme', this.dark() ? 'dark' : 'light'),
    );
  }

  toggle(): void {
    this.dark.update((value) => !value);
  }
}
