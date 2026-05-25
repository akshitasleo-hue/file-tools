import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Layout from "./components/Layout";
// Color tools
import {
  ColorConverter,
  ColorHarmony,
  ColorMixer,
  ColorNameFinder,
  ColorPaletteGenerator,
  ContrastChecker,
  GradientGenerator,
  ShadowGenerator,
  TailwindColors,
  TintShade,
} from "./pages/ColorTools";
// Dev tools
import {
  CRONParser,
  CSSFormatter,
  CSVToJSON,
  ColorPickerTool,
  HTMLFormatter,
  HTTPStatus,
  JSFormatter,
  JSONFormatter,
  JSONMinifier,
  JSONToCSV,
  MarkdownPreviewer,
  PasswordGenerator,
  RegexTester,
  SQLFormatter,
  UUIDGenerator,
} from "./pages/DevTools";
// Encoding tools
import {
  Base64Decode,
  Base64Encode,
  BinaryConverter,
  CaesarCipher,
  HTMLDecode,
  HTMLEncode,
  HexConverter,
  JWTDecoder,
  MorseCode,
  ROT13,
  SHA256Hash,
  SHA512Hash,
  URLDecode,
  URLEncode,
  UnicodeConverter,
} from "./pages/EncodingTools";
import FileCompression from "./pages/FileCompression";
// File tools
import {
  CSVViewer,
  FileMerger,
  FileSizeConverter,
  JSONViewer,
  MIMETypeChecker,
} from "./pages/FileToolsPages";
import FormatConversion from "./pages/FormatConversion";
import Home from "./pages/Home";
import ImageResize from "./pages/ImageResize";
// Math tools
import {
  AgeCalculator,
  BMICalculator,
  CompoundInterest,
  FibonacciGenerator,
  GCDLCMCalc,
  NumberBase,
  Percentage,
  PrimeChecker,
  RandomNumber,
  RomanNumerals,
  ScientificCalculator,
  TemperatureConverter,
  TimestampConverter,
  TipCalculator,
  UnitConverter,
} from "./pages/MathTools";
// Text tools
import {
  CharFrequency,
  ExtractEmails,
  ExtractURLs,
  FindReplace,
  LineNumbers,
  LoremIpsum,
  PalindromeChecker,
  ReadingTime,
  RemoveDuplicates,
  SortLines,
  StringLength,
  TextCase,
  TextDiff,
  TextRepeater,
  TextReverse,
  TextToSlug,
  TextTruncate,
  TextWrap,
  WhitespaceRemover,
  WordCounter,
} from "./pages/TextTools";
import Base64ToImage from "./pages/image/Base64ToImage";
import FaviconGenerator from "./pages/image/FaviconGenerator";
import ImageBlur from "./pages/image/ImageBlur";
import ImageBorder from "./pages/image/ImageBorder";
import ImageBrightness from "./pages/image/ImageBrightness";
import ImageColorFilter from "./pages/image/ImageColorFilter";
// Image tools
import ImageCrop from "./pages/image/ImageCrop";
import ImageFlip from "./pages/image/ImageFlip";
import ImageGrayscale from "./pages/image/ImageGrayscale";
import ImageInvert from "./pages/image/ImageInvert";
import ImageNoise from "./pages/image/ImageNoise";
import ImagePixelate from "./pages/image/ImagePixelate";
import ImageRotate from "./pages/image/ImageRotate";
import ImageRoundCorners from "./pages/image/ImageRoundCorners";
import ImageSharpen from "./pages/image/ImageSharpen";
import ImageToBase64 from "./pages/image/ImageToBase64";
import ImageWatermark from "./pages/image/ImageWatermark";

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const resizeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/resize",
  component: ImageResize,
});
const convertRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/convert",
  component: FormatConversion,
});
const compressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/compress",
  component: FileCompression,
});
// Image routes
const cropRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/image-crop",
  component: ImageCrop,
});
const rotateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/image-rotate",
  component: ImageRotate,
});
const grayscaleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/image-grayscale",
  component: ImageGrayscale,
});
const brightnessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/image-brightness",
  component: ImageBrightness,
});
const blurRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/image-blur",
  component: ImageBlur,
});
const sharpenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/image-sharpen",
  component: ImageSharpen,
});
const invertRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/image-invert",
  component: ImageInvert,
});
const watermarkRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/image-watermark",
  component: ImageWatermark,
});
const borderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/image-border",
  component: ImageBorder,
});
const roundCornersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/image-round-corners",
  component: ImageRoundCorners,
});
const imgToBase64Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/image-to-base64",
  component: ImageToBase64,
});
const base64ToImgRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/base64-to-image",
  component: Base64ToImage,
});
const pixelateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/image-pixelate",
  component: ImagePixelate,
});
const colorFilterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/image-color-filter",
  component: ImageColorFilter,
});
const noiseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/image-noise",
  component: ImageNoise,
});
const faviconRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/favicon-generator",
  component: FaviconGenerator,
});
const flipRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/image-flip",
  component: ImageFlip,
});
// Text routes
const wordCounterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/word-counter",
  component: WordCounter,
});
const textCaseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/text-case",
  component: TextCase,
});
const textReverseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/text-reverse",
  component: TextReverse,
});
const removeDuplicatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/remove-duplicates",
  component: RemoveDuplicates,
});
const sortLinesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/sort-lines",
  component: SortLines,
});
const textDiffRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/text-diff",
  component: TextDiff,
});
const findReplaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/find-replace",
  component: FindReplace,
});
const textTruncateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/text-truncate",
  component: TextTruncate,
});
const whitespaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/whitespace-remover",
  component: WhitespaceRemover,
});
const lineNumbersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/line-numbers",
  component: LineNumbers,
});
const slugRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/text-to-slug",
  component: TextToSlug,
});
const palindromeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/palindrome",
  component: PalindromeChecker,
});
const loremRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/lorem-ipsum",
  component: LoremIpsum,
});
const repeaterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/text-repeater",
  component: TextRepeater,
});
const readingTimeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/reading-time",
  component: ReadingTime,
});
const charFreqRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/char-frequency",
  component: CharFrequency,
});
const textWrapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/text-wrap",
  component: TextWrap,
});
const extractEmailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/extract-emails",
  component: ExtractEmails,
});
const extractUrlsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/extract-urls",
  component: ExtractURLs,
});
const stringLengthRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/string-length",
  component: StringLength,
});
// Encoding routes
const b64EncodeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/base64-encode",
  component: Base64Encode,
});
const b64DecodeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/base64-decode",
  component: Base64Decode,
});
const urlEncodeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/url-encode",
  component: URLEncode,
});
const urlDecodeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/url-decode",
  component: URLDecode,
});
const htmlEncodeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/html-encode",
  component: HTMLEncode,
});
const htmlDecodeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/html-decode",
  component: HTMLDecode,
});
const sha256Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/sha256",
  component: SHA256Hash,
});
const sha512Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/sha512",
  component: SHA512Hash,
});
const caesarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/caesar-cipher",
  component: CaesarCipher,
});
const binaryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/binary-converter",
  component: BinaryConverter,
});
const hexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/hex-converter",
  component: HexConverter,
});
const morseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/morse-code",
  component: MorseCode,
});
const jwtRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/jwt-decoder",
  component: JWTDecoder,
});
const rot13Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/rot13",
  component: ROT13,
});
const unicodeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/unicode-converter",
  component: UnicodeConverter,
});
// Math routes
const numBaseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/number-base",
  component: NumberBase,
});
const romanRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/roman-numerals",
  component: RomanNumerals,
});
const percentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/percentage",
  component: Percentage,
});
const bmiRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/bmi",
  component: BMICalculator,
});
const ageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/age-calculator",
  component: AgeCalculator,
});
const tipRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/tip-calculator",
  component: TipCalculator,
});
const compoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/compound-interest",
  component: CompoundInterest,
});
const tempRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/temperature",
  component: TemperatureConverter,
});
const unitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/unit-converter",
  component: UnitConverter,
});
const randomRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/random-number",
  component: RandomNumber,
});
const primeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/prime-checker",
  component: PrimeChecker,
});
const fibRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/fibonacci",
  component: FibonacciGenerator,
});
const gcdRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/gcd-lcm",
  component: GCDLCMCalc,
});
const timestampRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/timestamp",
  component: TimestampConverter,
});
const calcRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/calculator",
  component: ScientificCalculator,
});
// Dev routes
const jsonFmtRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/json-formatter",
  component: JSONFormatter,
});
const jsonMinRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/json-minifier",
  component: JSONMinifier,
});
const json2csvRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/json-to-csv",
  component: JSONToCSV,
});
const csv2jsonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/csv-to-json",
  component: CSVToJSON,
});
const regexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/regex-tester",
  component: RegexTester,
});
const uuidRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/uuid-generator",
  component: UUIDGenerator,
});
const passRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/password-generator",
  component: PasswordGenerator,
});
const cronRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/cron-parser",
  component: CRONParser,
});
const httpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/http-status",
  component: HTTPStatus,
});
const mdRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/markdown-preview",
  component: MarkdownPreviewer,
});
const htmlFmtRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/html-formatter",
  component: HTMLFormatter,
});
const cssFmtRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/css-formatter",
  component: CSSFormatter,
});
const jsFmtRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/js-formatter",
  component: JSFormatter,
});
const sqlFmtRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/sql-formatter",
  component: SQLFormatter,
});
const colorPickRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/color-picker",
  component: ColorPickerTool,
});
// Color routes
const colorConvRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/color-converter",
  component: ColorConverter,
});
const colorPalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/color-palette",
  component: ColorPaletteGenerator,
});
const gradRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/gradient-generator",
  component: GradientGenerator,
});
const contrastRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/contrast-checker",
  component: ContrastChecker,
});
const mixRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/color-mixer",
  component: ColorMixer,
});
const tintRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/tint-shade",
  component: TintShade,
});
const colorNameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/color-name",
  component: ColorNameFinder,
});
const harmonyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/color-harmony",
  component: ColorHarmony,
});
const shadowRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/shadow-generator",
  component: ShadowGenerator,
});
const twColorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/tailwind-colors",
  component: TailwindColors,
});
// File tool routes
const fileSizeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/file-size",
  component: FileSizeConverter,
});
const mimeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/mime-type",
  component: MIMETypeChecker,
});
const csvViewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/csv-viewer",
  component: CSVViewer,
});
const jsonViewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/json-viewer",
  component: JSONViewer,
});
const mergeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/file-merger",
  component: FileMerger,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  resizeRoute,
  convertRoute,
  compressRoute,
  // Image
  cropRoute,
  rotateRoute,
  grayscaleRoute,
  brightnessRoute,
  blurRoute,
  sharpenRoute,
  invertRoute,
  watermarkRoute,
  borderRoute,
  roundCornersRoute,
  imgToBase64Route,
  base64ToImgRoute,
  pixelateRoute,
  colorFilterRoute,
  noiseRoute,
  faviconRoute,
  flipRoute,
  // Text
  wordCounterRoute,
  textCaseRoute,
  textReverseRoute,
  removeDuplicatesRoute,
  sortLinesRoute,
  textDiffRoute,
  findReplaceRoute,
  textTruncateRoute,
  whitespaceRoute,
  lineNumbersRoute,
  slugRoute,
  palindromeRoute,
  loremRoute,
  repeaterRoute,
  readingTimeRoute,
  charFreqRoute,
  textWrapRoute,
  extractEmailsRoute,
  extractUrlsRoute,
  stringLengthRoute,
  // Encoding
  b64EncodeRoute,
  b64DecodeRoute,
  urlEncodeRoute,
  urlDecodeRoute,
  htmlEncodeRoute,
  htmlDecodeRoute,
  sha256Route,
  sha512Route,
  caesarRoute,
  binaryRoute,
  hexRoute,
  morseRoute,
  jwtRoute,
  rot13Route,
  unicodeRoute,
  // Math
  numBaseRoute,
  romanRoute,
  percentRoute,
  bmiRoute,
  ageRoute,
  tipRoute,
  compoundRoute,
  tempRoute,
  unitRoute,
  randomRoute,
  primeRoute,
  fibRoute,
  gcdRoute,
  timestampRoute,
  calcRoute,
  // Dev
  jsonFmtRoute,
  jsonMinRoute,
  json2csvRoute,
  csv2jsonRoute,
  regexRoute,
  uuidRoute,
  passRoute,
  cronRoute,
  httpRoute,
  mdRoute,
  htmlFmtRoute,
  cssFmtRoute,
  jsFmtRoute,
  sqlFmtRoute,
  colorPickRoute,
  // Color
  colorConvRoute,
  colorPalRoute,
  gradRoute,
  contrastRoute,
  mixRoute,
  tintRoute,
  colorNameRoute,
  harmonyRoute,
  shadowRoute,
  twColorsRoute,
  // File
  fileSizeRoute,
  mimeRoute,
  csvViewRoute,
  jsonViewRoute,
  mergeRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
