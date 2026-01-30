import { ExternalLink } from "lucide-react";

interface BookMetadataProps {
  bookTitle: string;
  bookAuthor: string;
  bookUrl: string;
}


export function BookMetadata({bookTitle, bookAuthor, bookUrl}: BookMetadataProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-muted-foreground">
      <span className="font-serif italic">
        From: <span>{bookTitle}</span> By <span>{bookAuthor}</span>
      </span>
      <span className="hidden sm:inline text-border">•</span>
      <a
        href={bookUrl}
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
