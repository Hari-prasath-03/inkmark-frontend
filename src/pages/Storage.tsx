import { useState } from "react";
import FileViewerCard from "../components/ui/FileViewerCard";
import useGetMyMds from "../queries/useGetMyMds";

import Search from "../components/ui/Search";
import { md } from "../types/types";

import { LuFileX2 } from "react-icons/lu";

const Storage = () => {
  const { data: myMdFiles } = useGetMyMds();
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.target.value);

  const filteredFiles = myMdFiles?.filter((i: md) =>
    i.fileName.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <section className="min-h-screen w-full bg-gray-100 p-4">
      <div className="flex items-center justify-between bg-white p-2 shadow-md h-[58px]">
        <div className="flex items-center">
          <span className="page-title">Mark Vault</span>
        </div>
        <Search
          value={searchValue}
          handleSearch={handleSearch}
          placeholder="Search files..."
        />
      </div>

      <div className="flex mt-4">
        {filteredFiles && filteredFiles.length > 0 ? (
          <div className="w-full bg-white p-4 grid grid-cols-4 gap-4 shadow-md">
            {filteredFiles?.map(({ id, fileName, createdAt,isFavorite }: md) => (
              <FileViewerCard
                key={id}
                id={id}
                fileName={fileName}
                isFavorite={isFavorite}
                createdAt={createdAt}
              />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col gap-2 items-center justify-center py-10 bg-white shadow-md">
            <LuFileX2 className="size-14 bg-indigo-400 text-stone-50 p-2 rounded" />
            <h1 className="text-3xl text-center tracking-tight font-outfit text-indigo-400">
              No saves here.
            </h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default Storage;
