## সূচিপত্র

অধ্যায় ২: TypeScript Operators

2.1 TypeScript Operators
2.2 Nullish Coalescing
2.3 Non-null Assertion
2.4 Spread
2.5 Instanceof
2.6 in Operator

## অধ্যায় ২: TypeScript Operators

### কীভাবে পড়বে (Print-friendly)

1. আগে operator-এর purpose বোঝো, তারপর syntax দেখো  
2. মিল আছে এমন operator (`??` vs `||`, `in` vs `instanceof`) তুলনা করে পড়ো  
3. শেষে practice section করে নিজে condition logic লিখো  

## ২.১ TypeScript Operators

TypeScript Operators মূলত JavaScript operators-এর উপর ভিত্তি করে কাজ করে, তবে TypeScript-এর type system-এর কারণে operator ব্যবহার আরও নিরাপদ এবং predictable হয়।  
Operators ব্যবহার করা হয় value নিয়ে calculation, comparison, assignment, logical decision, এবং type-safe condition তৈরি করার জন্য।

## Operator কী?

Operator হলো এমন symbol বা keyword, যা operand (value/variable)-এর উপর নির্দিষ্ট operation চালায়।

উদাহরণ:

```ts
const a = 10;
const b = 5;
const result = a + b;
```

এখানে `+` হলো operator।

## TypeScript-এ Operator-এর প্রধান ধরন

1. Arithmetic Operators
2. Assignment Operators
3. Comparison Operators
4. Logical Operators
5. Unary Operators
6. Conditional (Ternary) Operator
7. Bitwise Operators (উন্নত পর্যায়)

## ১) Arithmetic Operators

Arithmetic operator দিয়ে গণিতভিত্তিক operation করা হয়।

| Operator | কাজ          |
| -------- | ------------ |
| `+`      | যোগ          |
| `-`      | বিয়োগ        |
| `*`      | গুণ          |
| `/`      | ভাগ          |
| `%`      | ভাগশেষ       |
| `**`     | power (সূচক) |

উদাহরণ:

```ts
const x: number = 12;
const y: number = 5;

console.log(x + y); // 17
console.log(x - y); // 7
console.log(x * y); // 60
console.log(x / y); // 2.4
console.log(x % y); // 2
console.log(x ** 2); // 144
```

## ২) Assignment Operators

Assignment operator variable-এ value set বা update করে।

| Operator | অর্থ             |
| -------- | ---------------- |
| `=`      | value assign     |
| `+=`     | যোগ করে assign   |
| `-=`     | বিয়োগ করে assign |
| `*=`     | গুণ করে assign   |
| `/=`     | ভাগ করে assign   |
| `%=`     | ভাগশেষ assign    |

উদাহরণ:

```ts
let total: number = 10;
total += 5; // 15
total *= 2; // 30
total -= 4; // 26
```

## ৩) Comparison Operators

Comparison operator দুটি value তুলনা করে boolean (`true/false`) ফল দেয়।

| Operator | কাজ              |
| -------- | ---------------- |
| `==`     | loose equality   |
| `===`    | strict equality  |
| `!=`     | loose not equal  |
| `!==`    | strict not equal |
| `>`      | বড়               |
| `<`      | ছোট              |
| `>=`     | বড় বা সমান       |
| `<=`     | ছোট বা সমান      |

TypeScript code-এ `===` এবং `!==` ব্যবহার করা উত্তম, কারণ এতে type coercion এড়ানো যায়।

```ts
console.log(5 === 5); // true
console.log(5 === "5"); // false
console.log(10 > 7); // true
```

## ৪) Logical Operators

Logical operator condition combine করতে ব্যবহৃত হয়।

| Operator | কাজ |
|---|---|
| `&&` | AND |
| `||` | OR |
| `!` | NOT |

উদাহরণ:

