import React from "react";

import Angular from "@/components/technologies/Angular";
import ApolloGraphQL from "@/components/technologies/ApolloGraphQL";
import AuthJs from "@/components/technologies/AuthJs";
import AWS from "@/components/technologies/AWS";
import BetterAuth from "@/components/technologies/BetterAuth";
import Bootstrap from "@/components/technologies/Bootstrap";
import Bun from "@/components/technologies/Bun";
import Claude from "@/components/technologies/Claude";
import Clerk from "@/components/technologies/Clerk";
import Cypress from "@/components/technologies/Cypress";
import D3 from "@/components/technologies/D3";
import Docker from "@/components/technologies/Docker";
import ExpressJs from "@/components/technologies/ExpressJs";
import FastApi from "@/components/technologies/FastApi";
import Figma from "@/components/technologies/Figma";
import Gemini from "@/components/technologies/Gemini";
import GitHubActions from "@/components/technologies/GitHubActions";
import GraphQL from "@/components/technologies/GraphQL";
import JavaScript from "@/components/technologies/JavaScript";
import Jest from "@/components/technologies/Jest";
import LangChain from "@/components/technologies/LangChain";
import MaterialUI from "@/components/technologies/MaterialUI";
import MongoDB from "@/components/technologies/MongoDB";
import NestJs from "@/components/technologies/NestJs";
import Netlify from "@/components/technologies/Netlify";
import NextJs from "@/components/technologies/NextJs";
import NodeJs from "@/components/technologies/NodeJs";
import Nodemailer from "@/components/technologies/Nodemailer";
import PostgreSQL from "@/components/technologies/PostgreSQL";
import Prisma from "@/components/technologies/Prisma";
import Python from "@/components/technologies/Python";
import ReactIcon from "@/components/technologies/ReactIcon";
import Redis from "@/components/technologies/Redis";
import Redux from "@/components/technologies/Redux";
import Resend from "@/components/technologies/Resent";
import Sass from "@/components/technologies/Sass";
import Shadcn from "@/components/technologies/Shadcn";
import Stripe from "@/components/technologies/Stripe";
import Supabase from "@/components/technologies/Supabase";
import TailwindCss from "@/components/technologies/TailwindCss";
import TypeScript from "@/components/technologies/TypeScript";
import Vercel from "@/components/technologies/Vercel";
import Vitest from "@/components/technologies/Vitest";
import WebAuthn from "@/components/technologies/WebAuthn";
import Webpack from "@/components/technologies/Webpack";

export interface TechnologyEntry {
  id: string;
  name: string;
  href: string;
}

