import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useState } from "react";
import { ExternalBlob } from "../backend";
import DownloadButton from "../components/DownloadButton";
import FileMetadata from "../components/FileMetadata";
import FileUpload from "../components/FileUpload";
import { useUploadFile } from "../hooks/useQueries";

const formats = [
  { value: "png", label: "PNG", mime: "image/png" },
  { value: "jpeg", label: "JPEG", mime: "image/jpeg" },
  { value: "webp", label: "WebP", mime: "image/webp" },
];

export default function FormatConversion() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [sourceFormat, setSourceFormat] = useState<string>("");
  const [targetFormat, setTargetFormat] = useState<string>("png");
  const [convertedBlob, setConvertedBlob] = useState<ExternalBlob | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isConverting, setIsConverting] = useState(false);

  const uploadMutation = useUploadFile();

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setConvertedBlob(null);
    setUploadProgress(0);

    // Detect source format
    const detectedFormat = file.type.split("/")[1] || "unknown";
    setSourceFormat(detectedFormat);

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

  const handleConvert = async () => {
    if (!selectedFile) return;

    setIsConverting(true);
    try {
      // Client-side format conversion using canvas
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const targetMime =
          formats.find((f) => f.value === targetFormat)?.mime || "image/png";
        canvas.toBlob(
          async (blob) => {
            if (!blob) return;
            const arrayBuffer = await blob.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            const convertedExternalBlob = ExternalBlob.fromBytes(uint8Array);
            setConvertedBlob(convertedExternalBlob);
            setIsConverting(false);
          },
          targetMime,
          0.95,
        );
      };
      img.src = URL.createObjectURL(selectedFile);
    } catch (error) {
      console.error("Conversion failed:", error);
      setIsConverting(false);
    }
  };

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
            src="/assets/generated/icon-convert.dim_128x128.png"
            alt="Convert"
            className="w-12 h-12"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling?.classList.remove("hidden");
            }}
          />
          <RefreshCw className="w-12 h-12 text-teal hidden" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal to-amber bg-clip-text text-transparent">
            Format Conversion
          </h1>
        </div>
        <p className="text-muted-foreground">
          Convert images between PNG, JPEG, and WebP formats
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>Select an image file to convert</CardDescription>
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
                  <CardTitle>Conversion Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Source Format</Label>
                    <div className="mt-2 p-3 bg-muted rounded-lg">
                      <span className="font-medium uppercase">
                        {sourceFormat}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="target-format">Target Format</Label>
                    <Select
                      value={targetFormat}
                      onValueChange={setTargetFormat}
                    >
                      <SelectTrigger id="target-format" className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {formats.map((format) => (
                          <SelectItem key={format.value} value={format.value}>
                            {format.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleConvert}
                    disabled={
                      !fileId || isConverting || sourceFormat === targetFormat
                    }
                    className="w-full bg-gradient-to-r from-teal to-amber hover:opacity-90"
                  >
                    {isConverting ? "Converting..." : "Convert Format"}
                  </Button>

                  {sourceFormat === targetFormat && (
                    <p className="text-sm text-muted-foreground text-center">
                      Source and target formats are the same
                    </p>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <div className="space-y-6">
          {convertedBlob && selectedFile && (
            <Card>
              <CardHeader>
                <CardTitle>Converted Image</CardTitle>
                <CardDescription>
                  Format: {targetFormat.toUpperCase()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  <img
                    src={convertedBlob.getDirectURL()}
                    alt="Converted preview"
                    className="w-full h-full object-contain"
                  />
                </div>
                <DownloadButton
                  blob={convertedBlob}
                  filename={`converted_${selectedFile.name.split(".")[0]}.${targetFormat}`}
                  operation="convert"
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
