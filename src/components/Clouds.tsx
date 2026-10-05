import { useMemo } from "react";

interface Cloud {
  id: number;
  top: number;
  width: number;
  height: number;
  opacity: number;
  duration: number;
  delay: number;
}

export function Clouds() {
  const clouds = useMemo<Cloud[]>(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      top: Math.random() * 70 + 5,
      width: Math.random() * 200 + 120,
      height: Math.random() * 40 + 30,
      opacity: Math.random() * 0.4 + 0.5,
      duration: Math.random() * 30 + 40,
      delay: Math.random() * -60,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(210,80%,55%)] via-[hsl(205,75%,65%)] to-[hsl(200,60%,78%)]" />

      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute rounded-full"
          style={{
            top: `${cloud.top}%`,
            width: cloud.width,
            height: cloud.height,
            opacity: cloud.opacity,
            background: "radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.6) 50%, transparent 70%)",
            animation: `cloud-drift ${cloud.duration}s linear ${cloud.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
