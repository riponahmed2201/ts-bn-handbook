## সূচিপত্র

অধ্যায় ৬: TypeScript Classes

6.1 TypeScript Class
6.2 Constructor Params
6.3 Access Modifiers
6.4 Abstract Classes
6.5 Inheritance
6.6 Polymorphism
6.7 Method Overriding
6.8 Constructor Overloading

## অধ্যায় ৬: TypeScript Classes

## ৬.১ TypeScript Class

TypeScript Class হলো object তৈরি করার একটি blueprint বা template।  
একটি class-এর মধ্যে সাধারণত **properties** (data) এবং **methods** (behavior) একসাথে সংজ্ঞায়িত করা হয়, যাতে code আরও organized, reusable, এবং readable হয়।

Classes বিশেষভাবে কার্যকর, যখন domain model (যেমন User, Product, Account) বা OOP-based structure দরকার হয়।

### Class-এর মূল উপাদান

1. **Properties**: instance-এর সাথে সম্পর্কিত data  
2. **Constructor**: object তৈরির সময় initial state সেট করে  
3. **Methods**: instance behavior define করে  
4. **Inheritance**: বিদ্যমান class extend করে নতুন class তৈরি  
5. **Access Modifiers**: `public`, `private`, `protected` দিয়ে access control  

---

### Basic Class Example

```ts
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  introduce(): string {
    return `নাম: ${this.name}, বয়স: ${this.age}`;
  }
}

const p1 = new Person("Karim", 25);
console.log(p1.introduce());
```

উপরের উদাহরণে:

- `name` ও `age` হলো properties  
- `constructor` property initialize করে  
- `introduce()` হলো method  

---

### Constructor Parameter Properties (Shortcut)

TypeScript-এ constructor parameter-এ access modifier ব্যবহার করলে একই সাথে property declare + initialize করা যায়।

```ts
class Student {
  constructor(
    public name: string,
    public roll: number
  ) {}

  getLabel(): string {
    return `${this.roll} - ${this.name}`;
  }
}

const s1 = new Student("Rahim", 12);
console.log(s1.getLabel());
```

এখানে `public name` এবং `public roll` আলাদা করে property declare করা লাগেনি।

---

## ৬.২ Constructor Params

Constructor Params বলতে সাধারণত দুইটি বিষয় বোঝায়:

1. **Constructor parameter properties** (constructor parameter‑এ modifier দিয়ে property declare করা)  
2. **Constructor parameter types reuse** (utility type `ConstructorParameters<Type>` দিয়ে constructor arguments-এর type বের করা)  

এই দুইটি বিষয় class design‑এ type safety এবং maintainability বাড়ায়।

---

### ১) Constructor Parameter Properties (Recap)

Constructor parameter‑এ `public/private/protected/readonly` ব্যবহার করলে TypeScript একই সাথে:

- property declare করে
- constructor‑এ initialize করে

```ts
class User {
  constructor(
    public readonly id: number,
    public name: string,
    private passwordHash: string
  ) {}
}

const u = new User(1, "Karim", "hash");
console.log(u.id); // 1
console.log(u.name); // Karim
// console.log(u.passwordHash); // Error (private)
```

---

### ২) `ConstructorParameters<Type>` Utility Type

`ConstructorParameters<Type>` হলো TypeScript‑এর একটি utility type, যা কোনো constructor function/type থেকে **constructor parameter types** বের করে।  
এটি বিশেষভাবে কার্যকর, যখন factory/helper function তৈরি করে class instance তৈরি করতে হয় এবং constructor signature পরিবর্তন হলেও type‑safe ভাবে sync রাখতে হয়।

#### Syntax

```ts
type Params = ConstructorParameters<Type>;
```

এখানে `Type` সাধারণত `typeof ClassName` হয়।

---

### Basic Example

