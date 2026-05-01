## সূচিপত্র

অধ্যায় ১০: Advanced Types

10.1 Mapped Types  
10.2 Conditional Types  
10.3 Literal Types  
10.4 Template Literal Types  
10.5 Recursive Types TypeScript

## অধ্যায় ১০: Advanced Types

### কীভাবে পড়বে (Print-friendly)

1. আগে `Literal` এবং `Mapped` type বুঝে foundation তৈরি করো  
2. এরপর `Conditional` এবং `Template Literal` এ যাও  
3. শেষে `Recursive Types` ধীরে ধীরে উদাহরণসহ পড়ো  
4. প্রতিটি section শেষে নিজে ছোট type utility লিখে practice করো  

## ১০.১ Mapped Types

Mapped Types হলো এমন একটি কৌশল, যেখানে existing type-এর keys ব্যবহার করে নতুন type তৈরি করা হয়।  
সহজভাবে বললে, "একটি type-এর প্রতিটি property-এর উপর একটি transformation rule apply" করা হয়।

### কেন দরকার?

1. repeat type writing কমাতে  
2. large model-এ consistent transformation করতে  
3. `readonly`, optional, value type change ইত্যাদি bulk-এ apply করতে  

### সাধারণ syntax

```ts
type MyMapped<T> = {
  [K in keyof T]: T[K];
};
```

এখানে:

- `keyof T` = `T`-এর key union
- `K in ...` = প্রতিটি key-এর উপর iterate
- `T[K]` = ওই key-এর value type

### Practical উদাহরণ: সব field optional

```ts
type Optional<T> = {
  [K in keyof T]?: T[K];
};
```

এটি built-in `Partial<T>`-এর core idea।

### Modifier Mapping

Mapped type-এ modifier add/remove করা যায়:

- `?` -> optional add
- `-?` -> optional remove
- `readonly` -> readonly add
- `-readonly` -> readonly remove

```ts
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};
```

### Key Remapping (উন্নত)

`as` ব্যবহার করে key rename করা যায়:

```ts
type PrefixKeys<T> = {
  [K in keyof T as `api_${string & K}`]: T[K];
};
```

### Common Mistakes

1. mapped type-কে runtime loop ভাবা  
2. complex remapping-এ readability হারানো  
3. nested model-এ shallow transformation ধরে নিয়ে ভুল করা  

### Best Practices

1. mapped type helper-এর নাম intent অনুযায়ী রাখো  
2. complex rule হলে ছোট ছোট helper type-এ ভাঙো  
3. reusable utility আলাদা section/type alias-এ রাখো  

### সংক্ষিপ্ত সারাংশ

Mapped Types TypeScript-এ scalable type transformation-এর backbone।  
এটি model-centric architecture-এ consistency এবং maintainability বাড়ায়।

---

## ১০.২ Conditional Types

Conditional Types হলো type-level `if-else` logic।  
এটি কোনো condition-এর উপর নির্ভর করে একটি type বা অন্য type return করে।

### Basic Syntax

```ts
type IsString<T> = T extends string ? true : false;
```

### কেন দরকার?

1. input type অনুযায়ী output type change করতে  
2. generic helper-এ smart behavior যোগ করতে  
3. overload-এর বিকল্প type-level branching তৈরি করতে  

### Practical উদাহরণ

```ts
type ApiResult<T> = T extends Error
  ? { ok: false; error: string }
  : { ok: true; data: T };
```

### Distributive Conditional Types

যদি `T` union হয়, conditional type union-এর প্রতিটি member-এর উপর distribute করে।

```ts
type ToArray<T> = T extends any ? T[] : never;
type R = ToArray<string | number>; // string[] | number[]
```

### `infer` keyword (conditional-এর superpower)

`infer` দিয়ে type-এর ভিতর থেকে sub-type বের করা যায়।

```ts
type ElementType<T> = T extends (infer U)[] ? U : T;
```

### Common Mistakes

1. distributive behavior না বুঝে unexpected union পাওয়া  
2. nested conditional অতিরিক্ত জটিল করা  
3. `infer` use করে opaque type বানানো  

### Best Practices

1. conditional type ছোট রাখো  
2. intermediate alias use করে readability বাড়াও  
3. helper name behavior অনুযায়ী রাখো (`Unwrap`, `ElementType`)  

### সংক্ষিপ্ত সারাংশ

Conditional Types TypeScript-এ dynamic type logic তৈরি করতে দেয়।  
Generic library/helper design-এ এটি অত্যন্ত শক্তিশালী feature।

---

## ১০.৩ Literal Types

Literal Types মানে exact value-কে type হিসেবে ব্যবহার করা।  
যেমন `string` একটা broad type, কিন্তু `"success"` একটি literal type।

### কেন গুরুত্বপূর্ণ?

1. সীমিত valid value enforce করা যায়  
2. state/action modeling robust হয়  
3. typo-driven bug কমে  

### উদাহরণ

```ts
type Status = "idle" | "loading" | "success" | "error";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
```

### Literal narrowing

`const` ব্যবহার করলে compiler literal ধরে রাখতে পারে:

