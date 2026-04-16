## সূচিপত্র

অধ্যায় ৩: TypeScript Types

3.1 Type Inference
3.2 Combining Types
3.2.1 Union Types
3.2.2 Intersection Types
3.2.3 Type Aliases
3.2.4 Keyof Type Operator
3.3 Narrowing
3.3.1 Type Narrowing
3.3.2 Instanceof Narrowing
3.3.3 typeof Narrowing
3.3.4 Equality Narrowing
3.3.5 Truthiness Narrowing
3.3.6 Type Predicates

# অধ্যায় ৩: TypeScript Types

## ৩.১ Type Inference

Type Inference হলো TypeScript-এর একটি মৌলিক বৈশিষ্ট্য, যেখানে compiler অনেক ক্ষেত্রে স্পষ্টভাবে type না লিখলেও value দেখে স্বয়ংক্রিয়ভাবে type নির্ধারণ করে।  
এটি code concise রাখে, readability বাড়ায়, এবং একই সাথে type safety বজায় রাখতে সহায়তা করে।

## Type Inference কী?

যখন variable, function return, বা expression-এর type সরাসরি annotation ছাড়া নির্ধারণ হয়, সেটিকে Type Inference বলা হয়।

উদাহরণ:

```ts
let title = "TypeScript";
let version = 5.0;
let isActive = true;
```

এখানে TypeScript স্বয়ংক্রিয়ভাবে type ধরে:

- `title` -> `string`
- `version` -> `number`
- `isActive` -> `boolean`

## Variable Inference

Variable declare করার সময় initial value থাকলে TypeScript সাধারণত সেখান থেকে type infer করে।

```ts
const country = "Bangladesh"; // string
const total = 1200; // number
const published = false; // boolean
```

এই ক্ষেত্রে বাড়তি annotation প্রয়োজন হয় না।

## Function Return Type Inference

Function-এর body দেখে TypeScript return type infer করতে পারে।

```ts
function add(a: number, b: number) {
  return a + b;
}
```

এখানে `add` function-এর return type inferred as `number`।

তবে public API বা library-style code-এ explicit return type দেওয়া অধিক স্থিতিশীল practice।

## Array Type Inference

Array literal-এর element দেখে TypeScript array type infer করে।

```ts
const numbers = [1, 2, 3]; // number[]
const names = ["A", "B", "C"]; // string[]
```

Mixed value থাকলে union type infer হয়:

```ts
const mixed = [1, "Hello", true]; // (string | number | boolean)[]
```

## Object Type Inference

Object literal-এর key/value দেখে object shape infer করা হয়।

```ts
const user = {
  name: "Rahim",
  age: 24,
  isMember: true,
};
```

Inferred type:

```ts
{
  name: string;
  age: number;
  isMember: boolean;
}
```

## Contextual Typing (Context-based Inference)

কিছু ক্ষেত্রে TypeScript surrounding context দেখে type infer করে, যাকে contextual typing বলা হয়।

```ts
const items = [1, 2, 3];

items.forEach((item) => {
  console.log(item.toFixed(2));
});
```

এখানে callback parameter `item` কে TypeScript `number` হিসেবে infer করেছে।

## Inference-এর সুবিধা

1. code ছোট এবং পরিষ্কার থাকে
2. repetitive type annotation কমে
3. IDE autocomplete ও hint উন্নত হয়
4. দ্রুত development সম্ভব হয়

## Inference-এর সীমাবদ্ধতা

1. complex nested structure-এ inferred type অনেক বড় বা কঠিন হতে পারে
2. কখনও overly broad type (যেমন `string | number`) পাওয়া যায়
3. public interface/API design-এ শুধুমাত্র inference নির্ভরতা অস্পষ্টতা তৈরি করতে পারে

## কখন Explicit Type Annotation দেওয়া উচিত

নিচের পরিস্থিতিতে explicit type লেখা উত্তম:

1. public function/method signature
2. API contract বা shared model
3. complex object return
4. long-term maintainability-কে অগ্রাধিকার দেওয়া codebase

উদাহরণ:

```ts
function getDiscount(price: number): number {
  return price * 0.1;
}
```

## `let` বনাম `const`-এ Inference পার্থক্য

`const` value অধিক নির্দিষ্টভাবে infer হতে পারে, কারণ reassign করা যায় না।  
`let`-এ mutable behavior-এর কারণে কিছু ক্ষেত্রে type wider হতে পারে।

