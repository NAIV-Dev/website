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
