# MarketPulse Client

MarketPulse is a modern, modular React + TypeScript application for managing and analyzing NSE market data. Built with Vite for fast development and optimized performance, featuring a beautiful, responsive UI and a scalable codebase.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Setup & Installation](#setup--installation)
- [Usage Guide](#usage-guide)
- [Customization](#customization)
- [Development Standards](#development-standards)
- [Technical Details](#technical-details)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Header Navigation:**  
   Sticky header with logo, live data indicator, and navigation buttons. Navigation state managed via React state (`currentPage`).
- **Status Card:**  
   Displays current date and day of week. Shows last download date (fetched via custom hook).
- **Date Picker:**  
   Select single dates or ranges. Dates are formatted for API and display. Add/remove/clear dates with feedback via toast notifications.
- **Download Section:**  
   Download CSV files for selected dates. Handles multiple data types (Stocks, Indices, Market Analysis, Broad Market). Shows download status and errors.
- **Performance Card:**  
   Displays top gainers/losers for the last download date. Date formatting and API integration.
- **Responsive Design:**  
   Mobile-friendly layouts and adaptive grid. Custom CSS variables for easy theming.
- **Animations:**  
   Framer Motion for smooth transitions and UI effects.

---

## Architecture

- **Feature-based folder structure:**  
   Each major UI section (header, date-picker, download, status, performance) is isolated in its own folder with container/presenter pattern for separation of logic and UI.
- **Hooks:**  
   All API and stateful logic is handled via custom hooks in `src/hooks`.
- **Types:**  
   Shared types (e.g., `PageType`) are defined in `src/types/index.ts` for type safety across the app.
- **Styling:**  
   Global styles in `App.css`, feature-specific styles in their respective folders. Uses CSS variables for colors, spacing, and gradients.

---

## Project Structure

```
src/
   App.tsx                  # Main app component, manages global state
   App.css                  # Global styles and layout
   features/
      header/
         HeaderContainer.tsx  # Logic for header, passes props
         HeaderPresenter.tsx  # UI for header, navigation, logo
         header.css           # Header-specific styles
      date-picker/
         DatePickerContainer.tsx
         DatePickerPresenter.tsx
         date-picker.css
      download/
         DownloadContainer.tsx
         DownloadPresenter.tsx
         download-section.css
      status/
         StatusContainer.tsx
         StatusPresenter.tsx
         status-card.css
      performance/
         PerformanceContainer.tsx
         PerformancePresenter.tsx
         performance-card.css
   hooks/
      useApi.ts              # Custom hooks for API/data fetching
   types/
      index.ts               # Shared types (PageType, etc.)
   main.tsx                 # App entry point
   index.css                # Base CSS
public/
   vite.svg                 # App icon
```

---

## Technologies Used

- **React** (UI library)
- **TypeScript** (type safety)
- **Vite** (build tool, fast HMR)
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **date-fns** (date utilities)
- **react-hot-toast** (notifications)

---

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/devrajkhanra/marketpulse-client.git
   cd marketpulse-client
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Open in browser:**
   Visit [http://localhost:5173](http://localhost:5173) (default Vite port).

---

## Usage Guide

- **Navigation:**  
   Use the header buttons to switch between dashboard, analytics, data download, and settings (UI only).
- **Date Selection:**  
   Use the date picker to select single dates or ranges. Dates are formatted for API requests.
- **Download Data:**  
   Select dates, then use the download section to fetch CSVs for those dates and data types.
- **Status Card:**  
   Shows the current date and last download date, updating automatically.
- **Performance Card:**  
   Displays top gainers/losers for the last download date.

---

## Customization

- **Styling:**
  - Update global styles in `App.css`.
  - Feature-specific styles in their respective CSS files.
  - Use CSS variables for colors, gradients, spacing, and radii.
- **Features:**
  - Add new features in the `features/` directory.
  - Extend types in `src/types/index.ts`.
  - Add new API hooks in `src/hooks/useApi.ts`.
- **Icons:**
  - Use Lucide React for scalable SVG icons.

---

## Development Standards

- **Type Safety:**  
   All components and props are typed using TypeScript.
- **Separation of Concerns:**  
   Container components handle logic/state, presenter components handle UI.
- **Reusable Hooks:**  
   All API/data logic is abstracted into hooks.
- **Responsive Design:**  
   Mobile-first CSS and adaptive grid layouts.
- **Commit Messages:**  
   Use conventional commits for clarity and history.

---

## Technical Details

### Shared Types

```typescript
// src/types/index.ts
export type PageType = "dashboard" | "data-download" | "analytics" | "settings";
```

### Main App State

```tsx
// src/App.tsx
const [currentPage, setCurrentPage] = useState<PageType>("dashboard");
const [selectedDates, setSelectedDates] = useState<string[]>([]);
const { data: currentDate } = useCurrentDate();
```

### Header Navigation

```tsx
// src/features/header/HeaderPresenter.tsx
interface HeaderPresenterProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

<nav className="nav">
  {["dashboard", "data-download", "analytics", "settings"].map((page) => (
    <button
      key={page}
      className={currentPage === page ? "active" : ""}
      onClick={() => onPageChange(page as PageType)}
    >
      {page.charAt(0).toUpperCase() + page.slice(1)}
    </button>
  ))}
</nav>;
```

### Date Picker Logic

```tsx
// src/features/date-picker/DatePickerContainer.tsx
interface DatePickerProps {
  selectedDates: string[];
  onDatesChange: (dates: string[]) => void;
}

// Add/remove/clear dates, format for API
const formatDateToAPI = (date: string): string => {
  /* ... */
};
const formatDateFromAPI = (apiDate: string): string => {
  /* ... */
};
```

### Download Section

```tsx
// src/features/download/DownloadContainer.tsx
interface DownloadProps {
  selectedDates: string[];
  onClearDates: () => void;
}

const handleDownload = async () => {
  // Download CSVs for selected dates
};
```

### Status Card

```tsx
// src/features/status/StatusContainer.tsx
interface StatusProps {
  currentDate?: { date: string; dayOfWeek: string };
}

// Shows current date and last download date
```

### Performance Card

```tsx
// src/features/performance/PerformanceContainer.tsx
const { data, isLoading, error } = useTopGainerLoser(apiDate || undefined);
```

### Custom Hooks

```typescript
// src/hooks/useApi.ts
export function useCurrentDate() {
  /* ... */
}
export function useLastDownloadDate() {
  /* ... */
}
export function useDownloadCSVs() {
  /* ... */
}
export function useTopGainerLoser(date?: string) {
  /* ... */
}
```

### CSS Variables & Responsive Design

```css
:root {
  --gradient-dark: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  --gradient-primary: linear-gradient(90deg, #14b8a6, #6366f1);
  --radius-xl: 1.5rem;
  --space-4: 1rem;
  --space-8: 2rem;
  /* ...more variables... */
}
```

---

## Contributing

Pull requests and issues are welcome!  
Please:

- Use conventional commit messages.
- Ensure code is linted and tested before submitting.
- Document new features and update the README as needed.

---

## License

MIT