```ts
const method = "GET"; // type: "GET"
let mode = "GET"; // type: string
```

### Discriminated Union-এর ভিত্তি

Literal field (`kind`, `type`, `status`) ব্যবহার করে union branch safely narrow করা হয়।

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };
```

### Common Mistakes

1. broad `string` use করে literal benefit হারানো  
2. discriminant field inconsistent রাখা  
3. literal union বড় হয়ে গেলে maintain না করা  

### Best Practices

1. finite domain value-এ literal union অগ্রাধিকার দাও  
2. discriminant field naming consistent রাখো (`type`/`kind`)  
3. প্রয়োজনে `as const` দিয়ে literal preserve করো  

### সংক্ষিপ্ত সারাংশ

Literal Types domain rules compile-time-এ enforce করার সহজ ও কার্যকর উপায়।  
State management এবং API action modeling-এ এটি অত্যন্ত গুরুত্বপূর্ণ।

---

## ১০.৪ Template Literal Types

Template Literal Types string literal type combine করে নতুন string type তৈরি করে।  
এটি runtime template string-এর type-level সংস্করণ বলা যায়।

### Basic Syntax

```ts
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickEvent = EventName<"click">; // "onClick"
```

### কেন দরকার?

1. naming convention type-level enforce করতে  
2. dynamic string API safer করতে  
3. key generation pattern typed করতে  

### Practical Example: Typed event names

```ts
type Field = "name" | "email";
type FieldEvent = `${Field}Changed`;
// "nameChanged" | "emailChanged"
```

### Built-in string manipulation helpers

Template literal এর সাথে built-in utility:

1. `Uppercase<T>`
2. `Lowercase<T>`
3. `Capitalize<T>`
4. `Uncapitalize<T>`

```ts
type Route = "home" | "about";
type RoutePath = `/${Route}`; // "/home" | "/about"
```

### Common Mistakes

1. খুব বড় union-এর সাথে template literal use করে complexity বাড়ানো  
2. generated type debug করতে না পারা  
3. naming convention stable না রেখে template rule লেখা  

### Best Practices

1. ছোট predictable union-এর সাথে ব্যবহার করো  
2. generated type alias meaningful name দাও  
3. API naming rule documentation-এ উল্লেখ করো  

### সংক্ষিপ্ত সারাংশ

Template Literal Types string-based API-কে compile-time safe করে।  
Convention-driven codebase-এ এটি design consistency বাড়ায়।

---

## ১০.৫ Recursive Types TypeScript

Recursive Type হলো এমন type, যা নিজেকেই reference করে।  
Tree, nested comment, JSON-like data, file/folder structure ইত্যাদি model করতে এটি দরকার হয়।

### কেন দরকার?

1. nested structure represent করতে  
2. hierarchical data type-safe রাখতে  
3. recursive data traversal-এর contract নির্ধারণ করতে  

### Basic উদাহরণ: Tree node

```ts
type TreeNode = {
  id: string;
  label: string;
  children?: TreeNode[];
};
```

### JSON-like recursive model

```ts
type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };
```

### Recursive mapped type (advanced ধারণা)

```ts
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};
```

এটি nested object-এর প্রতিটি level readonly করার ধারণা দেখায়।

### Common Mistakes

1. recursion exit condition না ভেবে infinite-like type complexity তৈরি  
2. `object` check broad হওয়ায় unexpected result  
3. খুব deep recursive utility দিয়ে IDE performance কমানো  

### Best Practices

1. recursive type যতটা সম্ভব simple রাখো  
2. base case পরিষ্কার রাখো  
3. shared deep utility type (`DeepPartial`, `DeepReadonly`) centrally maintain করো  
4. heavy recursive transformation production-এ measured use করো  

### সংক্ষিপ্ত সারাংশ

Recursive Types nested ও hierarchical data modeling-এর জন্য অপরিহার্য।  
তবে এটি powerful হওয়ায় সরল ও controlled pattern-এ ব্যবহার করা সবচেয়ে ভালো।

---

## অধ্যায় ১০ সারসংক্ষেপ

এই অধ্যায়ে আমরা শিখলাম:

1. mapped type দিয়ে bulk property transformation  
2. conditional type দিয়ে type-level logic branch  
3. literal ও template literal দিয়ে strict string/value contract  
4. recursive type দিয়ে nested/hierarchical data model  

Advanced Types আয়ত্ত করলে TypeScript-এর type system দিয়ে production-level architecture design করা অনেক সহজ হয়।

---

## অনুশীলনী (Practice)

1. `User` type থেকে `MutableUser`, `OptionalUser`, `ApiUser` mapped type দিয়ে বানাও  
2. `UnwrapArray<T>` এবং `UnwrapPromise<T>` conditional type লিখো  
3. `Status` literal union দিয়ে discriminated union action model তৈরি করো  
4. `Route` union থেকে template literal route path generate করো  
5. nested settings object-এর জন্য simplified `DeepReadonly` লিখো  

---

## References

- [TypeScript Handbook - Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [TypeScript Handbook - Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [TypeScript Handbook - Literal Types](https://www.typescriptlang.org/docs/handbook/literal-types.html)
- [TypeScript Handbook - Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
