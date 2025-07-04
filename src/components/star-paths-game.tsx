"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Rewind, Map, Star, Award, Sparkles, X, Menu } from 'lucide-react';
import { boardSquares, boosters, blackHoles, BOARD_SIZE, GRID_COLUMNS, GRID_ROWS } from '@/lib/game-data';
import type { BoardSquareData } from '@/lib/game-data';
import { BlackHoleIcon, DiceIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import Confetti from 'react-confetti';
import { useTheme } from 'next-themes';
import { ThemeToggle } from './theme-toggle';

export function StarPathsGame() {
  const [position, setPosition] = useState(1);
  const [visited, setVisited] = useState<number[]>([]);
  const [lastRoll, setLastRoll] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState<BoardSquareData | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const boardRef = useRef<HTMLDivElement>(null);
  const squareRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { toast } = useToast();
  const { theme } = useTheme();

  useEffect(() => {
    const savedPosition = localStorage.getItem('starpaths_position');
    const savedVisited = localStorage.getItem('starpaths_visited');
    if (savedPosition) setPosition(parseInt(savedPosition, 10));
    if (savedVisited) setVisited(JSON.parse(savedVisited));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if(hydrated) {
      localStorage.setItem('starpaths_position', position.toString());
      localStorage.setItem('starpaths_visited', JSON.stringify(visited));
    }
  }, [position, visited, hydrated]);

  useEffect(() => {
    if (visited.length === BOARD_SIZE && !gameWon) {
      setGameWon(true);
      toast({
        title: "Congratulations, Commander!",
        description: "You've explored the entire Gee-Verse!",
        duration: 5000,
      });
    }
  }, [visited, gameWon, toast]);
  
  useEffect(() => {
    const square = squareRefs.current[position];
    if (square) {
      square.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  }, [position]);

  const handleSquareClick = (square: BoardSquareData) => {
    movePlayer(square.square);
    setSelectedSquare(square);
    setShowSidebar(true);
  };
  
  const movePlayer = (targetPosition: number) => {
    setPosition(targetPosition);
    if (!visited.includes(targetPosition)) {
      setVisited([...visited, targetPosition]);
    }
  }

  const handleRoll = () => {
    if (isRolling) return;
    setIsRolling(true);
    const roll = Math.floor(Math.random() * 6) + 1;
    setLastRoll(roll);

    let currentPos = position;
    const targetPos = Math.min(position + roll, BOARD_SIZE);

    const moveInterval = setInterval(() => {
      currentPos++;
      if (currentPos <= targetPos) {
        setPosition(currentPos);
      } else {
        clearInterval(moveInterval);
        setTimeout(() => {
          const boosterTarget = boosters[targetPos];
          const blackHoleTarget = blackHoles[targetPos];
          
          if (boosterTarget) {
            toast({ title: "🚀 Booster!", description: `Warping from ${targetPos} to ${boosterTarget}!` });
            movePlayer(boosterTarget);
          } else if (blackHoleTarget) {
            toast({ title: "⚫ Black Hole!", description: `Falling back from ${targetPos} to ${blackHoleTarget}!`, variant: "destructive" });
            movePlayer(blackHoleTarget);
          } else {
            movePlayer(targetPos);
          }
          setIsRolling(false);
          const currentSquareData = boardSquares.find(s => s.square === (boosterTarget || blackHoleTarget || targetPos));
          if(currentSquareData) {
            handleSquareClick(currentSquareData);
          }
        }, 300);
      }
    }, 200);
  };

  const resetGame = () => {
    setPosition(1);
    setVisited([]);
    setLastRoll(null);
    setGameWon(false);
    localStorage.removeItem('starpaths_position');
    localStorage.removeItem('starpaths_visited');
    toast({ title: "Game Reset", description: "Your cosmic journey begins anew!" });
  };
  
  const progress = useMemo(() => (visited.length / BOARD_SIZE) * 100, [visited]);

  const boardLayout = useMemo(() => {
    const layout = [];
    for (let i = 0; i < GRID_ROWS; i++) {
        const rowSquares = boardSquares.slice(i * GRID_COLUMNS, (i + 1) * GRID_COLUMNS);
        layout.push(rowSquares);
    }
    return layout;
  }, []);

  if (!hydrated) {
    return <div className="flex items-center justify-center min-h-screen"><Rocket className="w-16 h-16 animate-pulse" /></div>;
  }

  const PlayerAvatar = () => {
    const squareRef = squareRefs.current[position];
    if (!squareRef || !boardRef.current) return null;

    const boardRect = boardRef.current.getBoundingClientRect();
    const squareRect = squareRef.getBoundingClientRect();
    
    if (squareRect.width === 0) return null;

    const top = squareRect.top - boardRect.top + squareRect.height / 4;
    const left = squareRect.left - boardRect.left + squareRect.width / 4;
    const width = squareRect.width / 2;
    const height = squareRect.height / 2;

    return (
        <motion.div
            className="absolute z-20"
            initial={false}
            animate={{ top, left, width, height }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
            <Rocket className="w-full h-full text-solar-gold drop-shadow-lg -rotate-45" />
        </motion.div>
    );
  };

  return (
    <TooltipProvider>
      {gameWon && <Confetti width={window.innerWidth} height={window.innerHeight} colors={[
        '#9BF6FF', '#FF8FA3', '#CAB8FF', '#FFCF56'
      ]} />}
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        <header className="w-full flex flex-col md:flex-row items-center justify-between p-4 mb-4 gap-4 text-center md:text-left">
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-headline font-black text-glow">Mission Control</h1>
            <p className="text-md md:text-xl text-primary/80">Roll the die, dodge space slides, and learn along your journey</p>
          </div>
          <div className="flex items-center gap-2 md:gap-4 p-2 rounded-full bg-background/50 backdrop-blur-sm border border-primary/20">
             <ThemeToggle />
             <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={resetGame}><Rewind /></Button>
                </TooltipTrigger>
                <TooltipContent><p>Reset Game</p></TooltipContent>
            </Tooltip>
            <Dialog>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon"><Map /></Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent><p>View Map</p></TooltipContent>
                </Tooltip>
                <DialogContent className="max-w-3xl bg-background/80 backdrop-blur-md">
                    <DialogHeader>
                        <DialogTitle className="text-glow">Gee-Verse Map</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-10 gap-1">
                        {boardSquares.map(sq => (
                            <Tooltip key={sq.id}>
                                <TooltipTrigger asChild>
                                    <button
                                      onClick={() => handleSquareClick(sq)}
                                      className={cn("w-full aspect-square rounded-md flex items-center justify-center text-xs font-bold", 
                                        visited.includes(sq.square) ? "bg-starlight-mint/50" : "bg-rocket-flame-coral/50",
                                        position === sq.square && "ring-2 ring-solar-gold ring-offset-2 ring-offset-background"
                                      )}>
                                      {sq.square}
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent><p>{sq.name}</p></TooltipContent>
                            </Tooltip>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
            <div className="flex items-center gap-2">
                <Rocket className="text-starlight-mint" />
                <div className="w-24 h-4 bg-secondary rounded-full overflow-hidden border border-primary/20">
                    <div className="h-full bg-starlight-mint transition-all duration-500" style={{width: `${progress}%`}}></div>
                </div>
                <span className="text-sm font-bold w-12 text-right">{Math.round(progress)}%</span>
            </div>
          </div>
        </header>

        <div ref={boardRef} className="w-full relative p-2 md:p-4 bg-background/30 backdrop-blur-sm rounded-2xl border-2 border-primary/20 shadow-2xl">
            <AnimatePresence>
                <PlayerAvatar />
            </AnimatePresence>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                {boardLayout.flat().map((square) => {
                    const isVisited = visited.includes(square.square);
                    const isCurrent = position === square.square;
                    const isBooster = !!boosters[square.square];
                    const isBlackHole = !!blackHoles[square.square];

                    return (
                        <div key={square.id} ref={el => squareRefs.current[square.square] = el}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <motion.button
                                        onClick={() => handleSquareClick(square)}
                                        className={cn(
                                            "relative w-full aspect-square rounded-lg p-2 flex flex-col justify-between items-center text-left transition-all duration-300 transform hover:scale-105 hover:z-10 focus:z-10",
                                            isVisited ? 'bg-starlight-mint/20 border-starlight-mint/50' : 'bg-rocket-flame-coral/20 border-rocket-flame-coral/50',
                                            isCurrent && 'ring-4 ring-solar-gold shadow-2xl scale-105 z-10',
                                            isBooster && 'border-green-400',
                                            isBlackHole && 'border-red-400',
                                            "border-2"
                                        )}
                                        whileHover={{y: -5}}
                                    >
                                        <div className="w-full flex justify-between items-center">
                                            <span className={cn(
                                                "text-sm md:text-lg font-black",
                                                isVisited ? 'text-starlight-mint' : 'text-rocket-flame-coral'
                                            )}>{square.square}</span>
                                            {isBooster && <Rocket className="w-4 h-4 text-green-400" />}
                                            {isBlackHole && <BlackHoleIcon className="w-4 h-4 text-red-400" />}
                                        </div>
                                        <p className="text-[8px] md:text-xs font-bold text-foreground/80 leading-tight line-clamp-2">{square.name}</p>
                                    </motion.button>
                                </TooltipTrigger>
                                <TooltipContent className="text-center">
                                    <p className="font-bold">{square.name}</p>
                                    <p>{square.description}</p>
                                    {isBooster && <p className="text-green-400">Booster to {boosters[square.square]}!</p>}
                                    {isBlackHole && <p className="text-red-400">Black Hole to {blackHoles[square.square]}!</p>}
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    );
                })}
            </div>
        </div>

        <footer className="w-full flex flex-col items-center justify-center p-4 mt-4 gap-4">
             <div className="flex items-center gap-4">
                <Button 
                    size="lg" 
                    onClick={handleRoll} 
                    disabled={isRolling || gameWon} 
                    className="font-headline font-black text-2xl h-16 px-8 rounded-full bg-solar-gold text-background hover:bg-solar-gold/90 shadow-lg transform hover:scale-105 transition-transform"
                >
                    <DiceIcon className="w-8 h-8 mr-4" />
                    {isRolling ? 'Rolling...' : 'ROLL DIE'}
                </Button>
                {lastRoll && <div className="text-6xl font-black text-glow">{lastRoll}</div>}
            </div>
            {gameWon && (
              <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="text-center mt-4">
                <h2 className="text-4xl font-headline font-black text-glow">YOU ARE A GEE-VERSE COMMANDER!</h2>
                <Button onClick={resetGame} className="mt-4" variant="secondary">Play Again</Button>
              </motion.div>
            )}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-sm">
                <a href="https://ready-future-hub-life.lovable.app/" target="_blank" rel="noopener noreferrer" className="link-shine font-bold">Future Ready Link Hub</a>
                <a href="https://dr-gee-advice-hub.lovable.app/" target="_blank" rel="noopener noreferrer" className="link-shine font-bold">The Dr. Recommends</a>
                <a href="https://www.etsy.com/shop/FutureReadyShop" target="_blank" rel="noopener noreferrer" className="link-shine font-bold">ETSY Shop</a>
                <a href="https://www.futurereadydiscoveries.com" target="_blank" rel="noopener noreferrer" className="link-shine font-bold">Future Ready Discoveries</a>
                <a href="https://www.futurereadyownyourday.com" target="_blank" rel="noopener noreferrer" className="link-shine font-bold">Own Your Day</a>
            </div>
        </footer>
      </div>
      <Sheet open={showSidebar} onOpenChange={setShowSidebar}>
        <SheetContent className="w-full sm:max-w-xs bg-background/50 backdrop-blur-lg border-primary/20 text-foreground">
            {selectedSquare && (
                <>
                <SheetHeader>
                    <SheetTitle className="text-3xl font-headline font-black text-glow">{selectedSquare.name}</SheetTitle>
                    <SheetDescription className="text-primary/80 pt-2">{selectedSquare.description}</SheetDescription>
                </SheetHeader>
                <div className="py-8 text-center">
                    <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <a href={selectedSquare.url} target="_blank" rel="noopener noreferrer">
                            Visit Sector <Rocket className="w-4 h-4 ml-2" />
                        </a>
                    </Button>
                    <p className="text-xs text-muted-foreground mt-4">This will open in a new tab.</p>
                </div>
                </>
            )}
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  );
}
