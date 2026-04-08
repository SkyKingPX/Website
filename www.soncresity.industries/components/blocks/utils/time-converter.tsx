"use client";

import React, {useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Calendar, Clock, ArrowRight, RotateCcw} from "lucide-react";
import {Alert, AlertDescription} from "@/components/ui/alert";

type TimeSystem = 'earth' | 'sodonian' | 'infernian' | 'creator';

interface TimeInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

interface CreatorTimeInput {
  cycles: number;
  unit: 'cycles' | 'kC' | 'MC' | 'GC' | 'TC' | 'PC';
}

interface ConversionResult {
  system: TimeSystem;
  display: string;
  valid: boolean;
  error?: string;
}

export default function TimeConverter() {
  const [inputSystem, setInputSystem] = useState<TimeSystem>('earth');
  const [outputSystem, setOutputSystem] = useState<TimeSystem>('sodonian');
  const [timeInput, setTimeInput] = useState<TimeInput>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    hour: new Date().getHours(),
    minute: new Date().getMinutes()
  });
  const [creatorTimeInput, setCreatorTimeInput] = useState<CreatorTimeInput>({
    cycles: 0,
    unit: 'cycles'
  });
  const [result, setResult] = useState<ConversionResult | null>(null);

  const timeSystemNames = {
    earth: "Earth Time",
    sodonian: "Sodonian Time",
    infernian: "Infernian Time",
    creator: "Creator Time"
  };

  const timeSystemDescriptions = {
    earth: "Standard Earth calendar system (Gregorian calendar)",
    sodonian: "Similar to Earth time but with a different zero point reference",
    infernian: "Alternative time counting system (calculations pending)",
    creator: "Time measured in cycles (seconds since Big Bang ~13.8 billion years ago)"
  };

  // Sodonian time offset (example: 1000 years before Earth time)
  const SODONIAN_YEAR_OFFSET = -1000;

  // Creator Time constants (based on your Python script)
  const SECONDS_SINCE_BIG_BANG_TO_UNIX_EPOCH = 13.8e9 * 365.25 * 24 * 3600;

  const convertTimeInputToUnixTimestamp = (time: TimeInput): number => {
    const date = new Date(time.year, time.month - 1, time.day, time.hour, time.minute);
    return Math.floor(date.getTime() / 1000);
  };

  const convertUnixTimestampToTimeInput = (timestamp: number): TimeInput => {
    const date = new Date(timestamp * 1000);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes()
    };
  };

  const convertCyclesToUnixTimestamp = (cycles: number): number => {
    return cycles - SECONDS_SINCE_BIG_BANG_TO_UNIX_EPOCH;
  };

  const convertUnixTimestampToCycles = (timestamp: number): number => {
    return timestamp + SECONDS_SINCE_BIG_BANG_TO_UNIX_EPOCH;
  };

  const convertCreatorTimeToBaseCycles = (creatorTime: CreatorTimeInput): number => {
    const {cycles, unit} = creatorTime;
    switch (unit) {
      case 'cycles':
        return cycles;
      case 'kC':
        return cycles * 1e3;
      case 'MC':
        return cycles * 1e6;
      case 'GC':
        return cycles * 1e9;
      case 'TC':
        return cycles * 1e12;
      case 'PC':
        return cycles * 1e15;
      default:
        return cycles;
    }
  };

  const convertCyclesToCreatorTimeUnits = (cycles: number) => {
    return {
      cycles: cycles,
      kC: cycles / 1e3,
      MC: cycles / 1e6,
      GC: cycles / 1e9,
      TC: cycles / 1e12,
      PC: cycles / 1e15
    };
  };

  const convertTime = () => {
    try {
      // Validate input based on input system
      if (inputSystem !== 'creator') {
        if (timeInput.year < 1 || timeInput.month < 1 || timeInput.month > 12 ||
          timeInput.day < 1 || timeInput.day > 31 || timeInput.hour < 0 ||
          timeInput.hour > 23 || timeInput.minute < 0 || timeInput.minute > 59) {
          setResult({
            system: outputSystem,
            display: "Invalid input values",
            valid: false,
            error: "Please check your input values"
          });
          return;
        }
      }

      // Convert input to Unix timestamp first (as base reference)
      let unixTimestamp: number;

      switch (inputSystem) {
        case 'earth':
          unixTimestamp = convertTimeInputToUnixTimestamp(timeInput);
          break;
        case 'sodonian':
          const earthTimeFromSodonian = {
            ...timeInput,
            year: timeInput.year - SODONIAN_YEAR_OFFSET
          };
          unixTimestamp = convertTimeInputToUnixTimestamp(earthTimeFromSodonian);
          break;
        case 'infernian':
          setResult({
            system: outputSystem,
            display: "Infernian time conversion not yet implemented",
            valid: false,
            error: "Conversion calculations are pending implementation"
          });
          return;
        case 'creator':
          const baseCycles = convertCreatorTimeToBaseCycles(creatorTimeInput);
          unixTimestamp = convertCyclesToUnixTimestamp(baseCycles);
          break;
        default:
          unixTimestamp = convertTimeInputToUnixTimestamp(timeInput);
      }

      // Convert from Unix timestamp to target system
      switch (outputSystem) {
        case 'earth':
          const earthTime = convertUnixTimestampToTimeInput(unixTimestamp);
          const earthDisplay = `${earthTime.year.toString().padStart(4, '0')}-${earthTime.month.toString().padStart(2, '0')}-${earthTime.day.toString().padStart(2, '0')} ${earthTime.hour.toString().padStart(2, '0')}:${earthTime.minute.toString().padStart(2, '0')}`;
          setResult({
            system: outputSystem,
            display: earthDisplay,
            valid: true
          });
          break;
        case 'sodonian':
          const earthTimeForSodonian = convertUnixTimestampToTimeInput(unixTimestamp);
          const sodonianTime = {
            ...earthTimeForSodonian,
            year: earthTimeForSodonian.year + SODONIAN_YEAR_OFFSET
          };
          const sodonianDisplay = `${sodonianTime.year.toString().padStart(4, '0')}-${sodonianTime.month.toString().padStart(2, '0')}-${sodonianTime.day.toString().padStart(2, '0')} ${sodonianTime.hour.toString().padStart(2, '0')}:${sodonianTime.minute.toString().padStart(2, '0')} (Sodonian Era)`;
          setResult({
            system: outputSystem,
            display: sodonianDisplay,
            valid: true
          });
          break;
        case 'infernian':
          setResult({
            system: outputSystem,
            display: "Infernian time conversion not yet implemented",
            valid: false,
            error: "Conversion calculations are pending implementation"
          });
          return;
        case 'creator':
          const totalCycles = convertUnixTimestampToCycles(unixTimestamp);
          const creatorUnits = convertCyclesToCreatorTimeUnits(totalCycles);
          const creatorDisplay = `Cycles: ${creatorUnits.cycles.toExponential(3)}
Kilocycles: ${creatorUnits.kC.toExponential(3)}
Megacycles: ${creatorUnits.MC.toExponential(3)}
Gigacycles: ${creatorUnits.GC.toExponential(3)}
Teracycles: ${creatorUnits.TC.toExponential(3)}
Petacycles: ${creatorUnits.PC.toExponential(3)}`;
          setResult({
            system: outputSystem,
            display: creatorDisplay,
            valid: true
          });
          break;
        default:
          const defaultTime = convertUnixTimestampToTimeInput(unixTimestamp);
          const defaultDisplay = `${defaultTime.year.toString().padStart(4, '0')}-${defaultTime.month.toString().padStart(2, '0')}-${defaultTime.day.toString().padStart(2, '0')} ${defaultTime.hour.toString().padStart(2, '0')}:${defaultTime.minute.toString().padStart(2, '0')}`;
          setResult({
            system: outputSystem,
            display: defaultDisplay,
            valid: true
          });
      }

    } catch (error) {
      setResult({
        system: outputSystem,
        display: "Conversion failed",
        valid: false,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      });
    }
  };

  const handleInputChange = (field: keyof TimeInput, value: string) => {
    const numValue = parseInt(value) || 0;
    setTimeInput(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const handleCreatorTimeChange = (field: keyof CreatorTimeInput, value: string | number) => {
    if (field === 'cycles') {
      const numValue = parseFloat(value.toString()) || 0;
      setCreatorTimeInput(prev => ({
        ...prev,
        [field]: numValue
      }));
    } else {
      setCreatorTimeInput(prev => ({
        ...prev,
        [field]: value as 'cycles' | 'kC' | 'MC' | 'GC' | 'TC' | 'PC'
      }));
    }
  };

  const resetToCurrentTime = () => {
    const now = new Date();
    setTimeInput({
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      hour: now.getHours(),
      minute: now.getMinutes()
    });
    // Set creator time to current time in cycles
    const currentUnixTimestamp = Math.floor(now.getTime() / 1000);
    const currentCycles = convertUnixTimestampToCycles(currentUnixTimestamp);
    setCreatorTimeInput({
      cycles: currentCycles,
      unit: 'cycles'
    });
    setResult(null);
  };

  const swapSystems = () => {
    const temp = inputSystem;
    setInputSystem(outputSystem);
    setOutputSystem(temp);
    setResult(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5"/>
            Input Time
          </CardTitle>
          <CardDescription>
            Enter the time you want to convert from the selected time system.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="input-system">Input Time System</Label>
              <Select value={inputSystem} onValueChange={(value: TimeSystem) => setInputSystem(value)}>
                <SelectTrigger>
                  <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(timeSystemNames).map(([key, name]) => (
                    <SelectItem key={key} value={key}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                {timeSystemDescriptions[inputSystem]}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="output-system">Output Time System</Label>
              <Select value={outputSystem} onValueChange={(value: TimeSystem) => setOutputSystem(value)}>
                <SelectTrigger>
                  <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(timeSystemNames).map(([key, name]) => (
                    <SelectItem key={key} value={key}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                {timeSystemDescriptions[outputSystem]}
              </p>
            </div>
          </div>

          {/* Conditional Input Fields */}
          {inputSystem === 'creator' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="creator-cycles">Cycles Value</Label>
                <Input
                  id="creator-cycles"
                  type="number"
                  step="any"
                  value={creatorTimeInput.cycles}
                  onChange={(e) => handleCreatorTimeChange('cycles', e.target.value)}
                  placeholder="1.0e15"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="creator-unit">Unit</Label>
                <Select value={creatorTimeInput.unit}
                        onValueChange={(value: 'cycles' | 'kC' | 'MC' | 'GC' | 'TC' | 'PC') => handleCreatorTimeChange('unit', value)}>
                  <SelectTrigger>
                    <SelectValue/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cycles">Cycles</SelectItem>
                    <SelectItem value="kC">Kilocycles (kC)</SelectItem>
                    <SelectItem value="MC">Megacycles (MC)</SelectItem>
                    <SelectItem value="GC">Gigacycles (GC)</SelectItem>
                    <SelectItem value="TC">Teracycles (TC)</SelectItem>
                    <SelectItem value="PC">Petacycles (PC)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={timeInput.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  placeholder="2024"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="month">Month</Label>
                <Input
                  id="month"
                  type="number"
                  min="1"
                  max="12"
                  value={timeInput.month}
                  onChange={(e) => handleInputChange('month', e.target.value)}
                  placeholder="12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="day">Day</Label>
                <Input
                  id="day"
                  type="number"
                  min="1"
                  max="31"
                  value={timeInput.day}
                  onChange={(e) => handleInputChange('day', e.target.value)}
                  placeholder="31"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hour">Hour</Label>
                <Input
                  id="hour"
                  type="number"
                  min="0"
                  max="23"
                  value={timeInput.hour}
                  onChange={(e) => handleInputChange('hour', e.target.value)}
                  placeholder="23"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minute">Minute</Label>
                <Input
                  id="minute"
                  type="number"
                  min="0"
                  max="59"
                  value={timeInput.minute}
                  onChange={(e) => handleInputChange('minute', e.target.value)}
                  placeholder="59"
                />
              </div>
            </div>
          )}

          <div className="flex gap-2 flex-wrap">
            <Button onClick={convertTime} className="flex-1 md:flex-none">
              <ArrowRight className="h-4 w-4 mr-2"/>
              Convert Time
            </Button>
            <Button variant="outline" onClick={swapSystems}>
              <RotateCcw className="h-4 w-4 mr-2"/>
              Swap Systems
            </Button>
            <Button variant="outline" onClick={resetToCurrentTime}>
              <Clock className="h-4 w-4 mr-2"/>
              Use Current Time
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Result Section */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5"/>
              Conversion Result
            </CardTitle>
            <CardDescription>
              Time converted to {timeSystemNames[result.system]}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result.valid ? (
              <div className="p-4 bg-muted rounded-lg">
                {result.system === 'creator' ? (
                  <div className="space-y-1">
                    {result.display.split('\n').map((line, index) => (
                      <p key={index} className="text-sm font-mono">{line}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-lg font-mono">{result.display}</p>
                )}
              </div>
            ) : (
              <Alert>
                <AlertDescription>
                  <strong>Conversion Error:</strong> {result.error}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>Time System Information</CardTitle>
          <CardDescription>
            Learn about the different time systems available for conversion.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">Earth Time</h3>
              <p className="text-sm text-muted-foreground">
                The standard Gregorian calendar system used on Earth. Based on solar years with 365/366 days.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Sodonian Time</h3>
              <p className="text-sm text-muted-foreground">
                Similar calculation method to Earth time but with a different epoch/zero point. Currently set
                to {Math.abs(SODONIAN_YEAR_OFFSET)} years before Earth time.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Infernian Time</h3>
              <p className="text-sm text-muted-foreground">
                An alternative time counting system with different calculation methods. Implementation pending.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Creator Time</h3>
              <p className="text-sm text-muted-foreground">
                Time measured in cycles where each cycle equals one second since the Big Bang (~13.8 billion years ago).
                Includes units from cycles to petacycles for different scales of measurement.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}