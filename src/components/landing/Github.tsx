"use client";

import { useSyncExternalStore } from "react";
import { GitHubCalendar } from "react-github-calendar";

import { useTheme } from "next-themes";
import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";
import { githubConfig } from "@/config/Github";

import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

export default function Github() {
  const { resolvedTheme } = useTheme();

  // The calendar's colours depend on the theme, which isn't known during SSR.
  // Render the skeleton until mount so the server and client markup agree.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  return (
    <Container id="github-activity" className="mt-20">
      <SectionHeading subHeading="Github" heading="Activity" />

      <div className="mt-8 flex justify-center px-4 text-xs">
        {mounted ? (
          <GitHubCalendar
            username={githubConfig.username}
            colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
            blockSize={10}
            blockMargin={3}
            fontSize={14}
            // A third-party API backs this. If it's down or rate-limited, say
            // so quietly rather than leaving a broken-looking gap.
            errorMessage="Couldn't load contributions right now."
          />
        ) : (
          <CalendarSkeleton />
        )}
      </div>

      <div className="mt-4 flex justify-center">
        <Link
          href={`https://github.com/${githubConfig.username}`}
          target="_blank"
          className="text-muted-foreground hover:text-foreground text-sm transition-colors"
        >
          @{githubConfig.username} on GitHub
        </Link>
      </div>
    </Container>
  );
}

function CalendarSkeleton() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 53 }).map((_, week) => (
        <div key={week} className="flex flex-col gap-1">
          {Array.from({ length: 7 }).map((_, day) => (
            <Skeleton key={day} className="size-2.5 rounded-sm" />
          ))}
        </div>
      ))}
    </div>
  );
}
