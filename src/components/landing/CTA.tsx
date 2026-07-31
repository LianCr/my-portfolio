"use client";

import Image from "next/image";

import { Check, Copy } from "lucide-react";

import { ctaConfig } from "@/config/CTA";
import { useCopy } from "@/hooks/use-copy";

import Container from "../common/Container";

interface CallToActionProps {
  profileImage?: string;
  profileAlt?: string;
  email?: string;
  preText?: string;
}

export default function CTA({
  profileImage = ctaConfig.profileImage,
  profileAlt = ctaConfig.profileAlt,
  email = ctaConfig.email,
  preText = ctaConfig.preText,
}: CallToActionProps) {
  const { copied, copy } = useCopy();

  return (
    <Container className="my-20 rounded-md border border-dashed border-black/20 py-8 dark:border-white/10">
      <div className="mt-6 w-full flex-col px-6 pb-8 sm:flex sm:items-center sm:justify-between sm:px-12">
        <p className="mb-4 text-center text-base opacity-50 md:text-xl">
          {preText}
        </p>
        <div className="mt-4 flex w-full justify-center sm:mt-0 sm:w-auto sm:justify-end">
          <button
            type="button"
            onClick={() => copy(email)}
            aria-label={`Copy email address ${email}`}
            className="group inline-flex cursor-pointer items-center gap-2 self-end rounded-md border border-dashed border-black/20 bg-black/5 px-2 py-1 text-sm text-black shadow-[0_0_5px_rgba(0,0,0,0.1)] transition-all hover:bg-black/10 dark:border-white/30 dark:bg-white/15 dark:text-white dark:shadow-[0_0_5px_rgba(255,255,255,0.1)] dark:hover:bg-white/25"
          >
            <span className="h-5 w-5 shrink-0 overflow-hidden rounded-full">
              <Image
                alt={profileAlt}
                width={20}
                height={20}
                className="h-full w-full object-cover"
                src={profileImage}
                style={{ color: "transparent" }}
              />
            </span>
            <span className="text-sm font-bold whitespace-nowrap">{email}</span>
            {copied ? (
              <Check
                aria-hidden
                className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
              />
            ) : (
              <Copy
                aria-hidden
                className="size-4 shrink-0 opacity-50 transition-opacity group-hover:opacity-100"
              />
            )}
          </button>
        </div>
        {/* Live region so the copy is announced, not just shown. */}
        <p
          aria-live="polite"
          className={`mt-2 text-center text-xs transition-opacity ${
            copied ? "opacity-60" : "opacity-0"
          }`}
        >
          {copied ? "Copied to clipboard" : ""}
        </p>
      </div>
    </Container>
  );
}
