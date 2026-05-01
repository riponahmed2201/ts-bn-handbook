## সূচিপত্র

অধ্যায় ৮: TypeScript Decorators

8.1 Decorators  
8.2 Class Decorators  
8.3 Implementing TypeScript Decorators  
8.4 Property Decorators

## অধ্যায় ৮: TypeScript Decorators

## ৮.১ Decorators

Decorator হলো TypeScript-এর একটি advanced feature, যার মাধ্যমে class বা class member-এর behavior-এ metadata/extra logic যোগ করা যায়।  
সহজভাবে বললে, decorator হচ্ছে "annotation style function", যা target code-কে wrap বা enhance করে।

Decorator বেশি ব্যবহার হয়:

1. dependency injection framework  
2. validation layer  
3. logging/auditing  
4. metadata-driven architecture (যেমন: route, entity, injectable)

### Decorator কেন দরকার?

ধরা যাক, অনেক class/method-এ একই ধরনের repeated কাজ আছে:

- log করা
- permission check
- validation tag বসানো

এই কাজগুলো manual লিখলে duplication বাড়ে।  
Decorator ব্যবহার করলে reusable ভাবে cross-cutting logic বসানো যায়।

### Decorator-এর সাধারণ ধরন (ধারণা)

TypeScript ecosystem-এ commonly যেসব decorator নিয়ে কাজ হয়:

1. class decorator  
2. property decorator  
3. method decorator  
4. accessor decorator  
5. parameter decorator

এই chapter roadmap অনুযায়ী মূলত **class** এবং **property** decorator-এ ফোকাস করা হয়েছে।

### Decorator Syntax (Legacy style)

Decorator `@` চিহ্ন দিয়ে লেখা হয়:

```ts
@sealed
class UserService {}
```

এখানে `sealed` হলো decorator function।

### Decorator evaluate order (high-level)

একই target-এ multiple decorator থাকলে TypeScript নির্দিষ্ট order-এ evaluate করে।  
এই order বোঝা important, কারণ side effect থাকলে execution behavior বদলাতে পারে।

সাধারণ rule:

- decorator expression উপরে থেকে evaluate হয়
- call/apply নিচ থেকে উপরে যেতে পারে (stacking behavior)

### Decorator ব্যবহার করার আগে setup

`tsconfig.json`-এ (legacy decorators-এর জন্য) সাধারণত এই options দরকার হয়:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

অনেক ক্ষেত্রে metadata দরকার হলে:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

> Note: বাস্তব project-এ framework অনুযায়ী decorator config ভিন্ন হতে পারে।

### ছোট উদাহরণ: basic class decorator

```ts
function Freeze<T extends { new (...args: any[]): {} }>(constructor: T) {
  Object.freeze(constructor);
  Object.freeze(constructor.prototype);
}

@Freeze
class ConfigService {
  getVersion() {
    return "1.0.0";
  }
}
```

এখানে decorator class constructor/prototype freeze করছে।

### Decorator-এর সুবিধা

1. reusable abstraction  
2. clean and declarative syntax  
3. repetitive boilerplate কমে  
4. framework-level convention enforce করা সহজ  

### Decorator-এর সীমাবদ্ধতা

1. beginners-এর জন্য cognitive load বেশি  
2. runtime behavior implicit হয়ে যেতে পারে  
3. ভুলভাবে ব্যবহার করলে debugging কঠিন হয়  
4. overuse করলে code readability কমে  

### সংক্ষিপ্ত সারাংশ

Decorator হলো TypeScript-এ structured meta-programming-এর একটি উপায়।  
সঠিকভাবে ব্যবহার করলে codebase clean হয়, কিন্তু clear convention ছাড়া ব্যবহার করলে complexity দ্রুত বাড়ে।

---

## ৮.২ Class Decorators

Class decorator class constructor-কে target করে।  
এটি class-এ metadata attach করতে পারে, class modify করতে পারে, অথবা নতুন constructor return করতেও পারে।

### Class Decorator Function Signature (legacy)

```ts
function MyDecorator(constructor: Function) {
  // class-level customization
}
```

### Example 1: Metadata attach করা

```ts
function Entity(name: string) {
  return function (constructor: Function) {
    (constructor as any).entityName = name;
  };
}

@Entity("users")
class UserModel {}

console.log((UserModel as any).entityName); // users
```

এখানে decorator factory (`Entity("users")`) ব্যবহার হয়েছে।

### Example 2: Constructor replace/extend করা

```ts
function AddCreatedAt<T extends { new (...args: any[]): {} }>(Base: T) {
  return class extends Base {
    createdAt = new Date();
  };
}

@AddCreatedAt
class OrderService {
  name = "OrderService";
}

const s = new OrderService() as OrderService & { createdAt: Date };
console.log(s.name, s.createdAt);
```

এখানে decorator নতুন class return করছে, যেটা original class-কে extend করেছে।

### Example 3: Sealed class

```ts
function Sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@Sealed
class AppConfig {}
```

