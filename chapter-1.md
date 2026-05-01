## সূচিপত্র

অধ্যায় ১: Introduction to TypeScript

1.1 TypeScript-এর ইতিহাস  
1.2 TypeScript কী  
1.3 TypeScript vs JavaScript  
1.4 TypeScript Installation  
1.5 TypeScript Compilation  
1.6 TypeScript Project Setup  
1.7 TypeScript File Using the Command Line

## অধ্যায় ১: Introduction to TypeScript

### কীভাবে পড়বে (Print-friendly)

1. প্রতিটি section-এ আগে concept অংশ পড়বে  
2. এরপর code example দেখে concept মিলিয়ে বুঝবে  
3. chapter শেষে অনুশীলনী সমাধান করে শেখা যাচাই করবে  

## ১.১ TypeScript-এর ইতিহাস (History of TypeScript)

TypeScript তৈরি করার মূল উদ্দেশ্য ছিল বড় JavaScript project-এ code quality, maintainability এবং developer productivity বাড়ানো। JavaScript খুব জনপ্রিয় হলেও বড় application-এ type-related bug, complex refactor, এবং team collaboration-এর সময় অনেক সমস্যা দেখা দিত। এই সমস্যা সমাধানের জন্যই TypeScript-এর জন্ম।

### TypeScript তৈরি হয় কবে এবং কারা বানায়?

