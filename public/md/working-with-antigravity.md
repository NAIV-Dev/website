# Develop Backend API with AI-Assistant Antigravity

## Prerequisites

Make sure you have installed:

* Node.js v20+
* npm v10+
* npx v10+
* Antigravity
* **NAIV Developer Tools** extension

## How to Start

Generate project boilerplate

```bash
$ npx @naiv/ts-api -o your-project-name
```

Open project on **Antigravity**

**Antigravity** will automatically look at file `INSTRUCTION.md` as instruction how to use NAIV on the created project, you just need to give instruction to AI-Assistant what backend do you want like example below. I usually use "Gemini 3 Flash" as model since it fast and free.

![](/md-images/antigravity-instruction.png)

Antigravity is instructed to divide working process into 4 main phase:
1. Design Phase
2. NAIV Code Auto-Generation & Database Setup Phase
3. Implementation Phase
4. Iteration Phase

On phase 2: **NAIV Code Auto-Generation & Database Setup Phase** you need to prepare an instance database and fill your db credential into `.env` file, you can use [NAIV Zero DB](https://naiv.dev/zero) for testing purpose, it is free.

On every phase, AI-Assistant will halt the process and asking for review once the phase is finished. You can look at `INSTRUCTION.md` for more information.
