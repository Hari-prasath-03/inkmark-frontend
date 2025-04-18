import clsx from "clsx";
import { memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

import useGetMyMdById from "../queries/useGetMyMdById";
import DownloadButton from "../components/download/DownloadButton";

import { LuFileX2 } from "react-icons/lu";
import "../css/Markdown.css";
import { Loader } from "../App";
import Button from "../components/ui/Button";
import { FiEdit } from "react-icons/fi";

const ViewMarkDown = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: md, isLoading } = useGetMyMdById(id || "");

  const handleEdit = () => navigate(`/md/edit/${id}`);

  if (isLoading) return <Loader />;

  if (!md) {
    return (
      <div className="flex flex-col gap-3 items-center justify-center h-screen">
        <LuFileX2 className="size-20 bg-indigo-400 text-stone-50 p-3 rounded" />
        <h1 className="text-5xl text-center font-anek font-semibold text-indigo-400">
          No such file <br /> exists.
        </h1>
      </div>
    );
  }

  return (
    <section className="px-10 py-3 overflow-y-auto font-nuniti relative markdown">
      <span className="text-2xl font-outfit font-semibold">
        {md?.fileName}.md
      </span>
      <Button
        onClick={handleEdit}
        variant="secondary"
        className="absolute right-16 top-3.5 px-1 py-0.5 transition-all duration-150 bg-indigo-500/50 hover:bg-indigo-500 group"
      >
        <FiEdit className="text-white font-bold scale-90" />
        <span className="hidden text-xs ml-2 group-hover:block">Edit</span>
      </Button>
      <DownloadButton mdcontent={md.file} fileName={md.fileName} />
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
                  className={clsx("bg-gray-200 px-1 py-0.5 rounded", className)}
                  {...props}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {md?.file}
        </Markdown>
      </div>
    </section>
  );
};

export default memo(ViewMarkDown);
