import { Link } from "@heroui/react";

interface LearningResourcesProps {}

export function LearningResources(props: LearningResourcesProps) {
  return (
    <div className="flex flex-col gap-6">
      {
        [
          [
            'Tutorial: Build a Simple Backend in Node.js with User Authentication and Product CRUD',
            'Learn how to build a complete Node.js backend using **NAIV DSL**, featuring user authentication and product CRUD operations. This step-by-step tutorial covers database schema design, API definition, code generation, and implementation with TypeScript.',
            '/learning-resources/tutorial-build-simple-backend-nodejs-user-authentication-product-crud'
          ],
          [
            'Tutorial: Generate & use client API from NAIV design on React Frontend',
            'Using APIs the traditional way requires manually handling endpoints, payloads, and response types, which quickly becomes error-prone in larger projects. With NAIV DSL and its Axios Client Code Generator, you can generate fully typed API clients directly from the design, making development faster, safer, and easier to maintain.',
            '/learning-resources/tutorial-generate-use-client-api-from-naiv-design-on-react-frontend'
          ],
          [
            'Tutorial: Build a web backend REST API server with NAIV in NodeJS Typescript',
            'In this tutorial we will show how to build a web backend API with NAIV and how NAIV brings benefit to the programmer. The backend will be implemented in NodeJS with Typescript.',
            '/learning-resources/tutorial-build-a-web-backend-rest-api-server-with-naiv-in-nodejs-typescript'
          ],
          [
            'Tutorial: REST API design with NAIV',
            'Learn how to design clear and consistent REST APIs using the NAIV DSL, with reusable schemas and structured contracts. This guide walks through examples step by step, making API design easier to read, maintain, and share.',
            '/learning-resources/tutorial-writing-rest-api-design-with-naiv'
          ],
          [
            'Tutorial: Writing database structure in NAIV',
            'Learn how to define clean and structured database schemas using the NAIV DSL through practical examples. This tutorial walks you step by step with a blog system and a task management app to show how tables, enums, and relationships come together.',
            '/learning-resources/tutorial-writing-database-structure-in-naiv'
          ],
          [
            'What problem is NAIV DSL trying to solve?',
            'Discover how the NAIV DSL unifies database, API, and client definitions into a single source of truth, reducing duplication and context switching. This article explains the problems it solves, the workflow it enables, and how it streamlines development for faster, more reliable iteration.',
            '/learning-resources/what-problem-is-naiv-dsl-trying-to-solve'
          ]
        ].map(([title, desc, href], i: number) => (
          <div
            className="flex flex-col items-start gap-1"
            key={i}>
            <div className="font-bold text-3xl">
              { title }
            </div>
            <div className="text-zinc-400">
              { desc }
            </div>
            <Link 
              target="_blank"
              href={href}
              className="text-rose-400"
              showAnchorIcon>
              Read more
            </Link>
          </div>
        ))
      }
    </div>
  );
}
