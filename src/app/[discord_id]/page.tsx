"use client";

import type { Snowflake } from "use-lanyard";

import Song from "@/app/[discord_id]/song";
import TrackView from "@/components/track-view";

export default function Page({
  params,
}: {
  params: { discord_id: Snowflake };
}) {
  return (
    <>
      <TrackView path="/:id" />
      <Song discord_id={params.discord_id} />
    </>
  );
}
