## সূচিপত্র

অধ্যায় ৪: TypeScript Functions

4.1 TypeScript Functions
4.2 Rest Parameters
4.3 Function Overloading
4.4 Arrow/Lambda Functions
4.5 Higher-Order Functions
4.6 Anonymous Functions
4.7 TypeScript Function

# অধ্যায় ৪: TypeScript Functions

## ৪.১ TypeScript Functions

TypeScript-এ Function হলো reusable code block, যা নির্দিষ্ট input (parameter) গ্রহণ করে এবং নির্দিষ্ট output (return value) প্রদান করে।  
JavaScript-এর মতোই Function ব্যবহার করা হয়, তবে TypeScript-এ type annotation যুক্ত থাকায় function behavior আরও স্পষ্ট, নিরাপদ এবং maintainable হয়।

### Function কেন গুরুত্বপূর্ণ

Function programming structure-এর মৌলিক ভিত্তি।  
TypeScript-এ function typing ব্যবহারের ফলে নিচের সুবিধা পাওয়া যায়:

1. invalid argument আগেই ধরা পড়ে
2. return type predictable থাকে
3. API contract স্পষ্ট হয়
4. refactor তুলনামূলক নিরাপদ হয়
5. বড় codebase-এ readability বৃদ্ধি পায়

### Basic Function Syntax

TypeScript function-এর সাধারণ syntax:

```ts
function functionName(param1: Type, param2: Type): ReturnType {
  // logic
  return value;
}
```

উদাহরণ:

```ts
function add(a: number, b: number): number {
  return a + b;
}

const result = add(10, 20);
console.log(result); // 30
```

### Parameter Type Annotation

Function parameter-এ type annotation দিলে TypeScript ভুল argument ধরতে পারে।

```ts
function greet(name: string): string {
  return `Hello, ${name}`;
}

greet("Karim"); // valid
// greet(123);  // Error
```

### Return Type Annotation

Return type annotation function output contract নির্ধারণ করে।

```ts
function getDiscount(price: number): number {
  return price * 0.1;
}
```

Return type না লিখলেও TypeScript অনেক সময় infer করে, তবে public function-এ explicit return type দেওয়া ভালো practice।

### Optional Parameters

কিছু parameter বাধ্যতামূলক না হলে `?` ব্যবহার করা হয়।

```ts
function buildName(firstName: string, lastName?: string): string {
  if (lastName) {
    return `${firstName} ${lastName}`;
  }
  return firstName;
}

console.log(buildName("Rahim")); // Rahim
console.log(buildName("Rahim", "Hasan")); // Rahim Hasan
```

### Default Parameters

Parameter-এর default value দিলে argument না দিলেও function কাজ করে।

```ts
function createMessage(message: string, prefix: string = "Info"): string {
  return `[${prefix}] ${message}`;
}

console.log(createMessage("System started")); // [Info] System started
console.log(createMessage("Disk full", "Warning")); // [Warning] Disk full
```

### Function Type as Variable

TypeScript-এ function type variable-এ assign করা যায়।

```ts
let operation: (x: number, y: number) => number;

operation = function (x, y) {
  return x + y;
};

console.log(operation(5, 3)); // 8
```

এটি callback contract enforce করতে সহায়তা করে।

### Void এবং Never Return Type

#### `void`

যে function কোনো meaningful value return করে না:

```ts
function logMessage(message: string): void {
  console.log(message);
}
```

#### `never`

যে function কখনো স্বাভাবিকভাবে return করে না (যেমন error throw করে বা infinite loop চালায়):

```ts
function throwError(message: string): never {
  throw new Error(message);
}
```

### Union Type সহ Function

Function parameter-এ union type ব্যবহার করলে flexible input নেওয়া যায়।

```ts
function formatId(id: string | number): string {
  if (typeof id === "string") {
    return id.toUpperCase();
  }
  return `ID-${id}`;
}
```

### Function Overload (সংক্ষিপ্ত পরিচিতি)

একই function-এর জন্য একাধিক call signature define করাকে overload বলা হয়।

```ts
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;
function combine(a: string | number, b: string | number): string | number {
  if (typeof a === "string" && typeof b === "string") {
    return a + b;
  }
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  }
  throw new Error("Invalid arguments");
}
```

### Arrow Function in TypeScript

Arrow function-এও type annotation দেওয়া যায়।

