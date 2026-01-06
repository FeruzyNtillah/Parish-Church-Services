import { supabase } from '../lib/supabase';
import type { Profile } from '../types';

export const profilesService = {
  // Get all profiles
  async getAll(): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('full_name', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Get profile by ID
  async getById(id: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return data;
  },

  // Get current user's profile
  async getCurrentUser(): Promise<Profile | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    return this.getById(user.id);
  },

  // Create a new profile
  async create(profile: Omit<Profile, 'id'>): Promise<Profile> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        ...profile,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update a profile
  async update(id: string, updates: Partial<Omit<Profile, 'id'>>): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete a profile
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Get profiles by role
  async getByRole(role: string): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', role)
      .order('full_name', { ascending: true });

    if (error) throw error;
    return data || [];
  },
};

