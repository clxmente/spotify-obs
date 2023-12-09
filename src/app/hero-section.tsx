"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { default as ExampleSong } from "@/app/example-song";

import { Button } from "@/components/ui/button";
import { DiscordLogo } from "@/components/discord-logo";

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

const HeroSection = () => {
  const router = useRouter();

  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const [discordID, setDiscordID] = useState("0");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // @ts-ignore
    window.umami.track("Hero Test");
    return router.push(`/${discordID}`);
  };

  return (
    <section
      className="flex min-h-[calc(100vh-65px)] w-full flex-col items-center justify-center px-5 py-8 md:py-0"
      onMouseMove={(e) => {
        const middleX = e.currentTarget.offsetWidth / 2;
        const middleY = e.currentTarget.offsetHeight / 2;

        const relativeX = e.clientX - e.currentTarget.offsetLeft;
        // window.scrollY is needed because the Y value gets really big/small when scrolling so it causes the rotation to be too extreme
        const relativeY =
          e.clientY - e.currentTarget.offsetTop + window.scrollY;

        setMouseX(((relativeX - middleX) / middleX) * 15);
        setMouseY(((relativeY - middleY) / middleY) * 15);
      }}
      // onMouseLeave={() => {
      //   setMouseX(0);
      //   setMouseY(0);
      // }}
    >
      <div className="relative flex max-w-6xl flex-col items-center justify-center gap-10 md:flex-row">
        <div className="pointer-events-none absolute flex h-[10rem] w-full select-none rounded-[50%] bg-[#6F32F0]/60 blur-[150px]" />
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl font-bold md:text-6xl">
            Display your Spotify songs in OBS
          </h1>
          <p className="max-w-[690px] text-neutral-400">
            Leverages the{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/phineas/lanyard"
              className="text-[#5865F2] hover:underline"
            >
              Lanyard
            </a>{" "}
            API which monitors your Discord presence. Get started by joining the
            Lanyard Discord server. After joining, start playing a song and test
            it out below!
          </p>
          <div className="space-y-5 md:flex md:items-center md:space-x-5 md:space-y-0">
            <Button className="flex bg-[#5865F2] hover:bg-[#5865F2]/80" asChild>
              <a
                href="https://discord.gg/UrXF2cfJ7F"
                target="_blank"
                rel="noreferrer"
              >
                <DiscordLogo className="mr-2 h-5 w-5" />
                Lanyard
              </a>
            </Button>
            <form
              className="relative flex items-center justify-center"
              onSubmit={handleFormSubmit}
            >
              <input
                type="text"
                className="w-full appearance-none rounded-md border border-white/20 bg-transparent px-3 py-2 text-white placeholder-white/30 outline-none transition-all hover:border-white/30 focus:border-white/50 md:pr-20"
                placeholder="Enter your Discord ID"
                onChange={(e) => setDiscordID(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-0 select-none pr-4 text-xs font-medium uppercase text-white/30 transition-colors hover:text-white/40"
              >
                submit
              </button>
            </form>
          </div>
        </div>
        <ExampleSong data={example_song} mouseX={mouseX} mouseY={mouseY} />
      </div>
    </section>
  );
};

export default HeroSection;