```ts
class Rectangle {
  constructor(public width: number, public height: number) {}
}

type RectangleCtorParams = ConstructorParameters<typeof Rectangle>;
// inferred as: [number, number]

function createRectangle(...params: RectangleCtorParams): Rectangle {
  return new Rectangle(...params);
}

const r1 = createRectangle(10, 5);
```

এখানে `createRectangle` function‑টি Rectangle constructor‑এর parameter type‑এর সাথে consistent থাকে।

---

### Practical Example: Generic Factory for Classes

```ts
function createInstance<C extends new (...args: any[]) => any>(
  Ctor: C,
  ...args: ConstructorParameters<C>
): InstanceType<C> {
  return new Ctor(...args);
}

class Person {
  constructor(public name: string, public age: number) {}
}

const p = createInstance(Person, "Rahim", 24);
```

এখানে:

- `ConstructorParameters<C>` constructor argument types infer করে  
- `InstanceType<C>` return type হিসেবে class instance type দেয়  

---

### কোথায় বেশি কাজে লাগে

1. factory pattern  
2. dependency injection helper  
3. test utility (mock instance creation)  
4. wrapper/adapter layer যেখানে constructor signature reuse প্রয়োজন  

---

### সতর্কতা

1. `ConstructorParameters` শুধুমাত্র constructor signature‑এর type বের করে; runtime validation দেয় না  
2. overly generic factory function misuse করলে readability কমতে পারে  
3. public API‑তে প্রয়োজনের বেশি advanced utility type avoid করা উত্তম  

---

### Best Practices

1. constructor parameter properties ব্যবহার করে boilerplate কমানো যায়  
2. instance creation helper‑এ `ConstructorParameters` ব্যবহার করলে refactor‑proof design পাওয়া যায়  
3. factory function generic হলে naming ও constraints পরিষ্কার রাখা প্রয়োজন  
4. business critical validation constructor বা factory‑তে explicit রাখা উত্তম  

---

### সংক্ষিপ্ত সারাংশ

Constructor Params‑এর লক্ষ্য হলো class initialization‑কে type‑safe, concise, এবং maintainable করা।  
Constructor parameter properties boilerplate কমায়, এবং `ConstructorParameters<Type>` constructor signature reuse করে factory/helper design আরও robust করে।

## ৬.৩ Access Modifiers

Access modifier class member কে কোথা থেকে access করা যাবে তা নিয়ন্ত্রণ করে।  
এটি encapsulation এবং information hiding এর নীতিকে enforce করে, ফলে class-এর public API পরিষ্কার থাকে এবং internal state নিরাপদ থাকে।

#### `public`
ডিফল্টভাবে সব member public থাকে। বাইরে থেকে access করা যায়।

#### `private`
শুধু class-এর ভিতর থেকে access করা যায়।

#### `protected`
class এবং তার subclass-এর ভিতরে access করা যায়, কিন্তু বাইরে থেকে নয়।

```ts
class BankAccount {
  constructor(
    public holder: string,
    private balance: number
  ) {}

  deposit(amount: number): void {
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}

const acc = new BankAccount("Karim", 500);
acc.deposit(200);
console.log(acc.getBalance()); // 700
// acc.balance; // Error (private)
```

---

### `readonly` (Access + Immutability)

`readonly` সাধারণত immutability নিশ্চিত করার জন্য ব্যবহৃত হয়।  
এটি `public`/`private`/`protected`‑এর সাথে একসাথে ব্যবহার করা যেতে পারে।

```ts
class Order {
  constructor(
    public readonly id: number,
    public status: "pending" | "paid"
  ) {}
}

const o = new Order(101, "pending");
// o.id = 102; // Error
```

### Readonly Properties

`readonly` property একবার assign হওয়ার পরে পরিবর্তন করা যায় না।

```ts
class Product {
  constructor(
    public readonly id: number,
    public title: string,
    public price: number
  ) {}
}

const pr = new Product(1, "Book", 120);
// pr.id = 2; // Error
```