```ts
const role = "admin"; // literal-like narrow behavior
let status = "active"; // broader mutable string behavior
```

## Best Practices

1. সাধারণ variable declaration-এ inference ব্যবহার করা কার্যকর
2. function parameter ও public return type explicit রাখা উত্তম
3. domain model/interface-এ explicit typing maintainability বাড়ায়
4. inference এবং annotation-এর মধ্যে balanced approach অনুসরণ করা উচিত

## সংক্ষিপ্ত সারাংশ

Type Inference TypeScript-এর productivity বৃদ্ধি করে এবং অপ্রয়োজনীয় type repetition কমায়।  
তবে maintainable ও scalable codebase-এর জন্য inference-এর সাথে পরিকল্পিত explicit typing একত্রে ব্যবহার করা সর্বোত্তম কৌশল।

## ৩.২ Combining Types

TypeScript-এ অনেক বাস্তব সমস্যায় একক type যথেষ্ট হয় না।  
একই value বা variable-এর জন্য একাধিক type সমন্বয় করার প্রয়োজন হয়। এই প্রক্রিয়াকে Combining Types বলা হয়।

Combining Types ব্যবহার করে data model আরও flexible ও বাস্তবসম্মত করা যায়, বিশেষ করে API response, form input, এবং reusable function design-এর ক্ষেত্রে।

## Combining Types কেন প্রয়োজন

নিচের পরিস্থিতিতে combining type প্রয়োজন হয়:

1. একটি value ভিন্ন সময়ে ভিন্ন type হতে পারে
2. function একাধিক ধরনের input গ্রহণ করে
3. external API data shape পরিবর্তনশীল হয়
4. optional বা conditional model তৈরি করতে হয়

TypeScript এই প্রয়োজন পূরণের জন্য union, intersection, aliases এবং key-based operator সরবরাহ করে।  
এই অংশে roadmap অনুযায়ী প্রথমে Union Types আলোচনা করা হলো।

## ৩.২.১ Union Types

Union Type এমন একটি ব্যবস্থা, যেখানে একটি variable বা parameter একাধিক type-এর যেকোনো একটি type ধারণ করতে পারে।

Syntax:

```ts
typeA | typeB;
```

উদাহরণ:

```ts
let userId: string | number;

userId = "U-101";
userId = 101;
```

এখানে `userId` কখনও `string`, কখনও `number` হতে পারে।

## Basic Use Case

```ts
function printId(id: string | number): void {
  console.log("User ID:", id);
}

printId(101);
printId("A-101");
```

এই pattern API route param, database identifier, বা legacy integration-এ অনেক ব্যবহৃত হয়।

## Union Type-এ Narrowing প্রয়োজন

Union type ব্যবহার করলে type-specific method call-এর আগে narrowing করতে হয়।

```ts
function formatValue(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }

  return value.toFixed(2);
}
```

এখানে `typeof` check-এর মাধ্যমে TypeScript branch অনুযায়ী type narrow করে।

## Array-এ Union Type

```ts
const mixedValues: (string | number)[] = ["Book", 20, "Pen", 10];
```

এখানে array-এর প্রতিটি element `string` বা `number` হতে পারে।

## Object Property-এ Union Type

```ts
type Payment = {
  amount: number;
  method: "cash" | "card";
  reference: string | null;
};

const payment: Payment = {
  amount: 1200,
  method: "card",
  reference: null,
};
```

এইভাবে object model-এ flexible property design করা যায়।

## Literal Union (প্রচলিত pattern)

Union শুধুমাত্র primitive type-এর মধ্যে সীমাবদ্ধ নয়; literal value দিয়েও union তৈরি করা যায়।

```ts
type Status = "pending" | "approved" | "rejected";

let orderStatus: Status = "pending";
orderStatus = "approved";
```

এই pattern business-state control-এ অত্যন্ত কার্যকর।

## Union Type ব্যবহারে সাধারণ ভুল

1. narrowing ছাড়া type-specific method call করা
2. অতিরিক্ত বড় union তৈরি করে readability নষ্ট করা
3. model design না করে ad-hoc union ব্যবহার করা
4. nullable union (`string | null`) handle করতে null check বাদ দেওয়া

## Best Practices

