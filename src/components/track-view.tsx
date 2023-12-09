"use client";

import { useEffect } from "react";

interface TrackViewProps {
  path: string;
}

const TrackView = ({ path }: TrackViewProps) => {
  useEffect(() => {
    // @ts-ignore
    if (typeof window === "undefined" || typeof window.umami === "undefined")
      return;

    // @ts-ignore
    window.umami?.track((props) => ({ ...props, url: path }));
  }, [path]);

  return null;
};

export default TrackView;