- TypeScript তৈরি করে **Microsoft**।
- এর lead architect ছিলেন **Anders Hejlsberg** (যিনি C#-এর design-এর সাথেও যুক্ত ছিলেন)।
- TypeScript প্রথম publicly introduce করা হয় **October 2012** সালে।

Microsoft TypeScript-কে open-source করে দেয়, যাতে community এবং industry একসাথে এটি উন্নত করতে পারে। শুরু থেকেই TypeScript-এর design goal ছিল: JavaScript ecosystem-এর সাথে compatible থেকে stronger tooling ও safer development experience দেওয়া।

### TypeScript কেন দরকার হয়েছিল?

JavaScript ছোট script-এর জন্য খুব ভালো, কিন্তু project বড় হলে কিছু বাস্তব সমস্যা দেখা যায়:

1. runtime-এ type error ধরা পড়ে (অনেক দেরিতে)
2. codebase বড় হলে function/object data structure বোঝা কঠিন হয়
3. refactor করলে কোথায় কী ভাঙবে, নিশ্চিত হওয়া কঠিন
4. বড় team-এ consistent code maintain করা challenging

TypeScript এই সমস্যাগুলো কমাতে static typing, interfaces, better IDE support, এবং compile-time error checking দেয়।

### TypeScript-এর শুরু থেকে বিকাশ (সংক্ষেপে timeline)

### 2012: প্রথম release

TypeScript 0.x সিরিজে language-এর foundation তৈরি হয়: basic type system, classes, modules ইত্যাদি।

### 2014: TypeScript 1.0

Language stable stage-এ পৌঁছায় এবং enterprise project-এ adoption বাড়তে শুরু করে।

### 2016 onward: দ্রুত উন্নয়ন

TypeScript 2.x সিরিজে language অনেক mature হয়। type system আরও শক্তিশালী হয়, এবং real-world app development-এর জন্য feature set ব্যাপকভাবে বাড়ে।

### পরবর্তী বছরগুলো

TypeScript 3.x, 4.x, 5.x ধারাবাহিকভাবে performance, type inference, tooling, এবং modern JavaScript support উন্নত করে। এর ফলে React, Angular, Node.js, Next.js ecosystem-এ TypeScript ব্যাপকভাবে জনপ্রিয় হয়ে ওঠে।

### JavaScript-এর সাথে TypeScript-এর সম্পর্ক

TypeScript কখনো JavaScript-এর বিকল্প (replacement) না; বরং JavaScript-এর উন্নত সংস্করণ হিসেবে কাজ করে।

- TypeScript code compile হয়ে JavaScript-এ রূপান্তরিত হয়।
- JavaScript-এর valid code TypeScript-এ valid।
- তাই existing JS project ধীরে ধীরে TypeScript-এ migrate করা সম্ভব।

এটাই TypeScript adoption-এর বড় কারণ: পুরো project নতুন করে লিখতে হয় না।

### বর্তমান সময়ে TypeScript-এর গুরুত্ব

আজকে modern web development-এ TypeScript একটি industry-standard skill হয়ে গেছে, বিশেষ করে:

- large frontend app (React, Angular, Vue)
- backend API development (Node.js, NestJS, Express)
- fullstack project
- long-term maintainable product development

এক কথায়, TypeScript-এর history দেখায় যে এটি কেবল একটি language feature না, বরং JavaScript ecosystem-কে scalable engineering practice-এর দিকে নিয়ে যাওয়ার একটি বড় ধাপ।

## ১.২ TypeScript কী?

TypeScript একটি শক্তিশালী, ওপেন-সোর্স প্রোগ্রামিং ভাষা, যা JavaScript-এর উপর ভিত্তি করে তৈরি এবং এতে optional static typing যুক্ত করা হয়েছে। সহজভাবে বললে, TypeScript ডেভেলপারদের আরও নির্ভরযোগ্য ও কম ভুলযুক্ত কোড লিখতে সাহায্য করে, কারণ এতে ভ্যারিয়েবল, ফাংশনের আর্গুমেন্ট এবং রিটার্ন ভ্যালুর টাইপ নির্ধারণ করা যায়।

JavaScript-এ যেখানে টাইপ সাধারণত runtime-এ (কোড চালানোর সময়) নির্ধারিত হয়, সেখানে TypeScript কোড লেখার সময়ই টাইপ-সংক্রান্ত ভুলগুলো ধরতে পারে। ফলে পরবর্তীতে বাগ হওয়ার সম্ভাবনা অনেক কমে যায়।

TypeScript মূলত JavaScript-এর একটি superset। অর্থাৎ, JavaScript-এর যেকোনো valid কোড TypeScript-এও valid।

### TypeScript কেন গুরুত্বপূর্ণ?

JavaScript-এ টাইপ সাধারণত runtime-এ (কোড চালানোর সময়) নির্ধারিত হয়। তাই কিছু ভুল অনেক দেরিতে ধরা পড়ে।  
TypeScript compile time-এ (কোড compile করার সময়) এসব ভুল ধরতে পারে।

এর ফলে:

- runtime error কমে
- কোড আরও predictable হয়
- debugging সহজ হয়
- বড় project maintain করা সহজ হয়

### TypeScript-এর মূল বৈশিষ্ট্য

### 1) Static Typing

ডেটার ধরন আগে থেকেই define করা যায়।

### 2) Interfaces

Object-এর structure বা shape নির্দিষ্ট করে দেওয়া যায়।

### 3) Generics

Reusable এবং type-safe code লেখা যায়।

### 4) Better Tooling

Auto-completion, refactoring support, type hints, debugging experience আরও ভালো হয়।

### 5) Modern JavaScript Support

আধুনিক ECMAScript feature-এর সাপোর্ট থাকে এবং TypeScript compiler এর মাধ্যমে compatibility manage করা যায়।

### TypeScript কীভাবে চলে?

TypeScript code সরাসরি execute হয় না।  
প্রথমে `.ts` ফাইলকে JavaScript-এ convert (compile/transpile) করা হয়, তারপর browser বা Node.js-এ run হয়।

ধাপগুলো:

1. `.ts` ফাইলে কোড লেখা
2. `tsc` compiler দিয়ে compile করা
3. `.js` ফাইল generate হওয়া
4. generated JavaScript execute করা

### ছোট উদাহরণ (Hello World)

```ts
let message: string = "Hello, World!";
console.log(message);
```

Compile:

```bash
tsc hello.ts
```

তারপর run:

```bash
node hello.js
```

Output:

```text
Hello, World!
```

### এক লাইনে সংক্ষেপে

TypeScript হলো JavaScript-এর উন্নত সংস্করণ, যা type safety, early error detection এবং ভালো developer tooling দিয়ে scalable application তৈরি সহজ করে।

## ১.৩ TypeScript vs JavaScript (বিস্তারিত তুলনা)

JavaScript এবং TypeScript একে অপরের খুব কাছের ভাষা, কারণ TypeScript আসলে JavaScript-এর উপরেই তৈরি। তবুও real project-এ কাজ করার সময় দুইটার মধ্যে কিছু গুরুত্বপূর্ণ পার্থক্য আছে। নিচে সহজভাবে ব্যাখ্যা করা হলো।

### 1) Typing System

- **JavaScript:** Dynamically typed (টাইপ runtime-এ নির্ধারিত হয়)
- **TypeScript:** Statically typed style (optional), টাইপ compile-time-এ check হয়

উদাহরণ:

```js
// JavaScript
let price = 500;
price = "500"; // JS এটা allow করে
```

```ts
// TypeScript
let price: number = 500;
price = "500"; // Error
```

এখানে TypeScript আগে থেকেই ভুল ধরছে, যা JavaScript সাধারণত runtime-এর আগে ধরতে পারে না।

### 2) Error Detection Time

- **JavaScript:** বেশিরভাগ ভুল কোড চালানোর পরে ধরা পড়ে
- **TypeScript:** অনেক ভুল কোড লেখার সময়/compile-এর সময় ধরা পড়ে

এজন্য TypeScript-এ production bug কম হওয়ার সম্ভাবনা বেশি।

### 3) Compilation

- **JavaScript:** সরাসরি browser/Node.js-এ run হয়
- **TypeScript:** আগে `tsc` দিয়ে compile হয়ে JavaScript-এ convert হয়, তারপর run হয়

অর্থাৎ TypeScript-এ extra build step আছে, কিন্তু এর বিনিময়ে type safety পাওয়া যায়।

### 4) Code Maintainability

- **JavaScript:** ছোট project-এ দ্রুত কাজের জন্য দারুণ
- **TypeScript:** medium/large project-এ maintain করা সহজ

কারণ TypeScript-এ function-এর input/output, object structure, model ইত্যাদি পরিষ্কারভাবে type দিয়ে লেখা থাকে।

### 5) Tooling এবং IDE Support

- **JavaScript:** basic IntelliSense
- **TypeScript:** advanced IntelliSense, better autocomplete, safer refactor, smart navigation

বড় codebase-এ এই featureগুলো developer productivity অনেক বাড়ায়।

### 6) OOP এবং Advanced Features

TypeScript-এ interfaces, generics, access modifiers (`public`, `private`, `protected`) এর মতো feature ব্যবহার করে structured code লেখা সহজ হয়। JavaScript-এ অনেক কিছু possible হলেও TypeScript এগুলোকে type-safe ভাবে enforce করতে সাহায্য করে।

### 7) Learning Curve

- **JavaScript:** শুরু করা সহজ
- **TypeScript:** শুরুতে type system, interface, generic শেখায় একটু সময় লাগে

তবে একবার বুঝে গেলে long-term-এ কাজ অনেক smoother হয়।

### সংক্ষিপ্ত তুলনামূলক টেবিল

| বিষয়            | JavaScript           | TypeScript                       |
| --------------- | -------------------- | -------------------------------- |
| Language Type   | Dynamic              | Static typing support (optional) |
| Error Catch     | Runtime              | Compile-time + Runtime           |
| Run Process     | Direct run           | Compile করে JS run               |
| Tooling         | Basic                | Rich and smart tooling           |
| Best For        | ছোট/দ্রুত script     | বড়, scalable application         |
| Maintainability | বড় হলে জটিল হতে পারে | বড় project-এ বেশি manageable     |

### Practical Decision: কখন কোনটা ব্যবহার করবে?

### JavaScript বেছে নেওয়া উপযোগী যদি:

- ছোট project বা quick prototype তৈরি করা হয়
- setup খুব minimal রাখা প্রয়োজন হয়
- এককভাবে ছোট scope-এ কাজ করা হয়

### TypeScript বেছে নেওয়া উপযোগী যদি:

- project বড় বা long-term হয়
- multiple developer/team একসাথে কাজ করে
- frequent refactor করতে হয়
- production bug কমানো লক্ষ্য থাকে

### Final Verdict

JavaScript হলো foundation, আর TypeScript হলো সেই foundation-এর ওপর নিরাপদ ও scalable layer।  
তাই modern professional development-এ সাধারণত JavaScript জানা বাধ্যতামূলক, আর TypeScript জানা বড় সুবিধা নয়—প্রায় প্রয়োজনীয় skill।

## ১.৪ TypeScript Installation

এই অংশে একদম শুরু থেকে দেখানো হলো কীভাবে কম্পিউটারে TypeScript install, verify এবং প্রথম `.ts` ফাইল run করা হয়।

### Installation-এর আগে কী লাগবে?

TypeScript install করার জন্য সিস্টেমে আগে **Node.js** থাকতে হবে। কারণ:

- `npm` (Node Package Manager) দিয়ে TypeScript install হয়
- `npx` দিয়ে TypeScript compiler (`tsc`) run করা যায়

### Step 1: Node.js install আছে কি না check করা

Terminal/PowerShell এ চালাতে হবে:

```bash
node -v
npm -v
```

যদি version দেখায় (যেমন `v20.x.x`), তাহলে Node.js ঠিক আছে।  
যদি command not found/recognized error আসে, তাহলে আগে Node.js install করতে হবে।

### TypeScript install করার 2টা জনপ্রিয় পদ্ধতি

### Method A: Global Installation (শুরুতে সহজ)

এই method-এ TypeScript পুরো সিস্টেমে install হবে।

```bash
npm install -g typescript
```

তারপর check করতে হবে:

```bash
tsc -v
```

এতে যেকোনো folder থেকে `tsc` command চালানো যাবে।

### Method B: Project-based Local Installation (best practice)

Professional project-এ সাধারণত local installation ব্যবহার করা হয়, যাতে project-এর dependency version control করা যায়।

ধাপগুলো:

```bash
npm init -y
npm install --save-dev typescript
```

তারপর version check:

```bash
npx tsc -v
```

এখানে `npx` local project-এর TypeScript ব্যবহার করে।

### নতুন TypeScript project setup (Recommended)

### Step 1: Project folder তৈরি

```bash
mkdir typescript-demo
cd typescript-demo
```

### Step 2: `package.json` initialize

```bash
npm init -y
```

### Step 3: TypeScript install

```bash
npm install --save-dev typescript
```

### Step 4: `tsconfig.json` generate

```bash
npx tsc --init
```

`tsconfig.json` হলো TypeScript compiler configuration file।  
এখানে compile target, module system, strict type checking সহ অনেক setting থাকে।

### First TypeScript file run করা

### Step 1: `index.ts` ফাইল তৈরি

```ts
const message: string = "Hello TypeScript";
console.log(message);
```

### Step 2: compile করা

```bash
npx tsc index.ts
```

এতে `index.js` তৈরি হবে।

### Step 3: Node.js দিয়ে run করা

```bash
node index.js
```

Expected output:

```text
Hello TypeScript
```

### Auto-compile mode (watch mode)

বারবার manually compile না করে watch mode ব্যবহার করা যায়:

```bash
npx tsc --watch
```

এতে `.ts` ফাইল save করলেই compiler automatic `.js` update করবে।

### `tsconfig.json`-এর গুরুত্বপূর্ণ basic options

নতুনরা এই optionগুলো জানলে setup বুঝতে সহজ হয়:

- `target`: কোন JavaScript version-এ compile করা হবে (যেমন `ES2020`)
- `module`: module system (`commonjs`, `esnext` ইত্যাদি)
- `rootDir`: source code folder
- `outDir`: compiled JS কোথায় যাবে
- `strict`: strict type checking on/off
- `sourceMap`: debugging এর জন্য source map generate

উদাহরণ:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true
  }
}
```

### `src` থেকে `dist` build flow (ভালো practice)

Recommended structure:

- `src/` -> TypeScript source code
- `dist/` -> compiled JavaScript output

Example:

1. `src/index.ts` এ code লেখা হয়
2. `npx tsc` চালানো হয়
3. `dist/index.js` তৈরি হবে
4. `node dist/index.js` দিয়ে run করা হয়

### `package.json` script add করলে কাজ সহজ হয়

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsc --watch"
  }
}
```

