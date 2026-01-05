import React from 'react';
import { Home, Users, Eye, Edit2 } from 'lucide-react';
import type { Family } from '../../types';

interface FamilyCardProps {
  family: Family;
  memberCount: number;
  onView: (family: Family) => void;
  onEdit: (family: Family) => void;
}

const FamilyCard: React.FC<FamilyCardProps> = ({ family, memberCount, onView, onEdit }) => {
  return (
    <div className="bg-card rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">{family.familyName}</h3>
            <p className="text-sm text-muted-foreground">Created: {family.createdAt}</p>
          </div>
          <div className="p-2 bg-primary/10 rounded-lg">
            <Home className="w-4 h-4 text-primary" />
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{memberCount} Members</span>
          </div>
          {memberCount === 0 && (
            <span className="px-2 py-1 text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-500/10 rounded-full">
              Empty
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onView(family)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
            View
          </button>
          <button
            onClick={() => onEdit(family)}
            className="p-2 text-muted-foreground hover:bg-accent rounded-lg transition-colors"
            title="Edit family"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FamilyCard;
