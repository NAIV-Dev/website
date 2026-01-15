<context>
# DSL Reference Documentation

This DSL is designed to define **schemas** and **APIs** in a structured way.
Tables and enums may be referenced, but they are not described here.

---

## 1. Schemas

Schemas describe reusable data shapes for requests and responses.
They are similar to TypeScript interfaces.

```
schema <Name> {
  <field_name> <type> [required]
}
```

### Supported Types

* **Primitives**: `string`, `number`, `boolean`
* **Schema reference**: `schema.<SchemaName>`
* **Table reference**: `table.<TableName>`
* **Enum reference**: `enum.<EnumName>`
* **Array**: `array <type>`

  * `array array <type>` = `[][]`
  * `array array array <type>` = `[][][]`

### Not Supported Types

all other data types like data types in database like varchar, bigint, float, blob, and others is not supported. Use only supported types above.

### Modifiers in Schemas

* `required` — Field must exist
* `default` — **not supported**

---

## 2. APIs

APIs define REST endpoints and their contracts.

```
api <method> <path> {
  alias <name>
  headers { ... }
  query { ... }
  path { ... }
  body { ... }
  return <type> [required]
}
```

### Alias

* **Recommended**: use `camelCase` (e.g., `getUserDetail`)
* Allowed: `snake_case` or `PascalCase`
* Not allowed: spaces or special symbols

---

### Sections

* **headers** — inline schema, cannot use `required`
* **query** — inline schema, cannot use `required`
* **path** — inline schema, **all fields must use `required`**
* **body** — inline schema, cannot use `required`
* **return** — may reference a schema, table, or inline schema

### Modifiers in APIs

* **`required`** —

  * allowed on `return`
  * mandatory for all `path` fields
* **`default=<value>`** — allowed only at **top-level API fields** (headers/query/path/body/return)
* **Inline schemas inside APIs** (except `path`) cannot use `required`

---

## 3. API Use Cases with Path Parameters

Path parameters are expressed with `:param_name` in the route.
They must be declared under the **path** section, and each must have the `required` modifier.

---

### 3.1 Basic Single Path Parameter

```
api get /user/:id {
  alias getUser
  path {
    id number required
  }
  return table.User required
}
```

**Use case**: Fetch a single user by ID.
Equivalent HTTP request:

```
GET /user/42
```

---

### 3.2 Multiple Path Parameters

```
api get /course/:course_id/lesson/:lesson_id {
  alias getLessonDetail
  path {
    course_id number required
    lesson_id number required
  }
  return table.Lesson required
}
```

**Use case**: Fetch a lesson that belongs to a specific course.
Equivalent HTTP request:

```
GET /course/5/lesson/12
```

---

### 3.3 Path + Headers

```
api get /user/:id/profile {
  alias getUserProfile
  headers {
    authorization string
  }
  path {
    id number required
  }
  return {
    user table.User required
    last_login string
  } required
}
```

**Use case**: Fetch a protected user profile.
Equivalent HTTP request:

```
GET /user/42/profile
Authorization: Bearer <token>
```

---

### 3.4 Path + Query

```
api get /course/:id/students {
  alias getCourseStudents
  path {
    id number required
  }
  query {
    limit number
    offset number
  }
  return {
    total number required
    data array table.User required
  } required
}
```

**Use case**: Get paginated students of a course.
Equivalent HTTP request:

```
GET /course/12/students?limit=10&offset=20
```

---

### 3.5 Path + Query + Headers

```
api get /user/:id/activities {
  alias getUserActivities
  headers {
    authorization string
  }
  path {
    id number required
  }
  query {
    from string
    to string
  }
  return {
    total number required
    logs array {
      action string required
      timestamp string required
    } required
  } required
}
```

**Use case**: Get user activity logs between two dates with authentication.
Equivalent HTTP request:

```
GET /user/42/activities?from=2025-01-01&to=2025-01-31
Authorization: Bearer <token>
```

---

## 4. Nested Arrays

The DSL supports recursive arrays.

* `array string` → `string[]`
* `array array string` → `string[][]`
* `array array array number` → `number[][][]`

**Example**

```
schema DeepArrayExample {
  tags array string
  grid array array number
  cube array array array boolean required
}
```

Equivalent TypeScript:

```ts
tags?: string[];
grid?: number[][];
cube: boolean[][][];
```

---

## 5. Cross-References

