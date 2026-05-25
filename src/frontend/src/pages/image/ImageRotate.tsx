import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { downloadBlob } from "@/lib/toolUtils";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, RotateCw } from "lucide-react";
import { useState } from "react";

export default function ImageRotate() {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setResult(null);
    setImgSrc(URL.createObjectURL(file));
  };

  const applyTransform = (angle: number, flipH: boolean, flipV: boolean) => {
    if (!imgSrc) return;
    const img = new Image();
    img.onload = () => {
      const rad = (angle * Math.PI) / 180;
      const sin = Math.abs(Math.sin(rad));
      const cos = Math.abs(Math.cos(rad));
      const newW = Math.round(img.width * cos + img.height * sin);
      const newH = Math.round(img.width * sin + img.height * cos);
      const canvas = document.createElement("canvas");
      canvas.width = newW;
      canvas.height = newH;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.translate(newW / 2, newH / 2);
      ctx.rotate(rad);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      canvas.toBlob((blob) => {
        if (!blob) return;
        setResult(URL.createObjectURL(blob));
      }, "image/png");
    };
    img.src = imgSrc;
  };

  const handleDownload = () => {
    if (!result) return;
    fetch(result)
      .then((r) => r.blob())
      .then((blob) => downloadBlob(blob, `rotated_${fileName}`));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Button
        variant="ghost"
        onClick={() => navigate({ to: "/" })}
        className="mb-6"
        data-ocid="rotate.back_button"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Button>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <RotateCw className="w-10 h-10 text-amber" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber to-teal bg-clip-text text-transparent">
            Image Rotate / Flip
          </h1>
        </div>
        <p className="text-muted-foreground">Rotate and flip images</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
              id="rotate-input"
            />
            <Button
              onClick={() => document.getElementById("rotate-input")?.click()}
              className="w-full bg-gradient-to-r from-amber to-teal"
              data-ocid="rotate.upload_button"
            >
              Choose Image
            </Button>
            {imgSrc && (
              <img
                src={imgSrc}
                alt="Source"
                className="w-full object-contain rounded max-h-48"
              />
            )}
            {imgSrc && (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={() => applyTransform(90, false, false)}
                  data-ocid="rotate.primary_button"
                >
                  Rotate 90°
                </Button>
                <Button
                  variant="outline"
                  onClick={() => applyTransform(180, false, false)}
                >
                  Rotate 180°
                </Button>
                <Button
                  variant="outline"
                  onClick={() => applyTransform(270, false, false)}
                >
                  Rotate 270°
                </Button>
                <Button
                  variant="outline"
                  onClick={() => applyTransform(0, true, false)}
                >
                  Flip Horizontal
                </Button>
                <Button
                  variant="outline"
                  onClick={() => applyTransform(0, false, true)}
                >
                  Flip Vertical
                </Button>
              </div>
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
                  alt="Rotated"
                  className="w-full object-contain rounded"
                />
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="w-full"
                  data-ocid="rotate.secondary_button"
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
