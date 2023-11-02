import { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

interface PdfPreviewProps {
  file: string;
  name: string;
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

export default function PdfPreview({ file, name }: PdfPreviewProps) {
  const [numPages, setNumPages] = useState(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="pt-8 pb-4 rounded-md shadow bg-white">
      <div className="mb-3 px-8">
        <Document
          file={file}
          options={options}
          onLoadSuccess={onDocumentLoadSuccess}
          className="border border-gray-300"
        >
          {numPages > 0 && <Page pageNumber={1} width={125} />}
        </Document>
      </div>
      <div className="w-48 px-4 text-sm text-center truncate" title={name}>
        {name}
      </div>
    </div>
  );
}
