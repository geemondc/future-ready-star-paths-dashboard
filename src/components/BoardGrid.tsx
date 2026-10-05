import { useMemo } from "react";
import { motion } from "framer-motion";
import { Square } from "@/data/squares";
import { CircleDot, Check } from "lucide-react";

interface BoardGridProps {
  squares: Square[];
  position: number;
  visited: Set<number>;
  onSquareClick: (square: Square) => void;
}

/**
 * Arranges 53 squares in rows of 10, alternating direction (boustrophedon).
 * Row 0: L→R (ids 1-10), Row 1: R→L (ids 11-20), etc.
 */
function getGridOrder(squares: Square[]): Square[][] {
  const rows: Square[][] = [];
  for (let i = 0; i < squares.length; i += 10) {
    const row = squares.slice(i, i + 10);
    const rowIndex = Math.floor(i / 10);
    rows.push(rowIndex % 2 === 1 ? [...row].reverse() : row);
  }
  return rows;
}

export function BoardGrid({ squares, position, visited, onSquareClick }: BoardGridProps) {
  const rows = useMemo(() => getGridOrder(squares), [squares]);

  return (
    <div className="flex flex-col gap-1.5 sm:gap-2">
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="grid grid-cols-10 gap-1.5 sm:gap-2">
          {row.map((sq) => {
            const isCurrent = sq.id === position;
            const isVisited = visited.has(sq.id);

            return (
              <motion.button
                key={sq.id}
                onClick={() => onSquareClick(sq)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: sq.id * 0.012, duration: 0.3 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative flex flex-col items-center justify-center rounded-md p-1 sm:p-2 aspect-square cursor-pointer
                  transition-all duration-300 overflow-hidden
                  ${isCurrent ? "animate-pulse-glow ring-2 ring-accent bg-accent/30" : ""}
                  ${!isCurrent && isVisited ? "bg-visited/80" : ""}
                  ${!isCurrent && !isVisited ? (sq.isBlackHole ? "square-blackhole" : "square-gradient") : ""}
                  ${!isCurrent ? "hover:glow-hover" : ""}
                `}
              >
                {/* Number */}
                <span className="text-[9px] sm:text-xs font-display font-bold text-primary-foreground/90 leading-none">
                  {sq.id}
                </span>

                {/* Icon or name */}
                {sq.isBlackHole ? (
                  <CircleDot size={12} className="mt-0.5 text-primary-foreground/70 sm:w-4 sm:h-4" />
                ) : (
                  <span className="mt-0.5 text-[6px] sm:text-[8px] text-primary-foreground/70 leading-tight text-center line-clamp-2 overflow-hidden">
                    {sq.name.length > 14 ? sq.name.slice(0, 12) + "…" : sq.name}
                  </span>
                )}

                {/* Visited check */}
                {isVisited && !isCurrent && (
                  <div className="absolute top-0.5 right-0.5">
                    <Check size={10} className="text-visited" strokeWidth={3} />
                  </div>
                )}

                {/* Current player token */}
                {isCurrent && (
                  <motion.div
                    layoutId="player"
                    className="absolute -bottom-0.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-accent border-2 border-accent-foreground"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
