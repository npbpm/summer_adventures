import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import AbstractBird from "../../assets/DrawingsImages/abstract_bird.png";
import AirBalloon from "../../assets/DrawingsImages/air_balloon.png";
import BalletSlippers from "../../assets/DrawingsImages/ballet_slippers.png";
import Bike from "../../assets/DrawingsImages/bike.png";
import Butterflies from "../../assets/DrawingsImages/butterflies.png";
import CatInBlanket from "../../assets/DrawingsImages/cat_in_blanket.png";
import CofeeCups from "../../assets/DrawingsImages/cofee_cups.png";
import Envelope from "../../assets/DrawingsImages/envelope.png";
import MinimalisticFlowers from "../../assets/DrawingsImages/minimalistic_flowers.png";
import NightSkyDreamscape from "../../assets/DrawingsImages/night_sky_dreamscape.png";
import RoseBud from "../../assets/DrawingsImages/rose_bud.png";
import SleepingFox from "../../assets/DrawingsImages/sleeping_fox.png";
import Terrarium from "../../assets/DrawingsImages/terrarium.png";
import Tree from "../../assets/DrawingsImages/tree.png";

interface DrawingSuggestion {
  name: string;
  description: string;
}

interface DrawingResponse extends DrawingSuggestion {
  image: string;
}

interface ActivityPageProps {}

const DrawingsInfo = [
  {
    name: "cat_in_blanket",
    description:
      "A whimsical, minimalist cat outlined in soft pastel lavenders, comfortably wrapped in a cosy striped blanket, surrounded by floating hearts and a subtle botanical flourish.",
  },
  {
    name: "minimalistic_flowers",
    description:
      "An elegant, minimal continuous line drawing of three wildflowers and subtle leaves, rendered in a soothing sage green pastel, symbolizing the growth and resilience you see in her studies.",
  },
  {
    name: "night_sky_dreamscape",
    description:
      "A dreamy, abstract sky landscape featuring soft pastel clouds and a gentle crescent moon, with small, shimmering stars. The entire scene uses the same soft pastel palette and calming, hand-drawn texture established in the other ideas.",
  },
  {
    name: "abstract_bird",
    description:
      "A simple, abstract silhouette of a bird in flight, rendered in a single, flowing pastel blue line against a plain cream background.",
  },
  {
    name: "cofee_cups",
    description:
      "A pair of minimalist, hand-drawn coffee cups, linked by a subtle heart shape, illustrated in warm, pastel peach tones on textured paper.",
  },
  {
    name: "terrarium",
    description:
      "A stylized, geometric terrarium, visualized as an open glass droplet. Inside, simple pastel succulents are nestled with minimal botanical lines, maintaining the clean, feminine aesthetic.",
  },
  {
    name: "ballet_slippers",
    description:
      "A pair of stylized, simple ballet slippers, tied together by a flowing pastel pink ribbon, rendered as continuous line art with soft, grainy pastel textures.",
  },
  {
    name: "rose_bud",
    description:
      "A simple, beautiful line drawing of a single rose bud, its stem curving into a gentle heart shape, using soft pastel pink and sage green.",
  },
  {
    name: "butterflies",
    description:
      "A cluster of abstract, minimalist butterflies, their wings suggested by soft pastel watercolor washes in lavender, mint, and sky blue.",
  },
  {
    name: "envelope",
    description:
      "A tiny, minimalist envelope, from which a continuous line drawing of a leafy vine and tiny hearts grows.",
  },
  {
    name: "sleeping_fox",
    description:
      "A stylized, single, flowing line drawing of a sleeping fox, curled into a perfect circle, using soft pastel orange and cream.",
  },
  {
    name: "feather",
    description:
      "A single, beautiful pastel feather, illustrated with very fine lines and a grainy texture.",
  },
  {
    name: "bike",
    description:
      "A minimalist outline of a bike, its basket overflowing with simple, continuous line flowers in pastel pink, yellow, and blue.",
  },
  {
    name: "air_balloon",
    description:
      "A minimalist outline of a hot air balloon, its basket trailing a single, flowing pastel ribbon and a small, stylized heart.",
  },
  {
    name: "tree",
    description:
      "A small, minimal, abstract tree, its branches forming a circle, with tiny, stylized leaves in soft pastel greens and yellows.",
  },
];

export default function ArtActivity({}: ActivityPageProps) {
  const [drawingResponse, setDrawingResponse] =
    useState<DrawingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDebounced, setIsDebounced] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        window.clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const showRandomDrawing = async () => {
    if (isLoading || isDebounced) return;

    setIsLoading(true);
    setIsDebounced(true);
    setError(null);

    debounceTimer.current = window.setTimeout(() => {
      setIsDebounced(false);
    }, 1000);

    try {
      const randomIndex = Math.floor(Math.random() * DrawingsInfo.length);
      const drawing = DrawingsInfo[randomIndex];

      const imageMap: Record<string, string> = {
        abstract_bird: AbstractBird,
        air_balloon: AirBalloon,
        ballet_slippers: BalletSlippers,
        bike: Bike,
        butterflies: Butterflies,
        cat_in_blanket: CatInBlanket,
        cofee_cups: CofeeCups,
        envelope: Envelope,
        minimalistic_flowers: MinimalisticFlowers,
        night_sky_dreamscape: NightSkyDreamscape,
        rose_bud: RoseBud,
        sleeping_fox: SleepingFox,
        terrarium: Terrarium,
        tree: Tree,
      };

      setDrawingResponse({
        ...drawing!,
        image: imageMap[drawing!.name],
      });
    } catch (err) {
      setError("Could not load a drawing right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 min-h-[80vh] flex flex-col justify-center p-2 align-top mt-15">
      <Card className="max-w-lg mx-auto">
        <CardHeader className="gap-4">
          <CardTitle className="text-3xl font-bold">Art Activity 🎨</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-slate-700 text-justify">
            Because we like to keep our promises, I created this little helper
            for you to give you some ideas for a drawing or painting. Whether it
            is something that brings you joy or nice memories, I want to see
            everything you do!
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4 max-w-lg mx-auto">
        <Button
          onClick={showRandomDrawing}
          disabled={isLoading}
          className="w-full bg-pink-100 text-pink-900 hover:bg-pink-200 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? "Finding your idea..." : "Get An Idea!"}
        </Button>

        {error ? (
          <Card className="rounded-3xl border border-red-200 bg-red-50 px-6 py-10 text-center">
            <p className="text-sm text-red-700">{error}</p>
          </Card>
        ) : null}

        {drawingResponse ? (
          <Card className="overflow-hidden rounded-3xl shadow-lg">
            <div className="h-72 w-full overflow-hidden bg-slate-50 p-1 rounded-2xl">
              {isLoading ? (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
                  <Spinner className="h-10 w-10 text-pink-600" />
                </div>
              ) : null}
              <img
                src={drawingResponse.image}
                alt={drawingResponse.name}
                className="w-full h-72 object-cover"
              />
            </div>
            <CardContent>
              <h2 className="text-xl font-semibold text-slate-900">
                {drawingResponse.name
                  .replace(/_/g, " ")
                  .replace(/^./, (first) => first.toUpperCase())}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {drawingResponse.description}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="rounded-3xl border border-dashed border-pink-200 bg-pink-50/80 px-6 py-10 text-center h-max">
            <p className="text-sm text-pink-800">
              Click the button to receive some inspiration.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
