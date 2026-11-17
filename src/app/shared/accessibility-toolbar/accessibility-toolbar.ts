import { ChangeDetectionStrategy, Component, ElementRef, inject, signal } from '@angular/core';
import { FontSizeService } from '../../core/services/font-size.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-accessibility-toolbar',
  templateUrl: './accessibility-toolbar.html',
  styleUrl: './accessibility-toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Escuta cliques em qualquer lugar da página para fechar o painel.
  host: { '(document:click)': 'onDocumentClick($event)' },
})
export class AccessibilityToolbarComponent {
  protected readonly theme = inject(ThemeService);
  protected readonly font = inject(FontSizeService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  // Painel com os 3 botões: começa fechado.
  protected readonly open = signal(false);

  protected toggle(): void {
    this.open.update((value) => !value);
  }

  protected close(): void {
    this.open.set(false);
  }

  protected onDocumentClick(event: MouseEvent): void {
    // Clique fora do componente fecha o painel.
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }
}