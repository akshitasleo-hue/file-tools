# File Tools - 100 Tools Expansion

## Current State
The app has 3 working browser-based file tools:
1. Image Resize - canvas-based resizing
2. Format Conversion - PNG/JPEG/WebP conversion
3. File Compression - quality-based image compression

Home page shows a small grid of tools (3 active, 2 disabled "coming soon").
Backend provides: uploadFile, downloadFile, resizeImage, convertFormat, compressFile, cleanupFiles.
All actual processing happens client-side using Canvas API / JS.

## Requested Changes (Diff)

### Add
- 97 new browser-based tools organized into categories
- Categories: Image Tools, Text Tools, PDF/Document Tools, Color Tools, Coding/Dev Tools, Math/Conversion Tools, Security/Encoding Tools, Media/Audio Tools, Generator Tools
- Categorized home page with search/filter functionality
- Shared utility hooks and helpers for common operations
- New tool pages for each implemented tool

### Modify
- Home.tsx: Replace small grid with categorized, searchable 100-tool directory
- App.tsx: Add routing for all new tool pages
- Layout.tsx: Optionally add category nav or keep simple

### Remove
- Nothing removed, existing tools remain

## Implementation Plan

### Tool Categories & List (100 total)

**Image Tools (20):**
1. Image Resize (existing)
2. Format Conversion (existing)
3. File Compression (existing)
4. Image Crop - interactive cropping
5. Image Rotate/Flip - rotate 90/180/270, flip H/V
6. Image Grayscale - convert to grayscale
7. Image Brightness/Contrast - adjust levels
8. Image Blur - Gaussian blur with radius control
9. Image Sharpen - unsharp mask
10. Image Invert Colors - negate all channels
11. Image Watermark - add text overlay
12. Image Border - add colored border
13. Image Round Corners - add rounded corners
14. Image to Base64 - encode image as base64
15. Base64 to Image - decode base64 to image
16. Image Pixelate - pixelate effect
17. Image Color Filter - sepia, red, green, blue filters
18. Image Noise - add noise effect
19. Image Overlay - stack two images
20. Favicon Generator - create .ico from image

**Text Tools (20):**
21. Word Counter - count words, chars, sentences
22. Text Case Converter - upper/lower/title/camel/snake/kebab
23. Text Reverser - reverse characters or words
24. Remove Duplicates - remove duplicate lines
25. Sort Lines - alphabetical/reverse/random
26. Text Diff - compare two texts
27. Find and Replace - bulk text find/replace
28. Text Truncate - shorten text to N chars
29. Whitespace Remover - trim/collapse whitespace
30. Line Number Adder - prefix lines with numbers
31. Text to Slug - convert to URL slug
32. Palindrome Checker - check if text is palindrome
33. Lorem Ipsum Generator - generate placeholder text
34. Text Repeater - repeat text N times
35. Sentence Counter - count sentences
36. Reading Time - estimate reading time
37. Character Frequency - count char occurrences
38. Text Wrap - wrap text at N columns
39. Extract Emails - find emails in text
40. Extract URLs - find URLs in text

**Encoding/Encoding Tools (15):**
41. Base64 Encode - encode text to base64
42. Base64 Decode - decode base64 to text
43. URL Encode - percent-encode URL
44. URL Decode - decode percent-encoded URL
45. HTML Encode - encode HTML entities
46. HTML Decode - decode HTML entities
47. MD5 Hash - generate MD5 (via crypto)
48. SHA-256 Hash - generate SHA-256
49. SHA-512 Hash - generate SHA-512
50. Caesar Cipher - ROT13 / custom shift
51. Binary Converter - text to/from binary
52. Hex Converter - text to/from hex
53. Morse Code - text to/from morse
54. JWT Decoder - decode JWT payload
55. QR Code Generator - generate QR code image

**Number/Math Tools (15):**
56. Number Base Converter - binary/octal/decimal/hex
57. Roman Numeral Converter - decimal to/from roman
58. Percentage Calculator - % of, % change
59. BMI Calculator - body mass index
60. Age Calculator - age from birthdate
61. Tip Calculator - bill + tip
62. Compound Interest - investment calculator
63. Temperature Converter - C/F/K
64. Unit Converter - length/weight/volume
65. Currency Formatter - format number as currency
66. Random Number Generator - configurable RNG
67. Prime Checker - is number prime?
68. Fibonacci Generator - first N fibonacci
69. GCD / LCM Calculator
70. Timestamp Converter - unix epoch to/from date

**Developer Tools (15):**
71. JSON Formatter - pretty-print and validate JSON
72. JSON Minifier - minify JSON
73. JSON to CSV - convert JSON array to CSV
74. CSV to JSON - convert CSV to JSON array
75. HTML Formatter - pretty-print HTML
76. CSS Minifier - minify CSS
77. JavaScript Minifier - minify JS (simple)
78. Regex Tester - test regex against text
79. Color Picker - pick and convert colors
80. UUID Generator - generate UUIDs
81. Password Generator - configurable password gen
82. CRON Expression Parser - explain cron expression
83. HTTP Status Codes - lookup status codes
84. SQL Formatter - format SQL query
85. Markdown Previewer - render markdown as HTML

**Color Tools (10):**
86. Color Converter - HEX/RGB/HSL/OKLCH
87. Color Palette Generator - generate palettes
88. Gradient Generator - create CSS gradients
89. Contrast Checker - WCAG contrast ratio
90. Color Blindness Simulator - simulate types
91. Color Mixer - blend two colors
92. Tint & Shade Generator
93. Color Name Finder - name from hex
94. Color Harmony - complementary/triadic etc.
95. CSS Shadow Generator - box/text shadow

**File Tools (5):**
96. File Size Converter - bytes to KB/MB/GB
97. MIME Type Checker - detect mime from file
98. CSV Viewer - render CSV as table
99. JSON Viewer - tree view of JSON
100. Text File Merger - combine multiple text files

### Implementation Strategy
- All tools are pure client-side (no backend calls needed for most)
- Each tool is a self-contained React page component
- Shared layout with back-to-home navigation
- Home page: searchable grid, category tabs/filters
- Tools that need files use the existing FileUpload component
- Canvas API for all image manipulation
- Web Crypto API for hashing
- TextEncoder/TextDecoder for encoding tools
