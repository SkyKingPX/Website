"use client"

import {useState} from "react";
import {motion} from "framer-motion";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {ArrowRight, Loader2} from "lucide-react";

type Rule = {
  min: number
  max: number
  mustBeLessThan: "miny" | "maxy" | null
  mustBeGreaterThan: "miny" | "maxy" | null
}

type Dimension = {
  name: string
  rules: { miny: Rule; maxy: Rule }
  defaults: { miny: number; maxy: number }
}

const versions = [
  {label: "1.21.11", value: "94.1"},
  {label: "1.21.9-1.21.10", value: "88"},
  {label: "1.21.7-1.21.8", value: "81"},
  {label: "1.21.6", value: "80"},
  {label: "1.21.5", value: "71"},
  {label: "1.21.4", value: "61"},
  {label: "1.21.2-1.21.3", value: "57"},
  {label: "1.21-1.21.1", value: "48"},
  {label: "1.20.5-1.20.6", value: "41"},
  {label: "1.20.3-1.20.4", value: "26"},
  {label: "1.20.2", value: "18"},
  {label: "1.20-1.20.1", value: "15"},
  {label: "1.19.4", value: "12"},
  {label: "1.19-1.19.3", value: "10"},
  {label: "1.18.2", value: "9"},
  {label: "1.18-1.18.1", value: "8"},
  {label: "1.17-1.17.1", value: "7"},
];

const dimensions: Dimension[] = [
  {
    name: "Overworld",
    rules: {
      miny: {min: -2032, max: 0, mustBeLessThan: "maxy", mustBeGreaterThan: null},
      maxy: {min: 1, max: 2032, mustBeLessThan: null, mustBeGreaterThan: "miny"}
    },
    defaults: {miny: -64, maxy: 320}
  },
  {
    name: "Overworld Caves",
    rules: {
      miny: {min: -2032, max: 0, mustBeLessThan: "maxy", mustBeGreaterThan: null},
      maxy: {min: 1, max: 2032, mustBeLessThan: null, mustBeGreaterThan: "miny"}
    },
    defaults: {miny: -64, maxy: 320}
  },
  {
    name: "Nether",
    rules: {
      miny: {min: 0, max: 0, mustBeLessThan: "maxy", mustBeGreaterThan: null},
      maxy: {min: 1, max: 2032, mustBeLessThan: null, mustBeGreaterThan: "miny"}
    },
    defaults: {miny: 0, maxy: 256}
  },
  {
    name: "End",
    rules: {
      miny: {min: -2032, max: 0, mustBeLessThan: "maxy", mustBeGreaterThan: null},
      maxy: {min: 1, max: 2032, mustBeLessThan: null, mustBeGreaterThan: "miny"}
    },
    defaults: {miny: 0, maxy: 256}
  },
];

export default function HeightDPGen() {
  const [selectedVersion, setSelectedVersion] = useState(versions[0]);
  const [values, setValues] = useState(dimensions.map(d => ({
    miny: d.defaults.miny.toString(),
    maxy: d.defaults.maxy.toString()
  })));
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const validateValue = (value: string, dim: Dimension, key: "miny" | "maxy") => {
    if (!value.trim()) return {isValid: false, message: "Value cannot be empty"};
    const num = Number(value);
    if (isNaN(num)) return {isValid: false, message: "Must be a number"};
    const rule = dim.rules[key];
    if (num < rule.min || num > rule.max) return {
      isValid: false,
      message: `Must be between ${rule.min} and ${rule.max}`
    };
    const other = Number(values[dimensions.indexOf(dim)][key === "miny" ? "maxy" : "miny"]);
    if (rule.mustBeLessThan && key === "miny" && num >= other) return {
      isValid: false,
      message: "Min must be less than Max"
    };
    if (rule.mustBeGreaterThan && key === "maxy" && num <= other) return {
      isValid: false,
      message: "Max must be greater than Min"
    };
    return {isValid: true, message: ""};
  };

  const handleValueChange = (idx: number, key: "miny" | "maxy", val: string) => {
    setValues(prev => prev.map((v, i) => i === idx ? {...v, [key]: val} : v));
    const dim = dimensions[idx];
    const {isValid, message} = validateValue(val, dim, key);
    setErrors(prev => ({...prev, [`${idx}_${key}`]: isValid ? "" : message}));
  };

  const handleDownload = async () => {
    const newErrors: { [key: string]: string } = {};
    dimensions.forEach((dim, idx) => (["miny", "maxy"] as const).forEach(key => {
      const val = values[idx][key];
      const {isValid, message} = validateValue(val, dim, key);
      if (!isValid) newErrors[`${idx}_${key}`] = message;
    }));
    setErrors(newErrors);
    if (Object.values(newErrors).some(msg => msg)) return;

    setIsGenerating(true);
    try {
      const params = new URLSearchParams({
        version: selectedVersion.label,
        packFormat: selectedVersion.value,
        ...Object.fromEntries(values.flatMap((v, i) => [
          [`h${i + 1}_min`, v.miny],
          [`h${i + 1}_max`, v.maxy],
        ])),
      });

      const res = await fetch(`/api/datapack?${params.toString()}`);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `si-heights-dp-${selectedVersion.label}.zip`;
      a.click();
      window.URL.revokeObjectURL(url);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-32">
      <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}
                  className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-serephixBold mb-4">Height <span
          className="text-primary">Datapack</span> Generator</h2>
        <p className="text-lg text-foreground/80">Customize dimension heights for your Minecraft world</p>
      </motion.div>

      <Card className="max-w-2xl mx-auto border border-accent-dark">
        <CardHeader className="text-center">
          <CardTitle>Configuration</CardTitle>
          <CardDescription>Select your Minecraft version and set dimension heights</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center gap-4">
            <label className="font-medium">Version:</label>
            <Select value={selectedVersion.value} onValueChange={val => {
              const v = versions.find(v => v.value === val);
              if (v) setSelectedVersion(v);
            }}>
              <SelectTrigger className="w-[220px]"><SelectValue placeholder="Select version"/></SelectTrigger>
              <SelectContent>{versions.map(v => <SelectItem key={v.value}
                                                            value={v.value}>{v.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          {dimensions.map((dim, idx) => (
            <div key={dim.name} className="space-y-2">
              <h4 className="font-medium text-center">{dim.name}</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input type="text" placeholder="Min Height" value={values[idx].miny}
                         onChange={e => handleValueChange(idx, "miny", e.target.value)}
                         className={`w-full rounded-md border border-accent px-3 py-2 text-center ${errors[`${idx}_miny`] ? "border-red-500" : "border-border bg-background"}`}/>
                  {errors[`${idx}_miny`] &&
                    <p className="mt-1 text-sm text-red-500 text-center">{errors[`${idx}_miny`]}</p>}
                </div>
                <div>
                  <input type="text" placeholder="Max Height" value={values[idx].maxy}
                         onChange={e => handleValueChange(idx, "maxy", e.target.value)}
                         className={`w-full rounded-md border border-accent px-3 py-2 text-center ${errors[`${idx}_maxy`] ? "border-red-500" : "border-border bg-background"}`}/>
                  {errors[`${idx}_maxy`] &&
                    <p className="mt-1 text-sm text-red-500 text-center">{errors[`${idx}_maxy`]}</p>}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleDownload} className="w-64 hover-scale" disabled={isGenerating}>
            {isGenerating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Generating Datapack...</> : <>Generate
              Datapack<ArrowRight className="ml-2 h-4 w-4"/></>}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
