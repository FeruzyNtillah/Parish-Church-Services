import React, { useState } from 'react';
import { Plus, Search, ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { useFamilyData, useFamilyFilters } from '../hooks';
import { 
  FamilyCard, 
  FamilyStats, 
  AddFamilyModal, 
  FamilyDetailsDrawer, 
  AddMemberModal 
} from '../components/family';
import { ROLE_OPTIONS } from '../constants/family';
import type { Family } from '../types';

const roleOptions = [...ROLE_OPTIONS];

const FamilyPage: React.FC = () => {
  const {
    families,
    familyMembers,
    membersById,
    membersNotAssigned,
    statistics,
    getMemberCount,
    createFamily,
    updateFamily,
    addFamilyMember,
    removeFamilyMember
  } = useFamilyData();

  const {
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    sortBy,
    sortOrder,
    toggleSort,
    totalPages,
    paginatedFamilies,
    filteredAndSortedFamilies
  } = useFamilyFilters(families, getMemberCount);

  // Modal states
  const [showAddFamily, setShowAddFamily] = useState(false);
  const [newFamilyName, setNewFamilyName] = useState('');
  const [selectedParish, setSelectedParish] = useState(1);
  const [selectedProvince, setSelectedProvince] = useState('Dar es Salaam');
  const [jummuiya, setJummuiya] = useState('');
  const [dateJoined, setDateJoined] = useState(new Date().toISOString().split('T')[0]);
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
  const [showAddMember, setShowAddMember] = useState(false);
  const [memberQuery, setMemberQuery] = useState('');
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>(roleOptions[0]);

  // Event handlers
  const handleCreateFamily = () => {
    try {
      const newFamily = createFamily(newFamilyName);
      setNewFamilyName('');
      setSelectedParish(1);
      setSelectedProvince('Dar es Salaam');
      setJummuiya('');
      setDateJoined(new Date().toISOString().split('T')[0]);
      setShowAddFamily(false);
      setSelectedFamily(newFamily);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to create family');
    }
  };

  const handleEditFamily = (family: Family) => {
    const newName = prompt('Edit family name', family.familyName);
    if (newName && newName.trim()) {
      try {
        updateFamily(family.id, newName.trim());
        if (selectedFamily?.id === family.id) {
          setSelectedFamily({ ...family, familyName: newName.trim() });
        }
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to update family');
      }
    }
  };

  const handleAddMember = () => {
    if (!selectedFamily || !selectedMemberId) return;
    
    try {
      addFamilyMember(selectedFamily.id, selectedMemberId, selectedRole);
      setShowAddMember(false);
      setMemberQuery('');
      setSelectedMemberId(null);
      setSelectedRole(roleOptions[0]);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to add member');
    }
  };

  const handleRemoveMember = (familyMemberId: string) => {
    if (confirm('Remove member from family?')) {
      removeFamilyMember(familyMemberId);
    }
  };

  // Filter members for add member modal
  const filteredMembers = membersNotAssigned.filter((m) => 
    m.fullName.toLowerCase().includes(memberQuery.toLowerCase()) || 
    m.phone?.includes(memberQuery)
  );

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

      {/* Statistics */}
      <FamilyStats {...statistics} />

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
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            {(['name', 'members', 'date'] as const).map((field) => (
              <button
                key={field}
                onClick={() => toggleSort(field)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  sortBy === field 
                    ? 'bg-primary/10 border-primary text-primary' 
                    : 'border-border hover:bg-accent text-foreground'
                }`}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)} {sortBy === field && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            ))}
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
        {paginatedFamilies.map((family) => (
          <FamilyCard
            key={family.id}
            family={family}
            memberCount={getMemberCount(family.id)}
            onView={setSelectedFamily}
            onEdit={handleEditFamily}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * 12) + 1} to {Math.min(currentPage * 12, filteredAndSortedFamilies.length)} of {filteredAndSortedFamilies.length} families
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
      <AddFamilyModal
        isOpen={showAddFamily}
        onClose={() => setShowAddFamily(false)}
        familyName={newFamilyName}
        onFamilyNameChange={setNewFamilyName}
        selectedParish={selectedParish}
        onParishChange={setSelectedParish}
        selectedProvince={selectedProvince}
        onProvinceChange={setSelectedProvince}
        jummuiya={jummuiya}
        onJummuiyaChange={setJummuiya}
        dateJoined={dateJoined}
        onDateJoinedChange={setDateJoined}
        onSave={handleCreateFamily}
      />

      {/* Family Details Drawer */}
      {selectedFamily && (
        <FamilyDetailsDrawer
          family={selectedFamily}
          familyMembers={familyMembers}
          membersById={membersById}
          onAddMember={() => setShowAddMember(true)}
          onClose={() => setSelectedFamily(null)}
          onRemoveMember={handleRemoveMember}
          showAddMemberModal={showAddMember}
        >
          <AddMemberModal
            isOpen={showAddMember}
            onClose={() => setShowAddMember(false)}
            memberQuery={memberQuery}
            onMemberQueryChange={setMemberQuery}
            filteredMembers={filteredMembers}
            selectedMemberId={selectedMemberId}
            onMemberSelect={setSelectedMemberId}
            selectedRole={selectedRole}
            onRoleChange={setSelectedRole}
            onAdd={handleAddMember}
            roleOptions={roleOptions}
          />
        </FamilyDetailsDrawer>
      )}
    </div>
  );
};

export default FamilyPage;
