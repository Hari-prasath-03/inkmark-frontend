import React, { useRef, useState, MouseEvent as ReactMouseEvent } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import useLocalStorage from "../hooks/useLocalStorage";

import MarkDownInputgroup from "../components/mdEdit&View/MarkDownInputgroup";
import MarkDownViewer from "../components/mdEdit&View/MarkDownViewer";

import MarkDownTextarea from "../components/mdEdit&View/MarkDownTextarea";
import { debounce } from "../utils";
import { md } from "../types/types";

import useUploadMd from "../queries/useUploadMd";
import { useAuth } from "../context/AuthContext";
import { useOutletContext } from "react-router-dom";

import { OutletContextType } from "../layouts/RootLayout";

const MarkDownEditor = () => {
  const { notify } = useGlobalContext();
  const { isLoggedIn } = useAuth();
  const { openAuthLay } = useOutletContext<OutletContextType>();
  const { mutateAsync: uploadMd, isPending } = useUploadMd();

  const [markDown, setMarkdown] = useLocalStorage<string>(
    "current-markdown-text",
    "### Create your markdown here!"
  );
  const [fileName, setFileName] = useLocalStorage<string>(
    "current-markdown-filename",
    "untitled"
  );

  const [containerWidth, setContainerWidth] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const upload = async () => {
    if (!isLoggedIn) {
      notify({
        message: "Please login to save files",
        type: "warning",
      });
      setTimeout(() => openAuthLay(), 800);
      return;
    }

    if (!fileName || fileName.trim() === "untitled") {
      notify({ message: "Please enter a file name", type: "warning" });
      return;
    }
    if (markDown.length < 50) {
      notify({ message: "Content is too short", type: "warning" });
      return;
    }

    const markdownData: md = {
      createdAt: new Date().toISOString(),
      fileName: fileName,
      file: markDown,
    };

    await uploadMd(markdownData);

    setTimeout(() => {
      setFileName("");
      setMarkdown("### Create your markdown here!");
    }, 1500);
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

  const debouncedSetMarkdown = debounce(setMarkdown, 300);
  const debouncedSetFileName = debounce(setFileName, 300);

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
              value={fileName}
              setValue={debouncedSetFileName}
              resetValue={() => setFileName("")}
            />

            <MarkDownTextarea
              markDown={markDown}
              setMarkdown={debouncedSetMarkdown}
              saveFn={upload}
              isSaving={isPending}
            />
          </div>
          <div
            className="w-1 h-screen bg-indigo-100 active:bg-indigo-500 active:rounded-full cursor-col-resize"
            onMouseDown={handleMouseDown}
          />
          <MarkDownViewer
            className="h-screen custom-scrollbar"
            mdcontent={markDown}
            fileName={fileName}
            style={{ flexBasis: `${100 - containerWidth}%` }}
          />
        </div>
      </section>
    </React.Fragment>
  );
};

export default MarkDownEditor;