```ts
const isLoggedIn = true;
const isAdmin = false;

console.log(isLoggedIn && isAdmin); // false
console.log(isLoggedIn || isAdmin); // true
console.log(!isAdmin); // true
```

## ৫) Unary Operators

Unary operator একটিমাত্র operand-এর উপর কাজ করে।

| Operator | কাজ                |
| -------- | ------------------ |
| `+value` | numeric conversion |
| `-value` | negative           |
| `++`     | increment          |
| `--`     | decrement          |
| `typeof` | type check         |

উদাহরণ:

```ts
let count: number = 1;
count++; // 2
count--; // 1

const value = "100";
console.log(+value); // 100 (number)
console.log(typeof value); // string
```

## ৬) Conditional (Ternary) Operator

ছোট condition এক লাইনে লেখার জন্য ternary operator ব্যবহৃত হয়।

Syntax:

```ts
condition ? valueIfTrue : valueIfFalse;
```

উদাহরণ:

```ts
const marks: number = 75;
const result = marks >= 40 ? "Pass" : "Fail";
console.log(result); // Pass
```

## ৭) Bitwise Operators (সংক্ষিপ্ত পরিচিতি)

Bit level operation-এর জন্য bitwise operator ব্যবহৃত হয়।

| Operator | কাজ |
|---|---|
| `&` | AND |
| `|` | OR |
| `^` | XOR |
| `~` | NOT |
| `<<` | left shift |
| `>>` | right shift |

এই operator সাধারণ application logic-এ কম ব্যবহার হয়; performance-critical বা low-level ক্ষেত্রে বেশি দেখা যায়।

## TypeScript Operator ব্যবহারে গুরুত্বপূর্ণ সতর্কতা

1. equality check-এ `===` অগ্রাধিকার দেওয়া উচিত
2. arithmetic operator ব্যবহারের আগে operand type `number` কি না নিশ্চিত করা উচিত
3. nullable value থাকলে operator ব্যবহারের আগে null/undefined check করা প্রয়োজন
4. complex condition-এ parentheses ব্যবহার করলে readability বাড়ে

## Mini Practical Example

```ts
type User = {
  name: string;
  age: number;
  isMember: boolean;
};

const user: User = {
  name: "Rahim",
  age: 22,
  isMember: true,
};

const discount = user.isMember && user.age >= 18 ? 20 : 0;
const finalPrice = 1000 - (1000 * discount) / 100;

console.log(`Name: ${user.name}`);
console.log(`Discount: ${discount}%`);
console.log(`Final Price: ${finalPrice}`);
```

এই উদাহরণে comparison, logical, arithmetic, ternary এবং assignment operation একসাথে প্রয়োগ করা হয়েছে।

## সংক্ষিপ্ত সারাংশ

TypeScript Operators হলো program logic-এর মৌলিক ভিত্তি।  
সঠিক operator নির্বাচন এবং type-safe usage নিশ্চিত করা গেলে code আরও নির্ভুল, readable এবং maintainable হয়।

## ২.২ Nullish Coalescing

Nullish Coalescing operator (`??`) এমন ক্ষেত্রে ব্যবহার করা হয়, যেখানে কোনো value `null` বা `undefined` হলে একটি default value নেওয়া প্রয়োজন হয়।  
এটি বিশেষভাবে গুরুত্বপূর্ণ, কারণ logical OR (`||`) operator falsy value (`0`, `""`, `false`) থাকলেও default value বসিয়ে দেয়, যা অনেক ক্ষেত্রে অনাকাঙ্ক্ষিত।

## Nullish Coalescing Operator কী?

`??` operator left side-এর value return করে, যদি সেটি `null` বা `undefined` না হয়।  
যদি left side `null` বা `undefined` হয়, তাহলে right side-এর value return করে।

Syntax:

```ts
const result = leftValue ?? defaultValue;
```

## `??` বনাম `||` (গুরুত্বপূর্ণ পার্থক্য)

