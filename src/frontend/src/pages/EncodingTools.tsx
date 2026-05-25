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

export function Base64Encode() {
  const [input, setInput] = useState("");
  const result = (() => {
    try {
      return btoa(unescape(encodeURIComponent(input)));
    } catch {
      return "Error encoding";
    }
  })();
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };
  return (
    <ToolPage title="Base64 Encode" description="Encode text to Base64 format">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={10}
              placeholder="Enter text to encode..."
              data-ocid="b64encode.textarea"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Base64 Output</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={result}
              readOnly
              rows={10}
              className="font-mono text-sm"
              data-ocid="b64encode.input"
            />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="b64encode.secondary_button"
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

export function Base64Decode() {
  const [input, setInput] = useState("");
  const result = (() => {
    try {
      return decodeURIComponent(escape(atob(input.trim())));
    } catch {
      return "Error: invalid Base64";
    }
  })();
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };
  return (
    <ToolPage title="Base64 Decode" description="Decode Base64 encoded strings">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Base64 Input</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={10}
              placeholder="Enter Base64 string..."
              className="font-mono text-sm"
              data-ocid="b64decode.textarea"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Decoded Output</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={result}
              readOnly
              rows={10}
              data-ocid="b64decode.input"
            />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="b64decode.secondary_button"
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

export function URLEncode() {
  const [input, setInput] = useState("");
  const result = (() => {
    try {
      return encodeURIComponent(input);
    } catch {
      return "Error";
    }
  })();
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };
  return (
    <ToolPage title="URL Encode" description="Encode text for use in URLs">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={8}
              placeholder="Enter text to URL encode..."
              data-ocid="urlencode.textarea"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>URL Encoded</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={result}
              readOnly
              rows={8}
              className="font-mono text-sm"
              data-ocid="urlencode.input"
            />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="urlencode.secondary_button"
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

export function URLDecode() {
  const [input, setInput] = useState("");
  const result = (() => {
    try {
      return decodeURIComponent(input);
    } catch {
      return "Error: invalid URL encoding";
    }
  })();
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };
  return (
    <ToolPage title="URL Decode" description="Decode URL-encoded strings">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>URL Encoded Input</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={8}
              placeholder="Enter URL encoded text..."
              className="font-mono text-sm"
              data-ocid="urldecode.textarea"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Decoded Output</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={result}
              readOnly
              rows={8}
              data-ocid="urldecode.input"
            />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="urldecode.secondary_button"
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

export function HTMLEncode() {
  const [input, setInput] = useState("");
  const result = input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };
  return (
    <ToolPage title="HTML Encode" description="Encode special HTML characters">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={10}
              placeholder="Enter HTML to encode..."
              data-ocid="htmlencode.textarea"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>HTML Encoded</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={result}
              readOnly
              rows={10}
              className="font-mono text-sm"
              data-ocid="htmlencode.input"
            />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="htmlencode.secondary_button"
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

export function HTMLDecode() {
  const [input, setInput] = useState("");
  const result = input
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };
  return (
    <ToolPage title="HTML Decode" description="Decode HTML entities">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>HTML Encoded Input</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={10}
              placeholder="Enter HTML entities..."
              className="font-mono text-sm"
              data-ocid="htmldecode.textarea"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Decoded Output</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={result}
              readOnly
              rows={10}
              data-ocid="htmldecode.input"
            />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="htmldecode.secondary_button"
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

async function hashText(text: string, algo: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await window.crypto.subtle.digest(algo, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function SHA256Hash() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const handleHash = async () => {
    setResult(await hashText(input, "SHA-256"));
  };
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };
  return (
    <ToolPage
      title="SHA-256 Hash"
      description="Generate SHA-256 cryptographic hash"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={8}
              placeholder="Enter text to hash..."
              data-ocid="sha256.textarea"
            />
            <Button
              onClick={handleHash}
              className="w-full bg-gradient-to-r from-amber to-teal"
              data-ocid="sha256.primary_button"
            >
              Generate Hash
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>SHA-256 Hash</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {result && (
              <>
                <div className="p-3 bg-muted rounded font-mono text-xs break-all">
                  {result}
                </div>
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  data-ocid="sha256.secondary_button"
                >
                  Copy
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolPage>
  );
}

export function SHA512Hash() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const handleHash = async () => {
    setResult(await hashText(input, "SHA-512"));
  };
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };
  return (
    <ToolPage
      title="SHA-512 Hash"
      description="Generate SHA-512 cryptographic hash"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={8}
              placeholder="Enter text to hash..."
              data-ocid="sha512.textarea"
            />
            <Button
              onClick={handleHash}
              className="w-full bg-gradient-to-r from-amber to-teal"
              data-ocid="sha512.primary_button"
            >
              Generate Hash
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>SHA-512 Hash</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {result && (
              <>
                <div className="p-3 bg-muted rounded font-mono text-xs break-all">
                  {result}
                </div>
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  data-ocid="sha512.secondary_button"
                >
                  Copy
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolPage>
  );
}

export function CaesarCipher() {
  const [input, setInput] = useState("");
  const [shift, setShift] = useState(13);
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const s = mode === "decode" ? (26 - shift) % 26 : shift;
  const result = input.replace(/[a-zA-Z]/g, (c) => {
    const base = c >= "a" ? 97 : 65;
    return String.fromCharCode(((c.charCodeAt(0) - base + s) % 26) + base);
  });
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };
  return (
    <ToolPage
      title="Caesar Cipher"
      description="Encrypt or decrypt text using Caesar cipher"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={8}
              placeholder="Enter text..."
              data-ocid="caesar.textarea"
            />
            <div>
              <Label>Shift Amount (1-25)</Label>
              <Input
                type="number"
                value={shift}
                min={1}
                max={25}
                onChange={(e) => setShift(Number(e.target.value))}
                data-ocid="caesar.input"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={mode === "encode" ? "default" : "outline"}
                onClick={() => setMode("encode")}
                data-ocid="caesar.primary_button"
              >
                Encode
              </Button>
              <Button
                variant={mode === "decode" ? "default" : "outline"}
                onClick={() => setMode("decode")}
              >
                Decode
              </Button>
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
              className="font-mono"
              data-ocid="caesar.input"
            />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="caesar.secondary_button"
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

export function BinaryConverter() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"textToBin" | "binToText">("textToBin");
  const convert = () => {
    if (mode === "textToBin")
      return input
        .split("")
        .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
        .join(" ");
    try {
      return input
        .trim()
        .split(/\s+/)
        .map((b) => String.fromCharCode(Number.parseInt(b, 2)))
        .join("");
    } catch {
      return "Invalid binary";
    }
  };
  const result = convert();
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };
  return (
    <ToolPage
      title="Binary Converter"
      description="Convert text to binary and back"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={mode === "textToBin" ? "default" : "outline"}
                onClick={() => setMode("textToBin")}
                data-ocid="binary.primary_button"
              >
                Text → Binary
              </Button>
              <Button
                variant={mode === "binToText" ? "default" : "outline"}
                onClick={() => setMode("binToText")}
              >
                Binary → Text
              </Button>
            </div>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={8}
              placeholder={
                mode === "textToBin"
                  ? "Enter text..."
                  : "Enter binary (space separated)..."
              }
              className={mode === "binToText" ? "font-mono" : ""}
              data-ocid="binary.textarea"
            />
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
              className="font-mono text-sm"
              data-ocid="binary.input"
            />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="binary.secondary_button"
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

export function HexConverter() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"textToHex" | "hexToText">("textToHex");
  const convert = () => {
    if (mode === "textToHex")
      return input
        .split("")
        .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join(" ");
    try {
      return input
        .trim()
        .split(/\s+/)
        .map((h) => String.fromCharCode(Number.parseInt(h, 16)))
        .join("");
    } catch {
      return "Invalid hex";
    }
  };
  const result = convert();
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };
  return (
    <ToolPage
      title="Hex Converter"
      description="Convert text to hexadecimal and back"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={mode === "textToHex" ? "default" : "outline"}
                onClick={() => setMode("textToHex")}
                data-ocid="hex.primary_button"
              >
                Text → Hex
              </Button>
              <Button
                variant={mode === "hexToText" ? "default" : "outline"}
                onClick={() => setMode("hexToText")}
              >
                Hex → Text
              </Button>
            </div>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={8}
              placeholder={
                mode === "textToHex"
                  ? "Enter text..."
                  : "Enter hex (space separated)..."
              }
              data-ocid="hex.textarea"
            />
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
              className="font-mono text-sm"
              data-ocid="hex.input"
            />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="hex.secondary_button"
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

const MORSE: Record<string, string> = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "0": "-----",
  " ": "/",
};
const MORSE_REV = Object.fromEntries(
  Object.entries(MORSE).map(([k, v]) => [v, k]),
);

export function MorseCode() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"textToMorse" | "morseToText">(
    "textToMorse",
  );
  const convert = () => {
    if (mode === "textToMorse")
      return input
        .toUpperCase()
        .split("")
        .map((c) => MORSE[c] || "?")
        .join(" ");
    return input
      .trim()
      .split(" / ")
      .map((word) =>
        word
          .split(" ")
          .map((m) => MORSE_REV[m] || "?")
          .join(""),
      )
      .join(" ");
  };
  const result = convert();
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };
  return (
    <ToolPage
      title="Morse Code"
      description="Convert text to Morse code and back"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={mode === "textToMorse" ? "default" : "outline"}
                onClick={() => setMode("textToMorse")}
                data-ocid="morse.primary_button"
              >
                Text → Morse
              </Button>
              <Button
                variant={mode === "morseToText" ? "default" : "outline"}
                onClick={() => setMode("morseToText")}
              >
                Morse → Text
              </Button>
            </div>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={8}
              placeholder={
                mode === "textToMorse"
                  ? "Enter text..."
                  : "Enter morse (e.g. .- .-...)"
              }
              data-ocid="morse.textarea"
            />
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
              className="font-mono"
              data-ocid="morse.input"
            />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="morse.secondary_button"
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

export function JWTDecoder() {
  const [input, setInput] = useState("");
  let header = "";
  let payload = "";
  let error = "";
  try {
    const parts = input.trim().split(".");
    if (parts.length >= 2) {
      header = JSON.stringify(
        JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/"))),
        null,
        2,
      );
      payload = JSON.stringify(
        JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))),
        null,
        2,
      );
    }
  } catch {
    error = "Invalid JWT token";
  }
  return (
    <ToolPage title="JWT Decoder" description="Decode and inspect JWT tokens">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>JWT Token</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
              placeholder="Paste JWT token here..."
              className="font-mono text-xs"
              data-ocid="jwt.textarea"
            />
          </CardContent>
        </Card>
        {error && (
          <div className="p-3 bg-destructive/20 text-destructive rounded">
            {error}
          </div>
        )}
        {header && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Header</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="font-mono text-sm overflow-auto">{header}</pre>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payload</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="font-mono text-sm overflow-auto">{payload}</pre>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ToolPage>
  );
}

export function ROT13() {
  const [input, setInput] = useState("");
  const result = input.replace(/[a-zA-Z]/g, (c) => {
    const base = c >= "a" ? 97 : 65;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };
  return (
    <ToolPage
      title="ROT13"
      description="Apply ROT13 cipher to text (encode and decode)"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={10}
              placeholder="Enter text..."
              data-ocid="rot13.textarea"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ROT13 Output</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={result}
              readOnly
              rows={10}
              className="font-mono"
              data-ocid="rot13.input"
            />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="rot13.secondary_button"
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

export function UnicodeConverter() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"textToUnicode" | "unicodeToText">(
    "textToUnicode",
  );
  const convert = () => {
    if (mode === "textToUnicode")
      return [...input]
        .map(
          (c) =>
            `U+${c.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0")}`,
        )
        .join(" ");
    try {
      return input
        .trim()
        .split(/\s+/)
        .map((u) => {
          const cp = Number.parseInt(u.replace(/^U\+/i, ""), 16);
          return String.fromCodePoint(cp);
        })
        .join("");
    } catch {
      return "Invalid Unicode format";
    }
  };
  const result = convert();
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };
  return (
    <ToolPage
      title="Unicode Converter"
      description="Convert text to Unicode code points and back"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={mode === "textToUnicode" ? "default" : "outline"}
                onClick={() => setMode("textToUnicode")}
                data-ocid="unicode.primary_button"
              >
                Text → Unicode
              </Button>
              <Button
                variant={mode === "unicodeToText" ? "default" : "outline"}
                onClick={() => setMode("unicodeToText")}
              >
                Unicode → Text
              </Button>
            </div>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={8}
              placeholder={
                mode === "textToUnicode"
                  ? "Enter text..."
                  : "Enter Unicode (e.g. U+0048 U+0069)"
              }
              data-ocid="unicode.textarea"
            />
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
              className="font-mono text-sm"
              data-ocid="unicode.input"
            />
            {result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                data-ocid="unicode.secondary_button"
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