```ts
const multiply = (a: number, b: number): number => {
  return a * b;
};

const square = (n: number): number => n * n;
```

### Callback Function Typing

Higher-order function-এ callback type define করা গুরুত্বপূর্ণ।

```ts
function processValues(
  values: number[],
  callback: (value: number) => number,
): number[] {
  return values.map(callback);
}

const doubled = processValues([1, 2, 3], (v) => v * 2);
console.log(doubled); // [2, 4, 6]
```

### বাস্তব Use Case: API Response Formatter

```ts
type User = {
  id: number;
  name: string;
  email?: string;
};

function formatUser(user: User): string {
  const emailText = user.email ? user.email : "No Email";
  return `${user.id} | ${user.name} | ${emailText}`;
}

const u1: User = { id: 1, name: "Karim" };
console.log(formatUser(u1)); // 1 | Karim | No Email
```

এখানে function typing-এর মাধ্যমে object contract enforce করা হয়েছে।

### TypeScript Function লেখার সাধারণ ভুল

1. return type mismatch রেখে দেওয়া
2. callback type না দিয়ে `any` নির্ভরতা বাড়ানো
3. optional parameter-এর position ভুল রাখা
4. overloaded signature ও implementation signature mismatch করা
5. union type narrow না করে type-specific method call করা

### Best Practices

1. public function-এ explicit return type ব্যবহার করা উচিত
2. parameter naming domain অনুযায়ী অর্থবহ হওয়া প্রয়োজন
3. callback function type স্পষ্টভাবে define করা উত্তম
4. optional/default parameter সচেতনভাবে ব্যবহার করা উচিত
5. complex function signature হলে `type` alias বা interface ব্যবহার করে readability বাড়ানো উচিত

### সংক্ষিপ্ত সারাংশ

TypeScript Functions typed programming-এর কেন্দ্রীয় অংশ।  
সঠিক parameter typing, return typing, callback contract, এবং narrowing কৌশল ব্যবহার করলে function logic আরও নিরাপদ, predictable এবং scalable হয়।

## ৪.২ Rest Parameters

Rest Parameter ব্যবহার করা হয় যখন function-এ argument সংখ্যার আগাম নির্দিষ্টতা থাকে না।  
এই ক্ষেত্রে `...` syntax ব্যবহার করে একাধিক argument-কে একটি array আকারে সংগ্রহ করা হয়।

### Rest Parameter Syntax

```ts
function functionName(...paramName: Type[]): ReturnType {
  // logic
}
```

উদাহরণ:

```ts
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(10, 20)); // 30
console.log(sum(10, 20, 30, 40)); // 100
```

এখানে `numbers` হলো `number[]` array।

### Rest Parameter কেন প্রয়োজন

1. variable-length input handle করা যায়
2. function call flexible হয়
3. helper utility function তৈরি সহজ হয়
4. repeated overload signature কমানো যায়

### Rest Parameter-এর অবস্থান

Rest Parameter সবসময় parameter list-এর **শেষে** থাকতে হবে।

সঠিক:

```ts
function log(level: string, ...messages: string[]): void {
  console.log(level, messages.join(" | "));
}
```

ভুল:

```ts
// function invalid(...items: string[], level: string) {} // Error
```

### Rest Parameters with Tuple Types

কিছু ক্ষেত্রে variable input-এর সাথে structured typing প্রয়োজন হয়।  
Tuple rest এর মাধ্যমে তা করা যায়।

```ts
function formatUser(
  ...args: [id: number, name: string, active: boolean]
): string {
  const [id, name, active] = args;
  return `${id} - ${name} - ${active ? "Active" : "Inactive"}`;
}

console.log(formatUser(1, "Karim", true));
```

### Rest Parameter বনাম Normal Array Parameter

| বিষয়              | Rest Parameter         | Normal Array Parameter  |
| ----------------- | ---------------------- | ----------------------- |
| call style        | `fn(1, 2, 3)`          | `fn([1, 2, 3])`         |
| input flexibility | variable argument list | explicit array argument |
| declaration       | `...items: T[]`        | `items: T[]`            |

### Rest এবং Spread-এর সম্পর্ক

- **Rest:** arguments collect করে
- **Spread:** array/object expand করে

