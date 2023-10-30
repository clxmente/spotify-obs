"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import CustomizableSong from "@/app/customize/customizable-song";

import { CopyIcon } from "lucide-react";

type InlineInputProps = {
  label: string;
  value: string;
  setValue: (value: string) => void;
  readOnly?: boolean;
};

function InlineInput({ label, value, setValue, readOnly }: InlineInputProps) {
  return (
    <div className="flex w-full items-center">
      <label
        className="flex h-9 min-w-fit items-center rounded-md rounded-r-none border border-white/20 bg-[hsl(233,90%,7%)] px-3 text-sm text-neutral-400"
        htmlFor={label.replace(" ", "-")}
      >
        {label}
      </label>
      <div className="relative flex w-full items-center">
        <Input
          type="text"
          id={label.replace(" ", "-")}
          value={value}
          readOnly={readOnly ?? false}
          onChange={(e) => setValue(e.target.value)}
          className={cn(
            "h-9 text-ellipsis rounded-l-none border-l-0",
            readOnly
              ? "pr-9 text-xs focus:ring-0 focus:ring-inset focus-visible:outline-none focus-visible:ring-0"
              : "ring-offset-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2",
          )}
        />
        {readOnly && (
          <Button
            size="icon"
            variant="ghost"
            className="group absolute right-0 hover:bg-inherit dark:hover:bg-inherit"
            onClick={() => {
              toast({
                title: "Copied to clipboard!",
                description: "You can now paste it into OBS.",
              });
              navigator.clipboard.writeText(value);
            }}
          >
            <CopyIcon className="h-4 w-4 group-hover:text-neutral-400" />
          </Button>
        )}
      </div>
    </div>
  );
}

type DefaultProps = {
  opacity: number[];
  setOpacity: Dispatch<SetStateAction<number[]>>;
  enableColor: boolean;
  setEnableColor: Dispatch<SetStateAction<boolean>>;
  disableBorder: boolean;
  setDisableBorder: Dispatch<SetStateAction<boolean>>;
  borderRadius: number[];
  setBorderRadius: Dispatch<SetStateAction<number[]>>;
};

const labels = {
  0: "None",
  25: "Small",
  50: "Medium",
  75: "Large",
  100: "Full",
};

function Default({
  opacity,
  setOpacity,
  enableColor,
  setEnableColor,
  disableBorder,
  setDisableBorder,
  borderRadius,
  setBorderRadius,
}: DefaultProps) {
  return (
    <>
      {/* Adaptive Color Switch */}
      <div className="flex items-center justify-between space-x-4 sm:justify-normal">
        <div className="flex items-center space-x-2">
          <Switch
            id="enable-color"
            checked={enableColor}
            onCheckedChange={() => setEnableColor((p) => !p)}
          />
          <label
            htmlFor="enable-color"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Adaptive Color
          </label>
        </div>

        {/* Enable Border Switch */}
        <div className="flex items-center space-x-2">
          <Switch
            id="enable-border"
            checked={disableBorder}
            onCheckedChange={() => setDisableBorder((p) => !p)}
          />
          <label
            htmlFor="enable-color"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Disable Border
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
        {/* Opacity Slider */}
        <div className="w-full space-y-2">
          <p className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Opacity{" "}
            <span className="text-sm text-neutral-500">({opacity}%)</span>
          </p>
          <Slider
            id="opacity"
            min={0}
            max={100}
            defaultValue={[60]}
            value={opacity}
            onValueChange={(value) => setOpacity(value)}
          />
        </div>

        {/* Border Radius Slider */}
        <div className="w-full space-y-2">
          <p className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Border Radius{" "}
            <span className="text-sm text-neutral-500">
              ({labels[borderRadius[0] as keyof typeof labels]})
            </span>
          </p>
          <Slider
            id="borderRadius"
            min={0}
            max={100}
            defaultValue={[50]}
            value={borderRadius}
            step={25}
            onValueChange={(value) => setBorderRadius(value)}
          />
        </div>
      </div>
    </>
  );
}

