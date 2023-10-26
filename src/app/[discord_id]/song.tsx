"use client";

import type { Snowflake } from "use-lanyard";

// so it doesn't conflict with Image() constructor
import { default as NextImage } from "next/image";

import { useLanyardWS } from "use-lanyard";
import { useThrottle } from "@/lib/throttle";
import { useSearchParams } from "next/navigation";
import { memo, useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";

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

interface SongProps {
  discord_id: Snowflake;
}

const fac = new FastAverageColor();

const Song = ({ discord_id }: SongProps) => {
  const data = useThrottle(useLanyardWS(discord_id));

  const opts = useSearchParams();

  const [backgroundRGB, setBackgroundRGB] = useState("0 0 0");
  const [borderColor, setBorderColor] = useState("rgba(38 38 38 / 1");

  useEffect(() => {
    if (!data || !data.spotify) return;

    if (data?.spotify?.album_art_url && opts.get("color") === "true") {
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
    return <></>;
  }

  if (opts.get("type") === "text") {
    return (
      <h1 className="text-center text-4xl font-bold">
        {data.spotify.song} - {data.spotify.artist.replaceAll(";", ", ")}
      </h1>
    );
  }

  const opacity = opts.get("opacity") || 60;
  const backgroundColor = `rgba(${backgroundRGB} / ${opacity}%)`;

  const { start, end } = data.spotify.timestamps;

  return (
    <div
      className="flex h-[200px] w-[800px] space-x-8 rounded-[18px] border-2 border-neutral-800 p-3 transition-colors"
      style={{ backgroundColor, borderColor }}
    >
      <div className="flex-shrink-0">
        {data.spotify.album_art_url && (
          <NextImage
            src={data.spotify.album_art_url}
            alt={data.spotify.song}
            height={172}
            width={172}
            className="aspect-square rounded-xl"
          />
        )}
      </div>

      <div className="flex w-full flex-col justify-center space-y-4 overflow-hidden">
        <div>
          <p className="truncate text-5xl font-bold leading-normal text-white">
            {data.spotify.song}
          </p>
          <p className="truncate text-3xl text-white">
            {data.spotify.artist.replaceAll(";", ", ")}
          </p>
        </div>
        <ProgressBar start={start} end={end} />
      </div>
    </div>
  );
};

export default Song;
