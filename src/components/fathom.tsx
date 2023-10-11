"use client";

import { useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
import { load, trackPageview } from "fathom-client";

function TrackPageView() {
  const pathname = usePathname();

  // load fathom script on mount
  useEffect(() => {
    load("MBILXWGL", {
      includedDomains: ["spotify-obs.com", "www.spotify-obs.com"],
      auto: false,
    });
  }, []);

  // record a pageview when route changes
  useEffect(() => {
    if (!pathname) return;

    trackPageview({
      url: pathname,
      referrer: document.referrer,
    });
  }, [pathname]);

  return null;
}

export default function Fathom() {
  return (
    <Suspense fallback={null}>
      <TrackPageView />
    </Suspense>
  );
}
