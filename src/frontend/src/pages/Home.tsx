import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlignJustify,
  AlignLeft,
  ArrowLeftRight,
  ArrowUpDown,
  BarChart,
  Binary,
  Blend,
  BookOpen,
  Braces,
  Brush,
  Calculator,
  Calendar,
  CaseSensitive,
  Clock,
  Code,
  Command,
  Contrast,
  Copy,
  Cpu,
  Crop,
  Database,
  Dices,
  Disc,
  DollarSign,
  Droplets,
  Eraser,
  Eye,
  FileCheck,
  FileCode,
  FileJson,
  FileText,
  FileType,
  Fingerprint,
  FlipHorizontal,
  Globe,
  HardDrive,
  Hash,
  Key,
  Layers,
  LayoutGrid,
  Link2,
  List,
  Lock,
  Mail,
  Maximize2,
  Merge,
  Minimize2,
  Palette,
  Percent,
  Pipette,
  RefreshCw,
  Replace,
  RotateCw,
  Ruler,
  Scale,
  Scissors,
  Search,
  Search as SearchIcon,
  Sheet,
  Shield,
  Sigma,
  SlidersHorizontal,
  Sparkles,
  SquareIcon,
  SunMedium,
  Table,
  Terminal,
  TestTube,
  TextCursorInput,
  Thermometer,
  TrendingUp,
  Type,
  Unlock,
} from "lucide-react";
import { useState } from "react";

type ToolDef = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: string;
  path: string;
  color: string;
};

