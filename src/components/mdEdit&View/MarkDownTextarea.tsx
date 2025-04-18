/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  ChangeEvent,
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import Button from "../ui/Button";

import { VscSaveAll } from "react-icons/vsc";
import { debounce } from "../../utils";

interface MarkDownTextareaProps {
  markDown: string | undefined;
  setMarkdown: Dispatch<SetStateAction<string>> | any;
  saveFn: () => void;
  isSaving?: boolean;
}

const MarkDownTextarea: FC<MarkDownTextareaProps> = memo(
  ({ markDown, setMarkdown, saveFn, isSaving }) => {
    const tempRef = useRef<string | undefined>(markDown);

    const debounceUpdate = useCallback(
      debounce((newMarkdown: string) => {
        setMarkdown(newMarkdown);
      }, 300),
      [setMarkdown]
    );

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newMarkdown = e.target.value;
        tempRef.current = newMarkdown;
        debounceUpdate(newMarkdown);
      },
      [debounceUpdate]
    );

    useEffect(() => {
      if (markDown !== tempRef.current) {
        setMarkdown(tempRef.current);
      }
    }, []);

    return (
      <React.Fragment>
        <textarea
          defaultValue={markDown}
          onChange={handleChange}
          name="markdowntext"
          className="h-screen w-full resize-none outline-none font-outfit tracking-wide text-neutral-800 px-1.5 py-3 pt-9 overflow-y-auto custom-scrollbar"
        ></textarea>
        <Button
          variant="secondary"
          size="sm"
          onClick={saveFn}
          disabled={isSaving}
          className="absolute right-5 top-3 px-2 py-2 transition-colors duration-150 bg-indigo-500/50 hover:bg-indigo-500 group"
        >
          <span className="hidden text-xs mr-2 group-hover:block">
            {!isSaving ? "Save" : "Saving..."}
          </span>{" "}
          <VscSaveAll />
        </Button>
      </React.Fragment>
    );
  }
);

export default MarkDownTextarea;
