import React, { useState } from 'react';
import { Plus, Search, ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { useFamilyData, useFamilyFilters } from '../../hooks';
import { 
  FamilyCard, 
  FamilyListItem,
  FamilyStats, 
  AddFamilyModal, 
  FamilyDetailsDrawer, 
  AddMemberModal 
} from './components';
import type { Family, Member } from '../../types';

const FamilyPage: React.FC = () => {
  const {
    families,
    members,
    loading,
    error,
    statistics,
    createFamily,
    updateFamily,
    createMember,
    deleteMember
  } = useFamilies();

  // Helper function to get members for a family
  const getFamilyMembers = (familyId: number) => {
    return members.filter((m) => m.family_id === familyId);
  };

  // Create membersById map for FamilyDetailsDrawer
  const membersById = new Map(members.map(member => [member.id.toString(), member]));

  // Helper function to get member count for a family
  const getMemberCount = (familyId: number) => {
    return getFamilyMembers(familyId).length;
  };

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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAlphabeticalGroups, setShowAlphabeticalGroups] = useState(false);

  // Get family members for selected family and convert to FamilyMember format
  const familyMembers = selectedFamily 
    ? getFamilyMembers(selectedFamily.id).map(member => ({
        id: `FM${member.id}`,
        familyId: selectedFamily.id,
        memberId: member.id,
        role: member.relation || 'Member',
        addedAt: member.created_at
      }))
    : [];

  // Event handlers
  const handleCreateFamily = async () => {
    try {
      const familyData = {
        family_name: newFamilyName,
        parish: selectedParish === 1 ? 'St. Mary' : 'Other Parish',
        province: selectedProvince,
        jummuiya: jummuiya || undefined
      };
      const newFamily = await createFamily(familyData);
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

  const handleEditFamily = async (family: Family) => {
    const newName = prompt('Edit family name', family.family_name);
    if (newName && newName.trim()) {
      try {
        await updateFamily(family.id, { family_name: newName.trim() });
        if (selectedFamily?.id === family.id) {
          setSelectedFamily({ ...family, family_name: newName.trim() });
        }
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to update family');
      }
    }
  };

  const handleAddNewMember = async (memberData: Omit<Member, 'id'>) => {
    if (!selectedFamily) return;
    
    try {
      const memberWithFamilyId = {
        ...memberData,
        family_id: selectedFamily.id
      };
      await createMember(memberWithFamilyId);
      setShowAddMember(false);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to add family member');
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (confirm('Remove member from family?')) {
      try {
        // Convert string memberId back to number for the API
        await deleteMember(parseInt(memberId.replace('FM', '')));
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to remove member');
      }
    }
  };

  // Group families alphabetically
  const groupedFamilies = useMemo(() => {
    if (!showAlphabeticalGroups) return null;
    
    const groups: Record<string, Family[]> = {};
    filteredAndSortedFamilies.forEach(family => {
      const firstLetter = family.familyName.charAt(0).toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(family);
    });
    
    return groups;
  }, [filteredAndSortedFamilies, showAlphabeticalGroups]);

  // Jump to page functionality
  const handleJumpToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add Family
        </button>
      </div>

      {/* Statistics */}
      <FamilyStats {...statistics} />

      {/* Search and Filters */}
      <div className="bg-card p-6 rounded-2xl shadow-xl border border-border p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search families by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-input rounded-xl focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground placeholder:text-muted-foreground transition-all duration-300"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            {(['name', 'members', 'date'] as const).map((field) => (
              <button
                key={field}
                onClick={() => toggleSort(field)}
                className={`px-4 py-3 rounded-xl border transition-all duration-300 transform hover:scale-105 ${
                  sortBy === field 
                    ? 'bg-primary/10 border-primary text-primary shadow-lg' 
                    : 'border-border hover:bg-accent text-foreground'
                }`}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)} {sortBy === field && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            ))}
          </div>
        </div>

        {/* View Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-3 rounded-xl border transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                viewMode === 'grid' 
                  ? 'bg-primary/10 border-primary text-primary shadow-lg' 
                  : 'border-border hover:bg-accent text-foreground'
              }`}
            >
              <Grid className="w-4 h-4" />
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-3 rounded-xl border transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                viewMode === 'list' 
                  ? 'bg-primary/10 border-primary text-primary shadow-lg' 
                  : 'border-border hover:bg-accent text-foreground'
              }`}
            >
              <List className="w-4 h-4" />
              List
            </button>
            <button
              onClick={() => setShowAlphabeticalGroups(!showAlphabeticalGroups)}
              className={`px-4 py-3 rounded-xl border transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                showAlphabeticalGroups 
                  ? 'bg-primary/10 border-primary text-primary shadow-lg' 
                  : 'border-border hover:bg-accent text-foreground'
              }`}
            >
              A-Z
            </button>
          </div>
          
          <div className="text-sm text-muted-foreground font-medium">
            {filteredAndSortedFamilies.length} families total
          </div>
        </div>

        {searchQuery && (
          <div className="mt-4 text-sm text-muted-foreground">
            Found {filteredAndSortedFamilies.length} families matching "{searchQuery}"
          </div>
        )}
      </div>

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

      {/* Families Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
        {paginatedFamilies.map((family: Family) => (
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
              className="p-2 rounded-xl border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 disabled:hover:bg-transparent"
              aria-label="Previous page"
              title="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {/* Page numbers with jump functionality */}
            <div className="flex items-center gap-1">
              {totalPages <= 7 ? (
                Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      currentPage === page
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'border border-border hover:bg-accent text-foreground'
                    }`}
                  >
                    {page}
                  </button>
                ))
              ) : (
                <>
                  <button
                    onClick={() => setCurrentPage(1)}
                    className={`px-3 py-2 text-sm font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      currentPage === 1
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'border border-border hover:bg-accent text-foreground'
                    }`}
                  >
                    1
                  </button>
                  
                  {currentPage > 3 && (
                    <span className="px-2 text-muted-foreground">...</span>
                  )}
                  
                  {currentPage > 2 && currentPage < totalPages - 1 && (
                    <button
                      onClick={() => setCurrentPage(currentPage)}
                      className="px-3 py-2 text-sm font-bold bg-primary text-primary-foreground shadow-lg rounded-xl"
                    >
                      {currentPage}
                    </button>
                  )}
                  
                  {currentPage < totalPages - 2 && (
                    <span className="px-2 text-muted-foreground">...</span>
                  )}
                  
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`px-3 py-2 text-sm font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      currentPage === totalPages
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'border border-border hover:bg-accent text-foreground'
                    }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 disabled:hover:bg-transparent"
              aria-label="Next page"
              title="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          {/* Jump to page input */}
          {totalPages > 7 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground font-medium">Go to page:</span>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={currentPage}
                onChange={(e) => handleJumpToPage(parseInt(e.target.value) || 1)}
                className="w-16 px-2 py-2 text-sm border border-input rounded-xl focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground text-center transition-all duration-300"
              />
            </div>
          )}
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
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
            onAddMember={handleAddNewMember}
          />
        </FamilyDetailsDrawer>
      )}
    </div>
  );
};

export default FamilyPage;
