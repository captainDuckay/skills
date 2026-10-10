import { RenderMode, type ServerRoute } from '@angular/ssr';
import { skills } from './school/content';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'skills/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => skills.map((skill) => ({ slug: skill.slug })),
  },
  { path: '**', renderMode: RenderMode.Prerender },
];
