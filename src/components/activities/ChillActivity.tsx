import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScratchCard } from "@/components/ScratchCard";

interface ActivityPageProps {}

const chillMessages = [
  "Take a deep breath and go for a short walk outside.",
  "Listen to your favorite songs and let your mind wander.",
  "Write down things you are grateful for today.",
  "Make a cozy drink and relax.",
  "Step outside and feel the sunshine on your face.",
  "Go see some friends and have a good laugh.",
  "Do some light stretching or yoga to relax your body.",
  "Write down three small goals or wishes you want to achieve this month and try and make a plan for each one.",
  "Go grab a Matcha and have a good sip accompanied with a book or a podcast.",
  "Step outside to find a nearby park and spend a few minutes just observing nature's work.",
  "Text a friend out of the blue to laugh about a silly or funny memory.",
  "Take a quick break to drop your shoulders, stretch your neck, and release all built-up tension.",
  "Disconnect from your phone completely for thirty minutes and spend that time meditating.",
  "Put on an entertaining or interesting podcast about a topic you love while giving your eyes a rest.",
  "Organize an impromptu afternoon coffee or ice cream getaway with a friend in downtown.",
  "Open your sketchbook and draw abstract lines or free forms without judging the final result.",
  "Create a playlist with nostalgic music or soft melodies to accompany your study session.",
  "Go for a walk through your neighborhood without a fixed destination, discovering a pretty street or a new little shop.",
  "Call someone you trust just to chat about trivial things and disconnect from your responsibilities.",
  "Take a photo of a pretty detail in nature that you spot today (a flower, a tree, the sky) and smile.",
  "Host a simple, cozy dinner at home with your closest friends to share stories and unwind.",
];

export default function ChillActivity({}: ActivityPageProps) {
  const [selectedMessage, setSelectedMessage] = useState<string>("");
  const [revealedMessage, setRevealedMessage] = useState<string | null>(null);

  const randomMessage = useMemo(() => {
    const index = Math.floor(Math.random() * chillMessages.length);
    return chillMessages[index] || "";
  }, []);

  useEffect(() => {
    setSelectedMessage(randomMessage);
  }, [randomMessage]);

  return (
    <div className="space-y-6 m-10">
      <Card className="max-w-lg mx-auto">
        <CardHeader className="gap-4">
          <CardTitle className="text-3xl font-bold">
            Chill Activity 😮‍💨
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-slate-700 text-justify">
            Sometimes we just need a moment to relax and to breath, to spend
            some time alone or with friends, to make sure you take things slowly
            and enjoy your summer to the fullest, scratch the card to reveal a
            random activity you can do today!
          </p>
        </CardContent>
      </Card>

      <Card className="max-w-lg mx-auto">
        <CardHeader className="gap-4">
          <CardTitle className="text-lg font-semibold">Scratch & Win</CardTitle>
        </CardHeader>
        <CardContent>
          <ScratchCard
            text={selectedMessage}
            onReveal={(value) => setRevealedMessage(value)}
            width={250}
            className="mx-auto h-auto w-auto"
          />

          {revealedMessage ? (
            <div className="mt-4 rounded-3xl border border-pink-200 bg-pink-50/80 px-4 py-4 text-sm text-slate-800 shadow-sm">
              <div className="font-semibold text-pink-900">
                Revealed message:
              </div>
              <div className="mt-2 text-base">{revealedMessage}</div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