1. function input-এ প্রয়োজন হলে union ব্যবহার করা উচিত
2. type guard (`typeof`, `in`, `instanceof`) দিয়ে branch narrowing রাখা উচিত
3. business-state এর জন্য literal union ব্যবহার করা উত্তম
4. বড় union structure-এ type alias ব্যবহার করে readability বজায় রাখা উচিত

## সংক্ষিপ্ত সারাংশ

Combining Types TypeScript model design-কে flexible এবং scalable করে।  
Union Types এর মাধ্যমে একটি variable বা parameter-এ একাধিক সম্ভাব্য type নিরাপদভাবে ব্যবহারের সুযোগ তৈরি হয়, তবে সঠিক narrowing নিশ্চিত করা অপরিহার্য।

## ৩.২.২ Intersection Types

Intersection Type (`&`) ব্যবহার করা হয় একাধিক type একত্রে যুক্ত করে একটি composite type তৈরির জন্য।  
Union যেখানে "একটি বা আরেকটি" relation তৈরি করে, intersection সেখানে "সবগুলো একসাথে" relation তৈরি করে।

Syntax:

```ts
type Combined = TypeA & TypeB;
```

উদাহরণ:

```ts
type Person = {
  name: string;
};

type Employee = {
  employeeId: number;
};

type Staff = Person & Employee;

const staff: Staff = {
  name: "Karim",
  employeeId: 1001,
};
```

এখানে `Staff` type-এ `Person` এবং `Employee` উভয়ের property থাকতে হবে।

### Intersection Type-এর ব্যবহার ক্ষেত্র

1. একাধিক reusable model combine করা
2. domain entity-তে layered property যোগ করা
3. response type-এ base field + specific field একত্র করা

### সতর্কতা

যদি conflicting property type intersect করা হয়, type `never`-এ নেমে যেতে পারে।

```ts
type A = { id: string };
type B = { id: number };
type C = A & B; // id effectively incompatible
```

## ৩.২.৩ Type Aliases

Type Alias (`type`) হলো custom type name নির্ধারণের উপায়, যা complex বা repeated type structure পুনঃব্যবহারযোগ্য করে।

Syntax:

```ts
type TypeName = ...;
```

উদাহরণ:

```ts
type UserId = string | number;

type User = {
  id: UserId;
  name: string;
  isActive: boolean;
};

const user: User = {
  id: "U-102",
  name: "Rahim",
  isActive: true,
};
```

### Type Alias-এর সুবিধা

1. repeated type declaration কমায়
2. readability ও naming clarity বাড়ায়
3. union/intersection/tuple/function type সহজভাবে reuse করা যায়
4. বড় codebase-এ model consistency রক্ষা করে

### Type Alias বনাম Interface (সংক্ষিপ্ত দিক)

- object structure-এর জন্য interface বেশি প্রচলিত
- union/intersection/literal composition-এ type alias বেশি flexible

## ৩.২.৪ Keyof Type Operator

`keyof` operator একটি object type-এর key-গুলোর union literal type তৈরি করে।  
এটি type-safe property access এবং generic utility তৈরিতে অত্যন্ত কার্যকর।

Syntax:

```ts
type Keys = keyof SomeObjectType;
```

উদাহরণ:

```ts
type Product = {
  id: number;
  title: string;
  price: number;
};

type ProductKeys = keyof Product; // "id" | "title" | "price"
```

### `keyof` দিয়ে safe accessor function

```ts
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const product = {
  id: 1,
  title: "Notebook",
  price: 120,
};

const title = getValue(product, "title"); // string
```

### `keyof` Operator-এর ব্যবহার ক্ষেত্র

1. dynamic property access type-safe করা
2. reusable generic helper function তৈরি
3. mapped type, utility type, advanced typing-এ ভিত্তি তৈরি

## Combining Types অংশের সংক্ষিপ্ত সারাংশ

Combining Types-এর মধ্যে Union, Intersection, Type Alias, এবং Keyof operator একসাথে TypeScript model design-কে শক্তিশালী করে।  
এই কৌশলগুলোর সঠিক প্রয়োগে type safety, code reuse, এবং long-term maintainability উল্লেখযোগ্যভাবে বৃদ্ধি পায়।

## ৩.৩ Narrowing

