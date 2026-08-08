import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface DrawingSuggestion {
  name: string;
  description: string;
}

interface DrawingResponse extends DrawingSuggestion {
  image: string;
}

interface ActivityPageProps {}

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
      const response = await fetch("/api/drawing/random");
      if (!response.ok) {
        throw new Error("Failed to load a random drawing.");
      }

      const data = (await response.json()) as DrawingResponse;
      setDrawingResponse(data);
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