const BASE_URL = process.env.NEXT_PUBLIC_DEVELOPMENT
  ? "http://localhost:3000/"
  : "https://spotify-obs.com/";

function Manager() {
  const [obsUrl, setObsUrl] = useState(BASE_URL);
  const [preset, setPreset] = useState("Default");
  const [discordId, setDiscordId] = useState("");

  // default
  const [opacity, setOpacity] = useState([60]);
  const [enableColor, setEnableColor] = useState(false);
  const [disableBorder, setDisableBorder] = useState(false);
  const [borderRadius, setBorderRadius] = useState([50]);

  useEffect(() => {
    setObsUrl(`${BASE_URL}${discordId}?`);
  }, [discordId]);

  useEffect(() => {
    if (!enableColor) {
      setObsUrl((prev) => prev.replace(/&c=\w+/, ""));
    } else {
      // first time setting color
      if (!obsUrl.includes("&c=")) {
        setObsUrl((prev) => `${prev}&c=t`);
      }

      // every other time
      if (enableColor) {
        setObsUrl((prev) => prev.replace(/&c=\w+/, "&c=t"));
      }
    }
  }, [enableColor, obsUrl]);

  useEffect(() => {
    if (!disableBorder) {
      setObsUrl((prev) => prev.replace(/&b=\w+/, ""));
    } else {
      // first time setting border
      if (!obsUrl.includes("&b=")) {
        setObsUrl((prev) => `${prev}&b=f`);
      }

      // every other time
      if (disableBorder) {
        setObsUrl((prev) => prev.replace(/&b=\w+/, "&b=f"));
      }
    }
  }, [disableBorder, obsUrl]);

  useEffect(() => {
    if (opacity[0] === 60) {
      // default value so we don't need to add it to the URL
      setObsUrl((prev) => prev.replace(/&opacity=\d+/, ""));
    } else {
      // first time setting opacity
      if (!obsUrl.includes("&o=")) {
        setObsUrl((prev) => `${prev}&o=${opacity[0]}`);
      }

      // every other time
      if (opacity[0] !== 60) {
        setObsUrl((prev) => prev.replace(/&o=\d+/, `&o=${opacity[0]}`));
      }
    }
  }, [opacity, obsUrl]);

  useEffect(() => {
    if (borderRadius[0] === 50) {
      // default value so we don't need to add it to the URL
      setObsUrl((prev) => prev.replace(/&br=\w+/, ""));
    } else {
      // first time setting opacity
      if (!obsUrl.includes("&br=")) {
        setObsUrl((prev) => `${prev}&br=${borderRadius[0]}`);
      }

      // every other time
      if (borderRadius[0] !== 50) {
        setObsUrl((prev) => prev.replace(/&br=\w+/, `&br=${borderRadius[0]}`));
      }
    }
  }, [borderRadius, obsUrl]);

  return (
    <>
      <CustomizableSong
        borderRadius={borderRadius}
        disableBorder={disableBorder}
        enableColor={enableColor}
        opacity={opacity}
        type={preset === "Text Only" ? "text" : "image"}
      />

      <InlineInput label="URL" readOnly value={obsUrl} setValue={setObsUrl} />
      <Select onValueChange={(val) => setPreset(val)} defaultValue={preset}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a preset" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Default">Default</SelectItem>
          <SelectItem value="Text Only">Text Only</SelectItem>
        </SelectContent>
      </Select>

      <InlineInput
        label="Discord ID"
        value={discordId}
        setValue={setDiscordId}
      />

      {preset === "Default" && (
        <Default
          opacity={opacity}
          setOpacity={setOpacity}
          enableColor={enableColor}
          setEnableColor={setEnableColor}
          disableBorder={disableBorder}
          setDisableBorder={setDisableBorder}
          borderRadius={borderRadius}
          setBorderRadius={setBorderRadius}
        />
      )}
    </>
  );
}

export default Manager;