TypeScript-এ Narrowing হলো এমন একটি প্রক্রিয়া, যার মাধ্যমে একটি broad type-কে নির্দিষ্ট context-এ আরও specific type-এ নামিয়ে আনা হয়।  
এটি TypeScript type system-এর অন্যতম শক্তিশালী বৈশিষ্ট্য, কারণ এর মাধ্যমে union type handle করা নিরাপদ ও পরিষ্কার হয়।

Narrowing মূলত control flow analysis-এর উপর নির্ভর করে।  
অর্থাৎ, `if`, `switch`, comparison, truthy/falsy check ইত্যাদির ভিত্তিতে compiler বুঝে নেয় কোন branch-এ কোন type কার্যকর।

## Narrowing কেন প্রয়োজন

নিচের সমস্যাগুলো সমাধানে narrowing অপরিহার্য:

1. union type-এ type-specific method call করা
2. nullable value (`null | undefined`) নিরাপদভাবে ব্যবহার করা
3. runtime condition অনুযায়ী branch-based logic লেখা
4. compile-time error কমিয়ে type-safe execution নিশ্চিত করা

## ৩.৩.১ Type Narrowing

Type Narrowing বলতে broadly defined type থেকে condition-based নির্দিষ্ট type নির্ধারণকে বোঝায়।

উদাহরণ:

```ts
function printValue(value: string | number): void {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

এখানে:

- `if` branch-এ `value` -> `string`
- `else` branch-এ `value` -> `number`

এই narrowing-এর ফলে type-safe method access সম্ভব হয়।

## Type Narrowing-এর সাধারণ কৌশল

1. `typeof` check (primitive type)
2. property existence check (`in`)
3. class instance check (`instanceof`)
4. equality check (`===`, `!==`)
5. truthiness check (`if (value)`)
6. user-defined type guard function

পরবর্তী subsection-গুলোতে এই কৌশলগুলোর বিস্তারিত আলোচনা করা হবে।

## Nullable Value Narrowing

`null` বা `undefined` handle করার সময় narrowing অত্যন্ত কার্যকর:

```ts
function getLength(text: string | null): number {
  if (text === null) {
    return 0;
  }

  return text.length;
}
```

এখানে null check-এর পরে `text` safe string type হিসেবে narrow হয়।

## Narrowing ছাড়া সমস্যা

নিচের code narrowing ছাড়া compile error দিতে পারে:

```ts
function bad(value: string | number): void {
  // console.log(value.toUpperCase()); // Error: number এ method নেই
}
```

অর্থাৎ union type ব্যবহার করলে type-specific operation-এর আগে narrowing করা আবশ্যক।

## Practical Example: API Result

```ts
type Success = { data: string[] };
type Failure = { error: string };

function handleResult(result: Success | Failure): void {
  if ("data" in result) {
    console.log("Item count:", result.data.length);
  } else {
    console.log("Error:", result.error);
  }
}
```

এখানে `"data" in result` condition result type narrow করে।

## Best Practices

1. union type ব্যবহার করলে branch-based narrowing রাখা উচিত
2. nullable value access-এর আগে nullish check বাধ্যতামূলক রাখা নিরাপদ
3. reusable narrowing logic-এর জন্য type guard function ব্যবহার করা উত্তম
4. narrowing branch-এ type-specific method call সীমাবদ্ধ রাখা উচিত

## সংক্ষিপ্ত সারাংশ

Narrowing TypeScript-এর type safety বাস্তবায়নের কেন্দ্রীয় কৌশল।  
Type Narrowing ব্যবহার করে broad union type-কে runtime condition অনুযায়ী safe এবং specific type-এ রূপান্তর করা যায়, যা maintainable ও bug-resistant code লেখায় গুরুত্বপূর্ণ ভূমিকা রাখে।

## ৩.৩.২ Instanceof Narrowing

`instanceof` ভিত্তিক narrowing class বা constructor function-ভিত্তিক object type আলাদা করতে ব্যবহৃত হয়।  
TypeScript control flow analysis-এর মাধ্যমে `instanceof` condition সত্য/মিথ্যা branch অনুযায়ী type narrow করে।

## ধারণা

যদি `value instanceof SomeClass` condition `true` হয়, তাহলে সেই branch-এ `value` কে `SomeClass` হিসেবে ব্যবহার করা যায়।  
`else` branch-এ বাকি সম্ভাব্য type কার্যকর থাকে।

Syntax:

```ts
if (value instanceof SomeClass) {
  // value is SomeClass
} else {
  // value is other possible type
}
```

## Basic Example

```ts
class Dog {
  bark() {
    return "Woof";
  }
}

