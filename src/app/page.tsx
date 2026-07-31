import Container from "@/components/common/Container";
import CTA from "@/components/landing/CTA";
import Experience from "@/components/landing/Experience";
import Hero from "@/components/landing/Hero";
import Work from "@/components/landing/Projects";
import Skills from "@/components/landing/Skills";

export default function page() {
  return (
    <Container className="min-h-screen py-16">
      <Hero />
      <Experience />
      <Skills />
      <Work />
      <CTA />
    </Container>
  );
}
