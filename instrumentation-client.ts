import posthog from "posthog-js";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

// The `!` this used to carry was a lie: with no key configured, posthog.init
// received undefined and logged a critical misconfiguration error on every
// page load. Analytics is optional — skip it when there's no key.
if (process.env.NODE_ENV === "production" && posthogKey) {
  posthog.init(posthogKey, {
    api_host: "/ph",
    ui_host: "https://us.posthog.com",
    defaults: "2025-05-24",
    capture_exceptions: true,
  });
}
