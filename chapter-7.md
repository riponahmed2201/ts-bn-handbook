## সূচিপত্র

অধ্যায় ৭: TypeScript Generics

7.1 Generics  
7.2 Generic Types  
7.3 Generic Functions  
7.4 Generics (Advanced Reuse)  
7.5 Generic Constraints  
7.6 Interface with Generic  
7.7 Generic with Class  
7.8 Generic Object Types

## অধ্যায় ৭: TypeScript Generics

## ৭.১ Generics

Generics হলো TypeScript-এর এমন একটি শক্তিশালী feature, যার মাধ্যমে আমরা **reusable** কিন্তু একই সাথে **type-safe** code লিখতে পারি।

সহজভাবে বললে, generic হলো "placeholder type"।  
আজ `string`, কাল `number`, আরেক জায়গায় custom object—একই logic বারবার না লিখে generic type parameter ব্যবহার করে সব ক্ষেত্রে type safety বজায় রাখা যায়।

### Generics কেন দরকার?

Generics না থাকলে সাধারণত দুই ধরনের সমস্যা হয়:

1. **`any` ব্যবহার** করে type safety হারিয়ে যায়  
2. **same logic multiple type-এর জন্য copy-paste** করতে হয়

উদাহরণ (generic ছাড়া):

```ts
function echoString(value: string): string {
  return value;
}

function echoNumber(value: number): number {
  return value;
}
```

একই কাজের জন্য আলাদা function লিখতে হচ্ছে।  
Generics ব্যবহার করলে:

```ts
function echo<T>(value: T): T {
  return value;
}

const a = echo<string>("hello");
const b = echo<number>(123);
```

এখন একটি function-ই multiple type handle করছে।

### Generic Type Parameter (`<T>`) কী?

`T` সাধারণত "Type" বোঝাতে convention হিসেবে ব্যবহার করা হয়।  
তবে `T`-এর বদলে `Value`, `Item`, `TData`, `TResult` ইত্যাদি meaningful নামও দেওয়া যায়।

```ts
function identity<T>(arg: T): T {
  return arg;
}
```

এখানে:

- input type = `T`
- return type = `T`
- compiler call site থেকে `T` infer করে

### Type Inference সহ Generic Call

সবসময় explicit type দিতে হয় না:

```ts
const text = identity("TypeScript"); // T = string (inferred)
const count = identity(100); // T = number (inferred)
```

### Explicit Type Argument সহ Call

চাইলে type manually specify করা যায়:

```ts
const userId = identity<number>(5001);
```

### Generics ব্যবহারের মূল সুবিধা

1. code reuse বাড়ে  
2. type safety বজায় থাকে  
3. auto-completion ও IDE support ভালো হয়  
4. refactor করার সময় bug কম হয়  

### সাধারণ ভুল

1. যেখানে generic দরকার নেই, সেখানে অযথা generic ব্যবহার  
2. `any` দিয়ে generic এর সুবিধা নষ্ট করা  
3. unclear type parameter name (`T1`, `T2`, `X`) ব্যবহার করে readability কমানো  

### সংক্ষিপ্ত সারাংশ

Generics TypeScript-এর core scalability feature।  
এটি একই logic বিভিন্ন type-এর সাথে type-safe ভাবে reuse করতে সাহায্য করে, যা medium/large project-এ maintainability অনেক বাড়ায়।

---

## ৭.২ Generic Types

Generic শুধু function-এ নয়, type alias, interface, class—সব জায়গায় ব্যবহার করা যায়।  
এই section-এ Generic Types বলতে type-level generic design বোঝানো হয়েছে।

### Generic Type Alias

```ts
type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

type User = {
  id: number;
  name: string;
};

const userResponse: ApiResponse<User> = {
  success: true,
  data: { id: 1, name: "Rahim" }
};
```

এখানে `ApiResponse<T>` একই response structure রেখে data type পরিবর্তন করতে পারে।

### Multiple Type Parameters

একটির বেশি type parameter ব্যবহার করা যায়:

```ts
type Pair<K, V> = {
  key: K;
  value: V;
};

const p1: Pair<string, number> = { key: "age", value: 25 };
const p2: Pair<number, string> = { key: 1, value: "one" };
```