এখন command:

- `npm run build`
- `npm run start`
- `npm run dev`

### সাধারণ সমস্যা ও সমাধান

### 1) `tsc is not recognized`

কারণ:

- TypeScript global install নেই, বা PATH issue

সমাধান:

- local install ব্যবহার করে `npx tsc ...` চালাতে হবে
- অথবা global install করতে হবে: `npm install -g typescript`

### 2) `Cannot find name 'console'` বা built-in type issue

কারণ:

- lib/type definition mismatch

সমাধান:

- `tsconfig.json` এর `lib` check করতে হবে
- Node project হলে প্রয়োজনে `@types/node` install:

```bash
npm install --save-dev @types/node
```

### 3) `.ts` run হচ্ছে না

কারণ:

- `.ts` সরাসরি Node দিয়ে run করা যায় না (default setup-এ)

সমাধান:

- আগে compile: `npx tsc`
- তারপর generated `.js` run করতে হবে

### Beginner-এর জন্য best installation recommendation

শেখার জন্য নিচের pattern follow করা যেতে পারে:

1. project folder create
2. `npm init -y`
3. `npm install -D typescript`
4. `npx tsc --init`
5. `src/index.ts` তৈরি
6. `npx tsc`
7. `node dist/index.js` (যদি `outDir` সেট করা থাকে)

