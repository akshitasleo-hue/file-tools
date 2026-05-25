import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { downloadText, formatBytes } from "@/lib/toolUtils";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function ToolPage({
  title,
  description,
  children,
}: { title: string; description: string; children: React.ReactNode }) {
  const navigate = useNavigate();
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
          {title}
        </h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}

export function FileSizeConverter() {
  const [bytes, setBytes] = useState("1048576");
  const n = Number(bytes);
  const conversions = [
    { label: "Bytes", value: n },
    { label: "Kilobytes (KB)", value: n / 1024 },
    { label: "Megabytes (MB)", value: n / 1024 ** 2 },
    { label: "Gigabytes (GB)", value: n / 1024 ** 3 },
    { label: "Terabytes (TB)", value: n / 1024 ** 4 },
    { label: "Kibibytes (KiB)", value: n / 1024 },
    { label: "Mebibytes (MiB)", value: n / 1024 ** 2 },
    { label: "Bits", value: n * 8 },
    { label: "Kilobits", value: (n * 8) / 1000 },
    { label: "Megabits", value: (n * 8) / 1000 ** 2 },
  ];
  return (
    <ToolPage
      title="File Size Converter"
      description="Convert between different file size units"
    >
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label>Size in Bytes</Label>
            <Input
              type="number"
              value={bytes}
              onChange={(e) => setBytes(e.target.value)}
              className="font-mono"
              data-ocid="filesize.input"
            />
          </div>
          {!Number.isNaN(n) && n > 0 && (
            <div className="space-y-2">
              {conversions.map((c) => (
                <div
                  key={c.label}
                  className="flex justify-between p-2 bg-muted rounded"
                >
                  <span className="text-sm text-muted-foreground">
                    {c.label}
                  </span>
                  <span className="font-mono font-bold text-teal">
                    {c.value < 0.001
                      ? c.value.toExponential(3)
                      : c.value.toLocaleString(undefined, {
                          maximumFractionDigits: 6,
                        })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </ToolPage>
  );
}

const MIME_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  svg: "image/svg+xml",
  webp: "image/webp",
  ico: "image/x-icon",
  pdf: "application/pdf",
  zip: "application/zip",
  tar: "application/x-tar",
  gz: "application/gzip",
  rar: "application/vnd.rar",
  mp3: "audio/mpeg",
  wav: "audio/wav",
  ogg: "audio/ogg",
  mp4: "video/mp4",
  webm: "video/webm",
  avi: "video/x-msvideo",
  txt: "text/plain",
  html: "text/html",
  css: "text/css",
  js: "application/javascript",
  ts: "application/typescript",
  json: "application/json",
  xml: "application/xml",
  csv: "text/csv",
  md: "text/markdown",
  yaml: "text/yaml",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ppt: "application/vnd.ms-powerpoint",
  ttf: "font/ttf",
  woff: "font/woff",
  woff2: "font/woff2",
};

export function MIMETypeChecker() {
  const [filename, setFilename] = useState("document.pdf");
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  const mime = MIME_TYPES[ext] || "application/octet-stream";
  const [file, setFile] = useState<File | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setFilename(f.name);
    }
  };

  return (
    <ToolPage
      title="MIME Type Checker"
      description="Check MIME type from file extension or upload"
    >
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label>Filename</Label>
            <Input
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="example.pdf"
              data-ocid="mime.input"
            />
          </div>
          <div>
            <input
              type="file"
              className="hidden"
              id="mime-input"
              onChange={handleFile}
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById("mime-input")?.click()}
              data-ocid="mime.upload_button"
            >
              Or Upload File
            </Button>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-muted rounded">
              <p className="text-xs text-muted-foreground mb-1">MIME Type</p>
              <p className="font-mono text-lg font-bold text-teal">{mime}</p>
            </div>
            <div className="p-4 bg-muted rounded">
              <p className="text-xs text-muted-foreground mb-1">Extension</p>
              <p className="font-mono text-lg font-bold">.{ext || "unknown"}</p>
            </div>
            {file && (
              <div className="p-4 bg-muted rounded space-y-1">
                <p className="text-xs text-muted-foreground">File Size</p>
                <p className="font-bold">{formatBytes(file.size)}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </ToolPage>
  );
}

export function CSVViewer() {
  const [csv, setCsv] = useState(
    "Name,Age,City\nAlice,25,New York\nBob,30,San Francisco\nCharlie,28,Chicago",
  );
  const [hasHeader, setHasHeader] = useState(true);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCsv(reader.result as string);
    reader.readAsText(file);
  };

  const rows = csv
    .trim()
    .split("\n")
    .map((row) => row.split(",").map((c) => c.trim()));
  const headers = hasHeader ? rows[0] : rows[0]?.map((_, i) => `Col ${i + 1}`);
  const data = hasHeader ? rows.slice(1) : rows;

  return (
    <ToolPage
      title="CSV Viewer"
      description="View and inspect CSV files in a table"
    >
      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex gap-4 items-center">
              <input
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                id="csv-view-input"
                onChange={handleFile}
              />
              <Button
                variant="outline"
                onClick={() =>
                  document.getElementById("csv-view-input")?.click()
                }
                data-ocid="csvviewer.upload_button"
              >
                Upload CSV
              </Button>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={hasHeader}
                  onChange={(e) => setHasHeader(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">First row is header</span>
              </label>
            </div>
            <Textarea
              value={csv}
              onChange={(e) => setCsv(e.target.value)}
              rows={4}
              className="font-mono text-xs"
              data-ocid="csvviewer.textarea"
            />
          </CardContent>
        </Card>
        {rows.length > 0 && headers && (
          <Card>
            <CardHeader>
              <CardTitle>Table View ({data.length} rows)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {headers.map((h) => (
                        <TableHead key={h}>{h}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.slice(0, 100).map((row, i) => (
                      <TableRow // biome-ignore lint/suspicious/noArrayIndexKey: row index
                        key={`row-${i}`}
                        data-ocid={"csvviewer.row"}
                      >
                        {row.map((cell, j) => (
                          <TableCell
                            // biome-ignore lint/suspicious/noArrayIndexKey: cell index
                            key={`cell-${j}`}
                            className="font-mono text-sm"
                          >
                            {cell}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {data.length > 100 && (
                <p className="text-xs text-muted-foreground mt-2">
                  Showing 100 of {data.length} rows
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPage>
  );
}

export function JSONViewer() {
  const [input, setInput] = useState(
    `{"users":[{"name":"Alice","age":25},{"name":"Bob","age":30}],"total":2}`,
  );
  let parsed: any = null;
  let error = "";
  try {
    parsed = JSON.parse(input);
  } catch (e: any) {
    error = e.message;
  }

  const renderValue = (val: any, depth = 0): React.ReactNode => {
    if (val === null)
      return <span className="text-muted-foreground">null</span>;
    if (typeof val === "boolean")
      return <span className="text-amber">{String(val)}</span>;
    if (typeof val === "number")
      return <span className="text-teal">{val}</span>;
    if (typeof val === "string")
      return (
        <span className="text-green-500">
          "<span>{val}</span>"
        </span>
      );
    if (Array.isArray(val)) {
      if (val.length === 0) return <span>[]</span>;
      return (
        <div style={{ marginLeft: depth > 0 ? 16 : 0 }}>
          <span>[</span>
          {val.map((item, i) => (
            <div // biome-ignore lint/suspicious/noArrayIndexKey: JSON array item
              key={`item-${i}`}
              style={{ marginLeft: 16 }}
            >
              {renderValue(item, depth + 1)}
              {i < val.length - 1 ? "," : ""}
            </div>
          ))}
          <span>]</span>
        </div>
      );
    }
    if (typeof val === "object") {
      const keys = Object.keys(val);
      if (keys.length === 0) return <span>{"{}"}</span>;
      return (
        <div style={{ marginLeft: depth > 0 ? 16 : 0 }}>
          <span>{"{"}</span>
          {keys.map((k, i) => (
            <div key={k} style={{ marginLeft: 16 }}>
              <span className="text-blue-400">
                "<span>{k}</span>"
              </span>
              : {renderValue(val[k], depth + 1)}
              {i < keys.length - 1 ? "," : ""}
            </div>
          ))}
          <span>{"}"}</span>
        </div>
      );
    }
    return <span>{String(val)}</span>;
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setInput(reader.result as string);
    reader.readAsText(file);
  };

  return (
    <ToolPage
      title="JSON Viewer"
      description="View and explore JSON with syntax highlighting"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>JSON Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <input
              type="file"
              accept=".json"
              className="hidden"
              id="json-view-input"
              onChange={handleFile}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                document.getElementById("json-view-input")?.click()
              }
              data-ocid="jsonviewer.upload_button"
            >
              Upload JSON
            </Button>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={12}
              className="font-mono text-sm"
              data-ocid="jsonviewer.textarea"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rendered</CardTitle>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="p-2 bg-destructive/20 text-destructive rounded text-sm">
                {error}
              </div>
            ) : parsed !== null ? (
              <div className="font-mono text-sm overflow-auto max-h-96">
                {renderValue(parsed)}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                JSON tree will appear here
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolPage>
  );
}

export function FileMerger() {
  const [files, setFiles] = useState<{ name: string; content: string }[]>([]);
  const [separator, setSeparator] = useState("\n\n--- {filename} ---\n\n");

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    Promise.all(
      selected.map(
        (f) =>
          new Promise<{ name: string; content: string }>((resolve) => {
            const reader = new FileReader();
            reader.onload = () =>
              resolve({ name: f.name, content: reader.result as string });
            reader.readAsText(f);
          }),
      ),
    ).then((results) => setFiles((prev) => [...prev, ...results]));
  };

  const merged = files
    .map((f) => separator.replace("{filename}", f.name) + f.content)
    .join("");

  const handleDownload = () => {
    if (!merged) return;
    downloadText(merged, "merged.txt");
    toast.success("Downloaded!");
  };

  const removeFile = (i: number) =>
    setFiles((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <ToolPage
      title="Text File Merger"
      description="Merge multiple text files into one"
    >
      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <input
              type="file"
              multiple
              accept="text/*,.txt,.md,.csv,.json"
              className="hidden"
              id="merge-input"
              onChange={handleFiles}
            />
            <Button
              onClick={() => document.getElementById("merge-input")?.click()}
              className="bg-gradient-to-r from-amber to-teal"
              data-ocid="filemerger.upload_button"
            >
              Add Files
            </Button>
            <div>
              <Label>File Separator (use {"{filename}"} for filename)</Label>
              <Input
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                className="font-mono text-sm"
                data-ocid="filemerger.input"
              />
            </div>
            {files.length > 0 && (
              <div className="space-y-2">
                {files.map((f, i) => (
                  <div
                    key={`file-${f.name}-${i}`}
                    className="flex items-center gap-2 p-2 bg-muted rounded"
                    data-ocid={`filemerger.item.${i + 1}`}
                  >
                    <span className="flex-1 text-sm font-mono">{f.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {f.content.length} chars
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFile(i)}
                      data-ocid="filemerger.delete_button"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        {merged && (
          <Card>
            <CardHeader>
              <CardTitle>Merged Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                value={merged}
                readOnly
                rows={10}
                className="font-mono text-xs"
              />
              <Button
                onClick={handleDownload}
                className="w-full bg-gradient-to-r from-amber to-teal"
                data-ocid="filemerger.primary_button"
              >
                Download Merged File
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPage>
  );
}
