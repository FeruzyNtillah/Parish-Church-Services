import React from 'react';
import { Home, Users, Eye, Edit2, Calendar, Crown, Sparkles, Shield } from 'lucide-react';
import type { Family } from '../../../types';

interface FamilyListItemProps {
  family: Family;
  memberCount: number;
  onView: (family: Family) => void;
  onEdit: (family: Family) => void;
  isSelected?: boolean;
  onSelect?: (familyId: string, selected: boolean) => void;
  showSelection?: boolean;
}

const FamilyListItem: React.FC<FamilyListItemProps> = ({ family, memberCount, onView, onEdit, isSelected = false, onSelect, showSelection = false }) => {
  const getGradientClass = () => {
    const gradients = [
      'from-emerald-400/10 via-teal-500/10 to-cyan-600/10',
      'from-blue-400/10 via-indigo-500/10 to-purple-600/10',
      'from-purple-400/10 via-pink-500/10 to-rose-600/10',
      'from-orange-400/10 via-red-500/10 to-pink-600/10',
      'from-yellow-400/10 via-amber-500/10 to-orange-600/10'
    ];
    return gradients[family.id.toString().charCodeAt(0) % gradients.length];
  };

  const getBorderGradientClass = () => {
    const borders = [
      'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
      'from-blue-500/20 via-indigo-500/20 to-purple-500/20',
      'from-purple-500/20 via-pink-500/20 to-rose-500/20',
      'from-orange-500/20 via-red-500/20 to-pink-500/20',
      'from-yellow-500/20 via-amber-500/20 to-orange-500/20'
    ];
    return borders[family.id.toString().charCodeAt(0) % borders.length];
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-linear-to-r from-card to-card/95 shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300 ease-out border border-border">
      {/* Animated gradient background */}
      <div className={`absolute inset-0 bg-linear-to-r ${getGradientClass()} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
      
      {/* Animated border on hover */}
      <div className={`absolute inset-0 rounded-2xl bg-linear-to-r ${getBorderGradientClass()} opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />
      
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {/* Selection checkbox */}
            {showSelection && (
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => onSelect?.(family.id.toString(), e.target.checked)}
                  aria-label={`Select ${family.family_name}`}
                  className="w-5 h-5 text-primary border-border rounded-lg focus:ring-2 focus:ring-primary/50 bg-card shrink-0"
                />
                {isSelected && (
                  <div className="absolute inset-0 rounded-lg bg-primary/20 animate-pulse" />
                )}
              </div>
            )}
            
            {/* Family icon with animation */}
            <div className="relative group/icon">
              <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 group-hover/icon:bg-primary/20 transition-all duration-300 shrink-0">
                <Home className="w-5 h-5 text-primary" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-500 animate-pulse" />
            </div>
            
            {/* Family information */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-foreground truncate">{family.family_name}</h3>
                {memberCount > 5 && (
                  <Crown className="w-5 h-5 text-yellow-500 animate-pulse shrink-0" />
                )}
                {memberCount > 15 && (
                  <Shield className="w-5 h-5 text-purple-500 animate-pulse shrink-0" />
                )}
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                {/* Member count with visual indicator */}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="p-1.5 bg-primary/10 rounded-lg border border-primary/20">
                      <Users className="w-5 h-5 text-primary shrink-0" />
                    </div>
                    {memberCount > 0 && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white">{memberCount}</span>
                      </div>
                    )}
                  </div>
                  <span className="font-semibold text-foreground">{memberCount}</span>
                  <span className="text-muted-foreground">Members</span>
                </div>
                
                {/* Creation date */}
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-primary/10 rounded-lg border border-primary/20">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground font-medium">{family.created_at}</span>
                </div>
                
                {/* Status badges */}
                {memberCount === 0 && (
                  <span className="px-3 py-1 text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-full">
                    Empty Family
                  </span>
                )}
                {memberCount > 10 && memberCount <= 15 && (
                  <span className="px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    Large Family
                  </span>
                )}
                {memberCount > 15 && (
                  <span className="px-3 py-1 text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full">
                    Mega Family
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center gap-3 ml-6">
            <button
              onClick={() => onView(family)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold bg-linear-to-r from-emerald-600 to-emerald-700 dark:from-emerald-400 dark:to-emerald-500 bg-clip-text text-transparent"
            >
              <Eye className="w-4 h-4" />
              View Family
            </button>
            <button
              onClick={() => onEdit(family)}
              className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-all duration-300 hover:scale-105 border border-border"
              title="Edit family"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Subtle animated overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default FamilyListItem;
