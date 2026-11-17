import { computed, effect, Injectable, signal } from '@angular/core';

const MIN = 87.5;
const MAX = 150;
const STEP = 12.5;

@Injectable({ providedIn: 'root' })
export class FontSizeService {
  // Tamanho da fonte base em porcentagem (100 = padrão do navegador).
  private readonly percent = signal(100);

  readonly canIncrease = computed(() => this.percent() < MAX);
  readonly canDecrease = computed(() => this.percent() > MIN);

  constructor() {
    // Como todo o CSS usa rem, mudar o <html> escala o site inteiro.
    effect(() => {
      document.documentElement.style.fontSize = `${this.percent()}%`;
    });
  }

  increase(): void {
    this.percent.update((value) => Math.min(MAX, value + STEP));
  }

  decrease(): void {
    this.percent.update((value) => Math.max(MIN, value - STEP));
  }
}