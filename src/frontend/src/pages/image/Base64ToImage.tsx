import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { downloadBlob } from "@/lib/toolUtils";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function Base64ToImage() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const handleConvert = () => {
    const trimmed = input.trim();
    if (trimmed.startsWith("data:image")) {
      setImgSrc(trimmed);
    } else {
      setImgSrc(`data:image/png;base64,${trimmed}`);
    }
  };

  const handleDownload = () => {
    if (!imgSrc) return;
    fetch(imgSrc)
      .then((r) => r.blob())
      .then((blob) => downloadBlob(blob, "image_from_base64.png"));
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
          Base64 to Image
        </h1>
        <p className="text-muted-foreground">
          Convert Base64 strings back to images
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Base64 Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label>Paste Base64 string or data URL</Label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={10}
              placeholder="data:image/png;base64,... or raw base64"
              className="font-mono text-xs"
              data-ocid="b642img.textarea"
            />
            <Button
              onClick={handleConvert}
              className="w-full bg-gradient-to-r from-amber to-teal"
              data-ocid="b642img.primary_button"
            >
              Convert to Image
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {imgSrc ? (
              <>
                <img
                  src={imgSrc}
                  alt="Converted"
                  className="w-full object-contain rounded"
                  onError={() => setImgSrc(null)}
                />
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="w-full"
                  data-ocid="b642img.secondary_button"
                >
                  Download
                </Button>
              </>
            ) : (
              <p className="text-muted-foreground text-sm">
                Image will appear here
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
