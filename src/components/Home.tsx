import { useNavigate } from "react-router-dom";
import ActivityOption from "./ActivityOption";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import cat from "../assets/svgs/cat.svg";
import { HiPaintBrush } from "react-icons/hi2";
import { RiDrinks2Fill, RiGitbookFill } from "react-icons/ri";
import { LiaDumbbellSolid } from "react-icons/lia";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-3 text-center relative z-10">
      <div className="flex justify-center items-center gap-8 translate-y-9">
        <HoverCard openDelay={10} closeDelay={100}>
          <HoverCardTrigger asChild>
            <div className="group inline-flex rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
              <img
                src={cat}
                alt="Cat Logo"
                className="h-36 w-auto rounded-3xl transition-all duration-300 group-hover:-rotate-3 group-hover:scale-105"
              />
            </div>
          </HoverCardTrigger>
          <HoverCardContent
            className="mt-2 rounded-3xl bg-pink-50/95 text-pink-950 shadow-xl shadow-pink-200/40 border border-pink-100"
            side="top"
          >
            <div className="text-sm font-semibold tracking-wide text-align-center">
              Puuuuuurrrrrr
            </div>
            <div className="mt-1 text-xs text-pink-700/80">Miau Miau!</div>
          </HoverCardContent>
        </HoverCard>
      </div>
      <Card className="max-w-lg mx-auto">
        <CardHeader className="gap-4">
          <CardTitle className="text-3xl font-bold">
            Tati's summer activity helper
          </CardTitle>
          <CardDescription className="text-sm text-center">
            Heeeey so I know it might be hard to choose an activity during the
            summer, so I made this little app to help you out! Just select an
            activity and follow the instructions. Enjoy! PD: Don't hesitate on
            petting the cat, she loves it!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <ActivityOption
              icon={<HiPaintBrush />}
              text="Art and inspiration​"
              route="/art"
              onNavigate={navigate}
            />
            <ActivityOption
              icon={<RiGitbookFill />}
              text="Working and studying"
              route="/study"
              onNavigate={navigate}
            />
            <ActivityOption
              icon={<LiaDumbbellSolid />}
              text="Working out"
              route="/workout"
              onNavigate={navigate}
            />
            <ActivityOption
              icon={<RiDrinks2Fill />}
              text="Disconnect"
              route="/chill"
              onNavigate={navigate}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
