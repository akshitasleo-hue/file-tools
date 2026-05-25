import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { downloadBlob } from "@/lib/toolUtils";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Crop } from "lucide-react";
import { useRef, useState } from "react";

export default function ImageCrop() {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [cropW, setCropW] = useState(200);
  const [cropH, setCropH] = useState(200);
  const [imgW, setImgW] = useState(0);
  const [imgH, setImgH] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setResult(null);
    const url = URL.createObjectURL(file);
    setImgSrc(url);
    const img = new Image();
    img.onload = () => {
      setImgW(img.width);
      setImgH(img.height);
      setCropW(Math.min(200, img.width));
      setCropH(Math.min(200, img.height));
    };
    img.src = url;
  };

  const handleCrop = () => {
    if (!imgSrc) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = cropW;
      canvas.height = cropH;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, x, y, cropW, cropH, 0, 0, cropW, cropH);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        setResult(url);
      }, "image/png");
    };
    img.src = imgSrc;
  };

  const handleDownload = () => {
    if (!result) return;
    fetch(result)
      .then((r) => r.blob())
      .then((blob) => downloadBlob(blob, `cropped_${fileName}`));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Button
        variant="ghost"
        onClick={() => navigate({ to: "/" })}
        className="mb-6"
        data-ocid="crop.back_button"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Button>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Crop className="w-10 h-10 text-amber" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber to-teal bg-clip-text text-transparent">
            Image Crop
          </h1>
        </div>
        <p className="text-muted-foreground">
          Crop images to specific dimensions
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload & Crop Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
              id="crop-input"
              data-ocid="crop.upload_button"
            />
            <Button
              onClick={() => document.getElementById("crop-input")?.click()}
              className="w-full bg-gradient-to-r from-amber to-teal"
            >
              Choose Image
            </Button>
            {imgSrc && (
              <div className="rounded overflow-hidden max-h-48">
                <img
                  ref={imgRef}
                  src={imgSrc}
                  alt="Source"
                  className="w-full object-contain max-h-48"
                />
              </div>
            )}
            {imgW > 0 && (
              <>
                <p className="text-xs text-muted-foreground">
                  Original: {imgW}×{imgH}px
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>X offset</Label>
                    <Input
                      type="number"
                      value={x}
                      min={0}
                      max={imgW}
                      onChange={(e) => setX(Number(e.target.value))}
                      data-ocid="crop.input"
                    />
                  </div>
                  <div>
                    <Label>Y offset</Label>
                    <Input
                      type="number"
                      value={y}
                      min={0}
                      max={imgH}
                      onChange={(e) => setY(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>Width</Label>
                    <Input
                      type="number"
                      value={cropW}
                      min={1}
                      max={imgW - x}
                      onChange={(e) => setCropW(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>Height</Label>
                    <Input
                      type="number"
                      value={cropH}
                      min={1}
                      max={imgH - y}
                      onChange={(e) => setCropH(Number(e.target.value))}
                    />
                  </div>
                </div>
                <Button
                  onClick={handleCrop}
                  className="w-full bg-gradient-to-r from-amber to-teal"
                  data-ocid="crop.primary_button"
                >
                  Crop Image
                </Button>
              </>
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
                  alt="Cropped"
                  className="w-full object-contain rounded"
                />
                <Button
                  onClick={handleDownload}
                  className="w-full"
                  variant="outline"
                  data-ocid="crop.secondary_button"
                >
                  Download
                </Button>
              </>
            ) : (
              <p className="text-muted-foreground text-sm">
                Cropped image will appear here
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