### Generic Type with Union/Composition

```ts
type WithMeta<T> = T & {
  createdAt: Date;
  updatedAt: Date;
};

type Product = { id: number; title: string };
type ProductWithMeta = WithMeta<Product>;
```

### Generic Type Default Parameter

Default type parameter দিলে API ব্যবহার সহজ হয়:

```ts
type Result<T = string> = {
  ok: boolean;
  value: T;
};

const r1: Result = { ok: true, value: "done" }; // T defaults to string
const r2: Result<number> = { ok: true, value: 200 };
```

### Type-safe Dictionary Pattern

```ts
type Dictionary<T> = {
  [key: string]: T;
};

const scoreMap: Dictionary<number> = {
  rahim: 88,
  karim: 93
};
```

### সংক্ষিপ্ত সারাংশ

Generic types ব্যবহার করলে common data shape একবার define করে বিভিন্ন specific type-এর জন্য clean এবং reusable type system তৈরি করা যায়।

---

## ৭.৩ Generic Functions

Generic function হলো function-level type abstraction।  
এটি function signature-কে reusable করে, কিন্তু input/output type relation বজায় রাখে।

### Basic Identity Function

```ts
function identity<T>(value: T): T {
  return value;
}
```

এটি generic function-এর canonical example।

### Array Generic Function

```ts
function firstItem<T>(items: T[]): T | undefined {
  return items[0];
}

const firstName = firstItem(["A", "B", "C"]); // string | undefined
const firstNum = firstItem([10, 20, 30]); // number | undefined
```

### Multiple Generic Parameters

```ts
function merge<A, B>(a: A, b: B): A & B {
  return { ...a, ...b };
}

const merged = merge({ name: "Rahim" }, { age: 25 });
// type: { name: string } & { age: number }
```

### Generic with Callback

```ts
function mapArray<T, U>(arr: T[], mapper: (item: T) => U): U[] {
  return arr.map(mapper);
}

const lengths = mapArray(["ts", "js", "go"], (s) => s.length);
// number[]
```

### Generic Function Overload (প্রয়োজনে)

```ts
function toArray<T>(value: T): T[];
function toArray<T>(value: T[]): T[];
function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}
```

### Real-world Example: API fetch helper

```ts
async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return (await res.json()) as T;
}
```

এখানে `T` caller-defined response shape দেয়, ফলে downstream code-এ strong type পাওয়া যায়।

### সাধারণ ভুল

1. generic function লিখে return type-এ relation না রাখা  
2. overly broad generic লিখে actual validation বাদ দেওয়া  
3. runtime validation ছাড়াই blind type assertion (`as T`) বেশি ব্যবহার  

### সংক্ষিপ্ত সারাংশ

Generic functions reusable business logic-এর সাথে precise typing দিতে পারে।  
Input-output relation enforce করার জন্য এটি TypeScript-এর সবচেয়ে বেশি ব্যবহার হওয়া featureগুলোর একটি।

---

## ৭.৪ Generics (Advanced Reuse)

Roadmap-এ "Generics" পুনরায় এসেছে। এই অংশে advanced generic usage কভার করা হলো, যাতে generic চিন্তাভাবনা practical architecture-এ ব্যবহার করা যায়।

### Generic Utility Pattern: `pluck`

```ts
function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Nila", isActive: true };
const userName = pluck(user, "name"); // string
```

এখানে generic + `keyof` + indexed access type একসাথে কাজ করছে।

### Generic Factory Pattern

```ts
function createState<T>(initial: T) {
  let value = initial;
  return {
    get: () => value,
    set: (next: T) => {
      value = next;
    }
  };
}

const numberState = createState(0);
numberState.set(10);
// numberState.set("10"); // Error
```

### Generic with Conditional Return Shape

```ts
type Wrap<T> = T extends string ? { text: T } : { value: T };

const a: Wrap<string> = { text: "hello" };
const b: Wrap<number> = { value: 42 };
```

### Generic Design Guideline

