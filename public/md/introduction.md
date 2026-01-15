# Introduction

NAIV is an ecosystem development for REST API. NAIV consists of several development tools:

- Domain Specific Language (DSL)
- VSCode/VSCodium Extension
  - Database Structure Visualization
  - API Preview & Tester
- Code Generator
  - HTTP Server Stub/Scaffolding Generator
  - HTTP Client Generator

## Starting Point

Here some our step by step tutorial for you to begin learn and use NAIV

1. [Install **NAIV Developer Tools** extension on VSCode / VSCodium](/learning-resources/install-naiv-developer-tools-extension-on-vscode-vscodium)
2. [Write your first NAIV DSL Code](/learning-resources/write-your-first-naiv-dsl-code)
3. [Design database with NAIV DSL](/learning-resources/design-database-with-naiv-dsl)
4. [API Contract/Specification in NAIV DSL](/learning-resources/api-contract-specification-in-naiv-dsl)
5. [Build a backend server based on NAIV DSL in NodeJS & Typescript](/learning-resources/build-a-backend-server-based-on-naiv-dsl-in-nodejs-typescript)
6. [Generate a HTTP Client SDK based on NAIV DSL in Typescript](/learning-resources/generate-a-http-client-sdk-based-on-naiv-dsl-in-typescript)
7. [NAIV Best Practice in a Big Software Project](/learning-resources/naiv-best-practice-in-a-big-software-project)

## How NAIV Works

The NAIV DSL is a **blueprint** of the whole REST API program. Look at a simple blueprint code below:

```
table User {
  id bigint pk inc notnull
  fullname varchar(200) notnull
  email varchar(200) notnull
  password varchar(200) notnull
  created_at timestamp notnull
}

table Product {
  id bigint pk inc notnull
  id_user User.id notnull
  title varchar(500) notnull
}

schema RegisterResponse {
  token string required
  data table.User required
}

api post /register {
  description user registration by fullname, email, and password
  body {
    fullname string required
    email string required
    password string required
  }
  return schema.RegisterResponse required
}
```

**Naiv Developer Tools** VSCode Extension will visualize the database structure and api/schema

![](/md-images/img31.png)

while the code generator will generate code scaffolding for backend API server like:
- typed route signatures, 
- controller placeholders, 
- DTOs, and 
- validators 

the generated code match the NAIV DSL exactly (no handwritten type translation necessary).

From frontend perspective, **code generator** generate a typed API client that understands headers, path/query/body contracts, and return shapes, so frontend code can call endpoints with autocomplete and compile-time checks.

[Next: Learn NAIV DSL](/learn-dsl)

