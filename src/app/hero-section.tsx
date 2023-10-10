"use client";

import { useState } from "react";

import { Song } from "@/app/song";
import { DiscordLogo } from "@/app/discord-logo";

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

export const HeroSection = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  return (
    <section
      className="mx-auto flex min-h-screen flex-col items-center justify-center px-5 py-8 md:py-0"
      onMouseMove={(e) => {
        const middleX = e.currentTarget.offsetWidth / 2;
        const middleY = e.currentTarget.offsetHeight / 2;

        const relativeX = e.clientX - e.currentTarget.offsetLeft;
        // window.scrollY is needed because the Y value gets really big/small when scrolling so it causes the rotation to be too extreme
        const relativeY =
          e.clientY - e.currentTarget.offsetTop + window.scrollY;

        setMouseX(((relativeX - middleX) / middleX) * 25);
        setMouseY(((relativeY - middleY) / middleY) * 25);
      }}
      // onMouseLeave={() => {
      //   setMouseX(0);
      //   setMouseY(0);
      // }}
    >
      <div className="flex max-w-6xl flex-col items-center gap-8 md:flex-row">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl font-bold md:text-6xl">
            Display your Spotify songs in OBS
          </h1>
          <h1 className="text-neutral-400">
            Leverages the{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/phineas/lanyard"
              className="text-red-700 hover:underline"
            >
              Lanyard
            </a>{" "}
            API which monitors your Discord presence. Get started by joining the
            Lanyard Discord server.
          </h1>
          <button className="flex items-center rounded-md bg-[#5865F2] px-3 py-2 font-medium text-white hover:bg-[#5865F2]/80">
            <DiscordLogo className="mr-2 h-5 w-5" />
            Join Lanyard
          </button>
        </div>
        <Song
          data={example_song}
          progress={50}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      </div>
    </section>
  );
};