`Object.seal` object extensibility সীমিত করে।

### Class Decorator Factory Pattern

প্রকৃত project-এ decorator factory খুব common:

```ts
function Service(options: { singleton: boolean }) {
  return function (constructor: Function) {
    (constructor as any).isSingleton = options.singleton;
  };
}

@Service({ singleton: true })
class LoggerService {}
```

### Class Decorator ব্যবহার কোথায় বেশি

1. DI container registration  
2. ORM entity declaration  
3. framework lifecycle tagging  
4. class-level logging/instrumentation  

### Common Mistakes

1. decorator class replace করলে instance type behavior বুঝে ব্যবহার করতে হবে  
2. side effect-heavy decorator avoid করা উচিত  
3. implicit magic কমিয়ে explicit naming রাখা ভালো  

### Best Practices

1. class decorator ছোট ও focused responsibility-তে ব্যবহার করা ভালো  
2. decorator factory option object ব্যবহার করলে API readable থাকে  
3. metadata attach করলে naming convention consistent রাখা উচিত  
4. production code-এ decorator behavior unit test করা প্রয়োজন  

### সংক্ষিপ্ত সারাংশ

Class decorator class abstraction-এর উপরে powerful hook দেয়।  
Framework-based architecture-এ এটি বেশ useful, কিন্তু readability ধরে রাখতে disciplined use জরুরি।

---

## ৮.৩ Implementing TypeScript Decorators

এই section-এর লক্ষ্য হলো "decorator লিখবো কীভাবে" তা step-by-step দেখানো।

### ধাপ ১: Compiler setup

`tsconfig.json`-এ নিশ্চিত করো:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

প্রয়োজনে:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### ধাপ ২: simple decorator লিখা

```ts
function LogClass(constructor: Function) {
  console.log(`Class created: ${constructor.name}`);
}

@LogClass
class StudentService {}
```

### ধাপ ৩: decorator factory লিখা

```ts
function Tag(label: string) {
  return function (constructor: Function) {
    (constructor as any).tag = label;
  };
}

@Tag("core-service")
class PaymentService {}
```

### ধাপ ৪: stacked decorators

```ts
function First() {
  return function (constructor: Function) {
    console.log("First decorator");
  };
}

function Second() {
  return function (constructor: Function) {
    console.log("Second decorator");
  };
}

@First()
@Second()
class DemoService {}
```

বাস্তবে order বোঝা খুব জরুরি, কারণ side effect এর sequencing বদলাতে পারে।

### ধাপ ৫: reusable decorator module pattern

Project-level best practice:

1. `decorators/` নামে folder রাখা  
2. প্রতিটি decorator আলাদা file-এ রাখা  
3. নাম meaningful রাখা (`@Entity`, `@Injectable`, `@Validate`)  
4. README-তে usage example রাখা  

### বাস্তব উদাহরণ: Validation metadata decorator (property-level প্রস্তুতি)

```ts
const requiredProps = new WeakMap<object, string[]>();

function Required(target: object, propertyKey: string) {
  const existing = requiredProps.get(target) ?? [];
  requiredProps.set(target, [...existing, propertyKey]);
}

function validateRequired(instance: object): string[] {
  const proto = Object.getPrototypeOf(instance);
  const keys = requiredProps.get(proto) ?? [];
  return keys.filter((k) => {
    const value = (instance as Record<string, unknown>)[k];
    return value === null || value === undefined || value === "";
  });
}

class SignupInput {
  @Required
  email!: string;

  @Required
  password!: string;
}

const input = new SignupInput();
input.email = "user@mail.com";

console.log(validateRequired(input)); // ["password"]
```

এখানে দেখানো হয়েছে decorator ব্যবহার করে metadata জমা করে runtime validation করা যায়।

### Common errors and fixes

1. **Error:** `Decorators are not valid here`  
   - কারণ: compiler option enabled না  
   - fix: `experimentalDecorators` true করো

2. **Error:** type mismatch in decorator signature  
   - কারণ: target signature ভুল  
   - fix: class/property/method অনুযায়ী সঠিক signature ব্যবহার

3. metadata undefined  
   - কারণ: expected metadata emission হয়নি  
   - fix: প্রয়োজন হলে `emitDecoratorMetadata` এবং framework config যাচাই

### Decorator implementation best practices

1. decorator pure/side-effect-light রাখো  
2. business logic decorator-এর ভিতরে বেশি না রেখে service-এ রাখো  
3. testing strategy রাখো (unit test for decorator behavior)  
4. naming এবং documentation strong রাখো  
5. cross-cutting concern-এ focus করো (log/validation/injection)

### সংক্ষিপ্ত সারাংশ

Decorator implement করতে গেলে compiler setup + correct signature + clear convention সবচেয়ে গুরুত্বপূর্ণ।  
ছোট reusable decorator দিয়ে শুরু করলে advanced framework-level decorator architecture সহজ হয়।

---

## ৮.৪ Property Decorators

