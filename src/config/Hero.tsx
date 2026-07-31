import React from "react";

import { Mail } from "lucide-react";

import Github from "@/components/svgs/Github";
import LinkedIn from "@/components/svgs/LinkedIn";

export const heroConfig = {
  name: "Chunren Lian",
  title: "Full-Stack Engineer",
  rotatingTitles: [
    "Full-Stack Engineer",
    "Commerce Builder",
    "AI Product Developer",
  ],
  avatar: "/assets/avatar.png",
  location: "Los Angeles",
  bio: "Full-stack engineer who goes by Ryan. I build commerce and AI products where the guardrails live in code — server-authoritative pricing, anti-fabrication checks, and tests that gate the deploy.",
};

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label?: string;
  /**
   * When set, clicking copies this value instead of navigating. Email lives
   * here because a `mailto:` link does nothing on a machine with no mail
   * client, and opening one in a new tab just leaves a blank page behind.
   */
  copyValue?: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ryan-lian-a1b719249/",
    icon: LinkedIn,
  },
  {
    name: "Github",
    href: "https://github.com/LianCr",
    icon: Github,
  },
  {
    name: "Email",
    label: "Chunren Lian",
    href: "mailto:liancr307@gmail.com",
    copyValue: "liancr307@gmail.com",
    icon: Mail,
  },
];
