import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { File as FileIcon, Upload } from "lucide-react";
import { useCallback, useState } from "react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  isUploading?: boolean;
  uploadProgress?: number;
}

export default function FileUpload({
  onFileSelect,
  accept = "*",
  isUploading = false,
  uploadProgress = 0,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        setSelectedFileName(file.name);
        onFileSelect(file);
      }
    },
    [onFileSelect],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        setSelectedFileName(file.name);
        onFileSelect(file);
      }
    },
    [onFileSelect],
  );

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
          isDragging
            ? "border-amber bg-amber/5 scale-105"
            : "border-border hover:border-teal hover:bg-teal/5"
        }`}
      >
        <input
          type="file"
          id="file-input"
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
          disabled={isUploading}
        />

        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber/20 to-teal/20 flex items-center justify-center">
            <Upload className="w-8 h-8 text-amber" />
          </div>

          <div>
            <p className="text-lg font-medium mb-1">
              {isDragging ? "Drop file here" : "Drag & drop your file"}
            </p>
            <p className="text-sm text-muted-foreground">or</p>
          </div>

          <Button
            type="button"
            onClick={() => document.getElementById("file-input")?.click()}
            disabled={isUploading}
            className="bg-gradient-to-r from-amber to-teal hover:opacity-90"
          >
            Browse Files
          </Button>
        </div>
      </div>

      {selectedFileName && (
        <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
          <FileIcon className="w-5 h-5 text-teal" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{selectedFileName}</p>
            {isUploading && (
              <div className="mt-2">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {uploadProgress}% uploaded
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