```ts
function multiplyAll(multiplier: number, ...values: number[]): number[] {
  return values.map((v) => v * multiplier);
}

const nums = [2, 4, 6];
const result = multiplyAll(3, ...nums); // spread দিয়ে values পাঠানো
console.log(result); // [6, 12, 18]
```

### Practical Use Case: Dynamic Tags Builder

```ts
function buildTags(prefix: string, ...tags: string[]): string {
  return tags.map((tag) => `${prefix}-${tag}`).join(", ");
}

console.log(buildTags("ts", "types", "functions", "rest"));
// ts-types, ts-functions, ts-rest
```

### সাধারণ ভুল

1. rest parameter list-এর শেষে না রাখা
2. rest type annotation বাদ দেওয়া
3. `any[]` দিয়ে overly broad typing করা
4. rest আর spread-এর ভূমিকা গুলিয়ে ফেলা

### Best Practices

1. variable argument function-এ rest parameter ব্যবহার করা উচিত
2. rest parameter type যতটা সম্ভব নির্দিষ্ট রাখা প্রয়োজন
3. large public API-তে rest signature documentation পরিষ্কার রাখা উচিত
4. প্রয়োজন হলে tuple rest ব্যবহার করে positional contract enforce করা উত্তম

### সংক্ষিপ্ত সারাংশ

Rest Parameters TypeScript function-এ flexible argument handling-এর একটি কার্যকর কৌশল।  
সঠিক typing এবং parameter design অনুসরণ করলে function call expressive হয় এবং API contract আরও maintainable হয়।

## ৪.৩ Function Overloading

Function Overloading হলো এমন একটি কৌশল, যেখানে একই function name-এর জন্য একাধিক call signature ঘোষণা করা হয়।  
এতে function বিভিন্ন ধরনের input গ্রহণ করতে পারে, কিন্তু caller-side type safety বজায় থাকে।

### Function Overloading কেন প্রয়োজন

1. একই কাজের জন্য multiple input format support করা যায়
2. API usage developer-friendly হয়
3. type-safe polymorphic behavior পাওয়া যায়
4. `any` নির্ভরতা কমে

### Overload Structure

TypeScript overload সাধারণত তিনটি স্তরে লেখা হয়:

1. একাধিক overload signature
2. একটি implementation signature
3. implementation body

```ts
function fn(a: string): string;
function fn(a: number): number;
function fn(a: string | number): string | number {
  // implementation
}
```

### Basic Example

```ts
function double(value: number): number;
function double(value: string): string;
function double(value: number | string): number | string {
  if (typeof value === "number") {
    return value * 2;
  }

  return value + value;
}

console.log(double(5)); // 10
console.log(double("Hi")); // HiHi
```

এখানে caller input অনুযায়ী return type নির্ধারিত হয়।

### বাস্তব Use Case: Search Function

```ts
type User = { id: number; name: string };

function findUser(id: number): User | undefined;
function findUser(name: string): User | undefined;
function findUser(query: number | string): User | undefined {
  const users: User[] = [
    { id: 1, name: "Karim" },
    { id: 2, name: "Rahim" },
  ];

  if (typeof query === "number") {
    return users.find((u) => u.id === query);
  }

  return users.find((u) => u.name === query);
}
```

এই pattern repository/service layer-এ বহুল ব্যবহৃত।

### Overload Signature বনাম Implementation Signature

- Overload signatures caller-এর কাছে visible contract
- Implementation signature internal logic handle করে
- Implementation signature-কে সব overload case cover করতে হয়

### Overloading বনাম Union Parameter

| বিষয়                         | Function Overloading | Union Parameter    |
| ---------------------------- | -------------------- | ------------------ |
| caller-side return precision | বেশি                 | অনেক ক্ষেত্রে কম   |
| declaration style            | multiple signatures  | single signature   |
| complexity                   | তুলনামূলক বেশি       | তুলনামূলক কম       |
| best use case                | polymorphic API      | simple mixed input |

### গুরুত্বপূর্ণ নিয়ম

1. overload signatures-এ implementation body থাকে না
2. implementation signature সাধারণত broader type নেয়
3. overload order নির্দিষ্টতা অনুযায়ী রাখা উত্তম (specific আগে)
4. implementation branch-এ type narrowing আবশ্যক

### সাধারণ ভুল

