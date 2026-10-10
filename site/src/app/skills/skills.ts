import { ChangeDetectionStrategy, Component } from '@angular/core';
import { skills } from '../school/content';
import { SkillCard } from '../skill-card/skill-card';

@Component({
  selector: 'school-skills',
  imports: [SkillCard],
  templateUrl: './skills.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills {
  protected readonly skills = skills;
}
