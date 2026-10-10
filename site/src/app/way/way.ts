import { ChangeDetectionStrategy, Component } from '@angular/core';
import { tenets } from '../school/content';
import { TenetCard } from '../tenet-card/tenet-card';

@Component({
  selector: 'school-way',
  imports: [TenetCard],
  templateUrl: './way.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Way {
  protected readonly tenets = tenets;
}
