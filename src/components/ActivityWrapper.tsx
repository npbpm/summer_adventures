import { Outlet, useNavigate } from "react-router-dom";
import standingCat from "../assets/svgs/standing-cat.svg";
import { Fragment } from "react/jsx-runtime";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "./ui/button";
import { FaArrowLeft } from "react-icons/fa6";

interface ActivityWrapperProps {
  catText: string;
}

function ActivityWrapper({ catText }: ActivityWrapperProps) {
  const navigate = useNavigate();
  return (
    <Fragment>
      <HoverCard openDelay={10} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label="Go Back"
            className="fixed top-4 left-4 z-10 bg-white/70"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate(-1);
            }}
          >
            <FaArrowLeft />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent
          className="mt-2 rounded-3xl bg-pink-50/95 text-pink-950 shadow-xl shadow-pink-200/40 border border-pink-100 text-center"
          side="right"
        >
          <div className="text-sm font-semibold tracking-wide text-align-center">
            Go Back to home page
          </div>
        </HoverCardContent>
      </HoverCard>
      <Outlet />
      <div className="flex justify-center items-center gap-8 mb-8 relative bottom-0 left-0 transform translate-y-5.5">
        <HoverCard openDelay={10} closeDelay={100}>
          <HoverCardTrigger asChild>
            <div className="group inline-flex rounded-3xl transition-all duration-300 hover:-translate-y-1">
              <img
                src={standingCat}
                alt="Cat Logo"
                className="h-26 w-auto rounded-3xl transition-all duration-300"
              />
            </div>
          </HoverCardTrigger>
          <HoverCardContent
            className="mt-2 rounded-3xl bg-pink-50/95 text-pink-950 shadow-xl shadow-pink-200/40 border border-pink-100"
            side="top"
          >
            <div className="text-sm font-semibold tracking-wide text-align-center">
              Miau Miau!
            </div>
            <div className="mt-1 text-xs text-pink-700/80">{catText}</div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </Fragment>
  );
}

export default ActivityWrapper;
