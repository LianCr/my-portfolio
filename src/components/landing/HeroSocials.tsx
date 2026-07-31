"use client";

import Link from "next/link";

import { type SocialLink, socialLinks } from "@/config/Hero";
import { useCopy } from "@/hooks/use-copy";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const ICON_CLASS =
  "text-muted-foreground hover:text-foreground transition-colors";

function CopyLink({ link }: { link: SocialLink }) {
  const { copied, copy } = useCopy();
  const Icon = link.icon;
  const value = link.copyValue!;

  return (
    <Tooltip delayDuration={0} open={copied ? true : undefined}>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={() => copy(value)}
          aria-label={`Copy ${link.name.toLowerCase()} address ${value}`}
          className={`cursor-pointer ${ICON_CLASS}`}
        >
          <Icon className="size-5" />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{copied ? "Copied!" : value}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default function HeroSocials() {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.map((link) => {
        if (link.copyValue) return <CopyLink key={link.name} link={link} />;

        const Icon = link.icon;
        return (
          <Tooltip key={link.name} delayDuration={0}>
            <TooltipTrigger asChild>
              <Link href={link.href} target="_blank" className={ICON_CLASS}>
                <Icon className="size-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{link.name}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
