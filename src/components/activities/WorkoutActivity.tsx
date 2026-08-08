import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardRoulette } from "@/components/CardRoulette";

interface ActivityPageProps {}

export default function WorkoutActivity({}: ActivityPageProps) {
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);

  const workoutOptions = [
    "Cardio & Abs",
    "Leg Day",
    "Chest & Back",
    "Arms & Shoulders",
    "Upper Body",
    "Lower Body",
    "Yoga",
    "Pilates",
    "Stretch session",
    "Running",
    "Rope Jumping",
  ];

  return (
    <div className="space-y-6 flex flex-col justify-center p-2 align-top">
      <Card className="max-w-lg mx-auto">
        <CardHeader className="gap-4">
          <CardTitle className="text-3xl font-bold">
            Workout Activity 🤸‍♀️
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-slate-700">
            I know that it is hard and nobody wants to workout when on vacation,
            but it is very important! At least with this you don' t need to
            chose 😀​, so get up and go move your body!
          </p>
        </CardContent>
      </Card>

      <Card className="max-w-lg mx-auto">
        <CardHeader className="gap-4">
          <CardTitle className="text-lg font-semibold">
            Workout Roulette 🎲
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardRoulette
            options={workoutOptions}
            onResult={(result) => setSelectedWorkout(result)}
          />
          {selectedWorkout ? (
            <div className="mt-4 rounded-3xl border border-pink-200 bg-pink-50/80 px-4 py-4 text-sm text-slate-800 shadow-sm">
              <div className="font-semibold text-pink-900">
                Selected workout:
              </div>
              <div className="mt-2 text-base">{selectedWorkout}</div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