export const technologies: TechnologyEntry[] = [
  {
    id: "TypeScript",
    name: "TypeScript",
    href: "https://www.typescriptlang.org/",
  },
  { id: "React", name: "React", href: "https://react.dev/" },
  { id: "NextJs", name: "Next.js", href: "https://nextjs.org/" },
  { id: "PostgreSQL", name: "PostgreSQL", href: "https://www.postgresql.org/" },
  { id: "MongoDB", name: "MongoDB", href: "https://www.mongodb.com/" },
  { id: "NestJS", name: "NestJS", href: "https://nestjs.com/" },
  { id: "Express", name: "Express", href: "https://expressjs.com/" },
  { id: "Bun", name: "Bun", href: "https://bun.sh/" },
  { id: "NodeJs", name: "Node.js", href: "https://nodejs.org/" },
  { id: "Prisma", name: "Prisma", href: "https://www.prisma.io/" },
  {
    id: "JavaScript",
    name: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  { id: "TailwindCss", name: "Tailwind CSS", href: "https://tailwindcss.com/" },
  { id: "Clerk", name: "Clerk", href: "https://clerk.com/" },
  { id: "Shadcn", name: "shadcn/ui", href: "https://ui.shadcn.com/" },
  { id: "Vercel", name: "Vercel", href: "https://vercel.com/" },
  { id: "Supabase", name: "Supabase", href: "https://supabase.com/" },
  { id: "Stripe", name: "Stripe", href: "https://stripe.com/" },
  { id: "AuthJs", name: "Auth.js", href: "https://authjs.dev/" },
  { id: "LangChain", name: "LangChain", href: "https://langchain.com/" },
  { id: "Gemini", name: "Gemini", href: "https://ai.google.dev/" },
  { id: "BetterAuth", name: "BetterAuth", href: "https://better-auth.com/" },
  { id: "Nodemailer", name: "Nodemailer", href: "https://nodemailer.com/" },
  { id: "Resend", name: "Resend", href: "https://resend.com/" },
  { id: "Netlify", name: "Netlify", href: "https://www.netlify.com/" },
  { id: "AWS", name: "AWS", href: "https://aws.amazon.com/" },
  { id: "Figma", name: "Figma", href: "https://figma.com/" },
  { id: "Docker", name: "Docker", href: "https://www.docker.com/" },
  { id: "Python", name: "Python", href: "https://www.python.org/" },
  { id: "FastApi", name: "FastAPI", href: "https://fastapi.tiangolo.com/" },
  { id: "Angular", name: "Angular", href: "https://angular.dev/" },
  { id: "Redux", name: "Redux", href: "https://redux.js.org/" },
  {
    id: "ReduxToolkit",
    name: "Redux Toolkit",
    href: "https://redux-toolkit.js.org/",
  },
  { id: "GraphQL", name: "GraphQL", href: "https://graphql.org/" },
  {
    id: "ApolloGraphQL",
    name: "Apollo GraphQL",
    href: "https://www.apollographql.com/",
  },
  { id: "D3", name: "D3.js", href: "https://d3js.org/" },
  { id: "Redis", name: "Redis", href: "https://redis.io/" },
  { id: "Claude", name: "Claude", href: "https://www.anthropic.com/claude" },
  { id: "MaterialUI", name: "Material UI", href: "https://mui.com/" },
  { id: "Vitest", name: "Vitest", href: "https://vitest.dev/" },
  { id: "Jest", name: "Jest", href: "https://jestjs.io/" },
  { id: "Cypress", name: "Cypress", href: "https://www.cypress.io/" },
  {
    id: "GitHubActions",
    name: "GitHub Actions",
    href: "https://github.com/features/actions",
  },
  { id: "WebAuthn", name: "WebAuthn", href: "https://webauthn.guide/" },
  { id: "Sass", name: "SASS", href: "https://sass-lang.com/" },
  { id: "Webpack", name: "Webpack", href: "https://webpack.js.org/" },
  { id: "Bootstrap", name: "Bootstrap", href: "https://getbootstrap.com/" },
];

/** Lookup by id (e.g. "TypeScript") or display name (e.g. "Next.js"). */
const iconByKey: Record<string, React.ReactNode> = {
  TypeScript: <TypeScript />,
  React: <ReactIcon />,
  ReactIcon: <ReactIcon />,
  "Next.js": <NextJs />,
  NextJs: <NextJs />,
  PostgreSQL: <PostgreSQL />,
  MongoDB: <MongoDB />,
  NestJS: <NestJs />,
  NestJs: <NestJs />,
  Express: <ExpressJs />,
  Bun: <Bun />,
  "Node.js": <NodeJs />,
  NodeJs: <NodeJs />,
  Prisma: <Prisma />,
  JavaScript: <JavaScript />,
  "Tailwind CSS": <TailwindCss />,
  TailwindCss: <TailwindCss />,
  Clerk: <Clerk />,
  "shadcn/ui": <Shadcn />,
  Shadcn: <Shadcn />,
  Vercel: <Vercel />,
  Supabase: <Supabase />,
  Stripe: <Stripe />,
  AuthJs: <AuthJs />,
  LangChain: <LangChain className="w-7" />,
  Gemini: <Gemini />,
  BetterAuth: <BetterAuth />,
  Nodemailer: <Nodemailer />,
  Resend: <Resend />,
  Netlify: <Netlify />,
  AWS: <AWS />,
  Figma: <Figma />,
  Docker: <Docker />,
  Python: <Python />,
  FastAPI: <FastApi />,
  FastApi: <FastApi />,
  Angular: <Angular />,
  "Redux Toolkit": <Redux />,
  Redux: <Redux />,
  GraphQL: <GraphQL />,
  "Apollo GraphQL": <ApolloGraphQL />,
  ApolloGraphQL: <ApolloGraphQL />,
  "D3.js": <D3 />,
  D3: <D3 />,
  Redis: <Redis />,
  Claude: <Claude />,
  "Material UI": <MaterialUI />,
  MaterialUI: <MaterialUI />,
  Vitest: <Vitest />,
  Jest: <Jest />,
  Cypress: <Cypress />,
  "GitHub Actions": <GitHubActions />,
  GitHubActions: <GitHubActions />,
  WebAuthn: <WebAuthn />,
  SASS: <Sass />,
  Sass: <Sass />,
  Webpack: <Webpack />,
  Bootstrap: <Bootstrap />,
};

/**
 * Maps the way a technology gets written in MDX frontmatter or the experience
 * config onto a canonical key in `iconByKey`. Lookup is lowercased, so only one
 * spelling per variant is needed here.
 */
const KEY_ALIASES: Record<string, string> = {
  typescript: "TypeScript",
  javascript: "JavaScript",
  react: "React",
  "react.js": "React",
  nextjs: "Next.js",
  "next.js": "Next.js",
  next: "Next.js",
  node: "Node.js",
  nodejs: "Node.js",
  "node.js": "Node.js",
  express: "Express",
  "express.js": "Express",
  mongodb: "MongoDB",
  postgresql: "PostgreSQL",
  postgres: "PostgreSQL",
  nestjs: "NestJS",
  prisma: "Prisma",
  bun: "Bun",
  "tailwind css": "Tailwind CSS",
  tailwindcss: "Tailwind CSS",
  docker: "Docker",
  aws: "AWS",

  python: "Python",
  fastapi: "FastAPI",
  angular: "Angular",
  redux: "Redux",
  "redux toolkit": "Redux Toolkit",
  rtk: "Redux Toolkit",
  "rtk query": "Redux Toolkit",
  graphql: "GraphQL",
  apollo: "Apollo GraphQL",
  "apollo graphql": "Apollo GraphQL",
  d3: "D3.js",
  "d3.js": "D3.js",
  redis: "Redis",
  claude: "Claude",
  "claude api": "Claude",
  anthropic: "Claude",
  mui: "Material UI",
  "material ui": "Material UI",
  "material-ui": "Material UI",
  vitest: "Vitest",
  jest: "Jest",
  cypress: "Cypress",
  "github actions": "GitHub Actions",
  webauthn: "WebAuthn",
  sass: "SASS",
  scss: "SASS",
  webpack: "Webpack",
  bootstrap: "Bootstrap",
  "bootstrap 5": "Bootstrap",
};

/** Normalize common variants to a key that exists in iconByKey. */
function normalizeTechnologyKey(name: string): string {
  return KEY_ALIASES[name.trim().toLowerCase()] ?? name;
}

export function getTechnologyIcon(name: string): React.ReactNode {
  return iconByKey[normalizeTechnologyKey(name)] ?? iconByKey[name] ?? null;
}

/** Homepage Skills grid — 5 columns, so keep this a multiple of 5. */
export const SKILLS = [
  "TypeScript",
  "React",
  "Next.js",
  "Angular",
  "Node.js",
  "Express",
  "Python",
  "FastAPI",
  "GraphQL",
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "D3.js",
  "Claude",
  "AWS",
] as const;

export function getTechnologiesByIds(ids: string[]): TechnologyEntry[] {
  const byId = new Map(technologies.map((t) => [t.id, t]));
  return ids.map((id) => byId.get(id)).filter(Boolean) as TechnologyEntry[];
}

export function getTechnologyByName(name: string): TechnologyEntry | undefined {
  const key = normalizeTechnologyKey(name);
  return technologies.find((t) => t.name === key || t.id === key);
}
