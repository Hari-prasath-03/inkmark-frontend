import useGetInTrashMds from "../queries/useGetInTrashMds";

import { FcEmptyTrash } from "react-icons/fc";
import TrashViewCard from "../components/ui/TrashViewCard";
import Button from "../components/ui/Button";

import { md } from "../types/types";
import { GoTrash } from "react-icons/go";
import useClearTrashMds from "../queries/useClearTrashMds";

const Trash = () => {
  const { data: myTrash } = useGetInTrashMds();
  const { mutateAsync: clearTrash, isPending } = useClearTrashMds();

  return (
    <section className="min-h-screen w-full bg-gray-100 p-4">
      <div className="flex items-center justify-between bg-white p-2 shadow-md h-[58px]">
        <div className="flex items-center">
          <span className="page-title">Trash</span>
        </div>
        {myTrash && myTrash.length > 0 && (
          <Button
            variant="destructive"
            onClick={async () => await clearTrash()}
            disabled={isPending}
          >
            <GoTrash className="mr-2" />
            {!isPending ? "Clear bin" : "Clearing..."}
          </Button>
        )}
      </div>

      <div className="flex mt-4">
        {myTrash && myTrash.length > 0 ? (
          <div className="w-full bg-white p-4 grid grid-cols-4 gap-4 shadow-md">
            {myTrash?.map(({ id, fileName, createdAt, deletedAt }: md) => (
              <TrashViewCard
                key={id}
                id={id}
                fileName={fileName}
                createdAt={createdAt}
                deletedAt={deletedAt}
              />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col gap-2 items-center justify-center py-10 bg-white shadow-md">
            <FcEmptyTrash className="size-14 bg-indigo-400 text-stone-50 p-2 rounded" />
            <h1 className="text-3xl text-center tracking-tight font-outfit text-indigo-400">
              Trash is Empty.
            </h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default Trash;