* **Schemas** can embed other schemas.
* **Schemas and APIs** may reference tables (`table.<Name>`) and enums (`enum.<Name>`).
* **APIs** can return schemas, tables, or inline schemas.

---

# Summary

This DSL provides:

* **Schemas** for reusable data contracts (`required` only)
* **Inline schemas** inside schemas or arrays (`required` only)
* **Headers, query, body** → must be inline schemas (no `required`)
* **Path** → must be inline schema, **all fields required**
* **APIs** → support `required` (only on `return` and path fields) and `default` (only at top-level fields)
* **Aliases** recommended in `camelCase`
* **Nested arrays** supported for complex data structures
* **Cross-references** to tables, schemas, and enums
</context>

<context-table-dsl>
You are a DSL schema generator. I will describe database models in plain English, and you will generate schema definitions in my custom DSL format.

## DSL Syntax Rules

1. Tables are defined as:

```
table <Name> {
  <column_name> <type> <modifiers>
}
```


- Supported data types (no parameters):
bigint, int8, bigserial, serial8, boolean, bool, box, bytea, cidr, circle,
date, float, float8, inet, integer, int, int4, json, jsonb, line, lseg,
macaddr, macaddr8, money, path, pg_lsn, pg_snapshot, point, polygon, real,
float4, smallint, int2, smallserial, serial2, serial, serial4, text, timetz,
timestamptz, tsquery, tsvector, txid_snapshot, uuid, xml.

- Supported data types (with parameters):

  - `bit(n)`

  - `varbit(n)`

  - `char(n)`

  - `varchar(n)`

  - `time(p)`

  - `timestamp(p)`

  - `numeric(p, s)`

  - `decimal(p, s)`

- Modifiers:

  - `pk` → primary key

  - `inc` → auto increment

  - `notnull` → not nullable

  - `default=<value>` → default value

- Foreign keys:

  - `<column> <ReferencedTable>.<ForeignKeyColumn> notnull`

2. Enums are defined as:

```
enum <EnumName> {
  Value1
  Value2
  ...
}
```


3. Formatting rules:

- Use two spaces indentation inside braces.

- Leave blank lines between logical field groups.

- Enums are always defined outside tables.

### Instructions

- When I describe a model in plain English (e.g., "I need a User table with email and password"), generate only the DSL code block.

- If I mention relationships, use foreign keys.

- If I mention options/choices, generate an enum.

- Do not add explanations or comments, only the DSL code.

----

### Example

#### Input (English):
A BlogPost table with title, content, and status (draft, published, archived). Each BlogPost belongs to a User.

#### Output (DSL):

```
table User {
  id bigint pk notnull inc
  name varchar(200) notnull
}

enum BlogPostStatus {
  Draft
  Published
  Archived
}

table BlogPost {
  id bigint pk notnull inc
  id_user User.id notnull
  title varchar(500) notnull
  content text notnull
  status enum.BlogPostStatus notnull default=Draft
}
```
</context-table-dsl>

<tutorial>
# Tutorial: Build a web backend REST API server with NAIV in NodeJS Typescript

## Prerequisite

On this article I assume the reader already familiar with some tools below:
- NodeJS & Typescript
- ExpressJS & CORS
- TypeORM & PostgreSQL

You will also need the following programs installed at a minimum:
- npx v10.8.2
- npm v10.8.2
- node v20.19.2
- VSCode / VSCodium
- Install **NAIV Developer Tools** extension from VSCode Extensions / VSCodium Extensions

and an empty PostgreSQL database (you can use other databases such as MySQL) with credentials like this:

| Credential | Sample Value |
| ------- | -------- |
| DB_TYPE | postgres |
| DB_HOST | localhost |
| DB_PORT | 5432 |
| DB_USERNAME | myuser |
| DB_PASSWORD | sample-password |
| DB_NAME | olshopdb |

## Use Cases

This tutorial walks through a use case an "Online Shop Website", with specification at least as:

- A user can login & register
- A user can see the product
- A user can buy a single product

## The System Design

### Database Structure/Schema

The Online Shop Website can be described as follows: A user visits the website, views products, checks out, and finally owns the product through a completed transaction.

I can assume there are at least three minimum entities on the system: `User`, `Product`, and `Transaction`. Now I can write it into NAIV DSL database structure design:

