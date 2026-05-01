## সূচিপত্র

অধ্যায় ১১: TypeScript Modules

11.1 Module  
11.2 Declare a module  
11.3 Internal vs External module  
11.4 Namespace  
11.5 Module Augmentation

## অধ্যায় ১১: TypeScript Modules

### কীভাবে পড়বে (Print-friendly)

1. আগে module-এর core concept ও import/export flow ধরো  
2. এরপর `declare module` এবং augmentation বুঝো  
3. `namespace` অংশ historical context হিসেবে পড়ো  
4. practice section-এ ছোট multi-file project করে যাচাই করো  

## ১১.১ Module

TypeScript Module হলো code organize করার standard পদ্ধতি, যেখানে file-level scope, import/export, এবং dependency boundary স্পষ্ট থাকে।  
একটি file-এ `import` বা `export` থাকলেই সেটি module হিসেবে গণ্য হয়।

### Module কেন দরকার?

1. global scope pollution এড়াতে  
2. reusable code ভাগ করতে  
3. বড় project-এ dependency management সহজ করতে  
4. testing ও maintainability উন্নত করতে  

### Module-এর মৌলিক ধারণা

- `export` দিয়ে value/type বাইরে expose করা হয়  
- `import` দিয়ে অন্য module থেকে ব্যবহার করা হয়  
- প্রতিটি module-এর নিজস্ব scope থাকে  

### Basic Example

```ts
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}
```

```ts
// app.ts
import { add } from "./math";
console.log(add(2, 3));
```

### Named Export vs Default Export

**Named export:**

```ts
export const PI = 3.1416;
export function area(r: number) {
  return PI * r * r;
}
```

**Default export:**

```ts
export default function greet(name: string) {
  return `Hello, ${name}`;
}
```

### Common Mistakes

1. wrong relative path (`./`, `../`) ব্যবহার  
2. named/default import mismatch  
3. circular dependency তৈরি  

### Best Practices

1. public API-তে named export prefer করো  
2. module file ছোট এবং single-purpose রাখো  
3. barrel file (`index.ts`) ব্যবহার করলে controlled export রাখো  

### সংক্ষিপ্ত সারাংশ

Module system TypeScript project structure-এর foundation।  
সঠিক import/export design maintainability এবং scalability অনেক বাড়ায়।

---

## ১১.২ Declare a module

`declare module` ব্যবহার করা হয় TypeScript-কে জানাতে যে একটি external module আছে, কিন্তু তার type definition compiler-এর জানা নেই।  
বিশেষ করে third-party JS library type-safe ভাবে ব্যবহার করার সময় এটি দরকার হয়।

### কখন লাগে?

1. package install আছে কিন্তু type definition নেই  
2. local custom JS library-র জন্য declaration লিখতে  
3. module typing quick bootstrap করতে  

### Basic Declaration File (`.d.ts`)

```ts
// custom-lib.d.ts
declare module "custom-lib" {
  export function parse(input: string): object;
}
```

এখন TypeScript compiler `custom-lib` import-এ type বুঝতে পারবে।

### Wildcard Module Declaration

কখনও static assets বা pattern module declare করতে হয়:

```ts
declare module "*.svg" {
  const content: string;
  export default content;
}
```

### Ambient Context ধারণা

`declare` keyword runtime code তৈরি করে না; শুধু type information দেয়।

### Common Mistakes

1. `.d.ts` file scope/placement ভুল রাখা  
2. declaration-এ runtime behavior ধরে নেওয়া  
3. incomplete function signatures দিয়ে weak typing রাখা  

### Best Practices

1. declaration file source-এর কাছাকাছি রাখো  
2. minimal থেকে শুরু করে ধীরে ধীরে accurate typing দাও  
3. shared project-এ custom typings version-controlled রাখো  

### সংক্ষিপ্ত সারাংশ

`declare module` TypeScript-এ unknown library-কে typed ecosystem-এ আনতে সাহায্য করে।  
এটি migration এবং third-party integration-এর জন্য খুব গুরুত্বপূর্ণ।

---

## ১১.৩ Internal vs External module

TypeScript-এর পুরনো documentation-এ "internal module" বলতে সাধারণত `namespace` বোঝানো হতো, আর "external module" বলতে ES module/CommonJS file-based import/export বোঝায়।

### External Module (Modern Standard)

আজকের production code-এ external module-ই standard:

- file-based boundary
- explicit import/export
- bundler/runtime compatible

### Internal Module (Namespace-based)

Namespace style একসময় common ছিল, কিন্তু modern tooling-এ কম ব্যবহৃত হয়।

### Conceptual তুলনা

1. **External module**: scalable app/library architecture-এর জন্য উপযুক্ত  
2. **Internal module/namespace**: legacy code বা no-bundler context-এ দেখা যায়  

### কোনটা ব্যবহার করবে?

নতুন TypeScript project-এ external module (ESM style) ব্যবহার করাই best practice।