| বিষয় | `||` | `??` |
|---|---|---|
| `null` হলে | default নেয় | default নেয় |
| `undefined` হলে | default নেয় | default নেয় |
| `0` হলে | default নেয় | `0` রাখে |
| `""` হলে | default নেয় | `""` রাখে |
| `false` হলে | default নেয় | `false` রাখে |

এই কারণে nullable data handle করার সময় `??` বেশি নির্ভুল।

## Basic Example

```ts
const username: string | null = null;
const displayName = username ?? "Guest";
console.log(displayName); // Guest
```

```ts
const score: number = 0;
const finalScore = score ?? 100;
console.log(finalScore); // 0
```

উপরের দ্বিতীয় উদাহরণে `0` falsy হলেও `??` এটি preserve করে।

## Practical Use Case

API response বা optional config value-এ `null/undefined` handling-এর জন্য `??` খুব কার্যকর।

```ts
type Config = {
  apiUrl?: string;
  retryCount?: number;
};

const config: Config = {
  apiUrl: undefined,
  retryCount: 0,
};

const apiUrl = config.apiUrl ?? "https://default-api.example.com";
const retryCount = config.retryCount ?? 3;

console.log(apiUrl); // https://default-api.example.com
console.log(retryCount); // 0
```

## Optional Chaining এর সাথে `??` ব্যবহার

Nested optional property access-এ optional chaining (`?.`) এবং nullish coalescing (`??`) একসাথে ব্যবহার করা সুবিধাজনক।

```ts
type User = {
  profile?: {
    nickname?: string;
  };
};

const user: User = {};
const nickname = user.profile?.nickname ?? "No Nickname";

console.log(nickname); // No Nickname
```

## Best Practices

1. nullable value (`null | undefined`) handle করতে `??` অগ্রাধিকার দেওয়া উচিত
2. falsy value preserve করা দরকার হলে `||` এর পরিবর্তে `??` ব্যবহার করা উচিত
3. optional chaining (`?.`) এর সাথে `??` ব্যবহার করলে nested data handling সহজ হয়
4. default value domain অনুযায়ী meaningful রাখা উচিত

## সংক্ষিপ্ত সারাংশ

Nullish Coalescing (`??`) TypeScript-এ safe default value selection-এর জন্য একটি গুরুত্বপূর্ণ operator।  
এটি শুধুমাত্র `null` এবং `undefined` fallback করে, ফলে `0`, `false`, এবং empty string-এর মতো valid falsy value অক্ষত থাকে।

## ২.৩ Non-null Assertion

Non-null Assertion operator (`!`) TypeScript-এ এমন একটি syntax, যা compiler-কে জানায় যে কোনো value `null` বা `undefined` নয়।  
এটি type narrowing ছাড়াই manually assertion করার একটি উপায়।

## Non-null Assertion Operator কী?

যখন কোনো variable-এর type `T | null | undefined` হয়, তখন সরাসরি property/method access করলে TypeScript error দিতে পারে।  
সেই ক্ষেত্রে variable-এর পরে `!` বসিয়ে জানানো হয় যে value নিশ্চিতভাবে nullish নয়।

Syntax:

```ts
value!.property;
```

## Basic Example

```ts
let userName: string | null = "Rahim";

const length = userName!.length;
console.log(length); // 5
```

এখানে `userName!` ব্যবহার করে compiler-কে null check ছাড়াই access করতে বলা হয়েছে।

## DOM Use Case (Common Scenario)

Web development-এ `document.getElementById()` প্রায়ই `HTMLElement | null` return করে।  
DOM element নিশ্চিতভাবে থাকলে `!` ব্যবহার করা হয়।

```ts
const app = document.getElementById("app")!;
app.textContent = "TypeScript Non-null Assertion";
```

## Function Parameter Use Case

```ts
type User = {
  id: number;
  email?: string;
};

function printEmail(user: User): void {
  console.log(user.email!.toLowerCase());
}
```

