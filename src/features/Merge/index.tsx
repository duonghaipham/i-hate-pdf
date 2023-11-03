import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import clsx from "clsx";
import { PDFDocument } from "pdf-lib";
import { useState } from "react";
import { HiOutlinePlusCircle, HiOutlineTrash } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { Board, FileUploader, PdfPreview } from "../../components";
import { FileObject, Status } from "../../ts";

export default function Merge() {
  const [files, setFiles] = useState<FileObject[]>([]);
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [status, setStatus] = useState<Status>(Status.Editing);

  const handleFilesSelected = (selectedFiles: FileObject[]) => {
    if (selectedFiles.length === 0) return;

    setFiles(selectedFiles);
    setStatus(Status.Editing);
  };

  const handleAddFilesClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = ".pdf";

    input.addEventListener("change", (e) => {
      const rawFiles = (e.target as HTMLInputElement)?.files;
      if (rawFiles) {
        const files = Array.from(rawFiles).map((file) => ({
          id: file.lastModified.toString(),
          name: file.name,
          object: URL.createObjectURL(file),
        }));
        setFiles((prevFiles) => [...prevFiles, ...files]);
      }
    });

    input.click();
  };

  const handleRemoveFileClick = (id: string) => {
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
        <div className="flex">
          <div className="basis-3/4">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    className="flex flex-wrap gap-4 p-10"
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
                            className={clsx("hover:bg-indigo-200")}
                            style={{
                              position: "relative",
                              userSelect: "none",
                              ...provided.draggableProps.style,
                            }}
                          >
                            <a
                              onClick={() => handleRemoveFileClick(item.id)}
                              className={clsx(
                                "absolute",
                                "top-1",
                                "right-1",
                                "rounded-full",
                                "z-50",
                                "bg-gray-100",
                                "text-gray-800",
                                "hover:cursor-pointer",
                                "hover:text-red-500",
                                "hover:bg-red-100"
                              )}
                            >
                              <HiOutlineTrash />
                            </a>
                            <PdfPreview file={item.object} name={item.name} />
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <a
                onClick={handleAddFilesClick}
                className={clsx(
                  "flex",
                  "flex-col",
                  "justify-center",
                  "items-center",
                  "gap-2",
                  "w-40",
                  "border",
                  "border-dashed",
                  "border-indigo-700",
                  "rounded-md",
                  "text-indigo-700",
                  "text-sm",
                  "font-light",
                  "hover:cursor-pointer",
                  "hover:bg-indigo-200"
                )}
              >
                <HiOutlinePlusCircle size={24} />
                <div>Add more files</div>
              </a>
            </DragDropContext>
          </div>
          <div className="basis-1/4" style={{ height: "calc(100vh - 48px" }}>
            <Board title="Merge PDF" />
          </div>
          {/* <Start onClick={handleMergeClick} /> */}
        </div>
      )}

      {status === Status.Processing && "Processing..."}

      {status === Status.Completed && (
        <Link to={downloadUrl} target="_blank" download>
          Download
        </Link>
      )}
    </>
  );
}
