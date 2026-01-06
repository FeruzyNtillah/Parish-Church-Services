import { supabase } from '../lib/supabase';
import type { Family, FamilyWithMembers } from '../types';

export const familiesService = {
  // Get all families
  async getAll(): Promise<Family[]> {
    const { data, error } = await supabase
      .from('families')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get family by ID
  async getById(id: number): Promise<Family | null> {
    const { data, error } = await supabase
      .from('families')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return data;
  },

  // Get family with members
  async getWithMembers(id: number): Promise<FamilyWithMembers | null> {
    const { data, error } = await supabase
      .from('families')
      .select(`
        *,
        members (*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return data as FamilyWithMembers;
  },

  // Create a new family
  async create(family: Omit<Family, 'id' | 'created_at'>): Promise<Family> {
    const { data, error } = await supabase
      .from('families')
      .insert(family)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update a family
  async update(id: number, updates: Partial<Omit<Family, 'id' | 'created_at'>>): Promise<Family> {
    const { data, error } = await supabase
      .from('families')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete a family
  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('families')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Get families by parish
  async getByParish(parish: string): Promise<Family[]> {
    const { data, error } = await supabase
      .from('families')
      .select('*')
      .eq('parish', parish)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get families by jummuiya
  async getByJummuiya(jummuiya: string): Promise<Family[]> {
    const { data, error } = await supabase
      .from('families')
      .select('*')
      .eq('jummuiya', jummuiya)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },
};

