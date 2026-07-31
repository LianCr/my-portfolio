import { about } from "./About";
import { heroConfig } from "./Hero";

export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  twitterCard?: "summary" | "summary_large_image";
}

// Base site configuration.
// `url` is env-driven: set NEXT_PUBLIC_URL in Vercel to the live domain so OG
// tags and canonical links resolve absolutely. Locally it falls back to :3000.
export const siteConfig = {
  name: heroConfig.name,
  title: `${heroConfig.name} — ${heroConfig.title}`,
  description:
    "Full-stack engineer building commerce and AI products. React, Angular, Node.js, Python.",
  url: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
  ogImage: "/meta/opengraph-image.png",
  author: {
    name: about.name,
    github: "LianCr",
    linkedin: "ryan-lian-a1b719249",
    email: "liancr307@gmail.com",
  },
  keywords: [
    "chunren lian",
    "ryan lian",
    "full-stack engineer",
    "software engineer",
    "los angeles",
    "react",
    "angular",
    "nextjs",
    "typescript",
    "node.js",
    "python",
  ],
};

export const pageMetadata: Record<string, PageMeta> = {
  // Home page
  "/": {
    title: `${heroConfig.name} — ${heroConfig.title}`,
    description:
      "Full-stack engineer in Los Angeles building commerce and AI products, with guardrails enforced in code rather than left to the model.",
    keywords: [
      "chunren lian",
      "ryan lian",
      "full-stack engineer",
      "software engineer",
      "portfolio",
    ],
    ogImage: "/meta/opengraph-image.png",
    twitterCard: "summary_large_image",
  },

  // Work Experience page
  "/work-experience": {
    title: `Work Experience — ${heroConfig.name}`,
    description:
      "Commerce and fintech engineering work: cart and checkout systems at Ryzlink (Chuwa America), and a multi-currency digital banking platform at ZentraPay.",
    keywords: [
      "work experience",
      "full-stack engineer",
      "e-commerce",
      "fintech",
      "career",
    ],
    ogImage: "/meta/opengraph-image.png",
    twitterCard: "summary_large_image",
  },

  // Projects page
  "/projects": {
    title: `Projects — ${heroConfig.name}`,
    description:
      "Case studies on Smart Money Decoder and DealLens — how each system is architected, what it deliberately refuses to claim, and how that is enforced.",
    keywords: [
      "projects",
      "case studies",
      "smart money decoder",
      "deallens",
      "software engineering",
    ],
    ogImage: "/meta/opengraph-image.png",
    twitterCard: "summary_large_image",
  },
};

// Helper function to get metadata for a specific page
export function getPageMetadata(pathname: string): PageMeta {
  return pageMetadata[pathname] || pageMetadata["/"];
}

// Helper function to generate complete metadata object for Next.js
export function generateMetadata(pathname: string) {
  const pageMeta = getPageMetadata(pathname);

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageMeta.title,
    description: pageMeta.description,
    keywords: pageMeta.keywords?.join(", "),
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    openGraph: {
      type: "website",
      url: `${siteConfig.url}${pathname}`,
      title: pageMeta.title,
      description: pageMeta.description,
      siteName: siteConfig.title,
      images: [
        {
          url: pageMeta.ogImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: pageMeta.title,
        },
      ],
    },
    twitter: {
      card: pageMeta.twitterCard || "summary_large_image",
      title: pageMeta.title,
      description: pageMeta.description,
      images: [pageMeta.ogImage || siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${siteConfig.url}${pathname}`,
    },
  };
}
