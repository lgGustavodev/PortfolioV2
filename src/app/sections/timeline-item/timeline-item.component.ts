import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TimelineItem } from '../../core/models/timeline-item.model';

@Component({
  selector: 'app-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrl: './timeline-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineItemComponent {
  readonly item = input.required<TimelineItem>();
}
