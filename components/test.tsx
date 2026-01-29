"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

function cn(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

interface BookPageProps {
  content: string;
  pageNumber: number;
  position: "left" | "right" | "single";
}

function BookPage({ content, pageNumber, position }: BookPageProps) {
  return (
    <div
      className={cn(
        "h-full bg-[#faf8f3] relative overflow-hidden",
        position === "left" && "rounded-l border-r border-[#d4c5a0]",
        position === "right" && "rounded-r",
        position === "single" && "rounded"
      )}
    >
      <div className="absolute inset-0 p-8 md:p-12 flex flex-col">
        <div className="flex-1 overflow-hidden">
          <div
            className="text-[#2d2416] leading-relaxed whitespace-pre-wrap font-serif text-sm md:text-base"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {content}
          </div>
        </div>
        <div className="text-center text-xs text-[#8b7355] mt-4">
          {pageNumber}
        </div>
      </div>
    </div>
  );
}

interface BookReaderProps {
  view?: "single" | "double";
  currentPage?: number;
  onPageChange?: (page: number) => void;
  isFullscreen?: boolean;
}

// Full continuous text
const fullText = `It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.

However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered as the rightful property of some one or other of their daughters.

"My dear Mr. Bennet," said his lady to him one day, "have you heard that Netherfield Park is let at last?"

Mr. Bennet replied that he had not.

"But it is," returned she; "for Mrs. Long has just been here, and she told me all about it."

Mr. Bennet made no answer.

"Do not you want to know who has taken it?" cried his wife impatiently.

"You want to tell me, and I have no objection to hearing it."

This was invitation enough.

"Why, my dear, you must know, Mrs. Long says that Netherfield is taken by a young man of large fortune from the north of England; that he came down on Monday in a chaise and four to see the place, and was so much delighted with it that he agreed with Mr. Morris immediately; that he is to take possession before Michaelmas, and some of his servants are to be in the house by the end of next week."

"What is his name?"

"Bingley."

"Is he married or single?"

"Oh! single, my dear, to be sure! A single man of large fortune; four or five thousand a year. What a fine thing for our girls!"

"How so? how can it affect them?"

"My dear Mr. Bennet," replied his wife, "how can you be so tiresome! You must know that I am thinking of his marrying one of them."

"Is that his design in settling here?"

"Design! nonsense, how can you talk so! But it is very likely that he may fall in love with one of them, and therefore you must visit him as soon as he comes."

"I see no occasion for that. You and the girls may go, or you may send them by themselves, which perhaps will be still better, for as you are as handsome as any of them, Mr. Bingley might like you the best of the party."

"My dear, you flatter me. I certainly have had my share of beauty, but I do not pretend to be anything extraordinary now. When a woman has five grown up daughters, she ought to give over thinking of her own beauty."

"In such cases, a woman has not often much beauty to think of."

"But, my dear, you must indeed go and see Mr. Bingley when he comes into the neighbourhood."

"It is more than I engage for, I assure you."

"But consider your daughters. Only think what an establishment it would be for one of them. Sir William and Lady Lucas are determined to go, merely on that account, for in general, you know they visit no new comers. Indeed you must go, for it will be impossible for us to visit him, if you do not."

"You are over scrupulous, surely. I dare say Mr. Bingley will be very glad to see you; and I will send a few lines by you to assure him of my hearty consent to his marrying which ever he chooses of the girls; though I must throw in a good word for my little Lizzy."

"I desire you will do no such thing. Lizzy is not a bit better than the others; and I am sure she is not half so handsome as Jane, nor half so good humoured as Lydia. But you are always giving her the preference."

"They have none of them much to recommend them," replied he; "they are all silly and ignorant like other girls; but Lizzy has something more of quickness than her sisters."

"Mr. Bennet, how can you abuse your own children in such way? You take delight in vexing me. You have no compassion on my poor nerves."

"You mistake me, my dear. I have a high respect for your nerves. They are my old friends. I have heard you mention them with consideration these twenty years at least."

"Ah! you do not know what I suffer."

"But I hope you will get over it, and live to see many young men of four thousand a year come into the neighbourhood."

"It will be no use to us if twenty such should come, since you will not visit them."

"Depend upon it, my dear, that when there are twenty I will visit them all."

Mr. Bennet was so odd a mixture of quick parts, sarcastic humour, reserve, and caprice, that the experience of three and twenty years had been insufficient to make his wife understand his character. Her mind was less difficult to develop. She was a woman of mean understanding, little information, and uncertain temper. When she was discontented, she fancied herself nervous. The business of her life was to get her daughters married; its solace was visiting and news.

Mr. Bennet was among the earliest of those who waited on Mr. Bingley. He had always intended to visit him, though to the last always assuring his wife that he should not go; and till the evening after the visit was paid, she had no knowledge of it.

It was then disclosed in the following manner. Observing his second daughter employed in trimming a hat, he suddenly addressed her with,

"I hope Mr. Bingley will like it, Lizzy."

"We are not in a way to know what Mr. Bingley likes," said her mother resentfully, "since we are not to visit."

"But you forget, mama," said Elizabeth, "that we shall meet him at the assemblies, and that Mrs. Long has promised to introduce him."

"I do not believe Mrs. Long will do any such thing. She has two nieces of her own. She is a selfish, hypocritical woman, and I have no opinion of her."

"No more have I," said Mr. Bennet; "and I am glad to find that you do not depend on her serving you."

Mrs. Bennet deigned not to make any reply; but unable to contain herself, began scolding one of her daughters.

"Don't keep coughing so, Kitty, for heaven's sake! Have a little compassion on my nerves. You tear them to pieces."

"Kitty has no discretion in her coughs," said her father; "she times them ill."

"I do not cough for my own amusement," replied Kitty fretfully.

"When is your next ball to be, Lizzy?"

"To-morrow fortnight."

"Aye, so it is," cried her mother, "and Mrs. Long does not come back till the day before; so, it will be impossible for her to introduce him, for she will not know him himself."

"Then, my dear, you may have the advantage of your friend, and introduce Mr. Bingley to her."

"Impossible, Mr. Bennet, impossible, when I am not acquainted with him myself; how can you be so teasing?"

"I honour your circumspection. A fortnight's acquaintance is certainly very little. One cannot know what a man really is by the end of a fortnight. But if we do not venture, somebody else will; and after all, Mrs. Long and her nieces must stand their chance; and therefore, as she will think it an act of kindness, if you decline the office, I will take it on myself."

The girls stared at their father. Mrs. Bennet said only, "Nonsense, nonsense!"

"What can be the meaning of that emphatic exclamation?" cried he. "Do you consider the forms of introduction, and the stress that is laid on them, as nonsense? I cannot quite agree with you there. What say you, Mary? for you are a young lady of deep reflection I know, and read great books, and make extracts."

Mary wished to say something very sensible, but knew not how.

"While Mary is adjusting her ideas," he continued, "let us return to Mr. Bingley."

"I am sick of Mr. Bingley," cried his wife.

"I am sorry to hear that; but why did not you tell me so before? If I had known as much this morning, I certainly would not have called on him. It is very unlucky; but as I have actually paid the visit, we cannot escape the acquaintance now."`;

export default function BookReader({
  view = "double",
  currentPage: initialPage = 0,
  onPageChange,
  isFullscreen = false,
}: BookReaderProps) {
  const [pages, setPages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const measureRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (onPageChange) {
      onPageChange(page);
    }
  };

  useEffect(() => {
    const paginateText = () => {
      if (!measureRef.current || !containerRef.current) return;

      const container = containerRef.current;
      const measurer = measureRef.current;
      
      // Get actual dimensions
      const containerHeight = container.clientHeight - 96; // Account for padding and page number
      const containerWidth = container.clientWidth - (isFullscreen ? 96 : 64);

      const words = fullText.split(/(\s+)/);
      const newPages: string[] = [];
      let currentPageText = "";

      for (let i = 0; i < words.length; i++) {
        const testText = currentPageText + words[i];
        measurer.textContent = testText;

        if (measurer.scrollHeight > containerHeight) {
          // Current page is full, save it and start new page
          if (currentPageText) {
            newPages.push(currentPageText.trim());
            currentPageText = words[i];
          } else {
            // Single word is too long, force it on the page
            newPages.push(words[i]);
            currentPageText = "";
          }
        } else {
          currentPageText = testText;
        }
      }

      // Add remaining text
      if (currentPageText.trim()) {
        newPages.push(currentPageText.trim());
      }

      setPages(newPages);
    };

    // Debounce pagination
    const timeoutId = setTimeout(paginateText, 100);
    return () => clearTimeout(timeoutId);
  }, [view, isFullscreen]);

  // Reset to page 0 when view changes
  useEffect(() => {
    handlePageChange(0);
  }, [view, isFullscreen]);

  const totalPages = pages.length;
  const canGoPrev = currentPage > 0;
  const canGoNext =
    view === "double" ? currentPage + 2 < totalPages : currentPage + 1 < totalPages;

  const handlePrev = () => {
    if (canGoPrev) {
      handlePageChange(view === "double" ? Math.max(0, currentPage - 2) : currentPage - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      handlePageChange(view === "double" ? currentPage + 2 : currentPage + 1);
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full">
      {/* Hidden measurement div */}
      <div
        ref={measureRef}
        className="fixed -top-[9999px] text-[#2d2416] leading-relaxed whitespace-pre-wrap font-serif text-sm md:text-base"
        style={{
          fontFamily: "Georgia, serif",
          width: view === "double"
            ? isFullscreen
              ? "calc(45vw - 48px)"
              : "450px"
            : isFullscreen
            ? "calc(50vw - 48px)"
            : "450px",
        }}
      />

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
          ref={containerRef}
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
              <div
                className={cn(
                  "flex-1",
                  isFullscreen
                    ? "h-[calc(100vh-160px)]"
                    : "h-[500px] sm:h-[600px] md:h-[700px] lg:h-[750px]"
                )}
              >
                <BookPage
                  content={pages[currentPage] || ""}
                  pageNumber={currentPage + 1}
                  position="left"
                />
              </div>
              <div
                className={cn(
                  "flex-1",
                  isFullscreen
                    ? "h-[calc(100vh-160px)]"
                    : "h-[500px] sm:h-[600px] md:h-[700px] lg:h-[750px]"
                )}
              >
                <BookPage
                  content={pages[currentPage + 1] || ""}
                  pageNumber={currentPage + 2}
                  position="right"
                />
              </div>
            </>
          ) : (
            <div
              className={cn(
                "flex-1",
                isFullscreen
                  ? "h-[calc(100vh-160px)]"
                  : "h-[600px] sm:h-[700px] md:h-[750px]"
              )}
            >
              <BookPage
                content={pages[currentPage] || ""}
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

      {/* Page counter */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-4 text-xs text-muted-foreground">
        Page {currentPage + 1}–{view === "double" ? Math.min(currentPage + 2, totalPages) : currentPage + 1} of {totalPages}
      </div>
    </div>
  );
}