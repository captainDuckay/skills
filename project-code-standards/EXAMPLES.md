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
