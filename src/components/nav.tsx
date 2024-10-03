import Link from "next/link";
import Image from "next/image";

import MobileNav from "@/components/mobile-nav";

import { Button } from "@/components/ui/button";

import { GithubIcon } from "lucide-react";

const Nav = () => {
  return (
    <>
      <nav className="sticky top-0 z-20 w-full border-b border-white/20 bg-white/5 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-neutral-300"
          >
            <Image
              src="/favicon.ico"
              height={20}
              width={20}
              alt="vercel icon"
            />
            <p className="font-bold">spotify-obs</p>
          </Link>

          <div className="hidden space-x-6 md:flex">
            <Link
              href="/#getting-started"
              className="font-semibold text-neutral-200 hover:text-neutral-300"
            >
              Getting Started
            </Link>
            <Link
              href="/#obs-setup"
              className="font-semibold text-neutral-200 hover:text-neutral-300"
            >
              OBS Setup
            </Link>
            <Link
              href="/#troubleshooting"
              className="font-semibold text-neutral-200 hover:text-neutral-300"
            >
              Troubleshooting
            </Link>
            <Link
              href="/customize"
              className="font-semibold text-neutral-200 hover:text-neutral-300"
            >
              Customize
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              size="icon"
              variant="glass"
              asChild
              className="hidden md:flex"
            >
              <a
                href="https://github.com/clxmente/spotify-obs"
                target="_blank"
                rel="noreferrer"
              >
                <GithubIcon />
              </a>
            </Button>
          </div>

          <MobileNav />
        </div>
      </nav>
    </>
  );
};

export default Nav;
