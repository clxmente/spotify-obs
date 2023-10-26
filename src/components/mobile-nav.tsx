"use client";

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";

import {
  CogIcon,
  MenuIcon,
  VideoIcon,
  LayoutGridIcon,
  ChevronRightSquareIcon,
} from "lucide-react";

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-end md:hidden">
        <Button
          size="icon"
          variant="glass"
          className="md:hidden"
          onClick={() => setOpen(true)}
        >
          <MenuIcon className="md:hidden" />
        </Button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader className="mt-4">
            <div className="flex items-center justify-center gap-2">
              <Image
                src="/favicon.ico"
                height={20}
                width={20}
                alt="vercel icon"
              />
              <p className="font-semibold">spotify-obs</p>
            </div>
          </SheetHeader>
          <div className="mt-4 flex flex-col space-y-6">
            <Button
              variant="glass"
              className="h-14 w-full justify-start"
              asChild
              onClick={() => setOpen(false)}
            >
              <Link href="/">
                <LayoutGridIcon className="mr-2 h-5 w-5" />
                Home
              </Link>
            </Button>

            <Button
              variant="glass"
              className="h-14 w-full justify-start"
              asChild
              onClick={() => setOpen(false)}
            >
              <Link href="#getting-started">
                <ChevronRightSquareIcon className="mr-2 h-5 w-5" />
                Getting Started
              </Link>
            </Button>

            <Button
              variant="glass"
              className="h-14 w-full justify-start"
              asChild
              onClick={() => setOpen(false)}
            >
              <Link href="#obs-setup">
                <VideoIcon className="mr-2 h-5 w-5" />
                OBS Setup
              </Link>
            </Button>

            <Button
              variant="glass"
              className="h-14 w-full justify-start"
              asChild
              onClick={() => setOpen(false)}
            >
              <Link href="#customize">
                <CogIcon className="mr-2 h-5 w-5" />
                Customize
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNav;
