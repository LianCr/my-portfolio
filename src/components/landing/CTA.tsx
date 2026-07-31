"use client";

import { useState } from "react";

import Image from "next/image";

import { Check, Copy } from "lucide-react";

import { ctaConfig } from "@/config/CTA";

import Container from "../common/Container";

interface CallToActionProps {
  profileImage?: string;
  profileAlt?: string;
  email?: string;
  subject?: string;
  preText?: string;
}

const CHIP =
  "inline-flex items-center self-end rounded-md border border-dashed border-black/20 bg-black/5 px-2 py-1 text-sm text-black shadow-[0_0_5px_rgba(0,0,0,0.1)] transition-all dark:border-white/30 dark:bg-white/15 dark:text-white dark:shadow-[0_0_5px_rgba(255,255,255,0.1)]";

export default function CTA({
  profileImage = ctaConfig.profileImage,
  profileAlt = ctaConfig.profileAlt,
  email = ctaConfig.email,
  subject = ctaConfig.subject,
  preText = ctaConfig.preText,
}: CallToActionProps) {
  const [copied, setCopied] = useState(false);
  const href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure origin, denied permission) — the address is
      // rendered as text anyway, so it can still be selected by hand.
    }
  };

  return (
    <Container className="my-20 rounded-md border border-dashed border-black/20 py-8 dark:border-white/10">
      <div className="mt-6 w-full flex-col px-6 pb-8 sm:flex sm:items-center sm:justify-between sm:px-12">
        <p className="mb-4 text-center text-base opacity-50 md:text-xl">
          {preText}
        </p>
        <div className="mt-4 flex w-full flex-wrap items-center justify-center gap-2 sm:mt-0 sm:w-auto sm:justify-end">
          <a
            href={href}
            aria-label={`Email ${profileAlt} at ${email}`}
            className={`group cursor-pointer gap-2 ${CHIP}`}
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
            <span className="text-sm font-bold whitespace-nowrap underline decoration-dotted underline-offset-4 group-hover:decoration-solid">
              {email}
            </span>
          </a>

          <button
            type="button"
            onClick={copyEmail}
            aria-label={copied ? "Email address copied" : "Copy email address"}
            className={`cursor-pointer gap-1.5 hover:bg-black/10 dark:hover:bg-white/25 ${CHIP}`}
          >
            {copied ? (
              <Check className="size-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Copy className="size-4" />
            )}
            <span className="text-sm font-medium">
              {copied ? "Copied" : "Copy"}
            </span>
          </button>
        </div>
      </div>
    </Container>
  );
}
