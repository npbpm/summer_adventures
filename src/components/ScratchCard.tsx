import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScratchCardProps {
  text: string;
  onReveal: (value: string) => void;
  className?: string;
  width?: number;
  height?: number;
  threshold?: number;
}

function normalizeLabel(label: string) {
  return label.replace(/_/g, " ").replace(/^./, (first) => first.toUpperCase());
}

export function ScratchCard({
  text,
  onReveal,
  className,
  width = 360,
  height = 220,
  threshold = 0.8,
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [wasTouched, setWasTouched] = useState(false);
  const isRevealedRef = useRef(false);
  const scratchStepRef = useRef(0);

  const textLabel = useMemo(() => normalizeLabel(text), [text]);

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.fillStyle = "#d3d3d3";
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = "source-over";
  };

  const getPointerPosition = (event: PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const revealOverlay = () => {
    if (isRevealedRef.current) return;
    isRevealedRef.current = true;
    setIsRevealed(true);
    onReveal(text);
  };

  const computeRevealedRatio = () => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext("2d");
    if (!ctx) return 0;

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixelData = imageData.data;
    let transparentPixels = 0;
    const totalPixels = pixelData.length / 4;

    for (let i = 3; i < pixelData.length; i += 4) {
      if (pixelData[i] === 0) transparentPixels += 1;
    }

    return transparentPixels / totalPixels;
  };

  const scratchAtPoint = (event: PointerEvent) => {
    setWasTouched(true);

    const canvas = canvasRef.current;
    if (!canvas || isRevealedRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const position = getPointerPosition(event);
    if (!position) return;

    const radius = 24;
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(position.x, position.y, radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.restore();

    scratchStepRef.current += 1;
    if (scratchStepRef.current % 6 === 0) {
      const ratio = computeRevealedRatio();
      if (ratio >= threshold) {
        revealOverlay();
      }
    }
  };

  useEffect(() => {
    initializeCanvas();
    isRevealedRef.current = false;
    setIsRevealed(false);
    scratchStepRef.current = 0;
  }, [text, width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (
        event.pointerType === "mouse" ||
        event.pointerType === "pen" ||
        event.pointerType === "touch"
      ) {
        scratchAtPoint(event);
      }
    };

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerdown", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerMove);

    return () => {
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerdown", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerMove);
    };
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-pink-200 bg-gradient-to-b from-pink-50 via-white to-slate-50 shadow-lg",
        className,
      )}
      style={{ width }}
    >
      <div className="min-h-[220px] p-6 text-center">
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <div className="text-sm uppercase tracking-[0.3em] text-pink-800/80">
            Scratch & Win
          </div>
          <div className="mx-auto max-w-[80%] text-lg font-semibold leading-snug text-slate-900 overflow-scroll">
            {textLabel}
          </div>
          <div className="text-xs text-slate-500">
            Scratch with your mouse or finger to reveal.
          </div>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className={cn(
          "absolute left-0 top-0 h-full w-full touch-none",
          isRevealed
            ? "opacity-0 transition-opacity duration-700"
            : "opacity-100",
        )}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          touchAction: "none",
        }}
      />

      {!wasTouched ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 mx-auto flex w-full justify-center text-sm text-white text-center">
          Keep scratching until the card is revealed.
        </div>
      ) : null}
    </div>
  );
}
