import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { copyToClipboard, downloadText } from "@/lib/toolUtils";
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

export function WordCounter() {
  const [text, setText] = useState("");
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.trim()
    ? text.split(/[.!?]+/).filter(Boolean).length
    : 0;
  const paragraphs = text.trim()
    ? text.split(/\n\n+/).filter(Boolean).length
    : 0;
  const lines = text ? text.split("\n").length : 0;

  return (
    <ToolPage
      title="Word Counter"
      description="Count words, characters, sentences and more"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input Text</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={12}
              placeholder="Type or paste your text here..."
              data-ocid="wordcounter.textarea"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Words", value: words },
                { label: "Characters", value: chars },
                { label: "Chars (no spaces)", value: charsNoSpaces },
                { label: "Sentences", value: sentences },
                { label: "Paragraphs", value: paragraphs },
                { label: "Lines", value: lines },
              ].map((item) => (
                <div key={item.label} className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-2xl font-bold text-teal">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolPage>
  );
}

export function TextCase() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const convert = (type: string) => {
    let r = "";
    switch (type) {
      case "upper":
        r = text.toUpperCase();
        break;
      case "lower":
        r = text.toLowerCase();
        break;
      case "title":
        r = text.replace(
          /\w\S*/g,
          (w) => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase(),
        );
        break;
      case "camel":
        r = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
        break;
      case "snake":
        r = text.toLowerCase().replace(/\s+/g, "_");
        break;
      case "kebab":
        r = text.toLowerCase().replace(/\s+/g, "-");
        break;
      case "pascal":
        r = text.replace(
          /\w+/g,
          (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
        );
        break;
      case "sentence":
        r = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        break;
    }
    setResult(r);
  };

  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };

  return (
    <ToolPage
      title="Text Case Converter"
      description="Convert text between different case styles"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              placeholder="Enter text to convert..."
              data-ocid="textcase.textarea"
            />
            <div className="grid grid-cols-2 gap-2">
              {[
                "upper",
                "lower",
                "title",
                "camel",
                "snake",
                "kebab",
                "pascal",
                "sentence",
              ].map((type) => (
                <Button
                  key={type}
                  variant="outline"
                  onClick={() => convert(type)}
                  className="capitalize"
                  data-ocid="textcase.primary_button"
                >
                  {type}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={result}
              readOnly
              rows={8}
              data-ocid="textcase.input"
            />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="textcase.secondary_button"
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

export function TextReverse() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"chars" | "words" | "lines">("chars");
  const result =
    mode === "chars"
      ? text.split("").reverse().join("")
      : mode === "words"
        ? text.split(" ").reverse().join(" ")
        : text.split("\n").reverse().join("\n");

  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };

  return (
    <ToolPage
      title="Text Reverser"
      description="Reverse text by characters, words, or lines"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={10}
              placeholder="Enter text to reverse..."
              data-ocid="textreverse.textarea"
            />
            <div className="flex gap-2">
              {(["chars", "words", "lines"] as const).map((m) => (
                <Button
                  key={m}
                  variant={mode === m ? "default" : "outline"}
                  onClick={() => setMode(m)}
                  className="capitalize"
                >
                  {m}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={result}
              readOnly
              rows={10}
              data-ocid="textreverse.input"
            />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="textreverse.secondary_button"
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

export function RemoveDuplicates() {
  const [text, setText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const lines = text.split("\n");
  const seen = new Set<string>();
  const result = lines
    .filter((line) => {
      const key = caseSensitive ? line : line.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .join("\n");
  const removed = lines.length - result.split("\n").length;

  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };

  return (
    <ToolPage
      title="Remove Duplicate Lines"
      description="Remove duplicate lines from text"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={12}
              placeholder="Paste text with duplicate lines..."
              data-ocid="removeduplicates.textarea"
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="case-sen"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                className="w-4 h-4"
              />
              <Label htmlFor="case-sen">Case Sensitive</Label>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              Result{" "}
              {removed > 0 && (
                <span className="text-sm text-muted-foreground ml-2">
                  ({removed} removed)
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={result}
              readOnly
              rows={12}
              data-ocid="removeduplicates.input"
            />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="removeduplicates.secondary_button"
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

export function SortLines() {
  const [text, setText] = useState("");
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const result = text
    .split("\n")
    .sort((a, b) => {
      const aa = caseSensitive ? a : a.toLowerCase();
      const bb = caseSensitive ? b : b.toLowerCase();
      return direction === "asc" ? aa.localeCompare(bb) : bb.localeCompare(aa);
    })
    .join("\n");

  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };

  return (
    <ToolPage
      title="Sort Lines"
      description="Sort lines alphabetically or reverse"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={12}
              placeholder="Enter lines to sort..."
              data-ocid="sortlines.textarea"
            />
            <div className="flex gap-2">
              <Button
                variant={direction === "asc" ? "default" : "outline"}
                onClick={() => setDirection("asc")}
                data-ocid="sortlines.primary_button"
              >
                A→Z
              </Button>
              <Button
                variant={direction === "desc" ? "default" : "outline"}
                onClick={() => setDirection("desc")}
              >
                Z→A
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="case-s"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                className="w-4 h-4"
              />
              <Label htmlFor="case-s">Case Sensitive</Label>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={result}
              readOnly
              rows={12}
              data-ocid="sortlines.input"
            />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="sortlines.secondary_button"
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

export function TextDiff() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  const lines1 = text1.split("\n");
  const lines2 = text2.split("\n");
  const maxLen = Math.max(lines1.length, lines2.length);
  const diffs: Array<{ line: string; status: "same" | "added" | "removed" }> =
    [];
  for (let i = 0; i < maxLen; i++) {
    const l1 = lines1[i] ?? null;
    const l2 = lines2[i] ?? null;
    if (l1 === l2) diffs.push({ line: l1 ?? "", status: "same" });
    else {
      if (l1 !== null) diffs.push({ line: l1, status: "removed" });
      if (l2 !== null) diffs.push({ line: l2, status: "added" });
    }
  }

  return (
    <ToolPage
      title="Text Diff"
      description="Compare two texts and highlight differences"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Text A</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              rows={10}
              placeholder="Original text..."
              data-ocid="textdiff.textarea"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Text B</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              rows={10}
              placeholder="Modified text..."
            />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Differences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-mono text-sm space-y-0.5 max-h-80 overflow-y-auto">
            {diffs.map((d, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: positional diff index
                key={`diff-${i}`}
                className={`px-2 py-0.5 rounded ${
                  d.status === "added"
                    ? "bg-teal/20 text-teal"
                    : d.status === "removed"
                      ? "bg-destructive/20 text-destructive"
                      : ""
                }`}
              >
                {d.status === "added"
                  ? "+ "
                  : d.status === "removed"
                    ? "- "
                    : "  "}
                {d.line}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </ToolPage>
  );
}

export function FindReplace() {
  const [text, setText] = useState("");
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [useRegex, setUseRegex] = useState(false);
  const [result, setResult] = useState("");

  const handleFindReplace = () => {
    try {
      if (useRegex) {
        setResult(text.replace(new RegExp(find, "g"), replace));
      } else {
        setResult(text.split(find).join(replace));
      }
    } catch {
      toast.error("Invalid regex pattern");
    }
  };

  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };

  return (
    <ToolPage
      title="Find and Replace"
      description="Find and replace text patterns"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              placeholder="Enter text..."
              data-ocid="findreplace.textarea"
            />
            <div>
              <Label>Find</Label>
              <Input
                value={find}
                onChange={(e) => setFind(e.target.value)}
                placeholder="Search for..."
                data-ocid="findreplace.input"
              />
            </div>
            <div>
              <Label>Replace</Label>
              <Input
                value={replace}
                onChange={(e) => setReplace(e.target.value)}
                placeholder="Replace with..."
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="use-regex"
                checked={useRegex}
                onChange={(e) => setUseRegex(e.target.checked)}
                className="w-4 h-4"
              />
              <Label htmlFor="use-regex">Use Regex</Label>
            </div>
            <Button
              onClick={handleFindReplace}
              className="w-full bg-gradient-to-r from-amber to-teal"
              data-ocid="findreplace.primary_button"
            >
              Find & Replace
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea value={result} readOnly rows={8} />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="findreplace.secondary_button"
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

export function TextTruncate() {
  const [text, setText] = useState("");
  const [maxLen, setMaxLen] = useState(100);
  const [suffix, setSuffix] = useState("...");
  const result = text.length > maxLen ? text.slice(0, maxLen) + suffix : text;

  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };

  return (
    <ToolPage
      title="Text Truncate"
      description="Truncate text to a maximum length"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={10}
              placeholder="Enter text to truncate..."
              data-ocid="texttruncate.textarea"
            />
            <div>
              <Label>Max Length</Label>
              <Input
                type="number"
                value={maxLen}
                min={1}
                onChange={(e) => setMaxLen(Number(e.target.value))}
                data-ocid="texttruncate.input"
              />
            </div>
            <div>
              <Label>Suffix</Label>
              <Input
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              Result{" "}
              <span className="text-sm text-muted-foreground">
                ({result.length} chars)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea value={result} readOnly rows={10} />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="texttruncate.secondary_button"
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

export function WhitespaceRemover() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("trim");
  const getResult = () => {
    switch (mode) {
      case "trim":
        return text.trim();
      case "all":
        return text.replace(/\s+/g, "");
      case "extra":
        return text.replace(/\s{2,}/g, " ").trim();
      case "lines":
        return text
          .split("\n")
          .map((l) => l.trim())
          .join("\n");
      default:
        return text;
    }
  };
  const result = getResult();
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };

  return (
    <ToolPage
      title="Whitespace Remover"
      description="Remove or clean whitespace from text"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={10}
              placeholder="Enter text..."
              data-ocid="whitespace.textarea"
            />
            <div className="grid grid-cols-2 gap-2">
              {[
                { v: "trim", l: "Trim Edges" },
                { v: "extra", l: "Extra Spaces" },
                { v: "lines", l: "Trim Lines" },
                { v: "all", l: "Remove All" },
              ].map((opt) => (
                <Button
                  key={opt.v}
                  variant={mode === opt.v ? "default" : "outline"}
                  onClick={() => setMode(opt.v)}
                  data-ocid="whitespace.primary_button"
                >
                  {opt.l}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={result}
              readOnly
              rows={10}
              data-ocid="whitespace.input"
            />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="whitespace.secondary_button"
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

export function LineNumbers() {
  const [text, setText] = useState("");
  const [startNum, setStartNum] = useState(1);
  const result = text
    .split("\n")
    .map((line, i) => `${i + startNum}. ${line}`)
    .join("\n");
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };

  return (
    <ToolPage title="Line Number Adder" description="Add line numbers to text">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={12}
              placeholder="Enter text..."
              data-ocid="linenumbers.textarea"
            />
            <div>
              <Label>Start Number</Label>
              <Input
                type="number"
                value={startNum}
                min={0}
                onChange={(e) => setStartNum(Number(e.target.value))}
                data-ocid="linenumbers.input"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea value={result} readOnly rows={12} className="font-mono" />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="linenumbers.secondary_button"
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

export function TextToSlug() {
  const [text, setText] = useState("");
  const result = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };

  return (
    <ToolPage
      title="Text to Slug"
      description="Convert text to URL-friendly slugs"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter title or text..."
              className="text-lg"
              data-ocid="slug.input"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Slug Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-muted rounded font-mono text-teal break-all">
              {result || "slug-will-appear-here"}
            </div>
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="slug.secondary_button"
              >
                Copy Slug
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolPage>
  );
}

export function PalindromeChecker() {
  const [text, setText] = useState("");
  const cleaned = text.toLowerCase().replace(/[^a-z0-9]/g, "");
  const isPalindrome =
    cleaned.length > 0 && cleaned === cleaned.split("").reverse().join("");

  return (
    <ToolPage
      title="Palindrome Checker"
      description="Check if a word or phrase is a palindrome"
    >
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Check Palindrome</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a word or phrase..."
            className="text-lg"
            data-ocid="palindrome.input"
          />
          {text && (
            <div
              className={`p-4 rounded-lg text-center text-xl font-bold ${
                isPalindrome
                  ? "bg-teal/20 text-teal"
                  : "bg-destructive/20 text-destructive"
              }`}
            >
              {isPalindrome ? "✓ Is a Palindrome" : "✗ Not a Palindrome"}
            </div>
          )}
          {text && (
            <p className="text-sm text-muted-foreground">
              Cleaned: <code>{cleaned}</code>
            </p>
          )}
        </CardContent>
      </Card>
    </ToolPage>
  );
}

export function LoremIpsum() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">(
    "paragraphs",
  );
  const words =
    "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident".split(
      " ",
    );

  const genWords = (n: number) => {
    const result: string[] = [];
    for (let i = 0; i < n; i++) result.push(words[i % words.length]);
    return result.join(" ");
  };
  const genSentence = () => `${genWords(8 + Math.floor(Math.random() * 7))}.`;
  const genParagraph = () =>
    Array.from({ length: 4 + Math.floor(Math.random() * 3) }, () =>
      genSentence(),
    ).join(" ");

  const result =
    type === "words"
      ? genWords(count)
      : type === "sentences"
        ? Array.from({ length: count }, () => genSentence()).join(" ")
        : Array.from({ length: count }, () => genParagraph()).join("\n\n");

  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };

  return (
    <ToolPage
      title="Lorem Ipsum Generator"
      description="Generate placeholder lorem ipsum text"
    >
      <Card>
        <CardHeader>
          <CardTitle>Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-end">
            <div>
              <Label>Count</Label>
              <Input
                type="number"
                value={count}
                min={1}
                max={50}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-24"
                data-ocid="lorem.input"
              />
            </div>
            <div className="flex gap-2">
              {(["words", "sentences", "paragraphs"] as const).map((t) => (
                <Button
                  key={t}
                  variant={type === t ? "default" : "outline"}
                  onClick={() => setType(t)}
                  className="capitalize"
                  data-ocid="lorem.primary_button"
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>
          <Textarea
            value={result}
            readOnly
            rows={10}
            data-ocid="lorem.textarea"
          />
          <Button
            onClick={handleCopy}
            variant="outline"
            data-ocid="lorem.secondary_button"
          >
            Copy
          </Button>
        </CardContent>
      </Card>
    </ToolPage>
  );
}

export function TextRepeater() {
  const [text, setText] = useState("");
  const [times, setTimes] = useState(3);
  const [sep, setSep] = useState("\n");
  const result = Array.from({ length: times }, () => text).join(sep);
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };

  return (
    <ToolPage
      title="Text Repeater"
      description="Repeat text a specified number of times"
    >
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Text to Repeat</Label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              placeholder="Enter text..."
              data-ocid="repeater.textarea"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Times</Label>
              <Input
                type="number"
                value={times}
                min={1}
                max={1000}
                onChange={(e) => setTimes(Number(e.target.value))}
                data-ocid="repeater.input"
              />
            </div>
            <div>
              <Label>Separator</Label>
              <Input
                value={sep}
                onChange={(e) => setSep(e.target.value)}
                placeholder="\n or , etc."
              />
            </div>
          </div>
          <Separator />
          <Textarea value={result} readOnly rows={8} />
          {result && (
            <Button
              onClick={handleCopy}
              variant="outline"
              data-ocid="repeater.secondary_button"
            >
              Copy
            </Button>
          )}
        </CardContent>
      </Card>
    </ToolPage>
  );
}

export function ReadingTime() {
  const [text, setText] = useState("");
  const [wpm, setWpm] = useState(200);
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const minutes = Math.ceil(words / wpm);
  const seconds = Math.round((words / wpm) * 60);

  return (
    <ToolPage
      title="Reading Time Estimator"
      description="Estimate how long it takes to read your text"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Text</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={12}
              placeholder="Paste your article or text here..."
              data-ocid="readingtime.textarea"
            />
            <div>
              <Label>Reading Speed (WPM)</Label>
              <Input
                type="number"
                value={wpm}
                min={50}
                max={1000}
                onChange={(e) => setWpm(Number(e.target.value))}
                data-ocid="readingtime.input"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Estimate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-6 text-center bg-gradient-to-br from-amber/10 to-teal/10 rounded-lg">
              <p className="text-6xl font-bold text-teal">{minutes}</p>
              <p className="text-muted-foreground mt-2">
                minute{minutes !== 1 ? "s" : ""} to read
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                ({seconds} seconds)
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-muted rounded">
                <p className="text-xs text-muted-foreground">Words</p>
                <p className="text-xl font-bold">{words}</p>
              </div>
              <div className="p-3 bg-muted rounded">
                <p className="text-xs text-muted-foreground">At {wpm} WPM</p>
                <p className="text-xl font-bold">{wpm}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolPage>
  );
}

export function CharFrequency() {
  const [text, setText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const freq: Record<string, number> = {};
  const normalized = caseSensitive ? text : text.toLowerCase();
  for (const char of normalized) {
    if (char !== " " && char !== "\n") freq[char] = (freq[char] || 0) + 1;
  }
  const sorted = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);
  const maxCount = sorted[0]?.[1] || 1;

  return (
    <ToolPage
      title="Character Frequency"
      description="Analyze character frequency in text"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={12}
              placeholder="Enter text to analyze..."
              data-ocid="charfreq.textarea"
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="case-cf"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                className="w-4 h-4"
              />
              <Label htmlFor="case-cf">Case Sensitive</Label>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top 20 Characters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sorted.map(([char, count]) => (
                <div key={char} className="flex items-center gap-2">
                  <span className="font-mono w-6 text-center bg-muted rounded px-1">
                    {char === " " ? "⎵" : char}
                  </span>
                  <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber to-teal rounded-full"
                      style={{ width: `${(count / maxCount) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8 text-right">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolPage>
  );
}

export function TextWrap() {
  const [text, setText] = useState("");
  const [lineWidth, setLineWidth] = useState(80);
  const result = text
    .split("\n")
    .map((para) => {
      const words = para.split(" ");
      const lines: string[] = [];
      let current = "";
      for (const w of words) {
        if (current.length + w.length + 1 > lineWidth) {
          lines.push(current);
          current = w;
        } else current = current ? `${current} ${w}` : w;
      }
      if (current) lines.push(current);
      return lines.join("\n");
    })
    .join("\n");

  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };

  return (
    <ToolPage
      title="Text Wrap"
      description="Wrap text to a specific line width"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={10}
              placeholder="Enter text to wrap..."
              data-ocid="textwrap.textarea"
            />
            <div>
              <Label>Line Width (characters)</Label>
              <Input
                type="number"
                value={lineWidth}
                min={10}
                max={200}
                onChange={(e) => setLineWidth(Number(e.target.value))}
                data-ocid="textwrap.input"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea value={result} readOnly rows={10} className="font-mono" />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="textwrap.secondary_button"
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

export function ExtractEmails() {
  const [text, setText] = useState("");
  const emailRegex = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;
  const emails = [...new Set(text.match(emailRegex) || [])];
  const result = emails.join("\n");
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };

  return (
    <ToolPage
      title="Extract Emails"
      description="Extract all email addresses from text"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input Text</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={12}
              placeholder="Paste text containing email addresses..."
              data-ocid="extractemails.textarea"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Extracted Emails ({emails.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={result}
              readOnly
              rows={12}
              className="font-mono text-sm"
            />
            {emails.length > 0 && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="extractemails.secondary_button"
              >
                Copy All
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolPage>
  );
}

export function ExtractURLs() {
  const [text, setText] = useState("");
  const urlRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/g;
  const urls = [...new Set(text.match(urlRegex) || [])];
  const result = urls.join("\n");
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };

  return (
    <ToolPage title="Extract URLs" description="Extract all URLs from text">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input Text</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={12}
              placeholder="Paste text containing URLs..."
              data-ocid="extracturls.textarea"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Extracted URLs ({urls.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={result}
              readOnly
              rows={12}
              className="font-mono text-sm"
            />
            {urls.length > 0 && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="extracturls.secondary_button"
              >
                Copy All
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolPage>
  );
}

export function StringLength() {
  const [text, setText] = useState("");

  return (
    <ToolPage
      title="String Length"
      description="Measure string length and byte size"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={10}
              placeholder="Enter text..."
              data-ocid="stringlength.textarea"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Measurements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {[
                { label: "Character Count", value: text.length },
                {
                  label: "Byte Length (UTF-8)",
                  value: new TextEncoder().encode(text).length,
                },
                { label: "Unicode Code Points", value: [...text].length },
                { label: "Lines", value: text ? text.split("\n").length : 0 },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between p-3 bg-muted rounded"
                >
                  <span className="text-sm">{item.label}</span>
                  <span className="font-bold text-teal text-xl">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolPage>
  );
}
