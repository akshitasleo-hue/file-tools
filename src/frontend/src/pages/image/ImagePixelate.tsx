import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { downloadBlob } from "@/lib/toolUtils";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function ImagePixelate() {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [pixelSize, setPixelSize] = useState(10);
  const [result, setResult] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setResult(null);
    setImgSrc(URL.createObjectURL(file));
  };

  const applyPixelate = () => {
    if (!imgSrc) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.imageSmoothingEnabled = false;
      const w = img.width;
      const h = img.height;
      const p = pixelSize;
      ctx.drawImage(img, 0, 0, Math.max(1, w / p), Math.max(1, h / p));
      ctx.drawImage(
        canvas,
        0,
        0,
        Math.max(1, w / p),
        Math.max(1, h / p),
        0,
        0,
        w,
        h,
      );
      canvas.toBlob((blob) => {
        if (blob) setResult(URL.createObjectURL(blob));
      }, "image/png");
    };
    img.src = imgSrc;
  };

  const handleDownload = () => {
    if (!result) return;
    fetch(result)
      .then((r) => r.blob())
      .then((blob) => downloadBlob(blob, `pixelated_${fileName}`));
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
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber to-teal bg-clip-text text-transparent mb-2">
          Image Pixelate
        </h1>
        <p className="text-muted-foreground">
          Apply pixelation effect to images
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
              id="pixel-input"
            />
            <Button
              onClick={() => document.getElementById("pixel-input")?.click()}
              className="w-full bg-gradient-to-r from-amber to-teal"
              data-ocid="pixelate.upload_button"
            >
              Choose Image
            </Button>
            {imgSrc && (
              <img
                src={imgSrc}
                alt="Source"
                className="w-full object-contain rounded max-h-40"
              />
            )}
            <div>
              <div className="flex justify-between mb-2">
                <Label>Pixel Size</Label>
                <span className="text-sm text-teal">{pixelSize}px</span>
              </div>
              <Slider
                value={[pixelSize]}
                onValueChange={(v) => setPixelSize(v[0])}
                min={2}
                max={50}
                step={1}
                data-ocid="pixelate.input"
              />
            </div>
            {imgSrc && (
              <Button
                onClick={applyPixelate}
                className="w-full bg-gradient-to-r from-amber to-teal"
                data-ocid="pixelate.primary_button"
              >
                Pixelate Image
              </Button>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result ? (
              <>
                <img
                  src={result}
                  alt="Pixelated"
                  className="w-full object-contain rounded"
                />
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="w-full"
                  data-ocid="pixelate.secondary_button"
                >
                  Download
                </Button>
              </>
            ) : (
              <p className="text-muted-foreground text-sm">
                Result will appear here
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
