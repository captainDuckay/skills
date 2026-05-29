# Examples

## 1) Icon usage

### ✅ Good: use approved icon packages

```ts
// Example import style (actual icon names depend on package exports)
import { HomeIcon } from '@captains-chest/material-symbols-rounded-icons';
import { HomeFilledIcon } from '@captains-chest/material-symbols-rounded-icons-filled';
```

### ❌ Bad: custom icon artwork without explicit approval

```ts
// Do not add ad-hoc/custom icon files by default
import CustomBrandIcon from './icons/custom-brand-icon.svg';
```

### ✅ Good: ask before custom icons

If a feature seems to require a new custom icon:

- Pause implementation
- Ask user: "This would require custom icon artwork. Do you explicitly want me to proceed with custom icons?"
- Continue only after explicit approval

---

## 2) Functional-first extraction

### ❌ Bad: business logic embedded in component/class

```ts
export class CartComponent {
  total = 0;

  updateTotal(items: Array<{ price: number; qty: number }>) {
    this.total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }
}
```

### ✅ Good: pure logic in `functions.ts`

`cart/functions.ts`

```ts
export type CartItem = { price: number; qty: number };

export const calculateCartTotal = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + item.price * item.qty, 0);
```

`cart/cart.component.ts`

```ts
import { calculateCartTotal } from './functions';

export class CartComponent {
  total = 0;

  updateTotal(items: Array<{ price: number; qty: number }>) {
    this.total = calculateCartTotal(items);
  }
}
```

---

## 3) Side effects at boundaries

### ❌ Bad: mixed pure + side effects in same function

```ts
export async function saveAndFormatUser(api, user) {
  const formatted = `${user.firstName} ${user.lastName}`.trim();
  await api.save({ ...user, displayName: formatted });
  return formatted;
}
```

### ✅ Good: separate pure transformation from I/O

`user/functions.ts`

```ts
export const toDisplayName = (user: { firstName: string; lastName: string }) =>
  `${user.firstName} ${user.lastName}`.trim();
```

`user/service.ts`

```ts
import { toDisplayName } from './functions';

export async function saveUser(api, user) {
  const displayName = toDisplayName(user);
  await api.save({ ...user, displayName });
  return displayName;
}
```

---

## 4) File placement guidance

### ✅ Prefer nearest domain `functions.ts`

- `orders/order-list.component.ts` → `orders/functions.ts`
- `checkout/use-discount.ts` → `checkout/functions.ts`

### ✅ Use shared domain file when truly cross-cutting

- `billing/invoice/functions.ts` and `billing/payment/functions.ts` share logic
- Move common pieces to `billing/shared/functions.ts`

### ❌ Avoid dumping unrelated helpers into global utility files

- Do not put domain-specific logic into a generic `utils.ts` if a domain `functions.ts` is more appropriate

---

## 5) Class member visibility and readonly enforcement

### ❌ Bad: TypeScript `private`, missing `_` for protected, mutable field by default

```ts
export class UserCache {
  private ttlMs = 60_000;
  protected retries = 3;
  config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  private refresh() {
    // ...
  }
}
```

### ✅ Good: `#private`, `_protected`, `readonly` by default

```ts
export class UserCache {
  #ttlMs = 60_000;
  protected readonly _retries = 3;
  readonly config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  #refresh() {
    // ...
  }
}
```

---

## 6) Declarative-over-imperative patterns

### ❌ Bad: imperative loops and mutation for business logic

```ts
export function getActiveUserNames(users: Array<{ name: string; isActive: boolean }>) {
  const result: string[] = [];

  for (let i = 0; i < users.length; i++) {
    if (users[i].isActive) {
      result.push(users[i].name.trim());
    }
  }

  return result;
}
```

### ✅ Good: declarative transformations for intent

```ts
export function getActiveUserNames(users: Array<{ name: string; isActive: boolean }>) {
  return users.filter((user) => user.isActive).map((user) => user.name.trim());
}
```

### ❌ Bad: long conditional chain for selectable behavior

```ts
export function getDiscountRate(tier: 'bronze' | 'silver' | 'gold') {
  if (tier === 'bronze') return 0.02;
  if (tier === 'silver') return 0.05;
  if (tier === 'gold') return 0.1;
  return 0;
}
```

### ✅ Good: data-driven declarative mapping

```ts
const DISCOUNT_RATE_BY_TIER: Record<'bronze' | 'silver' | 'gold', number> = {
  bronze: 0.02,
  silver: 0.05,
  gold: 0.1,
};

export function getDiscountRate(tier: 'bronze' | 'silver' | 'gold') {
  return DISCOUNT_RATE_BY_TIER[tier] ?? 0;
}
```

### ✅ Allowed exception: imperative code at a boundary (with rationale)

```ts
export async function processUpload(stream: NodeJS.ReadableStream) {
  // Imperative loop retained for streaming/backpressure control at I/O boundary.
  for await (const chunk of stream) {
    await writeChunk(chunk);
  }
}
```

---

## 7) No magic numbers (favor readability)

### ❌ Bad: unexplained numeric literals in business logic

```ts
export function isSessionExpired(lastSeenAtMs: number, nowMs: number) {
  return nowMs - lastSeenAtMs > 1800000;
}
```

### ✅ Good: named constant with unit in name

```ts
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

export function isSessionExpired(lastSeenAtMs: number, nowMs: number) {
  return nowMs - lastSeenAtMs > SESSION_TIMEOUT_MS;
}
```

### ❌ Bad: protocol/spec number with no context

```ts
if (response.status === 429) {
  retryLater();
}
```

### ✅ Good: explicit constant or inline rationale

```ts
const HTTP_STATUS_TOO_MANY_REQUESTS = 429;

if (response.status === HTTP_STATUS_TOO_MANY_REQUESTS) {
  retryLater();
}
```

### ✅ Allowed inline literals (strict)

- Only `0`, `1`, and `-1` when intent is obvious
- Applies equally to production code and tests

### ❌ Bad (tests too): unnamed numeric literals in assertions

```ts
it('returns retry delay', () => {
  expect(getRetryDelay()).toBe(5000);
});
```

### ✅ Good (tests too): named constants for expected values

```ts
const EXPECTED_RETRY_DELAY_MS = 5_000;

it('returns retry delay', () => {
  expect(getRetryDelay()).toBe(EXPECTED_RETRY_DELAY_MS);
});
```

---

## 8) Boy Scout Rule (separate cleanup commit)

### ✅ Good: opportunistic standards cleanup in its own commit

Primary task commit:

```text
feat(checkout): add coupon validation to order summary
```

Separate Boy Scout cleanup commit:

```text
refactor(orders): apply project-code-standards cleanup in touched files
```

### ❌ Bad: mix feature changes and standards cleanup in one commit

```text
feat(checkout): add coupon validation and refactor various files
```

### ✅ Good: explicit PR/summary callout

- "Primary change: coupon validation flow"
- "Boy Scout cleanup (separate commit): extracted pure helper to orders/functions.ts, replaced magic numbers with named constants"

### Scope guidance

- ✅ Allowed: cleanup in files/modules directly touched by the task
- ❌ Avoid: repo-wide style rewrites unrelated to the task path
