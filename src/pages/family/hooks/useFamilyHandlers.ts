import { useState } from 'react';
import type { Family, Member } from '../../../types';

interface UseFamilyHandlersProps {
  createFamily: (data: any) => Promise<Family>;
  updateFamily: (id: number, data: any) => Promise<void>;
  createMember: (data: Omit<Member, 'id'>) => Promise<Member>;
  deleteMember: (id: number) => Promise<void>;
  onFamilyCreated?: (family: Family) => void;
}

export const useFamilyHandlers = ({
  createFamily,
  updateFamily,
  createMember,
  deleteMember,
  onFamilyCreated,
}: UseFamilyHandlersProps) => {
  const [showAddFamily, setShowAddFamily] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
  
  const [newFamilyName, setNewFamilyName] = useState('');
  const [selectedParish, setSelectedParish] = useState(1);
  const [selectedProvince, setSelectedProvince] = useState('Dar es Salaam');
  const [jummuiya, setJummuiya] = useState('');
  const [dateJoined, setDateJoined] = useState(new Date().toISOString().split('T')[0]);

  const handleCreateFamily = async () => {
    try {
      const familyData = {
        family_name: newFamilyName,
        parish: selectedParish === 1 ? 'St. Mary' : 'Other Parish',
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
    handleAddNewMember,
    handleRemoveMember,
  };
};
