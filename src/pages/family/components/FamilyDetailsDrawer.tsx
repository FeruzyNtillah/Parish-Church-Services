import React from 'react';
import { UserPlus, Trash2 } from 'lucide-react';
import type { Family, FamilyMember, Member } from '../../../types';

interface FamilyDetailsDrawerProps {
  family: Family;
  familyMembers: FamilyMember[];
  membersById: Map<string, Member>;
  onAddMember: () => void;
  onClose: () => void;
  onRemoveMember: (memberId: string) => void;
  showAddMemberModal: boolean;
  children: React.ReactNode;
}

const FamilyDetailsDrawer: React.FC<FamilyDetailsDrawerProps> = ({
  family,
  familyMembers,
  membersById,
  onAddMember,
  onClose,
  onRemoveMember,
  showAddMemberModal,
  children
}) => {
  const familyMemberList = familyMembers.filter(fm => fm.familyId === family.id);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full md:w-1/2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white z-50 overflow-auto p-6 border-l border-gray-200 dark:border-gray-700 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{family.family_name}</h3>
            <div className="text-sm text-gray-500 dark:text-gray-400">Created: {family.created_at}</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onAddMember} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors">
              <UserPlus className="w-4 h-4" /> Add Family Member
            </button>
            <button onClick={onClose} className="p-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">
              Close
            </button>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Members</h4>
          <div className="space-y-2">
            {familyMemberList.length === 0 && (
              <div className="text-sm text-gray-500 dark:text-gray-400">No members added yet.</div>
            )}
            {familyMemberList.map((fm) => {
              const m = membersById.get(fm.memberId.toString());
              return (
                <div key={fm.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{m ? `${m.first_name} ${m.last_name}` : 'Unknown'}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{fm.role}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => onRemoveMember(fm.id)} className="p-2 rounded text-red-600 dark:text-red-400 border border-gray-300 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" aria-label={`Remove ${m ? `${m.first_name} ${m.last_name}` : 'Unknown'} from family`} title="Remove member">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Member Modal */}
        {showAddMemberModal && children}
      </div>
    </>
  );
};

export default FamilyDetailsDrawer;
