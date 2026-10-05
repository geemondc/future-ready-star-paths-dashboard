import { useState, useCallback, useEffect } from "react";
import { squares } from "@/data/squares";
import { Header } from "@/components/Header";
import { Starfield } from "@/components/Starfield";
import { Clouds } from "@/components/Clouds";
import { DiceRoller } from "@/components/DiceRoller";
import { BoardGrid } from "@/components/BoardGrid";
import { SquareDialog } from "@/components/SquareDialog";
import { Confetti } from "@/components/Confetti";
import type { Square } from "@/data/squares";

const POS_KEY = "starpaths_position";
const VIS_KEY = "starpaths_visited";

function loadState() {
  try {
    const pos = parseInt(localStorage.getItem(POS_KEY) || "1", 10);
    const vis = JSON.parse(localStorage.getItem(VIS_KEY) || "[1]") as number[];
    return { position: pos, visited: new Set(vis) };
  } catch {
    return { position: 1, visited: new Set([1]) };
  }
}

export default function Index() {
  const [state, setState] = useState(loadState);
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [won, setWon] = useState(false);
  const [isDayMode, setIsDayMode] = useState(() => localStorage.getItem("starpaths_theme") === "day");

  const handleToggleTheme = useCallback(() => {
    setIsDayMode((prev) => {
      const next = !prev;
      localStorage.setItem("starpaths_theme", next ? "day" : "night");
      return next;
    });
  }, []);

  const { position, visited } = state;
  const progress = (visited.size / 53) * 100;

  // Persist
  useEffect(() => {
    localStorage.setItem(POS_KEY, String(position));
    localStorage.setItem(VIS_KEY, JSON.stringify([...visited]));
  }, [position, visited]);

  // Check win
  useEffect(() => {
    if (visited.size === 53) setWon(true);
  }, [visited]);

  const handleRoll = useCallback((value: number) => {
    setState((prev) => {
      const newPos = Math.min(prev.position + value, 53);
      const newVisited = new Set(prev.visited);
      newVisited.add(newPos);
      return { position: newPos, visited: newVisited };
    });
  }, []);

  const handleReset = useCallback(() => {
    setState({ position: 1, visited: new Set([1]) });
    setWon(false);
  }, []);

  const handleSquareClick = useCallback((sq: Square) => {
    setSelectedSquare(sq);
    setDialogOpen(true);
  }, []);

  return (
    <div className={`relative min-h-screen overflow-hidden bg-background ${isDayMode ? "day-mode" : ""}`}>
      {isDayMode ? <Clouds /> : <Starfield />}
      <Header progress={progress} onReset={handleReset} isDayMode={isDayMode} onToggleTheme={handleToggleTheme} />

      <main className="relative z-10 container py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Dice */}
        <div className="flex items-center justify-center gap-4">
          <DiceRoller onRoll={handleRoll} disabled={won || position >= 53} />
          <span className="text-sm text-muted-foreground font-display">
            Square {position} / 53
          </span>
        </div>

        {/* Board */}
        <BoardGrid
          squares={squares}
          position={position}
          visited={visited}
          onSquareClick={handleSquareClick}
        />

        {/* Mobile progress */}
        <div className="sm:hidden flex items-center justify-center gap-2">
          <div className="h-2 w-32 rounded-full bg-secondary overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
        </div>
      </main>

      <SquareDialog square={selectedSquare} open={dialogOpen} onOpenChange={setDialogOpen} />
      <Confetti show={won} />
    </div>
  );
}
