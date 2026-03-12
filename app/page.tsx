"use client";

import { useEffect, useState } from "react";
import { BookOpen, Sparkles, X, Minimize2, Loader2 } from "lucide-react";
import { CategoryBar } from "@/components/category-bar";
import { ViewToggle } from "@/components/view-toggle";
import { BookReader } from "@/components/book-reader";
import { BookMetadata } from "@/components/book-metadata";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

// import { get_text } from "@/services/get_text_from_gutenberg";
export default function Home() {
  const [view, setView] = useState<"single" | "double">("double");
  const [currentPage, setCurrentPage] = useState(0);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fullText, setFullText] = useState<string>("");
  const [bookTitle, setTitle] = useState("");
  const [bookAuthor, setAuthor] = useState("");
  const [bookSite, setBookSite] = useState("");
  const [selectedCategory, setSelected] = useState("Fiction")

const handleGenerateReading = async () => {
  setIsLoading(true);
  const response = await fetch(`/api/get-book?topic=${selectedCategory}`);
  const data = await response.json();
  setFullText(data.text);
  setTitle(data.bookTitle)
  setAuthor(data.bookAuthor)
  setBookSite(data.bookSite)
  setIsGenerated(true);
  setIsFullscreen(true);
  setIsLoading(false);
};


  const handleExitFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-accent" />
              <span className="font-serif text-xl font-bold text-foreground">
                Lexical
              </span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Category Selection */}
        <section className="mb-8">
          <h2 className="text-center text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
            Select a Category
          </h2>
          <CategoryBar 
          selectedCategory={selectedCategory}
          setSelected={setSelected}/>
        </section>

        {/* Generate Button */}
        <div className="flex justify-center mb-10">
          <Button
            onClick={handleGenerateReading}
            size="lg"
            className="gap-2 px-8 py-6 text-base font-medium bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Sparkles className="w-5 h-5" />
            Generate Reading
          </Button>
        </div>

        {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
            <Loader2 className="w-12 h-12 text-muted-foreground animate-spin" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
            Generating Your Book
          </h3>
          <p className="text-muted-foreground max-w-md">
            Fetching a classic from Project Gutenberg...
          </p>
        </div>
      )}

        {/* Reader Section - Normal Mode */}
        {!isLoading && isGenerated && !isFullscreen && (
          <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* View Toggle */}
            <div className="flex justify-center items-center gap-4">
              <ViewToggle view={view} onViewChange={setView} />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(true)}
                className="gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Focus Mode
              </Button>
            </div>

            {/* Book Reader */}
            <div className="py-4">
              <BookReader
                view={view}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                isFullscreen={false}
                fulltext={fullText}
              />
            </div>

            {/* Book Metadata */}
            <div className="pt-4">
              <BookMetadata 
              bookTitle={bookTitle} 
              bookAuthor={bookAuthor} 
              bookUrl={bookSite} 
/>
            </div>
          </section>
        )}

        {/* Empty State */}
        {!isLoading && !isGenerated && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
              <BookOpen className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
              Ready to Read
            </h3>
            <p className="text-muted-foreground max-w-md">
              Select a category and click Generate to discover classic literature 
              from Project Gutenberg.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Powered by{" "}
            <a
              href="https://www.gutenberg.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Project Gutenberg
            </a>
            {" "}— Free eBooks for everyone
          </p>
        </div>
      </footer>

      {/* Fullscreen Reading Mode */}
      {isFullscreen && isGenerated && !isLoading && fullText && (
        <div className="fixed inset-0 z-[100] bg-background flex flex-col">
          {/* Minimal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-accent" />
              <span className="font-serif text-lg font-bold text-foreground">
                <span>{bookTitle}</span>
              </span>
              <span className="text-sm text-muted-foreground">— {bookAuthor}</span>
            </div>
            <div className="flex items-center gap-3">
              <ViewToggle view={view} onViewChange={setView} />
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExitFullscreen}
                className="gap-2"
              >
                <Minimize2 className="w-4 h-4" />
                Exit
              </Button>
            </div>
          </div>

          {/* Book Reader - Fullscreen */}
          <div className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-hidden">
            <BookReader
              view={view}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              isFullscreen={true}
              fulltext={fullText}
            />
          </div>

          {/* Minimal Footer */}
          <div className="flex items-center justify-center px-6 py-3 border-t border-border bg-card/50">
            <BookMetadata bookTitle={bookTitle} 
              bookAuthor={bookAuthor} 
              bookUrl={bookSite} />
          </div>
        </div>
      )}
    </main>
  );
}
