import React, { useMemo, useState } from 'react';
import { Plus, Home } from 'lucide-react';
import { useFamilies } from '../../hooks';
import { useFamilyFilters } from './hooks/useFamilyFilters';
import { useFamilyHandlers } from './hooks/useFamilyHandlers';
import { 
  FamilyStats, 
  AddFamilyModal, 
  EditFamilyModal,
  EditMemberModal,
  FamilyDetailsDrawer, 
  AddMemberModal 
} from './components';
import { FamilyDisplay } from './components/layout/FamilyDisplay';
import { Pagination } from './components/layout/Pagination';
import { SearchAndFilters } from './components/layout/SearchAndFilters';
import type { Family } from '../../types';

const FamilyPage: React.FC = () => {
  const {
    families,
    members,
    loading,
    error,
    statistics,
    createFamily,
    updateFamily,
    deleteFamily,
    createMember,
    updateMember,
    deleteMember,
  } = useFamilies();

  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'table'>('table');
  const [showAlphabeticalGroups, setShowAlphabeticalGroups] = useState(false);

  // Helper functions
  const getFamilyMembers = (familyId: number) => 
    members.filter((m) => m.family_id === familyId);

  const getMemberCount = (familyId: number) => 
    getFamilyMembers(familyId).length;

  const membersById = new Map(
    members.map(member => [member.id.toString(), member])
  );

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
    filteredAndSortedFamilies,
  } = useFamilyFilters(families, getMemberCount);

  const familyHandlers = useFamilyHandlers({
    createFamily,
    updateFamily,
    deleteFamily,
    createMember,
    updateMember,
    deleteMember,
  });

  const {
    showAddFamily,
    setShowAddFamily,
    showEditFamily,
    setShowEditFamily,
    showAddMember,
    setShowAddMember,
    showEditMember,
    setShowEditMember,
    selectedFamily,
    setSelectedFamily,
    selectedMember,
    newFamilyName,
    setNewFamilyName,
    selectedParish,
    setSelectedParish,
    selectedProvince,
    setSelectedProvince,
    jummuiya,
    setJummuiya,
    dateJoined,
    setDateJoined,
    handleCreateFamily,
    handleEditFamily,
    handleUpdateFamily,
    handleDeleteFamily,
    handleEditMember,
    handleUpdateMember,
    handleAddNewMember,
    handleRemoveMember,
  } = familyHandlers;

  // Get family members for selected family
  const familyMembers = selectedFamily 
    ? getFamilyMembers(selectedFamily.id).map(member => ({
        id: `FM${member.id}`,
        familyId: selectedFamily.id,
        memberId: member.id,
        role: member.relation || 'Member',
        addedAt: member.created_at,
      }))
    : [];


  // Group families alphabetically
  const groupedFamilies = useMemo(() => {
    if (!showAlphabeticalGroups) return null;
    
    const groups: Record<string, Family[]> = {};
    filteredAndSortedFamilies.forEach(family => {
      const firstLetter = family.family_name.charAt(0).toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(family);
    });
    
    return groups;
  }, [filteredAndSortedFamilies, showAlphabeticalGroups]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Family Dashboard</h1>
          <p className="text-muted-foreground mt-2 text-lg">Manage and view all church families</p>
        </div>
        <button
          onClick={() => setShowAddFamily(true)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add Family
        </button>
      </div>

      {/* Statistics */}
      <FamilyStats {...statistics} />

      {/* Search and Filters */}
      <SearchAndFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onToggleSort={toggleSort}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        showAlphabetical={showAlphabeticalGroups}
        onAlphabeticalToggle={() => setShowAlphabeticalGroups(!showAlphabeticalGroups)}
        totalFamilies={filteredAndSortedFamilies.length}
      />

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2 text-muted-foreground">Loading families...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg mb-6">
          <p className="font-medium">Error loading families</p>
          <p className="text-sm mt-1">{error instanceof Error ? error.message : 'An unexpected error occurred'}</p>
        </div>
      )}

      {/* Families Display */}
      <FamilyDisplay
        families={paginatedFamilies}
        viewMode={viewMode}
        showAlphabetical={showAlphabeticalGroups}
        groupedFamilies={groupedFamilies}
        getMemberCount={getMemberCount}
        onViewFamily={setSelectedFamily}
        onEditFamily={handleEditFamily}
        onDeleteFamily={handleDeleteFamily}
      />

      {/* Pagination */}
      {!showAlphabeticalGroups && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={filteredAndSortedFamilies.length}
          itemsPerPage={12}
          onPageChange={setCurrentPage}
        />
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Plus className="w-5 h-5" />
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

      {/* Edit Family Modal */}
      <EditFamilyModal
        isOpen={showEditFamily}
        onClose={() => setShowEditFamily(false)}
        family={selectedFamily}
        familyName={newFamilyName}
        onFamilyNameChange={setNewFamilyName}
        selectedParish={selectedParish}
        onParishChange={setSelectedParish}
        selectedProvince={selectedProvince}
        onProvinceChange={setSelectedProvince}
        jummuiya={jummuiya}
        onJummuiyaChange={setJummuiya}
        onSave={handleUpdateFamily}
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
          onEditMember={handleEditMember}
          onEditFamily={() => handleEditFamily(selectedFamily)}
          onDeleteFamily={() => handleDeleteFamily(selectedFamily)}
          showAddMemberModal={showAddMember}
        >
          <AddMemberModal
            isOpen={showAddMember}
            onClose={() => setShowAddMember(false)}
            onAddMember={handleAddNewMember}
            family={selectedFamily}
          />
        </FamilyDetailsDrawer>
      )}

      {/* Edit Member Modal - Rendered separately */}
      <EditMemberModal
        isOpen={showEditMember}
        onClose={() => setShowEditMember(false)}
        onUpdateMember={handleUpdateMember}
        member={selectedMember}
      />
    </div>
  );
};

export default FamilyPage;