### Common Mistakes

1. namespace + module system মিশিয়ে complexity বাড়ানো  
2. legacy pattern নতুন project-এ copy করা  
3. build config (`module`, `moduleResolution`) না বুঝে import লেখা  

### Best Practices

1. default architecture হিসেবে external module রাখো  
2. namespace থাকলে incremental migration plan রাখো  
3. `tsconfig.json`-এ module setting project/runtime অনুযায়ী সেট করো  

### সংক্ষিপ্ত সারাংশ

Internal vs External module বোঝার মূল উদ্দেশ্য হলো historical context জানা এবং modern choice নেওয়া।  
বর্তমান TypeScript development-এ external module হলো recommended standard।

---

## ১১.৪ Namespace

Namespace TypeScript-এর একটি language feature, যা related code-কে একটি logical container-এর মধ্যে সংগঠিত করে।  
এটি global naming conflict কমাতে সাহায্য করত, বিশেষ করে pre-module era-তে।

### Basic Example

```ts
namespace Geometry {
  export function square(x: number): number {
    return x * x;
  }
}

console.log(Geometry.square(4));
```

### Namespace কোথায় এখনও দেখা যায়?

1. legacy codebase  
2. global script context  
3. কিছু পুরনো declaration file pattern  

### Namespace vs Module (প্রায়োগিক সিদ্ধান্ত)

- modern app -> module (`import/export`)  
- legacy/global script -> namespace acceptable  

### Common Mistakes

1. modern bundler project-এ unnecessary namespace যোগ করা  
2. namespace nesting deep করে readability কমানো  
3. namespace export/import flow ভুল বোঝা  

### Best Practices

1. নতুন project-এ module-first design রাখো  
2. namespace শুধু specific legacy scenario-তে ব্যবহার করো  
3. namespace থেকে module-এ migration plan করে এগোও  

### সংক্ষিপ্ত সারাংশ

Namespace historicalভাবে গুরুত্বপূর্ণ হলেও modern TypeScript architecture-এ module pattern সাধারণত বেশি উপযোগী।

---

## ১১.৫ Module Augmentation

Module Augmentation হলো existing module/type declaration-এ নতুন property বা method যোগ করার কৌশল।  
এটি বিশেষভাবে useful যখন third-party library type extend করতে হয়।

### কেন দরকার?

1. existing type-এ project-specific extension যোগ করতে  
2. plugin architecture-এ base type enhance করতে  
3. library type gap পূরণ করতে  

### Basic উদাহরণ

```ts
// logger.ts
export interface Logger {
  log(message: string): void;
}
```

```ts
// logger-augmentation.ts
import "./logger";

declare module "./logger" {
  interface Logger {
    warn(message: string): void;
  }
}
```

এখন `Logger` type-এ `warn` method declaration যোগ হলো।

### বাস্তব সতর্কতা

Augmentation type declaration যোগ করে; actual runtime implementation আলাদাভাবে নিশ্চিত করতে হবে।

### Common Mistakes

1. augmentation লিখে implementation না দেওয়া  
2. wrong module path declare করা  
3. library update-এর পর augmentation break হওয়া  

### Best Practices

1. augmentation file naming clear রাখো (`*.augmentation.ts`)  
2. declaration + implementation sync আছে কি না test করো  
3. third-party module augmentation minimal রাখো  

### সংক্ষিপ্ত সারাংশ

Module Augmentation advanced কিন্তু practical একটি feature।  
সঠিকভাবে ব্যবহার করলে existing library/type safely extend করা যায়।

---

## অধ্যায় ১১ সারসংক্ষেপ

এই অধ্যায়ে আমরা শিখলাম:

1. TypeScript module system-এর core (`import/export`)  
2. type declaration-এর জন্য `declare module` ব্যবহার  
3. internal vs external module-এর বাস্তব পার্থক্য  
4. namespace-এর ভূমিকা ও modern relevance  
5. module augmentation দিয়ে type extension

Module architecture ভালোভাবে বোঝা গেলে multi-file TypeScript project clean, scalable, এবং team-friendly হয়।

---

## অনুশীলনী (Practice)

1. `utils/math.ts` এবং `app.ts` দিয়ে basic import/export project বানাও  
2. type definition ছাড়া একটি mock package-এর জন্য `.d.ts` declare করো  
3. legacy namespace snippet লিখে সেটাকে module style-এ refactor করো  
4. local module interface augment করে নতুন method যোগ করো  
5. named vs default export mix example তৈরি করে পার্থক্য ব্যাখ্যা করো  

---

## References

- [TypeScript Handbook - Modules](https://www.typescriptlang.org/docs/handbook/modules.html)
- [TypeScript Handbook - Namespaces](https://www.typescriptlang.org/docs/handbook/namespaces.html)
- [TypeScript Handbook - Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)
- [TypeScript Handbook - Declaration Merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)
