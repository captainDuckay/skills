import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { notes, skills, tenets } from '../school/content';
import { displayName, findSkill, principlesOf, tenetsCiting } from '../school/functions';

@Component({
  selector: 'school-skill',
  imports: [RouterLink],
  templateUrl: './skill.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skill {
  readonly slug = input.required<string>();
  protected readonly skill = computed(() => findSkill(skills, this.slug()));
  protected readonly principles = computed(() => {
    const skill = this.skill();
    return skill ? principlesOf(skill, notes) : [];
  });
  protected readonly tenets = computed(() => tenetsCiting(tenets, this.slug()));
  protected readonly displayName = displayName;
}