Property decorator class-এর property declaration-এ apply করা হয়।  
এটি সাধারণত metadata register করতে ব্যবহৃত হয়; direct property descriptor modify করা method decorator-এর মতো straightforward না।

### Property Decorator Signature (legacy)

```ts
function PropertyDecoratorFn(target: object, propertyKey: string | symbol) {
  // metadata or registration logic
}
```

### Example 1: Property log decorator

```ts
function LogProperty(target: object, propertyKey: string) {
  console.log(`Property decorated: ${propertyKey}`);
}

class Product {
  @LogProperty
  title!: string;
}
```

### Example 2: Required property metadata

```ts
const requiredFields = new WeakMap<object, string[]>();

function RequiredField(target: object, propertyKey: string) {
  const existing = requiredFields.get(target) ?? [];
  requiredFields.set(target, [...existing, propertyKey]);
}

function validate(instance: object): string[] {
  const proto = Object.getPrototypeOf(instance);
  const fields = requiredFields.get(proto) ?? [];
  return fields.filter((field) => {
    const value = (instance as Record<string, unknown>)[field];
    return value === undefined || value === null || value === "";
  });
}

class UserInput {
  @RequiredField
  name!: string;

  @RequiredField
  email!: string;
}

const u = new UserInput();
u.name = "Rahim";
console.log(validate(u)); // ["email"]
```

### Example 3: Min length decorator factory

```ts
type Rule = { type: "minLength"; value: number; field: string };
const fieldRules = new WeakMap<object, Rule[]>();

function MinLength(length: number) {
  return function (target: object, propertyKey: string) {
    const rules = fieldRules.get(target) ?? [];
    fieldRules.set(target, [
      ...rules,
      { type: "minLength", value: length, field: propertyKey }
    ]);
  };
}

function validateMinLength(instance: object): string[] {
  const proto = Object.getPrototypeOf(instance);
  const rules = fieldRules.get(proto) ?? [];
  const errors: string[] = [];

  for (const rule of rules) {
    const value = (instance as Record<string, unknown>)[rule.field];
    if (typeof value !== "string" || value.length < rule.value) {
      errors.push(`${rule.field} must be at least ${rule.value} characters`);
    }
  }

  return errors;
}

class RegisterDto {
  @MinLength(3)
  username!: string;
}

const dto = new RegisterDto();
dto.username = "ab";
console.log(validateMinLength(dto));
```

### Property decorator কোথায় ব্যবহার হয়?

1. form validation metadata  
2. serialization mapping (`@Expose`, `@Transform`)  
3. schema generation  
4. ORM mapping (`@Column`)  

### Property decorator নিয়ে গুরুত্বপূর্ণ বাস্তব কথা

1. decorator compile-time annotation-এর মতো দেখালেও effect runtime-এ  
2. decorator নিজে value validation "স্বয়ংক্রিয়ভাবে" করে না, separate validator logic লাগে  
3. metadata storage strategy (Map/WeakMap/Reflect metadata) আগে plan করা উচিত  

### সাধারণ ভুল

1. decorator লিখে runtime validation function না রাখা  
2. property key registration prototype vs instance mix করা  
3. decorator side effect দিয়ে domain logic trigger করা  
4. field rename করলে metadata update path না রাখা

### Best Practices

1. metadata collection এবং validation execution আলাদা রাখো  
2. `WeakMap<object, ...>` pattern memory-safe  
3. decorator naming intent-driven রাখো (`@RequiredField`, `@MinLength`)  
4. public API-তে decorator behavior docs-এ লিখে রাখো  

### সংক্ষিপ্ত সারাংশ

Property decorator metadata-driven design-এ গুরুত্বপূর্ণ ভূমিকা রাখে।  
সঠিক architecture (collect metadata -> run validator) অনুসরণ করলে validation/serialization layer elegant এবং reusable হয়।

---

## অধ্যায় ৮ সারসংক্ষেপ

এই অধ্যায়ে আমরা শিখলাম:

1. decorator কী এবং কেন দরকার  
2. class decorator কীভাবে কাজ করে  
3. TypeScript decorator implementation step-by-step  
4. property decorator দিয়ে metadata-driven validation pattern

Decorator হলো powerful কিন্তু sensitive feature।  
এটি ব্যবহার করার সময় clarity, convention, এবং test coverage বজায় রাখলে codebase maintainability অনেক উন্নত হয়।

---

## অনুশীলনী (Practice)

1. `@Service({ singleton: true })` class decorator তৈরি করে metadata attach করো  
2. `@RequiredField` + `@MinLength(5)` দিয়ে DTO validation flow implement করো  
3. stacked decorators ব্যবহার করে execution order observe করো  
4. decorator-based metadata registry আলাদা module-এ extract করো  

---

## References

- [TypeScript Handbook - Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)
- [TypeScript TSConfig - experimentalDecorators](https://www.typescriptlang.org/tsconfig/experimentalDecorators.html)
- [TypeScript TSConfig - emitDecoratorMetadata](https://www.typescriptlang.org/tsconfig/emitDecoratorMetadata.html)