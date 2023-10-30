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

// map borderRadius to a preset label
const labels = {
  0: "None",
  25: "Small",
  50: "Medium",
  75: "Large",
  100: "Full",
};

type DefaultProps = {
  opacity: number[];
  setOpacity: Dispatch<SetStateAction<number[]>>;
  enableColor: boolean;
  setEnableColor: Dispatch<SetStateAction<boolean>>;
  disableBorder: boolean;
  setDisableBorder: Dispatch<SetStateAction<boolean>>;
  borderRadius: number[];
  setBorderRadius: Dispatch<SetStateAction<number[]>>;
  trimArtist: boolean;
  setTrimArtist: Dispatch<SetStateAction<boolean>>;
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
  trimArtist,
  setTrimArtist,
}: DefaultProps) {
  return (
    <>
      {/* Adaptive Color Switch */}
      <div className="grid grid-cols-2 items-center gap-8 md:grid-cols-3">
        <div className="flex items-center space-x-2 md:justify-center">
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
        <div className="flex items-center space-x-2 md:justify-center">
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

        {/* Flip Order Switch */}
        <div className="flex items-center space-x-2 md:justify-center">
          <Switch
            id="trim-artist"
            checked={trimArtist}
            onCheckedChange={() => setTrimArtist((p) => !p)}
          />
          <label
            htmlFor="trim-artist"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Trim Artist
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

      <section className="space-y-3">
        <h3 className="pt-6 text-2xl font-bold">Options</h3>
        <ul className="list-inside list-disc space-y-2 text-neutral-400">
          <li>
            <span className="font-bold text-white">Adaptive Color</span> -
            Changes the background color of the song display to match the album
            art.
          </li>
          <li>
            <span className="font-bold text-white">Disable Border</span> -
            Disable the border of the component.
          </li>
          <li>
            <span className="font-bold text-white">Trim Artist</span> - Only
            shows the primary artist for the song.
          </li>
          <li>
            <span className="font-bold text-white">Opacity</span> - Changes the
            opacity of the background color. Default is 60%.
          </li>
          <li>
            <span className="font-bold text-white">Border Radius</span> -
            Changes how rounded the corners of the component and album art are.
            Default is Medium.
          </li>
        </ul>
      </section>
    </>
  );
}

type TextOnlyProps = {
  flipOrder: boolean;
  setFlipOrder: Dispatch<SetStateAction<boolean>>;
  trimArtist: boolean;
  setTrimArtist: Dispatch<SetStateAction<boolean>>;
};

function TextOnly({
  flipOrder,
  setFlipOrder,
  trimArtist,
  setTrimArtist,
}: TextOnlyProps) {
  return (
    <>
      <div className="flex items-center justify-between space-x-4 sm:justify-normal">
        {/* Flip Order Switch */}
        <div className="flex items-center space-x-2">
          <Switch
            id="flip-order"
            checked={flipOrder}
            onCheckedChange={() => setFlipOrder((p) => !p)}
          />
          <label
            htmlFor="flip-order"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Flip Order
          </label>
        </div>
        {/* Flip Order Switch */}
        <div className="flex items-center space-x-2">
          <Switch
            id="trim-artist"
            checked={trimArtist}
            onCheckedChange={() => setTrimArtist((p) => !p)}
          />
          <label
            htmlFor="trim-artist"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Trim Artist
          </label>
        </div>
      </div>

      <section className="space-y-3">
        <h3 className="pt-6 text-2xl font-bold">Options</h3>
        <ul className="list-inside list-disc space-y-2 text-neutral-400">
          <li>
            <span className="font-bold text-white">Flip Order</span> - Flips the
            order of the song and artist.
          </li>
          <li>
            <span className="font-bold text-white">Trim Artist</span> - Only
            shows the primary artist for the song.
          </li>
        </ul>
      </section>
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

  // text only
  const [flipOrder, setFlipOrder] = useState(false);
  const [trimArtist, setTrimArtist] = useState(false);

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
      setObsUrl((prev) => prev.replace(/&o=\d+/, ""));
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

  // text only
  useEffect(() => {
    // reset states to default values
    if (preset === "Text Only") {
      setOpacity([60]);
      setEnableColor(false);
      setDisableBorder(false);
      setBorderRadius([50]);
      if (!obsUrl.includes("&t=")) {
        setObsUrl((prev) => `${prev}&t=text`);
      }
    }

    if (preset === "Default") {
      setObsUrl((prev) => prev.replace(/&t=\w+/, ""));
      setFlipOrder(false);
    }
  }, [preset, obsUrl]);

  useEffect(() => {
    if (!flipOrder) {
      setObsUrl((prev) => prev.replace(/&f=\w+/, ""));
    } else {
      // first time setting flip order
      if (!obsUrl.includes("&f=")) {
        setObsUrl((prev) => `${prev}&f=t`);
      }
    }
  }, [flipOrder, obsUrl]);

  useEffect(() => {
    if (!trimArtist) {
      setObsUrl((prev) => prev.replace(/&tr=\w+/, ""));
    } else {
      // first time setting trim artist
      if (!obsUrl.includes("&tr=")) {
        setObsUrl((prev) => `${prev}&tr=t`);
      }
    }
  }, [trimArtist, obsUrl]);

  return (
    <>
      <div className="flex items-center justify-center bg-[url('/valorant.png')] bg-center px-0 py-8 md:p-8">
        <CustomizableSong
          borderRadius={borderRadius}
          disableBorder={disableBorder}
          enableColor={enableColor}
          opacity={opacity}
          type={preset === "Text Only" ? "text" : "image"}
          flipOrder={flipOrder}
          trimArtist={trimArtist}
        />
      </div>

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
          trimArtist={trimArtist}
          setTrimArtist={setTrimArtist}
        />
      )}

      {preset === "Text Only" && (
        <TextOnly
          flipOrder={flipOrder}
          setFlipOrder={setFlipOrder}
          trimArtist={trimArtist}
          setTrimArtist={setTrimArtist}
        />
      )}
    </>
  );
}

export default Manager;
