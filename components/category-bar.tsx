"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const categories = [
  "Fiction",
  "Philosophy",
  "Science",
  "History",
  "Poetry",
  "Drama",
  "Essays",
  "Adventure",
  "Travel",
  "Biography",
];

interface CategoryProps {
  selectedCategory: string,
  setSelected: (category: string) => void
}


export function CategoryBar({selectedCategory, setSelected}: CategoryProps) {

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelected(category)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            "border border-border hover:border-accent/50",
            selectedCategory === category
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card text-foreground hover:bg-secondary"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
