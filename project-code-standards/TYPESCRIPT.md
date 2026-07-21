# TypeScript Standards

Apply these conventions only to TypeScript work areas.

## Pure-function placement

Move domain logic that can be pure into the nearest appropriate domain `functions.ts` file. Create that file when the domain has no suitable one. Promote logic to a shared domain `functions.ts` only when it is genuinely shared; avoid unrelated global utility modules.

```ts
// cart/functions.ts
export const calculateCartTotal = (items: CartItem[]): number =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);
```

Framework hooks, API calls, persistence, and UI wiring should call these functions from their boundaries.

## Domain declarations

Separate exported domain declarations by kind in the nearest owning domain:

- Interfaces belong in `models.ts`.
- Type aliases belong in `types.ts`.
- Shared constants belong in `constants.ts`.

Export declarations from those files when they form part of the domain or cross a file boundary. Keep implementation-private interfaces, types, and constants colocated with their owner and unexported. Do not widen a module's public surface solely to satisfy file placement.

Prefer domain-local declaration files over repository-wide catch-all files. Promote a declaration to a shared domain only when it is genuinely reused there.

## Class members

- Use `#` private fields and methods.
- Prefix protected fields and methods with `_`.
- Mark properties `readonly` when they are not reassigned after initialization.
- Prefer constructor-initialized `readonly` fields; introduce mutability only when behavior requires it.

```ts
export class UserCache {
  readonly config: Config;
  protected readonly _retryLimit: number;
  #expiresAt: Date;

  constructor(config: Config, retryLimit: number, expiresAt: Date) {
    this.config = config;
    this._retryLimit = retryLimit;
    this.#expiresAt = expiresAt;
  }

  #isExpired(now: Date): boolean {
    return now >= this.#expiresAt;
  }
}
```

### Runtime-access exceptions

Use TypeScript `private` only when a framework or tool requires a string-addressable runtime property, such as:

- Reflection, serialization, or ORM metadata
- Instrumentation that must patch or spy on internals
- Interop boundaries that access members by name

Choose the narrowest viable visibility, retain `readonly` where possible, and explain the runtime constraint with a short comment.
