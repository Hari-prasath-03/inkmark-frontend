import { FC, memo } from "react";
import { MdRestore } from "react-icons/md";

import Button from "../ui/Button";

import { formatDateTime } from "../../utils";
import { md } from "../../types/types";
import { GoTrash } from "react-icons/go";
import useRestoreFromTrash from "../../queries/useRestoreFromTrash";
import useDeleteFromTrash from "../../queries/useDeleteFromTrash";

const FileViewerCard: FC<Omit<md, "file" | "isFavorite">> = ({
  id,
  fileName,
  createdAt,
  deletedAt,
}) => {
  const { mutateAsync: deleteMd, isPending: isDeleting } = useDeleteFromTrash();
  const { mutateAsync: restoreMd, isPending: isRestoring } =
    useRestoreFromTrash();

  return (
    <div
      className="flex flex-col items-center justify-center border border-gray-300 rounded-md p-4 hover-elavate hover:border-indigo-300 relative"
      key={id}
    >
      <span className="fixed font-nuniti text-xs top-2 right-3 bg-black/50 text-neutral-50 rounded-full p-1 px-2.5">
        {Math.max(
          0,
          Math.floor((Number(deletedAt) - Date.now()) / (1000 * 60 * 60 * 24))
        )}
        days
      </span>
      <div className="bg-indigo-400/90 h-16 w-16 flex items-center justify-center rounded shadow-1 cursor-pointer">
        <span className="text-2xl">📄</span>
      </div>
      <h2 className="text-sm font-outfit mt-2 text-center truncate cursor-pointer">
        {fileName}.md
      </h2>
      <p className="text-xs font-anek text-gray-500">
        {formatDateTime(createdAt)}
      </p>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="secondary"
          className="mt-2 font-outfit"
          disabled={isRestoring}
          onClick={() => id && restoreMd(id)}
        >
          <MdRestore className="mr-1.5" />
          {!isRestoring ? "Restore" : "Restoring..."}
        </Button>
        <Button
          size="sm"
          variant="destructive"
          className="mt-2 font-outfit"
          onClick={() => id && deleteMd(id)}
          disabled={isDeleting}
        >
          <GoTrash className="mr-1.5" />
          {!isDeleting ? "Delete" : "Deleting..."}
        </Button>
      </div>
    </div>
  );
};

export default memo(FileViewerCard);