1. overload signature এবং implementation return mismatch
2. broad implementation type দিয়ে invalid call অনুমোদন করে ফেলা
3. overload না লিখে সবকিছু `any` দিয়ে handle করা
4. এমন overload লেখা যা পরস্পরের সাথে ambiguous

### Best Practices

1. public API-তে overload ব্যবহার করলে signature documentation পরিষ্কার রাখা উচিত
2. overload count প্রয়োজনের অতিরিক্ত বাড়ানো উচিত নয়
3. সরল case-এ union parameter ব্যবহার করে complexity কমানো যায়
4. implementation-এ exhaustive narrowing রাখা প্রয়োজন

### সংক্ষিপ্ত সারাংশ

Function Overloading TypeScript-এ একই function-এর জন্য একাধিক typed usage pattern প্রদান করে।  
সঠিকভাবে প্রয়োগ করলে API expressiveness, type safety, এবং developer experience উল্লেখযোগ্যভাবে উন্নত হয়।

## ৪.৪ Arrow/Lambda Functions

Arrow Function (অনেক ক্ষেত্রে Lambda Function নামেও পরিচিত) হলো function লেখার একটি concise syntax।  
TypeScript-এ arrow function ব্যবহার করলে parameter, return type, callback contract এবং lexical `this` behavior আরও স্পষ্টভাবে নিয়ন্ত্রণ করা যায়।

### Arrow Function Syntax

```ts
const functionName = (param1: Type, param2: Type): ReturnType => {
  return value;
};
```

এক লাইনের function:

```ts
const square = (n: number): number => n * n;
```

### Arrow Function বনাম Regular Function

| বিষয়                       | Arrow Function | Regular Function          |
| -------------------------- | -------------- | ------------------------- |
| syntax                     | concise        | তুলনামূলক verbose         |
| `this` binding             | lexical        | dynamic/context-dependent |
| constructor হিসেবে ব্যবহার | সম্ভব নয়       | সম্ভব                     |
| callback use-case          | খুব উপযোগী     | উপযোগী                    |

### Type Annotation in Arrow Function

```ts
const add = (a: number, b: number): number => {
  return a + b;
};
```

Parameter type এবং return type উভয়ই স্পষ্টভাবে define করা হয়েছে।

### Type Inference with Arrow Function

TypeScript অনেক ক্ষেত্রে return type infer করতে পারে:

```ts
const toUpper = (text: string) => text.toUpperCase();
// inferred return type: string
```

public API বা complex function-এ explicit return type ব্যবহার করা অধিক নির্ভরযোগ্য।

### Callback-এ Arrow Function ব্যবহার

Arrow function callback context-এ অত্যন্ত জনপ্রিয়:

```ts
const numbers = [1, 2, 3, 4];
const doubled = numbers.map((n: number): number => n * 2);

console.log(doubled); // [2, 4, 6, 8]
```

### Lexical `this` Behavior

Arrow function নিজস্ব `this` তৈরি করে না; surrounding scope-এর `this` ব্যবহার করে।

```ts
class Counter {
  count = 0;

  increment = (): void => {
    this.count++;
  };
}
```

Class method callback scenario-তে এটি context-loss সমস্যা কমায়।

### Generic Arrow Function

Arrow function-এর সাথেও generics ব্যবহার করা যায়:

```ts
const identity = <T>(value: T): T => value;

const n = identity<number>(10);
const s = identity<string>("TypeScript");
```

### Function Type Alias সহ Arrow Function

```ts
type MathOperation = (x: number, y: number) => number;

const subtract: MathOperation = (x, y) => x - y;
const multiply: MathOperation = (x, y) => x * y;
```

এটি reusable function contract তৈরির জন্য কার্যকর।

### বাস্তব Use Case: Sorting Helper

```ts
type Product = {
  name: string;
  price: number;
};

const products: Product[] = [
  { name: "Pen", price: 20 },
  { name: "Book", price: 120 },
  { name: "Bag", price: 950 },
];

const sorted = [...products].sort((a, b) => a.price - b.price);
console.log(sorted);
```

Arrow callback দিয়ে concise comparator logic লেখা হয়েছে।

### সাধারণ ভুল

1. object literal return করতে bracket ভুলে যাওয়া
2. complex logic one-liner-এ লিখে readability কমানো
3. `this` আচরণ না বুঝে regular function-এর সাথে মিশ্র ব্যবহার
4. function type contract না দিয়ে implicit `any` তৈরি হওয়া

