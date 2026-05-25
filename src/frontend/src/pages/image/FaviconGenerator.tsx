import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { downloadBlob } from "@/lib/toolUtils";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const SIZES = [16, 32, 48, 64, 128, 256];

export default function FaviconGenerator() {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [_fileName, setFileName] = useState("");
  const [size, setSize] = useState(32);
  const [result, setResult] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setResult(null);
    setImgSrc(URL.createObjectURL(file));
  };

  const generate = () => {
    if (!imgSrc) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, size, size);
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
      .then((blob) => downloadBlob(blob, `favicon_${size}x${size}.png`));
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
          Favicon Generator
        </h1>
        <p className="text-muted-foreground">
          Generate favicons in standard sizes from any image
        </p>
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
              id="fav-input"
            />
            <Button
              onClick={() => document.getElementById("fav-input")?.click()}
              className="w-full bg-gradient-to-r from-amber to-teal"
              data-ocid="favicon.upload_button"
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
              <Label className="mb-2 block">Output Size</Label>
              <div className="grid grid-cols-3 gap-2">
                {SIZES.map((s) => (
                  <Button
                    key={s}
                    variant={size === s ? "default" : "outline"}
                    onClick={() => setSize(s)}
                    data-ocid={"favicon.primary_button"}
                  >
                    {s}×{s}
                  </Button>
                ))}
              </div>
            </div>
            {imgSrc && (
              <Button
                onClick={generate}
                className="w-full bg-gradient-to-r from-amber to-teal"
              >
                Generate Favicon
              </Button>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              Result ({size}×{size}px)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result ? (
              <>
                <div className="flex items-center justify-center bg-muted rounded p-8">
                  <img
                    src={result}
                    alt="Favicon"
                    style={{ width: size, height: size }}
                  />
                </div>
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="w-full"
                  data-ocid="favicon.secondary_button"
                >
                  Download PNG
                </Button>
              </>
            ) : (
              <p className="text-muted-foreground text-sm">
                Favicon will appear here
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