1. relation থাকলে generic ব্যবহার  
2. relation না থাকলে simple union/type alias ব্যবহার  
3. type parameter name meaningful করা  
4. public API generic হলে docs/example দেওয়া  

### সংক্ষিপ্ত সারাংশ

Advanced generic usage codebase-এ abstraction quality বাড়ায়।  
তবে complexity বাড়ে, তাই generic design-এ readability, naming, এবং explicit intent খুব গুরুত্বপূর্ণ।

---

## ৭.৫ Generic Constraints

Generic constraints ব্যবহার করা হয় generic type parameter-এর উপর শর্ত বসাতে।  
অর্থাৎ, "যেকোনো type" না নিয়ে "কিছু নির্দিষ্ট rule follow করা type" নেওয়া হয়।

### `extends` দিয়ে constraint

```ts
function printLength<T extends { length: number }>(value: T): number {
  return value.length;
}

printLength("hello"); // 5
printLength([1, 2, 3]); // 3
// printLength(100); // Error
```

এখানে `T`-তে অবশ্যই `length` property থাকতে হবে।

### Constraint with Interface

```ts
interface Identifiable {
  id: number;
}

function getId<T extends Identifiable>(item: T): number {
  return item.id;
}
```

### `keyof` Constraint

```ts
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const book = { title: "TS Handbook", pages: 300 };
const pages = getProp(book, "pages"); // number
// getProp(book, "price"); // Error
```

### Multiple Constraints

```ts
type Named = { name: string };
type Timed = { createdAt: Date };

function formatItem<T extends Named & Timed>(item: T): string {
  return `${item.name} - ${item.createdAt.toISOString()}`;
}
```

### Generic Constraint কেন গুরুত্বপূর্ণ?

1. compile-time misuse কমে  
2. autocomplete আরও নির্ভুল হয়  
3. helper function contract পরিষ্কার হয়  
4. runtime bug হওয়ার সম্ভাবনা কমে  

### সংক্ষিপ্ত সারাংশ

Constraints generic-কে "safe boundary" দেয়।  
এতে generic function/type flexible থাকে, কিন্তু fully unbounded না হওয়ায় correctness বাড়ে।

---

## ৭.৬ Interface with Generic

Generic interface ব্যবহার করে dynamic shape-এর contract define করা যায়।  
একই interface বিভিন্ন data model-এ reuse করা সম্ভব হয়।

### Basic Generic Interface

```ts
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 100 };
const stringBox: Box<string> = { value: "TypeScript" };
```

### API Response Interface

```ts
interface ApiResult<T> {
  ok: boolean;
  data: T;
  error?: string;
}

interface User {
  id: number;
  name: string;
}

const userResult: ApiResult<User> = {
  ok: true,
  data: { id: 1, name: "Asha" }
};
```

### Generic Interface with Methods

```ts
interface Repository<T> {
  getAll(): T[];
  getById(id: number): T | undefined;
  add(item: T): void;
}

type Product = { id: number; title: string };

class ProductRepo implements Repository<Product> {
  private items: Product[] = [];

  getAll(): Product[] {
    return this.items;
  }

  getById(id: number): Product | undefined {
    return this.items.find((p) => p.id === id);
  }

  add(item: Product): void {
    this.items.push(item);
  }
}
```

### Generic Interface Extending

```ts
interface Pagination {
  page: number;
  limit: number;
}

interface PaginatedResponse<T> extends Pagination {
  items: T[];
  total: number;
}
```

### সংক্ষিপ্ত সারাংশ

Generic interface contract-first architecture-এ খুব কার্যকর।  
Data model বদলালেও interface structure একই রেখে implementation consistency বজায় রাখা যায়।

---

## ৭.৭ Generic with Class

Generic class দিয়ে class-level state এবং method-এ type parameter share করা যায়।  
একই class structure বিভিন্ন data type-এর সাথে type-safe ভাবে কাজ করতে পারে।

### Basic Generic Class

```ts
class DataStore<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }
}

const stringStore = new DataStore<string>();
stringStore.add("TS");
// stringStore.add(10); // Error
```

### Generic Class with Constraint