### Best Practices

1. callback এবং short utility function-এ arrow function অগ্রাধিকার দেওয়া উচিত
2. public/core function-এ return type explicit রাখা উত্তম
3. class context-sensitive callback-এ lexical `this` সুবিধার জন্য arrow ব্যবহার কার্যকর
4. জটিল business logic-এ readability রক্ষায় block body ব্যবহার করা ভালো

### সংক্ষিপ্ত সারাংশ

Arrow/Lambda Functions TypeScript-এ concise syntax, typed callbacks, এবং lexical `this` ব্যবস্থাপনার জন্য অত্যন্ত কার্যকর।  
সঠিকভাবে প্রয়োগ করলে function declaration আরও স্পষ্ট, maintainable, এবং context-safe হয়।

## ৪.৫ Higher-Order Functions

Higher-Order Function (HOF) হলো এমন function, যা কমপক্ষে একটি function-কে parameter হিসেবে গ্রহণ করে অথবা function return করে।  
TypeScript-এ HOF ব্যবহার করলে callback contract স্পষ্ট হয়, reusable behavior তৈরি করা যায়, এবং functional programming pattern নিরাপদভাবে প্রয়োগ করা সম্ভব হয়।

### Higher-Order Function কেন গুরুত্বপূর্ণ

1. behavior abstraction সম্ভব হয়
2. code reuse বৃদ্ধি পায়
3. callback ভিত্তিক logic type-safe করা যায়
4. transformation, filtering, composition সহজ হয়
5. maintainable functional architecture তৈরি হয়

### Basic Higher-Order Function Example

```ts
function applyOperation(
  a: number,
  b: number,
  operation: (x: number, y: number) => number,
): number {
  return operation(a, b);
}

const sum = applyOperation(10, 5, (x, y) => x + y);
const product = applyOperation(10, 5, (x, y) => x * y);

console.log(sum); // 15
console.log(product); // 50
```

এখানে `applyOperation` একটি higher-order function, কারণ এটি `operation` নামে function parameter গ্রহণ করছে।

### Function Return করা Higher-Order Function

```ts
function createMultiplier(multiplier: number): (value: number) => number {
  return (value: number) => value * multiplier;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(10)); // 20
console.log(triple(10)); // 30
```

এই pattern function factory হিসেবে ব্যবহৃত হয়।

### Built-in HOF Examples

JavaScript/TypeScript array API-তে বহুল ব্যবহৃত HOF:

- `map`
- `filter`
- `reduce`
- `forEach`
- `some`
- `every`

```ts
const numbers = [1, 2, 3, 4, 5];

const squares = numbers.map((n) => n * n);
const evens = numbers.filter((n) => n % 2 === 0);
const total = numbers.reduce((acc, n) => acc + n, 0);

console.log(squares); // [1, 4, 9, 16, 25]
console.log(evens); // [2, 4]
console.log(total); // 15
```

### Callback Contract Type Alias দিয়ে

```ts
type NumberTransformer = (value: number) => number;

function transformArray(
  values: number[],
  transformer: NumberTransformer,
): number[] {
  return values.map(transformer);
}

const increased = transformArray([10, 20, 30], (v) => v + 1);
console.log(increased); // [11, 21, 31]
```

Type alias ব্যবহার করলে callback contract reusable এবং পরিষ্কার হয়।

### Generic Higher-Order Function

```ts
function applyToEach<T, R>(items: T[], fn: (item: T) => R): R[] {
  return items.map(fn);
}

const names = ["rahim", "karim"];
const upper = applyToEach(names, (name) => name.toUpperCase());

console.log(upper); // ["RAHIM", "KARIM"]
```

Generics ব্যবহারে HOF বিভিন্ন data type-এ পুনঃব্যবহারযোগ্য হয়।

### বাস্তব Use Case: Validation Pipeline

```ts
type Validator<T> = (value: T) => boolean;

function validateAll<T>(value: T, validators: Validator<T>[]): boolean {
  return validators.every((validator) => validator(value));
}

const isNonEmpty = (s: string) => s.trim().length > 0;
const hasAtLeastFive = (s: string) => s.length >= 5;

const ok = validateAll("TypeScript", [isNonEmpty, hasAtLeastFive]);
console.log(ok); // true
```

এই pattern form validation ও rule engine design-এ কার্যকর।

