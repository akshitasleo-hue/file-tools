import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { copyToClipboard } from "@/lib/toolUtils";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Code } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ImageToBase64() {
  const navigate = useNavigate();
  const [result, setResult] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setResult(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied to clipboard!");
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
        <Code className="w-10 h-10 text-amber" />
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber to-teal bg-clip-text text-transparent">
            Image to Base64
          </h1>
          <p className="text-muted-foreground">
            Convert image files to Base64 data URLs
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
          id="img2b64-input"
        />
        <Button
          onClick={() => document.getElementById("img2b64-input")?.click()}
          className="bg-gradient-to-r from-amber to-teal"
          data-ocid="img2b64.upload_button"
        >
          Choose Image
        </Button>
        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Base64 Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                value={result}
                readOnly
                rows={8}
                className="font-mono text-xs"
                data-ocid="img2b64.textarea"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  data-ocid="img2b64.secondary_button"
                >
                  Copy to Clipboard
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
