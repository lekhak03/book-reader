import { ExternalLink } from "lucide-react";

export function BookMetadata() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-muted-foreground">
      <span className="font-serif italic">
        From: Pride and Prejudice by Jane Austen
      </span>
      <span className="hidden sm:inline text-border">•</span>
      <a
        href="https://www.gutenberg.org/ebooks/1342"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors duration-200"
      >
        View on Project Gutenberg
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