class Cat {
  meow() {
    return "Meow";
  }
}

function speak(pet: Dog | Cat): string {
  if (pet instanceof Dog) {
    return pet.bark();
  }

  return pet.meow();
}
```

এখানে `if` branch-এ `pet` -> `Dog`, এবং `else` branch-এ `pet` -> `Cat` হিসেবে narrow হয়।

## Inheritance Scenario

```ts
class Animal {
  move() {
    return "Moving";
  }
}

class Bird extends Animal {
  fly() {
    return "Flying";
  }
}

function processAnimal(a: Animal): string {
  if (a instanceof Bird) {
    return a.fly();
  }

  return a.move();
}
```

`Bird` class `Animal` extend করায় `instanceof Bird` check subtype-specific behavior নির্বাচন করতে সহায়তা করে।

## Error Handling-এ Instanceof Narrowing

```ts
function handleError(error: unknown): void {
  if (error instanceof TypeError) {
    console.log("Type error:", error.message);
  } else if (error instanceof Error) {
    console.log("Generic error:", error.message);
  } else {
    console.log("Unknown error");
  }
}
```

এই pattern runtime error classification-এর জন্য কার্যকর।

## `instanceof` Narrowing-এর সীমাবদ্ধতা

1. interface type-এ `instanceof` কাজ করে না (interface runtime-এ থাকে না)
2. object literal data-এ class identity না থাকলে check ব্যর্থ হতে পারে
3. cross-realm context (যেমন iframe) এ কিছু class check অনির্ভরযোগ্য হতে পারে

## Interface-এর ক্ষেত্রে বিকল্প

Interface বা plain object narrow করার জন্য custom type guard বা `in` operator বেশি উপযোগী।

```ts
interface Admin {
  permissions: string[];
}

