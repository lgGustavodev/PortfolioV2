import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Project } from '../../core/models/project.model';
import { TagListComponent } from '../../shared/tag-list/tag-list.component';

@Component({
  selector: 'app-project-card',
  imports: [TagListComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();
}
