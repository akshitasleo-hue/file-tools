import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { ExternalBlob } from "../backend";

interface DownloadButtonProps {
  blob: ExternalBlob;
  filename: string;
  operation: "resize" | "convert" | "compress";
}

export default function DownloadButton({
  blob,
  filename,
  operation,
}: DownloadButtonProps) {
  const handleDownload = async () => {
    try {
      const url = blob.getDirectURL();
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      className="w-full bg-gradient-to-r from-teal to-amber hover:opacity-90"
    >
      <Download className="w-4 h-4 mr-2" />
      Download{" "}
      {operation === "resize"
        ? "Resized"
        : operation === "convert"
          ? "Converted"
          : "Compressed"}{" "}
      File
    </Button>
  );
}
