"use client";

import type { Snowflake } from "use-lanyard";

// so it doesn't conflict with Image() constructor
import { default as NextImage } from "next/image";

import { useLanyardWS } from "use-lanyard";
import { useThrottle } from "@/lib/throttle";
import { useSearchParams } from "next/navigation";
import { memo, useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";
import { AnimatePresence, motion } from "framer-motion";

const fac = new FastAverageColor();

interface ProgressProps {
  start: number;
  end: number;
}

const ProgressBar = memo(({ start, end }: ProgressProps) => {
  const [, rerender] = useState({});

  const total = end - start;
  const progress = 100 - (100 * (end - new Date().getTime())) / total;

  useEffect(() => {
    const interval = setInterval(() => {
      rerender({});
    }, 1000);

    return () => clearInterval(interval);
  }, [start, end]);

  return (
    <div className="pr-16">
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

const brClasses = {
  0: ["0px", "0px"],
  25: ["12px", "8px"],
  50: ["18px", "12px"],
  75: ["24px", "16px"],
  100: ["9999px", "9999px"],
};

interface SongProps {
  discord_id: Snowflake;
}

const Song = ({ discord_id }: SongProps) => {
  const data = useThrottle(useLanyardWS(discord_id));

  const opts = useSearchParams();

  const [backgroundRGB, setBackgroundRGB] = useState("0 0 0");
  const [borderColor, setBorderColor] = useState("rgba(38 38 38 / 1)");

  useEffect(() => {
    if (!data || !data.spotify) return;

    if (
      data?.spotify?.album_art_url &&
      (opts.get("color") === "true" || opts.get("c") === "t")
    ) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = data.spotify.album_art_url;

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
  }, [data, opts, data?.spotify?.album_art_url]);

  if (!data || !data.spotify) {
    return (
      <AnimatePresence mode="wait">
        <motion.div key="null"></motion.div>
      </AnimatePresence>
    );
  }

  const artist =
    opts.get("tr") === "t"
      ? data.spotify.artist.split(";")[0]
      : data.spotify.artist;

  if (opts.get("type") === "text" || opts.get("t") === "text") {
    if (opts.get("f") === "t") {
      return (
        <AnimatePresence mode="wait">
          <motion.h1
            key="text1"
            className="text-center text-4xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {artist.replaceAll(";", ", ")} - {data.spotify.song}
          </motion.h1>
        </AnimatePresence>
      );
    }

    return (
      <AnimatePresence mode="wait">
        <motion.h1
          key="text2"
          className="text-center text-4xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {data.spotify.song} - {artist.replaceAll(";", ", ")}
        </motion.h1>
      </AnimatePresence>
    );
  }

  const opacity = opts.get("opacity") || opts.get("o") || 60;
  const backgroundColor = `rgba(${backgroundRGB} / ${opacity}%)`;

  const borderRadius =
    brClasses[(opts.get("br") || 50) as keyof typeof brClasses];

  const borderWidth = opts.get("b") === "f" ? 0 : 2;

  const { start, end } = data.spotify.timestamps;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="flex h-[200px] w-[800px] space-x-8 rounded-[18px] border-2 border-neutral-800 p-3 transition-colors duration-700"
        style={{
          backgroundColor,
          borderColor,
          borderWidth,
          borderRadius: borderRadius[0],
        }}
        key="song"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex-shrink-0">
          {data.spotify.album_art_url && (
            <NextImage
              src={data.spotify.album_art_url}
              alt={data.spotify.song}
              height={172}
              width={172}
              className="aspect-square rounded-xl"
              style={{
                borderRadius: borderRadius[1],
              }}
              unoptimized={true}
            />
          )}
        </div>

        <div className="flex w-full flex-col justify-center space-y-4 overflow-hidden">
          <div>
            <p className="truncate text-5xl font-bold leading-normal text-white">
              {data.spotify.song}
            </p>
            <p className="truncate text-3xl text-white">
              {artist.replaceAll(";", ", ")}
            </p>
          </div>
          <ProgressBar start={start} end={end} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Song;
