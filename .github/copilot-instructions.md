# Parish Church Services - AI Coding Guidelines

## Architecture Overview
This is a React + TypeScript + Vite application for managing Catholic parish families and members. Uses Supabase as the backend database with Row Level Security.

**Key Structure:**
- `src/pages/`: Route-based pages (Family, Donations, Events, Sermons, etc.)
- `src/components/`: Feature-organized components (family/, auth/, ui/)
- `src/services/`: Supabase data access layer (families.ts, members.ts, profiles.ts)
- `src/hooks/`: Custom hooks for data fetching and state management
- `src/contexts/`: Global state (AuthContext, ThemeContext)
- `src/lib/supabase.ts`: Supabase client initialization

## Data Flow & Patterns
- **Services**: Direct Supabase queries, throw errors for hook handling
- **Hooks**: useState/useEffect for loading/error states, useCallback for memoization
- **Components**: Functional with hooks, props interfaces, Lucide icons
- **Error Handling**: try-catch blocks with alert() for user feedback
- **State Management**: Local state for UI, contexts for global (auth/theme)

## Styling Conventions
- **Tailwind CSS** with shadcn/ui design system
- Custom CSS variables (--primary, --background, etc.) in index.css
- Emerald color scheme for church branding
- Responsive design with max-w-7xl containers
- Dark mode support via 'class' strategy

## Development Workflows
- **Start Dev**: `npm run dev` (Vite HMR)
- **Build**: `npm run build` (TypeScript check + Vite build)
- **Lint**: `npm run lint` (ESLint with React rules)
- **Preview**: `npm run preview` (Serve built app)
- **Supabase Setup**: Create `.env` with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

## Key Files to Reference
- `SUPABASE_SETUP.md`: Database schema and service usage examples
- `src/types/index.ts`: TypeScript interfaces (Family, Member, etc.)
- `src/hooks/useFamilies.ts`: Data fetching pattern example
- `src/components/family/FamilyCard.tsx`: Component styling pattern
- `tailwind.config.js`: Color scheme and theme configuration

## Integration Points
- **Supabase**: Real-time database with auth (check RLS policies)
- **React Router**: Client-side routing in App.tsx
- **Environment**: Vite env vars (VITE_ prefix required)

## Common Patterns
- Import services from `../services`, hooks from `../hooks`
- Use `clsx` for conditional classes, `cn` utility for merging
- Family/Member relationships via foreign keys
- Pagination and filtering in hooks (useFamilyFilters)
- Modal/drawer states managed locally in pages</content>
<parameter name="filePath">c:\Users\feyro\OneDrive\Desktop\Projects\Perish-Church\.github\copilot-instructions.md