import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetHistory from "../queries/useGetHistory";
import useDeleteHistory from "../queries/useDeleteHistory";

import Button from "../components/ui/Button";
import { formatDateTime } from "../utils";

import { TbHistoryToggle } from "react-icons/tb";
import { GoTrash } from "react-icons/go";
import useClearHistory from "../queries/useClearHistory";

const History = () => {
  const navigate = useNavigate();
  const [currDel, setCurrDel] = useState<string | null>(null);
  const { data: history } = useGetHistory();
  const { mutateAsync: deleteHistory, isPending } = useDeleteHistory();
  const { mutateAsync: clearHistory, isPending: clearing } = useClearHistory();

  const handleView = (id: number) => navigate(`/md/view/${id}`);

  const historyStatusColorMap = {
    created: "text-green-500",
    deleted: "text-red-400",
    edited: "text-yellow-400",
    restored: "text-blue-400",
  };

  const handleDeleteHistory = async (id: string) => {
    setCurrDel(id);
    await deleteHistory(id);
  };

  return (
    <section className="min-h-screen w-full bg-gray-100 p-4">
      <div className="flex items-center justify-between bg-white p-2 shadow-md h-[58px]">
        <div className="flex items-center">
          <span className="page-title">Mark Track</span>
        </div>
        <div>
          {history && history.length > 0 && (
            <Button
              onClick={async () => await clearHistory()}
              variant="destructive"
              disabled={clearing}
              size="sm"
              className="text-lg"
            >
              <GoTrash className="size-3.5 mr-2" />
              {!clearing ? "Clear history" : "Clearing..."}
            </Button>
          )}
        </div>
      </div>

      <div className="flex mt-4">
        {history && history.length > 0 ? (
          <div className="w-full bg-white shadow-md rounded-md overflow-hidden">
            <div className="grid grid-cols-4 py-2 px-4 font-outfit border-b border-gray-400 text-neutral-800 bg-gray-50">
              <p>File Name</p>
              <p>Status</p>
              <p>Time stamp</p>
              <p className="text-right">Delete history</p>
            </div>

            {history?.map(({ timestamp, action, fileName, id, fileId }, i) => (
              <div
                key={i}
                className="grid grid-cols-4 py-2 px-4 font-nunito border-b border-gray-300 text-neutral-800 items-center text-sm"
              >
                <p
                  onClick={() => handleView(fileId)}
                  className="truncate font-medium underline cursor-pointer"
                >
                  {fileName + ".md"}
                </p>
                <p className={clsx("", historyStatusColorMap[action])}>
                  {action}
                </p>
                <p className="">{formatDateTime(timestamp)}</p>
                <div className="text-right">
                  <Button
                    onClick={() => handleDeleteHistory(id)}
                    disabled={isPending && currDel === id}
                    variant="destructive"
                    size="sm"
                  >
                    <GoTrash className="size-3.5 mr-2" />
                    {isPending && currDel === id ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col gap-2 items-center justify-center py-10 bg-white shadow-md">
            <TbHistoryToggle className="size-14 bg-indigo-400 text-stone-50 p-2 rounded" />
            <h1 className="text-3xl text-center tracking-tight font-outfit text-indigo-400">
              No track record.
            </h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default History;
