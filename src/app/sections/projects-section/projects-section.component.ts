import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../../core/constants/site.constants';
import { Project } from '../../core/models/project.model';
import { ProjectCardComponent } from '../project-card/project-card.component';

@Component({
  selector: 'app-projects-section',
  imports: [ProjectCardComponent],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsSectionComponent {
  readonly githubUrl = SITE.github;

  // ✏️ Seus projetos: edite aqui.
  readonly projects: Project[] = [
    {
      title: 'FiConecta',
      description:
        'Projeto full stack em desenvolvimento: plataforma de recrutamento para empresas como supermercados e atacadões ' +
        'contratarem pessoas e suprirem uma necessidade diária, semanal ou mensal.',
      stack: ['Java', 'Spring Boot', 'Angular'],
      repoUrl: 'https://github.com/lgGustavodev/FiConecta',
    },
    {
      title: 'Site da Dra. Kely Lima',
      description:
        'Site institucional de uma fisioterapeuta, com serviços, depoimentos de pacientes, contato e clínicas parceiras. ' +
        'Responsivo, com carrossel de imagens e botão flutuante de WhatsApp.',
      stack: ['HTML5', 'CSS3', 'Bootstrap 5', 'JavaScript'],
      repoUrl: 'https://github.com/lgGustavodev/WebSiteFisioterapeuta',
      liveUrl: 'https://lggustavodev.github.io/WebSiteFisioterapeuta/',
    },
    {
      title: 'Cadastro de Fornecedor e Produtos 2.0',
      description:
        'Formulário com validações, endereço preenchido automaticamente pela API de CEP, inclusão dinâmica de produtos ' +
        'com valor total calculado, gerenciamento de anexos e geração de JSON.',
      stack: ['HTML5', 'CSS3', 'Bootstrap 5', 'JavaScript'],
      repoUrl: 'https://github.com/lgGustavodev/Desafio-Front-End-2.0',
      liveUrl: 'https://lggustavodev.github.io/Desafio-Front-End-2.0/',
    },
  ];
}