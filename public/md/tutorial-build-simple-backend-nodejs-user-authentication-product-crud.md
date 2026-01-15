# Tutorial: Build a Simple Backend in Node.js with User Authentication and Product CRUD

## Introduction

In this tutorial, I will build a backend REST API in **Node.js** using **NAIV DSL**. The system will include:

* User registration and login
* Product CRUD (Create, Read, Update, Delete)
* Authentication with bearer token

I will define our **database schema**, **API design**, and then generate a working backend server using **NAIV Developer Tools** and **TypeScript**.

## Prerequisites

Make sure you have installed:

* Node.js v20+
* npm v10+
* npx v10+
* PostgreSQL (or MySQL)
* VSCode or VSCodium
* **NAIV Developer Tools** extension from VSCode marketplace

Example database credentials:

| Credential  | Sample Value    |
| ----------- | --------------- |
| DB_TYPE     | postgres        |
| DB_HOST     | localhost       |
| DB_PORT     | 5432            |
| DB_USERNAME | myuser          |
| DB_PASSWORD | sample-password |
| DB_NAME     | simple_backend  |

You can create a free MySQL database on NAIV Zero Services:
1. Go to [NAIV Zero Services](https://naiv.dev/zero)
2. Login into your account (or register a new one)
3. Create new database on **Database** tab
4. Since youre using MySQL, change `DB_TYPE` to `mysql` and other credentials as seen on your new created database

## 1. Define Database Schema with NAIV DSL (`db.naiv`)

I will create two main tables: **User** and **Product**.

```
table User {
  id bigint pk inc notnull
  fullname varchar(200) notnull
  email varchar(200) notnull
  password varchar(200) notnull
  created_at timestamp notnull default=NOW()
}

table Product {
  id bigint pk inc notnull
  name varchar(200) notnull
  description text
  price decimal(10, 2) notnull default=0
  created_at timestamp notnull default=NOW()
}
```

This structure supports user authentication and basic product information storage.

Save this as **db.naiv** in your project’s `design/` folder.

## 2. Define API Specification (`api.naiv`)

I’ll create APIs for:

* **POST /register** — user registration
* **POST /login** — user login
* **GET /product** — list products
* **POST /product** — create product
* **GET /product/:id** — view product detail
* **PUT /product/:id** — update product
* **DELETE /product/:id** — delete product

```
api post /register {
  alias registerUser
  description user registration
  body {
    fullname string required
    email string required
    password string required
  }
  return {
    message string required
    data table.User required
  } required
}

api post /login {
  alias loginUser
  description user login
  body {
    email string required
    password string required
  }
  return {
    token string required
    data table.User required
  } required
}

api get /product {
  alias getProductList
  description get list of products
  return {
    total number required
    data array table.Product required
  } required
}

api post /product {
  alias createProduct
  description create new product
  headers {
    authorization string
  }
  body {
    name string required
    description string
    price number required
  }
  return table.Product required
}

api get /product/:id {
  alias getProductDetail
  description get product detail by id
  path {
    id number required
  }
  return table.Product required
}

api put /product/:id {
  alias updateProduct
  description update product by id
  headers {
    authorization string
  }
  path {
    id number required
  }
  body {
    name string
    description string
    price number
  }
  return {
    message string required
    updated table.Product required
  } required
}

api delete /product/:id {
  alias deleteProduct
  description delete product by id
  headers {
    authorization string
  }
  path {
    id number required
  }
  return {
    message string required
  } required
}
```

Save this as **api.naiv** inside `design/` folder.

## 3. Initialize Backend Project

Run the following command:

```bash
npx @naiv/ts-api --out simple-backend
```

This will create a starter TypeScript backend with NAIV scaffolding.

## Put your NAIV design files

Remove all example `*.naiv` files from design folder, create two new files: `db.naiv` and `api.naiv`, and copy design above (`db.naiv` and `api.naiv`) into the files.

## 4. Generate Code

Go to generated project folder:

```bash
cd simple-backend
```

Inside the generated project folder, run:

```bash
npm run codegen
```

This command generates TypeScript types and data structures based on your `.naiv` files inside `types/`.

## 5. Setup Database and Run Migration

### 1. Create `.env` file

Copy `.env.example` to `.env` and set your database credentials from your local database or one you've created on NAIV Zero Services.

Example:

```
DB_TYPE=mysql
DB_HOST=zero-db.naiv.dev
DB_PORT=23306
DB_USERNAME=uname_xxxxxxxxxxxxxx
DB_PASSWORD=pwd_xxxxxxxxxxxxxx
DB_NAME=db_xxxxxxxxxxxxxxxx
```

### 2. Generate Migration

```bash
npm run generate-migration migration/InitMigration
```

### 3. Run Migration

```bash
npm run migrate
```

This creates `User` and `Product` tables in your database.

## 6. Implement API Logic

All implementations go inside `implementation/` folder.
Each file name must match the API `alias` name.

### 1. implementation/registerUser.ts

```typescript
import { T_registerUser } from "../types/api/registerUser";
import { User } from "../types/model/table/User";

export const registerUser: T_registerUser = async req => {
  const exists = await User.findOneBy({ email: req.body.email });

  if (exists) {
    throw new Error("Email already registered");
  }

  const user = new User();
  user.fullname = req.body.fullname;
  user.email = req.body.email;
  user.password = req.body.password;
  await user.save()

  return {
    message: "Registration successful",
    data: user
  };
};
```

### 2. implementation/loginUser.ts

```typescript
import { T_loginUser } from "../types/api/loginUser";
import jwt from "jsonwebtoken";
import { User } from "../types/model/table/User";

export const loginUser: T_loginUser = async req => {
  const { email, password } = req.body;
  const user = await User.findOneBy({ email, password });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ id: user.id }, "secretkey", { expiresIn: "1d" });

  return {
    token,
    data: user
  };
};
```

Since I use `jwt` package in this implementation, I need to install additional package:

```bash
npm install --save jsonwebtoken && npm install --save-dev @types/jsonwebtoken
```

### 3. implementation/createProduct.ts

```typescript
import { T_createProduct } from "../types/api/createProduct";
import { Product } from "../types/model/table/Product";

export const createProduct: T_createProduct = async req => {
  const product = new Product();
  product.name = req.body.name;
  product.description = req.body.description || '';
  product.price = req.body.price;
  await product.save();

  return product;
};
```

### 4. implementation/getProductList.ts

```typescript
import { T_getProductList } from "../types/api/getProductList";
import { Product } from "../types/model/table/Product";

export const getProductList: T_getProductList = async req => {
  const data = await Product.find();
  return { total: data.length, data };
};
```

### 5. implementation/getProductDetail.ts

```typescript
import { T_getProductDetail } from "../types/api/getProductDetail";
import { Product } from "../types/model/table/Product";

export const getProductDetail: T_getProductDetail = async req => {
  const product = await Product.findOneBy({ id: req.path.id });
  if (!product) {
    throw new Error("Product not found");
  }
  
  return product;
};
```

### 6. implementation/updateProduct.ts

```typescript
import { T_updateProduct } from "../types/api/updateProduct";
import { Product } from "../types/model/table/Product";

export const updateProduct: T_updateProduct = async req => {
  const product = await Product.findOneBy({ id: req.path.id });
  if (!product) {
    throw new Error(`product not found`);
  }

  product.name = req.body.name ?? product.name;
  product.description = req.body.description ?? product.description ?? '';
  product.price = req.body.price ?? product.price;
  await product.save();

  return { message: "Product updated", updated: product };
};
```

### 7. implementation/deleteProduct.ts

```typescript
import { T_deleteProduct } from "../types/api/deleteProduct";
import { Product } from "../types/model/table/Product";

export const deleteProduct: T_deleteProduct = async req => {
  await Product.delete({ id: req.path.id });
  return { message: "Product deleted" };
};
```

## 7. Run the Server

Build and start the server:

```bash
npm run build
npm start
```

Expected output:

```
✅api 'post /product' (createProduct) is ready
✅api 'delete /product/:id' (deleteProduct) is ready
✅api 'get /product/:id' (getProductDetail) is ready
✅api 'get /product' (getProductList) is ready
✅api 'post /login' (loginUser) is ready
✅api 'post /register' (registerUser) is ready
✅api 'put /product/:id' (updateProduct) is ready

⚡️[server]: Server is running at http://localhost:9415
```

## 8. Test API in VSCode

Use the **NAIV Developer Tools** extension’s built-in API Tester. You can easily test all your endpoints (`/register`, `/login`, `/product`, etc.) directly in VSCode without using external tools like Postman. Make sure you have installed **NAIV Developer Tools** VSCode Extension, click `api.naiv` and you will see the API tester screen.

## Conclusion

You have successfully built a simple backend in **Node.js** using **NAIV DSL** with features:

* User registration & login
* JWT authentication
* Product CRUD operations

By defining your **schema** and **API** in NAIV DSL, you can generate a complete backend scaffold instantly, saving hours of repetitive setup work.
