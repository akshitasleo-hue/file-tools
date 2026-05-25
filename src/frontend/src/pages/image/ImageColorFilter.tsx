import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { downloadBlob } from "@/lib/toolUtils";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Palette } from "lucide-react";
import { useState } from "react";

const FILTERS = [
  { value: "sepia", label: "Sepia" },
  { value: "warm", label: "Warm Tint" },
  { value: "cool", label: "Cool Tint" },
  { value: "vintage", label: "Vintage" },
];

export default function ImageColorFilter() {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [filter, setFilter] = useState("sepia");
  const [intensity, setIntensity] = useState(80);
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
      let cssFilter = "";
      const t = intensity / 100;
      switch (filter) {
        case "sepia":
          cssFilter = `sepia(${t})`;
          break;
        case "warm":
          cssFilter = `saturate(${1 + t * 0.5}) hue-rotate(${-t * 20}deg)`;
          break;
        case "cool":
          cssFilter = `saturate(${1 + t * 0.3}) hue-rotate(${t * 30}deg)`;
          break;
        case "vintage":
          cssFilter = `sepia(${t * 0.6}) saturate(${1 - t * 0.3}) contrast(${1 + t * 0.1})`;
          break;
      }
      ctx.filter = cssFilter;
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
      .then((blob) => downloadBlob(blob, `filtered_${fileName}`));
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
        <Palette className="w-10 h-10 text-amber" />
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber to-teal bg-clip-text text-transparent">
            Color Filter
          </h1>
          <p className="text-muted-foreground">
            Apply sepia, warm, cool and vintage filters
          </p>
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
              id="cf-input"
            />
            <Button
              onClick={() => document.getElementById("cf-input")?.click()}
              className="w-full bg-gradient-to-r from-amber to-teal"
              data-ocid="colorfilter.upload_button"
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
              <Label className="mb-2 block">Filter Type</Label>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger data-ocid="colorfilter.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FILTERS.map((f) => (
                    <SelectItem key={f.value} value={f.value}>
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label>Intensity</Label>
                <span className="text-sm text-teal">{intensity}%</span>
              </div>
              <Slider
                value={[intensity]}
                onValueChange={(v) => setIntensity(v[0])}
                min={0}
                max={100}
                step={5}
                data-ocid="colorfilter.input"
              />
            </div>
            {imgSrc && (
              <Button
                onClick={applyFilter}
                className="w-full bg-gradient-to-r from-amber to-teal"
                data-ocid="colorfilter.primary_button"
              >
                Apply Filter
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
                  alt="Filtered"
                  className="w-full object-contain rounded"
                />
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="w-full"
                  data-ocid="colorfilter.secondary_button"
                >
                  Download
                </Button>
              </>
            ) : (
              <p className="text-muted-foreground text-sm">
                Filtered image will appear here
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
