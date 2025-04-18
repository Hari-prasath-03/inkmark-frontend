import React, {
  useRef,
  useState,
  MouseEvent as ReactMouseEvent,
  useEffect,
} from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

import MarkDownInputgroup from "../components/mdEdit&View/MarkDownInputgroup";
import MarkDownTextarea from "../components/mdEdit&View/MarkDownTextarea";
import MarkDownViewer from "../components/mdEdit&View/MarkDownViewer";

import useGetMyMdById from "../queries/useGetMyMdById";
import { debounce } from "../utils";

import { LuFileX2 } from "react-icons/lu";
import useUpdateMd from "../queries/useUpdateMd";
import { Loader } from "../App";

const MarkDownEditorWithId = () => {
  const { id } = useParams();
  const { data: md, isLoading } = useGetMyMdById(id || "");
  const { mutateAsync: updateMd, isPending } = useUpdateMd(id || "");
  const { notify } = useGlobalContext();

  const [editMarkdown, setEditMarkdown] = useState<string>("");
  const [editFileName, setEditFileName] = useState<string>("");

  useEffect(() => {
    if (md) {
      setEditMarkdown(md.file);
      setEditFileName(md.fileName);
    }
  }, [md]);
  console.log(editMarkdown, editFileName);
  console.log(md);

  const [containerWidth, setContainerWidth] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  
  if(isLoading) return <Loader />

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

  const handleUpdateMd = async () => {
    if (!editFileName) {
      notify({ message: "Please enter a file name", type: "warning" });
      return;
    }
    if (editMarkdown.length < 50) {
      notify({ message: "Content is too short", type: "warning" });
      return;
    }

    const editedMd = {
      ...md,
      file: editMarkdown,
      fileName: editFileName,
    };
    await updateMd(editedMd);
  };

  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const startX = e.clientX;
    const container = containerRef.current;

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (container) {
        const deltaX = moveEvent.clientX - startX;
        const containerRect = container.getBoundingClientRect();
        const newWidthPercentage =
          ((startX + deltaX - containerRect.left) / containerRect.width) * 100;
        setContainerWidth(Math.max(20, Math.min(80, newWidthPercentage)));
      }
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const debouncedSetFileName = debounce(setEditFileName, 300);
  const debouncedSetMarkdown = debounce(setEditMarkdown, 300);


  return (
    <React.Fragment>
      <section
        ref={containerRef}
        className="w-full max-h-screen overflow-hidden container"
      >
        <div className="flex relative w-full h-screen">
          <div className="relative" style={{ flexBasis: `${containerWidth}%` }}>
            <MarkDownInputgroup
              className="absolute top-0 left-0"
              value={editFileName}
              setValue={debouncedSetFileName}
              resetValue={() => setEditFileName("")}
            />

            <MarkDownTextarea
              markDown={editMarkdown}
              setMarkdown={debouncedSetMarkdown}
              saveFn={handleUpdateMd}
              isSaving={isPending}
            />
          </div>
          <div
            className="w-1 h-screen bg-indigo-100 active:bg-indigo-500 active:rounded-full cursor-col-resize"
            onMouseDown={handleMouseDown}
          />
          <MarkDownViewer
            className="h-screen custom-scrollbar"
            fileName={editFileName}
            mdcontent={editMarkdown}
            style={{ flexBasis: `${100 - containerWidth}%` }}
          />
        </div>
      </section>
    </React.Fragment>
  );
};

export default MarkDownEditorWithId;
