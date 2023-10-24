"use client";

import Image from "next/image";

interface SongProps {
  data: any; // import type { Spotify } from "use-lanyard" (currently broken)
  progress: number;
  mouseX: number;
  mouseY: number;
}

const Song = ({ data, progress, mouseX, mouseY }: SongProps) => {
  return (
    <div
      style={{
        transform: `perspective(1000px) rotateY(${mouseX}deg) rotateX(${
          -1 * mouseY
        }deg)`,
      }}
      className="hidden w-[600px] space-x-4 rounded-[18px] border-2 border-white/10 bg-black/20 p-3 lg:flex"
    >
      <div className="flex-shrink-0">
        <Image
          src={data.album_art_url!}
          alt={data.song}
          width={96}
          height={96}
          className="aspect-square rounded-md"
        />
      </div>

      <div className="flex w-full flex-col justify-center space-y-1 overflow-hidden">
        <div className="space-y-2">
          <p className="truncate text-2xl font-bold">{data.song}</p>
          <p className="truncate text-xl">{data.artist}</p>
        </div>
        <div className="pr-6">
          <div className="h-3 w-full rounded-full bg-white/50">
            <div
              className="h-3 rounded-full bg-white/50 transition-all duration-1000 ease-linear will-change-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Song;
