
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';

import { SITE } from '../../core/constants/site.constants';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements OnInit, OnDestroy {

  readonly site = SITE;

  readonly summary =
    'Desenvolvo serviços em Java e Spring Boot para o time do Bradesco na CWI Software, ' +
    'com formação Full Stack. Antes da tecnologia, passei quase 10 anos ' +
    'no atendimento e na operação de farmácia, o que me ensinou a comunicar com clareza e resolver problemas reais.';

  // Textos que serão exibidos progressivamente.
  readonly displayedName = signal('');
  readonly displayedRole = signal('');

  // Controla em qual etapa da animação estamos.
  readonly nameFinished = signal(false);
  readonly roleFinished = signal(false);

  private timeoutId?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.typeText(this.site.name, this.displayedName, () => {
      this.nameFinished.set(true);

      // Pequena pausa antes de começar o cargo.
      this.timeoutId = setTimeout(() => {
        this.typeText(
          `${this.site.role} · ${this.site.city}`,
          this.displayedRole,
          () => this.roleFinished.set(true)
        );
      }, 400);
    });
  }

  private typeText(
    text: string,
    target: WritableSignal<string>,
    onComplete: () => void
  ): void {
    let index = 0;

    const typeNext = (): void => {
      index++;

      target.set(text.substring(0, index));

      if (index < text.length) {
        this.timeoutId = setTimeout(typeNext, 100);
      } else {
        onComplete();
      }
    };

    this.timeoutId = setTimeout(typeNext, 85);
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