```
table User {
  id bigint pk inc notnull
  fullname varchar(500) notnull
  email varchar(200) notnull
  password varchar(200) notnull
  created_at timestamp notnull default=NOW()
}

table Product {
  id bigint pk inc notnull
  name varchar(200) notnull
  description text
  price decimal(10, 4) notnull default=0
  stock int default=0
  created_at timestamp notnull default=NOW()
}

table Transaction {
  id bigint pk inc notnull
  id_user User.id notnull
  id_product Product.id notnull
  qty int notnull
  amount_total decimal(15,4) notnull
  created_at timestamp notnull default=NOW()
}
```

### API Specification

The minimum API use cases are:
- Public API
  - `POST /login` user login with email and password
  - `POST /register` user register with fullname, email, and password
  - `GET /product` user can see the product with paginated response
  - `GET /product/:id` user can see a product detail

- Logged-In Users Only
  - `POST /product/:id/checkout` user checkout a product with specific quantity
  - `GET /my-transaction` user can see list of transaction
  - `GET /my-transaction/:id_transaction` user can see a detail of transaction

For simplicity, I will only show two API definitions in NAIV DSL `POST /login` and `GET /my-transaction`:

```
api post /login {
  alias loginUser
  description user login with email and password
  body {
    email string required
    password string required
  }
  return {
    token string required
    data table.User required
  } required
}

api get /my-transaction {
  alias getMyTransaction
  description user can see list of transaction
  headers {
    authorization string required
  }
  return {
    total number required
    data array table.Transaction required
  } required
}
```

## Build Backend Server Stub

After completing the design phase, I will now create the backend stub/scaffolding based on the design specification.

### 1. Run NAIV Typescript Starter CLI

```bash
npx @naiv/ts-api --out my-backend
```

This command will automatically clone the NAIV TypeScript backend server boilerplate and run `npm install`. You can change the output folder `my-backend`.

### 2. Create NAIV Design File

When freshly cloned, the project contains example designs inside the `design/` folder. For this tutorial, delete all `*.naiv` files in the folder and create two new files:

- `db.naiv` contains database structure/schema design
- `api.naiv` contains api specification design

At first open you will see screen like this

![](/md-images/img1.png)

For now, I will skip the AI feature and click **Open Code Editor** and write the database design and save the file. Now it will automatically render the database relationship visualization like this:

![](/md-images/img2.png)

Do the same for API Specification design file, it also automatically render the API screen like this:

![](/md-images/img3.png)

### 3. Generate Backend Server Stub/Scaffolding

The starter project includes code generation scripts. Run:

```bash
npm run codegen
```

This will generate non-essential backend parts such as data types and specifications. A `types/` folder will be created containing the generated files.

![](/md-images/img4.png)

### 4. Generate & Run Database Migration

#### Setup `.env` File

Copy `.env.example` to `.env` and fill in your database credentials.

#### Generate Migration File

This feature is built on TypeORM. To generate a migration file, run:

```bash
npm run generate-migration migration/MyFirstMigration
```

`migration/MyFirstMigration` consist of two parts where `migration` is the folder name you should not change this folder name since it registered on the `data-source.ts`, but you can change the migration file name `MyFirstMigration` as you want.

If your credential correct, you will see a new folder `migration/` and a migration file with extension `.ts`, also the output will like this:

```bash
> test-be@1.0.0 generate-migration
> npm run typeorm migration:generate -- $1 -d ./data-source.ts migration/MyFirstMigration


> test-be@1.0.0 typeorm
> typeorm-ts-node-commonjs migration:generate -d ./data-source.ts migration/MyFirstMigration

[dotenv@17.2.3] injecting env (7) from .env -- tip: 🔐 encrypt with Dotenvx: https://dotenvx.com
Migration /<folders path>/my-backend/migration/1759418283153-MyFirstMigration.ts has been generated successfully.
```

A new migration file will be created under the `migration/` folder. It contains SQL scripts for creating your schema in the actual database.

#### Run Migration

Now execute the migration

```bash
npm run migrate
```

When success the output will like this:


