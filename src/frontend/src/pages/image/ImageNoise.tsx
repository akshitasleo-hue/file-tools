import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { downloadBlob } from "@/lib/toolUtils";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function ImageNoise() {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [noiseLevel, setNoiseLevel] = useState(30);
  const [result, setResult] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setResult(null);
    setImgSrc(URL.createObjectURL(file));
  };

  const applyNoise = () => {
    if (!imgSrc) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < data.data.length; i += 4) {
        const noise = (Math.random() - 0.5) * noiseLevel * 2;
        data.data[i] = Math.max(0, Math.min(255, data.data[i] + noise));
        data.data[i + 1] = Math.max(0, Math.min(255, data.data[i + 1] + noise));
        data.data[i + 2] = Math.max(0, Math.min(255, data.data[i + 2] + noise));
      }
      ctx.putImageData(data, 0, 0);
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
      .then((blob) => downloadBlob(blob, `noisy_${fileName}`));
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
          Image Noise
        </h1>
        <p className="text-muted-foreground">
          Add noise/grain effect to images
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
              id="noise-input"
            />
            <Button
              onClick={() => document.getElementById("noise-input")?.click()}
              className="w-full bg-gradient-to-r from-amber to-teal"
              data-ocid="noise.upload_button"
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
                <Label>Noise Level</Label>
                <span className="text-sm text-teal">{noiseLevel}</span>
              </div>
              <Slider
                value={[noiseLevel]}
                onValueChange={(v) => setNoiseLevel(v[0])}
                min={5}
                max={100}
                step={5}
                data-ocid="noise.input"
              />
            </div>
            {imgSrc && (
              <Button
                onClick={applyNoise}
                className="w-full bg-gradient-to-r from-amber to-teal"
                data-ocid="noise.primary_button"
              >
                Add Noise
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
                  alt="Noisy"
                  className="w-full object-contain rounded"
                />
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="w-full"
                  data-ocid="noise.secondary_button"
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
