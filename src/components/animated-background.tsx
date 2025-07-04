"use client"

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Star = ({ style, colorClass }: { style: React.CSSProperties, colorClass: string }) => {
    return <div className={cn("absolute rounded-full", colorClass)} style={style} />;
};

const Cloud = ({ id }: { id: number }) => {
    const style = {
        top: `${Math.random() * 80}%`,
        animation: `float ${Math.random() * 20 + 25}s linear infinite`,
        animationDelay: `${id * 4}s`,
        transform: `scale(${Math.random() * 0.5 + 0.5})`,
        left: '-300px',
    };

    return (
        <div className="absolute w-48 h-16 bg-white/80 rounded-full blur-sm" style={style}>
            <div className="absolute w-24 h-24 bg-white/80 rounded-full -top-8 left-8" />
            <div className="absolute w-32 h-32 bg-white/80 rounded-full -top-12 right-4" />
        </div>
    );
};

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [stars, setStars] = useState<{ style: React.CSSProperties, colorClass: string }[]>([]);

  useEffect(() => {
    setMounted(true);
    const colors = ['bg-starlight-mint', 'bg-solar-gold', 'bg-comet-trail-lavender', 'bg-white'];
    const starData = Array.from({ length: 150 }).map(() => ({
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `twinkle ${Math.random() * 5 + 3}s linear infinite`,
        animationDelay: `${Math.random() * 4}s`,
        width: `${Math.random() * 2 + 1}px`,
        height: `${Math.random() * 2 + 1}px`,
      },
      colorClass: colors[Math.floor(Math.random() * colors.length)],
    }));
    setStars(starData);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
        <div className={`absolute inset-0 transition-opacity duration-1000 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-black" />
            {stars.map((star, i) => <Star key={i} style={star.style} colorClass={star.colorClass} />)}
            <div className="absolute top-0 left-0 w-48 h-1.5 bg-gradient-to-r from-transparent via-white to-transparent rounded-full opacity-80" style={{animation: `comet 15s linear infinite`, animationDelay: '5s'}} />
            <div className="absolute top-0 left-0 w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full opacity-60" style={{animation: `comet 20s linear infinite`, animationDelay: '12s'}} />
        </div>

        <div className={`absolute inset-0 transition-opacity duration-1000 ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-gradient-to-b from-sky-200 to-sky-400" />
            {[...Array(7)].map((_, i) => <Cloud key={i} id={i} />)}
        </div>
    </div>
  );
}
