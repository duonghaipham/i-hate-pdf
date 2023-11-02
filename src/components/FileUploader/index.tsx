type FileObject = {
  id: string;
  name: string;
  object: string;
};

interface FileUploaderProps {
  title: string;
  detail: string;
  isMultiple?: boolean;
  onFilesSelected?: (files: FileObject[]) => void;
}

export default function FileUploader({
  title,
  detail,
  isMultiple = false,
  onFilesSelected,
}: FileUploaderProps) {
  const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFiles = e.target.files;
    if (rawFiles) {
      const files = Array.from(rawFiles).map((file) => ({
        id: file.lastModified.toString(),
        name: file.name,
        object: URL.createObjectURL(file),
      }));
      onFilesSelected && onFilesSelected(files);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-12">
        <h1 className="mb-2 font-semibold text-center">{title}</h1>
        <p className="text-center text-xl">{detail}</p>
      </div>
      <input
        id="fileInput"
        type="file"
        multiple={isMultiple}
        onChange={handleInputFileChange}
        className="hidden"
      />
      <label
        htmlFor="fileInput"
        className="px-12 py-6 rounded-md shadow-md bg-emerald-700 font-semibold text-2xl text-white hover:bg-emerald-800 cursor-pointer"
      >
        Select PDF files
      </label>
    </div>
  );
}
