"use client";

import { cn } from "@/lib/utils";

interface BookPageProps {
  content: string;
  pageNumber: number;
  position: "left" | "right" | "single";
}

export function BookPage({ content, pageNumber, position }: BookPageProps) {
  // Parse content for chapter headings
  const renderContent = () => {
    const parts = content.split(/(\*\*[^*]+\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // This is a chapter heading
        const heading = part.slice(2, -2);
        return (
          <div key={index} className="text-center font-bold text-xl mb-6 mt-4">
            {heading}
          </div>
        );
      }
      // Regular text, preserve newlines
      return (
        <span key={index} className="whitespace-pre-wrap">
          {part}
        </span>
      );
    });
  };

  return (
    <div className={cn(
      "h-full bg-[#faf8f3] p-8 md:p-12",
      "flex flex-col",
      position === "left" && "rounded-l-sm",
      position === "right" && "rounded-r-sm",
      position === "single" && "rounded-sm"
    )}>
      <div className="flex-1 overflow-hidden">
        <div className="font-serif text-[13px] md:text-[15px] leading-[1.8] md:leading-[1.9] text-justify">
          {renderContent()}
        </div>
      </div>
      <div className="text-center text-sm text-muted-foreground mt-4">
        {pageNumber}
      </div>
    </div>
  );
}