উপরের উদাহরণে `email` optional হওয়ায় compiler warning আসতে পারে; `!` দিয়ে assertion করা হয়েছে।

## Non-null Assertion ব্যবহারে ঝুঁকি

`!` ভুলভাবে ব্যবহার করা হলে runtime error হতে পারে, কারণ এটি শুধুমাত্র compiler-কে চুপ করায়; runtime safety নিশ্চিত করে না।

উদাহরণ:

```ts
let token: string | null = null;
console.log(token!.length); // Runtime error
```

তাই `!` ব্যবহারের আগে data flow নিশ্চিত হওয়া জরুরি।

## নিরাপদ বিকল্প (Recommended)

### 1) Explicit Null Check

```ts
if (userName !== null) {
  console.log(userName.length);
}
```

### 2) Optional Chaining

```ts
console.log(userName?.length);
```

### 3) Nullish Coalescing সহ

```ts
const safeName = userName ?? "Unknown";
console.log(safeName.length);
```

## Non-null Assertion বনাম Type Assertion

| বিষয়          | Non-null Assertion (`!`)      | Type Assertion (`as Type`)      |
| ------------- | ----------------------------- | ------------------------------- |
| উদ্দেশ্য      | null/undefined নেই বলে জানানো | value নির্দিষ্ট type বলে জানানো |
| null handling | directভাবে nullish remove করে | null remove না-ও করতে পারে      |
| ঝুঁকি         | runtime null error            | wrong type হলে runtime issue    |

## Best Practices

1. `!` শুধুমাত্র নিশ্চিত non-null পরিস্থিতিতে ব্যবহার করা উচিত
2. DOM element বা lifecycle-controlled value-এ সীমিত ব্যবহার উত্তম
3. business logic data-এ আগে explicit null check করা নিরাপদ
4. code review-এ `!` ব্যবহৃত লাইনগুলো আলাদাভাবে যাচাই করা প্রয়োজন

## সংক্ষিপ্ত সারাংশ

Non-null Assertion (`!`) TypeScript-এ একটি শক্তিশালী কিন্তু সতর্কতাসাপেক্ষ feature।  
এটি compiler error কমাতে সহায়ক হলেও ভুল প্রয়োগে runtime error তৈরি করতে পারে; তাই controlled এবং well-verified context-এ ব্যবহার করা উচিত।

## ২.৪ Spread

Spread operator (`...`) TypeScript এবং JavaScript-এ iterable বা object-এর element/property expand করার জন্য ব্যবহৃত হয়।  
এটি data copy, merge, update এবং immutable style coding-এর জন্য অত্যন্ত কার্যকর।

## Spread Operator কী?

`...` operator কোনো array, object, বা iterable value-এর contentকে আলাদা উপাদান হিসেবে বিস্তৃত (expand) করে।

Syntax (Array):

```ts
const newArray = [...oldArray];
```

Syntax (Object):

```ts
const newObject = { ...oldObject };
```

## Array-এ Spread ব্যবহার

### 1) Array copy

```ts
const numbers: number[] = [1, 2, 3];
const copiedNumbers = [...numbers];

console.log(copiedNumbers); // [1, 2, 3]
```

### 2) Array merge

```ts
const first = [1, 2];
const second = [3, 4];
const merged = [...first, ...second];

console.log(merged); // [1, 2, 3, 4]
```

### 3) Array-এ নতুন value যোগ

```ts
const base = [10, 20];
const updated = [...base, 30, 40];

console.log(updated); // [10, 20, 30, 40]
```

## Object-এ Spread ব্যবহার

### 1) Object copy

```ts
const user = { name: "Rahim", age: 22 };
const copiedUser = { ...user };
```

### 2) Object merge

```ts
const profile = { name: "Karim", age: 25 };
const account = { role: "admin", active: true };

const fullUser = { ...profile, ...account };
console.log(fullUser);
```

