import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { downloadBlob } from "@/lib/toolUtils";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, SunMedium } from "lucide-react";
import { useState } from "react";

export default function ImageBrightness() {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [result, setResult] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setResult(null);
    setImgSrc(URL.createObjectURL(file));
  };

  const applyFilter = () => {
    if (!imgSrc) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
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
      .then((blob) => downloadBlob(blob, `adjusted_${fileName}`));
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
        <SunMedium className="w-10 h-10 text-amber" />
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber to-teal bg-clip-text text-transparent">
            Brightness & Contrast
          </h1>
          <p className="text-muted-foreground">
            Adjust image brightness and contrast
          </p>
        </div>
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
              id="bright-input"
            />
            <Button
              onClick={() => document.getElementById("bright-input")?.click()}
              className="w-full bg-gradient-to-r from-amber to-teal"
              data-ocid="brightness.upload_button"
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
                <Label>Brightness</Label>
                <span className="text-sm text-teal">{brightness}%</span>
              </div>
              <Slider
                value={[brightness]}
                onValueChange={(v) => setBrightness(v[0])}
                min={0}
                max={200}
                step={5}
                data-ocid="brightness.input"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label>Contrast</Label>
                <span className="text-sm text-teal">{contrast}%</span>
              </div>
              <Slider
                value={[contrast]}
                onValueChange={(v) => setContrast(v[0])}
                min={0}
                max={200}
                step={5}
              />
            </div>
            {imgSrc && (
              <Button
                onClick={applyFilter}
                className="w-full bg-gradient-to-r from-amber to-teal"
                data-ocid="brightness.primary_button"
              >
                Apply Adjustments
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
                  alt="Adjusted"
                  className="w-full object-contain rounded"
                />
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="w-full"
                  data-ocid="brightness.secondary_button"
                >
                  Download
                </Button>
              </>
            ) : (
              <p className="text-muted-foreground text-sm">
                Adjusted image will appear here
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
