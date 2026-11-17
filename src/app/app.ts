import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { SkipLinkComponent } from './layout/skip-link/skip-link.component';
import { HeroComponent } from './sections/hero/hero.component';
import { ProjectsSectionComponent } from './sections/projects-section/projects-section.component';
import { TimelineSectionComponent } from './sections/timeline-section/timeline-section.component';

// Componente raiz: só monta a página. Nenhuma regra de negócio aqui.
@Component({
  selector: 'app-root',
  imports: [
    SkipLinkComponent, HeaderComponent, HeroComponent,
    TimelineSectionComponent, ProjectsSectionComponent, FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
