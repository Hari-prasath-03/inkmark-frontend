import { memo } from "react";
import clsx from "clsx";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import DownloadButton from "../download/DownloadButton";
import "../../css/Markdown.css";

interface MarkDownViewerProps {
  className: string;
  mdcontent?: string;
  fileName?: string;
  style: object;
}

const MarkDownViewer: React.FC<MarkDownViewerProps> = memo(
  ({ className, mdcontent, style, fileName }) => {
    return (
      <>
        <section
          className={clsx(
            "px-2.5 py-3 overflow-y-auto *:font-nuniti relative markdown",
            className
          )}
          style={style}
        >
          <DownloadButton mdcontent={mdcontent} fileName={fileName} />
          <div id="mark-down-preview">
            <Markdown
              remarkPlugins={[remarkGfm, remarkEmoji, remarkMath]}
              rehypePlugins={[
                rehypeRaw,
                rehypeSlug,
                rehypeAutolinkHeadings,
                rehypeKatex,
              ]}
              components={{
                code({
                  inline,
                  className,
                  children,
                  ...props
                }: {
                  inline?: boolean;
                  className?: string;
                  children?: React.ReactNode;
                }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      className={clsx(
                        "bg-gray-200 px-1 py-0.5 rounded",
                        className
                      )}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {mdcontent}
            </Markdown>
          </div>
        </section>
      </>
    );
  }
);

export default MarkDownViewer;
