import { type Project } from "@/types/project";

function getTimelineYear(timeline?: string): number {
  if (!timeline) return 0;

  const match = timeline.match(/\d{4}/);
  return match ? Number(match[0]) : 0;
}

type Sortable = Project & { timeline?: string; order?: number };

/**
 * Explicit `order` first (ascending), then newest timeline, then title. The
 * flagship project isn't necessarily the most recent one, so chronology alone
 * can't express the intended order.
 */
export function sortProjectsByLatest<T extends Sortable>(projects: T[]): T[] {
  return [...projects].sort((a, b) => {
    const orderDiff = (a.order ?? 999) - (b.order ?? 999);
    if (orderDiff !== 0) return orderDiff;

    const yearDiff = getTimelineYear(b.timeline) - getTimelineYear(a.timeline);
    if (yearDiff !== 0) return yearDiff;

    return a.title.localeCompare(b.title);
  });
}
