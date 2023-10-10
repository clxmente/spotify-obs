"use client";

import type { Spotify } from "use-lanyard";

interface SongProps {
  data: Spotify;
  progress: number;
  mouseX: number;
  mouseY: number;
}

export const Song = ({ data, progress, mouseX, mouseY }: SongProps) => {
  return (
    <div
      style={{
        transform: `perspective(1000px) rotateY(${mouseX}deg) rotateX(${
          -1 * mouseY
        }deg)`,
      }}
      className="hidden w-[600px] space-x-4 rounded-[18px] border-2 border-neutral-800 bg-black/60 p-3 md:flex"
    >
      <div className="flex-shrink-0">
        <img
          src={data.album_art_url!}
          alt={data.song}
          className="aspect-square h-24 rounded-md"
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