---

### Getters এবং Setters (Controlled Access)

Getter/Setter ব্যবহার করে property access controlled করা যায়।

```ts
class Temperature {
  private _celsius = 0;

  get celsius(): number {
    return this._celsius;
  }

  set celsius(value: number) {
    if (value < -273.15) {
      throw new Error("Invalid temperature");
    }
    this._celsius = value;
  }
}

const t = new Temperature();
t.celsius = 25;
console.log(t.celsius);
```

---

### Inheritance (extends)

Inheritance এর মাধ্যমে একটি class অন্য class-এর behavior reuse করতে পারে।

```ts
class Animal {
  constructor(public name: string) {}

  move(): string {
    return `${this.name} চলছে`;
  }
}

class Dog extends Animal {
  bark(): string {
    return `${this.name} ঘেউ ঘেউ করছে`;
  }
}

const d = new Dog("Tommy");
console.log(d.move());
console.log(d.bark());
```

---

### Method Overriding

Subclass parent method override করতে পারে।

```ts
class Vehicle {
  start(): string {
    return "যানবাহন চালু হয়েছে";
  }
}

class Car extends Vehicle {
  override start(): string {
    return "গাড়ি চালু হয়েছে";
  }
}
```

`override` keyword ব্যবহার করলে intention পরিষ্কার হয় এবং ভুল override কমে।

---

### Abstract Class (Conceptual Base Class)

Abstract class থেকে সরাসরি object তৈরি করা যায় না। এটি subclass-এর জন্য base structure দেয়।

```ts
abstract class Shape {
  abstract area(): number;
}

class Rectangle extends Shape {
  constructor(private w: number, private h: number) {
    super();
  }

  area(): number {
    return this.w * this.h;
  }
}

const r = new Rectangle(10, 5);
console.log(r.area());
```

---

### Class vs Interface (সংক্ষিপ্ত দিক)

| বিষয় | Class | Interface |
|---|---|---|
| runtime presence | থাকে (JS output হয়) | থাকে না (type-only) |
| উদ্দেশ্য | implementation + state | contract/shape |
| instantiate | করা যায় (`new`) | করা যায় না |
| reuse | extends, composition | extends, merging |

সাধারণভাবে:

- behavior/state দরকার হলে **class**
- contract define করতে **interface**

---

### সাধারণ ভুল

1. `private` data বাইরে থেকে access করার চেষ্টা  
2. inheritance অতিরিক্ত ব্যবহার করে deep hierarchy তৈরি  
3. constructor-এ validation না রেখে invalid state allow করা  
4. stateful class-এ uncontrolled mutation রাখা  
5. interface এবং class-এর role mix করে ফেলা  

---

### Best Practices

1. class-এ single responsibility বজায় রাখা উচিত  
2. `private`/`protected` ব্যবহার করে encapsulation নিশ্চিত করা উত্তম  
3. inheritance minimal রাখা; প্রয়োজনে composition অগ্রাধিকার  
4. constructor-এ invalid state prevent করার validation রাখা কার্যকর  
5. public API surface ছোট ও পরিষ্কার রাখা প্রয়োজন  

---

### সংক্ষিপ্ত সারাংশ

TypeScript Classes object-oriented design-এর জন্য একটি শক্তিশালী টুল, যা data এবং behavior একসাথে সংগঠিত করে।  
Access modifiers, inheritance, getter/setter, এবং abstract class ব্যবহার করে scalable এবং maintainable code structure তৈরি করা সম্ভব।

---

## ৬.৪ Abstract Classes

Abstract class হলো এমন একটি base class, যা অন্য class-এর জন্য blueprint হিসেবে কাজ করে, কিন্তু সরাসরি instantiate করা যায় না।  
এটি সাধারণত shared structure, shared logic, এবং বাধ্যতামূলক method implementation enforce করার জন্য ব্যবহৃত হয়।

### Abstract class-এর মূল বৈশিষ্ট্য

