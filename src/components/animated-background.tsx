"use client"

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Star = () => {
    const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `twinkle ${Math.random() * 5 + 2}s linear infinite`,
        animationDelay: `${Math.random() * 3}s`,
    };
    return <div className="absolute w-1 h-1 bg-starlight-mint rounded-full" style={style} />;
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

const Bird = ({ id }: { id: number }) => {
    const style = {
        top: `${Math.random() * 60 + 10}%`,
        left: '-50px',
        animation: `float ${Math.random() * 10 + 10}s linear infinite`,
        animationDelay: `${id * 2}s`,
        transform: `scale(${Math.random() * 0.2 + 0.3})`,
    };
    return (
        <svg
            viewBox="0 0 50 30"
            className="absolute text-slate-800"
            style={style}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 15c5,6,12,8,23,0" />
            <path d="M25 15c5,6,12,8,23,0" />
        </svg>
    );
};

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
        <div className={`absolute inset-0 transition-opacity duration-1000 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-gradient-to-b from-background to-indigo-900/50" />
            {[...Array(100)].map((_, i) => <Star key={i} />)}
            <div className="absolute top-0 left-0 w-48 h-1.5 bg-gradient-to-r from-transparent via-white to-transparent rounded-full opacity-80 comet" style={{animation: `comet 15s linear infinite`, animationDelay: '5s'}} />
            <div className="absolute top-0 left-0 w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full opacity-60 comet" style={{animation: `comet 20s linear infinite`, animationDelay: '12s'}} />
        </div>

        <div className={`absolute inset-0 transition-opacity duration-1000 ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-500" />
            <div className="absolute top-16 right-16 w-32 h-32 bg-yellow-300 rounded-full animate-pulse blur-md" />
            <div className="absolute top-16 right-16 w-32 h-32 bg-yellow-400 rounded-full animate-pulse" />
            {[...Array(6)].map((_, i) => <Cloud key={i} id={i} />)}
            {[...Array(5)].map((_, i) => <Bird key={i} id={i} />)}
        </div>
    </div>
  );
}
