import type { Routes } from '@angular/router';
import { skills } from './school/content';
import { displayName, findSkill } from './school/functions';

const siteName = "School of the Captain's Chest";

export const routes: Routes = [
  { path: '', title: siteName, loadComponent: () => import('./home/home').then((m) => m.Home) },
  { path: 'way', title: `The Way · ${siteName}`, loadComponent: () => import('./way/way').then((m) => m.Way) },
  { path: 'skills', title: `Skills · ${siteName}`, loadComponent: () => import('./skills/skills').then((m) => m.Skills) },
  {
    path: 'skills/:slug',
    title: (route) => {
      const skill = findSkill(skills, route.paramMap.get('slug') ?? '');
      return `${skill ? displayName(skill.slug) : 'Skill'} · ${siteName}`;
    },
    loadComponent: () => import('./skill/skill').then((m) => m.Skill),
  },
  { path: '**', redirectTo: '' },
];