1. **Instantiate করা যায় না**: `new` দিয়ে abstract class থেকে object তৈরি করা যায় না  
2. **Abstract method থাকতে পারে**: body ছাড়া method, যা subclass‑কে implement করতে হয়  
3. **Concrete method থাকতে পারে**: normal implementation সহ method, যা subclass reuse করতে পারে  
4. **Property/Constructor থাকতে পারে**: shared state/initialization pattern define করা যায়  
5. **Polymorphism সমর্থন করে**: base type দিয়ে subclass instance handle করা যায়  

---

### Basic Example: Abstract Method + Concrete Method

```ts
abstract class Animal {
  abstract makeSound(): void;

  move(): void {
    console.log("Moving...");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Bark");
  }
}

const myDog = new Dog();
myDog.makeSound();
myDog.move();
```

এখানে `Animal` instantiate করা যাবে না, কিন্তু `Dog` কে implement করতে হবে `makeSound()`।

---

### Abstract Property Example

```ts
abstract class Person {
  abstract name: string;

  display(): void {
    console.log(this.name);
  }
}

class Employee extends Person {
  name: string;
  empCode: number;

  constructor(name: string, code: number) {
    super();
    this.name = name;
    this.empCode = code;
  }
}

const emp = new Employee("James", 100);
emp.display();
```

---

### Abstract Class with Constructor (Shared Initialization)

Abstract class‑এ constructor থাকতে পারে, যাতে shared initialization করা যায়।

```ts
abstract class Shape {
  constructor(protected label: string) {}
  abstract area(): number;

  printArea(): void {
    console.log(`${this.label}: ${this.area()}`);
  }
}

class Circle extends Shape {
  constructor(label: string, private radius: number) {
    super(label);
  }

  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

const c = new Circle("Circle", 5);
c.printArea();
```

---

### Abstract Class কোথায় উপযোগী

1. related class‑গুলোর জন্য common contract + shared implementation দরকার হলে  
2. কিছু method সব subclass‑এ বাধ্যতামূলক করতে হলে  
3. repeated logic base class‑এ রেখে code reuse করতে হলে  
4. plugin/strategy style design‑এ base type দিয়ে runtime selection করতে হলে  

---

### Abstract Class বনাম Interface (সংক্ষিপ্ত তুলনা)

| বিষয় | Abstract Class | Interface |
|---|---|---|
| instantiate | করা যায় না | করা যায় না |
| shared implementation | পারে | পারে না |
| runtime output | থাকে | থাকে না (type-only) |
| inheritance/extends | `extends` | `extends` |
| multiple inheritance | একটাই class extend | একাধিক interface extend সম্ভব |

সাধারণভাবে:

- shared logic দরকার হলে **abstract class**
- শুধুমাত্র contract দরকার হলে **interface**

---

### সাধারণ ভুল

1. abstract class instantiate করার চেষ্টা  
2. abstract method implement না করে subclass লেখা  
3. inheritance chain অত্যধিক জটিল করা  
4. যেখানে interface যথেষ্ট, সেখানে abstract class ব্যবহার করে design heavy করা  

---

### Best Practices

1. abstract class‑এ শুধুমাত্র shared behavior/contract রাখা উচিত  
2. abstract method minimal রাখা; প্রয়োজনীয় অংশগুলোই enforce করা ভালো  
3. base class‑এ state/constructor থাকলে invariant clear রাখা প্রয়োজন  
4. deep inheritance এড়াতে composition বিবেচনা করা উত্তম  

---

### সংক্ষিপ্ত সারাংশ

Abstract class TypeScript‑এ contract enforcement এবং shared implementation—দুইটি সুবিধা একত্রে দেয়।  
সঠিকভাবে প্রয়োগ করলে code reuse বাড়ে, design পরিষ্কার থাকে, এবং large codebase‑এ maintainability উন্নত হয়।

---

