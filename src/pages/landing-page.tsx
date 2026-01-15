import { Button, Code, Link, Tab, Tabs } from "@heroui/react";
import { Layout } from "../layout/Layout";
import { Features } from "../components/landing-page/Features";
import { LearningResources } from "../components/landing-page/LearningResources";
import { Community } from "../components/landing-page/Community";
import { Sponsors } from "../components/landing-page/Sponsors";

export function LandingPage() {
  return (
    <Layout>
      <div className="flex flex-col pb-20">
        <div className="relative z-[3] px-6 md:px-[10%] py-15 lg:py-30 flex flex-col items-center gap-10">
          <img 
            className="w-15 object-contain pointer-events-none select-none"
            src={'/logo.png'} />
          <div className="text-center pointer-events-none select-none flex items-center justify-center relative leading-[1.3] text-4xl md:text-6xl text-rose-400 bg-gradient-to-r from-yellow-300 via-rose-400 to-zinc-400 bg-clip-text text-transparent">
            Next-Gen Framework<br/>to Build REST API
            <img 
              className="absolute w-[25vw] blur-xl hide-if-no-blur opacity-10 pointer-events-none select-none "
              src={'/blob1.svg'} />
          </div>
          <Code lang="shell" color="warning">npx @naiv/ts-api -o &lt;your-project-name&gt;</Code>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Button
              as={Link}
              href={'/learn-dsl'}
              color="warning"
              variant="bordered">
              Learn NAIV DSL
            </Button>
            <Button
              as={Link}
              href={'/get-started'}
              color="danger">
              Get Started (Typescript)
            </Button>
          </div>
          <div className="space-y-3">
            <Link isExternal showAnchorIcon color="warning" href="/working-with-antigravity">
              Learn how to work with AI-Assistant on Antigravity
            </Link>
            <div className="mt-[-6px] text-center">
              <Link
                href={'https://marketplace.visualstudio.com/items?itemName=NaivDeveloper.naiv-vscode-extension'}
                target="_blank"
                showAnchorIcon
                isExternal>
                VSCode Extension
              </Link>
              {' '}
              <Link
                href={'https://open-vsx.org/extension/NaivDeveloper/naiv-vscode-extension'}
                target="_blank"
                showAnchorIcon
                isExternal>
                VSCodium Extension
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex z-[2] px-6 md:px-[10%] self-center flex-col items-center">
          <Tabs
            className="self-center"
            classNames={{
              panel: "!outline-none"
            }}
            variant={'light'}
            color={'secondary'}>
            <Tab key="data" title="Database Structure">
              <img 
                className="self-center h-[40vw] object-contain rounded-xl shadow-[0px_1px_25px_rgba(0,0,0,.2)]"
                src={'/ss-db.png'} />
            </Tab>
            <Tab key="api" title="API Specification">
              <img 
                className="self-center h-[40vw] object-contain rounded-xl shadow-[0px_1px_25px_rgba(0,0,0,.2)]"
                src={'/ss-api.png'} />
            </Tab>
            <Tab key="schema" title="Object Schema">
              <img 
                className="self-center h-[40vw] object-contain rounded-xl shadow-[0px_1px_25px_rgba(0,0,0,.2)]"
                src={'/ss-schema.png'} />
            </Tab>
            <Tab key="editor" title="DSL Editor">
              <img 
                className="self-center h-[40vw] object-contain rounded-xl shadow-[0px_1px_25px_rgba(0,0,0,.2)]"
                src={'/ss-db-dsl.png'} />
            </Tab>
          </Tabs>
        </div>
        <div className="z-1 min-h-[50vh] relative mt-[-30vh]">
          <img 
            className="z-1 opacity-5 absolute left-0 top-0 object-cover w-full h-full"
            src={'/bg.webp'} />
          <div className="relative z-[2] mt-[30vh] lg:mt-[40vh] w-full px-6 md:px-[10%] py-12 flex flex-col gap-8">
            <div className="text-center flex items-center justify-center lg:justify-start relative leading-[1.3] text-5xl text-yellow-400">
              Features
            </div>
            <Features />
          </div>
        </div>
        <div className="bg-[#0002] relative z-[2] w-full px-6 md:px-[10%] py-12 flex flex-col gap-8">
          <div className="text-center flex items-center justify-center lg:justify-start relative leading-[1.3] text-5xl text-yellow-400 mt-10 lg:mt-20">
            Learning Resources
          </div>
          <LearningResources />
        </div>
        <div className="relative z-[2] mt-10 lg:mt-10 w-full px-6 md:px-[10%] py-12 flex flex-col gap-8">
          <div className="text-center flex items-center justify-center lg:justify-start relative leading-[1.3] text-5xl text-yellow-400">
            Community
          </div>
          <Community />
        </div>
        <div className="relative z-[2] w-full px-6 md:px-[10%] py-12 flex flex-col gap-8">
          <div className="text-center flex items-center justify-center lg:justify-start relative leading-[1.3] text-5xl text-yellow-400">
            Collaboration & Sponsorship
          </div>
          <Sponsors />
        </div>
      </div>
    </Layout>
  );
}
