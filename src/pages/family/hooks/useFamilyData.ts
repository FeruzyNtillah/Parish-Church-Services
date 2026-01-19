import { useMemo, useState } from 'react';
import { familiesData as initialFamilies, familyMembersData as initialFamilyMembers, membersData } from '../../../data';
import type { Family, FamilyMember, Member } from '../../../types';

export const useFamilyData = () => {
  const [families, setFamilies] = useState<Family[]>(initialFamilies);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(initialFamilyMembers);
  const [members, setMembers] = useState<Member[]>(membersData);

  const membersById = useMemo(() => {
    const map = new Map<string, Member>();
    members.forEach((m) => map.set(m.id, m));
    return map;
  }, [members]);

  const getMemberCount = (familyId: string) => 
    familyMembers.filter((fm) => fm.familyId === familyId).length;

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

  const createFamily = (familyName: string) => {
    const trimmed = familyName.trim();
    if (!trimmed) throw new Error('Family name is required');
    if (families.some((f) => f.familyName.toLowerCase() === trimmed.toLowerCase())) {
      throw new Error('Family name must be unique');
    }
    
    const newFamily: Family = { 
      id: `FAM${Date.now()}`, 
      familyName: trimmed, 
      createdAt: new Date().toISOString().slice(0, 10) 
    };
    
    setFamilies((s) => [newFamily, ...s]);
    return newFamily;
  };

  const updateFamily = (familyId: string, familyName: string) => {
    const trimmed = familyName.trim();
    if (!trimmed) throw new Error('Family name is required');
    
    setFamilies((s) => s.map((x) => 
      x.id === familyId ? { ...x, familyName: trimmed } : x
    ));
  };

  const addFamilyMember = (familyId: string, memberId: string, role: string) => {
    if (familyMembers.some((fm) => fm.familyId === familyId && fm.memberId === memberId)) {
      throw new Error('Member already in this family');
    }
    if (familyMembers.some((fm) => fm.memberId === memberId)) {
      throw new Error('Member already belongs to a family');
    }
    
    const newFamilyMember: FamilyMember = {
      id: `FM${Date.now()}`,
      familyId,
      memberId,
      role,
      addedAt: new Date().toISOString().slice(0, 10),
    };
    
    setFamilyMembers((s) => [newFamilyMember, ...s]);
  };

  const removeFamilyMember = (familyMemberId: string) => {
    setFamilyMembers((s) => s.filter((fm) => fm.id !== familyMemberId));
  };

  const createMember = (memberData: Omit<Member, 'id'>) => {
    const newMember: Member = {
      id: `MBR${Date.now()}`,
      ...memberData
    };
    
    setMembers((s) => [newMember, ...s]);
    return newMember;
  };

  const addNewFamilyMember = (familyId: string, memberData: Omit<Member, 'id'>, role: string) => {
    // Create the new member first
    const newMember = createMember(memberData);
    
    // Then add them to the family
    const newFamilyMember: FamilyMember = {
      id: `FM${Date.now()}`,
      familyId,
      memberId: newMember.id,
      role,
      addedAt: new Date().toISOString().slice(0, 10),
    };
    
    setFamilyMembers((s) => [newFamilyMember, ...s]);
    return newFamilyMember;
  };

  const membersNotAssigned = useMemo(() => {
    const assigned = new Set(familyMembers.map((fm) => fm.memberId));
    return members.filter((m) => !assigned.has(m.id));
  }, [familyMembers, members]);

  return {
    families,
    familyMembers,
    members,
    membersById,
    membersNotAssigned,
    statistics,
    getMemberCount,
    createFamily,
    updateFamily,
    addFamilyMember,
    addNewFamilyMember,
    removeFamilyMember,
    setFamilies,
    setFamilyMembers
  };
};
