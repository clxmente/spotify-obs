import Link from "next/link";

import Nav from "@/components/nav";
import HeroSection from "@/app/hero-section";
import TrackView from "@/components/track-view";

export default function Home() {
  return (
    <>
      <TrackView path="/" />
      <div className="bg-purple-dark">
        <Nav />
        <main className="relative flex flex-col items-center overflow-x-clip">
          <div className="absolute -top-24 flex h-[10rem] w-[40rem] items-center justify-center rounded-[50%] bg-[#6F32F0] blur-[100px]" />
          <HeroSection />
          <section className="min-h-[calc(100vh-65px)] px-5 py-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-12 text-left">
              {/* getting-started */}
              <section className="space-y-4">
                <h2
                  className="scroll-mt-[81px] text-3xl font-bold"
                  id="getting-started"
                >
                  Getting Started
                </h2>
                <p className="text-neutral-400">
                  To get started, you first have to join the{" "}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://discord.gg/UrXF2cfJ7F"
                    className="text-[#5865F2] hover:underline"
                  >
                    Lanyard discord server
                  </a>
                  {". "}
                  Lanyard is an open-source API which hooks into your Discord
                  presence and monitors your activity. This is how your Spotify
                  status is able to be displayed in OBS in real-time.
                </p>

                <p className="text-neutral-400">
                  Next, you&apos;ll need to{" "}
                  <span className="font-semibold text-white">
                    find your Discord ID
                  </span>
                  . You can do this by going to{" "}
                  <span className="font-semibold text-white">
                    Discord settings &rarr; Advanced &rarr; Enable Developer
                    Mode
                  </span>
                  . Now, you can click on your profile in the bottom left and
                  click &quot;Copy User ID&quot;. Alternatively, you can right
                  click your name in chat and find the option there.
                </p>
                <p className="text-sm leading-none text-neutral-400">
                  * Note: You will need to have Spotify linked to your Discord
                  account.
                </p>
                <p className="text-neutral-400">
                  Finally, add a new browser source to your OBS scene. You can
                  customize the look of the component and preview it on the{" "}
                  <Link
                    href="/customize"
                    className="text-[#5865F2] hover:underline"
                  >
                    customization page
                  </Link>
                  . Further instructions on how to add the browser source can be
                  found below in the OBS Setup section.
                </p>
              </section>
              {/* obs-setup */}
              <section className="space-y-4">
                <h2
                  className="scroll-mt-[81px] text-3xl font-bold"
                  id="obs-setup"
                >
                  OBS Setup
                </h2>
                <p className="text-neutral-400">
                  Now all you have to do is add a browser source to your OBS
                  scene.
                </p>
                <p className="text-neutral-400">
                  Open OBS Studio and click the &quot;+&quot; button in the
                  Sources box to{" "}
                  <span className="font-semibold text-white">
                    add a new Source
                  </span>
                  . Select{" "}
                  <span className="font-semibold text-white">
                    &quot;Browser&quot;
                  </span>{" "}
                  and name it whatever you&apos;d like. Now,{" "}
                  <span className="font-semibold text-white">
                    set the following settings in the popup:
                  </span>
                </p>

                <p className="text-sm text-neutral-400">
                  Replace the{" "}
                  <span className="font-semibold text-green-400">@s</span> in
                  the URL with your{" "}
                  <span className="font-semibold text-white">Discord ID</span>
                </p>
                {/* Source Options */}
                <div className="flex w-full items-center">
                  <span className="w-14 text-right text-sm">URL</span>
                  <div className="ml-3 w-full rounded-md bg-gray-800 p-2">
                    https://spotify-obs.com/
                    <span className="font-semibold text-green-400">@@@</span>
                  </div>
                </div>
                <div className="flex w-full items-center">
                  <span className="w-14 text-right text-sm">Width</span>
                  <div className="ml-3 w-full rounded-md bg-gray-800 p-2">
                    800
                  </div>
                </div>
                <div className="flex w-full items-center">
                  <span className="w-14 text-right text-sm">Height</span>
                  <div className="ml-3 w-full rounded-md bg-gray-800 p-2">
                    200
                  </div>
                </div>
                <p className="text-neutral-400">
                  That&apos;s it! You should now see your Spotify status in OBS.
                  Move it around or resize it to your liking. You can view an
                  example on the{" "}
                  <Link
                    className="text-[#5865F2] hover:underline"
                    href="/customize"
                  >
                    customization page
                  </Link>
                  .
                </p>
              </section>
              {/* troubleshooting */}
              <section className="space-y-4">
                <h2
                  className="scroll-mt-[81px] text-3xl font-bold"
                  id="troubleshooting"
                >
                  Troubleshooting
                </h2>
                <p className="text-neutral-400">
                  Here are some common troubleshooting steps in case your
                  spotify status isn&apos;t displaying:
                </p>
                <ol className="list-inside list-decimal space-y-4">
                  <li className="text-lg font-semibold">
                    Check Your Discord Activity Privacy Settings{" "}
                    <p className="text-base font-normal text-neutral-400">
                      Depending on your settings, you may have to specifically
                      share your activity with the Lanyard Discord server. To do
                      this,{" "}
                      <span className="font-semibold text-white">
                        right click the Lanyard server &rarr; Privacy Settings
                        &rarr; Enable Activity Status
                      </span>
                      .
                    </p>
                  </li>
                  <li className="text-lg font-semibold">
                    Do not appear offline on Discord
                    <p className="text-base font-normal text-neutral-400">
                      While you are appear offline, Discord doesn&apos;t
                      broadcast your activity, so there&apos;s no way to track /
                      monitor your Spotify status. You can still set your status
                      as Idle or Do Not Disturb — anything but Invisible as long
                      as you want to display your current Spotify track.
                    </p>
                  </li>
                </ol>
              </section>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