### সাধারণ ভুল

1. callback parameter type অস্পষ্ট রাখা
2. `any` ব্যবহার করে type safety হারানো
3. function return type explicit না দেওয়ায় contract অস্পষ্ট হওয়া
4. side-effect heavy callback দিয়ে functional readability নষ্ট করা

### Best Practices

1. callback signature type alias বা interface দিয়ে স্পষ্ট করা উচিত
2. generic HOF-এ type parameter নাম অর্থবহ রাখা প্রয়োজন (`T`, `R`, `K`)
3. pure function callback অগ্রাধিকার দিলে testability বাড়ে
4. business-critical HOF-এ return type explicit রাখা উত্তম

### সংক্ষিপ্ত সারাংশ

Higher-Order Functions TypeScript-এ function-as-data নীতিকে type-safe ভাবে প্রয়োগের শক্তিশালী পদ্ধতি।  
সঠিক callback typing, generics, এবং clear contract design অনুসরণ করলে code reuse, composability, এবং maintainability উল্লেখযোগ্যভাবে বৃদ্ধি পায়।

## ৪.৬ Anonymous Functions

Anonymous Function হলো এমন function যার নিজস্ব নাম থাকে না।  
সাধারণত callback, inline operation, function expression, এবং closure pattern-এ anonymous function ব্যবহৃত হয়।

### Anonymous Function কেন গুরুত্বপূর্ণ

1. অস্থায়ী logic inline লেখা যায়
2. callback-heavy code concise থাকে
3. higher-order function-এ দ্রুত behavior pass করা যায়
4. lexical scope-এর সাথে closure তৈরি করা সহজ হয়

### Basic Syntax

```ts
const greet = function (name: string): string {
  return `Hello, ${name}`;
};

console.log(greet("Karim"));
```

এখানে function-এর নাম নেই, তবে variable `greet` এর মাধ্যমে function access করা হচ্ছে।

### Anonymous Function as Callback

```ts
const numbers = [1, 2, 3, 4];

const doubled = numbers.map(function (n: number): number {
  return n * 2;
});

console.log(doubled); // [2, 4, 6, 8]
```

এই pattern array processing-এ বহুল ব্যবহৃত।

### Anonymous Function in Event/Handler Style

```ts
type ClickHandler = () => void;

const onClick: ClickHandler = function (): void {
  console.log("Clicked");
};

onClick();
```

### Anonymous Function বনাম Named Function

| বিষয়                    | Anonymous Function | Named Function            |
| ----------------------- | ------------------ | ------------------------- |
| function নাম            | থাকে না            | থাকে                      |
| ব্যবহার                 | inline/callback    | reusable standalone logic |
| stack trace readability | তুলনামূলক কম       | তুলনামূলক বেশি            |
| recursion               | তুলনামূলক জটিল     | সহজ                       |

### Function Expression এবং Anonymous Function

Anonymous function প্রায়ই function expression আকারে ব্যবহৃত হয়:

```ts
const subtract = function (a: number, b: number): number {
  return a - b;
};
```

এটি declaration নয়; expression context-এ evaluate হয়।

### Closure Example

Anonymous function closure তৈরিতে কার্যকর:

