# Project Structure

This document outlines the organized structure of the Parish Church Services application.

## 📁 Directory Structure

```
src/
├── components/          # Reusable React components
│   ├── ui/            # Base UI components (Button, Card, etc.)
│   ├── forms/         # Form components
│   ├── charts/        # Chart components
│   └── layout/        # Layout components (Sidebar, Topbar, etc.)
├── pages/             # Page components
├── data/              # Data files and mock data
├── types/             # TypeScript type definitions
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── constants/         # Application constants
├── contexts/          # React contexts
└── assets/            # Static assets
```

## 📂 Detailed Breakdown

### `/components`
- **`ui/`**: Base UI components that can be used throughout the application
  - `Button.tsx`: Reusable button component with variants
  - `Card.tsx`: Card container components
  - `ProgressCircle.tsx`: Circular progress indicator
- **`layout/`**: Layout-specific components
  - `Sidebar.tsx`: Navigation sidebar
  - `Topbar.tsx`: Top navigation bar
  - `Main-layout.tsx`: Main layout wrapper

### `/pages`
Page-level components for different routes:
- `Home.tsx`: Dashboard/home page
- `Family.tsx`: Family management page
- `Events.tsx`: Events management page
- `Donations.tsx`: Donations tracking page
- `Sermons.tsx`: Sermons management page

### `/data`
Organized data files:
- `events.ts`: Events mock data
- `donations.ts`: Donations mock data
- `families.ts`: Family and member data
- `sermons.ts`: Sermons data
- `index.ts`: Centralized exports

### `/types`
TypeScript type definitions:
- `index.ts`: All application types (Event, Donation, Member, Family, Sermon, etc.)

### `/hooks`
Custom React hooks:
- `usePagination.ts`: Pagination logic
- `useSearch.ts`: Search and filtering logic
- `index.ts`: Hook exports

### `/utils`
Utility functions:
- `index.ts`: Common utilities (date formatting, currency, search, etc.)

### `/constants`
Application constants:
- `index.ts`: Constants for roles, statuses, colors, etc.

## 🔄 Import Patterns

### Data and Types
```typescript
// Import data
import { eventsData, familiesData } from '../data';

// Import types
import type { Event, Family } from '../types';
```

### Components
```typescript
// Import UI components
import { Button, Card } from '../components/ui';

// Import layout components
import { Sidebar, Topbar } from '../components/layout';
```

### Hooks
```typescript
// Import custom hooks
import { usePagination, useSearch } from '../hooks';
```

### Utils
```typescript
// Import utilities
import { formatDate, formatCurrency } from '../utils';
```

## 🎯 Benefits of This Structure

1. **Separation of Concerns**: Each directory has a clear, single responsibility
2. **Scalability**: Easy to add new components, types, or utilities
3. **Maintainability**: Related code is grouped together
4. **Reusability**: UI components and hooks can be easily reused
5. **Type Safety**: Centralized type definitions ensure consistency
6. **Developer Experience**: Clear import paths and organized codebase

## 🚀 Getting Started

When adding new features:

1. **New Component**: Add to appropriate subdirectory in `/components`
2. **New Type**: Add to `/types/index.ts`
3. **New Data**: Create separate file in `/data` and export from `index.ts`
4. **New Hook**: Add to `/hooks` directory
5. **New Utility**: Add to `/utils/index.ts`

This structure promotes clean, maintainable, and scalable code organization.
