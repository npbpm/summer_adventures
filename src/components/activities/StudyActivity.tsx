import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PomodoroTimer from "../PomodoroTimer";

interface ActivityPageProps {}

export default function StudyActivity({}: ActivityPageProps) {
  const debounceTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        window.clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className="space-y-6 min-h-[80vh] flex flex-col justify-center p-2 align-top">
      <Card className="max-w-lg mx-auto">
        <CardHeader className="gap-4">
          <CardTitle className="text-3xl font-bold">
            Study Activity 📔​
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-slate-700 text-justify">
            This activity lets you follow the{" "}
            <a
              href="https://fr.wikipedia.org/wiki/Technique_Pomodoro"
              className="text-pink-600 underline"
            >
              Pomodoro technique
            </a>
            , a time management method that encourages focused study sessions
            followed by short breaks. It might help you keep ypur mind fresh and
            productive without it feeling like a burden.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <PomodoroTimer />
      </div>
    </div>
  );
}
