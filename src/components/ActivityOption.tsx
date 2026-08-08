import React from "react";
import { Button } from "@/components/ui/button";

interface ActivityOptionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.JSX.Element;
  text: string;
  route: string;
  onNavigate?: (route: string) => void;
}

export default function ActivityOption({
  icon,
  text,
  route,
  onNavigate,
  className,
  onClick,
  ...props
}: ActivityOptionProps) {
  const label = String(text ?? "");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onNavigate) {
      onNavigate(route);
    } else {
      window.history.pushState({}, "", route);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Button
      {...props}
      onClick={handleClick}
      className={
        "flex w-full min-w-0 items-center justify-start gap-3 rounded-full px-3 py-2 sm:px-4 sm:py-2 transition-all duration-200 ease-out transform " +
        "bg-pink-50 text-pink-800 hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-pink-100 shadow-sm hover:shadow-md " +
        "dark:bg-pink-900/20 dark:text-pink-200 dark:hover:bg-pink-900/30 " +
        (className ?? "")
      }
    >
      <span
        className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold"
        aria-hidden
        style={{ background: "linear-gradient(135deg,#ffd6e0,#fff2cc)" }}
      >
        {icon}
      </span>

      <span className="truncate text-sm sm:text-base font-medium">{label}</span>
    </Button>
  );
}
