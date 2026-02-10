import React from 'react';
import { Home, Users, Eye, Edit2, Trash2, Crown, Sparkles } from 'lucide-react';
import type { Family } from '../../../../types';

interface FamilyCardProps {
  family: Family;
  memberCount: number;
  onView: (family: Family) => void;
  onEdit: (family: Family) => void;
  onDelete: (family: Family) => void;
  isSelected?: boolean;
  onSelect?: (familyId: string, selected: boolean) => void;
  showSelection?: boolean;
}

const FamilyCard: React.FC<FamilyCardProps> = ({ family, memberCount, onView, onEdit, onDelete, isSelected = false, onSelect, showSelection = false }) => {
  const getGradientClass = () => {
    const gradients = [
      'from-emerald-400/20 via-teal-500/20 to-cyan-600/20',
      'from-blue-400/20 via-indigo-500/20 to-purple-600/20',
      'from-purple-400/20 via-pink-500/20 to-rose-600/20',
      'from-orange-400/20 via-red-500/20 to-pink-600/20',
      'from-yellow-400/20 via-amber-500/20 to-orange-600/20'
    ];
    return gradients[family.id.toString().charCodeAt(0) % gradients.length];
  };

  const getBorderGradientClass = () => {
    const borders = [
      'from-emerald-500/30 via-teal-500/30 to-cyan-500/30',
      'from-blue-500/30 via-indigo-500/30 to-purple-500/30',
      'from-purple-500/30 via-pink-500/30 to-rose-500/30',
      'from-orange-500/30 via-red-500/30 to-pink-500/30',
      'from-yellow-500/30 via-amber-500/30 to-orange-500/30'
    ];
    return borders[family.id.toString().charCodeAt(0) % borders.length];
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-card to-card/95 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-out border border-border">
      {/* Animated gradient background */}
      <div className={`absolute inset-0 bg-linear-to-br ${getGradientClass()} opacity-30 group-hover:opacity-50 transition-opacity duration-300`} />
      
      {/* Animated border */}
      <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${getBorderGradientClass()} transition-all duration-300 group-hover:scale-[1.02]`} />
      
      {/* Selection checkbox */}
      {showSelection && (
        <div className="absolute top-4 left-4 z-20">
          <div className="relative">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect?.(family.id.toString(), e.target.checked)}
              aria-label={`Select ${family.family_name}`}
              className="w-5 h-5 text-primary border-border rounded-lg focus:ring-2 focus:ring-primary/50 bg-card"
            />
            {isSelected && (
              <div className="absolute inset-0 rounded-lg bg-primary/20 animate-pulse" />
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Header with animated icon */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-foreground">{family.family_name}</h3>
              {memberCount > 5 && (
                <Crown className="w-5 h-5 text-yellow-500 animate-pulse" />
              )}
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              {family.created_at}
            </p>
          </div>
          <div className="relative group/icon">
            <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 group-hover/icon:bg-primary/20 transition-all duration-300">
              <Home className="w-5 h-5 text-primary" />
            </div>
            <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-500 animate-pulse" />
          </div>
        </div>
        
        {/* Member count with visual indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                <Users className="w-5 h-5 text-primary" />
              </div>
              {memberCount > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{memberCount}</span>
                </div>
              )}
            </div>
            <div>
              <span className="text-lg font-semibold text-foreground">{memberCount}</span>
              <span className="text-sm text-muted-foreground ml-1">Members</span>
            </div>
          </div>
          {memberCount === 0 && (
            <span className="px-3 py-1 text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-full">
              Empty Family
            </span>
          )}
          {memberCount > 10 && (
            <span className="px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              Large Family
            </span>
          )}
        </div>

        {/* Action buttons with enhanced styling */}
        <div className="flex gap-3">
          <button
            onClick={() => onView(family)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold bg-linear-to-r from-emerald-600 to-emerald-700 dark:from-emerald-400 dark:to-emerald-500 bg-clip-text text-transparent rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <Eye className="w-4 h-4" />
            View Family
          </button>
          <button
            onClick={() => onEdit(family)}
            className="p-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-all duration-300 hover:scale-105 border border-border"
            title="Edit family"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(family)}
            className="p-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300 hover:scale-105 border border-border"
            title="Delete family"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Subtle animated overlay */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-t from-black/20 to-transparent rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default FamilyCard;