### 3) Object property update (immutable style)

```ts
const product = { id: 1, title: "Book", price: 500 };
const updatedProduct = { ...product, price: 550 };

console.log(updatedProduct); // price updated
```

## Property Overwrite Rule

Object merge-এর ক্ষেত্রে একই key একাধিকবার থাকলে ডান পাশের (later) value final result-এ থাকে।

```ts
const a = { name: "A", role: "user" };
const b = { role: "admin" };

const result = { ...a, ...b };
console.log(result); // { name: "A", role: "admin" }
```

## Function Arguments-এ Spread ব্যবহার

Spread operator function call-এর সময় array element expand করতে ব্যবহৃত হয়।

```ts
function add(a: number, b: number, c: number): number {
  return a + b + c;
}

const values: [number, number, number] = [5, 10, 15];
const total = add(...values);

console.log(total); // 30
```

## Spread বনাম Rest (সংক্ষেপে)

`...` একই symbol হলেও কাজ ভিন্ন:

- **Spread:** existing data expand করে
- **Rest:** multiple value collect করে

```ts
// Spread
const arr = [1, 2, 3];
const copy = [...arr];

// Rest
function sum(...nums: number[]) {
  return nums.reduce((a, b) => a + b, 0);
}
```

## TypeScript-এ Spread ব্যবহারের সুবিধা

1. immutable update pattern সহজ করে
2. array/object merge সংক্ষিপ্ত ও readable হয়
3. state update (React/Ngrx ইত্যাদি) এ widely ব্যবহৃত
4. side effect কমিয়ে predictable code লিখতে সহায়তা করে

## গুরুত্বপূর্ণ সতর্কতা

1. Spread সাধারণত shallow copy তৈরি করে (nested object deep copy হয় না)
2. nested data update করলে reference-sharing issue হতে পারে
3. object merge-এর overwrite order (`...a, ...b`) সচেতনভাবে ব্যবহার করা প্রয়োজন

## Nested Object-এ সতর্কতার উদাহরণ

```ts
const original = {
  user: { name: "Rahim", age: 22 },
};

const copied = { ...original };
copied.user.age = 30;

console.log(original.user.age); // 30 (কারণ shallow copy)
```

## সংক্ষিপ্ত সারাংশ

Spread operator (`...`) TypeScript-এ array/object data expand, copy এবং merge করার জন্য একটি মৌলিক টুল।  
এটি concise syntax, immutable coding style, এবং maintainable update pattern নিশ্চিত করতে গুরুত্বপূর্ণ ভূমিকা পালন করে।

## ২.৫ Instanceof

`instanceof` হলো একটি runtime operator, যা নির্ধারণ করে কোনো object নির্দিষ্ট class বা constructor function-এর instance কি না।  
TypeScript-এ এটি বিশেষভাবে গুরুত্বপূর্ণ, কারণ এটি type narrowing-এ সাহায্য করে এবং union type handle করার সময় নিরাপদ branching নিশ্চিত করে।

## `instanceof` কীভাবে কাজ করে

`instanceof` object-এর prototype chain পরীক্ষা করে।  
যদি object-এর chain-এ নির্দিষ্ট constructor-এর prototype পাওয়া যায়, তাহলে ফল `true`; অন্যথায় `false`।

Syntax:

```ts
objectValue instanceof ClassName;
```

## Basic Example

```ts
class Animal {}
class Dog extends Animal {}

const pet = new Dog();

console.log(pet instanceof Dog); // true
console.log(pet instanceof Animal); // true
```

এখানে `Dog` class `Animal` থেকে inherit করেছে, তাই উভয় check `true`।

## Type Narrowing-এ `instanceof`

TypeScript union type নিয়ে কাজ করার সময় `instanceof` ব্যবহার করে compiler-কে নির্দিষ্ট type narrow করা যায়।

