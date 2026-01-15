# Tutorial: Writing database structure in NAIV

This tutorial will show you how to use the custom DSL to define database schemas. Instead of covering everything in theory, we’ll walk through two practical use cases: a **blog system** and a **task management app**.

## Prerequisite

- VSCode / VSCodium
- Install **NAIV Developer Tools** extension from VSCode Extensions / VSCodium Extensions

## Use Case 1: Blog System

We want to create a simple blog platform where users can write posts.
Requirements:

* A `User` table with name and email.
* A `BlogPost` table with title, content, and status (draft, published, archived).
* Each post belongs to a user.

### DSL Schema

```
table User {
  id bigint pk notnull inc
  name varchar(200) notnull
  email varchar(300) notnull
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

Here:

* `User.id` is the primary key.
* `BlogPost.id_user` creates a foreign key to `User.id`.
* `status` uses the `BlogPostStatus` enum.

## Use Case 2: Task Management App

We want to manage tasks for different users.
Requirements:

* A `User` table with name and email.
* A `Task` table with title, description, status, and creation date.
* A task is assigned to a user.
* The status can be `Todo`, `InProgress`, or `Done`.

### DSL Schema

```
table User {
  id bigint pk notnull inc
  name varchar(200) notnull
  email varchar(300) notnull
}

enum TaskStatus {
  Todo
  InProgress
  Done
}

table Task {
  id bigint pk notnull inc
  id_user User.id notnull
  title varchar(500) notnull
  description text
  status enum.TaskStatus notnull default=Todo
  created_at timestamptz notnull
}
```

Here:

* `Task.id_user` links each task to a specific user.
* `status` is restricted to predefined values using the `TaskStatus` enum.
* `created_at` ensures every task has a timestamp.

---

## Key Takeaways

* **Tables** define data structures.
* **Enums** define fixed choice values.
* **Foreign keys** establish relationships between tables.
* **Modifiers** (`pk`, `inc`, `notnull`, `default`) help enforce data integrity.

With this DSL, you can model both simple and complex relational systems consistently. Start small (like the blog system) and scale up (like the task manager) while keeping your schema structured and readable.
