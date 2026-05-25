import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Maximize2 } from "lucide-react";
import { useState } from "react";
import { ExternalBlob } from "../backend";
import DownloadButton from "../components/DownloadButton";
import FileMetadata from "../components/FileMetadata";
import FileUpload from "../components/FileUpload";
import { useResizeImage, useUploadFile } from "../hooks/useQueries";

const presetSizes = [
  { label: "Thumbnail", width: 100, height: 100 },
  { label: "Small", width: 800, height: 600 },
  { label: "HD", width: 1920, height: 1080 },
  { label: "Square", width: 1000, height: 1000 },
];

export default function ImageResize() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [originalAspect, setOriginalAspect] = useState<number | null>(null);
  const [resizedBlob, setResizedBlob] = useState<ExternalBlob | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadMutation = useUploadFile();
  const resizeMutation = useResizeImage();

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setResizedBlob(null);
    setUploadProgress(0);

    // Get original dimensions
    const img = new Image();
    img.onload = () => {
      const aspect = img.width / img.height;
      setOriginalAspect(aspect);
      setWidth(img.width);
      setHeight(img.height);
    };
    img.src = URL.createObjectURL(file);

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

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (maintainAspect && originalAspect) {
      setHeight(Math.round(newWidth / originalAspect));
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (maintainAspect && originalAspect) {
      setWidth(Math.round(newHeight * originalAspect));
    }
  };

  const handlePresetClick = (presetWidth: number, presetHeight: number) => {
    setWidth(presetWidth);
    setHeight(presetHeight);
  };

  const handleResize = async () => {
    if (!fileId || !selectedFile) return;

    try {
      // Client-side resize using canvas
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          async (blob) => {
            if (!blob) return;
            const arrayBuffer = await blob.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            const resizedExternalBlob = ExternalBlob.fromBytes(uint8Array);
            setResizedBlob(resizedExternalBlob);
          },
          "image/jpeg",
          0.95,
        );
      };
      img.src = URL.createObjectURL(selectedFile);
    } catch (error) {
      console.error("Resize failed:", error);
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
            src="/assets/generated/icon-resize.dim_128x128.png"
            alt="Resize"
            className="w-12 h-12"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling?.classList.remove("hidden");
            }}
          />
          <Maximize2 className="w-12 h-12 text-amber hidden" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber to-teal bg-clip-text text-transparent">
            Image Resize
          </h1>
        </div>
        <p className="text-muted-foreground">
          Resize images to custom or predefined dimensions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>
                Select an image file (PNG, JPEG, WebP)
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
                  <CardTitle>Resize Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="aspect-ratio">Maintain Aspect Ratio</Label>
                    <Switch
                      id="aspect-ratio"
                      checked={maintainAspect}
                      onCheckedChange={setMaintainAspect}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="width">Width (px)</Label>
                      <Input
                        id="width"
                        type="number"
                        value={width}
                        onChange={(e) =>
                          handleWidthChange(Number(e.target.value))
                        }
                        min={1}
                      />
                    </div>
                    <div>
                      <Label htmlFor="height">Height (px)</Label>
                      <Input
                        id="height"
                        type="number"
                        value={height}
                        onChange={(e) =>
                          handleHeightChange(Number(e.target.value))
                        }
                        min={1}
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Preset Sizes</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {presetSizes.map((preset) => (
                        <Button
                          key={preset.label}
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handlePresetClick(preset.width, preset.height)
                          }
                          className="hover:bg-amber/10 hover:border-amber"
                        >
                          {preset.label}
                          <span className="text-xs text-muted-foreground ml-2">
                            {preset.width}×{preset.height}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleResize}
                    disabled={!fileId || resizeMutation.isPending}
                    className="w-full bg-gradient-to-r from-amber to-teal hover:opacity-90"
                  >
                    {resizeMutation.isPending ? "Resizing..." : "Resize Image"}
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <div className="space-y-6">
          {resizedBlob && selectedFile && (
            <Card>
              <CardHeader>
                <CardTitle>Resized Image</CardTitle>
                <CardDescription>
                  New dimensions: {width} × {height}px
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  <img
                    src={resizedBlob.getDirectURL()}
                    alt="Resized preview"
                    className="w-full h-full object-contain"
                  />
                </div>
                <DownloadButton
                  blob={resizedBlob}
                  filename={`resized_${width}x${height}_${selectedFile.name}`}
                  operation="resize"
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
