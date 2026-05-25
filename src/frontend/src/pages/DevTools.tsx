import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { copyToClipboard } from "@/lib/toolUtils";
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

export function JSONFormatter() {
  const [input, setInput] = useState(
    `{"name":"John","age":30,"hobbies":["coding","reading"]}`,
  );
  const [indent, setIndent] = useState(2);
  let result = "";
  let error = "";
  try {
    result = JSON.stringify(JSON.parse(input), null, indent);
  } catch (e: any) {
    error = e.message;
  }
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };
  return (
    <ToolPage title="JSON Formatter" description="Format and prettify JSON">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input JSON</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={12}
              className="font-mono text-sm"
              data-ocid="jsonformat.textarea"
            />
            <div>
              <Label>Indent</Label>
              <Input
                type="number"
                value={indent}
                min={0}
                max={8}
                onChange={(e) => setIndent(Number(e.target.value))}
                className="w-20"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Formatted</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {error && (
              <div className="p-2 bg-destructive/20 text-destructive text-sm rounded">
                {error}
              </div>
            )}
            <Textarea
              value={result}
              readOnly
              rows={12}
              className="font-mono text-sm"
              data-ocid="jsonformat.input"
            />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="jsonformat.secondary_button"
              >
                Copy
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolPage>
  );
}

export function JSONMinifier() {
  const [input, setInput] = useState("");
  let result = "";
  let error = "";
  try {
    if (input.trim()) result = JSON.stringify(JSON.parse(input));
  } catch (e: any) {
    error = e.message;
  }
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };
  return (
    <ToolPage
      title="JSON Minifier"
      description="Minify JSON to reduce file size"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input JSON</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={12}
              className="font-mono text-sm"
              data-ocid="jsonminify.textarea"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              Minified{" "}
              {result && (
                <span className="text-xs text-muted-foreground">
                  ({result.length} chars)
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {error && (
              <div className="p-2 bg-destructive/20 text-destructive text-sm rounded">
                {error}
              </div>
            )}
            <Textarea
              value={result}
              readOnly
              rows={12}
              className="font-mono text-sm"
            />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="jsonminify.secondary_button"
              >
                Copy
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolPage>
  );
}

export function JSONToCSV() {
  const [input, setInput] = useState(
    `[{"name":"Alice","age":25},{"name":"Bob","age":30}]`,
  );
  let result = "";
  let error = "";
  try {
    const data = JSON.parse(input);
    if (!Array.isArray(data) || !data.length)
      throw new Error("Expected JSON array");
    const keys = Object.keys(data[0]);
    result = [
      keys.join(","),
      ...data.map((row: any) =>
        keys.map((k) => JSON.stringify(row[k] ?? "")).join(","),
      ),
    ].join("\n");
  } catch (e: any) {
    error = e.message;
  }
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };
  return (
    <ToolPage
      title="JSON to CSV"
      description="Convert JSON arrays to CSV format"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>JSON Array</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={10}
              className="font-mono text-sm"
              data-ocid="json2csv.textarea"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>CSV Output</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {error && (
              <div className="p-2 bg-destructive/20 text-destructive text-sm rounded">
                {error}
              </div>
            )}
            <Textarea
              value={result}
              readOnly
              rows={10}
              className="font-mono text-sm"
              data-ocid="json2csv.input"
            />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="json2csv.secondary_button"
              >
                Copy
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolPage>
  );
}

export function CSVToJSON() {
  const [input, setInput] = useState("name,age\nAlice,25\nBob,30");
  let result = "";
  let error = "";
  try {
    const lines = input.trim().split("\n");
    const headers = lines[0].split(",").map((h) => h.trim());
    const rows = lines.slice(1).map((line) => {
      const vals = line.split(",");
      return Object.fromEntries(
        headers.map((h, i) => [h, vals[i]?.trim() ?? ""]),
      );
    });
    result = JSON.stringify(rows, null, 2);
  } catch (e: any) {
    error = e.message;
  }
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };
  return (
    <ToolPage title="CSV to JSON" description="Convert CSV data to JSON format">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>CSV Input</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={10}
              className="font-mono text-sm"
              data-ocid="csv2json.textarea"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>JSON Output</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {error && (
              <div className="p-2 bg-destructive/20 text-destructive text-sm rounded">
                {error}
              </div>
            )}
            <Textarea
              value={result}
              readOnly
              rows={10}
              className="font-mono text-sm"
              data-ocid="csv2json.input"
            />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="csv2json.secondary_button"
              >
                Copy
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolPage>
  );
}

