"use client";

// so it doesn't conflict with Image() constructor
import { default as NextImage } from "next/image";

import { memo, useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";
import { cn } from "@/lib/utils";

const fac = new FastAverageColor();

export const ProgressBar = memo(() => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;

        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pr-6">
      <div className="h-3 w-full overflow-hidden rounded-full bg-white/50">
        <div
          className="h-3 rounded-full bg-white/50 transition-all duration-1000 ease-linear will-change-[width]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
});
ProgressBar.displayName = "ProgressBar";

const example_song = {
  track_id: "5lDlLjV79Wgl2d9LjpMgXd",
  timestamps: {
    start: 1696816775703,
    end: 1696816976430,
  },
  album: "letter@1.0.0",
  album_art_url:
    "https://i.scdn.co/image/ab67616d0000b2734f42e459b2f0cec114e6bf7c",
  artist: "alistair",
  song: "letter@1.0.0",
};

type Props = {
  borderRadius: number[];
  type: "text" | "image";
  opacity: number[];
  enableColor: boolean;
  disableBorder: boolean;
};

// map borderRadius to tailwind classes
// 0 (None) -> ["rounded-none", "rounded-none"]
// 25 (Small) -> ["rounded-sm", "rounded-sm"]
// 50 (Medium) -> ["rounded-[18px]", "rounded-xl"]
// 75 (Large) -> ["rounded-lg", "rounded-lg"]
// 100 (Full) -> ["rounded-full", "rounded-full"]
// first is container, second is image
const brClasses = {
  0: ["0px", "0px"],
  25: ["12px", "8px"],
  50: ["18px", "12px"],
  75: ["24px", "16px"],
  100: ["9999px", "9999px"],
};

const CustomizableSong = ({
  type,
  opacity,
  enableColor,
  borderRadius,
  disableBorder,
}: Props) => {
  const [backgroundRGB, setBackgroundRGB] = useState("0 0 0");
  const [borderColor, setBorderColor] = useState("rgba(38 38 38 / 1)");

  useEffect(() => {
    if (example_song.album_art_url && enableColor) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = example_song.album_art_url;

      img.onload = () => {
        // get the average color of the image for the background
        fac
          .getColorAsync(img)
          .then((color) => {
            const rgb = `${color.value[0]} ${color.value[1]} ${color.value[2]}`;

            setBackgroundRGB(rgb);
          })
          .catch((e) => {
            console.error(e);
          });

        // get the dominant color of the image for the border
        fac.getColorAsync(img, { algorithm: "dominant" }).then((color) => {
          const rgb = `${color.value[0]} ${color.value[1]} ${color.value[2]}`;

          setBorderColor(`rgba(${rgb} / 40%)`);
        });
      };
    }

    if (!enableColor) {
      setBackgroundRGB("0 0 0");
      setBorderColor("rgba(38 38 38 / 1)");
    }
  }, [enableColor]);

  if (type === "text") {
    return (
      <h1 className="text-center text-4xl font-bold">
        {example_song.song} - {example_song.artist.replaceAll(";", ", ")}
      </h1>
    );
  }

  const backgroundColor = `rgba(${backgroundRGB} / ${opacity}%)`;

  return (
    <div
      className={cn(
        "flex max-w-[400px] select-none space-x-3 p-3 transition-colors",
        brClasses[borderRadius[0] as keyof typeof brClasses][0],
      )}
      style={{
        backgroundColor,
        borderColor,
        borderRadius: brClasses[borderRadius[0] as keyof typeof brClasses][0],
        borderWidth: disableBorder ? 0 : 2,
      }}
    >
      <div className="flex-shrink-0">
        {example_song.album_art_url && (
          <NextImage
            src={example_song.album_art_url}
            alt={example_song.song}
            height={84}
            width={84}
            className={"aspect-square"}
            style={{
              borderRadius:
                brClasses[borderRadius[0] as keyof typeof brClasses][1],
            }}
          />
        )}
      </div>

      <div className="flex w-full flex-col justify-center space-y-2 overflow-hidden">
        <div>
          <p className="truncate text-2xl font-bold leading-normal text-white">
            {example_song.song}
          </p>
          <p className="truncate text-white">
            {example_song.artist.replaceAll(";", ", ")}
          </p>
        </div>
        <ProgressBar />
      </div>
    </div>
  );
};

export default CustomizableSong;
