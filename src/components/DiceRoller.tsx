import { useState } from "react";
import { motion } from "framer-motion";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";

const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

interface DiceRollerProps {
  onRoll: (value: number) => void;
  disabled: boolean;
}

export function DiceRoller({ onRoll, disabled }: DiceRollerProps) {
  const [rolling, setRolling] = useState(false);
  const [currentFace, setCurrentFace] = useState(0);
  const [result, setResult] = useState<number | null>(null);

  const roll = async () => {
    if (rolling || disabled) return;
    setRolling(true);
    setResult(null);

    // Animate through faces
    for (let i = 0; i < 12; i++) {
      setCurrentFace(Math.floor(Math.random() * 6));
      await new Promise((r) => setTimeout(r, 80 + i * 15));
    }

    const value = Math.floor(Math.random() * 6) + 1;
    setCurrentFace(value - 1);
    setResult(value);
    setRolling(false);
    onRoll(value);
  };

  const Icon = diceIcons[currentFace];

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.button
        onClick={roll}
        disabled={disabled || rolling}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center gap-3 rounded-lg bg-primary px-6 py-3 font-display text-sm font-bold text-primary-foreground uppercase tracking-wider transition-shadow hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <motion.div
          animate={rolling ? { rotate: [0, 360] } : {}}
          transition={rolling ? { duration: 0.3, repeat: Infinity, ease: "linear" } : {}}
        >
          <Icon size={28} />
        </motion.div>
        {rolling ? "Rolling..." : result ? `Rolled ${result}!` : "Roll Die"}
      </motion.button>
    </div>
  );
}
