# Angular Standards

Read the matching sections for Angular work that creates components, names framework artifacts, or adds, replaces, or modifies icons.

## New component structure

Create each new component in a folder named for the component. Keep its TypeScript, template, and styles in separate files with the same base name:

```text
user-card/
├── user-card.ts
├── user-card.html
└── user-card.scss
```

Use the project's configured stylesheet extension. Reference the external files from the component metadata:

```ts
@Component({
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss',
})
export class UserCard {}
```

Apply this structure to new components. Preserve existing inline components unless migration or structural refactoring is explicitly in scope.

## Intent-based artifact naming

In new projects and projects already using suffixless names, omit framework-role suffixes from file and class names. Prefer `user-card.ts` and `UserCard` over `user-card.component.ts` and `UserCardComponent`.

Name injectables for their responsibility rather than the generic mechanism. For example:

```text
session-store/
└── session-store.ts
```

```ts
@Injectable({ providedIn: 'root' })
export class SessionStore {}
```

The responsibility name replaces generic `.service` and `Service` suffixes when the surrounding folder makes the concept unambiguous. Add a role suffix only when it disambiguates multiple concepts, framework tooling requires it, or the established project convention requires it.

When an existing project consistently uses role suffixes, preserve that convention unless a naming migration is explicitly in scope.

## Icons

Use icons from these Angular packages:

- `@captains-chest/material-symbols-rounded-icons`
- `@captains-chest/material-symbols-rounded-icons-filled`

```ts
import { HomeIcon } from '@captains-chest/material-symbols-rounded-icons';
import { HomeFilledIcon } from '@captains-chest/material-symbols-rounded-icons-filled';
```

Prefer an icon from these packages over custom artwork or another icon set. When neither package can satisfy the requirement, pause and ask for explicit approval before introducing custom artwork or a different package.
