import { useState, useEffect, useCallback } from 'react';
import { familiesService, membersService } from '../services';
import type { Family, Member, FamilyWithMembers } from '../types';

export const useFamilies = () => {
  const [families, setFamilies] = useState<Family[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load all families and members
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [familiesData, membersData] = await Promise.all([
        familiesService.getAll(),
        membersService.getAll(),
      ]);
      setFamilies(familiesData);
      setMembers(membersData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load data'));
      console.error('Error loading families and members:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Get members for a specific family
  const getFamilyMembers = useCallback(
    (familyId: number): Member[] => {
      return members.filter((m) => m.family_id === familyId);
    },
    [members]
  );

  // Get family with members
  const getFamilyWithMembers = useCallback(
    async (familyId: number): Promise<FamilyWithMembers | null> => {
      try {
        return await familiesService.getWithMembers(familyId);
      } catch (err) {
        console.error('Error loading family with members:', err);
        return null;
      }
    },
    []
  );

  // Statistics
  const statistics = {
    totalFamilies: families.length,
    totalMembers: members.length,
    avgMembersPerFamily: families.length > 0 
      ? (members.length / families.length).toFixed(1) 
      : '0',
    recentFamilies: families.filter((f) => {
      const createdDate = new Date(f.created_at);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return createdDate >= thirtyDaysAgo;
    }).length,
  };

  // Create a new family
  const createFamily = useCallback(
    async (familyData: Omit<Family, 'id' | 'created_at'>): Promise<Family> => {
      try {
        const newFamily = await familiesService.create(familyData);
        setFamilies((prev) => [newFamily, ...prev]);
        return newFamily;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to create family');
        setError(error);
        throw error;
      }
    },
    []
  );

  // Update a family
  const updateFamily = useCallback(
    async (id: number, updates: Partial<Omit<Family, 'id' | 'created_at'>>): Promise<void> => {
      try {
        const updated = await familiesService.update(id, updates);
        setFamilies((prev) => prev.map((f) => (f.id === id ? updated : f)));
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to update family');
        setError(error);
        throw error;
      }
    },
    []
  );

  // Delete a family
  const deleteFamily = useCallback(
    async (id: number): Promise<void> => {
      try {
        await familiesService.delete(id);
        setFamilies((prev) => prev.filter((f) => f.id !== id));
        // Also remove members associated with this family
        setMembers((prev) => prev.filter((m) => m.family_id !== id));
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to delete family');
        setError(error);
        throw error;
      }
    },
    []
  );

  // Create a new member
  const createMember = useCallback(
    async (memberData: Omit<Member, 'id' | 'created_at'>): Promise<Member> => {
      try {
        const newMember = await membersService.create(memberData);
        setMembers((prev) => [newMember, ...prev]);
        return newMember;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to create member');
        setError(error);
        throw error;
      }
    },
    []
  );

  // Update a member
  const updateMember = useCallback(
    async (id: number, updates: Partial<Omit<Member, 'id' | 'created_at'>>): Promise<void> => {
      try {
        const updated = await membersService.update(id, updates);
        setMembers((prev) => prev.map((m) => (m.id === id ? updated : m)));
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to update member');
        setError(error);
        throw error;
      }
    },
    []
  );

  // Delete a member
  const deleteMember = useCallback(
    async (id: number): Promise<void> => {
      try {
        await membersService.delete(id);
        setMembers((prev) => prev.filter((m) => m.id !== id));
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to delete member');
        setError(error);
        throw error;
      }
    },
    []
  );

  return {
    families,
    members,
    loading,
    error,
    statistics,
    getFamilyMembers,
    getFamilyWithMembers,
    createFamily,
    updateFamily,
    deleteFamily,
    createMember,
    updateMember,
    deleteMember,
    refresh: loadData,
  };
};

