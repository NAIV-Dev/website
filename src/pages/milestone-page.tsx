import { Layout } from "../layout/Layout";

export function MilestonePage() {
  const features = [
    [
      'completed',
      'DSL Phase 1: Enum',
      ''
    ],
    [
      'completed',
      'DSL Phase 1: Table',
      ''
    ],
    [
      'completed',
      'DSL Phase 1: Schema',
      ''
    ],
    [
      'completed',
      'DSL Phase 1: API',
      ''
    ],
    [
      'completed',
      'DSL Phase 1: Flow',
      ''
    ],
    [
      'completed',
      'DSL Full Parser Library (Syntax & Semantic)',
      ''
    ],
    [
      'completed',
      'DB Visualization Engine Library',
      ''
    ],
    [
      'completed',
      'VSCode Extension: DB Visualization',
      ''
    ],
    [
      'completed',
      'VSCode Extension: API Preview & Tester',
      ''
    ],
    [
      'completed',
      'VSCode Extension: AI Code Generator',
      'Only support Open Router vendor'
    ],
    [
      'completed',
      'Code Generator: Backend NodeJS',
      'Stub/Scaffolding for backend program NodeJS with Typescript, TypeORM, ExpressJS, Class Validator/Transformer'
    ],
    [
      'completed',
      'Code Generator: Frontend Web',
      'Client SDK for web frontend with Typescript support, uses Axios as http client'
    ],
    [
      'completed',
      'NAIV Official Website'
    ],
    [
      'on-progress',
      'DSL Phase 2: Cron Job',
    ],
    [
      'on-progress',
      'DSL Phase 2: Trigger',
    ],
    [
      'on-progress',
      'Website: Documentation',
    ],
    [
      'on-progress',
      'Website: User Story',
    ],
    [
      'on-progress',
      'Website: Contributors Guide',
    ],
    [
      'planned',
      'DSL Phase 2: Blueprint',
    ],
    [
      'planned',
      'New DB Visualization Method (Graph Drawing Algorithm)',
      'Current existing visualization use "dagre" to layout directed graphs represented by table and relationships'
    ],
    [
      'completed',
      'Free Tier MySQL Database',
      'Give away free limited free tier MySQL database for testing purpose with DB Portal.'
    ],
    [
      'completed',
      'Free Domain Name',
      'Give away free sub-domain *.d.naiv.dev for academic or testing purposes with DNS portal.'
    ],
    [
      'planned',
      'Code Generator: Backend Go Language',
      ''
    ],
    [
      'planned',
      'Code Generator: Backend PHP',
      ''
    ],
    [
      'planned',
      'Code Generator: Backend Rust',
      ''
    ],
    [
      'planned',
      'Code Generator: Backend Python',
      ''
    ],
    [
      'planned',
      'Code Generator: Backend Ruby',
      ''
    ],
    [
      'planned',
      'AI-Stub Completion Model',
      'I think LLMs could fill-in the missing part of stub function (=the implementation code)'
    ],
    [
      'planned',
      'Complete AI Builder for REST API',
      'Can I integrate the stub + AI implementation code? Lets try'
    ],
  ].reverse();
  
  const list_completed = features.filter(f => f[0] === 'completed');
  const list_on_progress = features.filter(f => f[0] === 'on-progress');
  const list_planned = features.filter(f => f[0] === 'planned');

  return (
    <Layout>
      <div className="flex-1 flex flex-col px-6 md:px-[10%] py-5 lg:py-15 pb-20 gap-10">
        <div className="text-4xl font-bold">
          Milestone & Tasks
        </div>
        <div className="flex flex-col gap-7">
          <div className="font-bold text-xl">
            On Progress
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {
              list_on_progress.map(([_, title, description], i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-2">
                  <TimeGlass className="min-w-6 min-h-6 w-6 h-6 mt-[1px]" />
                  <div className="flex flex-col gap-1">
                    <div>
                      {title}
                    </div>
                    <div className="text-sm text-zinc-500">
                      {description}
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="flex flex-col gap-7">
          <div className="font-bold text-xl">
            Planned
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {
              list_planned.map(([_, title, description], i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-2">
                  <Agenda className="min-w-6 min-h-6 w-6 h-6 mt-[1px]" />
                  <div className="flex flex-col gap-1">
                    <div>
                      {title}
                    </div>
                    <div className="text-sm text-zinc-500">
                      {description}
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="flex flex-col gap-7">
          <div className="font-bold text-xl">
            Completed
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {
              list_completed.map(([_, title, description], i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-2">
                  <Check className="min-w-6 min-h-6 w-6 h-6 mt-[1px]" />
                  <div className="flex flex-col gap-1">
                    <div>
                      {title}
                    </div>
                    <div className="text-sm text-zinc-500">
                      {description}
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </Layout>
  );
}

const Check = (props: any) => (
  <svg {...props} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="48" height="48" fill-opacity="0.01"></rect> <path d="M10 24L20 34L40 14" stroke="#00bba7" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
);

const Agenda = (props: any) => (
  <svg {...props} fill="#cad5e2" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>note-line</title> <path d="M28,30H6V8H19.22l2-2H6A2,2,0,0,0,4,8V30a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V15l-2,2Z" className="clr-i-outline clr-i-outline-path-1"></path><path d="M33.53,5.84,30.16,2.47a1.61,1.61,0,0,0-2.28,0L14.17,16.26l-1.11,4.81A1.61,1.61,0,0,0,14.63,23,1.69,1.69,0,0,0,15,23l4.85-1.07L33.53,8.12A1.61,1.61,0,0,0,33.53,5.84ZM18.81,20.08l-3.66.81L16,17.26,26.32,6.87l2.82,2.82ZM30.27,8.56,27.45,5.74,29,4.16,31.84,7Z" className="clr-i-outline clr-i-outline-path-2"></path> <rect x="0" y="0" width="36" height="36" fill-opacity="0"></rect> </g></svg>
)

const TimeGlass = (props: any) => (
  <svg {...props} fill="#00bcff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15,2 C16.5976809,2 17.9036609,3.24891996 17.9949073,4.82372721 L18,5 L18,8 C18,8.26038605 17.8985463,8.50867108 17.7201762,8.69380235 L17.624695,8.78086881 L13.6,12 L17.624695,15.2191312 C17.8619103,15.4089034 18,15.6962163 18,16 L18,19 C18,20.6568542 16.6568542,22 15,22 L9,22 C7.34314575,22 6,20.6568542 6,19 L6,16 C6,15.6962163 6.13808972,15.4089034 6.37530495,15.2191312 L10.399,12 L6.37530495,8.78086881 C6.17197761,8.61820694 6.04147718,8.3838825 6.00834087,8.12894825 L6,8 L6,5 C6,3.40231912 7.24891996,2.09633912 8.82372721,2.00509269 L9,2 L15,2 Z M12,13.281 L8,16.48 L8,19 C8,19.5522847 8.44771525,20 9,20 L15,20 L15.1166211,19.9932723 C15.6139598,19.9355072 16,19.5128358 16,19 L16,16.481 L12,13.281 Z M15,4 L9,4 C8.48716416,4 8.06449284,4.38604019 8.00672773,4.88337887 L8,5 L8,6 L16,6 L16,5 C16,4.52661307 15.6710663,4.13005271 15.2292908,4.02641071 L15.1166211,4.00672773 L15,4 Z"></path> </g></svg>
)
