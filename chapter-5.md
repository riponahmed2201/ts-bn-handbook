## সূচিপত্র

অধ্যায় ৫: TypeScript Interface

5.1 Interfaces  
5.2 Interface and type  
5.3 Interface with class  
5.4 Interface with conditional type  
5.5 Hybrid types

# অধ্যায় ৫: TypeScript Interface

## ৫.১ Interfaces

Interface হলো TypeScript-এর একটি মৌলিক feature, যা মূলত object-এর **shape** (property ও method structure) নির্ধারণ করে।  
এটি codebase-এ data model, API contract, component props, এবং reusable structure define করার জন্য ব্যাপকভাবে ব্যবহৃত হয়।

### Interface কেন গুরুত্বপূর্ণ

1. object structure স্পষ্ট হয়
2. ভুল property/ভুল type আগেই ধরা পড়ে
3. team collaboration-এ shared contract সহজ হয়
4. refactor তুলনামূলক নিরাপদ হয়
5. large-scale project-এ maintainability বৃদ্ধি পায়

### Basic Interface

```ts
interface User {
  id: number;
  name: string;
  isActive: boolean;
}

const u1: User = {
  id: 1,
  name: "Karim",
  isActive: true,
};
```

### Optional Properties

Optional property নির্দেশ করতে `?` ব্যবহার হয়।

```ts
interface Profile {
  name: string;
  bio?: string;
}

const p1: Profile = { name: "Rahim" };
const p2: Profile = { name: "Rahim", bio: "Frontend Developer" };
```

### Readonly Properties

`readonly` property একবার assign হওয়ার পরে পরিবর্তন করা যায় না।

```ts
interface Product {
  readonly id: number;
  title: string;
  price: number;
}

const book: Product = { id: 1, title: "Book", price: 120 };
// book.id = 2; // Error
```

### Function Types in Interface

Interface-এ method signature define করা যায়।

```ts
interface Logger {
  log(message: string): void;
}

const consoleLogger: Logger = {
  log(message) {
    console.log(message);
  },
};
```

### Index Signatures

Dynamic key/value structure-এর জন্য index signature ব্যবহার হয়।

```ts
interface StringMap {
  [key: string]: string;
}

const headers: StringMap = {
  "content-type": "application/json",
  "x-app": "ts",
};
```

### Interface Extension (Inheritance)

একটি interface অন্য interface extend করতে পারে।

```ts
interface Person {
  name: string;
}

interface Employee extends Person {
  employeeId: number;
}

const e1: Employee = { name: "Karim", employeeId: 1001 };
```

### Interface Merging

একই নামের interface বারবার declare করলে TypeScript সেগুলো merge করে।

```ts
interface Settings {
  theme: "light" | "dark";
}

interface Settings {
  language: "bn" | "en";
}

const s: Settings = { theme: "dark", language: "bn" };
```

এটি type alias-এর তুলনায় interface-এর একটি বিশেষ ক্ষমতা।

### Best Practices

1. domain model এবং API contract-এ interface ব্যবহার কার্যকর
2. optional property ব্যবহার করলে runtime default/validation চিন্তা করা প্রয়োজন
3. `readonly` সঠিকভাবে ব্যবহার করলে unintended mutation কমে
4. merging সুবিধা দরকার হলে interface ভালো পছন্দ

### সংক্ষিপ্ত সারাংশ

Interface TypeScript-এ object shape define করার সবচেয়ে প্রচলিত ও শক্তিশালী উপায়।  
সঠিকভাবে ব্যবহার করলে type safety, maintainability, এবং collaboration উল্লেখযোগ্যভাবে উন্নত হয়।

---

## ৫.২ Interface and type

TypeScript-এ `interface` এবং `type` দুটোই structure define করতে ব্যবহৃত হয়।  
তবে বাস্তবে দুটোর কিছু গুরুত্বপূর্ণ পার্থক্য রয়েছে।

### সাধারণ পার্থক্য

| বিষয়         | `interface`         | `type`                                                  |
| ------------ | ------------------- | ------------------------------------------------------- |
| মূল উদ্দেশ্য | object shape define | যেকোনো type define (union, intersection, tuple ইত্যাদি) |
| merging      | support করে         | support করে না                                          |
| extension    | `extends` দিয়ে সহজ  | intersection (`&`) দিয়ে                                 |
| union        | সরাসরি নয়           | খুব শক্তিশালী                                           |

### একই object structure: interface vs type

```ts
interface UserA {
  id: number;
  name: string;
}
```

```ts
type UserB = {
  id: number;
  name: string;
};
```

দুটোই valid, কিন্তু selection সাধারণত use-case অনুযায়ী করা হয়।

### Recommendation (Practical)

1. object model/contract হলে `interface`
2. union/intersection/utility-heavy type হলে `type`
3. library-style public API-তে consistency বজায় রাখা গুরুত্বপূর্ণ

### সংক্ষিপ্ত সারাংশ

Interface সাধারণত object contract-এর জন্য বেশি natural, আর type alias composition-heavy scenario-তে বেশি flexible।  
প্রকল্পে consistent convention বজায় রাখা সবচেয়ে গুরুত্বপূর্ণ।

---

## ৫.৩ Interface with class

Class নির্দিষ্ট interface implement করতে পারে, অর্থাৎ interface-এর contract পূরণ করা বাধ্যতামূলক হয়।

### Basic Example

```ts
interface Serializable {
  serialize(): string;
}

class User implements Serializable {
  constructor(
    private id: number,
    private name: string,
  ) {}

  serialize(): string {
    return JSON.stringify({ id: this.id, name: this.name });
  }
}
```