## ৬.৫ Inheritance

Inheritance হলো OOP‑এর একটি মৌলিক ধারণা, যেখানে একটি class (child/subclass) অন্য একটি class (parent/base class) থেকে properties এবং methods উত্তরাধিকার হিসেবে পায়।  
এর লক্ষ্য হলো **code reuse** এবং **specialization**—অর্থাৎ base behavior reuse করে নতুন behavior যোগ করা।

TypeScript‑এ inheritance মূলত `extends` keyword দিয়ে করা হয়।  
TypeScript class-based syntax ব্যবহার করলেও runtime‑এ এটি JavaScript prototypal inheritance‑এর উপর ভিত্তি করে কাজ করে।

---

### Basic Inheritance (`extends`)

```ts
class Vehicle {
  honk(): void {
    console.log("Vehicle honks");
  }
}

class Car extends Vehicle {
  display(): void {
    console.log("This is a Car");
  }
}

const car = new Car();
car.honk();
car.display();
```

এখানে `Car` class `Vehicle`‑এর `honk()` method reuse করছে।

---

### `super` Keyword (Parent Access)

`super` ব্যবহার করা হয়:

1. parent class constructor call করতে  
2. parent class method call করতে  

```ts
class Person {
  constructor(
    protected firstName: string,
    protected lastName: string
  ) {}

  getName(): string {
    return `নাম: ${this.firstName} ${this.lastName}`;
  }
}

class Employee extends Person {
  constructor(
    firstName: string,
    lastName: string,
    private jobTitle: string
  ) {
    super(firstName, lastName);
  }

  displayInfo(): void {
    console.log(super.getName());
    console.log(`পদবি: ${this.jobTitle}`);
  }
}

const emp = new Employee("Mehul", "Sharma", "Web Developer");
emp.displayInfo();
```

এখানে `super(firstName, lastName)` parent constructor call করছে এবং `super.getName()` parent method call করছে।

---

### Method Overriding (Subclass Customization)

Subclass parent method override করতে পারে।  
TypeScript‑এ `override` keyword ব্যবহার করলে intent পরিষ্কার হয় এবং ভুল override কমে।

```ts
class PersonBase {
  constructor(
    protected firstName: string,
    protected lastName: string
  ) {}

  displayInfo(): string {
    return `নাম: ${this.firstName} ${this.lastName}`;
  }
}

class EmployeeBase extends PersonBase {
  constructor(
    firstName: string,
    lastName: string,
    private jobTitle: string
  ) {
    super(firstName, lastName);
  }

  override displayInfo(): string {
    return `${super.displayInfo()} | পদবি: ${this.jobTitle}`;
  }
}

const e = new EmployeeBase("Mehul", "Sharma", "Web Developer");
console.log(e.displayInfo());
```

---

### Inheritance-এর সুবিধা

1. code reuse বৃদ্ধি পায়  
2. common behavior centralize করা যায়  
3. specialization‑এর মাধ্যমে domain modeling সহজ হয়  
4. polymorphism‑এর মাধ্যমে base type‑এ multiple subtype handle করা যায়  

---

### সীমাবদ্ধতা

1. TypeScript class inheritance সাধারণত single inheritance (একটি parent)  
2. অতিরিক্ত deep inheritance chain design complex করে  
3. ভুলভাবে ব্যবহার করলে tight coupling বৃদ্ধি পায়  

---

### Composition বনাম Inheritance (সংক্ষিপ্ত দিক)

Inheritance‑এ "is‑a" relationship বোঝানো হয় (Car is a Vehicle)।  
Composition‑এ "has‑a" relationship (Car has an Engine)।

Complex domain‑এ composition অনেক সময় safer এবং flexible হয়।

---

### Best Practices

