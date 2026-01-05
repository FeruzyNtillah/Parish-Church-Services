import React from 'react';
import { X } from 'lucide-react';

interface AddFamilyModalProps {
  isOpen: boolean;
  onClose: () => void;
  familyName: string;
  onFamilyNameChange: (name: string) => void;
  onSave: () => void;
}

const AddFamilyModal: React.FC<AddFamilyModalProps> = ({
  isOpen,
  onClose,
  familyName,
  onFamilyNameChange,
  onSave
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Modal backdrop */}
      <div className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Family</h3>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label="Close add family modal" title="Close">
              <X className="w-5 h-5" />
            </button>
          </div>
          <label htmlFor="family-name-input" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Family Name</label>
          <input
            id="family-name-input"
            value={familyName}
            onChange={(e) => onFamilyNameChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="e.g. Mwakalinga Family"
          />
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">Cancel</button>
            <button onClick={onSave} className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors">Save</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFamilyModal;
