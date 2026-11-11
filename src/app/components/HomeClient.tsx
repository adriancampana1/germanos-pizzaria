"use client";

import Hero from "./Hero/Hero";
import FloatingCta from "./FloatingCta/FloatingCta";

export default function HomeClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Hero />
      {children}
      <FloatingCta />
    </>
  );
}
