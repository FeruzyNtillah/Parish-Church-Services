# Supabase Setup Guide

This project is configured to work with your Supabase database schema. Follow these steps to connect your project to Supabase.

## 1. Environment Variables

Create a `.env` file in the root of your project with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### How to get these values

1. Go to your Supabase project dashboard: <https://app.supabase.com>
2. Navigate to **Settings** → **API**
3. Copy the **Project URL** and paste it as `VITE_SUPABASE_URL`
4. Copy the **anon/public** key and paste it as `VITE_SUPABASE_ANON_KEY`

## 2. Database Schema

Your database should have the following tables matching the ERD:

### `families` table

- `id` (int8, primary key)
- `family_name` (text)
- `parish` (text, nullable)
- `province` (text, nullable)
- `jummuiya` (text, nullable)
- `created_at` (timestamptz)

### `members` table

- `id` (int8, primary key)
- `family_id` (int8, foreign key → families.id)
- `first_name` (text)
- `middle_name` (text, nullable)
- `last_name` (text)
- `date_of_birth` (date, nullable)
- `relation` (text, nullable)
- `baptism_date` (date, nullable)
- `communion_date` (date, nullable)
- `confirmation_date` (date, nullable)
- `is_married` (bool, nullable)
- `marriage_date` (date, nullable)
- `spouse` (text, nullable)
- `parish` (text, nullable)
- `jummuiya` (text, nullable)
- `created_at` (timestamptz)

### `profiles` table

- `id` (uuid, primary key, foreign key → auth.users.id)
- `email` (text)
- `full_name` (text, nullable)
- `role` (text, nullable)

## 3. Row Level Security (RLS)

Make sure to set up appropriate Row Level Security policies in Supabase for your tables. You can enable RLS and create policies based on your authentication requirements.

## 4. Usage

### Using the Services

```typescript
import { familiesService, membersService, profilesService } from './services';

// Get all families
const families = await familiesService.getAll();

// Create a family
const newFamily = await familiesService.create({
  family_name: 'Smith Family',
  parish: 'St. Mary',
  province: 'Dar es Salaam',
  jummuiya: 'Youth Group',
});

// Get family with members
const familyWithMembers = await familiesService.getWithMembers(familyId);
```

### Using the Hooks

```typescript
import { useFamilies } from './hooks';

function MyComponent() {
  const {
    families,
    members,
    loading,
    error,
    statistics,
    createFamily,
    updateFamily,
    deleteFamily,
    createMember,
    updateMember,
    deleteMember,
  } = useFamilies();

  // Use the data and functions...
}
```

## 5. TypeScript Types

All database types are defined in `src/types/index.ts` and match your Supabase schema:

- `Family`
- `Member`
- `Profile`
- `FamilyWithMembers`
- `MemberWithFamily`

## 6. Next Steps

1. Create your `.env` file with Supabase credentials
2. Ensure your database tables match the schema
3. Set up RLS policies if needed
4. Start using the services and hooks in your components