এই flow বুঝে গেলে পরে React/Node/Next.js project-এ TypeScript setup করা খুব সহজ হবে।

## ১.৫ TypeScript Compilation (বিস্তারিত ব্যাখ্যা)

TypeScript Compilation হলো সেই প্রক্রিয়া, যেখানে `.ts` (TypeScript) ফাইলকে `.js` (JavaScript) ফাইলে রূপান্তর করা হয়।  
কারণ browser এবং Node.js সরাসরি TypeScript চালায় না; runtime-এ JavaScript-ই execute হয়।

TypeScript compiler-এর নাম `tsc` (TypeScript Compiler)।

### Compilation কেন প্রয়োজন?

TypeScript ব্যবহার করার প্রধান উদ্দেশ্য type safety এবং better development tooling। কিন্তু execution environment (browser/Node.js) সাধারণত JavaScript বুঝে।  
তাই TypeScript development phase-এ সাহায্য করে, এবং compilation শেষে JavaScript runtime-এ কাজ করে।

Compilation প্রক্রিয়া মূলত ৩টি কাজ করে:

1. **Type Checking**: type mismatch, ভুল usage ইত্যাদি যাচাই করা
2. **Transpilation**: TypeScript syntax থেকে JavaScript syntax-এ রূপান্তর
3. **Output Generation**: configured folder-এ `.js` (এবং optional map/declaration) তৈরি