export function RegexTester() {
  const [pattern, setPattern] = useState("\\d+");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("Hello 123, World 456!");
  let matches: string[] = [];
  let error = "";
  try {
    const re = new RegExp(pattern, flags);
    matches = text.match(re) || [];
  } catch (e: any) {
    error = e.message;
  }
  const safeRe = (() => {
    try {
      return new RegExp(pattern, flags);
    } catch {
      return /(?!)/;
    }
  })();
  const highlighted = text.replace(
    safeRe,
    (m) => `<mark class="bg-amber/40">${m}</mark>`,
  );
  return (
    <ToolPage
      title="Regex Tester"
      description="Test and debug regular expressions"
    >
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Pattern</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label>Pattern</Label>
                <Input
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  className="font-mono"
                  data-ocid="regex.input"
                />
              </div>
              <div>
                <Label>Flags</Label>
                <Input
                  value={flags}
                  onChange={(e) => setFlags(e.target.value)}
                  className="w-20 font-mono"
                />
              </div>
            </div>
            {error && (
              <div className="p-2 bg-destructive/20 text-destructive text-sm rounded">
                {error}
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Test String</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              data-ocid="regex.textarea"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              Results ({matches.length} match{matches.length !== 1 ? "es" : ""})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div
              className="p-3 bg-muted rounded"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: needed for regex highlight
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
            {matches.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {matches.map((m) => (
                  <Badge key={m} variant="outline" className="font-mono">
                    {m}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolPage>
  );
}

export function UUIDGenerator() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);
  const generate = () => {
    const generated = Array.from({ length: count }, () => {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      });
    });
    setUuids(generated);
  };
  const handleCopy = async () => {
    await copyToClipboard(uuids.join("\n"));
    toast.success("Copied!");
  };
  return (
    <ToolPage
      title="UUID Generator"
      description="Generate random UUID v4 values"
    >
      <Card className="max-w-lg mx-auto">
        <CardContent className="pt-6 space-y-4">
          <div className="flex gap-4 items-end">
            <div>
              <Label>Count</Label>
              <Input
                type="number"
                value={count}
                min={1}
                max={100}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-24"
                data-ocid="uuid.input"
              />
            </div>
            <Button
              onClick={generate}
              className="bg-gradient-to-r from-amber to-teal"
              data-ocid="uuid.primary_button"
            >
              Generate
            </Button>
          </div>
          {uuids.length > 0 && (
            <>
              <div className="space-y-2">
                {uuids.map((id) => (
                  <div
                    key={id}
                    className="p-2 bg-muted rounded font-mono text-sm"
                  >
                    {id}
                  </div>
                ))}
              </div>
              <Button
                onClick={handleCopy}
                variant="outline"
                className="w-full"
                data-ocid="uuid.secondary_button"
              >
                Copy All
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </ToolPage>
  );
}

export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generate = () => {
    const chars = [
      lower ? "abcdefghijklmnopqrstuvwxyz" : "",
      upper ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "",
      numbers ? "0123456789" : "",
      symbols ? "!@#$%^&*()_+-=[]{}|;':,./<>?" : "",
    ].join("");
    if (!chars) {
      toast.error("Select at least one character type");
      return;
    }
    setPassword(
      Array.from(
        { length },
        () => chars[Math.floor(Math.random() * chars.length)],
      ).join(""),
    );
  };

  const handleCopy = async () => {
    await copyToClipboard(password);
    toast.success("Copied!");
  };
  const strength = [lower, upper, numbers, symbols].filter(Boolean).length;
  const strengthLabel = ["Weak", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = [
    "text-destructive",
    "text-destructive",
    "text-amber",
    "text-amber",
    "text-teal",
  ][strength];

  return (
    <ToolPage
      title="Password Generator"
      description="Generate strong random passwords"
    >
      <Card className="max-w-lg mx-auto">
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label>Length: {length}</Label>
            <input
              type="range"
              value={length}
              min={4}
              max={128}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full mt-2"
              data-ocid="password.input"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Uppercase A-Z", val: upper, set: setUpper },
              { label: "Lowercase a-z", val: lower, set: setLower },
              { label: "Numbers 0-9", val: numbers, set: setNumbers },
              { label: "Symbols !@#", val: symbols, set: setSymbols },
            ].map((opt) => (
              <label
                key={opt.label}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={opt.val}
                  onChange={(e) => opt.set(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
          <Button
            onClick={generate}
            className="w-full bg-gradient-to-r from-amber to-teal"
            data-ocid="password.primary_button"
          >
            Generate Password
          </Button>
          {password && (
            <>
              <div className="p-3 bg-muted rounded flex items-center justify-between">
                <span className="font-mono text-sm break-all mr-3">
                  {password}
                </span>
                <span
                  className={`text-sm font-bold flex-shrink-0 ${strengthColor}`}
                >
                  {strengthLabel}
                </span>
              </div>
              <Button
                onClick={handleCopy}
                variant="outline"
                className="w-full"
                data-ocid="password.secondary_button"
              >
                Copy Password
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </ToolPage>
  );
}

function parseCron(expr: string) {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return null;
  const [min, hour, dom, month, dow] = parts;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const fmt = (v: string, names?: string[]) =>
    v === "*" ? "every" : names ? names[Number(v) - 1] || v : v;
  return {
    minute: fmt(min),
    hour: fmt(hour),
    dom: fmt(dom),
    month: fmt(month, months),
    dow: fmt(dow, days),
  };
}

export function CRONParser() {
  const [expr, setExpr] = useState("0 9 * * 1-5");
  const parsed = parseCron(expr);
  const presets = [
    { label: "Every minute", value: "* * * * *" },
    { label: "Every hour", value: "0 * * * *" },
    { label: "Daily at 9am", value: "0 9 * * *" },
    { label: "Weekdays 9am", value: "0 9 * * 1-5" },
    { label: "Weekly Sunday", value: "0 0 * * 0" },
    { label: "Monthly 1st", value: "0 0 1 * *" },
  ];
  return (
    <ToolPage
      title="CRON Expression Parser"
      description="Parse and explain CRON expressions"
    >
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label>CRON Expression</Label>
            <Input
              value={expr}
              onChange={(e) => setExpr(e.target.value)}
              className="font-mono text-lg"
              placeholder="* * * * *"
              data-ocid="cron.input"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <Button
                key={p.value}
                variant="outline"
                size="sm"
                onClick={() => setExpr(p.value)}
                data-ocid="cron.primary_button"
              >
                {p.label}
              </Button>
            ))}
          </div>
          {parsed && (
            <div className="grid grid-cols-5 gap-2">
              {[
                { l: "Minute", v: parsed.minute },
                { l: "Hour", v: parsed.hour },
                { l: "Day", v: parsed.dom },
                { l: "Month", v: parsed.month },
                { l: "Weekday", v: parsed.dow },
              ].map((item) => (
                <div key={item.l} className="p-3 bg-muted rounded text-center">
                  <p className="text-xs text-muted-foreground">{item.l}</p>
                  <p className="font-bold text-sm text-teal">{item.v}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </ToolPage>
  );
}

const HTTP_CODES = [
  { code: 200, text: "OK", cat: "2xx" },
  { code: 201, text: "Created", cat: "2xx" },
  { code: 204, text: "No Content", cat: "2xx" },
  { code: 301, text: "Moved Permanently", cat: "3xx" },
  { code: 302, text: "Found", cat: "3xx" },
  { code: 304, text: "Not Modified", cat: "3xx" },
  { code: 400, text: "Bad Request", cat: "4xx" },
  { code: 401, text: "Unauthorized", cat: "4xx" },
  { code: 403, text: "Forbidden", cat: "4xx" },
  { code: 404, text: "Not Found", cat: "4xx" },
  { code: 409, text: "Conflict", cat: "4xx" },
  { code: 422, text: "Unprocessable Entity", cat: "4xx" },
  { code: 429, text: "Too Many Requests", cat: "4xx" },
  { code: 500, text: "Internal Server Error", cat: "5xx" },
  { code: 502, text: "Bad Gateway", cat: "5xx" },
  { code: 503, text: "Service Unavailable", cat: "5xx" },
  { code: 504, text: "Gateway Timeout", cat: "5xx" },
];
export function HTTPStatus() {
  const [search, setSearch] = useState("");
  const filtered = HTTP_CODES.filter(
    (c) =>
      String(c.code).includes(search) ||
      c.text.toLowerCase().includes(search.toLowerCase()),
  );
  const catColor = (cat: string) =>
    cat === "2xx"
      ? "bg-teal/20 text-teal"
      : cat === "3xx"
        ? "bg-amber/20 text-amber"
        : cat === "4xx"
          ? "bg-amber/20 text-amber"
          : "bg-destructive/20 text-destructive";
  return (
    <ToolPage
      title="HTTP Status Codes"
      description="Reference for HTTP status codes"
    >
      <Card>
        <CardContent className="pt-6 space-y-4">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by code or name..."
            data-ocid="httpstatus.search_input"
          />
          <div className="space-y-2">
            {filtered.map((c) => (
              <div
                key={c.code}
                className="flex items-center gap-3 p-3 bg-muted rounded"
              >
                <span
                  className={`font-bold font-mono px-2 py-1 rounded ${catColor(c.cat)}`}
                >
                  {c.code}
                </span>
                <span>{c.text}</span>
                <Badge variant="outline" className="ml-auto">
                  {c.cat}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </ToolPage>
  );
}

function renderMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3 class='text-lg font-bold mt-4 mb-2'>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2 class='text-xl font-bold mt-6 mb-3'>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1 class='text-2xl font-bold mt-6 mb-4'>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(
      /`(.+?)`/g,
      "<code class='bg-muted px-1 rounded font-mono text-sm'>$1</code>",
    )
    .replace(/^- (.+)$/gm, "<li class='ml-4 list-disc'>$1</li>")
    .replace(/^\d+\. (.+)$/gm, "<li class='ml-4 list-decimal'>$1</li>")
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      "<a href='$2' class='text-teal underline' target='_blank'>$1</a>",
    )
    .replace(/\n\n/g, "</p><p class='mb-3'>");
}

export function MarkdownPreviewer() {
  const [md, setMd] = useState(
    "# Hello World\n\nThis is **bold** and *italic* text.\n\n## Features\n- Lists work\n- `code` snippets\n\nVisit [example.com](https://example.com)",
  );
  const html = renderMarkdown(md);
  return (
    <ToolPage
      title="Markdown Previewer"
      description="Preview Markdown in real-time"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Markdown</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={md}
              onChange={(e) => setMd(e.target.value)}
              rows={20}
              className="font-mono text-sm"
              data-ocid="markdown.textarea"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="prose dark:prose-invert max-w-none"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: needed for markdown render
              dangerouslySetInnerHTML={{
                __html: `<p class='mb-3'>${html}</p>`,
              }}
            />
          </CardContent>
        </Card>
      </div>
    </ToolPage>
  );
}

function formatHTML(html: string): string {
  let indent = 0;
  return html
    .replace(/>\s*</g, ">\n<")
    .split("\n")
    .map((rawLine) => {
      const line = rawLine.trim();
      if (!line) return "";
      if (line.match(/^<\//)) indent--;
      const result = "  ".repeat(Math.max(0, indent)) + line;
      if (line.match(/^<[^/!]/) && !line.match(/\/>$/) && !line.match(/<\//))
        indent++;
      return result;
    })
    .filter(Boolean)
    .join("\n");
}

export function HTMLFormatter() {
  const [input, setInput] = useState("<div><h1>Hello</h1><p>World</p></div>");
  const result = formatHTML(input);
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };
  return (
    <ToolPage
      title="HTML Formatter"
      description="Format and beautify HTML code"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input HTML</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={12}
              className="font-mono text-sm"
              data-ocid="htmlformat.textarea"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Formatted</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={result}
              readOnly
              rows={12}
              className="font-mono text-sm"
              data-ocid="htmlformat.input"
            />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="htmlformat.secondary_button"
              >
                Copy
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolPage>
  );
}

function formatCSS(css: string): string {
  return css
    .replace(/\{/g, " {\n  ")
    .replace(/;/g, ";\n  ")
    .replace(/\}/g, "\n}\n")
    .replace(/,([^\n])/g, ",\n")
    .replace(/ {2}\n}/g, "\n}")
    .split("\n")
    .map((l) => l.trimEnd())
    .join("\n");
}

export function CSSFormatter() {
  const [input, setInput] = useState(
    "body{margin:0;padding:0;font-family:sans-serif;}.container{width:100%;max-width:1200px;}",
  );
  const result = formatCSS(input);
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };
  return (
    <ToolPage title="CSS Formatter" description="Format and beautify CSS code">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input CSS</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={12}
              className="font-mono text-sm"
              data-ocid="cssformat.textarea"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Formatted</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={result}
              readOnly
              rows={12}
              className="font-mono text-sm"
              data-ocid="cssformat.input"
            />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="cssformat.secondary_button"
              >
                Copy
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolPage>
  );
}

export function JSFormatter() {
  const [input, setInput] = useState(
    "function hello(name){return 'Hello '+name;}const arr=[1,2,3].map(x=>x*2);",
  );
  const result = input
    .replace(/;\s*/g, ";\n")
    .replace(/\{\s*/g, " {\n  ")
    .replace(/\}\s*/g, "\n}\n")
    .split("\n")
    .map((l) => l.trimEnd())
    .filter((l) => l.trim())
    .join("\n");
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };
  return (
    <ToolPage
      title="JavaScript Formatter"
      description="Format and beautify JavaScript code"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input JS</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={12}
              className="font-mono text-sm"
              data-ocid="jsformat.textarea"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Formatted</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={result}
              readOnly
              rows={12}
              className="font-mono text-sm"
            />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="jsformat.secondary_button"
              >
                Copy
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolPage>
  );
}

export function SQLFormatter() {
  const [input, setInput] = useState(
    "SELECT u.id, u.name, o.total FROM users u INNER JOIN orders o ON u.id = o.user_id WHERE u.active = 1 ORDER BY o.total DESC LIMIT 10;",
  );
  const KEYWORDS = [
    "SELECT",
    "FROM",
    "WHERE",
    "JOIN",
    "INNER JOIN",
    "LEFT JOIN",
    "RIGHT JOIN",
    "ON",
    "ORDER BY",
    "GROUP BY",
    "HAVING",
    "LIMIT",
    "OFFSET",
    "INSERT INTO",
    "VALUES",
    "UPDATE",
    "SET",
    "DELETE FROM",
    "AND",
    "OR",
  ];
  let result = input;
  for (const kw of KEYWORDS) {
    result = result.replace(new RegExp(`\\b${kw}\\b`, "gi"), `\n${kw}`);
  }
  result = result.replace(/,\s*/g, ",\n  ").trim();
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };
  return (
    <ToolPage
      title="SQL Formatter"
      description="Format and beautify SQL queries"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input SQL</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={10}
              className="font-mono text-sm"
              data-ocid="sqlformat.textarea"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Formatted</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={result}
              readOnly
              rows={10}
              className="font-mono text-sm"
            />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="sqlformat.secondary_button"
              >
                Copy
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolPage>
  );
}

export function ColorPickerTool() {
  const [color, setColor] = useState("#3b82f6");
  const hex = color;
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  const rgb = `rgb(${r}, ${g}, ${b})`;
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  const l = (max + min) / 2;
  const s =
    max === min
      ? 0
      : l < 0.5
        ? (max - min) / (max + min)
        : (max - min) / (2 - max - min);
  const h =
    max === r / 255
      ? (((g / 255 - b / 255) / (max - min)) * 60 + 360) % 360
      : max === g / 255
        ? ((b / 255 - r / 255) / (max - min)) * 60 + 120
        : ((r / 255 - g / 255) / (max - min)) * 60 + 240;
  const hsl = `hsl(${Math.round(max === min ? 0 : h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  const handleCopy = async (val: string) => {
    await copyToClipboard(val);
    toast.success("Copied!");
  };
  return (
    <ToolPage
      title="Color Picker"
      description="Pick colors and get their values"
    >
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-20 h-20 rounded cursor-pointer border-0"
              data-ocid="colorpicker.input"
            />
            <div className="flex-1">
              <div
                className="w-full h-20 rounded"
                style={{ backgroundColor: color }}
              />
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label: "HEX", value: hex },
              { label: "RGB", value: rgb },
              { label: "HSL", value: hsl },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 p-2 bg-muted rounded"
              >
                <span className="text-xs text-muted-foreground w-10">
                  {item.label}
                </span>
                <span className="font-mono text-sm flex-1">{item.value}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleCopy(item.value)}
                  data-ocid="colorpicker.secondary_button"
                >
                  Copy
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </ToolPage>
  );
}
