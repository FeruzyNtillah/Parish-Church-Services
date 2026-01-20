import React from 'react';
import { Home, Users, Eye, Edit2, Calendar, Crown, Sparkles, Shield, Church, MapPin, Users2 } from 'lucide-react';
import type { Family } from '../../../types';

interface FamilyTableProps {
  families: Family[];
  getMemberCount: (familyId: number) => number;
  onViewFamily: (family: Family) => void;
  onEditFamily: (family: Family) => void;
  showAlphabetical: boolean;
  groupedFamilies: Record<string, Family[]> | null;
}

const FamilyTable: React.FC<FamilyTableProps> = ({
  families,
  getMemberCount,
  onViewFamily,
  onEditFamily,
  showAlphabetical,
  groupedFamilies,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getMemberBadgeClass = (count: number) => {
    if (count === 0) return 'px-3 py-1 text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-full';
    if (count > 10 && count <= 15) return 'px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full';
    if (count > 15) return 'px-3 py-1 text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full';
    return 'px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full';
  };

  const getMemberBadgeText = (count: number) => {
    if (count === 0) return 'Empty Family';
    if (count > 10 && count <= 15) return 'Large Family';
    if (count > 15) return 'Mega Family';
    return 'Active Family';
  };

  const renderFamilyRow = (family: Family) => {
    const memberCount = getMemberCount(family.id);
    
    return (
      <tr key={family.id} className="group hover:bg-accent/50 transition-colors duration-200 border-b border-border/50">
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative group/icon">
              <div className="p-2 bg-primary/10 rounded-lg border border-primary/20 group-hover/icon:bg-primary/20 transition-all duration-300">
                <Home className="w-4 h-4 text-primary" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-2 h-2 text-yellow-500 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-foreground">{family.family_name}</h3>
                {memberCount > 5 && (
                  <Crown className="w-3 h-3 text-yellow-500 animate-pulse shrink-0" />
                )}
                {memberCount > 15 && (
                  <Shield className="w-3 h-3 text-purple-500 animate-pulse shrink-0" />
                )}
              </div>
            </div>
          </div>
        </td>
        
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="p-1.5 bg-primary/10 rounded-lg border border-primary/20">
                <Users className="w-4 h-4 text-primary shrink-0" />
              </div>
              {memberCount > 0 && (
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-[8px] font-bold text-white">{memberCount}</span>
                </div>
              )}
            </div>
            <span className="text-sm font-medium text-foreground">{memberCount}</span>
          </div>
        </td>
        
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-lg border border-primary/20">
              <Church className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm text-foreground">{family.parish || 'Not Assigned'}</span>
          </div>
        </td>
        
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-lg border border-primary/20">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm text-foreground">{family.province || 'Not Specified'}</span>
          </div>
        </td>
        
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-lg border border-primary/20">
              <Users2 className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm text-foreground">{family.jummuiya || 'Not Assigned'}</span>
          </div>
        </td>
        
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-lg border border-primary/20">
              <Calendar className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">{formatDate(family.created_at)}</span>
          </div>
        </td>
        
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <span className={getMemberBadgeClass(memberCount)}>
              {getMemberBadgeText(memberCount)}
            </span>
          </div>
        </td>
        
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewFamily(family)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-bold bg-linear-to-r from-emerald-600 to-emerald-700 dark:from-emerald-400 dark:to-emerald-500 bg-clip-text text-transparent hover:bg-accent rounded-lg transition-all duration-300"
            >
              <Eye className="w-3.5 h-3.5" />
              View
            </button>
            <button
              onClick={() => onEditFamily(family)}
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all duration-300 border border-border"
              title="Edit family"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  if (showAlphabetical && groupedFamilies) {
    return (
      <div className="space-y-8 mb-6">
        {Object.entries(groupedFamilies)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([letter, families]) => (
            <div key={letter}>
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-lg">{letter}</span>
                <span className="text-sm text-muted-foreground font-normal">{families.length} families</span>
              </h3>
              <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50 border-b border-border">
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Family Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Members</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Parish</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Province</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Jummuiya</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Created</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {families.map(renderFamilyRow)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm mb-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Family Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Members</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Parish</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Province</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Jummuiya</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {families.map(renderFamilyRow)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FamilyTable;
