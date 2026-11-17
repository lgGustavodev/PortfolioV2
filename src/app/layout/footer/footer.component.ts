import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../../core/constants/site.constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly site = SITE;
}