```ts
class Car {
  drive() {
    console.log("Driving car");
  }
}

class Bike {
  ride() {
    console.log("Riding bike");
  }
}

function move(vehicle: Car | Bike): void {
  if (vehicle instanceof Car) {
    vehicle.drive();
  } else {
    vehicle.ride();
  }
}
```

উপরের উদাহরণে `if` branch-এ `vehicle` type `Car` হয়ে যায়, এবং `else` branch-এ `Bike` হিসেবে narrow হয়।

## Practical Use Case: Error Handling

Runtime error type differentiate করার জন্য `instanceof` ব্যাপকভাবে ব্যবহৃত হয়।

```ts
try {
  throw new TypeError("Invalid type");
} catch (error: unknown) {
  if (error instanceof TypeError) {
    console.log("Type error detected");
  } else if (error instanceof Error) {
    console.log("Generic error detected");
  }
}
```

## `instanceof` বনাম `typeof`

| বিষয়            | `instanceof`                | `typeof`                        |
| --------------- | --------------------------- | ------------------------------- |
| কাজ             | object/class instance check | primitive type check            |
| ব্যবহার ক্ষেত্র | class-based object          | string, number, boolean ইত্যাদি |
| runtime ভিত্তি  | prototype chain             | JavaScript primitive tag        |

উদাহরণ:

```ts
console.log([] instanceof Array); // true
console.log(typeof []); // object
console.log(typeof "hello"); // string
```

## গুরুত্বপূর্ণ সীমাবদ্ধতা

1. `instanceof` সাধারণ object literal-এর ক্ষেত্রে class identity দেয় না
2. ভিন্ন execution context (যেমন iframe) এ কিছু ক্ষেত্রে প্রত্যাশিত ফল নাও আসতে পারে
3. interface-এর ক্ষেত্রে `instanceof` কাজ করে না, কারণ interface runtime-এ থাকে না

## Interface ক্ষেত্রে বিকল্প কৌশল

Interface type check করতে custom type guard ব্যবহার করা হয়:

```ts
interface User {
  name: string;
}

function isUser(value: unknown): value is User {
  return typeof value === "object" && value !== null && "name" in value;
}
```

## Best Practices

1. class/constructor ভিত্তিক check-এ `instanceof` ব্যবহার করা উচিত
2. interface type check-এর জন্য custom type guard ব্যবহার করা উত্তম
3. union type branch-এ `instanceof` ব্যবহার করলে readable এবং safe code পাওয়া যায়
4. error handling ব্লকে `unknown` + `instanceof` pattern অনুসরণ করা কার্যকর

## সংক্ষিপ্ত সারাংশ

`instanceof` TypeScript-এ class instance detection এবং runtime type narrowing-এর জন্য একটি গুরুত্বপূর্ণ operator।  
সঠিকভাবে ব্যবহার করলে এটি conditional logic স্পষ্ট করে, runtime validation উন্নত করে, এবং type-safe branching নিশ্চিত করে।

## ২.৬ in Operator

`in` operator ব্যবহার করা হয় কোনো property/key নির্দিষ্ট object-এর মধ্যে আছে কি না যাচাই করার জন্য।  
TypeScript-এ এটি type narrowing-এর জন্য বিশেষভাবে উপযোগী, বিশেষ করে union object type handle করার সময়।

## `in` Operator কী?

`in` operator একটি string (property name) এবং একটি object নিয়ে কাজ করে।  
যদি property object-এর own property বা prototype chain-এ থাকে, তাহলে ফল `true`; না থাকলে `false`।

Syntax:

```ts
"propertyName" in objectValue;
```

## Basic Example

```ts
const user = {
  name: "Rahim",
  age: 24,
};

console.log("name" in user); // true
console.log("email" in user); // false
```

## Type Narrowing-এ `in` Operator

Union type object-এ ভিন্ন property থাকলে `in` operator branch-specific type identify করতে সাহায্য করে।