```bash
> test-be@1.0.0 migrate
> npm run typeorm migration:run -- -d ./data-source.ts


> test-be@1.0.0 typeorm
> typeorm-ts-node-commonjs migration:run -d ./data-source.ts

[dotenv@17.2.3] injecting env (7) from .env -- tip: 🔐 prevent building .env in docker: https://dotenvx.com/prebuild
query: SELECT version()
query: SELECT * FROM current_schema()
query: SELECT * FROM "information_schema"."tables" WHERE "table_schema" = 'public' AND "table_name" = 'migrations'
query: CREATE TABLE "migrations" ("id" SERIAL NOT NULL, "timestamp" bigint NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id"))
query: SELECT * FROM "migrations" "migrations" ORDER BY "id" DESC
0 migrations are already loaded in the database.
1 migrations were found in the source code.
1 migrations are new migrations must be executed.
query: START TRANSACTION
query: CREATE TABLE "User" ("id" SERIAL NOT NULL, "fullname" character varying(500) NOT NULL, "email" character varying(200) NOT NULL, "password" character varying(200) NOT NULL, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))
query: CREATE TABLE "Product" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL, "description" text, "price" numeric(10,4) NOT NULL DEFAULT '0', "stock" integer DEFAULT '0', "created_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_9fc040db7872192bbc26c515710" PRIMARY KEY ("id"))
query: CREATE TABLE "Transaction" ("id" SERIAL NOT NULL, "id_user" integer NOT NULL, "id_product" integer NOT NULL, "qty" integer NOT NULL, "amount_total" numeric(15,4) NOT NULL, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_21eda4daffd2c60f76b81a270e9" PRIMARY KEY ("id"))
query: ALTER TABLE "Transaction" ADD CONSTRAINT "FK_03dede4efcc90ae0e2ce8655246" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE "Transaction" ADD CONSTRAINT "FK_778682889a61844f5177bd6f2bc" FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
query: INSERT INTO "migrations"("timestamp", "name") VALUES ($1, $2) -- PARAMETERS: [1759418283153,"MyFirstMigration1759418283153"]
Migration MyFirstMigration1759418283153 has been executed successfully.
query: COMMIT
```

This will create the database schema in your PostgreSQL (or other supported) database.

## 5. Implement API

On this boilerplate project, you must put your implementation files on the folder `implementation/` like on this picture:

![](/md-images/img5.png)

Implementation files must be placed under the `implementation/` folder. The rules are:

- Implementation filename must be same as API alias name on the API design with `.ts` file extension
- The function should export a lambda (arrow function) with same name with the alias name.
- The API types is available under folder `/types/api/<alias name>.ts`


### 1. `POST /login` alias `loginUser`

Look this implementation code:

![](/md-images/img6.png)

The API types can be imported from `"../types/api/loginUser"` which is folder `types/api` and the type is exported as `T_loginUser` which consist of `T_` + `<alias name>`.

The implementation export lambda/arrow function also must follow the alias name like this:

```typescript
export const loginUser: T_loginUser = async req => {
  // ...
}
```

the name `loginUser` same as the alias name.

### 2. `GET /my-transaction` alias `getMyTransaction`

Same rules apply for other API implementation

![](/md-images/img7.png)

## 6. Run Server

The server will automatically detects all implementation files under folder `implementation/`

```bash
npm run build
npm start
```

The output will like:

```bash
> test-be@1.0.0 start
> node dist

[dotenv@17.2.3] injecting env (7) from .env -- tip: 👥 sync secrets across teammates & machines: https://dotenvx.com/ops
[dotenv@17.2.3] injecting env (0) from .env -- tip: 🔑 add access controls to secrets: https://dotenvx.com/ops
✅api 'get /my-transaction' (getMyTransaction) is ready
✅api 'post /login' (loginUser) is ready

⚡️[server]: Server is running at http://localhost:9415
```

it is running now.

## 7. Testing with NAIV VSCode Extension API Tester

The NAIV VSCode extension includes an API tester, reducing the need for switching between tools. You can directly test your API inside VSCode alongside your code.

![](/md-images/img8.png)

## Conclusion

In this tutorial, there are only two things I did:

- Running scripts
- Implement actual server logic

The first **Running Script** help me transform all NAIV DSL specification into hard-coded backend server programming language (in this case: Typescript). The second: I implement all the API logic just right in the core of the system without worrying about the repetitive task nor other non-essential things.

This tutorial demonstrate how NAIV DSL is really helpful and improves programmer efficiency to build a backend REST API server that require relational database (like: PostgreSQL) as main data storage.

</tutorial>

<task>
create a tutorial how to build a backend in nodejs with feature simple user and product, login, register, and crud product feature
</task>

Based on the context, context-table-dsl tag, and tutorial: complete task describe in the task tag. Show response without code fence block and without opening/closing text.
