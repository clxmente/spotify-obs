"use client";

import type { Spotify } from "use-lanyard";

import Image from "next/image";

import { useLanyardWS } from "use-lanyard";
import { useEffect, useState } from "react";
import { useThrottle } from "@/lib/throttle";

interface SongProps {
  discord_id: string;
}

type DiscordIdType = `${bigint}`;

const Song = ({ discord_id }: SongProps) => {
  const data = useLanyardWS(discord_id as DiscordIdType);

  const [, rerender] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      rerender({});
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!data || !data.spotify) {
    return <></>;
  }

  const total = data.spotify.timestamps.end - data.spotify.timestamps.start;
  const progress =
    100 - (100 * (data.spotify.timestamps.end - new Date().getTime())) / total;

  return (
    <div className="flex h-[200px] w-[800px] space-x-8 rounded-[18px] border-2 border-neutral-800 bg-black/60 p-3">
      <div className="flex-shrink-0">
        {data.spotify.album_art_url && (
          <Image
            src={data?.spotify?.album_art_url}
            alt={data?.spotify?.song}
            height={172}
            width={172}
            className="aspect-square rounded-xl"
          />
        )}
      </div>

      <div className="flex w-full flex-col justify-center space-y-4 overflow-hidden">
        <div className="space-y-2">
          <p className="truncate text-5xl font-bold text-white">
            {data?.spotify?.song}
          </p>
          <p className="truncate text-3xl text-white">
            {data?.spotify?.artist}
          </p>
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

// original
// export const Song = ({ data, progress }: SongProps) => {
//   return (
//     <div className="h-full w-full p-1">
//       <div className="flex h-full space-x-8 rounded-2xl border-2 border-neutral-800 bg-black/60 p-4">
//         <div className="flex-shrink-0">
//           <img
//             src={data.album_art_url!}
//             alt={data.song}
//             className="aspect-square h-full rounded-md"
//           />
//         </div>

//         <div className="flex w-full flex-col justify-center space-y-4 overflow-hidden">
//           <div className="space-y-2">
//             <p className="truncate text-5xl font-bold">{data.song}</p>
//             <p className="text- truncate text-3xl">{data.artist}</p>
//           </div>

//           <div className="pr-6">
//             <div className="h-3 w-full rounded-full bg-white/50">
//               <div
//                 className="h-3 rounded-full bg-white/50 transition-all duration-1000 ease-linear will-change-[width]"
//                 style={{ width: `${progress}%` }}
//               ></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Song;