1. inheritance শুধুমাত্র সত্যিকারের "is‑a" সম্পর্ক থাকলে ব্যবহার করা উত্তম  
2. base class‑কে ছোট ও focused রাখা উচিত  
3. deep inheritance এড়িয়ে composition বিবেচনা করা ভালো  
4. overridden method‑এ `super` call প্রয়োজন অনুযায়ী ব্যবহার করা উচিত  
5. base class API stable না হলে inheritance ঝুঁকিপূর্ণ হতে পারে  

---

### সংক্ষিপ্ত সারাংশ

Inheritance TypeScript‑এ code reuse এবং specialization‑এর জন্য শক্তিশালী টুল।  
`extends`, `super`, এবং overriding সঠিকভাবে প্রয়োগ করলে OOP model clean ও maintainable থাকে, তবে design complexity এড়াতে inheritance‑এর ব্যবহার সীমিত ও উদ্দেশ্য‑ভিত্তিক রাখা উত্তম।

---

## ৬.৬ Polymorphism

Polymorphism হলো OOP‑এর একটি মৌলিক ধারণা, যেখানে একই base type/reference ব্যবহার করে ভিন্ন ভিন্ন subclass instance‑এর behavior চালানো যায়।  
মূল ধারণা হলো: **একই interface বা base class**, কিন্তু **ভিন্ন implementation**।

TypeScript‑এ polymorphism সাধারণত এইভাবে দেখা যায়:

1. base class / abstract class reference দিয়ে subclass instance handle  
2. overridden method call runtime‑এ subclass অনুযায়ী dispatch হয়  
3. interface/union based polymorphism (structural typing)  

---

### ১) Runtime Polymorphism (Method Overriding)

```ts
class Shape {
  area(): number {
    return 0;
  }
}

class Rectangle extends Shape {
  constructor(private w: number, private h: number) {
    super();
  }

  override area(): number {
    return this.w * this.h;
  }
}

class Circle extends Shape {
  constructor(private r: number) {
    super();
  }

  override area(): number {
    return Math.PI * this.r * this.r;
  }
}

function printArea(shape: Shape): void {
  console.log("Area:", shape.area());
}

printArea(new Rectangle(10, 5));
printArea(new Circle(5));
```

এখানে `printArea` function একই base type `Shape` নেয়, কিন্তু runtime‑এ কোন `area()` চলবে তা object‑এর actual class অনুযায়ী নির্ধারিত হয়।

---

### ২) Polymorphism with Abstract Class

Abstract class ব্যবহার করলে কিছু method subclass‑এ implement বাধ্যতামূলক করা যায়।

```ts
abstract class Payment {
  abstract pay(amount: number): string;

  print(amount: number): void {
    console.log(this.pay(amount));
  }
}

class CashPayment extends Payment {
  pay(amount: number): string {
    return `Paid ${amount} by cash`;
  }
}

class CardPayment extends Payment {
  pay(amount: number): string {
    return `Paid ${amount} by card`;
  }
}

function checkout(payment: Payment, amount: number): void {
  payment.print(amount);
}

checkout(new CashPayment(), 500);
checkout(new CardPayment(), 500);
```

এখানে `checkout` base type `Payment` দিয়ে বিভিন্ন payment strategy চালাচ্ছে।

---

### ৩) Interface‑based Polymorphism (Structural Typing)

TypeScript‑এ interface contract একই হলে ভিন্ন object‑ও একইভাবে ব্যবহার করা যায়।

```ts
interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log("console:", message);
  }
}

class FileLogger implements Logger {
  log(message: string): void {
    console.log("file:", message);
  }
}

function runTask(logger: Logger): void {
  logger.log("Task started");
}

runTask(new ConsoleLogger());
runTask(new FileLogger());
```

---

### Polymorphism-এর সুবিধা

1. code decoupling এবং extensibility বাড়ে  
2. strategy pattern / plugin architecture সহজ হয়  
3. conditional branching কমে এবং design cleaner হয়  
4. testability বৃদ্ধি পায় (mock implementation সহজ)  

---

### সাধারণ ভুল

