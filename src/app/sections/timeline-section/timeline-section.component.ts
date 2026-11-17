import { AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  OnDestroy,
  QueryList,
  signal,
  ViewChild,
  ViewChildren } from '@angular/core';
import { TimelineItem, TimelineKind } from '../../core/models/timeline-item.model';
import { ChipFilterComponent, ChipOption } from '../../shared/chip-filter/chip-filter.component';
import { TimelineItemComponent } from '../timeline-item/timeline-item.component';

type TimelineFilter = 'todos' | TimelineKind;


@Component({
  selector: 'app-timeline-section',
  imports: [ChipFilterComponent, TimelineItemComponent],
  templateUrl: './timeline-section.component.html',
  styleUrl: './timeline-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineSectionComponent implements AfterViewInit, OnDestroy {
  
  // Referência à linha do tempo no HTML.
  @ViewChild('timeline')
  private timeline!: ElementRef<HTMLOListElement>;

  // Referências a cada experiência.
  @ViewChildren('stepElement', { read: ElementRef })
  private steps!: QueryList<ElementRef<HTMLElement>>;

  // Progresso visual da linha: de 0 até 1.
  readonly timelineProgress = signal(0);

  // Guarda quais experiências já foram alcançadas.
  readonly activeSteps = signal<Set<string>>(new Set());

  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        const active = new Set(this.activeSteps());

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const title = (entry.target as HTMLElement).dataset['title'];

            if (title) {
              active.add(title);
            }
          }
        });

        this.activeSteps.set(active);
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    this.observeSteps();

    // Atualiza a observação quando o filtro muda a lista.
    this.steps.changes.subscribe(() => {
      this.observeSteps();
      this.updateProgress();
    });

    this.updateProgress();
  }

  // Acompanha a rolagem da página.
  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateProgress();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateProgress();
  }

  private observeSteps(): void {
    this.observer?.disconnect();

    this.steps.forEach((step) => {
      this.observer?.observe(step.nativeElement);
    });
  }

  private updateProgress(): void {
    if (!this.timeline) return;

    const element = this.timeline.nativeElement;
    const rect = element.getBoundingClientRect();

    // Ponto de referência: 65% da altura da tela.
    const referencePoint = window.innerHeight * 0.65;

    const progress = Math.max(
      0,
      Math.min(1, (referencePoint - rect.top) / rect.height)
    );

    this.timelineProgress.set(progress);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  // ✏️ Conteúdo da linha do tempo: edite aqui.
    readonly items: TimelineItem[] = [
    { period: 'jun/2015 – mar/2025', kind: 'trabalho', title: 'Jovem Aprendiz → Operador de Caixa → Balconista',
      place: 'Farmácias Pague Menos', description: 'Quase 10 anos de atendimento, controle de estoque e validade de medicamentos, operação de caixa e emissão de notas fiscais.' },
    { period: 'ago/2023', kind: 'estudo', title: 'Início da faculdade: Análise e Desenvolvimento de Sistemas',
      place: 'Faculdade Anhanguera', description: 'Começo da graduação em ADS, em paralelo ao trabalho na farmácia.' },
    { period: 'out/2025 – abr/2026', kind: 'estudo', title: 'CWI Crescer, Level 1 e Level 2',
      place: 'CWI Software', description: 'Level 1 (200h): orientação a objetos, banco de dados, HTML/CSS e JavaScript. Level 2 (300h): Angular, Java, DevOps, segurança, IA e metodologias ágeis. Mais 30h de Sistema Financeiro Nacional.' },
    { period: 'jun/2026 – out/2026', kind: 'trabalho', title: 'Estagiário de Desenvolvimento Back-End',
      place: 'CWI Software · time Bradesco', description: 'Primeiras funcionalidades em Java e Spring Boot no time do Bradesco. Efetivado ao final do estágio.' },
    { period: 'jul/2026', kind: 'estudo', title: 'Formatura em Análise e Desenvolvimento de Sistemas',
      place: 'Faculdade Anhanguera', description: 'Conclusão da graduação em ADS.' },
    { period: 'ago/2026 – hoje', kind: 'estudo', title: 'Engenharia de Software',
      place: 'Faculdade Anhanguera', description: 'Início da segunda graduação, logo após a formatura em ADS.' },
    { period: 'out/2026 – hoje', kind: 'trabalho', title: 'Desenvolvedor Back-End Júnior',
      place: 'CWI Software · time Bradesco', description: 'Serviços em Java e Spring Boot, Scrum, revisão de código e testes, além do processo de modernização de sistemas do cliente.' },
  ];

  readonly filterOptions: ChipOption<TimelineFilter>[] = [
    { value: 'todos', label: 'Tudo' },
    { value: 'trabalho', label: 'Trabalho' },
    { value: 'estudo', label: 'Estudo' },
  ];

  readonly filter = signal<TimelineFilter>('todos');

  // Recalcula sozinho quando o filtro muda.
  readonly visibleItems = computed(() =>
    this.items.filter((item) => this.filter() === 'todos' || item.kind === this.filter()),
  );
}
