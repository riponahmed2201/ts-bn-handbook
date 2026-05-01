## সূচিপত্র

অধ্যায় ৯: Utility Types

9.1 Utility Types

## অধ্যায় ৯: Utility Types

## ৯.১ Utility Types

Utility Types হলো TypeScript-এর built-in type helpers, যেগুলো দিয়ে তুমি existing type থেকে নতুন type তৈরি করতে পারো।  
এগুলোকে "type transformation tools" বলা যায়। মানে নতুন data model আলাদা করে আবার লিখতে হবে না; existing model-কে প্রয়োজন অনুযায়ী বদলে নিতে পারবে।

### Utility Types কেন শেখা জরুরি?

TypeScript শেখার একদম practical জায়গায় Utility Types লাগে।  
যেমন, একটি `User` model আছে — কিন্তু:

- create API-তে সব field লাগে না
- update API-তে সব field optional লাগে
- list view-তে sensitive field বাদ দিতে হয়

এই কাজগুলো utility type ছাড়া করতে গেলে duplicate type অনেক বেড়ে যায়।

### Utility Types ব্যবহারের মূল লাভ

1. duplicate type definition কমে  
2. type পরিবর্তন হলে derived type-ও automatically update হয়  
3. API layer, form layer, service layer clean থাকে  
4. team codebase-এ naming ও structure predictable হয়  

### সবচেয়ে ব্যবহৃত Utility Types (overview)

1. `Partial<T>` -> সব field optional  
2. `Required<T>` -> সব field required  
3. `Readonly<T>` -> field assignment lock  
4. `Pick<T, K>` -> কিছু field নেওয়া  
5. `Omit<T, K>` -> কিছু field বাদ দেওয়া  
6. `Record<K, T>` -> key-value map type  
7. `Exclude<T, U>` -> union থেকে কিছু type বাদ  
8. `Extract<T, U>` -> union থেকে common type রাখা  
9. `NonNullable<T>` -> `null | undefined` বাদ  
10. `ReturnType<T>` -> function-এর return type বের করা  
11. `Parameters<T>` -> function parameter type tuple বের করা

---

### ১) `Partial<T>` — Update payload-এর জন্য সবচেয়ে জনপ্রিয়

`Partial<T>` একটি type-এর সব property optional করে দেয়।  
এটা সাধারণত PATCH/update request-এ ব্যবহার করা হয়, কারণ update-এ সব field একসাথে আসে না।

```ts
type User = { id: number; name: string; email: string };
type UserUpdate = Partial<User>;
```

`UserUpdate` এখন এমন type, যেখানে `id`, `name`, `email` যেকোনোটা থাকতে পারে, যেকোনোটা না-ও থাকতে পারে।

**গুরুত্বপূর্ণ:** `Partial<T>` shallow কাজ করে; nested object deep optional করে না।

---

### ২) `Required<T>` — Draft থেকে final model তৈরি

`Required<T>` optional field-গুলোকে required করে।  
যখন temporary/draft state থেকে final validated state-এ যেতে হয়, তখন উপকারী।

```ts
type UserDraft = { id?: number; name?: string };
type UserFinal = Required<UserDraft>;
```

---

### ৩) `Readonly<T>` — accidental mutation কমাতে

`Readonly<T>` compile-time-এ mutation বন্ধ করে।  
Configuration object, constant mapping, অথবা function return data lock করতে কাজে লাগে।

```ts
type Config = Readonly<{ apiBase: string; timeout: number }>;
```

এটি runtime immutability নয়; compile-time protection।

---

### ৪) `Pick<T, K>` এবং ৫) `Omit<T, K>` — model slicing-এর backbone

`Pick` দিয়ে specific field নেওয়া হয়, `Omit` দিয়ে specific field বাদ দেওয়া হয়।

```ts
type User = { id: number; name: string; email: string; password: string };
type UserPublic = Pick<User, "id" | "name" | "email">;
type UserSafe = Omit<User, "password">;
```

এই দুইটা utility type API contract design-এ সবচেয়ে বেশি ব্যবহৃত।

---

### ৬) `Record<K, T>` — typed map/dictionary

`Record` fixed keys-এর জন্য consistent value type enforce করে।

