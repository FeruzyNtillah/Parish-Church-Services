import React, { useMemo, useState } from 'react';
import { Plus, Edit2, UserPlus, Trash2, Search, X } from 'lucide-react';
import {
  membersData,
  familiesData as initialFamilies,
  familyMembersData as initialFamilyMembers,
} from './Data';
import type { Member, Family, FamilyMember } from './Data';

const roleOptions = ['Father', 'Mother', 'Child', 'Guardian', 'Other'];

const FamilyPage: React.FC = () => {
  const [families, setFamilies] = useState<Family[]>(initialFamilies);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(initialFamilyMembers);
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);

  const [showAddFamily, setShowAddFamily] = useState(false);
  const [newFamilyName, setNewFamilyName] = useState('');

  const [showAddMember, setShowAddMember] = useState(false);
  const [memberQuery, setMemberQuery] = useState('');
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState(roleOptions[0]);

  const membersById = useMemo(() => {
    const map = new Map<string, Member>();
    membersData.forEach((m) => map.set(m.id, m));
    return map;
  }, []);

  const getMemberCount = (familyId: string) => familyMembers.filter((fm) => fm.familyId === familyId).length;

  const openDetails = (f: Family) => {
    setSelectedFamily(f);
  };

  const createFamily = () => {
    const trimmed = newFamilyName.trim();
    if (!trimmed) return alert('Family name is required');
    // unique name
    if (families.some((f) => f.familyName.toLowerCase() === trimmed.toLowerCase())) return alert('Family name must be unique');
    const newF: Family = { id: `FAM${Date.now()}`, familyName: trimmed, createdAt: new Date().toISOString().slice(0, 10) };
    setFamilies((s) => [newF, ...s]);
    setNewFamilyName('');
    setShowAddFamily(false);
    setSelectedFamily(newF);
  };

  const membersNotAssigned = useMemo(() => {
    const assigned = new Set(familyMembers.map((fm) => fm.memberId));
    return membersData.filter((m) => !assigned.has(m.id));
  }, [familyMembers]);

  const filteredMembers = useMemo(() => {
    const q = memberQuery.trim().toLowerCase();
    return membersNotAssigned.filter((m) => m.fullName.toLowerCase().includes(q) || m.phone?.includes(q));
  }, [memberQuery, membersNotAssigned]);

  const addMemberToFamily = () => {
    if (!selectedFamily) return;
    if (!selectedMemberId) return alert('Select a member');
    // prevent duplicates in same family
    if (familyMembers.some((fm) => fm.familyId === selectedFamily.id && fm.memberId === selectedMemberId)) return alert('Member already in this family');
    // ensure member is not in another family (strict rule)
    if (familyMembers.some((fm) => fm.memberId === selectedMemberId)) return alert('Member already belongs to a family');
    const newFM: FamilyMember = {
      id: `FM${Date.now()}`,
      familyId: selectedFamily.id,
      memberId: selectedMemberId,
      role: selectedRole,
      addedAt: new Date().toISOString().slice(0, 10),
    };
    setFamilyMembers((s) => [newFM, ...s]);
    setShowAddMember(false);
    setMemberQuery('');
    setSelectedMemberId(null);
    setSelectedRole(roleOptions[0]);
  };

  const removeMember = (fmId: string) => {
    if (!confirm('Remove member from family?')) return;
    setFamilyMembers((s) => s.filter((fm) => fm.id !== fmId));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Families</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddFamily(true)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
          >
            <Plus className="w-4 h-4" />
            Add Family
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 text-foreground">
        {families.map((f) => (
          <div key={f.id} className="flex items-center justify-between p-4 bg-card text-card-foreground rounded shadow-sm border">
            <div>
              <div className="text-lg font-medium">{f.familyName}</div>
              <div className="text-sm text-muted-foreground">Members: {getMemberCount(f.id)}</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => openDetails(f)} className="px-3 py-1 rounded-md border">View</button>
              <button
                onClick={() => {
                  const newName = prompt('Edit family name', f.familyName);
                  if (newName && newName.trim()) {
                    setFamilies((s) => s.map((x) => (x.id === f.id ? { ...x, familyName: newName.trim() } : x)));
                    if (selectedFamily?.id === f.id) setSelectedFamily({ ...f, familyName: newName.trim() });
                  }
                }}
                className="p-2 rounded-md text-emerald-600 border"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Family Modal */}
      {showAddFamily && (
        <>
          {/* Modal backdrop */}
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowAddFamily(false)}></div>
          
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded shadow-xl ring-1 ring-gray-200 dark:ring-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Add Family</h3>
                <button onClick={() => setShowAddFamily(false)} className="p-1 rounded" aria-label="Close add family modal" title="Close">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <label htmlFor="family-name-input" className="block mb-2 text-sm font-medium">Family Name</label>
              <input
                id="family-name-input"
                value={newFamilyName}
                onChange={(e) => setNewFamilyName(e.target.value)}
                className="w-full px-3 py-2 border rounded mb-4"
                placeholder="e.g. Mwakalinga Family"
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => setShowAddFamily(false)} className="px-3 py-2 rounded border">Cancel</button>
                <button onClick={createFamily} className="px-3 py-2 rounded bg-emerald-600 text-white">Save</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Family Details Drawer / Modal */}
      {selectedFamily && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSelectedFamily(null)}></div>
          
          {/* Drawer */}
          <div className="fixed right-0 top-0 h-full w-full md:w-1/2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white z-50 overflow-auto p-6 border-l shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-semibold">{selectedFamily.familyName}</h3>
                <div className="text-sm text-gray-500 dark:text-gray-400">Created: {selectedFamily.createdAt}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setShowAddMember(true)} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 text-white">
                  <UserPlus className="w-4 h-4" /> Add Family Member
                </button>
                <button onClick={() => setSelectedFamily(null)} className="p-2 rounded border">
                  Close
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Members</h4>
              <div className="space-y-2">
                {familyMembers.filter((fm) => fm.familyId === selectedFamily.id).length === 0 && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">No members added yet.</div>
                )}
                {familyMembers
                  .filter((fm) => fm.familyId === selectedFamily.id)
                  .map((fm) => {
                    const m = membersById.get(fm.memberId);
                    return (
                      <div key={fm.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <div className="font-medium">{m?.fullName}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{fm.role} • {m?.phone}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => removeMember(fm.id)} className="p-2 rounded text-red-600 border" aria-label={`Remove ${m?.fullName} from family`} title="Remove member">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Add Member Modal inside details */}
            {showAddMember && (
              <>
                {/* Modal backdrop */}
                <div className="fixed inset-0 bg-black/60 z-50" onClick={() => setShowAddMember(false)}></div>
                
                <div className="fixed inset-0 flex items-center justify-center z-60">
                  <div className="w-full max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded shadow-xl ring-1 ring-gray-200 dark:ring-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold">Add Family Member</h4>
                      <button onClick={() => setShowAddMember(false)} className="p-1 rounded" aria-label="Close add member modal" title="Close">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <label className="block text-sm font-medium mb-1">Search member</label>
                    <div className="flex items-center gap-2 mb-3">
                      <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden />
                      <input
                        id="member-search-input"
                        value={memberQuery}
                        onChange={(e) => setMemberQuery(e.target.value)}
                        placeholder="Type name or phone"
                        className="w-full px-2 py-1 border rounded"
                        aria-label="Search member by name or phone"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Select Member</label>
                      <div className="max-h-40 overflow-auto border rounded">
                        {filteredMembers.length === 0 && <div className="p-2 text-sm text-gray-500 dark:text-gray-400">No available members</div>}
                        {filteredMembers.map((m) => (
                          <div
                            key={m.id}
                            onClick={() => setSelectedMemberId(m.id)}
                            className={`flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 ${selectedMemberId === m.id ? 'bg-emerald-100 dark:bg-emerald-900/40' : ''}`}
                          >
                            <div>
                              <div className="font-medium">{m.fullName}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{m.phone}</div>
                            </div>
                            {selectedMemberId === m.id && <div className="text-emerald-600 dark:text-emerald-400">Selected</div>}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="role-select" className="block text-sm font-medium mb-1">Role</label>
                      <select id="role-select" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="w-full px-2 py-1 border rounded" aria-label="Select role in family">
                        {roleOptions.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button onClick={() => setShowAddMember(false)} className="px-3 py-2 rounded border">Cancel</button>
                      <button onClick={addMemberToFamily} className="px-3 py-2 rounded bg-emerald-600 text-white">Add</button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FamilyPage;