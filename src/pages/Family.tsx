import React, { useMemo, useState } from 'react';
import { 
  Plus, 
  Edit2, 
  UserPlus, 
  Trash2, 
  Search, 
  X, 
  Users, 
  Calendar,
  Home,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';
import {
  membersData,
  familiesData as initialFamilies,
  familyMembersData as initialFamilyMembers,
} from '../data';
import type { Member, Family, FamilyMember } from '../types';

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

  // Dashboard states
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'name' | 'members' | 'date'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const familiesPerPage = 12;

  const membersById = useMemo(() => {
    const map = new Map<string, Member>();
    membersData.forEach((m) => map.set(m.id, m));
    return map;
  }, []);

  const getMemberCount = useMemo(() => {
    return (familyId: string) => familyMembers.filter((fm) => fm.familyId === familyId).length;
  }, [familyMembers]);

  // Dashboard statistics
  const statistics = useMemo(() => {
    const totalFamilies = families.length;
    const totalMembers = familyMembers.length;
    const avgMembersPerFamily = totalFamilies > 0 ? (totalMembers / totalFamilies).toFixed(1) : '0';
    const recentFamilies = families.filter(f => {
      const createdDate = new Date(f.createdAt);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return createdDate >= thirtyDaysAgo;
    }).length;

    return {
      totalFamilies,
      totalMembers,
      avgMembersPerFamily,
      recentFamilies
    };
  }, [families, familyMembers]);

  // Filtered and sorted families
  const filteredAndSortedFamilies = useMemo(() => {
    const filtered = families.filter(family =>
      family.familyName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort families
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.familyName.localeCompare(b.familyName);
          break;
        case 'members':
          comparison = getMemberCount(a.id) - getMemberCount(b.id);
          break;
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [families, searchQuery, sortBy, sortOrder, getMemberCount]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedFamilies.length / familiesPerPage);
  const paginatedFamilies = filteredAndSortedFamilies.slice(
    (currentPage - 1) * familiesPerPage,
    currentPage * familiesPerPage
  );

  const openDetails = (f: Family) => {
    setSelectedFamily(f);
  };

  const createFamily = () => {
    const trimmed = newFamilyName.trim();
    if (!trimmed) return alert('Family name is required');
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
    if (familyMembers.some((fm) => fm.familyId === selectedFamily.id && fm.memberId === selectedMemberId)) return alert('Member already in this family');
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

  const toggleSort = (field: 'name' | 'members' | 'date') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Family Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage and view all church families</p>
        </div>
        <button
          onClick={() => setShowAddFamily(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Family
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Families</p>
              <p className="text-2xl font-bold text-foreground mt-1">{statistics.totalFamilies}</p>
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
              <p className="text-2xl font-bold text-foreground mt-1">{statistics.totalMembers}</p>
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
              <p className="text-2xl font-bold text-foreground mt-1">{statistics.avgMembersPerFamily}</p>
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
              <p className="text-2xl font-bold text-foreground mt-1">{statistics.recentFamilies}</p>
            </div>
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-card p-6 rounded-xl shadow-sm border border-border mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search families by name..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => toggleSort('name')}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                sortBy === 'name' 
                  ? 'bg-primary/10 border-primary text-primary' 
                  : 'border-border hover:bg-accent text-foreground'
              }`}
            >
              Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => toggleSort('members')}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                sortBy === 'members' 
                  ? 'bg-primary/10 border-primary text-primary' 
                  : 'border-border hover:bg-accent text-foreground'
              }`}
            >
              Members {sortBy === 'members' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => toggleSort('date')}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                sortBy === 'date' 
                  ? 'bg-primary/10 border-primary text-primary' 
                  : 'border-border hover:bg-accent text-foreground'
              }`}
            >
              Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          </div>
        </div>

        {searchQuery && (
          <div className="mt-4 text-sm text-muted-foreground">
            Found {filteredAndSortedFamilies.length} families matching "{searchQuery}"
          </div>
        )}
      </div>

      {/* Families Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
        {paginatedFamilies.map((family) => {
          const memberCount = getMemberCount(family.id);
          return (
            <div key={family.id} className="bg-card rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">{family.familyName}</h3>
                    <p className="text-sm text-muted-foreground">Created: {family.createdAt}</p>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Home className="w-4 h-4 text-primary" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{memberCount} Members</span>
                  </div>
                  {memberCount === 0 && (
                    <span className="px-2 py-1 text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-500/10 rounded-full">
                      Empty
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openDetails(family)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => {
                      const newName = prompt('Edit family name', family.familyName);
                      if (newName && newName.trim()) {
                        setFamilies((s) => s.map((x) => (x.id === family.id ? { ...x, familyName: newName.trim() } : x)));
                        if (selectedFamily?.id === family.id) setSelectedFamily({ ...family, familyName: newName.trim() });
                      }
                    }}
                    className="p-2 text-muted-foreground hover:bg-accent rounded-lg transition-colors"
                    title="Edit family"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * familiesPerPage) + 1} to {Math.min(currentPage * familiesPerPage, filteredAndSortedFamilies.length)} of {filteredAndSortedFamilies.length} families
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
              title="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 text-sm font-medium text-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
              title="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredAndSortedFamilies.length === 0 && (
        <div className="text-center py-12">
          <Home className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No families found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? 'Try adjusting your search terms' : 'Get started by adding your first family'}
          </p>
          {!searchQuery && (
            <button
              onClick={() => setShowAddFamily(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Your First Family
            </button>
          )}
        </div>
      )}

      {/* Add Family Modal */}
      {showAddFamily && (
        <>
          {/* Modal backdrop */}
          <div className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm" onClick={() => setShowAddFamily(false)}></div>
          
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Family</h3>
                <button onClick={() => setShowAddFamily(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label="Close add family modal" title="Close">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <label htmlFor="family-name-input" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Family Name</label>
              <input
                id="family-name-input"
                value={newFamilyName}
                onChange={(e) => setNewFamilyName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="e.g. Mwakalinga Family"
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => setShowAddFamily(false)} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">Cancel</button>
                <button onClick={createFamily} className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors">Save</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Family Details Drawer / Modal */}
      {selectedFamily && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm" onClick={() => setSelectedFamily(null)}></div>
          
          {/* Drawer */}
          <div className="fixed right-0 top-0 h-full w-full md:w-1/2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white z-50 overflow-auto p-6 border-l border-gray-200 dark:border-gray-700 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{selectedFamily.familyName}</h3>
                <div className="text-sm text-gray-500 dark:text-gray-400">Created: {selectedFamily.createdAt}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setShowAddMember(true)} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors">
                  <UserPlus className="w-4 h-4" /> Add Family Member
                </button>
                <button onClick={() => setSelectedFamily(null)} className="p-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">
                  Close
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Members</h4>
              <div className="space-y-2">
                {familyMembers.filter((fm) => fm.familyId === selectedFamily.id).length === 0 && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">No members added yet.</div>
                )}
                {familyMembers
                  .filter((fm) => fm.familyId === selectedFamily.id)
                  .map((fm) => {
                    const m = membersById.get(fm.memberId);
                    return (
                      <div key={fm.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{m?.fullName}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{fm.role} • {m?.phone}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => removeMember(fm.id)} className="p-2 rounded text-red-600 dark:text-red-400 border border-gray-300 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" aria-label={`Remove ${m?.fullName} from family`} title="Remove member">
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
                <div className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm" onClick={() => setShowAddMember(false)}></div>
                
                <div className="fixed inset-0 flex items-center justify-center z-60">
                  <div className="w-full max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Add Family Member</h4>
                      <button onClick={() => setShowAddMember(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label="Close add member modal" title="Close">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Search member</label>
                    <div className="flex items-center gap-2 mb-3">
                      <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden />
                      <input
                        id="member-search-input"
                        value={memberQuery}
                        onChange={(e) => setMemberQuery(e.target.value)}
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
                            onClick={() => setSelectedMemberId(m.id)}
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
                      <select id="role-select" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 parish-select" aria-label="Select role in family">
                        {roleOptions.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button onClick={() => setShowAddMember(false)} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">Cancel</button>
                      <button onClick={addMemberToFamily} className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors">Add</button>
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