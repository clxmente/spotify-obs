"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

import { CopyIcon } from "lucide-react";

type CustomizeProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

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
            onClick={() => navigator.clipboard.writeText(value)}
          >
            <CopyIcon className="h-4 w-4 group-hover:text-neutral-400" />
          </Button>
        )}
      </div>
    </div>
  );
}

const BASE_URL = "https://spotify-obs.com/";

export default function Customize({ open, setOpen }: CustomizeProps) {
  const [obsUrl, setObsUrl] = useState(BASE_URL);
  const [discordId, setDiscordId] = useState("");
  const [enableColor, setEnableColor] = useState(false);
  const [textOnly, setTextOnly] = useState(false);
  const [opacity, setOpacity] = useState([60]);

  useEffect(() => {
    setObsUrl(`https://spotify-obs.com/${discordId}?`);
  }, [discordId]);

  useEffect(() => {
    if (enableColor) {
      setTextOnly(false);
    }

    setObsUrl((prev) => {
      if (enableColor) {
        return prev + "&color=true";
      }

      return prev.replace("&color=true", "");
    });
  }, [enableColor]);

  useEffect(() => {
    if (textOnly) {
      setEnableColor(false);
      setObsUrl((prev) => prev + "&type=text");
    }

    if (!textOnly) {
      setObsUrl((prev) => prev.replace("&type=text", ""));
    }
  }, [textOnly, discordId]);

  useEffect(() => {
    if (opacity[0] === 60) {
      // default value so we don't need to add it to the URL
      setObsUrl((prev) => prev.replace(/&opacity=\d+/, ""));
    } else {
      // first time setting opacity
      if (!obsUrl.includes("&opacity=")) {
        setObsUrl((prev) => `${prev}&opacity=${opacity[0]}`);
      }

      // every other time
      if (opacity[0] !== 60) {
        setObsUrl((prev) =>
          prev.replace(/&opacity=\d+/, `&opacity=${opacity[0]}`),
        );
      }
    }
  }, [opacity, obsUrl]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Customize Spotify Component</DialogTitle>
          <DialogDescription>
            Change the look of the currently playing song. Copy the URL and
            paste it into your OBS browser source configuration.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <InlineInput
            label="URL"
            readOnly
            value={obsUrl}
            setValue={setObsUrl}
          />
          <div className="h-px w-full rounded-full bg-white/20" />

          <div className="space-y-4 pt-4">
            <InlineInput
              label="Discord ID"
              value={discordId}
              setValue={setDiscordId}
            />

            {/* Toggles */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-center space-x-2">
                <Switch
                  id="text-only"
                  checked={textOnly}
                  onCheckedChange={() => setTextOnly((p) => !p)}
                />
                <label
                  htmlFor="text-only"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Text Only
                </label>
              </div>

              <div className="flex items-center justify-center space-x-2">
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
            </div>

            {/* Slider */}
            <div className="space-y-2">
              <label
                htmlFor="opacity"
                className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Opacity{" "}
                <span className="text-sm text-neutral-500">({opacity}%)</span>
              </label>
              <Slider
                id="opacity"
                min={0}
                max={100}
                defaultValue={[60]}
                value={opacity}
                onValueChange={(value) => setOpacity(value)}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
