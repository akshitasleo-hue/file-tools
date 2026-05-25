import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { downloadBlob } from "@/lib/toolUtils";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function ImageSharpen() {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setResult(null);
    setImgSrc(URL.createObjectURL(file));
  };

  const applySharpen = () => {
    if (!imgSrc) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const src = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const dst = ctx.createImageData(canvas.width, canvas.height);
      const w = canvas.width;
      const kernel = [
        0,
        -amount,
        0,
        -amount,
        1 + 4 * amount,
        -amount,
        0,
        -amount,
        0,
      ];
      for (let y = 1; y < canvas.height - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          for (let c = 0; c < 3; c++) {
            const idx = (y * w + x) * 4 + c;
            let sum = 0;
            let ki = 0;
            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                sum +=
                  src.data[((y + dy) * w + (x + dx)) * 4 + c] * kernel[ki++];
              }
            }
            dst.data[idx] = Math.max(0, Math.min(255, sum));
          }
          dst.data[(y * w + x) * 4 + 3] = src.data[(y * w + x) * 4 + 3];
        }
      }
      ctx.putImageData(dst, 0, 0);
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
      .then((blob) => downloadBlob(blob, `sharpened_${fileName}`));
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
          Image Sharpen
        </h1>
        <p className="text-muted-foreground">
          Sharpen images for crisp details
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
              id="sharp-input"
            />
            <Button
              onClick={() => document.getElementById("sharp-input")?.click()}
              className="w-full bg-gradient-to-r from-amber to-teal"
              data-ocid="sharpen.upload_button"
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
            <div>
              <div className="flex justify-between mb-2">
                <Label>Sharpen Amount</Label>
                <span className="text-sm text-teal">{amount}</span>
              </div>
              <Slider
                value={[amount]}
                onValueChange={(v) => setAmount(v[0])}
                min={0.1}
                max={3}
                step={0.1}
                data-ocid="sharpen.input"
              />
            </div>
            {imgSrc && (
              <Button
                onClick={applySharpen}
                className="w-full bg-gradient-to-r from-amber to-teal"
                data-ocid="sharpen.primary_button"
              >
                Sharpen Image
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
                  alt="Sharpened"
                  className="w-full object-contain rounded"
                />
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="w-full"
                  data-ocid="sharpen.secondary_button"
                >
                  Download
                </Button>
              </>
            ) : (
              <p className="text-muted-foreground text-sm">
                Sharpened image will appear here
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