1. base class‑এ এমন method রাখা যা subclass‑এ অর্থহীন (poor abstraction)  
2. override না করে duplicated logic লেখা  
3. অতিরিক্ত inheritance/polymorphism প্রয়োগ করে over‑engineering  
4. polymorphism ব্যবহার না করে বড় `if/else` chain তৈরি করা  

---

### Best Practices

1. base abstraction minimal এবং meaningful রাখা উচিত  
2. shared logic base‑এ, variable behavior subclass‑এ রাখা উত্তম  
3. abstract class/interface‑এর contract স্থিতিশীল রাখা প্রয়োজন  
4. নতুন behavior যোগ করতে subclass/implementation add করা—existing code কম পরিবর্তন করা উত্তম  

---

### সংক্ষিপ্ত সারাংশ

Polymorphism TypeScript‑এ flexible এবং extensible OOP design তৈরির মূল কৌশল।  
Base type‑এর মাধ্যমে subclass implementation চালিয়ে code reuse, maintainability এবং scalability উল্লেখযোগ্যভাবে উন্নত করা যায়।

---

## ৬.৭ Method Overriding

Method Overriding হলো এমন একটি কৌশল, যেখানে subclass (child class) parent class-এর কোনো method‑কে নিজের প্রয়োজন অনুযায়ী নতুন implementation দিয়ে replace করে।  
এটি inheritance + polymorphism‑এর সাথে ঘনিষ্ঠভাবে সম্পর্কিত, কারণ runtime‑এ overridden method subclass অনুযায়ী execute হয়।

### Method Overriding কেন প্রয়োজন

1. base behavior reuse করে specialization যোগ করা যায়  
2. একই method name বজায় রেখে different behavior implement করা যায়  
3. polymorphism‑এর মাধ্যমে cleaner design পাওয়া যায়  

---

### Basic Overriding Example

```ts
class Vehicle {
  start(): string {
    return "যানবাহন চালু হয়েছে";
  }
}

class Car extends Vehicle {
  override start(): string {
    return "গাড়ি চালু হয়েছে";
  }
}

const v: Vehicle = new Car();
console.log(v.start()); // গাড়ি চালু হয়েছে
```

এখানে `Vehicle` reference (`v`) থাকলেও runtime‑এ `Car.start()` call হচ্ছে।

---

### `super` দিয়ে Parent Method Reuse

Overriding‑এর সময় parent method‑এর অংশ reuse করতে `super.methodName()` ব্যবহার করা হয়।

```ts
class Person {
  constructor(
    protected firstName: string,
    protected lastName: string
  ) {}

  display(): string {
    return `নাম: ${this.firstName} ${this.lastName}`;
  }
}

class Employee extends Person {
  constructor(
    firstName: string,
    lastName: string,
    private jobTitle: string
  ) {
    super(firstName, lastName);
  }

  override display(): string {
    return `${super.display()} | পদবি: ${this.jobTitle}`;
  }
}
```

---

### Overriding‑এ `override` Keyword এর সুবিধা

`override` keyword ব্যবহার করলে TypeScript নিশ্চিত করে যে:

- parent class‑এ সত্যিই একই method আছে  
- spelling/parameter mismatch হলে compile‑time error পাওয়া যায়  

এতে accidental bug কমে।

---

### সাধারণ ভুল

1. method signature mismatch (parameter/return type ভিন্ন)  
2. `super` call প্রয়োজন হলেও বাদ দেওয়া  
3. overriding‑এর বদলে নতুন method name তৈরি করে inconsistency তৈরি করা  

---

### Best Practices

1. overriding‑এ method signature parent‑এর সাথে compatible রাখা উচিত  
2. base behavior reuse দরকার হলে `super` ব্যবহার করা উত্তম  
3. override করা method‑এ side effect minimal রাখা ভালো  
4. overly deep inheritance এড়িয়ে design simple রাখা উত্তম  

