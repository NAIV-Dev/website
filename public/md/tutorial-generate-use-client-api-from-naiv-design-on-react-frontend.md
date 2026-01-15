# Tutorial: Generate & use client API from NAIV design on React Frontend

## Prerequisite

On this article I assume the reader already familiar with some tools below:
- ReactJS, ViteJS, & Typescript
- Axios

You will also need the following programs installed at a minimum:
- npx v10.8.2
- npm v10.8.2
- node v20.19.2
- VSCode / VSCodium
- Install **NAIV Developer Tools** extension from VSCode Extensions / VSCodium Extensions

## Use Cases

On this tutorial I will start a new ViteJS project and implement two types of API call:

- The common way (without NAIV DSL)
- With NAIV DSL Code Generator

I will use NAIV DSL design and the API server that I have created on the previous tutorial [Tutorial: Build a web backend REST API server with NAIV in NodeJS Typescript
](/learning-resources/tutorial-build-a-web-backend-rest-api-server-with-naiv-in-nodejs-typescript)

## Web Preparation

### Vite Project Setup

I started the ViteJS project from the official guides with CLI:

```bash
npm create vite@latest
```

Here is my setup detail

```bash
Need to install the following packages:
create-vite@8.0.2
Ok to proceed? (y)


> npx
> create-vite

◇  Project name:
│  my-webiste
│
◇  Select a framework:
│  React
│
◇  Select a variant:
│  TypeScript
│
◇  Use rolldown-vite (Experimental)?:
│  No
│
◇  Install with npm and start now?
│  No
│
◇  Scaffolding project in /home/graf/temp/my-webiste...
│
└  Done. Now run:

  cd my-webiste
  npm install
  npm run dev
```

it created a new project folder `my-website`. After instalation, now my website is ready to develop with Typescript support.

### Add Axios HTTP Client

```bash
npm install axios
```

## The Old Ways

I modified the original `App.tsx` from Vite boilerplate, add a button **Try API** and hit API endpoint that I have created before:

```tsx
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios, { type AxiosResponse } from 'axios'

interface LoginResponse {
  token: string
  data: any // this should be a User object type
}

function App() {
  async function testAPI() {
    try {
      const payload = {
        email: 'sample@aa.aa',
        password: '123123'
      };
      const result: AxiosResponse<LoginResponse> = await axios.post('/login', payload, {
        baseURL: 'http://localhost:9415'
      });
      alert(JSON.stringify(result));
    } catch (err: any) {
      alert(`Error: ${err?.response?.data?.toString()}`);
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={testAPI}>
          Try API
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
```

Let’s see how the `testAPI` function works. First, I need to check the API design to recall the payload, method, and URL path. Then, I need to write an interface to help me access the API response easily. For a small project, this might not be a problem, but for larger projects, it quickly becomes difficult to manage.

## With NAIV DSL: Axios Client Code Generator

First, I copied the entire NAIV DSL design into the Vite project. I placed it in a folder named `design` at the project root, like this:

![](/md-images/img21.png)

Next, I will run NAIV Code Generator for axios http client:

```bash
npx @naiv/codegen-axios-client -d design -o src/api-client
```

It generates utility function and TS-types to call API backend from design folder `-d design` to output folder `-o src/api-client`. In simple term, it creates fully-typed SDK to access the backend API server. Now I can see the generated files under `src/api-client` folder:

![](/md-images/img22.png)

In some cases you need to configure `tsconfig.app.json` and `tsconfig.node.json` changes two keys below to `false`:

```json
{
  "compilerOptions": {
    // ...
    "verbatimModuleSyntax": false, // originally true, change it to false
    "erasableSyntaxOnly": false, // originally true, change it to false
    // ...
  }
}
```

next, I use the generated function on the `App.tsx`, I change the `testAPI` implementation:

```typescript
import { AxiosClient } from './api-client/AxiosClient'

function App() {
  async function testAPI() {
    try {
      AxiosClient.BaseURL.instance.set('http://localhost:9415');
      const result = await AxiosClient.loginUser({
        body: {
          email: 'sample@aa.aa',
          password: '123123'
        }
      });
      alert(JSON.stringify(result));
    } catch (err: any) {
      alert(`Error: ${err?.response?.data?.toString()}`);
    }
  }
}
```

Since API `POST /login` has alias `loginUser`, the generated axios client provides a function with alias name as representation of the API call `POST /login`.

## Conclusion

Without NAIV DSL, developers need to manually remember API details, write payloads, and define response interfaces. This process becomes increasingly complex in larger projects. With the NAIV DSL and its Axios Client Code Generator, you can automatically generate strongly typed API client functions directly from your design, ensuring consistency and reducing repetitive coding. This approach simplifies development, improves maintainability, and allows frontend developers to focus on building features instead of managing boilerplate API code.
