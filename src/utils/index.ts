// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import html2pdf from "html2pdf.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = (fn: (...args: any[]) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

export const formatDateTime = (isoDate: string) => {
  const date = new Date(isoDate);
  const options: object = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedDate;
};

export const exportMarkdown = (
  mdcontent: string,
  fileName?: string,
  closePopup?: () => void
) => {
  if (mdcontent.length < 50) return;

  const file = new Blob([mdcontent], { type: "text/markdown" });
  const element = document.createElement("a");
  element.href = URL.createObjectURL(file);
  element.download = `${fileName || "markdown"}.md`;
  document.body.appendChild(element);
  element.click();

  if (closePopup) closePopup();
};

export const downLoadPdf = (fileName?: string, closePopup?: () => void) => {
  const ele = document.getElementById("mark-down-preview");
  if (!ele) return;

  ele.style.cssText += `
  display: block !important;
  padding: 20px !important;
  width: 800px !important;
  margin: 0 auto !important;
  background: white !important;
`;

  const opt = {
    margin: 0,
    filename: fileName || "file.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    pagebreak: { mode: ["avoid-all", "css", "legacy"] },
  };

  setTimeout(() => {
    html2pdf().set(opt).from(ele).save();
    if (closePopup) closePopup();
  }, 100);

}; 