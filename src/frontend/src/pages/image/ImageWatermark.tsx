import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { downloadBlob } from "@/lib/toolUtils";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Type } from "lucide-react";
import { useState } from "react";

export default function ImageWatermark() {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [text, setText] = useState("Watermark");
  const [opacity, setOpacity] = useState(50);
  const [fontSize, setFontSize] = useState(40);
  const [result, setResult] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setResult(null);
    setImgSrc(URL.createObjectURL(file));
  };

  const applyWatermark = () => {
    if (!imgSrc) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.fillStyle = `rgba(255,255,255,${opacity / 100})`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(-Math.PI / 6);
      ctx.fillText(text, 0, 0);
      ctx.restore();
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
      .then((blob) => downloadBlob(blob, `watermarked_${fileName}`));
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
        <Type className="w-10 h-10 text-amber" />
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber to-teal bg-clip-text text-transparent">
            Image Watermark
          </h1>
          <p className="text-muted-foreground">Add text watermark to images</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
              id="wm-input"
            />
            <Button
              onClick={() => document.getElementById("wm-input")?.click()}
              className="w-full bg-gradient-to-r from-amber to-teal"
              data-ocid="watermark.upload_button"
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
              <Label>Watermark Text</Label>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                data-ocid="watermark.input"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <Label>Opacity</Label>
                <span className="text-sm text-teal">{opacity}%</span>
              </div>
              <Slider
                value={[opacity]}
                onValueChange={(v) => setOpacity(v[0])}
                min={10}
                max={100}
                step={5}
              />
            </div>
            <div>
              <div className="flex justify-between">
                <Label>Font Size</Label>
                <span className="text-sm text-teal">{fontSize}px</span>
              </div>
              <Slider
                value={[fontSize]}
                onValueChange={(v) => setFontSize(v[0])}
                min={10}
                max={100}
                step={5}
              />
            </div>
            {imgSrc && (
              <Button
                onClick={applyWatermark}
                className="w-full bg-gradient-to-r from-amber to-teal"
                data-ocid="watermark.primary_button"
              >
                Apply Watermark
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
                  alt="Watermarked"
                  className="w-full object-contain rounded"
                />
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="w-full"
                  data-ocid="watermark.secondary_button"
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