function isAdmin(value: unknown): value is Admin {
  return typeof value === "object" && value !== null && "permissions" in value;
}
```

## Best Practices

1. class-based union type narrow করতে `instanceof` ব্যবহার করা উচিত
2. interface/object literal type-এ `instanceof` নির্ভরতা এড়িয়ে `in` বা custom guard ব্যবহার করা উত্তম
3. error handling-এ `unknown` + `instanceof Error` pattern অনুসরণ করা নিরাপদ
4. branch-specific method call শুধুমাত্র narrowed branch-এ রাখা উচিত

## সংক্ষিপ্ত সারাংশ

Instanceof Narrowing TypeScript-এ class-based type differentiation-এর একটি শক্তিশালী কৌশল।  
এটি runtime check এবং compile-time narrowing একত্রে প্রদান করে, ফলে union class type handle করা আরও পরিষ্কার ও নিরাপদ হয়।

## ৩.৩.৩ typeof Narrowing

`typeof` Narrowing হলো TypeScript-এর একটি মৌলিক narrowing কৌশল, যা primitive type check করে variable-এর type নির্দিষ্ট branch-এ narrow করে।  
এটি বিশেষভাবে কার্যকর, যখন union type-এ `string`, `number`, `boolean`, `undefined`, `function`, `object` ইত্যাদি primitive category থাকে।

## `typeof` Operator-এর ভূমিকা

JavaScript runtime-এ `typeof value` একটি string return করে।  
TypeScript এই ফল ব্যবহার করে conditional branch-এ type safety নিশ্চিত করে।

সম্ভাব্য সাধারণ ফলাফল:

- `"string"`
- `"number"`
- `"boolean"`
- `"undefined"`
- `"function"`
- `"object"`

## Basic Example

```ts
function format(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }

  return value.toFixed(2);
}
```

এখানে:

- `if` branch-এ `value` -> `string`
- `else` branch-এ `value` -> `number`

## Multiple Primitive Union-এ `typeof` Narrowing

```ts
function printValue(value: string | number | boolean): void {
  if (typeof value === "string") {
    console.log("String:", value.toUpperCase());
  } else if (typeof value === "number") {
    console.log("Number:", value.toFixed(1));
  } else {
    console.log("Boolean:", value ? "true" : "false");
  }
}
```

এইভাবে প্রতিটি branch নির্দিষ্ট type অনুযায়ী কাজ করতে পারে।

## Nullable Value Handle-এ `typeof`

`typeof null` এর ফল `"object"` হওয়ায় nullable data handle করতে `typeof`-এর সাথে null check একত্রে ব্যবহার করা উচিত।

```ts
function logData(value: string | null): void {
  if (typeof value === "string") {
    console.log(value.length);
  } else {
    console.log("Value is null");
  }
}
```

## Function Type Narrowing

`typeof` দিয়ে function type detect করা যায়:

```ts
function execute(value: string | (() => string)): string {
  if (typeof value === "function") {
    return value();
  }

  return value;
}
```

## `typeof` Narrowing-এর সীমাবদ্ধতা

1. object-এর বিস্তারিত structure detect করতে পারে না
2. class instance differentiation-এর জন্য যথেষ্ট নয় (`instanceof` প্রয়োজন)
3. `null` এবং `object` distinction-এ অতিরিক্ত সতর্কতা প্রয়োজন

## `typeof` বনাম `instanceof` (সংক্ষেপে)

| বিষয়                    | `typeof`                      | `instanceof`         |
| ----------------------- | ----------------------------- | -------------------- |
| প্রধান ব্যবহার          | primitive/type category check | class instance check |
| return ভিত্তি           | string tag                    | prototype chain      |
| object subtype নির্ধারণ | সীমিত                         | কার্যকর              |

## Best Practices

1. primitive union type-এ `typeof` check প্রথম পছন্দ হওয়া উচিত
2. nullable object type-এ `typeof` এর পাশাপাশি null check রাখা প্রয়োজন
3. class-based narrowing-এ `typeof` নয়, `instanceof` ব্যবহার করা উত্তম
4. condition branch-এর বাইরে type-specific method call এড়িয়ে চলা উচিত

## সংক্ষিপ্ত সারাংশ

`typeof` Narrowing TypeScript-এ primitive union type handle করার সবচেয়ে সরল ও কার্যকর কৌশল।  
সঠিক branch-based type check ব্যবহার করলে runtime logic পরিষ্কার হয় এবং compile-time safety উল্লেখযোগ্যভাবে বৃদ্ধি পায়।

## ৩.৩.৪ Equality Narrowing

Equality Narrowing হলো এমন narrowing কৌশল, যেখানে `===`, `!==`, `==`, `!=` comparison-এর মাধ্যমে TypeScript variable type সংকুচিত করে।  
সাধারণত strict equality (`===`, `!==`) ব্যবহার করাই নিরাপদ এবং সুপারিশযোগ্য।

## Equality Narrowing কীভাবে কাজ করে

যখন দুটি value তুলনা করা হয়, TypeScript control flow analysis দিয়ে নির্ধারণ করে কোন branch-এ কোন type সম্ভব।  
এতে union type-এর ভেতর থেকে নির্দিষ্ট type isolate করা যায়।

## Basic Example

```ts
function print(value: string | number): void {
  if (value === "done") {
    console.log("String literal matched");
  } else {
    console.log("Other value:", value);
  }
}
```

এখানে `value === "done"` condition সত্য হলে `value` কে literal string context-এ narrow করা হয়।

## Null / Undefined Equality Narrowing

Nullable union type handle করতে equality narrowing খুব কার্যকর:

```ts
function showLength(text: string | null): number {
  if (text === null) {
    return 0;
  }

  return text.length;
}
```

এখানে null check-এর পরে `text` -> `string` হিসেবে narrow হয়।

## Dual-nullish Check Pattern

`value == null` pattern JavaScript-এ `null` এবং `undefined` উভয়কে একসাথে check করে।  
TypeScript narrowing-এ এটি কিছু ক্ষেত্রে ব্যবহারযোগ্য:

```ts
function normalize(input: string | null | undefined): string {
  if (input == null) {
    return "N/A";
  }

  return input.trim();
}
```

উপরের `if` block-এ `input` nullish; `else` branch-এ `input` safe string।

## Discriminated Union-এ Equality Narrowing

Literal discriminator field-এর মাধ্যমে equality narrowing খুব পরিষ্কারভাবে কাজ করে।

```ts
type Circle = { kind: "circle"; radius: number };
type Square = { kind: "square"; side: number };
type Shape = Circle | Square;

