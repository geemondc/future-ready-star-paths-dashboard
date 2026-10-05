import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiProps {
  show: boolean;
}

export function Confetti({ show }: ConfettiProps) {
  if (!show) return null;

  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#a855f7"][i % 6],
    delay: Math.random() * 0.5,
    rotation: Math.random() * 720 - 360,
  }));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 pointer-events-none z-50">
        {pieces.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
            animate={{ y: "110vh", opacity: 0, rotate: p.rotation }}
            transition={{ duration: 3, delay: p.delay, ease: "easeIn" }}
            className="absolute w-2 h-3 rounded-sm"
            style={{ backgroundColor: p.color }}
          />
        ))}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="rounded-xl bg-card/95 border border-border px-8 py-6 text-center backdrop-blur-md shadow-2xl">
            <h2 className="font-display text-2xl font-bold text-accent mb-2">🎉 You Win!</h2>
            <p className="text-muted-foreground">You've explored all 53 squares of the Gee-Verse!</p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
