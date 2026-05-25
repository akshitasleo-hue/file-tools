import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { copyToClipboard } from "@/lib/toolUtils";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useCallback, useState } from "react";
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

export function NumberBase() {
  const [input, setInput] = useState("");
  const [fromBase, setFromBase] = useState(10);
  const num = Number.parseInt(input, fromBase);
  const isValid = !Number.isNaN(num) && input.trim() !== "";
  return (
    <ToolPage
      title="Number Base Converter"
      description="Convert numbers between binary, octal, decimal, and hexadecimal"
    >
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Input Number</Label>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter number..."
                className="font-mono"
                data-ocid="numbase.input"
              />
            </div>
            <div>
              <Label>From Base</Label>
              <div className="flex gap-2 mt-1">
                {[2, 8, 10, 16].map((b) => (
                  <Button
                    key={b}
                    size="sm"
                    variant={fromBase === b ? "default" : "outline"}
                    onClick={() => setFromBase(b)}
                  >
                    {b}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          {isValid && (
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-muted rounded">
                <p className="text-xs text-muted-foreground mb-1">Binary (2)</p>
                <p className="font-mono text-lg font-bold text-teal">
                  {num.toString(2)}
                </p>
              </div>
              <div className="p-3 bg-muted rounded">
                <p className="text-xs text-muted-foreground mb-1">Octal (8)</p>
                <p className="font-mono text-lg font-bold text-teal">
                  {num.toString(8)}
                </p>
              </div>
              <div className="p-3 bg-muted rounded">
                <p className="text-xs text-muted-foreground mb-1">
                  Decimal (10)
                </p>
                <p className="font-mono text-lg font-bold text-teal">
                  {num.toString(10)}
                </p>
              </div>
              <div className="p-3 bg-muted rounded">
                <p className="text-xs text-muted-foreground mb-1">
                  Hexadecimal (16)
                </p>
                <p className="font-mono text-lg font-bold text-teal">
                  {num.toString(16).toUpperCase()}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </ToolPage>
  );
}

const ROMAN_VALUES = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
] as [number, string][];
export function RomanNumerals() {
  const [num, setNum] = useState(2024);
  const toRoman = (nIn: number): string => {
    if (nIn < 1 || nIn > 3999) return "Out of range (1-3999)";
    let n = nIn;
    let result = "";
    for (const [val, sym] of ROMAN_VALUES) {
      while (n >= val) {
        result += sym;
        n -= val;
      }
    }
    return result;
  };
  const roman = toRoman(num);
  const handleCopy = async () => {
    await copyToClipboard(roman);
    toast.success("Copied!");
  };
  return (
    <ToolPage
      title="Roman Numeral Converter"
      description="Convert numbers to Roman numerals"
    >
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label>Number (1-3999)</Label>
            <Input
              type="number"
              value={num}
              min={1}
              max={3999}
              onChange={(e) => setNum(Number(e.target.value))}
              className="text-lg"
              data-ocid="roman.input"
            />
          </div>
          <div className="p-6 text-center bg-gradient-to-br from-amber/10 to-teal/10 rounded-lg">
            <p className="text-4xl font-bold text-teal tracking-widest">
              {roman}
            </p>
          </div>
          <Button
            onClick={handleCopy}
            variant="outline"
            className="w-full"
            data-ocid="roman.secondary_button"
          >
            Copy
          </Button>
        </CardContent>
      </Card>
    </ToolPage>
  );
}

export function Percentage() {
  const [value, setValue] = useState("25");
  const [total, setTotal] = useState("200");
  const pct = total ? ((Number(value) / Number(total)) * 100).toFixed(2) : "";
  const ofPct =
    value && total ? ((Number(value) / 100) * Number(total)).toFixed(2) : "";
  return (
    <ToolPage
      title="Percentage Calculator"
      description="Calculate percentages easily"
    >
      <Card className="max-w-lg mx-auto">
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Value</Label>
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                data-ocid="percentage.input"
              />
            </div>
            <div>
              <Label>Total</Label>
              <Input
                type="number"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-muted rounded flex justify-between">
              <span className="text-sm">
                {value} is what % of {total}?
              </span>
              <span className="font-bold text-teal">{pct}%</span>
            </div>
            <div className="p-3 bg-muted rounded flex justify-between">
              <span className="text-sm">
                {value}% of {total} is?
              </span>
              <span className="font-bold text-teal">{ofPct}</span>
            </div>
            <div className="p-3 bg-muted rounded flex justify-between">
              <span className="text-sm">
                {value} increased by {total}%
              </span>
              <span className="font-bold text-teal">
                {value && total
                  ? (Number(value) * (1 + Number(total) / 100)).toFixed(2)
                  : ""}
              </span>
            </div>
            <div className="p-3 bg-muted rounded flex justify-between">
              <span className="text-sm">
                {value} decreased by {total}%
              </span>
              <span className="font-bold text-teal">
                {value && total
                  ? (Number(value) * (1 - Number(total) / 100)).toFixed(2)
                  : ""}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </ToolPage>
  );
}

export function BMICalculator() {
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  let bmi: number;
  if (unit === "metric") {
    const h = Number(height) / 100;
    bmi = Number(weight) / (h * h);
  } else {
    bmi = (703 * Number(weight)) / (Number(height) * Number(height));
  }
  const category =
    bmi < 18.5
      ? "Underweight"
      : bmi < 25
        ? "Normal weight"
        : bmi < 30
          ? "Overweight"
          : "Obese";
  const color =
    bmi < 18.5
      ? "text-amber"
      : bmi < 25
        ? "text-teal"
        : bmi < 30
          ? "text-amber"
          : "text-destructive";
  return (
    <ToolPage
      title="BMI Calculator"
      description="Calculate your Body Mass Index"
    >
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6 space-y-4">
          <div className="flex gap-2">
            <Button
              variant={unit === "metric" ? "default" : "outline"}
              onClick={() => setUnit("metric")}
              data-ocid="bmi.primary_button"
            >
              Metric (kg, cm)
            </Button>
            <Button
              variant={unit === "imperial" ? "default" : "outline"}
              onClick={() => setUnit("imperial")}
            >
              Imperial (lb, in)
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Weight ({unit === "metric" ? "kg" : "lbs"})</Label>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                data-ocid="bmi.input"
              />
            </div>
            <div>
              <Label>Height ({unit === "metric" ? "cm" : "inches"})</Label>
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>
          {weight && height && (
            <div className="p-6 text-center bg-gradient-to-br from-amber/10 to-teal/10 rounded-lg">
              <p className={`text-5xl font-bold ${color}`}>{bmi.toFixed(1)}</p>
              <p className="text-muted-foreground mt-2">{category}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </ToolPage>
  );
}

export function AgeCalculator() {
  const [dob, setDob] = useState("1990-01-01");
  const [targetDate, setTargetDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const birth = new Date(dob);
  const target = new Date(targetDate);
  let years = target.getFullYear() - birth.getFullYear();
  let months = target.getMonth() - birth.getMonth();
  let days = target.getDate() - birth.getDate();
  if (days < 0) {
    months--;
    days += 30;
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  const totalDays = Math.floor(
    (target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24),
  );
  return (
    <ToolPage
      title="Age Calculator"
      description="Calculate exact age between two dates"
    >
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label>Date of Birth</Label>
            <Input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              data-ocid="age.input"
            />
          </div>
          <div>
            <Label>Target Date</Label>
            <Input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 text-center bg-muted rounded">
              <p className="text-3xl font-bold text-teal">{years}</p>
              <p className="text-xs text-muted-foreground">Years</p>
            </div>
            <div className="p-4 text-center bg-muted rounded">
              <p className="text-3xl font-bold text-teal">{months}</p>
              <p className="text-xs text-muted-foreground">Months</p>
            </div>
            <div className="p-4 text-center bg-muted rounded">
              <p className="text-3xl font-bold text-teal">{days}</p>
              <p className="text-xs text-muted-foreground">Days</p>
            </div>
          </div>
          <div className="p-3 bg-muted rounded text-center">
            <p className="text-sm text-muted-foreground">
              Total:{" "}
              <span className="font-bold text-foreground">
                {totalDays.toLocaleString()}
              </span>{" "}
              days
            </p>
          </div>
        </CardContent>
      </Card>
    </ToolPage>
  );
}

export function TipCalculator() {
  const [bill, setBill] = useState("50");
  const [tip, setTip] = useState("15");
  const [people, setPeople] = useState("2");
  const tipAmt = (Number(bill) * Number(tip)) / 100;
  const total = Number(bill) + tipAmt;
  const perPerson = people ? total / Number(people) : total;
  return (
    <ToolPage
      title="Tip Calculator"
      description="Calculate tips and split bills"
    >
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label>Bill Amount ($)</Label>
            <Input
              type="number"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              data-ocid="tip.input"
            />
          </div>
          <div>
            <Label>Tip Percentage</Label>
            <div className="flex gap-2 mt-1">
              {[10, 15, 18, 20, 25].map((t) => (
                <Button
                  key={t}
                  size="sm"
                  variant={tip === String(t) ? "default" : "outline"}
                  onClick={() => setTip(String(t))}
                >
                  {t}%
                </Button>
              ))}
            </div>
            <Input
              type="number"
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label>Number of People</Label>
            <Input
              type="number"
              value={people}
              min={1}
              onChange={(e) => setPeople(e.target.value)}
            />
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Tip Amount</span>
              <span className="font-bold">${tipAmt.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span>Per Person</span>
              <span className="font-bold text-teal">
                ${perPerson.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </ToolPage>
  );
}

export function CompoundInterest() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("10");
  const [freq, setFreq] = useState("12");
  const r = Number(rate) / 100;
  const n = Number(freq);
  const t = Number(years);
  const p = Number(principal);
  const amount = p * (1 + r / n) ** (n * t);
  const interest = amount - p;
  return (
    <ToolPage
      title="Compound Interest Calculator"
      description="Calculate compound interest over time"
    >
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label>Principal ($)</Label>
            <Input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              data-ocid="compound.input"
            />
          </div>
          <div>
            <Label>Annual Interest Rate (%)</Label>
            <Input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
          <div>
            <Label>Time (years)</Label>
            <Input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
            />
          </div>
          <div>
            <Label>Compound Frequency</Label>
            <div className="flex gap-2 mt-1">
              {[
                { v: "1", l: "Yearly" },
                { v: "4", l: "Quarterly" },
                { v: "12", l: "Monthly" },
                { v: "365", l: "Daily" },
              ].map((o) => (
                <Button
                  key={o.v}
                  size="sm"
                  variant={freq === o.v ? "default" : "outline"}
                  onClick={() => setFreq(o.v)}
                >
                  {o.l}
                </Button>
              ))}
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Final Amount</span>
              <span className="font-bold text-teal text-xl">
                ${amount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Interest Earned</span>
              <span>${interest.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </ToolPage>
  );
}

export function TemperatureConverter() {
  const [celsius, setCelsius] = useState("100");
  const c = Number(celsius);
  const fahrenheit = ((c * 9) / 5 + 32).toFixed(2);
  const kelvin = (c + 273.15).toFixed(2);
  const rankine = (((c + 273.15) * 9) / 5).toFixed(2);
  return (
    <ToolPage
      title="Temperature Converter"
      description="Convert between temperature scales"
    >
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label>Celsius (°C)</Label>
            <Input
              type="number"
              value={celsius}
              onChange={(e) => setCelsius(e.target.value)}
              data-ocid="temp.input"
            />
          </div>
          <div className="space-y-3">
            {[
              { l: "Fahrenheit (°F)", v: fahrenheit },
              { l: "Kelvin (K)", v: kelvin },
              { l: "Rankine (°R)", v: rankine },
            ].map((item) => (
              <div
                key={item.l}
                className="p-3 bg-muted rounded flex justify-between"
              >
                <span className="text-sm">{item.l}</span>
                <span className="font-bold text-teal">{item.v}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </ToolPage>
  );
}

type UnitGroup = { name: string; units: { label: string; factor: number }[] };
const UNIT_GROUPS: UnitGroup[] = [
  {
    name: "Length",
    units: [
      { label: "Meters", factor: 1 },
      { label: "Kilometers", factor: 0.001 },
      { label: "Miles", factor: 0.000621371 },
      { label: "Feet", factor: 3.28084 },
      { label: "Inches", factor: 39.3701 },
      { label: "Centimeters", factor: 100 },
    ],
  },
  {
    name: "Weight",
    units: [
      { label: "Kilograms", factor: 1 },
      { label: "Grams", factor: 1000 },
      { label: "Pounds", factor: 2.20462 },
      { label: "Ounces", factor: 35.274 },
      { label: "Tons", factor: 0.001 },
    ],
  },
  {
    name: "Volume",
    units: [
      { label: "Liters", factor: 1 },
      { label: "Milliliters", factor: 1000 },
      { label: "Gallons", factor: 0.264172 },
      { label: "Cups", factor: 4.22675 },
      { label: "Fluid Oz", factor: 33.814 },
    ],
  },
];

export function UnitConverter() {
  const [group, setGroup] = useState(0);
  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] = useState(0);
  const units = UNIT_GROUPS[group].units;
  const baseValue = Number(value) / units[fromUnit].factor;
  return (
    <ToolPage
      title="Unit Converter"
      description="Convert between length, weight, and volume units"
    >
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex gap-2">
            {UNIT_GROUPS.map((g, i) => (
              <Button
                key={g.name}
                variant={group === i ? "default" : "outline"}
                onClick={() => {
                  setGroup(i);
                  setFromUnit(0);
                }}
                data-ocid="unit.primary_button"
              >
                {g.name}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Value</Label>
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                data-ocid="unit.input"
              />
            </div>
            <div>
              <Label>From Unit</Label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(Number(e.target.value))}
                className="w-full border rounded px-3 py-2 bg-background text-foreground"
              >
                {units.map((u, i) => (
                  <option key={u.label} value={i}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {units.map((u) => (
              <div key={u.label} className="p-3 bg-muted rounded">
                <p className="text-xs text-muted-foreground">{u.label}</p>
                <p className="font-bold text-teal">
                  {(baseValue * u.factor).toFixed(4)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </ToolPage>
  );
}

export function RandomNumber() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [results, setResults] = useState<number[]>([]);
  const generate = () => {
    const nums = Array.from(
      { length: Number(count) },
      () =>
        Math.floor(Math.random() * (Number(max) - Number(min) + 1)) +
        Number(min),
    );
    setResults(nums);
  };
  const handleCopy = async () => {
    await copyToClipboard(results.join(", "));
    toast.success("Copied!");
  };
  return (
    <ToolPage
      title="Random Number Generator"
      description="Generate random numbers in a range"
    >
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Min</Label>
              <Input
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                data-ocid="random.input"
              />
            </div>
            <div>
              <Label>Max</Label>
              <Input
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label>Count</Label>
            <Input
              type="number"
              value={count}
              min={1}
              max={1000}
              onChange={(e) => setCount(e.target.value)}
            />
          </div>
          <Button
            onClick={generate}
            className="w-full bg-gradient-to-r from-amber to-teal"
            data-ocid="random.primary_button"
          >
            Generate
          </Button>
          {results.length > 0 && (
            <>
              <div className="p-4 bg-muted rounded">
                {results.length === 1 ? (
                  <p className="text-5xl font-bold text-center text-teal">
                    {results[0]}
                  </p>
                ) : (
                  <p className="font-mono text-sm break-all">
                    {results.join(", ")}
                  </p>
                )}
              </div>
              <Button
                onClick={handleCopy}
                variant="outline"
                className="w-full"
                data-ocid="random.secondary_button"
              >
                Copy
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </ToolPage>
  );
}

export function PrimeChecker() {
  const [input, setInput] = useState("17");
  const n = Number.parseInt(input);
  const isPrime = (num: number): boolean => {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(num); i += 2)
      if (num % i === 0) return false;
    return true;
  };
  const prime = !Number.isNaN(n) && isPrime(n);
  const nextPrime = (() => {
    let p = n + 1;
    while (!isPrime(p)) p++;
    return p;
  })();
  return (
    <ToolPage
      title="Prime Number Checker"
      description="Check if a number is prime"
    >
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label>Number</Label>
            <Input
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="text-lg"
              data-ocid="prime.input"
            />
          </div>
          {input && !Number.isNaN(n) && (
            <>
              <div
                className={`p-6 text-center rounded-lg ${prime ? "bg-teal/20" : "bg-muted"}`}
              >
                <p
                  className={`text-2xl font-bold ${prime ? "text-teal" : "text-foreground"}`}
                >
                  {prime ? `✓ ${n} is PRIME` : `✗ ${n} is NOT prime`}
                </p>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Next prime after {n}:{" "}
                <span className="font-bold text-teal">{nextPrime}</span>
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </ToolPage>
  );
}

export function FibonacciGenerator() {
  const [count, setCount] = useState(10);
  const fib: number[] = [0, 1];
  for (let i = 2; i < Math.min(count, 50); i++)
    fib.push(fib[i - 1] + fib[i - 2]);
  const result = fib.slice(0, count).join(", ");
  const handleCopy = async () => {
    await copyToClipboard(result);
    toast.success("Copied!");
  };
  return (
    <ToolPage
      title="Fibonacci Generator"
      description="Generate Fibonacci sequence numbers"
    >
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label>Count (max 50)</Label>
            <Input
              type="number"
              value={count}
              min={1}
              max={50}
              onChange={(e) => setCount(Number(e.target.value))}
              data-ocid="fibonacci.input"
            />
          </div>
          <div className="p-4 bg-muted rounded font-mono text-sm">{result}</div>
          <Button
            onClick={handleCopy}
            variant="outline"
            className="w-full"
            data-ocid="fibonacci.secondary_button"
          >
            Copy Sequence
          </Button>
        </CardContent>
      </Card>
    </ToolPage>
  );
}

export function GCDLCMCalc() {
  const [a, setA] = useState("12");
  const [b, setB] = useState("18");
  const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
  const na = Number(a);
  const nb = Number(b);
  const g =
    !Number.isNaN(na) && !Number.isNaN(nb) && na > 0 && nb > 0
      ? gcd(na, nb)
      : null;
  const l = g ? (na * nb) / g : null;
  return (
    <ToolPage
      title="GCD & LCM Calculator"
      description="Find the Greatest Common Divisor and Least Common Multiple"
    >
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Number A</Label>
              <Input
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
                data-ocid="gcdlcm.input"
              />
            </div>
            <div>
              <Label>Number B</Label>
              <Input
                type="number"
                value={b}
                onChange={(e) => setB(e.target.value)}
              />
            </div>
          </div>
          {g !== null && (
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 text-center bg-muted rounded">
                <p className="text-xs text-muted-foreground">GCD</p>
                <p className="text-3xl font-bold text-teal">{g}</p>
              </div>
              <div className="p-4 text-center bg-muted rounded">
                <p className="text-xs text-muted-foreground">LCM</p>
                <p className="text-3xl font-bold text-amber">{l}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </ToolPage>
  );
}

export function TimestampConverter() {
  const [ts, setTs] = useState(String(Math.floor(Date.now() / 1000)));
  const [dateStr, setDateStr] = useState(new Date().toISOString().slice(0, 16));
  const fromTs = new Date(Number(ts) * 1000);
  const toTs = Math.floor(new Date(dateStr).getTime() / 1000);
  return (
    <ToolPage
      title="Timestamp Converter"
      description="Convert Unix timestamps to dates and back"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Unix → Date</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              value={ts}
              onChange={(e) => setTs(e.target.value)}
              placeholder="Unix timestamp..."
              className="font-mono"
              data-ocid="timestamp.input"
            />
            <div className="space-y-2">
              <div className="p-2 bg-muted rounded text-sm">
                UTC: {fromTs.toUTCString()}
              </div>
              <div className="p-2 bg-muted rounded text-sm">
                Local: {fromTs.toLocaleString()}
              </div>
              <div className="p-2 bg-muted rounded text-sm">
                ISO: {fromTs.toISOString()}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Date → Unix</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              type="datetime-local"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
            />
            <div className="p-4 text-center bg-muted rounded">
              <p className="text-3xl font-bold font-mono text-teal">{toTs}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Unix timestamp
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolPage>
  );
}

export function ScientificCalculator() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const calculate = useCallback(() => {
    try {
      // Safe evaluation using Function
      const safeExpr = expr
        .replace(/sqrt/g, "Math.sqrt")
        .replace(/cbrt/g, "Math.cbrt")
        .replace(/sin/g, "Math.sin")
        .replace(/cos/g, "Math.cos")
        .replace(/tan/g, "Math.tan")
        .replace(/log/g, "Math.log10")
        .replace(/ln/g, "Math.log")
        .replace(/pi/g, "Math.PI")
        .replace(/e(?![0-9])/g, "Math.E")
        .replace(/\^/g, "**");
      const res = new Function(`return ${safeExpr}`)();
      const r = String(res);
      setResult(r);
      setHistory((prev) => [`${expr} = ${r}`, ...prev.slice(0, 9)]);
    } catch {
      setResult("Error");
    }
  }, [expr]);

  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "(",
    "+",
    ")",
    "^",
    "sqrt(",
    "sin(",
    "cos(",
    "tan(",
    "log(",
    "pi",
    "C",
    "=",
  ];

  const handleBtn = (v: string) => {
    if (v === "C") {
      setExpr("");
      setResult(null);
    } else if (v === "=") calculate();
    else setExpr((prev) => prev + v);
  };

  return (
    <ToolPage
      title="Scientific Calculator"
      description="Full-featured scientific calculator"
    >
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6 space-y-4">
          <Input
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && calculate()}
            className="font-mono text-lg h-12"
            placeholder="Enter expression..."
            data-ocid="calc.input"
          />
          {result !== null && (
            <div
              className={`p-3 text-right text-2xl font-bold font-mono rounded ${result === "Error" ? "bg-destructive/20 text-destructive" : "bg-muted text-teal"}`}
            >
              {result}
            </div>
          )}
          <div className="grid grid-cols-6 gap-1">
            {buttons.map((btn, i) => (
              <Button
                // biome-ignore lint/suspicious/noArrayIndexKey: calculator button
                key={`btn-${i}`}
                variant="outline"
                size="sm"
                onClick={() => handleBtn(btn)}
                className={
                  btn === "="
                    ? "bg-gradient-to-r from-amber to-teal text-white border-0 col-span-1"
                    : btn === "C"
                      ? "bg-destructive/20"
                      : ""
                }
                data-ocid={btn === "=" ? "calc.primary_button" : undefined}
              >
                {btn}
              </Button>
            ))}
          </div>
          {history.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">History</p>
              {history.map((h, i) => (
                <p
                  // biome-ignore lint/suspicious/noArrayIndexKey: history item
                  key={`hist-${i}`}
                  className="text-xs font-mono text-muted-foreground"
                >
                  {h}
                </p>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </ToolPage>
  );
}
