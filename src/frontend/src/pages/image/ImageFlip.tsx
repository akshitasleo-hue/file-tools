import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { downloadBlob } from "@/lib/toolUtils";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, FlipHorizontal } from "lucide-react";
import { useState } from "react";

export default function ImageFlip() {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [flipType, setFlipType] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setResult(null);
    setImgSrc(URL.createObjectURL(file));
  };

  const applyFlip = (horizontal: boolean) => {
    if (!imgSrc) return;
    setFlipType(horizontal ? "horizontal" : "vertical");
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.translate(horizontal ? img.width : 0, horizontal ? 0 : img.height);
      ctx.scale(horizontal ? -1 : 1, horizontal ? 1 : -1);
      ctx.drawImage(img, 0, 0);
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
      .then((blob) => downloadBlob(blob, `flipped_${flipType}_${fileName}`));
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
      <div className="mb-8 flex items-center gap-3">
        <FlipHorizontal className="w-10 h-10 text-amber" />
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber to-teal bg-clip-text text-transparent">
            Image Flip
          </h1>
          <p className="text-muted-foreground">
            Flip images horizontally or vertically
          </p>
        </div>
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
              id="flip-input"
            />
            <Button
              onClick={() => document.getElementById("flip-input")?.click()}
              className="w-full bg-gradient-to-r from-amber to-teal"
              data-ocid="flip.upload_button"
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
                  onClick={() => applyFlip(true)}
                  data-ocid="flip.primary_button"
                >
                  Flip Horizontal
                </Button>
                <Button variant="outline" onClick={() => applyFlip(false)}>
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
                  alt="Flipped"
                  className="w-full object-contain rounded"
                />
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="w-full"
                  data-ocid="flip.secondary_button"
                >
                  Download
                </Button>
              </>
            ) : (
              <p className="text-muted-foreground text-sm">
                Flipped image will appear here
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
