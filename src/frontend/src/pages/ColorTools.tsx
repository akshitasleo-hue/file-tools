import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace("#", "").match(/.{2}/g);
  if (!m || m.length < 3) return null;
  return [
    Number.parseInt(m[0], 16),
    Number.parseInt(m[1], 16),
    Number.parseInt(m[2], 16),
  ];
}
function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b]
    .map((v) =>
      Math.max(0, Math.min(255, Math.round(v)))
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}
function rgbToHsl(
  rIn: number,
  gIn: number,
  bIn: number,
): [number, number, number] {
  const r = rIn / 255;
  const g = gIn / 255;
  const b = bIn / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l < 0.5 ? d / (max + min) : d / (2 - max - min);
  let h =
    max === r
      ? (g - b) / d + (g < b ? 6 : 0)
      : max === g
        ? (b - r) / d + 2
        : (r - g) / d + 4;
  h /= 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}
function hslToRgb(
  hDeg: number,
  sPct: number,
  lPct: number,
): [number, number, number] {
  const h = hDeg / 360;
  const s = sPct / 100;
  const l = lPct / 100;
  const hue2rgb = (p: number, q: number, tVal: number) => {
    let t = tVal;
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  ];
}
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const cn = c / 255;
    return cn <= 0.03928 ? cn / 12.92 : ((cn + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function ColorConverter() {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState("59, 130, 246");
  const [hsl, setHsl] = useState("217, 91%, 60%");

  const fromHex = (v: string) => {
    setHex(v);
    const r = hexToRgb(v);
    if (!r) return;
    setRgb(`${r[0]}, ${r[1]}, ${r[2]}`);
    const [h, s, l] = rgbToHsl(...r);
    setHsl(`${h}, ${s}%, ${l}%`);
  };

  const fromRgb = (v: string) => {
    setRgb(v);
    const parts = v.split(",").map((p) => Number.parseInt(p.trim()));
    if (parts.length !== 3 || parts.some(Number.isNaN)) return;
    setHex(rgbToHex(parts[0], parts[1], parts[2]));
    const [h, s, l] = rgbToHsl(parts[0], parts[1], parts[2]);
    setHsl(`${h}, ${s}%, ${l}%`);
  };

  const fromHsl = (v: string) => {
    setHsl(v);
    const parts = v
      .split(",")
      .map((p) => Number.parseFloat(p.trim().replace("%", "")));
    if (parts.length !== 3 || parts.some(Number.isNaN)) return;
    const [r, g, b] = hslToRgb(parts[0], parts[1], parts[2]);
    setHex(rgbToHex(r, g, b));
    setRgb(`${r}, ${g}, ${b}`);
  };

  const handleCopy = async (val: string) => {
    await copyToClipboard(val);
    toast.success("Copied!");
  };

  return (
    <ToolPage
      title="Color Converter"
      description="Convert between HEX, RGB, HSL color formats"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div
              className="w-full h-32 rounded-lg border"
              style={{ backgroundColor: hex }}
            />
            <div>
              <Label>HEX</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={hex}
                  onChange={(e) => fromHex(e.target.value)}
                  className="w-10 h-10 rounded border"
                />
                <Input
                  value={hex}
                  onChange={(e) => fromHex(e.target.value)}
                  className="font-mono"
                  data-ocid="colorconv.input"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopy(hex)}
                >
                  Copy
                </Button>
              </div>
            </div>
            <div>
              <Label>RGB</Label>
              <div className="flex gap-2">
                <Input
                  value={rgb}
                  onChange={(e) => fromRgb(e.target.value)}
                  className="font-mono"
                  placeholder="r, g, b"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopy(`rgb(${rgb})`)}
                >
                  Copy
                </Button>
              </div>
            </div>
            <div>
              <Label>HSL</Label>
              <div className="flex gap-2">
                <Input
                  value={hsl}
                  onChange={(e) => fromHsl(e.target.value)}
                  className="font-mono"
                  placeholder="h, s%, l%"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopy(`hsl(${hsl})`)}
                >
                  Copy
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Color Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="h-24 rounded" style={{ backgroundColor: hex }} />
            <div
              className="h-24 rounded flex items-center justify-center"
              style={{ backgroundColor: hex }}
            >
              <span
                className="font-bold"
                style={{
                  color:
                    getLuminance(...(hexToRgb(hex) || [0, 0, 0])) > 0.179
                      ? "#000"
                      : "#fff",
                }}
              >
                Sample Text
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolPage>
  );
}

