import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { displayName } from '../school/functions';
import type { Skill } from '../school/models';

@Component({
  selector: 'li[school-skill-card]',
  imports: [RouterLink],
  templateUrl: './skill-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'card' },
})
export class SkillCard {
  readonly skill = input.required<Skill>();
  protected readonly displayName = displayName;
}