function area(shape: Shape): number {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius * shape.radius;
  }

  return shape.side * shape.side;
}
```

এখানে `shape.kind === "circle"` check `shape`-কে `Circle` type-এ narrow করে।

## Equality Narrowing বনাম Truthiness Narrowing

| বিষয়           | Equality Narrowing  | Truthiness Narrowing    |
| -------------- | ------------------- | ----------------------- |
| ভিত্তি         | explicit comparison | truthy/falsy evaluation |
| নির্ভুলতা      | বেশি                | কিছু ক্ষেত্রে কম        |
| nullable check | সরাসরি              | implicit                |

প্রকৃত domain rule অনুযায়ী explicit equality check অধিক predictable।

## Common Mistakes

1. strict comparison-এর বদলে loose comparison অতিরিক্ত ব্যবহার
2. `0`, `false`, `""` কে nullish ভেবে ভুল condition লেখা
3. discriminator field ছাড়া complex union branch করা
4. comparison branch-এর বাইরে unsafe property access রাখা

## Best Practices

1. type-safe branching-এর জন্য `===` / `!==` অগ্রাধিকার দেওয়া উচিত
2. nullable data-এ explicit `null`/`undefined` check রাখা উত্তম
3. discriminated union model-এ `kind`-ভিত্তিক equality check ব্যবহার করা কার্যকর
4. equality condition-এর সাথে TypeScript inferred type মিলিয়ে method access করা উচিত

## সংক্ষিপ্ত সারাংশ

Equality Narrowing TypeScript-এ conditional type refinement-এর একটি নির্ভরযোগ্য কৌশল।  
সঠিকভাবে প্রয়োগ করলে union এবং nullable data handling আরও স্পষ্ট, নিরাপদ এবং maintainable হয়।

## ৩.৩.৫ Truthiness Narrowing

Truthiness Narrowing হলো এমন একটি কৌশল, যেখানে `if (value)` বা `!value` ধরনের truthy/falsy condition-এর মাধ্যমে TypeScript type narrow করে।  
এটি nullable বা optional data handle করার ক্ষেত্রে প্রচলিত, তবে সতর্কভাবে ব্যবহার করা প্রয়োজন।

## Truthy এবং Falsy মান

JavaScript runtime-এ কিছু value falsy হিসেবে বিবেচিত হয়:

- `false`
- `0`
- `NaN`
- `""` (empty string)
- `null`
- `undefined`

বাকি অধিকাংশ value truthy।

## Basic Truthiness Narrowing Example

```ts
function printText(text: string | null): void {
  if (text) {
    console.log(text.toUpperCase());
  } else {
    console.log("No text");
  }
}
```

এখানে `if (text)` branch-এ `text` null থেকে narrow হয়ে string context-এ আসে।

## Optional Value Handle করা

```ts
type User = {
  name?: string;
};

function showName(user: User): void {
  if (user.name) {
    console.log(user.name.toLowerCase());
  } else {
    console.log("Name is missing");
  }
}
```

এই pattern optional property access-এ নিরাপদ method call নিশ্চিত করে।

## Truthiness Narrowing-এর ঝুঁকি

Truthiness condition `0`, `false`, `""`-কেও falsy ধরে।  
ফলে কিছু valid business value ভুলভাবে reject হতে পারে।

```ts
function showScore(score: number | null): void {
  if (score) {
    console.log("Score:", score);
  } else {
    console.log("No score");
  }
}
```

উপরের উদাহরণে `score = 0` হলেও `else` branch চলবে, যা logic bug তৈরি করতে পারে।

## Safe Alternative: Explicit Nullish Check

যখন `0`, `false`, `""` valid value হিসেবে রাখা প্রয়োজন, তখন explicit check ভালো:

```ts
function showScore(score: number | null): void {
  if (score !== null) {
    console.log("Score:", score);
  } else {
    console.log("No score");
  }
}
```

## Truthiness Narrowing বনাম Equality Narrowing

এই তুলনার মূল কাঠামো `৩.৩.৪ Equality Narrowing` অংশে টেবিল আকারে উপস্থাপিত হয়েছে।  
সারকথা হলো: truthiness check দ্রুত হলেও `0`, `false`, `""`-এর মতো edge-case-এ explicit equality check সাধারণত বেশি নির্ভরযোগ্য।

## Practical Pattern

```ts
function normalizeName(name: string | null | undefined): string {
  if (!name) {
    return "Anonymous";
  }

  return name.trim();
}
```

এই pattern UI fallback text-এ কার্যকর, যেখানে empty string-ও fallback হিসেবে বিবেচিত হতে পারে।

## Best Practices

1. nullable check-এ truthiness ব্যবহার করার আগে domain rule যাচাই করা উচিত
2. `0`, `false`, `""` valid হলে explicit equality/nullish check ব্যবহার করা উত্তম
3. UI fallback logic-এ truthiness narrowing কার্যকর হতে পারে
4. business-critical condition-এ implicit truthy/falsy logic এড়িয়ে স্পষ্ট শর্ত ব্যবহার করা নিরাপদ

## সংক্ষিপ্ত সারাংশ

Truthiness Narrowing TypeScript-এ দ্রুত এবং সংক্ষিপ্ত conditional narrowing প্রদান করে।  
তবে falsy value semantics বোঝা ছাড়া ব্যবহার করলে logic bug হতে পারে; তাই context-sensitive এবং সচেতন প্রয়োগ অপরিহার্য।

## ৩.৩.৬ Type Predicates

Type Predicate হলো TypeScript-এর একটি custom narrowing mechanism, যা developer-কে নিজস্ব type guard function তৈরি করার সুযোগ দেয়।  
এটি বিশেষভাবে কার্যকর, যখন built-in narrowing (`typeof`, `instanceof`, `in`) যথেষ্ট নয় বা domain-specific validation প্রয়োজন হয়।

## Type Predicate Syntax

Type predicate function-এর return type এই ফরম্যাটে লেখা হয়:

```ts
parameterName is TargetType
```

উদাহরণ:

```ts
function isString(value: unknown): value is string {
  return typeof value === "string";
}
```

এখানে `isString` function `true` return করলে TypeScript বুঝে নেয় `value` type হলো `string`।

## Basic Example

```ts
function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

