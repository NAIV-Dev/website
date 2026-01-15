import { useEffect, useState } from 'react'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import rehypeFormat from 'rehype-format'
import remarkRehype from 'remark-rehype'
import rehypePrettyCode from "rehype-pretty-code";
import {unified} from 'unified'
import '../styles-markdown/github-dark.css';

interface MDViewerProps {
  data: string
}

export function MDViewer(props: MDViewerProps) {
  const [data, setData] = useState<string>('');

  useEffect(() => {
    unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(remarkGfm)
      .use(rehypeFormat)
      .use(rehypePrettyCode)
      .use(rehypeStringify)
      .process(props.data)
      .then(file => {
        const out = String(file)
          .replace(/<table>/g, '<div class="md-table-wrapper"><table>')
          .replace(/<\/table>/g, '</table></div>')
        console.log(out);
        setData(out);
      });
  }, [props.data]);

  return (
    <div className={`w-full`}>
      <div className={`markdown-body w-full flex flex-col gap-[12px]`} dangerouslySetInnerHTML={{ __html: data }} />
    </div>
  );
}
