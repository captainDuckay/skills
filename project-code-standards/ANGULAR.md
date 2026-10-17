# Angular Standards

Read the matching sections for Angular work that creates components, decides component cuts in templates, chooses component selectors or host shape, names framework artifacts, implements forms or async data loading, or adds, replaces, or modifies icons.

## Component cuts

When authoring or expanding a template, **cut** a child component at each clear UI region instead of nesting more markup in the parent. A cut is warranted when any of these hold:

1. **Collection body** — inside `@for`, the item markup (often nested under `<li>`, `<tr>`, or a card/tile wrapper) is more than a **leaf**.
2. **Repeated structure** — the same multi-element shape appears in more than one place in the work.
3. **Nameable UI concept** — the block has a natural noun (row, card, chip, toolbar, empty state, address fields).
4. **Local interaction** — the block owns its own controls or local UI state (expand, select, edit, menu).
5. **Substantial branch** — an `@if` / `@switch` arm is a full UI region, not a one-line spinner or empty message.

A **leaf** stays inline: a single text node, a single icon or badge, or one plain control with no surrounding structure of its own.

After each cut, apply **Host over wrapper** and **New component structure**. Collection items that *are* list or table rows often use a native host (`li[app-…]`, `tr[app-…]`):

```html
@for (product of products(); track product.id) {
  <li app-product-row [product]="product" />
}
```

The parent keeps the list shell and iteration; the cut owns the item.

The decision is complete when every non-leaf `@for` body, repeated block, nameable region, and substantial branch in the changed templates is either cut into a component or left as an explicit leaf.

## Host over wrapper

For each new component (and each component whose outer markup is in scope), choose the **selector** so the **host** is the element of intent. The template renders *inside* the host — do not open the template with a second copy of the landmark or control the host already is.

Prefer a **native host** (`tag[prefix-name]`) when the component *is* a standard element consumers should keep treating as that element (semantics, built-in APIs, ARIA on the real tag):

```ts
@Component({
  selector: 'article[app-product-card]',
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {}
```

Consumer:

```html
<article app-product-card [product]="p">…</article>
```

`product-card.html` holds inner structure only — not another `<article>`. Same pattern for `button[app-…]`, `section[app-…]`, `nav[app-…]`, `form[app-…]`, and other natives when that tag *is* the component.

Prefer a **custom element** type selector (`app-user-chip`) when there is no native stand-in and the component is a new UI concept. Use the project’s short prefix; never use `ng`.

Use an **attribute-only** selector (`[app-dropzone]`) when any of several tags may host the behavior; narrow with `:not(…)` when some tags must never match.

Attribute and combined selectors use lowercase dash-case attributes and the same prefix discipline as custom elements. Angular does not error on unknown attributes the way it does on unknown custom tags — import the component at every use site.

Selector decision is complete when the host carries the outer semantics or control surface, the template does not re-wrap that same tag, and the choice is custom type, native+attribute, or justified attribute-only. For supported selector kinds and matching rules, use the `angular-component-selectors` skill or [Component selectors](https://angular.dev/guide/components/selectors).

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

Apply this structure to new components. Preserve existing inline components unless migration or structural refactoring is explicitly in scope. Pair this file layout with **Host over wrapper** when setting `selector`.

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

## Signal Forms by default

For each new form, inspect the project's Angular version and forms availability before choosing an API. In Angular 21 and newer projects where `@angular/forms/signals` is available, use Signal Forms as the default.

Choose another forms API only when a concrete constraint requires it, such as incompatible Angular versions, third-party integration, or an explicit project requirement. In projects without Signal Forms, follow the established forms strategy.

Preserve the API of an existing Reactive Forms or template-driven form unless migration is explicitly requested or already in scope.

The forms decision is complete when Signal Forms is selected or a concrete compatibility or project constraint identifies the appropriate alternative. Use the `angular-developer` skill for API-level Signal Forms guidance.

## Reactive resources by default

For each new reactive data-loading flow, inspect the project's Angular version and API availability. Use Angular resources as the default when available:

- Use `httpResource` for reactive HTTP reads that should use Angular's HTTP stack, including its interceptors.
- Use `resource` for reactive reads that need a custom loader or use a non-HTTP source.

Use command-oriented APIs for mutations such as create, update, and delete operations. Use RxJS when the requirement depends on multi-emission streams, WebSockets, or complex event-stream composition. Compatibility, third-party integration, and explicit project requirements may also determine another approach.

Preserve existing Observable, `HttpClient`, and promise-based loading flows unless migration is explicitly requested or already in scope.

The data-loading decision is complete when `httpResource` or `resource` is selected, or a concrete requirement identifies the appropriate alternative. Use the `angular-developer` skill's resource guidance for API-level implementation details.

## Icons

Use icons from these Angular packages:

- `@captains-chest/material-symbols-rounded-icons`
- `@captains-chest/material-symbols-rounded-icons-filled`

```ts
import { MsrHomeIconComponent } from '@captains-chest/material-symbols-rounded-icons/home';
import { MsrfHomeIconComponent } from '@captains-chest/material-symbols-rounded-icons-filled/home';
```

Import each icon from its own subpath (the icon name in kebab case, such as `/menu-book`), not from the package root.

Prefer an icon from these packages over custom artwork or another icon set. When neither package can satisfy the requirement, pause and ask for explicit approval before introducing custom artwork or a different package.