const TOOLS: ToolDef[] = [
  // Image Tools
  {
    id: "resize",
    title: "Image Resize",
    description: "Resize images to custom or predefined dimensions",
    icon: Maximize2,
    category: "Image",
    path: "/tools/resize",
    color: "from-amber to-amber-light",
  },
  {
    id: "convert",
    title: "Format Conversion",
    description: "Convert images between PNG, JPEG, and WebP",
    icon: RefreshCw,
    category: "Image",
    path: "/tools/convert",
    color: "from-teal to-teal-light",
  },
  {
    id: "compress",
    title: "File Compression",
    description: "Reduce file sizes while maintaining quality",
    icon: Minimize2,
    category: "Image",
    path: "/tools/compress",
    color: "from-amber-light to-teal",
  },
  {
    id: "image-crop",
    title: "Image Crop",
    description: "Crop images to specific dimensions",
    icon: Crop,
    category: "Image",
    path: "/tools/image-crop",
    color: "from-amber to-teal",
  },
  {
    id: "image-rotate",
    title: "Image Rotate/Flip",
    description: "Rotate and flip images to any angle",
    icon: RotateCw,
    category: "Image",
    path: "/tools/image-rotate",
    color: "from-teal to-amber",
  },
  {
    id: "image-grayscale",
    title: "Image Grayscale",
    description: "Convert images to grayscale",
    icon: Contrast,
    category: "Image",
    path: "/tools/image-grayscale",
    color: "from-amber to-teal",
  },
  {
    id: "image-brightness",
    title: "Brightness & Contrast",
    description: "Adjust image brightness and contrast",
    icon: SunMedium,
    category: "Image",
    path: "/tools/image-brightness",
    color: "from-amber-light to-amber",
  },
  {
    id: "image-blur",
    title: "Image Blur",
    description: "Apply blur effect to images",
    icon: Sparkles,
    category: "Image",
    path: "/tools/image-blur",
    color: "from-teal to-teal-light",
  },
  {
    id: "image-sharpen",
    title: "Image Sharpen",
    description: "Sharpen images for crisp details",
    icon: Scissors,
    category: "Image",
    path: "/tools/image-sharpen",
    color: "from-amber to-teal",
  },
  {
    id: "image-invert",
    title: "Image Invert",
    description: "Invert all colors in an image",
    icon: FlipHorizontal,
    category: "Image",
    path: "/tools/image-invert",
    color: "from-teal to-amber-light",
  },
  {
    id: "image-watermark",
    title: "Image Watermark",
    description: "Add text watermark to images",
    icon: Type,
    category: "Image",
    path: "/tools/image-watermark",
    color: "from-amber to-teal",
  },
  {
    id: "image-border",
    title: "Image Border",
    description: "Add a border around images",
    icon: SquareIcon,
    category: "Image",
    path: "/tools/image-border",
    color: "from-teal to-amber",
  },
  {
    id: "image-round-corners",
    title: "Round Corners",
    description: "Add rounded corners to images",
    icon: Sparkles,
    category: "Image",
    path: "/tools/image-round-corners",
    color: "from-amber-light to-teal",
  },
  {
    id: "image-to-base64",
    title: "Image to Base64",
    description: "Convert image files to Base64 data URLs",
    icon: Code,
    category: "Image",
    path: "/tools/image-to-base64",
    color: "from-amber to-amber-light",
  },
  {
    id: "base64-to-image",
    title: "Base64 to Image",
    description: "Convert Base64 strings back to images",
    icon: Palette,
    category: "Image",
    path: "/tools/base64-to-image",
    color: "from-teal to-teal-light",
  },
  {
    id: "image-pixelate",
    title: "Image Pixelate",
    description: "Apply pixelation effect to images",
    icon: LayoutGrid,
    category: "Image",
    path: "/tools/image-pixelate",
    color: "from-amber to-teal",
  },
  {
    id: "image-color-filter",
    title: "Color Filter",
    description: "Apply sepia, warm, cool and vintage filters",
    icon: Palette,
    category: "Image",
    path: "/tools/image-color-filter",
    color: "from-teal to-amber",
  },
  {
    id: "image-noise",
    title: "Image Noise",
    description: "Add noise/grain effect to images",
    icon: Sparkles,
    category: "Image",
    path: "/tools/image-noise",
    color: "from-amber-light to-teal",
  },
  {
    id: "favicon-generator",
    title: "Favicon Generator",
    description: "Generate favicons in standard sizes",
    icon: Sparkles,
    category: "Image",
    path: "/tools/favicon-generator",
    color: "from-amber to-teal",
  },
  {
    id: "image-flip",
    title: "Image Flip",
    description: "Flip images horizontally or vertically",
    icon: FlipHorizontal,
    category: "Image",
    path: "/tools/image-flip",
    color: "from-teal to-amber-light",
  },
  // Text Tools
  {
    id: "word-counter",
    title: "Word Counter",
    description: "Count words, characters, sentences and more",
    icon: AlignLeft,
    category: "Text",
    path: "/tools/word-counter",
    color: "from-amber to-teal",
  },
  {
    id: "text-case",
    title: "Text Case Converter",
    description: "Convert text between different case styles",
    icon: CaseSensitive,
    category: "Text",
    path: "/tools/text-case",
    color: "from-teal to-amber",
  },
  {
    id: "text-reverse",
    title: "Text Reverser",
    description: "Reverse text by characters, words, or lines",
    icon: ArrowLeftRight,
    category: "Text",
    path: "/tools/text-reverse",
    color: "from-amber to-teal",
  },
  {
    id: "remove-duplicates",
    title: "Remove Duplicates",
    description: "Remove duplicate lines from text",
    icon: Copy,
    category: "Text",
    path: "/tools/remove-duplicates",
    color: "from-teal to-amber-light",
  },
  {
    id: "sort-lines",
    title: "Sort Lines",
    description: "Sort lines alphabetically or reverse",
    icon: ArrowUpDown,
    category: "Text",
    path: "/tools/sort-lines",
    color: "from-amber to-amber-light",
  },
  {
    id: "text-diff",
    title: "Text Diff",
    description: "Compare two texts and highlight differences",
    icon: FileCheck,
    category: "Text",
    path: "/tools/text-diff",
    color: "from-teal to-teal-light",
  },
  {
    id: "find-replace",
    title: "Find and Replace",
    description: "Find and replace text patterns",
    icon: Replace,
    category: "Text",
    path: "/tools/find-replace",
    color: "from-amber to-teal",
  },
  {
    id: "text-truncate",
    title: "Text Truncate",
    description: "Truncate text to a maximum length",
    icon: TextCursorInput,
    category: "Text",
    path: "/tools/text-truncate",
    color: "from-teal to-amber",
  },
  {
    id: "whitespace-remover",
    title: "Whitespace Remover",
    description: "Remove or clean whitespace from text",
    icon: Eraser,
    category: "Text",
    path: "/tools/whitespace-remover",
    color: "from-amber to-teal",
  },
  {
    id: "line-numbers",
    title: "Line Number Adder",
    description: "Add line numbers to text",
    icon: List,
    category: "Text",
    path: "/tools/line-numbers",
    color: "from-teal to-amber-light",
  },
  {
    id: "text-to-slug",
    title: "Text to Slug",
    description: "Convert text to URL-friendly slugs",
    icon: Link2,
    category: "Text",
    path: "/tools/text-to-slug",
    color: "from-amber to-amber-light",
  },
  {
    id: "palindrome",
    title: "Palindrome Checker",
    description: "Check if a word or phrase is a palindrome",
    icon: ArrowLeftRight,
    category: "Text",
    path: "/tools/palindrome",
    color: "from-teal to-teal-light",
  },
  {
    id: "lorem-ipsum",
    title: "Lorem Ipsum Generator",
    description: "Generate placeholder lorem ipsum text",
    icon: AlignJustify,
    category: "Text",
    path: "/tools/lorem-ipsum",
    color: "from-amber to-teal",
  },
  {
    id: "text-repeater",
    title: "Text Repeater",
    description: "Repeat text a specified number of times",
    icon: Copy,
    category: "Text",
    path: "/tools/text-repeater",
    color: "from-teal to-amber",
  },
  {
    id: "reading-time",
    title: "Reading Time",
    description: "Estimate how long it takes to read text",
    icon: BookOpen,
    category: "Text",
    path: "/tools/reading-time",
    color: "from-amber to-teal",
  },
  {
    id: "char-frequency",
    title: "Character Frequency",
    description: "Analyze character frequency in text",
    icon: BarChart,
    category: "Text",
    path: "/tools/char-frequency",
    color: "from-teal to-amber-light",
  },
  {
    id: "text-wrap",
    title: "Text Wrap",
    description: "Wrap text to a specific line width",
    icon: AlignLeft,
    category: "Text",
    path: "/tools/text-wrap",
    color: "from-amber to-amber-light",
  },
  {
    id: "extract-emails",
    title: "Extract Emails",
    description: "Extract all email addresses from text",
    icon: Mail,
    category: "Text",
    path: "/tools/extract-emails",
    color: "from-teal to-teal-light",
  },
  {
    id: "extract-urls",
    title: "Extract URLs",
    description: "Extract all URLs from text",
    icon: Globe,
    category: "Text",
    path: "/tools/extract-urls",
    color: "from-amber to-teal",
  },
  {
    id: "string-length",
    title: "String Length",
    description: "Measure string length and byte size",
    icon: Ruler,
    category: "Text",
    path: "/tools/string-length",
    color: "from-teal to-amber",
  },
  // Encoding Tools
  {
    id: "base64-encode",
    title: "Base64 Encode",
    description: "Encode text to Base64 format",
    icon: Lock,
    category: "Encoding",
    path: "/tools/base64-encode",
    color: "from-amber to-teal",
  },
  {
    id: "base64-decode",
    title: "Base64 Decode",
    description: "Decode Base64 encoded strings",
    icon: Unlock,
    category: "Encoding",
    path: "/tools/base64-decode",
    color: "from-teal to-amber",
  },
  {
    id: "url-encode",
    title: "URL Encode",
    description: "Encode text for use in URLs",
    icon: Link2,
    category: "Encoding",
    path: "/tools/url-encode",
    color: "from-amber to-amber-light",
  },
  {
    id: "url-decode",
    title: "URL Decode",
    description: "Decode URL-encoded strings",
    icon: Link2,
    category: "Encoding",
    path: "/tools/url-decode",
    color: "from-teal to-teal-light",
  },
  {
    id: "html-encode",
    title: "HTML Encode",
    description: "Encode special HTML characters",
    icon: Code,
    category: "Encoding",
    path: "/tools/html-encode",
    color: "from-amber to-teal",
  },
  {
    id: "html-decode",
    title: "HTML Decode",
    description: "Decode HTML entities",
    icon: Code,
    category: "Encoding",
    path: "/tools/html-decode",
    color: "from-teal to-amber-light",
  },
  {
    id: "sha256",
    title: "SHA-256 Hash",
    description: "Generate SHA-256 cryptographic hash",
    icon: Shield,
    category: "Encoding",
    path: "/tools/sha256",
    color: "from-amber to-teal",
  },
  {
    id: "sha512",
    title: "SHA-512 Hash",
    description: "Generate SHA-512 cryptographic hash",
    icon: Shield,
    category: "Encoding",
    path: "/tools/sha512",
    color: "from-teal to-teal-light",
  },
  {
    id: "caesar-cipher",
    title: "Caesar Cipher",
    description: "Encrypt or decrypt text using Caesar cipher",
    icon: Key,
    category: "Encoding",
    path: "/tools/caesar-cipher",
    color: "from-amber to-amber-light",
  },
  {
    id: "binary-converter",
    title: "Binary Converter",
    description: "Convert text to binary and back",
    icon: Binary,
    category: "Encoding",
    path: "/tools/binary-converter",
    color: "from-teal to-amber",
  },
  {
    id: "hex-converter",
    title: "Hex Converter",
    description: "Convert text to hexadecimal and back",
    icon: Hash,
    category: "Encoding",
    path: "/tools/hex-converter",
    color: "from-amber to-teal",
  },
  {
    id: "morse-code",
    title: "Morse Code",
    description: "Convert text to Morse code and back",
    icon: Terminal,
    category: "Encoding",
    path: "/tools/morse-code",
    color: "from-teal to-amber-light",
  },
  {
    id: "jwt-decoder",
    title: "JWT Decoder",
    description: "Decode and inspect JWT tokens",
    icon: Fingerprint,
    category: "Encoding",
    path: "/tools/jwt-decoder",
    color: "from-amber to-teal",
  },
  {
    id: "rot13",
    title: "ROT13",
    description: "Apply ROT13 cipher to text",
    icon: Key,
    category: "Encoding",
    path: "/tools/rot13",
    color: "from-teal to-amber",
  },
  {
    id: "unicode-converter",
    title: "Unicode Converter",
    description: "Convert text to Unicode code points",
    icon: Code,
    category: "Encoding",
    path: "/tools/unicode-converter",
    color: "from-amber to-amber-light",
  },
  // Math Tools
  {
    id: "number-base",
    title: "Number Base Converter",
    description: "Convert between bin, oct, dec, hex",
    icon: Binary,
    category: "Math",
    path: "/tools/number-base",
    color: "from-teal to-teal-light",
  },
  {
    id: "roman-numerals",
    title: "Roman Numerals",
    description: "Convert numbers to Roman numerals",
    icon: Hash,
    category: "Math",
    path: "/tools/roman-numerals",
    color: "from-amber to-teal",
  },
  {
    id: "percentage",
    title: "Percentage Calculator",
    description: "Calculate percentages easily",
    icon: Percent,
    category: "Math",
    path: "/tools/percentage",
    color: "from-teal to-amber",
  },
  {
    id: "bmi",
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index",
    icon: Activity,
    category: "Math",
    path: "/tools/bmi",
    color: "from-amber to-amber-light",
  },
  {
    id: "age-calculator",
    title: "Age Calculator",
    description: "Calculate exact age between two dates",
    icon: Calendar,
    category: "Math",
    path: "/tools/age-calculator",
    color: "from-teal to-teal-light",
  },
  {
    id: "tip-calculator",
    title: "Tip Calculator",
    description: "Calculate tips and split bills",
    icon: DollarSign,
    category: "Math",
    path: "/tools/tip-calculator",
    color: "from-amber to-teal",
  },
  {
    id: "compound-interest",
    title: "Compound Interest",
    description: "Calculate compound interest over time",
    icon: TrendingUp,
    category: "Math",
    path: "/tools/compound-interest",
    color: "from-teal to-amber-light",
  },
  {
    id: "temperature",
    title: "Temperature Converter",
    description: "Convert between temperature scales",
    icon: Thermometer,
    category: "Math",
    path: "/tools/temperature",
    color: "from-amber to-amber-light",
  },
  {
    id: "unit-converter",
    title: "Unit Converter",
    description: "Convert length, weight, and volume units",
    icon: Scale,
    category: "Math",
    path: "/tools/unit-converter",
    color: "from-teal to-teal-light",
  },
  {
    id: "random-number",
    title: "Random Number",
    description: "Generate random numbers in a range",
    icon: Dices,
    category: "Math",
    path: "/tools/random-number",
    color: "from-amber to-teal",
  },
  {
    id: "prime-checker",
    title: "Prime Checker",
    description: "Check if a number is prime",
    icon: SearchIcon,
    category: "Math",
    path: "/tools/prime-checker",
    color: "from-teal to-amber",
  },
  {
    id: "fibonacci",
    title: "Fibonacci Generator",
    description: "Generate Fibonacci sequence numbers",
    icon: Sigma,
    category: "Math",
    path: "/tools/fibonacci",
    color: "from-amber to-amber-light",
  },
  {
    id: "gcd-lcm",
    title: "GCD & LCM Calculator",
    description: "Find Greatest Common Divisor and LCM",
    icon: Calculator,
    category: "Math",
    path: "/tools/gcd-lcm",
    color: "from-teal to-teal-light",
  },
  {
    id: "timestamp",
    title: "Timestamp Converter",
    description: "Convert Unix timestamps to dates",
    icon: Clock,
    category: "Math",
    path: "/tools/timestamp",
    color: "from-amber to-teal",
  },
  {
    id: "calculator",
    title: "Scientific Calculator",
    description: "Full-featured scientific calculator",
    icon: Cpu,
    category: "Math",
    path: "/tools/calculator",
    color: "from-teal to-amber-light",
  },
  // Developer Tools
  {
    id: "json-formatter",
    title: "JSON Formatter",
    description: "Format and prettify JSON",
    icon: FileJson,
    category: "Developer",
    path: "/tools/json-formatter",
    color: "from-amber to-teal",
  },
  {
    id: "json-minifier",
    title: "JSON Minifier",
    description: "Minify JSON to reduce file size",
    icon: FileJson,
    category: "Developer",
    path: "/tools/json-minifier",
    color: "from-teal to-amber",
  },
  {
    id: "json-to-csv",
    title: "JSON to CSV",
    description: "Convert JSON arrays to CSV format",
    icon: Table,
    category: "Developer",
    path: "/tools/json-to-csv",
    color: "from-amber to-amber-light",
  },
  {
    id: "csv-to-json",
    title: "CSV to JSON",
    description: "Convert CSV data to JSON format",
    icon: Database,
    category: "Developer",
    path: "/tools/csv-to-json",
    color: "from-teal to-teal-light",
  },
  {
    id: "regex-tester",
    title: "Regex Tester",
    description: "Test and debug regular expressions",
    icon: TestTube,
    category: "Developer",
    path: "/tools/regex-tester",
    color: "from-amber to-teal",
  },
  {
    id: "uuid-generator",
    title: "UUID Generator",
    description: "Generate random UUID v4 values",
    icon: Fingerprint,
    category: "Developer",
    path: "/tools/uuid-generator",
    color: "from-teal to-amber-light",
  },
  {
    id: "password-generator",
    title: "Password Generator",
    description: "Generate strong random passwords",
    icon: Shield,
    category: "Developer",
    path: "/tools/password-generator",
    color: "from-amber to-amber-light",
  },
  {
    id: "cron-parser",
    title: "CRON Parser",
    description: "Parse and explain CRON expressions",
    icon: Command,
    category: "Developer",
    path: "/tools/cron-parser",
    color: "from-teal to-teal-light",
  },
  {
    id: "http-status",
    title: "HTTP Status Codes",
    description: "Reference for HTTP status codes",
    icon: Braces,
    category: "Developer",
    path: "/tools/http-status",
    color: "from-amber to-teal",
  },
  {
    id: "markdown-preview",
    title: "Markdown Previewer",
    description: "Preview Markdown in real-time",
    icon: FileText,
    category: "Developer",
    path: "/tools/markdown-preview",
    color: "from-teal to-amber",
  },
  {
    id: "html-formatter",
    title: "HTML Formatter",
    description: "Format and beautify HTML code",
    icon: FileCode,
    category: "Developer",
    path: "/tools/html-formatter",
    color: "from-amber to-amber-light",
  },
  {
    id: "css-formatter",
    title: "CSS Formatter",
    description: "Format and beautify CSS code",
    icon: Layers,
    category: "Developer",
    path: "/tools/css-formatter",
    color: "from-teal to-teal-light",
  },
  {
    id: "js-formatter",
    title: "JavaScript Formatter",
    description: "Format and beautify JavaScript code",
    icon: Terminal,
    category: "Developer",
    path: "/tools/js-formatter",
    color: "from-amber to-teal",
  },
  {
    id: "sql-formatter",
    title: "SQL Formatter",
    description: "Format and beautify SQL queries",
    icon: Database,
    category: "Developer",
    path: "/tools/sql-formatter",
    color: "from-teal to-amber-light",
  },
  {
    id: "color-picker",
    title: "Color Picker",
    description: "Pick colors and get their values",
    icon: Pipette,
    category: "Developer",
    path: "/tools/color-picker",
    color: "from-amber to-amber-light",
  },
  // Color Tools
  {
    id: "color-converter",
    title: "Color Converter",
    description: "Convert between HEX, RGB, HSL formats",
    icon: Pipette,
    category: "Color",
    path: "/tools/color-converter",
    color: "from-amber to-teal",
  },
  {
    id: "color-palette",
    title: "Color Palette Generator",
    description: "Generate color palettes from a base color",
    icon: Palette,
    category: "Color",
    path: "/tools/color-palette",
    color: "from-teal to-amber",
  },
  {
    id: "gradient-generator",
    title: "Gradient Generator",
    description: "Create CSS gradient backgrounds",
    icon: Brush,
    category: "Color",
    path: "/tools/gradient-generator",
    color: "from-amber to-amber-light",
  },
  {
    id: "contrast-checker",
    title: "Contrast Checker",
    description: "Check color contrast for accessibility",
    icon: Eye,
    category: "Color",
    path: "/tools/contrast-checker",
    color: "from-teal to-teal-light",
  },
  {
    id: "color-mixer",
    title: "Color Mixer",
    description: "Mix two colors together",
    icon: Blend,
    category: "Color",
    path: "/tools/color-mixer",
    color: "from-amber to-teal",
  },
  {
    id: "tint-shade",
    title: "Tint & Shade Generator",
    description: "Generate tints and shades of a color",
    icon: SlidersHorizontal,
    category: "Color",
    path: "/tools/tint-shade",
    color: "from-teal to-amber-light",
  },
  {
    id: "color-name",
    title: "Color Name Finder",
    description: "Find the closest named color",
    icon: SearchIcon,
    category: "Color",
    path: "/tools/color-name",
    color: "from-amber to-amber-light",
  },
  {
    id: "color-harmony",
    title: "Color Harmony",
    description: "Generate harmonious color schemes",
    icon: Palette,
    category: "Color",
    path: "/tools/color-harmony",
    color: "from-teal to-teal-light",
  },
  {
    id: "shadow-generator",
    title: "CSS Shadow Generator",
    description: "Generate CSS box-shadow styles",
    icon: Layers,
    category: "Color",
    path: "/tools/shadow-generator",
    color: "from-amber to-teal",
  },
  {
    id: "tailwind-colors",
    title: "Tailwind Color Reference",
    description: "Browse all Tailwind CSS color tokens",
    icon: LayoutGrid,
    category: "Color",
    path: "/tools/tailwind-colors",
    color: "from-teal to-amber",
  },
  // File Tools
  {
    id: "file-size",
    title: "File Size Converter",
    description: "Convert between file size units",
    icon: HardDrive,
    category: "File",
    path: "/tools/file-size",
    color: "from-amber to-teal",
  },
  {
    id: "mime-type",
    title: "MIME Type Checker",
    description: "Check MIME type from file extension",
    icon: FileType,
    category: "File",
    path: "/tools/mime-type",
    color: "from-teal to-amber",
  },
  {
    id: "csv-viewer",
    title: "CSV Viewer",
    description: "View and inspect CSV files in a table",
    icon: Sheet,
    category: "File",
    path: "/tools/csv-viewer",
    color: "from-amber to-amber-light",
  },
  {
    id: "json-viewer",
    title: "JSON Viewer",
    description: "View JSON with syntax highlighting",
    icon: FileJson,
    category: "File",
    path: "/tools/json-viewer",
    color: "from-teal to-teal-light",
  },
  {
    id: "file-merger",
    title: "Text File Merger",
    description: "Merge multiple text files into one",
    icon: Merge,
    category: "File",
    path: "/tools/file-merger",
    color: "from-amber to-teal",
  },
];

