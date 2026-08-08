import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CardRouletteProps {
  options: string[];
  onResult?: (result: string) => void;
  className?: string;
}

function normalizeLabel(label: string) {
  return label.replace(/_/g, " ").replace(/^./, (first) => first.toUpperCase());
}

export function CardRoulette({
  options,
  onResult,
  className,
}: CardRouletteProps) {
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isChoosing, setIsChoosing] = useState(false);
  const timerRef = useRef<number | null>(null);

  const cleanupTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startChoosing = () => {
    if (isChoosing || options.length === 0) return;

    cleanupTimer();
    setSelectedIndex(null);
    setIsChoosing(true);

    const chosenIndex = Math.floor(Math.random() * options.length);
    const totalSteps = options.length * 3 + chosenIndex;
    let currentStep = 0;
    let delay = 80;

    const spin = () => {
      const nextIndex = currentStep % options.length;
      setHighlightIndex(nextIndex);

      if (currentStep === totalSteps) {
        setIsChoosing(false);
        setSelectedIndex(chosenIndex);
        setHighlightIndex(chosenIndex);
        if (options[chosenIndex]) {
          onResult?.(options[chosenIndex]);
        }
        timerRef.current = null;
        return;
      }

      currentStep += 1;
      delay = Math.min(260, delay + 18);
      timerRef.current = window.setTimeout(spin, delay);
    };

    spin();
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid gap-3 grid-cols-3">
        {options.map((option, index) => {
          const isActive = index === highlightIndex;
          const isSelected = selectedIndex !== null && index === selectedIndex;
          return (
            <div
              key={option}
              className={cn(
                "rounded-2xl border p-4 text-sm text-center transition-all duration-300",
                isSelected
                  ? "border-pink-900 bg-pink-100 text-pink-900 shadow-lg"
                  : isActive
                    ? "border-pink-500 bg-pink-50 text-pink-800 shadow-md"
                    : "border-slate-200 bg-white text-slate-800",
              )}
            >
              {normalizeLabel(option)}
            </div>
          );
        })}
      </div>

      <div>
        <Button
          onClick={startChoosing}
          disabled={isChoosing || options.length === 0}
          className="w-full bg-pink-100 text-pink-900 hover:bg-pink-200 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isChoosing ? "Choosing..." : "Choose workout"}
        </Button>
      </div>
    </div>
  );
}