```ts
function createCounter(): () => number {
  let count = 0;

  return function (): number {
    count += 1;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

এখানে anonymous function outer scope-এর `count` retain করছে।

### Anonymous Function বনাম Arrow Function

| বিষয়                       | Anonymous Function (`function`) | Arrow Function (`=>`) |
| -------------------------- | ------------------------------- | --------------------- |
| `this` behavior            | dynamic                         | lexical               |
| syntax                     | তুলনামূলক দীর্ঘ                 | concise               |
| constructor হিসেবে ব্যবহার | সম্ভব                           | সম্ভব নয়              |
| callback readability       | ভালো                            | সাধারণত বেশি concise  |

### সাধারণ ভুল

1. callback-এ parameter type অস্পষ্ট রাখা
2. anonymous function-এ `this` behavior ভুলভাবে ধরে নেওয়া
3. complex logic inline লিখে readability কমানো
4. debugging দরকার এমন critical logic-এ অতিরিক্ত anonymous ব্যবহার

### Best Practices

1. ছোট callback logic-এ anonymous function ব্যবহার কার্যকর
2. বড়/complex reusable logic-এর ক্ষেত্রে named function বা extracted helper ব্যবহার করা উত্তম
3. callback contract type define করলে anonymous function type-safe থাকে
4. `this` context প্রয়োজন হলে anonymous function ও arrow function সচেতনভাবে নির্বাচন করা উচিত

### সংক্ষিপ্ত সারাংশ

Anonymous Functions TypeScript-এ inline এবং callback-driven programming-এর গুরুত্বপূর্ণ উপাদান।  
সঠিক typing এবং context-awareness বজায় রেখে ব্যবহার করলে code concise, expressive, এবং maintainable থাকে।

## ৪.৭ TypeScript Function

এই subsection-এ TypeScript function topic-এর একটি consolidated দৃষ্টিভঙ্গি দেওয়া হলো, যাতে chapter-এর পূর্ববর্তী অংশগুলো (typing, rest, overload, arrow, HOF, anonymous) একত্রে practical কাঠামোয় বোঝা যায়।

### TypeScript Function-এর মূল স্তম্ভ

TypeScript function design সাধারণত পাঁচটি স্তম্ভের উপর দাঁড়ায়:

1. **Parameter Typing**
2. **Return Typing**
3. **Function Signature Contract**
4. **Narrowing and Safety**
5. **Reusable Abstraction** (callback/generic/HOF)

### Function Signature as Contract

Function signature মূলত বলে:

- কোন ধরনের input লাগবে
- কোন ধরনের output পাওয়া যাবে
- optional/default/rest parameter কেমন হবে

```ts
type CreateUser = (
  name: string,
  age: number,
  email?: string,
) => { id: number; name: string; age: number; email?: string };
```

এটি API boundary-তে স্পষ্ট contract নিশ্চিত করে।

### Integrated Example: Typed Business Function

```ts
type OrderItem = {
  name: string;
  price: number;
  qty: number;
};

type Coupon = {
  code: string;
  discountPercent: number;
};

type OrderSummary = {
  subtotal: number;
  discount: number;
  total: number;
};

function calculateOrderTotal(
  items: OrderItem[],
  coupon?: Coupon,
): OrderSummary {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discount = coupon ? (subtotal * coupon.discountPercent) / 100 : 0;
  const total = subtotal - discount;

  return { subtotal, discount, total };
}
```

এই function-এ parameter typing, optional parameter, return typing, এবং typed business logic একত্রে প্রয়োগ করা হয়েছে।

### TypeScript Function Design Patterns

#### 1) Utility Function Pattern

```ts
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
```

#### 2) Predicate Function Pattern

```ts
function isPositive(value: number): boolean {
  return value > 0;
}
```

#### 3) Transformer Function Pattern

```ts
function toLabel(value: string | number): string {
  return typeof value === "number" ? `#${value}` : value.toUpperCase();
}
```

### Type-safe Error Handling in Functions

```ts
function parseJson<T>(text: string): T | null {
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}
```

এখানে function predictable fallback return করছে (`T | null`)।

### Scalable Function লেখার চেকলিস্ট

1. function name domain-specific কি না
2. parameter type স্পষ্ট কি না
3. return type stable/explicit কি না
4. nullable/union input হলে narrowing আছে কি না
5. callback থাকলে signature typed কি না
6. side-effect এবং pure logic আলাদা কি না

### Function Quality Indicators

একটি ভালো TypeScript function সাধারণত:

- single responsibility অনুসরণ করে
- type-safe contract বজায় রাখে
- predictable output দেয়
- test করা সহজ হয়
- reuse করা যায়

### Best Practices (Consolidated)

1. public/API-level function-এ explicit return type ব্যবহার করা উচিত
2. function signature complex হলে `type` alias বা interface ব্যবহার করা উত্তম
3. overload প্রয়োজন হলে minimal এবং clear signature রাখা উচিত
4. callback-heavy design-এ HOF + typed callback contract ব্যবহার কার্যকর
5. large codebase-এ function naming convention consistent রাখা প্রয়োজন

### সংক্ষিপ্ত সারাংশ

TypeScript Function কেবল function declaration নয়; এটি typed contract-driven design approach।  
সঠিকভাবে parameter/return typing, narrowing, abstraction, এবং reusable pattern প্রয়োগ করলে function-level architecture আরও নির্ভরযোগ্য, maintainable, এবং production-ready হয়।
