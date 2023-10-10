import { HeroSection } from "./hero-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <section className="mx-auto flex min-h-screen flex-col items-center px-5 py-8 md:px-0">
        <div className="flex max-w-6xl flex-col items-center gap-5 md:flex-row">
          <h1 className="text-4xl font-bold md:text-6xl">Getting Started</h1>
        </div>
      </section>
    </main>
  );
}
