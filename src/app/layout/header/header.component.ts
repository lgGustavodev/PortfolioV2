import { ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';
import { AccessibilityToolbarComponent } from '../../shared/accessibility-toolbar/accessibility-toolbar';

@Component({
  selector: 'app-header',
  imports: [AccessibilityToolbarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Escuta cliques em qualquer lugar da página para fechar o menu.
  host: { '(document:click)': 'onDocumentClick($event)' },
})
export class HeaderComponent {
  readonly links = [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Trajetória', href: '#carreira' },
    { label: 'Projetos', href: '#projetos' },
    { label: 'Contato', href: '#contato' },
  ];

  // Controla o menu hambúrguer (só aparece em telas pequenas).
  readonly menuOpen = signal(false);

  // Referência ao botão hambúrguer (marcado com #burger no HTML).
  private readonly burger = viewChild.required<ElementRef<HTMLElement>>('burger');

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  onDocumentClick(event: MouseEvent): void {
    // Qualquer clique fecha o menu, menos no próprio botão (que já faz o toggle).
    if (!this.burger().nativeElement.contains(event.target as Node)) {
      this.closeMenu();
    }
  }
}