export function ColorPaletteGenerator() {
  const [base, setBase] = useState("#3b82f6");
  const [count, setCount] = useState(5);
  const rgb = hexToRgb(base) || [0, 0, 0];
  const [bh, bs] = rgbToHsl(...rgb);
  const palette = Array.from({ length: count }, (_, i) => {
    const l = Math.round(20 + (60 * i) / (count - 1));
    return rgbToHex(...hslToRgb(bh, bs, l));
  });
  const handleCopy = async () => {
    await copyToClipboard(palette.join("\n"));
    toast.success("Copied!");
  };
  return (
    <ToolPage
      title="Color Palette Generator"
      description="Generate color palettes from a base color"
    >
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex gap-4 items-end">
            <div>
              <Label>Base Color</Label>
              <div className="flex gap-2 mt-1">
                <input
                  type="color"
                  value={base}
                  onChange={(e) => setBase(e.target.value)}
                  className="w-10 h-10 rounded"
                />
                <Input
                  value={base}
                  onChange={(e) => setBase(e.target.value)}
                  className="w-32 font-mono"
                  data-ocid="palette.input"
                />
              </div>
            </div>
            <div>
              <Label>Steps</Label>
              <Input
                type="number"
                value={count}
                min={3}
                max={10}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-20"
              />
            </div>
          </div>
          <div className="flex h-24 rounded overflow-hidden">
            {palette.map((c) => (
              <div
                key={c}
                className="flex-1"
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
          <div className="grid grid-cols-5 gap-2">
            {palette.map((c) => (
              <div key={c} className="text-center">
                <div
                  className="w-full h-12 rounded mb-1"
                  style={{ backgroundColor: c }}
                />
                <p className="text-xs font-mono">{c}</p>
              </div>
            ))}
          </div>
          <Button
            onClick={handleCopy}
            variant="outline"
            data-ocid="palette.secondary_button"
          >
            Copy All Hex Values
          </Button>
        </CardContent>
      </Card>
    </ToolPage>
  );
}

export function GradientGenerator() {
  const [color1, setColor1] = useState("#f59e0b");
  const [color2, setColor2] = useState("#14b8a6");
  const [angle, setAngle] = useState(90);
  const [type, setType] = useState<"linear" | "radial">("linear");
  const gradient =
    type === "linear"
      ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
      : `radial-gradient(circle, ${color1}, ${color2})`;
  const css = `background: ${gradient};`;
  const handleCopy = async () => {
    await copyToClipboard(css);
    toast.success("Copied!");
  };
  return (
    <ToolPage
      title="Gradient Generator"
      description="Create CSS gradient backgrounds"
    >
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div
            className="w-full h-32 rounded"
            style={{ background: gradient }}
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Color 1</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-10 h-10 rounded"
                />
                <Input
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="font-mono"
                  data-ocid="gradient.input"
                />
              </div>
            </div>
            <div>
              <Label>Color 2</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-10 h-10 rounded"
                />
                <Input
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 items-end">
            <div className="flex gap-2">
              <Button
                variant={type === "linear" ? "default" : "outline"}
                onClick={() => setType("linear")}
                data-ocid="gradient.primary_button"
              >
                Linear
              </Button>
              <Button
                variant={type === "radial" ? "default" : "outline"}
                onClick={() => setType("radial")}
              >
                Radial
              </Button>
            </div>
            {type === "linear" && (
              <div>
                <Label>Angle: {angle}°</Label>
                <input
                  type="range"
                  value={angle}
                  min={0}
                  max={360}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full mt-1"
                />
              </div>
            )}
          </div>
          <div className="p-3 bg-muted rounded font-mono text-sm">{css}</div>
          <Button
            onClick={handleCopy}
            variant="outline"
            data-ocid="gradient.secondary_button"
          >
            Copy CSS
          </Button>
        </CardContent>
      </Card>
    </ToolPage>
  );
}

export function ContrastChecker() {
  const [fg, setFg] = useState("#ffffff");
  const [bg, setBg] = useState("#3b82f6");
  const fgRgb = hexToRgb(fg) || [255, 255, 255];
  const bgRgb = hexToRgb(bg) || [0, 0, 0];
  const l1 = getLuminance(...fgRgb);
  const l2 = getLuminance(...bgRgb);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  const grade =
    ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA Large" : "Fail";
  const gradeColor =
    ratio >= 4.5 ? "text-teal" : ratio >= 3 ? "text-amber" : "text-destructive";
  return (
    <ToolPage
      title="Contrast Checker"
      description="Check color contrast for accessibility (WCAG)"
    >
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div
            className="p-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: bg }}
          >
            <span className="text-3xl font-bold" style={{ color: fg }}>
              Sample Text Aa
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Foreground</Label>
              <div className="flex gap-2 mt-1">
                <input
                  type="color"
                  value={fg}
                  onChange={(e) => setFg(e.target.value)}
                  className="w-10 h-10 rounded"
                />
                <Input
                  value={fg}
                  onChange={(e) => setFg(e.target.value)}
                  className="font-mono"
                  data-ocid="contrast.input"
                />
              </div>
            </div>
            <div>
              <Label>Background</Label>
              <div className="flex gap-2 mt-1">
                <input
                  type="color"
                  value={bg}
                  onChange={(e) => setBg(e.target.value)}
                  className="w-10 h-10 rounded"
                />
                <Input
                  value={bg}
                  onChange={(e) => setBg(e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 text-center bg-muted rounded">
              <p className="text-xs text-muted-foreground">Contrast Ratio</p>
              <p className="text-3xl font-bold">{ratio.toFixed(2)}:1</p>
            </div>
            <div className="p-4 text-center bg-muted rounded">
              <p className="text-xs text-muted-foreground">WCAG Grade</p>
              <p className={`text-3xl font-bold ${gradeColor}`}>{grade}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </ToolPage>
  );
}

export function ColorMixer() {
  const [c1, setC1] = useState("#ff0000");
  const [c2, setC2] = useState("#0000ff");
  const [mixRatio, setMixRatio] = useState(50);
  const r1 = hexToRgb(c1) || [0, 0, 0];
  const r2 = hexToRgb(c2) || [0, 0, 0];
  const t = mixRatio / 100;
  const mixed = rgbToHex(
    Math.round(r1[0] * (1 - t) + r2[0] * t),
    Math.round(r1[1] * (1 - t) + r2[1] * t),
    Math.round(r1[2] * (1 - t) + r2[2] * t),
  );
  const handleCopy = async () => {
    await copyToClipboard(mixed);
    toast.success("Copied!");
  };
  return (
    <ToolPage title="Color Mixer" description="Mix two colors together">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Color 1</Label>
              <div className="flex gap-1 mt-1">
                <input
                  type="color"
                  value={c1}
                  onChange={(e) => setC1(e.target.value)}
                  className="w-10 h-10 rounded"
                />
                <Input
                  value={c1}
                  onChange={(e) => setC1(e.target.value)}
                  className="font-mono text-xs"
                  data-ocid="mixer.input"
                />
              </div>
            </div>
            <div className="text-center">
              <Label>Mixed</Label>
              <div
                className="w-full h-10 rounded mt-1"
                style={{ backgroundColor: mixed }}
              />
            </div>
            <div>
              <Label>Color 2</Label>
              <div className="flex gap-1 mt-1">
                <input
                  type="color"
                  value={c2}
                  onChange={(e) => setC2(e.target.value)}
                  className="w-10 h-10 rounded"
                />
                <Input
                  value={c2}
                  onChange={(e) => setC2(e.target.value)}
                  className="font-mono text-xs"
                />
              </div>
            </div>
          </div>
          <div>
            <Label>
              Mix Ratio: {mixRatio}% / {100 - mixRatio}%
            </Label>
            <input
              type="range"
              value={mixRatio}
              min={0}
              max={100}
              onChange={(e) => setMixRatio(Number(e.target.value))}
              className="w-full mt-1"
            />
          </div>
          <div className="p-3 bg-muted rounded text-center font-mono font-bold text-teal">
            {mixed}
          </div>
          <Button
            onClick={handleCopy}
            variant="outline"
            data-ocid="mixer.secondary_button"
          >
            Copy Mixed Color
          </Button>
        </CardContent>
      </Card>
    </ToolPage>
  );
}

export function TintShade() {
  const [base, setBase] = useState("#3b82f6");
  const rgb = hexToRgb(base) || [0, 0, 0];
  const [h, s] = rgbToHsl(...rgb);
  const tints = Array.from({ length: 5 }, (_, i) =>
    rgbToHex(...hslToRgb(h, s, 60 + i * 7)),
  );
  const shades = Array.from({ length: 5 }, (_, i) =>
    rgbToHex(...hslToRgb(h, s, 50 - i * 8)),
  );
  const handleCopy = async (hex: string) => {
    await copyToClipboard(hex);
    toast.success("Copied!");
  };
  return (
    <ToolPage
      title="Tint & Shade Generator"
      description="Generate tints and shades of a color"
    >
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label>Base Color</Label>
            <div className="flex gap-2 mt-1">
              <input
                type="color"
                value={base}
                onChange={(e) => setBase(e.target.value)}
                className="w-10 h-10 rounded"
              />
              <Input
                value={base}
                onChange={(e) => setBase(e.target.value)}
                className="w-36 font-mono"
                data-ocid="tintshade.input"
              />
            </div>
          </div>
          <div>
            <Label>Tints (lighter)</Label>
            <div className="flex gap-2 mt-1">
              {tints.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => handleCopy(c)}
                  title={c}
                  className="flex-1 h-12 rounded hover:scale-105 transition-transform"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          <div>
            <Label>Shades (darker)</Label>
            <div className="flex gap-2 mt-1">
              {shades.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => handleCopy(c)}
                  title={c}
                  className="flex-1 h-12 rounded hover:scale-105 transition-transform"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Click any color swatch to copy its hex value
          </p>
        </CardContent>
      </Card>
    </ToolPage>
  );
}

const COLOR_NAMES: [string, string][] = [
  ["Red", "#ff0000"],
  ["Green", "#008000"],
  ["Blue", "#0000ff"],
  ["Yellow", "#ffff00"],
  ["Orange", "#ffa500"],
  ["Purple", "#800080"],
  ["Pink", "#ffc0cb"],
  ["Brown", "#a52a2a"],
  ["Black", "#000000"],
  ["White", "#ffffff"],
  ["Gray", "#808080"],
  ["Cyan", "#00ffff"],
  ["Magenta", "#ff00ff"],
  ["Lime", "#00ff00"],
  ["Indigo", "#4b0082"],
  ["Violet", "#ee82ee"],
  ["Gold", "#ffd700"],
  ["Silver", "#c0c0c0"],
  ["Navy", "#000080"],
  ["Teal", "#008080"],
  ["Coral", "#ff7f50"],
  ["Salmon", "#fa8072"],
  ["Turquoise", "#40e0d0"],
  ["Lavender", "#e6e6fa"],
  ["Beige", "#f5f5dc"],
];

export function ColorNameFinder() {
  const [color, setColor] = useState("#ff6600");
  const rgb = hexToRgb(color) || [0, 0, 0];
  const dist = (hex: string) => {
    const r2 = hexToRgb(hex) || [0, 0, 0];
    return Math.sqrt(
      (rgb[0] - r2[0]) ** 2 + (rgb[1] - r2[1]) ** 2 + (rgb[2] - r2[2]) ** 2,
    );
  };
  const sorted = [...COLOR_NAMES].sort((a, b) => dist(a[1]) - dist(b[1]));
  return (
    <ToolPage
      title="Color Name Finder"
      description="Find the closest named color"
    >
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label>Pick a Color</Label>
            <div className="flex gap-2 mt-1">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-16 h-16 rounded"
              />
              <div className="flex-1">
                <Input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="font-mono"
                  data-ocid="colorname.input"
                />
                <div
                  className="mt-2 p-3 rounded"
                  style={{ backgroundColor: color }}
                >
                  <span
                    className="font-bold"
                    style={{
                      color:
                        getLuminance(...(hexToRgb(color) || [0, 0, 0])) > 0.179
                          ? "#000"
                          : "#fff",
                    }}
                  >
                    {sorted[0]?.[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <Label>Closest Named Colors</Label>
            {sorted.slice(0, 5).map(([name, hex]) => (
              <div
                key={hex}
                className="flex items-center gap-3 p-2 rounded bg-muted"
              >
                <div
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: hex }}
                />
                <span className="flex-1">{name}</span>
                <span className="font-mono text-sm text-muted-foreground">
                  {hex}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </ToolPage>
  );
}

export function ColorHarmony() {
  const [base, setBase] = useState("#3b82f6");
  const rgb = hexToRgb(base) || [0, 0, 0];
  const [h, s, l] = rgbToHsl(...rgb);
  const harmonies: Record<string, number[]> = {
    Complementary: [(h + 180) % 360],
    Triadic: [(h + 120) % 360, (h + 240) % 360],
    Analogous: [(h + 30) % 360, (h - 30 + 360) % 360],
    "Split-Comp": [(h + 150) % 360, (h + 210) % 360],
    Tetradic: [(h + 90) % 360, (h + 180) % 360, (h + 270) % 360],
  };
  const handleCopy = async (hex: string) => {
    await copyToClipboard(hex);
    toast.success("Copied!");
  };
  return (
    <ToolPage
      title="Color Harmony Generator"
      description="Generate harmonious color schemes"
    >
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label>Base Color</Label>
            <div className="flex gap-2 mt-1">
              <input
                type="color"
                value={base}
                onChange={(e) => setBase(e.target.value)}
                className="w-10 h-10 rounded"
              />
              <Input
                value={base}
                onChange={(e) => setBase(e.target.value)}
                className="w-36 font-mono"
                data-ocid="harmony.input"
              />
            </div>
          </div>
          {Object.entries(harmonies).map(([name, angles]) => {
            const colors = [
              base,
              ...angles.map((a) => rgbToHex(...hslToRgb(a, s, l))),
            ];
            return (
              <div key={name}>
                <Label>{name}</Label>
                <div className="flex gap-2 mt-1">
                  {colors.map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => handleCopy(c)}
                      title={c}
                      className="flex-1 h-12 rounded hover:scale-105 transition-transform"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
          <p className="text-xs text-muted-foreground">
            Click any color swatch to copy its hex value
          </p>
        </CardContent>
      </Card>
    </ToolPage>
  );
}

export function ShadowGenerator() {
  const [x, setX] = useState(4);
  const [y, setY] = useState(4);
  const [blur, setBlur] = useState(8);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState(25);
  const [inset, setInset] = useState(false);
  const hex = color.replace("#", "");
  const rgba = `rgba(${Number.parseInt(hex.slice(0, 2), 16)}, ${Number.parseInt(hex.slice(2, 4), 16)}, ${Number.parseInt(hex.slice(4, 6), 16)}, ${opacity / 100})`;
  const shadow = `${inset ? "inset " : ""} ${x}px ${y}px ${blur}px ${spread}px ${rgba}`;
  const css = `box-shadow: ${shadow};`;
  const handleCopy = async () => {
    await copyToClipboard(css);
    toast.success("Copied!");
  };
  return (
    <ToolPage
      title="CSS Shadow Generator"
      description="Generate CSS box-shadow styles"
    >
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="w-full h-32 flex items-center justify-center">
            <div
              className="w-24 h-24 bg-card rounded-lg"
              style={{ boxShadow: shadow }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { l: "X Offset", v: x, s: setX, min: -50, max: 50 },
              { l: "Y Offset", v: y, s: setY, min: -50, max: 50 },
              { l: "Blur Radius", v: blur, s: setBlur, min: 0, max: 100 },
              { l: "Spread", v: spread, s: setSpread, min: -50, max: 50 },
            ].map((item) => (
              <div key={item.l}>
                <Label>
                  {item.l}: {item.v}px
                </Label>
                <input
                  type="range"
                  value={item.v}
                  min={item.min}
                  max={item.max}
                  onChange={(e) => item.s(Number(e.target.value))}
                  className="w-full mt-1"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-4 items-center">
            <div>
              <Label>Color</Label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 rounded block mt-1"
              />
            </div>
            <div className="flex-1">
              <Label>Opacity: {opacity}%</Label>
              <input
                type="range"
                value={opacity}
                min={0}
                max={100}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full mt-1"
              />
            </div>
            <label className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                checked={inset}
                onChange={(e) => setInset(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Inset</span>
            </label>
          </div>
          <div className="p-3 bg-muted rounded font-mono text-sm">{css}</div>
          <Button
            onClick={handleCopy}
            variant="outline"
            data-ocid="shadow.secondary_button"
          >
            Copy CSS
          </Button>
        </CardContent>
      </Card>
    </ToolPage>
  );
}

const TAILWIND_COLORS: Record<string, string[]> = {
  slate: [
    "#f8fafc",
    "#f1f5f9",
    "#e2e8f0",
    "#cbd5e1",
    "#94a3b8",
    "#64748b",
    "#475569",
    "#334155",
    "#1e293b",
    "#0f172a",
  ],
  gray: [
    "#f9fafb",
    "#f3f4f6",
    "#e5e7eb",
    "#d1d5db",
    "#9ca3af",
    "#6b7280",
    "#4b5563",
    "#374151",
    "#1f2937",
    "#111827",
  ],
  red: [
    "#fef2f2",
    "#fee2e2",
    "#fecaca",
    "#fca5a5",
    "#f87171",
    "#ef4444",
    "#dc2626",
    "#b91c1c",
    "#991b1b",
    "#7f1d1d",
  ],
  orange: [
    "#fff7ed",
    "#ffedd5",
    "#fed7aa",
    "#fdba74",
    "#fb923c",
    "#f97316",
    "#ea580c",
    "#c2410c",
    "#9a3412",
    "#7c2d12",
  ],
  amber: [
    "#fffbeb",
    "#fef3c7",
    "#fde68a",
    "#fcd34d",
    "#fbbf24",
    "#f59e0b",
    "#d97706",
    "#b45309",
    "#92400e",
    "#78350f",
  ],
  yellow: [
    "#fefce8",
    "#fef9c3",
    "#fef08a",
    "#fde047",
    "#facc15",
    "#eab308",
    "#ca8a04",
    "#a16207",
    "#854d0e",
    "#713f12",
  ],
  green: [
    "#f0fdf4",
    "#dcfce7",
    "#bbf7d0",
    "#86efac",
    "#4ade80",
    "#22c55e",
    "#16a34a",
    "#15803d",
    "#166534",
    "#14532d",
  ],
  teal: [
    "#f0fdfa",
    "#ccfbf1",
    "#99f6e4",
    "#5eead4",
    "#2dd4bf",
    "#14b8a6",
    "#0d9488",
    "#0f766e",
    "#115e59",
    "#134e4a",
  ],
  blue: [
    "#eff6ff",
    "#dbeafe",
    "#bfdbfe",
    "#93c5fd",
    "#60a5fa",
    "#3b82f6",
    "#2563eb",
    "#1d4ed8",
    "#1e40af",
    "#1e3a8a",
  ],
  purple: [
    "#faf5ff",
    "#f3e8ff",
    "#e9d5ff",
    "#d8b4fe",
    "#c084fc",
    "#a855f7",
    "#9333ea",
    "#7e22ce",
    "#6b21a8",
    "#581c87",
  ],
  pink: [
    "#fdf2f8",
    "#fce7f3",
    "#fbcfe8",
    "#f9a8d4",
    "#f472b6",
    "#ec4899",
    "#db2777",
    "#be185d",
    "#9d174d",
    "#831843",
  ],
};
const SCALES = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
];

export function TailwindColors() {
  const [search, setSearch] = useState("");
  const filtered = Object.entries(TAILWIND_COLORS).filter(([name]) =>
    name.includes(search.toLowerCase()),
  );
  const handleCopy = async (name: string, scale: string) => {
    await copyToClipboard(`${name}-${scale}`);
    toast.success(`Copied ${name}-${scale}`);
  };
  return (
    <ToolPage
      title="Tailwind Color Reference"
      description="Browse all Tailwind CSS color tokens"
    >
      <div className="space-y-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search colors..."
          data-ocid="tailwind.search_input"
        />
        <div className="space-y-4">
          {filtered.map(([name, shades]) => (
            <div key={name}>
              <Label className="capitalize mb-2 block">{name}</Label>
              <div className="flex gap-1">
                {shades.map((hex, i) => (
                  <button
                    type="button"
                    key={`${name}-${SCALES[i]}`}
                    onClick={() => handleCopy(name, SCALES[i])}
                    title={`${name}-${SCALES[i]}: ${hex}`}
                    className="flex-1 h-10 rounded hover:scale-110 transition-transform"
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </div>
              <div className="flex text-xs text-muted-foreground mt-1">
                {SCALES.map((s) => (
                  <span key={s} className="flex-1 text-center">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolPage>
  );
}