function printSquare(value: unknown): void {
  if (isNumber(value)) {
    console.log(value * value);
  } else {
    console.log("Not a number");
  }
}
```

`if (isNumber(value))` branch-এ `value` number হিসেবে narrow হয়।

## Object Type Guard Example

```ts
type User = {
  id: number;
  name: string;
};

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value
  );
}

function printUser(value: unknown): void {
  if (isUser(value)) {
    console.log(`${value.id} - ${value.name}`);
  } else {
    console.log("Invalid user object");
  }
}
```

এই pattern API response validation-এ অত্যন্ত কার্যকর।

## Union Type Narrowing-এ Type Predicates

```ts
type Cat = { meow: () => void };
type Dog = { bark: () => void };

function isDog(pet: Cat | Dog): pet is Dog {
  return "bark" in pet;
}

function handlePet(pet: Cat | Dog): void {
  if (isDog(pet)) {
    pet.bark();
  } else {
    pet.meow();
  }
}
```

এখানে custom predicate union branch-safe method access নিশ্চিত করে।

## Reusable Predicate Pattern

Type predicate function reusable হলে code duplication কমে এবং domain rule centrally maintain করা যায়।

```ts
function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}
```

## Type Predicate বনাম Boolean Function

| বিষয়                     | Boolean Function | Type Predicate Function |
| ------------------------ | ---------------- | ----------------------- |
| return type              | `boolean`        | `value is SomeType`     |
| compiler narrowing       | সাধারণত করে না   | করে                     |
| type-safe branch support | সীমিত            | শক্তিশালী               |

## সাধারণ ভুল

1. predicate function-এ ভুল validation logic রাখা
2. return type `boolean` রেখে narrowing আশা করা
3. nested object validate না করে shallow check-এ সীমাবদ্ধ থাকা
4. runtime data-র অনির্ভরযোগ্য source-এ অসম্পূর্ণ predicate ব্যবহার করা

## Best Practices

1. unknown data handle করার সময় reusable predicate function তৈরি করা উচিত
2. predicate logic domain rule অনুযায়ী স্পষ্টভাবে লেখা প্রয়োজন
3. critical structure-এ property existence ছাড়াও property type check রাখা উত্তম
4. API boundary, parsing layer, এবং validation layer-এ type predicates বিশেষ কার্যকর

## সংক্ষিপ্ত সারাংশ

Type Predicates TypeScript-এ custom, explicit, এবং reusable type narrowing বাস্তবায়নের শক্তিশালী উপায়।  
সঠিকভাবে প্রয়োগ করলে unknown বা union data-এর উপর নিরাপদ branch logic তৈরি করা যায় এবং overall type safety উল্লেখযোগ্যভাবে উন্নত হয়।
