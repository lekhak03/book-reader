"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { BookPage } from "./book-page";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface BookReaderProps {
  view: "single" | "double";
  currentPage: number;
  onPageChange: (page: number) => void;
  isFullscreen?: boolean;
  fulltext?: string;
}

export function BookReader({ view, currentPage, onPageChange, isFullscreen = false, fulltext}: BookReaderProps) {
  const [pages, setPages] = useState<string[]>([]);
  const measureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fulltext || !measureRef.current) {
      return;
    }

    const measurer = measureRef.current;
    
    // Account for padding
    const paddingTop = isFullscreen ? 48 : 32;
    const paddingBottom = isFullscreen ? 64 : 48;
    const pageNumberSpace = 60;
    const maxHeight = 750 - paddingTop - paddingBottom - pageNumberSpace;
    
    // Clean the text (no HTML parsing, just plain text)
    const cleanedText = fulltext
      .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
      .trim();
    
    // Split into sentences
    const sentences = cleanedText.match(/[^.!?]+[.!?]+/g) || [];
    
    const newPages: string[] = [];
    let currentPageText = "";
    
    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i].trim();
      const testText = currentPageText + (currentPageText ? ' ' : '') + sentence;
      measurer.textContent = testText;
      
      if (measurer.offsetHeight > maxHeight && currentPageText) {
        // Page is full, save current page
        newPages.push(currentPageText.trim());
        // Start new page with current sentence
        currentPageText = sentence;
      } else {
        // Sentence fits, add it
        currentPageText = testText;
      }
    }
    
    // Add last page
    if (currentPageText.trim()) {
      newPages.push(currentPageText.trim());
    }
    
    console.log('Total pages created:', newPages.length);
    setPages(newPages);
  }, [fulltext, view, isFullscreen]);

  const pageContents = pages;
  const totalPages = pages.length;
  const canGoPrev = currentPage > 0;
  const canGoNext = view === "double" 
    ? currentPage + 2 < totalPages 
    : currentPage + 1 < totalPages;

  const handlePrev = () => {
    if (canGoPrev) {
      onPageChange(view === "double" ? Math.max(0, currentPage - 2) : currentPage - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onPageChange(view === "double" ? currentPage + 2 : currentPage + 1);
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full">
      {/* Navigation Button - Previous */}
      <button
        onClick={handlePrev}
        disabled={!canGoPrev}
        className={cn(
          "absolute left-0 md:-left-4 z-10 p-2 md:p-3 rounded-full transition-all duration-200",
          "bg-card border border-border shadow-sm",
          canGoPrev 
            ? "hover:bg-secondary hover:shadow-md text-foreground" 
            : "opacity-40 cursor-not-allowed text-muted-foreground"
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <div
        ref={measureRef}
        className="fixed -top-[9999px] left-0 font-serif text-[13px] md:text-[15px] leading-[1.8] md:leading-[1.9] p-8 md:p-12"
        style={{
          width: view === "double" 
            ? (isFullscreen ? "45vw" : "450px")
            : (isFullscreen ? "50vw" : "550px"),
        }}
      />

      {/* Book Container */}
      <div 
        className={cn(
          "relative mx-12 md:mx-16",
          "bg-[#c9bca0] rounded-sm p-1",
          "shadow-[0_4px_20px_rgba(0,0,0,0.15),0_8px_40px_rgba(0,0,0,0.1)]"
        )}
      >
        {/* Book Spine Effect */}
        {view === "double" && (
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-[#a89575] z-10" />
        )}

        {/* Pages Container */}
        <div 
          className={cn(
            "flex",
            view === "double" 
              ? isFullscreen 
                ? "w-[90vw] max-w-[1400px]" 
                : "w-[340px] sm:w-[600px] md:w-[900px] lg:w-[1100px]"
              : isFullscreen
                ? "w-[50vw] max-w-[700px]"
                : "w-[340px] sm:w-[450px] md:w-[550px]"
          )}
        >
          {view === "double" ? (
            <>
              <div className={cn(
                "flex-1",
                isFullscreen ? "h-[calc(100vh-160px)]" : "h-[500px] sm:h-[600px] md:h-[700px] lg:h-[750px]"
              )}>
                <BookPage 
                  content={pageContents[currentPage] || ""} 
                  pageNumber={currentPage + 1}
                  position="left"
                />
              </div>
              <div className={cn(
                "flex-1",
                isFullscreen ? "h-[calc(100vh-160px)]" : "h-[500px] sm:h-[600px] md:h-[700px] lg:h-[750px]"
              )}>
                <BookPage 
                  content={pageContents[currentPage + 1] || ""} 
                  pageNumber={currentPage + 2}
                  position="right"
                />
              </div>
            </>
          ) : (
            <div className={cn(
              "flex-1",
              isFullscreen ? "h-[calc(100vh-160px)]" : "h-[600px] sm:h-[700px] md:h-[750px]"
            )}>
              <BookPage 
                content={pageContents[currentPage] || ""} 
                pageNumber={currentPage + 1}
                position="single"
              />
            </div>
          )}
        </div>
      </div>

      {/* Navigation Button - Next */}
      <button
        onClick={handleNext}
        disabled={!canGoNext}
        className={cn(
          "absolute right-0 md:-right-4 z-10 p-2 md:p-3 rounded-full transition-all duration-200",
          "bg-card border border-border shadow-sm",
          canGoNext 
            ? "hover:bg-secondary hover:shadow-md text-foreground" 
            : "opacity-40 cursor-not-allowed text-muted-foreground"
        )}
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>
    </div>
  );
}