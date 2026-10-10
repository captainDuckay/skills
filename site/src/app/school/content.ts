import generatedSkills from '../../content/generated/skills.json';
import skillNotes from '../../content/skill-notes.json';
import tenetData from '../../content/tenets.json';
import type { Skill, SkillNotes, Tenet } from './models';

export const skills: readonly Skill[] = generatedSkills;
export const notes: Readonly<Record<string, SkillNotes>> = skillNotes;
export const tenets: readonly Tenet[] = tenetData;
