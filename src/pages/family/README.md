# Family Module

This module contains the family management functionality for the church application.

## Structure

```
src/pages/family/
├── index.tsx              # Main family page component
├── components/             # Family-specific UI components
│   ├── index.ts          # Component exports
│   ├── FamilyCard.tsx
│   ├── FamilyStats.tsx
│   ├── AddFamilyModal.tsx
│   ├── FamilyDetailsDrawer.tsx
│   └── AddMemberModal.tsx
├── hooks/                 # Family-specific custom hooks
│   ├── useFamilyData.ts
│   └── useFamilyFilters.ts
├── types/                 # Family-specific types
│   └── family.ts
└── README.md              # This file
```

## Components

- **FamilyCard**: Display individual family information in card format
- **FamilyStats**: Show statistics dashboard for families
- **AddFamilyModal**: Modal for creating new families
- **FamilyDetailsDrawer**: Slide-out drawer for family details and member management
- **AddMemberModal**: Modal for adding members to families

## Hooks

- **useFamilyData**: Manages family data state and operations
- **useFamilyFilters**: Handles filtering, sorting, and pagination logic

## Features

- Family CRUD operations
- Member management
- Search and filtering
- Pagination
- Statistics dashboard
- Responsive design

## Usage

```tsx
import FamilyPage from './pages/family';

// In your app routing
<Route path="/family" component={FamilyPage} />
```
