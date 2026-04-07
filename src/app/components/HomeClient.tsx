"use client";

import useLenis from "../hooks/useLenis";
import useFramePreloader from "../hooks/useFramePreloader";
import Loader from "./Loader/Loader";
import Hero from "./Hero/Hero";
import FloatingCta from "./FloatingCta/FloatingCta";

export default function HomeClient({
  children,
}: {
  children: React.ReactNode;
}) {
  useLenis();
  const { framesRef, progress, isLoaded, frameCount } = useFramePreloader();

  return (
    <>
      <Loader progress={progress} isLoaded={isLoaded} />
      <Hero framesRef={framesRef} frameCount={frameCount} isLoaded={isLoaded} />
      {children}
      <FloatingCta />
    </>
  );
}
