import Image from "next/image";

import { BadgeCheck } from "lucide-react";

import { heroConfig } from "@/config/Hero";

import Container from "../common/Container";
import AnimatedHeroTitle from "./AnimatedHeroTitle";
import HeroSocials from "./HeroSocials";

export default function Hero() {
  const { name, rotatingTitles, avatar, location, bio } = heroConfig;

  return (
    <Container>
      {/* Card-style hero with horizontal layout */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-center md:gap-8">
        {/* Avatar - Left side on desktop */}
        <div className="shrink-0">
          <Image
            src={avatar}
            alt={name}
            width={120}
            height={120}
            className="rounded-2xl"
          />
        </div>

        {/* Content - Right side */}
        <div className="flex flex-1 flex-col gap-4">
          {/* Header row: Name + Badge + Location */}
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold md:text-3xl">{name}</h1>
              <BadgeCheck className="size-5 shrink-0 fill-blue-500 text-black" />
              {location && (
                <>
                  <span className="bg-muted-foreground h-3 w-px rounded-full" />
                  <span className="text-muted-foreground text-sm md:text-base">
                    {location}
                  </span>
                </>
              )}
            </div>
            {/* Animated rotating title */}
            <div className="text-lg md:text-xl">
              <AnimatedHeroTitle titles={rotatingTitles} />
            </div>
          </div>

          {/* Bio */}
          {bio && (
            <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
              {bio}
            </p>
          )}

          {/* Social Icons */}
          <HeroSocials />
        </div>
      </div>
    </Container>
  );
}