```ts
type Admin = {
  name: string;
  permissions: string[];
};

type Customer = {
  name: string;
  purchaseCount: number;
};

function printUserInfo(user: Admin | Customer): void {
  if ("permissions" in user) {
    console.log("Admin:", user.permissions.join(", "));
  } else {
    console.log("Customer purchases:", user.purchaseCount);
  }
}
```

এখানে `"permissions" in user` condition `user`-কে `Admin` টাইপে narrow করে।

## Optional Property ক্ষেত্রে `in` ব্যবহারের দিকনির্দেশ

যদি property optional হয়, `in` operator `true` দিতে পারে কিন্তু value `undefined` হতে পারে।  
তাই প্রয়োজনে value check আলাদাভাবে করা উচিত।

```ts
type Profile = {
  nickname?: string;
};

const profile: Profile = { nickname: undefined };

if ("nickname" in profile) {
  console.log("Key exists");
}
```

## `in` বনাম `hasOwnProperty`

| বিষয়                        | `in`       | `hasOwnProperty`      |
| --------------------------- | ---------- | --------------------- |
| Own property check          | করে        | করে                   |
| Prototype chain check       | করে        | করে না                |
| Type narrowing (TypeScript) | সমর্থন করে | সাধারণত কম ব্যবহার হয় |

সংক্ষেপে, TypeScript type narrowing-এর জন্য `in` বেশি সুবিধাজনক।

## Practical Use Case: API Response Narrowing

```ts
type SuccessResponse = {
  data: string[];
};

type ErrorResponse = {
  error: string;
};

function handleResponse(response: SuccessResponse | ErrorResponse): void {
  if ("data" in response) {
    console.log("Items:", response.data.length);
  } else {
    console.log("Error:", response.error);
  }
}
```

## গুরুত্বপূর্ণ সতর্কতা

1. primitive value (যেমন `number`, `string`) এর সাথে `in` ব্যবহার উপযুক্ত নয়
2. `in` key presence যাচাই করে, value validity নয়
3. optional key থাকলে প্রয়োজনে `undefined` check অতিরিক্তভাবে করা উচিত
4. prototype chain নিয়ে ambiguity এড়াতে context বুঝে operator নির্বাচন করা প্রয়োজন

## Best Practices

1. union object type narrow করতে `in` operator অগ্রাধিকার দেওয়া উচিত
2. API response handling-এ discriminative property check-এ `in` ব্যবহার কার্যকর
3. optional property ক্ষেত্রে key check-এর পাশাপাশি value check রাখা নিরাপদ
4. class instance check-এর ক্ষেত্রে `in` নয়, `instanceof` ব্যবহার করা উত্তম

## সংক্ষিপ্ত সারাংশ

`in` operator TypeScript-এ object key existence যাচাই এবং union type narrowing-এর জন্য অত্যন্ত কার্যকর।  
সঠিকভাবে ব্যবহার করলে object-based branching আরও পরিষ্কার, নিরাপদ, এবং maintainable হয়।

---

## অধ্যায় ২ সারসংক্ষেপ

এই অধ্যায়ে আমরা শিখলাম:

1. TypeScript operators-এর core categories এবং practical usage  
2. `??`, non-null assertion, spread, `instanceof`, এবং `in` operator  
3. type-safe condition, fallback logic, এবং narrowing strategy  

Operator mastery থাকলে expression-level bug কমে এবং code readability অনেক বাড়ে।

---

## অনুশীলনী (Practice)

1. `??` এবং `||` এর পার্থক্য দেখাতে ৫টি উদাহরণ লিখো  
2. `instanceof` দিয়ে union class type narrow করার function লিখো  
3. `in` operator দিয়ে API response branching implement করো  
4. spread operator দিয়ে immutable merge/update utility তৈরি করো  

---

## References

- [TypeScript Handbook - Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [MDN - Nullish Coalescing Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)
- [MDN - Spread Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
