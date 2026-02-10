import React from 'react';
import { FamilyCard, FamilyListItem, FamilyTable } from '../index';
import type { Family } from '../../../../types';

interface FamilyDisplayProps {
  families: Family[];
  viewMode: 'grid' | 'list' | 'table';
  showAlphabetical: boolean;
  groupedFamilies: Record<string, Family[]> | null;
  getMemberCount: (familyId: number) => number;
  onViewFamily: (family: Family) => void;
  onEditFamily: (family: Family) => void;
  onDeleteFamily: (family: Family) => void;
}

export const FamilyDisplay: React.FC<FamilyDisplayProps> = ({
  families,
  viewMode,
  showAlphabetical,
  groupedFamilies,
  getMemberCount,
  onViewFamily,
  onEditFamily,
  onDeleteFamily,
}) => {
  const renderFamily = (family: Family) => (
    viewMode === 'grid' ? (
      <FamilyCard
        key={family.id}
        family={family}
        memberCount={getMemberCount(family.id)}
        onView={onViewFamily}
        onEdit={onEditFamily}
        onDelete={onDeleteFamily}
      />
    ) : (
      <FamilyListItem
        key={family.id}
        family={family}
        memberCount={getMemberCount(family.id)}
        onView={onViewFamily}
        onEdit={onEditFamily}
        onDelete={onDeleteFamily}
      />
    )
  );

  if (showAlphabetical && groupedFamilies) {
    return (
      <div className="space-y-8 mb-6">
        {Object.entries(groupedFamilies)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([letter, families]) => (
            <div key={letter}>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {letter}
              </h3>
              {viewMode === 'table' ? (
                <FamilyTable
                  families={families}
                  getMemberCount={getMemberCount}
                  onViewFamily={onViewFamily}
                  onEditFamily={onEditFamily}
                  onDeleteFamily={onDeleteFamily}
                  showAlphabetical={false}
                  groupedFamilies={null}
                />
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {families.map(renderFamily)}
                </div>
              ) : (
                <div className="space-y-4">
                  {families.map(renderFamily)}
                </div>
              )}
            </div>
          ))}
      </div>
    );
  }

  return viewMode === 'table' ? (
    <FamilyTable
      families={families}
      getMemberCount={getMemberCount}
      onViewFamily={onViewFamily}
      onEditFamily={onEditFamily}
      onDeleteFamily={onDeleteFamily}
      showAlphabetical={false}
      groupedFamilies={null}
    />
  ) : viewMode === 'grid' ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
      {families.map(renderFamily)}
    </div>
  ) : (
    <div className="space-y-4 mb-6">
      {families.map(renderFamily)}
    </div>
  );
};
