import Nav from "@/components/nav";
import Manager from "@/app/customize/manager";

import { ProgressBar } from "./customizable-song";

export default function Customize() {
  return (
    <>
      <Nav />
      <main className="relative flex flex-col items-center overflow-x-clip">
        <div className="absolute -top-24 -z-10 flex h-[10rem] w-[40rem] items-center justify-center rounded-[50%] bg-[#6F32F0] blur-[100px]" />
        <section className="w-full max-w-5xl space-y-6 px-5 py-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold md:text-4xl">Customize</h2>
            <p className="text-neutral-400">
              Customize the look of the song display. Choose from one of the
              preset styles and tweak it to your liking.
            </p>
          </div>

          <Manager />
        </section>
      </main>
    </>
  );
}