```ts
interface HasId {
  id: number;
}

class EntityStore<T extends HasId> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  findById(id: number): T | undefined {
    return this.items.find((item) => item.id === id);
  }
}

type User = { id: number; name: string };
const userStore = new EntityStore<User>();
```

### Generic Class + Default Type

```ts
class ResponseHolder<T = string> {
  constructor(public data: T) {}
}

const defaultResponse = new ResponseHolder("ok"); // T = string
const numericResponse = new ResponseHolder<number>(200);
```

### Static member নিয়ে নোট

Generic class-এর static member সরাসরি class type parameter `T` ব্যবহার করতে পারে না, কারণ static scope class instance-level type parameter share করে না।

### সংক্ষিপ্ত সারাংশ

Generic class reusable domain abstraction তৈরি করতে সাহায্য করে।  
Repository/store/cache/service layer-এ generic class ব্যবহার করলে strongly typed reusable architecture পাওয়া যায়।

---

## ৭.৮ Generic Object Types

Generic object type মানে object-এর property structure generic parameter দিয়ে dynamic করা।  
এটি typed config, form model, response envelope, map-like object ইত্যাদিতে খুব বেশি ব্যবহৃত হয়।

### Generic Object Wrapper

```ts
type Wrapper<T> = {
  payload: T;
  timestamp: number;
};

const w1: Wrapper<string> = { payload: "done", timestamp: Date.now() };
const w2: Wrapper<{ id: number }> = {
  payload: { id: 10 },
  timestamp: Date.now()
};
```

### Key-Value Generic Object

```ts
type RecordMap<K extends string | number | symbol, V> = {
  [P in K]: V;
};

type Settings = RecordMap<"theme" | "lang", string>;

const appSettings: Settings = {
  theme: "dark",
  lang: "bn"
};
```

### Generic Object with Optional/Readonly Transform

```ts
type PartialData<T> = {
  [K in keyof T]?: T[K];
};

type ReadonlyData<T> = {
  readonly [K in keyof T]: T[K];
};

type Profile = { id: number; name: string; email: string };

const patch: PartialData<Profile> = { name: "Updated Name" };
const fixed: ReadonlyData<Profile> = { id: 1, name: "A", email: "a@mail.com" };
```

### Nested Generic Object Example

```ts
type Paginated<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
};

type User = { id: number; name: string };

const pagedUsers: Paginated<User> = {
  items: [
    { id: 1, name: "Rahim" },
    { id: 2, name: "Karim" }
  ],
  page: 1,
  pageSize: 10,
  total: 2
};
```

### Generic Object Types কোথায় বেশি কাজে লাগে

1. API response standardization  
2. form state model  
3. cache layer data envelope  
4. reusable DTO design  
5. typed config maps  

### Best Practices

1. generic object naming domain অনুযায়ী রাখো (`ApiResponse<T>`, `Paginated<T>`)  
2. প্রয়োজন হলে constraints দাও (`K extends keyof T`)  
3. excessive nesting এড়াও; readability কমে গেলে type split করো  
4. mapped type ব্যবহার করলে উদাহরণসহ রাখা ভালো  

### সংক্ষিপ্ত সারাংশ

Generic object types complex typed data model সহজে express করতে দেয়।  
এটি scalable type architecture তৈরির জন্য TypeScript-এর সবচেয়ে practical componentগুলোর একটি।

---

## অধ্যায় ৭ সারসংক্ষেপ

এই অধ্যায়ে আমরা দেখলাম:

1. generic-এর মূল ধারণা ও প্রয়োজনীয়তা  
2. generic type alias/interface/class/function design  
3. constraints দিয়ে generic safety বাড়ানো  
4. object-centric generic pattern দিয়ে real-world model তৈরি  

TypeScript-এ generics ঠিকভাবে আয়ত্ত করতে পারলে reusable code লিখেও strict typing বজায় রাখা যায়।  
এটি professional codebase-এ maintainability, consistency, এবং long-term refactor safety উল্লেখযোগ্যভাবে উন্নত করে।

---

## References

- [TypeScript Handbook - Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [TypeScript Handbook - Creating Types from Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
- [TypeScript Handbook - Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [TypeScript Handbook - Keyof Type Operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)
- [TypeScript Handbook - Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
