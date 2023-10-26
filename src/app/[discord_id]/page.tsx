"use client";

import type { Snowflake } from "use-lanyard";

import Song from "@/app/[discord_id]/song";

export default function Page({
  params,
}: {
  params: { discord_id: Snowflake };
}) {
  return <Song discord_id={params.discord_id} />;
}