---

### সংক্ষিপ্ত সারাংশ

Method Overriding TypeScript‑এ specialization এবং polymorphism বাস্তবায়নের একটি গুরুত্বপূর্ণ উপায়।  
Subclass প্রয়োজন অনুযায়ী behavior পরিবর্তন করতে পারে, এবং base reference দিয়েও dynamic dispatch সম্ভব হয়।

---

## ৬.৮ Constructor Overloading

TypeScript‑এ constructor overloading বলতে সাধারণত বোঝায়: একটি class‑এ একাধিক constructor call‑style (multiple signatures) support করা।  
তবে বাস্তবে JavaScript‑এ **একটি মাত্র constructor implementation** থাকে, তাই TypeScript‑এও:

- একাধিক constructor signature লেখা যায়  
- কিন্তু constructor body **একটাই** হবে  

---

### Constructor Overloading Pattern

```ts
class Point {
  x: number;
  y: number;

  constructor(x: number, y: number);
  constructor(value: { x: number; y: number });
  constructor(a: number | { x: number; y: number }, b?: number) {
    if (typeof a === "number") {
      this.x = a;
      this.y = b ?? 0;
    } else {
      this.x = a.x;
      this.y = a.y;
    }
  }
}

const p1 = new Point(10, 20);
const p2 = new Point({ x: 5, y: 7 });
```

এখানে caller দুইভাবে object তৈরি করতে পারে, কিন্তু implementation একটাই।

---

### Optional Parameter দিয়ে Overloading‑এর বিকল্প

কিছু ক্ষেত্রে overload না লিখে optional parameter দিয়েও কাজ করা যায়:

```ts
class Range {
  constructor(public start: number, public end: number = start) {}
}
```

কিন্তু complex call‑style হলে overload signature বেশি পরিষ্কার হয়।

---

### Factory Method Pattern (Alternative)

Constructor overload জটিল হলে static factory ব্যবহার করে API আরও readable করা যায়।

```ts
class UserFactory {
  private constructor(public id: number, public name: string) {}

  static fromId(id: number): UserFactory {
    return new UserFactory(id, "Unknown");
  }

  static fromObject(data: { id: number; name: string }): UserFactory {
    return new UserFactory(data.id, data.name);
  }
}
```

---

### সাধারণ ভুল

1. overload signatures এবং implementation mismatch রাখা  
2. constructor body‑তে narrowing না করে unsafe access করা  
3. overload দিয়ে API unnecessarily complex করা  

---

### Best Practices

1. overload signature কম এবং clear রাখা উত্তম  
2. implementation‑এ strict narrowing রাখা প্রয়োজন  
3. complex case‑এ static factory pattern বিবেচনা করা ভালো  
4. public API‑তে constructor behavior predictable রাখা জরুরি  

---

### সংক্ষিপ্ত সারাংশ

Constructor Overloading TypeScript‑এ multiple instantiation style support করার একটি typed pattern।  
একাধিক signature caller‑side type safety দেয়, কিন্তু implementation একটাই থাকে—তাই robust narrowing এবং simple API design বজায় রাখা গুরুত্বপূর্ণ।

---

## References

- [GeeksforGeeks — TypeScript class](https://www.geeksforgeeks.org/typescript/typescript-class/)
- [GeeksforGeeks — TypeScript `ConstructorParameters<Type>` Utility Type](https://www.geeksforgeeks.org/typescript/typescript-constructorparameters-utility-type/)
- [GeeksforGeeks — Access Modifiers in TypeScript](https://www.geeksforgeeks.org/typescript/access-modifiers-in-typescript/)
- [GeeksforGeeks — What are Abstract Classes in TypeScript?](https://www.geeksforgeeks.org/typescript/what-are-abstract-classes-in-typescript/)
- [GeeksforGeeks — TypeScript Inheritance](https://www.geeksforgeeks.org/typescript/typescript-inheritance/)