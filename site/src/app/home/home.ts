import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { skills, tenets } from '../school/content';
import { TenetCard } from '../tenet-card/tenet-card';

@Component({
  selector: 'school-home',
  imports: [RouterLink, TenetCard],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly tenets = tenets;
  protected readonly skillCount = skills.length;
}
