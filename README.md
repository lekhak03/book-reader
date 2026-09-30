# Lexical - Modern Book Reader

A beautiful, responsive e-book reader web application that discovers and displays classic books from Project Gutenberg. Built with Next.js, React, and TypeScript.

## Features

### Core Reading Experience
- **Smart Pagination**: Automatically breaks text into pages based on viewport height, ensuring optimal readability
- **Dual View Mode**: Switch between single-page and double-page spread layouts
- **Focus Mode**: Enter an immersive fullscreen reading experience
- **Responsive Design**: Seamlessly adapts to mobile, tablet, and desktop screens

### Book Discovery
- **Random Selection**: Fetches random classic books from Project Gutenberg via the Gutendex API
- **Category Filtering**: Browse by 12 different categories including:
  - Fiction, Philosophy, Science, History
  - Poetry, Drama, Essays, Adventure
  - Travel, Biography, Science Fiction, Horror

### Performance & UX
- **Client-side Caching**: Uses IndexedDB to cache paginated content, eliminating re-pagination on revisits
- **Instant Navigation**: Jump between pages without loading delays
- **Light/Dark Theme**: Toggle between light and dark modes for comfortable reading in any environment

### Content Display
- **Book Metadata**: View title, author name, and source link
- **Elegant Typography**: Serif fonts optimized for readability
- **Formatted Text**: Smart text wrapping and sentence-based pagination

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) - React framework with API routes
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Statically typed JavaScript
- **Styling**: [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - High-quality React components
- **Package Manager**: [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager
- **Data Source**: [Gutendex API](https://gutendex.com/) - Project Gutenberg books database
- **State Management**: React Hooks (useState, useEffect)
- **Caching**: Browser IndexedDB for client-side pagination cache

## Project Structure

```
bookReader/
├── app/
│   ├── page.tsx          # Home page & main UI layout
│   ├── layout.tsx        # Root layout wrapper
│   ├── globals.css       # Global styles
│   └── api/
│       └── get-book/
│           └── route.ts  # API endpoint for fetching books
├── components/
│   ├── book-reader.tsx       # Main pagination & page rendering logic
│   ├── book-page.tsx         # Individual page display
│   ├── book-metadata.tsx     # Book title, author, source info
│   ├── category-bar.tsx      # Category selection buttons
│   ├── view-toggle.tsx       # Single/double view toggle
│   ├── theme-toggle.tsx      # Light/dark mode toggle
│   └── ui/                   # shadcn/ui components
├── lib/
│   └── utils.ts          # Utility functions (cn - class name merger)
├── utils/
│   ├── pageCache.ts      # IndexedDB caching logic
│   └── formatText.ts     # Text formatting utilities
├── public/               # Static assets
├── styles/              # Additional stylesheets
├── package.json         # Project dependencies
├── tsconfig.json        # TypeScript configuration
├── next.config.mjs      # Next.js configuration
└── README.md           # This file
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bookReader
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## How It Works

### Book Fetching Flow
1. User selects a category and clicks "Generate Reading"
2. Frontend requests `/api/get-book?topic={category}`
3. API queries Gutendex to get available books in that category
4. Randomly selects a page from results (pagination)
5. Randomly picks a book from that page
6. Fetches the book's full text from Project Gutenberg
7. Extracts metadata (title, author, source URL)
8. Returns text and metadata to frontend

### Pagination Flow
1. Book text is cleaned and split into sentences
2. Algorithm measures text height in the display container
3. Fits as many sentences as possible on each page
4. Creates array of paginated text chunks
5. Caches pagination result in IndexedDB with unique key (view mode + fullscreen + text length)
6. Future loads of same book use cached pages (instant navigation)

### Caching Strategy
- **Cache Key**: Generated from view mode, fullscreen state, and text content
- **Storage**: Browser IndexedDB (`book-reader-cache` database)
- **Persistence**: Survives page refreshes and browser sessions
- **Invalidation**: Automatic when viewing different books or changing view modes

## UI Components

The project uses a comprehensive set of shadcn/ui components:

- **Form Components**: Input, Textarea, Checkbox, Radio, Select, Toggle
- **Dialog Components**: Dialog, Alert Dialog, Drawer, Popover, Sheet
- **Navigation**: Menubar, Navigation Menu, Pagination, Breadcrumb
- **Display**: Card, Badge, Separator, Progress, Skeleton
- **Media**: Avatar, Image, Carousel, Aspect Ratio
- **And more**: Tooltip, Toast, Slider, Calendar, Command palette

## Configuration

### Theme
The application uses a theming system via `next-themes`:
- Light mode (default)
- Dark mode (user toggle)
- System preference detection

### Categories
Modify categories in:
- [components/category-bar.tsx](components/category-bar.tsx) - UI buttons
- [app/api/get-book/route.ts](app/api/get-book/route.ts) - API filtering

## Performance Considerations

- **IndexedDB Caching**: Eliminates expensive re-pagination calculations
- **Lazy Loading**: Pagination only occurs when viewing a book
- **Responsive Images**: Uses optimized SVG icons from lucide-react
- **CSS-in-JS**: TailwindCSS for minimal bundle size
- **Free API**: Uses free Gutendex API (may have rate limiting)

## Known Limitations

- **API Speed**: Gutendex is a free API; large book fetches may take several seconds
- **Text Quality**: Some classic books may have OCR artifacts or formatting issues
- **Mobile Performance**: Very large books may consume significant memory on mobile devices
- **Browser Support**: Requires IndexedDB support (all modern browsers)

## License

This project is provided as-is for educational and personal use.

## Credits

- Books provided by [Project Gutenberg](https://www.gutenberg.org/)
- Book data via [Gutendex API](https://gutendex.com/)