### Compilation Flow (ধাপভিত্তিক)

একটি সাধারণ flow নিচের মতো:

1. `src/` ফোল্ডারে `.ts` ফাইল লেখা
2. `tsconfig.json` অনুযায়ী `tsc` command চালানো
3. compiler source code parse করে type-check সম্পন্ন করে
4. target JavaScript version অনুযায়ী code transform করে
5. output folder (যেমন `dist/`) এ `.js` ফাইল তৈরি করে

### Basic Compilation Commands

### 1) Single file compile

```bash
npx tsc index.ts
```

এই command `index.ts` থেকে `index.js` তৈরি করে।

### 2) Project compile (`tsconfig.json` সহ)

```bash
npx tsc
```

এই command project configuration অনুযায়ী সব `.ts` ফাইল compile করে।

### 3) Watch mode compile

```bash
npx tsc --watch
```

source file পরিবর্তিত হলে compiler automatic recompile করে।

### `tsconfig.json` এবং Compilation Control

Compilation behavior নিয়ন্ত্রণের জন্য `tsconfig.json` সবচেয়ে গুরুত্বপূর্ণ।

প্রচলিত কয়েকটি option:

- `target`: output JavaScript version নির্ধারণ করে (`ES5`, `ES2017`, `ES2020` ইত্যাদি)
- `module`: module system (`commonjs`, `esnext` ইত্যাদি)
- `rootDir`: source directory
- `outDir`: compiled output directory
- `strict`: strict type checking enable/disable
- `sourceMap`: debugging-এর জন্য `.map` file generate
- `noEmitOnError`: type error থাকলে output JS না তৈরি করা

