import Song from "@/app/[discord_id]/song";

export default function Page({ params }: { params: { discord_id: string } }) {
  return <Song discord_id={params.discord_id} />;
}