এখানে `User` class-কে `serialize()` method implement করতে হয়েছে।

### Multiple Interfaces Implement

```ts
interface HasId {
  id: number;
}

interface HasName {
  name: string;
}

class Member implements HasId, HasName {
  constructor(
    public id: number,
    public name: string,
  ) {}
}
```

### Interface for Constructor Signature

Class constructor signature enforce করতে interface ব্যবহার করা যায়।

```ts
interface UserCtor {
  new (name: string): { name: string };
}

class BasicUser {
  constructor(public name: string) {}
}

function createUser(ctor: UserCtor, name: string) {
  return new ctor(name);
}

const u = createUser(BasicUser, "Karim");
```

### Best Practices

1. service/repository pattern-এ class + interface composition অত্যন্ত কার্যকর
2. implement করা interface contract stable থাকলে refactor সহজ হয়
3. constructor signature interface pattern প্রয়োজন অনুযায়ী ব্যবহার করা উচিত

### সংক্ষিপ্ত সারাংশ

Interface + Class ব্যবহার করলে structured OOP design এবং strong contract-driven implementation পাওয়া যায়।  
এটি large codebase-এ dependency decoupling এবং testability বৃদ্ধিতে সহায়তা করে।

---

## ৫.৪ Interface with conditional type

Conditional type হলো advanced typing feature: condition অনুযায়ী type নির্বাচন করা হয়।  
Interface সাধারণত object structure define করে, এবং conditional type-এর সাথে interface-ভিত্তিক structure compose করা যায়।

### Basic Conditional Type

```ts
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
```

### Interface + Conditional Composition Example

```ts
interface ApiSuccess<T> {
  ok: true;
  data: T;
}

interface ApiFailure {
  ok: false;
  error: string;
}

type ApiResult<T> = T extends null | undefined ? ApiFailure : ApiSuccess<NonNullable<T>>;
```

ব্যাখ্যা:

- `T` যদি `null/undefined` হয়, তাহলে failure shape
- অন্যথায় success shape

### Practical Pattern: Keys Based Return Type

```ts
interface User {
  id: number;
  name: string;
  active: boolean;
}

type ValueOf<T, K extends keyof T> = K extends keyof T ? T[K] : never;

type UserName = ValueOf<User, "name">; // string
```

### Best Practices

1. conditional type ব্যবহার করলে readability বজায় রাখতে naming পরিষ্কার রাখা প্রয়োজন
2. public API-তে অতিরিক্ত complex conditional type কম ব্যবহার করা উত্তম
3. interface-based response shape + conditional selection pattern বাস্তবসম্মত

### সংক্ষিপ্ত সারাংশ

Interface এবং conditional type একসাথে ব্যবহার করলে flexible এবং type-safe model composition সম্ভব হয়।  
বিশেষ করে API response, utility typing, এবং generic helper design-এ এটি কার্যকর।

---

## ৫.৫ Hybrid types

Hybrid type বলতে এমন structure বোঝায়, যেখানে একটি value একইসাথে **callable** (function) এবং **object-like** (property/method) আচরণ করতে পারে।  
এটি সাধারণত library API design বা function-object pattern-এ ব্যবহৃত হয়।

### Hybrid Type Example

```ts
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function createCounter(): Counter {
  const counter = ((start: number) => `Counter started at ${start}`) as Counter;
  counter.interval = 1;
  counter.reset = () => {
    // reset logic placeholder
  };
  return counter;
}

const c = createCounter();
console.log(c(10));
c.reset();
console.log(c.interval);
```

এখানে `c`:

- function-এর মতো call করা যায় (`c(10)`)
- property আছে (`c.interval`)
- method আছে (`c.reset()`)

### Hybrid Types কোথায় কাজে লাগে

1. plugin-style API design
2. configurable callable utility (function with options)
3. function-object composition pattern

### সতর্কতা

1. বেশি hybrid design readability কমাতে পারে
2. application code-এ সীমিত ব্যবহার ভালো, library layer-এ বেশি দেখা যায়
3. runtime implementation এবং type definition consistency নিশ্চিত করা প্রয়োজন

### Best Practices

1. hybrid type প্রয়োগের আগে API simplicity বিবেচনা করা প্রয়োজন
2. hybrid interface-এ naming ও contract পরিষ্কার রাখা উত্তম
3. internal implementation test করে contract অনুযায়ী stable রাখা উচিত

### সংক্ষিপ্ত সারাংশ

Hybrid Types TypeScript-এর একটি advanced pattern, যা function এবং object behavior একত্রে প্রকাশ করতে সক্ষম।  
সঠিক প্রয়োগে powerful API design সম্ভব হয়, তবে অতিরিক্ত ব্যবহার complexity বাড়াতে পারে।

---

## অধ্যায় ৫ সারসংক্ষেপ

এই অধ্যায়ে আমরা শিখলাম:

1. interface দিয়ে object contract এবং API shape define করা  
2. interface বনাম type এবং class-এর সাথে interface ব্যবহার  
3. conditional/hybrid interface pattern দিয়ে advanced modeling  

Interface-centric design team-based codebase-এ consistency এবং maintainability অনেক উন্নত করে।

---

## অনুশীলনী (Practice)

1. `UserProfile` interface তৈরি করে class-এ implement করো  
2. একই data model type alias এবং interface—দুইভাবে লিখে পার্থক্য দেখো  
3. hybrid type style callable object utility তৈরি করো  
4. optional ও readonly property সহ reusable interface design করো  

---

## References

- [TypeScript Handbook - Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)
- [TypeScript Handbook - Type Compatibility](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)
- [TypeScript Handbook - Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
