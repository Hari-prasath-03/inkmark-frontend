import React from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import usePopupBackDrop from "../../hooks/usePopupBackdrop";
import Button from "../ui/Button";
import { LuDownload } from "react-icons/lu";
import DownloadPopup from "./DownloadPopup";
import { downLoadPdf, exportMarkdown } from "../../utils";

interface DownloadButton {
  mdcontent?: string;
  fileName?: string;
}

const DownloadButton: React.FC<DownloadButton> = ({ mdcontent, fileName }) => {
  const { notify } = useGlobalContext();

  const { BackDrop, openPopup, closePopup } = usePopupBackDrop({
    showCloseBtn: false,
    closeWithBackDrop: true,
  });

  const downloadMd = () => {
    if (mdcontent && mdcontent.length > 50) openPopup();
    else notify({ message: "Content is too short", type: "warning" });
  };
  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        className="absolute right-3 top-3 px-2 py-2 transition-all duration-150 bg-indigo-500/50 hover:bg-indigo-500 group"
        onClick={downloadMd}
      >
        <span className="hidden text-xs mr-2 group-hover:block">Download</span>
        <LuDownload className="text-white font-bold" />
      </Button>
      <BackDrop>
        <DownloadPopup
          downloadMd={() =>
            exportMarkdown(mdcontent || "", fileName, closePopup)
          }
          downloadPdf={() => downLoadPdf(fileName, closePopup)}
        />
      </BackDrop>
    </>
  );
};

export default DownloadButton;
