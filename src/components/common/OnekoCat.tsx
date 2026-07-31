import React from "react";

import Script from "next/script";

import { catConfig } from "@/config/Cat";

export default function OnekoCat() {
  if (!catConfig.enabled) {
    return null;
  }

  // Absolute paths — relative ones resolve against the current route, so on
  // /projects/deallens these became /projects/oneko/* and 404'd.
  return <Script src="/oneko/oneko.js" data-cat="/oneko/oneko.gif" />;
}
