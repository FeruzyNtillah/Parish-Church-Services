import { useState, useEffect, useCallback } from 'react';
import { membersService } from '../services/members';
import type { Member } from '../types';

export const useMembers = (parishFilter?: string) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await membersService.getAll();
      
      // Filter by parish if provided
      const filteredMembers = parishFilter 
        ? data.filter(member => member.parish === parishFilter)
        : data;
      
      setMembers(filteredMembers);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to load members');
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [parishFilter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const getMemberStats = useCallback(() => {
    const totalMembers = members.length;
    const maleMembers = members.filter(m => m.gender === 'Male').length;
    const femaleMembers = members.filter(m => m.gender === 'Female').length;
    
    // Estimate children based on age (if date_of_birth is available)
    const children = members.filter(m => {
      if (!m.date_of_birth) return false;
      const birthYear = new Date(m.date_of_birth).getFullYear();
      const currentYear = new Date().getFullYear();
      return currentYear - birthYear < 15;  // Under 15 years old
    }).length;

    return {
      totalMembers,
      maleMembers,
      femaleMembers,
      children,
    };
  }, [members]);

  return {
    members,
    loading,
    error,
    stats: getMemberStats(),
    refresh: loadData,
  };
};
