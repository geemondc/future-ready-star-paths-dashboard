import { Rocket, Rewind, Map, Moon, Sun } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface HeaderProps {
  progress: number;
  onReset: () => void;
  isDayMode: boolean;
  onToggleTheme: () => void;
}

export function Header({ progress, onReset, isDayMode, onToggleTheme }: HeaderProps) {
  const handleTitleClick = () => {
    window.location.reload();
  };

  return (
    <header className="relative z-10 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="container flex items-center justify-between gap-4 py-3">
        <div className="flex-1 min-w-0">
          <button
            onClick={handleTitleClick}
            className="text-left group"
          >
            <h1 className="font-display text-lg font-bold tracking-tight text-foreground sm:text-2xl group-hover:text-primary transition-colors">
              Star Paths
            </h1>
            <p className="text-xs text-muted-foreground truncate">
              Explore the Future Ready universe.
            </p>
          </button>
        </div>

        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={onToggleTheme}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
            title={isDayMode ? "Night Mode" : "Day Mode"}
          >
            {isDayMode ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button onClick={onReset} className="flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-bold font-display text-destructive bg-destructive/10 border border-destructive/30 transition-colors hover:bg-destructive/20 hover:text-destructive-foreground hover:bg-destructive" title="Reset Game">
            <Rewind size={16} />
            <span className="hidden sm:inline">GAME RESET</span>
          </button>
          <button className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary" title="Map">
            <Map size={18} />
          </button>
          <button className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary" title="Launch">
            <Rocket size={18} />
          </button>
        </nav>

        <div className="hidden w-32 sm:flex items-center gap-2">
          <Progress value={progress} className="h-2" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </header>
  );
}
