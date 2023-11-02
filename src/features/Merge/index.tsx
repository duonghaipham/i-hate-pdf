import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { PDFDocument } from "pdf-lib";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FileUploader, Start } from "../../components";
import { Status } from "../../constants/Status";
import PdfPreview from "../../components/PdfPreview";

export default function Merge() {
  const [files, setFiles] = useState<FileObject[]>([]);
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [status, setStatus] = useState<Status>(Status.FileSelection);

  type FileObject = {
    id: string;
    name: string;
    object: string;
  };

  const handleFilesSelected = (selectedFiles: FileObject[]) => {
    if (selectedFiles.length === 0) return;

    setFiles(selectedFiles);
    setStatus(Status.Editing);
  };

  const handleRemove = (id: string) => {
    const newFiles = files.filter((file) => file.id !== id);
    setFiles(newFiles);
  };

  const handleMergeClick = async () => {
    if (files.length === 0) return;

    try {
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const sourcePdfBytes = await fetch(file.object).then((res) =>
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

      setDownloadUrl(URL.createObjectURL(blob));
      setStatus(Status.Completed);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const newFiles = Array.from(files);
    const [removed] = newFiles.splice(result.source.index, 1);
    newFiles.splice(result.destination.index, 0, removed);

    setFiles(newFiles);
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

      {status === Status.Editing && (
        <>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  className="flex flex-wrap gap-4"
                  {...provided.droppableProps}
                >
                  {files.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: "none",
                            ...provided.draggableProps.style,
                          }}
                        >
                          <button onClick={() => handleRemove(item.id)}>
                            Remove
                          </button>
                          <PdfPreview file={item.object} />
                          {item.name}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <Start onClick={handleMergeClick} />
        </>
      )}

      {status === Status.Completed && (
        <Link to={downloadUrl} target="_blank" download>
          Download
        </Link>
      )}
    </>
  );
}
