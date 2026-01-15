import { LearningResources } from "../components/landing-page/LearningResources";
import { Layout } from "../layout/Layout";

export function LearnDSLPage() {
  return (
    <Layout>
      <div className="flex-1 flex flex-col px-6 md:px-[10%] py-5 lg:py-15 pb-20 gap-8">
        <div className="text-4xl font-bold">
          Learn NAIV DSL
        </div>
        <LearningResources />
      </div>
    </Layout>
  );
}
