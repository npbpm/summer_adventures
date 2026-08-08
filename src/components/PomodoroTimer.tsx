import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover";

const WORK_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function PomodoroTimer() {
  const [sessionType, setSessionType] = useState<"work" | "break">("work");
  const [timeLeft, setTimeLeft] = useState(WORK_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [message, setMessage] = useState("Ready to focus.");
  const intervalRef = useRef<number | null>(null);
  const stopDebounceRef = useRef<number | null>(null);

  const initialTime = sessionType === "work" ? WORK_SECONDS : BREAK_SECONDS;
  const sessionLabel = sessionType === "work" ? "Work" : "Break";

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsRunning(false);
          setMessage(
            sessionType === "work"
              ? "Work session complete! Ready for break."
              : "Break finished! Ready for another work session.",
          );
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, sessionType]);

  useEffect(() => {
    return () => {
      if (stopDebounceRef.current) {
        window.clearTimeout(stopDebounceRef.current);
      }
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(initialTime);
    }
    setIsRunning(true);
    setMessage(`${capitalize(sessionLabel)} session running.`);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
    setMessage("Timer reset to initial time.");
  };

  const confirmStop = () => {
    setIsRunning(false);
    setIsPopoverOpen(false);
    setMessage("Timer stopped. Resume whenever you're ready.");
  };

  const handleStopClick = () => {
    if (stopDebounceRef.current) {
      window.clearTimeout(stopDebounceRef.current);
    }

    stopDebounceRef.current = window.setTimeout(() => {
      setIsPopoverOpen(true);
    }, 50);
  };

  return (
    <div>
      <Card>
        <CardHeader className="gap-4">
          <div>
            <CardTitle className="text-3xl font-bold text-center">
              Pomodoro Timer 🍅​
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="rounded-3xl border border-pink-200 bg-pink-50/80 px-6 py-8 text-center shadow-sm">
              <div className="text-sm uppercase tracking-[0.3em] text-pink-800/80">
                {sessionLabel} session
              </div>
              <div className="mt-4 text-6xl font-semibold text-slate-900">
                {formatTime(timeLeft || initialTime)}
              </div>
              <div className="mt-2 text-sm text-slate-600">{message}</div>
            </div>

            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <Button
                onClick={startTimer}
                disabled={isRunning && timeLeft > 0}
                className="w-full bg-pink-100 text-pink-900 hover:bg-pink-200 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isRunning
                  ? "Running"
                  : timeLeft === 0
                    ? `Start ${sessionLabel}`
                    : "Start / Resume"}
              </Button>

              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="destructive"
                    className="w-full bg-pink-900 text-white hover:bg-pink-800"
                    disabled={!isRunning}
                    onClick={handleStopClick}
                  >
                    Stop
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="center" sideOffset={6} className="w-80">
                  <PopoverHeader>
                    <PopoverTitle>Are you sure?</PopoverTitle>
                    <PopoverDescription>
                      If you stop now, the timer will pause and you can resume
                      later or reset to the original time.
                    </PopoverDescription>
                  </PopoverHeader>
                  <div className="mt-4 flex flex-col gap-3">
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={confirmStop}
                    >
                      Stoooop!
                    </Button>
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() => setIsPopoverOpen(false)}
                    >
                      Keep going
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                variant="secondary"
                className="w-full"
                onClick={resetTimer}
                disabled={isRunning}
              >
                Reset
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  const newSession = sessionType === "work" ? "break" : "work";
                  setSessionType(newSession);
                  setTimeLeft(
                    newSession === "work" ? WORK_SECONDS : BREAK_SECONDS,
                  );
                  setIsRunning(false);
                  setMessage("Session type switched. Ready when you are.");
                }}
                disabled={isRunning}
              >
                Switch session
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
