"use client";

import { cn } from "@/lib/utils";

interface ViewToggleProps {
  view: "single" | "double";
  onViewChange: (view: "single" | "double") => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-secondary rounded-lg">
      <button
        onClick={() => onViewChange("single")}
        className={cn(
          "px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
          view === "single"
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Single Page
      </button>
      <button
        onClick={() => onViewChange("double")}
        className={cn(
          "px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
          view === "double"
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Double Page
      </button>
    </div>
  );
}
