import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import useAddAndRemoveFav from "../../queries/useAddAndRemoveFav";

import Button from "../ui/Button";

import { formatDateTime } from "../../utils";
import { md } from "../../types/types";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import useMoveToTrashMd from "../../queries/useMoveToTrashMd";
import { BiEdit, BiTrash } from "react-icons/bi";

const FileViewerCard: FC<Omit<md, "file">> = ({
  id,
  fileName,
  createdAt,
  isFavorite,
}) => {
  const { mutateAsync: deleteMd, isPending } = useMoveToTrashMd();
  const { mutate: favUpdate } = useAddAndRemoveFav();
  const navigate = useNavigate();

  const handleEdit = () => navigate(`/md/edit/${id}`);
  const handleView = () => navigate(`/md/view/${id}`);

  const handleFav = () => {
    favUpdate(id || "");
  };

  return (
    <div
      className="flex flex-col items-center justify-center border border-gray-300 rounded-md p-4 hover-elavate hover:border-indigo-300 relative"
      key={id}
    >
      <button onClick={handleFav} className="fixed top-2 right-2">
        {isFavorite ? (
          <FaStar className="cursor-pointer size-6 text-indigo-400" />
        ) : (
          <CiStar className="cursor-pointer size-6 text-indigo-600" />
        )}
      </button>
      <div
        onClick={handleView}
        className="bg-indigo-400/90 h-16 w-16 flex items-center justify-center rounded shadow-1 cursor-pointer"
      >
        <span className="text-2xl">📄</span>
      </div>
      <h2
        onClick={handleView}
        className="text-sm font-outfit mt-2 text-center truncate cursor-pointer"
      >
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
          onClick={handleEdit}
        >
          <BiEdit className="mr-1" /> Edit
        </Button>
        <Button
          size="sm"
          variant="destructive"
          className="mt-2 font-outfit"
          onClick={() => id && deleteMd(id)}
          disabled={isPending}
        >
          <BiTrash className="mr-1" />
          {!isPending ? "Move to trash" : "Moving..."}
        </Button>
      </div>
    </div>
  );
};

export default memo(FileViewerCard);
