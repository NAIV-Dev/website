# Tutorial: REST API design with NAIV

## Prerequisite

- VSCode / VSCodium
- Install **NAIV Developer Tools** extension from VSCode Extensions / VSCodium Extensions

This guide focuses on defining **schemas** and **APIs** with the DSL.
Tables and enums are assumed to exist already, so we’ll reference them directly when needed.

## 1. Defining Schemas

Schemas describe reusable data structures for requests and responses.
They are similar to TypeScript interfaces.

### Syntax

```
schema <Name> {
  <field_name> <type> [required]
}
```

* **Primitive Types**: `string`, `number`, `boolean`
* **References**: `table.<TableName>`, `enum.<EnumName>`, `schema.<SchemaName>`
* **Arrays**: `array <type>`, supports nesting
* **Required**: use `required` to force presence

### Example

```
schema ProductSummary {
  id number required
  name string required
  price number required
}
```

Equivalent TypeScript:

```ts
interface ProductSummary {
  id: number;
  name: string;
  price: number;
}
```

## 2. Defining APIs

APIs describe REST endpoints and their contracts.

### Syntax

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

* `alias`: unique API identifier, recommended in `camelCase`
* `headers`: inline schema (all fields **must** use native/primitives types only)
* `query`: inline schema (all fields **must** use native/primitives types only)
* `path`: inline schema (all fields **must** use `required` and use native/primitives types only)
* `body`: inline schema (fields may use native/primitives types, or reference a schema, table, or inline schema)
* `return`: may reference a schema, table, or inline schema

## 3. Use Case 1: Get Products by Category

We want an API to fetch products belonging to a specific category.

### DSL

```
schema ProductListResponse {
  total number required
  items array table.Product required
}

api get /categories/:id/products {
  alias getCategoryProducts
  path {
    id number required
  }
  query {
    limit number
    offset number
  }
  return schema.ProductListResponse required
}
```

**Request Example:**

```
GET /categories/5/products?limit=10&offset=20
```

**Response Example (simplified):**

```json
{
  "total": 120,
  "items": [
    { "id": 1, "name": "Laptop", "price": 950.00 },
    { "id": 2, "name": "Headphones", "price": 120.00 }
  ]
}
```

## 4. Use Case 2: Create an Order

We want an API to create a new order with multiple items.

### DSL

```
schema OrderItemInput {
  id_product number required
  quantity number required
}

schema OrderResponse {
  order table.Order required
  items array table.OrderItem required
}

api post /orders {
  alias createOrder
  headers {
    authorization string
  }
  body {
    id_user number required
    items array schema.OrderItemInput required
  }
  return schema.OrderResponse required
}
```

**Request Example:**

```
POST /orders
Authorization: Bearer <token>

{
  "id_user": 42,
  "items": [
    { "id_product": 1, "quantity": 2 },
    { "id_product": 3, "quantity": 1 }
  ]
}
```

**Response Example (simplified):**

```json
{
  "order": {
    "id": 99,
    "id_user": 42,
    "status": "Pending",
    "total": 1320.00
  },
  "items": [
    { "id": 1, "id_order": 99, "id_product": 1, "quantity": 2, "price": 950.00 },
    { "id": 2, "id_order": 99, "id_product": 3, "quantity": 1, "price": 120.00 }
  ]
}
```

## 5. Key Takeaways

* **Schemas**: reusable data contracts (`schema.<Name>`)
* **APIs**: REST endpoints with headers, path, query, body, and return
* **Required**:

  * Allowed in schemas and return types
  * Mandatory in `path`
* **References**: you can reference tables, enums, or other schemas
* **Aliases**: always give your API a clear name
