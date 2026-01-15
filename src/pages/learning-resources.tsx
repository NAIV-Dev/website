import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { MDViewer } from "../components/MDViewer";
import { Layout } from "../layout/Layout";
import axios, { type AxiosResponse } from "axios";

export async function loaderLearningResourcesPage(args: LoaderFunctionArgs): Promise<string> {
  try {
    const data: AxiosResponse<string> = await axios.get(`/md/${args.params.slug}.md`, { responseType: 'text' });
    return data.data;
  } catch (err: any) {
    return `\`\`\`\n${err?.response?.data?.toString()}\n\`\`\`\n`;
  }
}

export function LearningResourcesPage() {
  const data: string = useLoaderData();

  return (
    <Layout>
      <div className="flex-1 flex flex-col px-6 md:px-[10%] py-5 lg:py-15 pb-20">
        <MDViewer data={data} />
      </div>
    </Layout>
  );
}
