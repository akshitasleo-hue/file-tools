import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Minimize2 } from "lucide-react";
import { useState } from "react";
import { ExternalBlob } from "../backend";
import DownloadButton from "../components/DownloadButton";
import FileMetadata from "../components/FileMetadata";
import FileUpload from "../components/FileUpload";
import { useUploadFile } from "../hooks/useQueries";

export default function FileCompression() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(80);
  const [compressedBlob, setCompressedBlob] = useState<ExternalBlob | null>(
    null,
  );
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isCompressing, setIsCompressing] = useState(false);

  const uploadMutation = useUploadFile();

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setCompressedBlob(null);
    setOriginalSize(file.size);
    setUploadProgress(0);

    // Upload file
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress(
      (percentage) => {
        setUploadProgress(percentage);
      },
    );

    try {
      const id = await uploadMutation.mutateAsync({
        blob,
        filename: file.name,
      });
      setFileId(id);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleCompress = async () => {
    if (!selectedFile) return;

    setIsCompressing(true);
    try {
      // Client-side compression using canvas
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          async (blob) => {
            if (!blob) return;
            const arrayBuffer = await blob.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            const compressedExternalBlob = ExternalBlob.fromBytes(uint8Array);
            setCompressedBlob(compressedExternalBlob);
            setCompressedSize(blob.size);
            setIsCompressing(false);
          },
          "image/jpeg",
          quality / 100,
        );
      };
      img.src = URL.createObjectURL(selectedFile);
    } catch (error) {
      console.error("Compression failed:", error);
      setIsCompressing(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const reductionPercentage =
    originalSize > 0
      ? ((originalSize - compressedSize) / originalSize) * 100
      : 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Button
        variant="ghost"
        onClick={() => navigate({ to: "/" })}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Button>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <img
            src="/assets/generated/icon-compress.dim_128x128.png"
            alt="Compress"
            className="w-12 h-12"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling?.classList.remove("hidden");
            }}
          />
          <Minimize2 className="w-12 h-12 text-amber hidden" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber to-teal bg-clip-text text-transparent">
            File Compression
          </h1>
        </div>
        <p className="text-muted-foreground">
          Reduce file sizes while maintaining quality
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>
                Select an image file to compress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                onFileSelect={handleFileSelect}
                accept="image/png,image/jpeg,image/webp"
                isUploading={uploadMutation.isPending}
                uploadProgress={uploadProgress}
              />
            </CardContent>
          </Card>

          {selectedFile && (
            <>
              <FileMetadata file={selectedFile} />

              <Card>
                <CardHeader>
                  <CardTitle>Compression Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="quality">Quality</Label>
                      <span className="text-sm font-medium text-teal">
                        {quality}%
                      </span>
                    </div>
                    <Slider
                      id="quality"
                      value={[quality]}
                      onValueChange={(value) => setQuality(value[0])}
                      min={10}
                      max={100}
                      step={5}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Lower quality = smaller file size
                    </p>
                  </div>

                  <Button
                    onClick={handleCompress}
                    disabled={!fileId || isCompressing}
                    className="w-full bg-gradient-to-r from-amber to-teal hover:opacity-90"
                  >
                    {isCompressing ? "Compressing..." : "Compress File"}
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <div className="space-y-6">
          {compressedBlob && selectedFile && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Compression Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">
                        Original Size
                      </p>
                      <p className="text-lg font-semibold">
                        {formatFileSize(originalSize)}
                      </p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">
                        Compressed Size
                      </p>
                      <p className="text-lg font-semibold">
                        {formatFileSize(compressedSize)}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-amber/10 to-teal/10 rounded-lg border-2 border-amber/20">
                    <p className="text-sm text-muted-foreground mb-1">
                      Size Reduction
                    </p>
                    <p className="text-2xl font-bold text-teal">
                      {reductionPercentage.toFixed(1)}%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Saved {formatFileSize(originalSize - compressedSize)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Compressed Image</CardTitle>
                  <CardDescription>Quality: {quality}%</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                    <img
                      src={compressedBlob.getDirectURL()}
                      alt="Compressed preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <DownloadButton
                    blob={compressedBlob}
                    filename={`compressed_${selectedFile.name}`}
                    operation="compress"
                  />
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
