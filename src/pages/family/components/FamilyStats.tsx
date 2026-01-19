import React from 'react';
import { Home, Users, Calendar } from 'lucide-react';

interface FamilyStatsProps {
  totalFamilies: number;
  totalMembers: number;
  avgMembersPerFamily: string;
  recentFamilies: number;
}

const FamilyStats: React.FC<FamilyStatsProps> = ({
  totalFamilies,
  totalMembers,
  avgMembersPerFamily,
  recentFamilies
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Families</p>
            <p className="text-2xl font-bold text-foreground mt-1">{totalFamilies}</p>
          </div>
          <div className="p-3 bg-primary/10 rounded-lg">
            <Home className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>

      <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Members</p>
            <p className="text-2xl font-bold text-foreground mt-1">{totalMembers}</p>
          </div>
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Avg Members/Family</p>
            <p className="text-2xl font-bold text-foreground mt-1">{avgMembersPerFamily}</p>
          </div>
          <div className="p-3 bg-purple-500/10 rounded-lg">
            <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>

      <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">New Families (30d)</p>
            <p className="text-2xl font-bold text-foreground mt-1">{recentFamilies}</p>
          </div>
          <div className="p-3 bg-orange-500/10 rounded-lg">
            <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyStats;
