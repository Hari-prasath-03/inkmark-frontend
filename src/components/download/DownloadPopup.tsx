import { BsFiletypePdf, BsMarkdown } from "react-icons/bs";
import Button from "../ui/Button";

interface DownloadPopupProps {
  downloadMd: () => void;
  downloadPdf: () => void;
}

const DownloadPopup: React.FC<DownloadPopupProps> = ({
  downloadMd,
  downloadPdf,
}) => {
  
  return (
    <div className="bg-neutral-100/90 px-8 py-1.5 rounded shadow-lg space-y-5">
      <p className="text-2xl leading-3">Download your file as</p>
      <div className="flex justify-center gap-5  pb-3.5">
        <Button onClick={downloadPdf} variant="destructive" className="px-6 gap-2 items-center">
          <BsFiletypePdf /> .pdf
        </Button>
        <Button onClick={downloadMd} variant="secondary" className="px-6 gap-2 items-center">
          <BsMarkdown /> .md
        </Button>
      </div>
    </div>
  );
};

export default DownloadPopup;