```ts
type Role = "admin" | "editor" | "viewer";
type RoleLabel = Record<Role, string>;
```

এতে key miss বা extra key সহজে ধরা পড়ে।

---

### ৭) `Exclude<T, U>` এবং ৮) `Extract<T, U>` — union filtering tools

`Exclude` union থেকে type বাদ দেয়, `Extract` union থেকে common type রেখে দেয়।

```ts
type AllStatus = "idle" | "loading" | "success" | "error";
type NonLoadingStatus = Exclude<AllStatus, "loading">;
type FinalStatus = Extract<AllStatus, "success" | "error">;
```

State machine বা action type filtering-এ খুব কার্যকর।

---

### ৯) `NonNullable<T>` — nullable থেকে safe type

`null` এবং `undefined` বাদ দিয়ে clean type তৈরি করে।

```ts
type MaybeName = string | null | undefined;
type Name = NonNullable<MaybeName>;
```

validation-এর পর safe downstream use-case-এ উপকারী।

---

### ১০) `ReturnType<T>` এবং ১১) `Parameters<T>` — function contract reuse

একটি function-এর signature থেকে type বের করে অন্য জায়গায় reuse করার জন্য এগুলো best।

```ts
function createUser(name: string, age: number) {
  return { name, age, active: true };
}

type CreateUserParams = Parameters<typeof createUser>;
type CreateUserResult = ReturnType<typeof createUser>;
```

Refactor করলে function signature বদলালেও derived type sync থাকে।

---

### Real-world pattern: একটি base model থেকে একাধিক DTO

একটি domain model থেকে create, update, list, internal ইত্যাদি view type বানানো utility types-এর core use-case।

```ts
type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  passwordHash: string;
};

type CreateUserDto = Pick<User, "name" | "email" | "role">;
type UpdateUserDto = Partial<CreateUserDto>;
type UserListItem = Omit<User, "passwordHash">;
```

এখানে duplicate model লিখতে হয়নি, তবু use-case অনুযায়ী type আলাদা হয়েছে।

### Common Mistakes

1. `Partial<T>` কে deep partial ধরে নেওয়া  
2. utility type chain অতিরিক্ত complex করা  
3. `Pick`/`Omit` দিয়ে business validation solve করতে চাওয়া  
4. `Readonly<T>` কে runtime freeze ধরে নেওয়া  

### Best Practices

1. naming clear রাখো (`CreateUserDto`, `UpdateUserDto`)  
2. public API type-এ `Pick`/`Omit` intention-driven ব্যবহার করো  
3. complex transformation ছোট ছোট alias-এ ভেঙে লেখো  
4. repeated pattern হলে custom utility alias বানাও  
5. code review-এ utility type readability check করো  

### সংক্ষিপ্ত সারাংশ

Utility Types হলো TypeScript-এর productivity multiplier।  
এগুলো ঠিকভাবে ব্যবহার করলে code কম লিখে বেশি type safety পাওয়া যায়, refactor সহজ হয়, আর codebase বেশি maintainable হয়।

---

## অধ্যায় ৯ সারসংক্ষেপ

এই অধ্যায়ে আমরা শিখলাম:

1. Utility Types কেন real project-এ প্রয়োজন  
2. `Partial`, `Pick`, `Omit`, `Record`, `ReturnType`, `Parameters` সহ গুরুত্বপূর্ণ helpers  
3. একটি base model থেকে multiple use-case type তৈরির practical pattern  

Utility Types ভালোভাবে শিখতে পারলে TypeScript design skill দ্রুত improve করে।

---

## অনুশীলনী (Practice)

1. `Product` model থেকে `CreateProductDto`, `UpdateProductDto`, `ProductCardDto` তৈরি করো  
2. `Record` দিয়ে feature-flag config type-safe map বানাও  
3. একটি service function লিখে `Parameters` এবং `ReturnType` দিয়ে wrapper type বানাও  
4. `Exclude` এবং `Extract` দিয়ে status/action union filter করো  
5. একটি nested model নিয়ে explain করো কেন `Partial<T>` deep partial না  

---

## References

- [TypeScript Handbook - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [TypeScript Handbook - Creating Types from Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
- [TypeScript Handbook - Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
