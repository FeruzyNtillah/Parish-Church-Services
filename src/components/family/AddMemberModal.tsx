import React from 'react';
import { Search, X } from 'lucide-react';
import type { Member } from '../../types';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberQuery: string;
  onMemberQueryChange: (query: string) => void;
  filteredMembers: Member[];
  selectedMemberId: string | null;
  onMemberSelect: (memberId: string) => void;
  selectedRole: string;
  onRoleChange: (role: string) => void;
  onAdd: () => void;
  roleOptions: string[];
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  onClose,
  memberQuery,
  onMemberQueryChange,
  filteredMembers,
  selectedMemberId,
  onMemberSelect,
  selectedRole,
  onRoleChange,
  onAdd,
  roleOptions
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Modal backdrop */}
      <div className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="fixed inset-0 flex items-center justify-center z-60">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Add Family Member</h4>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label="Close add member modal" title="Close">
              <X className="w-5 h-5" />
            </button>
          </div>

          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Search member</label>
          <div className="flex items-center gap-2 mb-3">
            <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden />
            <input
              id="member-search-input"
              value={memberQuery}
              onChange={(e) => onMemberQueryChange(e.target.value)}
              placeholder="Type name or phone"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              aria-label="Search member by name or phone"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Select Member</label>
            <div className="max-h-40 overflow-auto border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
              {filteredMembers.length === 0 && <div className="p-2 text-sm text-gray-500 dark:text-gray-400">No available members</div>}
              {filteredMembers.map((m) => (
                <div
                  key={m.id}
                  onClick={() => onMemberSelect(m.id)}
                  className={`flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 ${selectedMemberId === m.id ? 'bg-emerald-100 dark:bg-emerald-900/40' : ''}`}
                >
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{m.fullName}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{m.phone}</div>
                  </div>
                  {selectedMemberId === m.id && <div className="text-emerald-600 dark:text-emerald-400">Selected</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="role-select" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Role</label>
            <select 
              id="role-select" 
              value={selectedRole} 
              onChange={(e) => onRoleChange(e.target.value)} 
              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 parish-select" 
              aria-label="Select role in family"
            >
              {roleOptions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">Cancel</button>
            <button onClick={onAdd} className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors">Add</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMemberModal;
