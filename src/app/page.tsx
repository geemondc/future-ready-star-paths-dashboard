import { AnimatedBackground } from "@/components/animated-background";
import { StarPathsGame } from "@/components/star-paths-game";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <main className="relative z-10 flex flex-col items-center min-h-screen p-4 overflow-x-hidden">
        <StarPathsGame />
      </main>
    </>
  );
}
