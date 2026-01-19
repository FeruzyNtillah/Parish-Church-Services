import React from 'react';
import { Trash2, Download, Mail } from 'lucide-react';

interface FamilyBulkActionsProps {
  selectedCount: number;
  onDeleteSelected: () => void;
  onExportSelected: () => void;
  onEmailSelected: () => void;
}

const FamilyBulkActions: React.FC<FamilyBulkActionsProps> = ({
  selectedCount,
  onDeleteSelected,
  onExportSelected,
  onEmailSelected
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-card p-4 rounded-xl shadow-sm border border-border mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-foreground">
            {selectedCount} family{selectedCount !== 1 ? 'ies' : ''} selected
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onEmailSelected}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 rounded-lg transition-colors"
          >
            <Mail className="w-4 h-4" />
            Email
          </button>
          
          <button
            onClick={onExportSelected}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-green-600 dark:text-green-400 bg-green-500/10 hover:bg-green-500/20 dark:bg-green-500/10 dark:hover:bg-green-500/20 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          
          <button
            onClick={onDeleteSelected}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-500/10 hover:bg-red-500/20 dark:bg-red-500/10 dark:hover:bg-red-500/20 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default FamilyBulkActions;
