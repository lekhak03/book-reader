"use client";

import { cn } from "@/lib/utils";

interface BookPageProps {
  content: string;
  pageNumber: number;
  position: "left" | "right" | "single";
}

export function BookPage({ content, pageNumber, position }: BookPageProps) {
  const renderContent = () => {
    const parts = content.split(/(\*\*[^*]+\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const heading = part.slice(2, -2);
        return (
          <div key={index} className="text-center font-bold text-xl mb-6 mt-4">
            {heading}
          </div>
        );
      }
      return (
        <span key={index} className="whitespace-pre-wrap">
          {part}
        </span>
      );
    });
  };

  return (
    <div
      className={cn(
        "h-full p-8 md:p-12 flex flex-col",
        position === "left" && "rounded-l-sm",
        position === "right" && "rounded-r-sm",
        position === "single" && "rounded-sm",
        "bg-card dark:bg-card-dark text-foreground dark:text-foreground-dark"
      )}
    >
      <div className="flex-1 overflow-hidden">
        <div className="font-serif text-[13px] md:text-[15px] leading-[1.8] md:leading-[1.9] text-justify">
          {renderContent()}
        </div>
      </div>
      <div className="text-center text-sm text-muted-foreground dark:text-muted-foreground-dark mt-4">
        {pageNumber}
      </div>
    </div>
  );
}
