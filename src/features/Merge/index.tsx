import { PDFDocument } from "pdf-lib";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FileUploader, Start } from "../../components";
import { Status } from "../../constants/Status";

export default function Merge() {
  const [urls, setUrls] = useState<string[]>([]);
  const [url, setUrl] = useState<string>("");
  const [status, setStatus] = useState<Status>(Status.FileSelection);

  const handleFilesSelected = (selectedUrls: string[]) => {
    if (selectedUrls.length === 0) return;

    setUrls(selectedUrls);
    setStatus(Status.Processing);
  };

  const handleMergeClick = async () => {
    if (urls.length === 0) return;

    try {
      const pdfDoc = await PDFDocument.create();

      for (const url of urls) {
        const sourcePdfBytes = await fetch(url).then((res) =>
          res.arrayBuffer()
        );
        const sourcePdfDoc = await PDFDocument.load(sourcePdfBytes);
        const sourcePages = await pdfDoc.copyPages(
          sourcePdfDoc,
          sourcePdfDoc.getPageIndices()
        );
        sourcePages.forEach((page) => pdfDoc.addPage(page));
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });

      setUrl(URL.createObjectURL(blob));
      setStatus(Status.Completed);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {status === Status.FileSelection && (
        <div className="p-12">
          <FileUploader
            title="Merge PDF files"
            detail="Help you merge PDF"
            onFilesSelected={handleFilesSelected}
            isMultiple
          />
        </div>
      )}

      {status === Status.Processing && <Start onClick={handleMergeClick} />}

      {status === Status.Completed && (
        <Link to={url} target="_blank" download>
          Download
        </Link>
      )}
    </>
  );
}
