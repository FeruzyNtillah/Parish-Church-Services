import { supabase } from '../lib/supabase';
import type { Member, MemberWithFamily } from '../types';

export const membersService = {
  // Get all members
  async getAll(): Promise<Member[]> {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get member by ID
  async getById(id: number): Promise<Member | null> {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return data;
  },

  // Get member with family
  async getWithFamily(id: number): Promise<MemberWithFamily | null> {
    const { data, error } = await supabase
      .from('members')
      .select(`
        *,
        family (*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return data as MemberWithFamily;
  },

  // Get members by family ID
  async getByFamilyId(familyId: number): Promise<Member[]> {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('family_id', familyId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Create a new member
  async create(member: Omit<Member, 'id' | 'created_at'>): Promise<Member> {
    const { data, error } = await supabase
      .from('members')
      .insert(member)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update a member
  async update(id: number, updates: Partial<Omit<Member, 'id' | 'created_at'>>): Promise<Member> {
    const { data, error } = await supabase
      .from('members')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete a member
  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Get members by parish
  async getByParish(parish: string): Promise<Member[]> {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('parish', parish)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get members by jummuiya
  async getByJummuiya(jummuiya: string): Promise<Member[]> {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('jummuiya', jummuiya)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },
};

