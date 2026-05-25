import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, HardDrive, Ruler } from "lucide-react";
import { useEffect, useState } from "react";

interface FileMetadataProps {
  file: File;
}

export default function FileMetadata({ file }: FileMetadataProps) {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (file.type.startsWith("image/")) {
      const img = new Image();
      img.onload = () => {
        setDimensions({ width: img.width, height: img.height });
      };
      img.src = URL.createObjectURL(file);
    }
  }, [file]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>File Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-amber mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">Filename</p>
              <p className="font-medium truncate">{file.name}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <HardDrive className="w-5 h-5 text-teal mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">File Size</p>
              <p className="font-medium">{formatFileSize(file.size)}</p>
            </div>
          </div>

          {dimensions && (
            <div className="flex items-start gap-3">
              <Ruler className="w-5 h-5 text-amber mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Dimensions</p>
                <p className="font-medium">
                  {dimensions.width} × {dimensions.height} px
                </p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-teal mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Last Modified</p>
              <p className="font-medium">
                {formatDate(new Date(file.lastModified))}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