উদাহরণ:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "sourceMap": true,
    "noEmitOnError": true
  },
  "include": ["src"]
}
```

### Type Checking বনাম Emitting

Compilation প্রসঙ্গে দুটি ধারণা গুরুত্বপূর্ণ:

### 1) Type Checking only

শুধু type error যাচাই করতে:

```bash
npx tsc --noEmit
```

এতে `.js` file তৈরি হয় না; শুধু error report পাওয়া যায়।

### 2) Type Checking + Emit

Default mode-এ `tsc` type check করে এবং successful হলে `.js` emit করে।

### Example: Compilation Output বোঝা

ধরা যাক `src/index.ts`:

```ts
const title: string = "TypeScript Compilation";
console.log(title);
```

Compile command:

```bash
npx tsc
```

Output (`dist/index.js`):

```js
const title = "TypeScript Compilation";
console.log(title);
```

এখানে লক্ষ্যণীয়:

- type annotation (`: string`) runtime code থেকে বাদ গেছে
- final JavaScript clean executable আকারে তৈরি হয়েছে

### Common Compilation Modes

### Development Mode

- `npx tsc --watch` ব্যবহার করা হয়
- দ্রুত feedback পাওয়া যায়
- IDE + compiler একসাথে type error দেখায়

### Production Build Mode

- `npx tsc` দিয়ে full build করা হয়
- strict এবং stable config ব্যবহার করা হয়
- output artifact (`dist/`) deploy process-এ ব্যবহৃত হয়

### Compilation Errors: কীভাবে পড়তে হয়

TypeScript error message সাধারণত ৩টি অংশে আসে:

1. file path + line number
2. error code (যেমন `TS2322`)
3. human-readable message

উদাহরণ:

```text
error TS2322: Type 'string' is not assignable to type 'number'.
```

এতে বোঝায় যে `number` expected ছিল, কিন্তু `string` পাওয়া গেছে।

### Build Script দিয়ে Compilation সহজ করা

`package.json` scripts:

```json
{
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "type-check": "tsc --noEmit"
  }
}
```

ব্যবহার:

- `npm run build` -> full compile
- `npm run dev` -> watch mode
- `npm run type-check` -> emit ছাড়া type check

### Compilation সংক্রান্ত সাধারণ সমস্যা ও সমাধান

### 1) Output folder তৈরি হচ্ছে না

সম্ভাব্য কারণ:

- `outDir` সেট করা নেই
- include/exclude ভুল
- compile error থাকায় emit বন্ধ

সমাধান:

- `tsconfig.json` এ `outDir` এবং `include` যাচাই
- `noEmitOnError` থাকলে আগে error fix

### 2) পুরোনো JavaScript syntax পাওয়া যাচ্ছে

সম্ভাব্য কারণ:

- `target` অনেক নিচু version (`ES5`) সেট আছে

সমাধান:

- `target` আধুনিক version-এ সেট করা (`ES2020` বা project requirement অনুযায়ী)

### 3) কিছু file compile হচ্ছে না

সম্ভাব্য কারণ:

- `include` pattern file path ধরছে না
- file ভুল directory-তে আছে

সমাধান:

- `include`/`exclude` pattern update
- source file `rootDir` এর মধ্যে রাখা

### সংক্ষিপ্ত সারাংশ

TypeScript Compilation হলো development-level typed code থেকে runtime-ready JavaScript তৈরির মূল সেতু।  
`tsc` compiler type safety নিশ্চিত করে, config-driven ভাবে output তৈরি করে, এবং large-scale project-এ predictable build pipeline প্রদান করে।

## ১.৬ TypeScript Project Setup

TypeScript Project Setup হলো এমন একটি প্রক্রিয়া, যার মাধ্যমে শুরু থেকেই project structure, configuration, build flow এবং development workflow সঠিকভাবে গঠন করা হয়।  
সঠিক setup থাকলে development দ্রুত হয়, error কমে, এবং project দীর্ঘমেয়াদে maintain করা সহজ হয়।

### Project Setup-এর লক্ষ্য

একটি ভালো TypeScript setup সাধারণত নিচের লক্ষ্য পূরণ করে:

- source code এবং build output আলাদা রাখা
- compiler configuration standard রাখা
- development ও production workflow পরিষ্কার করা
- type safety এবং code quality enforce করা
- team collaboration-এর জন্য consistent structure তৈরি করা

### Recommended Project Structure

একটি standard structure:

```text
typescript-project/
  ├─ src/
  │   └─ index.ts
  ├─ dist/
  ├─ package.json
  ├─ tsconfig.json
  └─ .gitignore