const CATEGORIES = [
  "All",
  "Image",
  "Text",
  "Encoding",
  "Math",
  "Developer",
  "Color",
  "File",
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = TOOLS.filter((tool) => {
    const matchesSearch =
      !search ||
      tool.title.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative">
      {/* Hero */}
      <section className="py-12 px-4 bg-gradient-to-br from-amber/10 via-background to-teal/10">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber via-teal to-amber-light bg-clip-text text-transparent">
            100 File Tools
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Free, client-side tools for images, text, encoding, math,
            development, and colors.
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 100 tools..."
              className="pl-10 h-12 text-base"
              data-ocid="home.search_input"
            />
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-4 px-4 border-b border-border/40 sticky top-16 z-40 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className={
                  activeCategory === cat
                    ? "bg-gradient-to-r from-amber to-teal border-0"
                    : "hover:bg-amber/10 hover:border-amber"
                }
                data-ocid={`home.${cat.toLowerCase()}.tab`}
              >
                {cat}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {cat === "All"
                    ? TOOLS.length
                    : TOOLS.filter((t) => t.category === cat).length}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-10 px-4">
        <div className="container mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20" data-ocid="home.empty_state">
              <p className="text-muted-foreground text-xl">
                No tools found for &ldquo;{search}&rdquo;
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
                className="mt-4"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6 text-center">
                {filtered.length} tool{filtered.length !== 1 ? "s" : ""}{" "}
                available
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((tool, i) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.id}
                      to={tool.path}
                      className="group block"
                      data-ocid={`home.item.${i + 1}`}
                    >
                      <div className="h-full p-4 rounded-xl border border-border hover:border-amber/50 hover:shadow-lg transition-all bg-card group-hover:bg-card/80 group-hover:scale-[1.02]">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center flex-shrink-0`}
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-sm truncate">
                                {tool.title}
                              </h3>
                            </div>
                            <Badge variant="outline" className="text-xs mb-2">
                              {tool.category}
                            </Badge>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {tool.description}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-teal font-medium mt-3 group-hover:underline">
                          Open Tool &rarr;
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
