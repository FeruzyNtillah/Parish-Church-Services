import { useState } from 'react';
import type { Family, Member } from '../../../types';

// Parish list from dashboard
const parishes = [
  { id: 1, name: "Parokia ya Bikira Maria Mama wa Rozari Takatifu - Makongo Juu" },
  { id: 2, name: "Parokia ya Mt. Petro - Oysterbay" },
  { id: 3, name: "Parokia ya Mt. Martin wa Porres - Mwananyamala" },
  { id: 4, name: "Parokia ya Mt. Anna - Hananasif" },
  { id: 5, name: "Parokia ya Mt. Kolbe - Kijitonyama" },
  { id: 6, name: "Parokia ya Mt. Martha - Mikocheni" },
  { id: 7, name: "Parokia ya Bikira Maria Mama wa Huruma - Mbezi Beach (Mt. Gaspar)" },
  { id: 8, name: "Parokia ya Mt. Michael - Kawe" },
  { id: 9, name: "Parokia ya Bikira Maria Mama wa Mwokozi - Sinza" },
  { id: 10, name: "Parokia ya Mt. Petro - Chuo Kikuu (St. Augustine)" }
];

interface UseFamilyHandlersProps {
  createFamily: (data: any) => Promise<Family>;
  updateFamily: (id: number, data: any) => Promise<void>;
  deleteFamily: (id: number) => Promise<void>;
  createMember: (data: Omit<Member, 'id'>) => Promise<Member>;
  deleteMember: (id: number) => Promise<void>;
  onFamilyCreated?: (family: Family) => void;
}

export const useFamilyHandlers = ({
  createFamily,
  updateFamily,
  deleteFamily,
  createMember,
  deleteMember,
  onFamilyCreated,
}: UseFamilyHandlersProps) => {
  const [showAddFamily, setShowAddFamily] = useState(false);
  const [showEditFamily, setShowEditFamily] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
  
  const [newFamilyName, setNewFamilyName] = useState('');
  const [selectedParish, setSelectedParish] = useState(1);
  const [selectedProvince, setSelectedProvince] = useState('Dar es Salaam');
  const [jummuiya, setJummuiya] = useState('');
  const [dateJoined, setDateJoined] = useState(new Date().toISOString().split('T')[0]);

  const handleCreateFamily = async () => {
    try {
      const parishName = parishes.find(p => p.id === selectedParish)?.name || 'Unknown Parish';
      const familyData = {
        family_name: newFamilyName,
        parish: parishName,
        province: selectedProvince,
        jummuiya: jummuiya || undefined,
      };
      
      const newFamily = await createFamily(familyData);
      resetFamilyForm();
      setShowAddFamily(false);
      setSelectedFamily(newFamily);
      onFamilyCreated?.(newFamily);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to create family');
    }
  };

  const handleEditFamily = async (family: Family) => {
    setSelectedFamily(family);
    setShowEditFamily(true);
  };

  const handleUpdateFamily = async () => {
    if (!selectedFamily) return;
    
    try {
      const parishName = parishes.find(p => p.id === selectedParish)?.name || 'Unknown Parish';
      await updateFamily(selectedFamily.id, {
        family_name: newFamilyName,
        parish: parishName,
        province: selectedProvince,
        jummuiya: jummuiya || undefined,
      });
      
      setShowEditFamily(false);
      setSelectedFamily(null);
      resetFamilyForm();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to update family');
    }
  };

  const handleDeleteFamily = async (family: Family) => {
    if (confirm(`Are you sure you want to delete the ${family.family_name}? This will also remove all members associated with this family.`)) {
      try {
        await deleteFamily(family.id);
        if (selectedFamily?.id === family.id) {
          setSelectedFamily(null);
        }
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to delete family');
      }
    }
  };

  const handleAddNewMember = async (memberData: Omit<Member, 'id'>) => {
    if (!selectedFamily) return;
    
    try {
      // Remove the family_id placeholder and set the actual family_id
      const { family_id, ...memberDataWithoutFamilyId } = memberData;
      const memberWithFamilyId = {
        ...memberDataWithoutFamilyId,
        family_id: selectedFamily.id,
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
        await deleteMember(parseInt(memberId.replace('FM', '')));
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to remove member');
      }
    }
  };

  const resetFamilyForm = () => {
    setNewFamilyName('');
    setSelectedParish(1);
    setSelectedProvince('Dar es Salaam');
    setJummuiya('');
    setDateJoined(new Date().toISOString().split('T')[0]);
  };

  return {
    // Modal states
    showAddFamily,
    setShowAddFamily,
    showEditFamily,
    setShowEditFamily,
    showAddMember,
    setShowAddMember,
    selectedFamily,
    setSelectedFamily,
    
    // Form states
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
    
    // Handlers
    handleCreateFamily,
    handleEditFamily,
    handleUpdateFamily,
    handleDeleteFamily,
    handleAddNewMember,
    handleRemoveMember,
  };
};