```

ব্যাখ্যা:

- `src/` -> TypeScript source file
- `dist/` -> compiled JavaScript output
- `package.json` -> scripts ও dependencies
- `tsconfig.json` -> compiler settings
- `.gitignore` -> generated file ignore

### ধাপভিত্তিক Project Setup

### Step 1: Project directory তৈরি

```bash
mkdir typescript-project
cd typescript-project
```

### Step 2: NPM initialize

```bash
npm init -y
```

### Step 3: TypeScript install (dev dependency)

```bash
npm install --save-dev typescript
```

### Step 4: TypeScript config তৈরি

```bash
npx tsc --init
```

### Step 5: source folder তৈরি

```bash
mkdir src
```

`src/index.ts` ফাইলে প্রাথমিক কোড:

```ts
const appName: string = "TypeScript Project Setup";
console.log(appName);
```

### Step 6: compile test

```bash
npx tsc
```

Compile সফল হলে JavaScript output তৈরি হবে (`dist/` ব্যবহার করলে `dist/index.js`)।

### `tsconfig.json` Setup (Project-ready)

Project setup-এর জন্য একটি practical configuration:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "noEmitOnError": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### গুরুত্বপূর্ণ option ব্যাখ্যা

- `rootDir`: source code directory নির্ধারণ করে
- `outDir`: build output directory নির্ধারণ করে
- `strict`: কঠোর type checking চালু রাখে
- `sourceMap`: debugging সহজ করে
- `noEmitOnError`: error থাকলে build output তৈরি বন্ধ রাখে

### `package.json` Scripts Setup

Build workflow সহজ করতে scripts যোগ করা উচিত:

```json
{
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "start": "node dist/index.js",
    "type-check": "tsc --noEmit"
  }
}
```

Scripts-এর ব্যবহার:

- `npm run build` -> একবার full build
- `npm run dev` -> watch mode development
- `npm run start` -> compiled app run
- `npm run type-check` -> emit ছাড়া type check

### `.gitignore` Setup

Generated file এবং dependency folder version control-এ না রাখাই উত্তম।

প্রস্তাবিত `.gitignore`:

```gitignore
node_modules/
dist/
.DS_Store
```

### Setup Verification Checklist

Project setup সঠিক হয়েছে কি না যাচাই করার জন্য:

1. `npx tsc -v` চালিয়ে compiler detect হচ্ছে কি না যাচাই
2. `npx tsc` চালিয়ে build error আছে কি না দেখা
3. output folder-এ `.js` file তৈরি হচ্ছে কি না যাচাই
4. `npm run start` চালিয়ে runtime output পরীক্ষা

### Development Workflow (প্রস্তাবিত)

একটি practical daily workflow:

1. `npm run dev` চালিয়ে watch mode চালু
2. `src/` folder-এ feature অনুযায়ী `.ts` file লেখা
3. type error সঙ্গে সঙ্গে fix করা
4. কাজ শেষে `npm run build` দিয়ে final build যাচাই
5. production/run পরিবেশে compiled output ব্যবহার

### সাধারণ Setup সমস্যা ও সমাধান

### 1) `Cannot find module` ধরনের error

সম্ভাব্য কারণ:

- file path ভুল
- module resolution mismatch

সমাধান:

- import path যাচাই
- প্রয়োজন হলে `module` setting project অনুযায়ী update

### 2) `dist/index.js` পাওয়া যাচ্ছে না

সম্ভাব্য কারণ:

- `outDir` সেট করা নেই
- source file `src/` এ নেই
- build error থাকায় output emit হয়নি

সমাধান:

- `tsconfig.json` এ `rootDir`/`outDir` যাচাই
- `npx tsc --noEmit` চালিয়ে error fix

### 3) Watch mode কাজ করছে না

সম্ভাব্য কারণ:

- command ভুলভাবে চালানো
- terminal session বন্ধ

সমাধান:

- `npm run dev` বা `npx tsc --watch` পুনরায় চালু

### সংক্ষিপ্ত সারাংশ

TypeScript Project Setup হলো দীর্ঘমেয়াদি development-এর ভিত্তি।  
সঠিক folder structure, `tsconfig.json`, build scripts এবং verification process বজায় রাখলে project predictable, scalable এবং maintainable থাকে।

## ১.৭ TypeScript File Using the Command Line

Command line ব্যবহার করে TypeScript file চালানো বলতে সাধারণত দুইটি ধাপ বোঝায়:

1. `.ts` file compile করে `.js` তৈরি করা
2. generated `.js` file runtime-এ execute করা

এই অধ্যায়ে command-line ভিত্তিক complete workflow তুলে ধরা হলো।

### Command Line Workflow: মৌলিক ধারণা

TypeScript file সরাসরি browser/Node.js-এ execute হয় না (default setup-এ)।  
সাধারণ প্রক্রিয়া:

- TypeScript source লেখা (`.ts`)
- `tsc` দিয়ে compile
- JavaScript output run

### ধাপ ১: TypeScript file তৈরি

ধরা যাক একটি ফাইল `hello.ts`:

```ts
const message: string = "Hello from TypeScript CLI";
console.log(message);
```

### ধাপ ২: Command line থেকে compile

```bash
npx tsc hello.ts
```

এই command সফল হলে একই directory-তে `hello.js` তৈরি হবে।

### Compile command-এর output বোঝা

- error না থাকলে সাধারণত কোনো বড় output আসে না
- compile error থাকলে terminal-এ error code সহ message দেখায়

উদাহরণ:

```text
error TS2322: Type 'string' is not assignable to type 'number'.
```

### ধাপ ৩: JavaScript file run

```bash
node hello.js
```

Expected output:

```text
Hello from TypeScript CLI
```

### এক কমান্ডে project compile

যদি project-এ `tsconfig.json` থাকে, তাহলে:

```bash
npx tsc
```

এই command `tsconfig.json` অনুযায়ী project-এর include করা সব TypeScript file compile করবে।

### Watch mode দিয়ে বারবার compile এড়ানো

development-এর সময় watch mode কার্যকর:

```bash
npx tsc --watch
```

এতে source file save হলে compiler স্বয়ংক্রিয়ভাবে recompile করে।

### প্রয়োজনীয় Command Summary

| কাজ                      | Command            |
| ------------------------ | ------------------ |
| TypeScript version check | `npx tsc -v`       |
| Single file compile      | `npx tsc hello.ts` |
| Full project compile     | `npx tsc`          |
| Watch mode compile       | `npx tsc --watch`  |
| JavaScript run           | `node hello.js`    |
| Type-check only          | `npx tsc --noEmit` |

### `package.json` Script ব্যবহার করে CLI workflow সহজ করা

```json
{
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "start": "node dist/index.js",
    "type-check": "tsc --noEmit"
  }
}
```

Command:

- `npm run build`
- `npm run dev`
- `npm run start`
- `npm run type-check`

### Common Command Line Errors এবং সমাধান

### 1) `tsc is not recognized`

কারণ:

- TypeScript install করা নেই, অথবা PATH configuration সমস্যা

সমাধান:

- local setup হলে `npx tsc` ব্যবহার
- প্রয়োজনে TypeScript install: `npm install -D typescript`

### 2) `Cannot find module` error

কারণ:

- compile output path এবং run command path আলাদা

সমাধান:

- generated `.js` file path যাচাই
- `outDir` থাকলে `node dist/...` path ব্যবহার

### 3) `.ts` file সরাসরি `node` দিয়ে run হচ্ছে না

কারণ:

- Node defaultভাবে TypeScript execute করে না

সমাধান:

- আগে `tsc` দিয়ে compile
- তারপর `.js` run

### উন্নত CLI ব্যবহার (ঐচ্ছিক)

### নির্দিষ্ট ECMAScript target দিয়ে compile

```bash
npx tsc hello.ts --target ES2020
```

### compile করে output folder নির্ধারণ

```bash
npx tsc hello.ts --outDir dist
```

### strict mode override (command থেকে)

```bash
npx tsc hello.ts --strict
```

### Command Line Best Practices

1. local dependency workflow-এ `npx tsc` অগ্রাধিকার দেওয়া
2. বড় project-এ `tsconfig.json` ছাড়া adhoc command কম ব্যবহার
3. development phase-এ watch mode চালু রাখা
4. CI/CD pipeline-এ `tsc --noEmit` দিয়ে type-check stage যোগ করা
5. build এবং run path (`outDir`) সবসময় স্পষ্ট রাখা

### সংক্ষিপ্ত সারাংশ

TypeScript file command line থেকে চালাতে মূল প্রক্রিয়া হলো: `tsc` দিয়ে compile এবং `node` দিয়ে execute।  
`npx tsc`, `tsc --watch`, এবং script-based workflow ব্যবহারের মাধ্যমে command-line development আরও দ্রুত, নির্ভরযোগ্য এবং maintainable হয়।

---

## অধ্যায় ১ সারসংক্ষেপ

এই অধ্যায়ে আমরা শিখলাম:

1. TypeScript-এর ইতিহাস, প্রয়োজন, এবং JavaScript-এর সাথে সম্পর্ক  
2. TypeScript installation, compiler usage, এবং project setup  
3. `tsc`, `tsconfig.json`, এবং command-line workflow  

TypeScript শেখার foundation এই অধ্যায়।  
এই বেসিকগুলো পরিষ্কার হলে পরের type system, functions, classes, generics—সব topic বুঝতে সহজ হবে।

---

## অনুশীলনী (Practice)

1. নতুন folder-এ TypeScript project setup করো (`npm init`, `typescript`, `tsconfig`)  
2. `src/index.ts` লিখে compile করে `dist/index.js` run করো  
3. `tsconfig.json`-এ `rootDir`, `outDir`, `strict` পরিবর্তন করে output observe করো  
4. `--watch` mode চালিয়ে live compile workflow প্র্যাকটিস করো  

---

## References

- [TypeScript Handbook - The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Handbook - Basic Types](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
- [TSConfig Reference](https://www.typescriptlang.org/tsconfig)
