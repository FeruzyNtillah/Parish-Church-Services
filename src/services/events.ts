import { supabase } from '../lib/supabase';
import type { Event } from '../types';

export const eventsService = {
  // Get all events
  async getAll(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Get event by ID
  async getById(id: string): Promise<Event | null> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return data;
  },

  // Get events by parish
  async getByParish(parish: string): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('parish', parish)
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Get events by date range
  async getByDateRange(startDate: string, endDate: string): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Create a new event
  async create(event: Omit<Event, 'id' | 'created_at'>): Promise<Event> {
    const { data, error } = await supabase
      .from('events')
      .insert(event)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update an event
  async update(id: string, updates: Partial<Omit<Event, 'id' | 'created_at'>>): Promise<Event> {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete an event
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Get upcoming events (from today onwards)
  async getUpcoming(parish?: string): Promise<Event[]> {
    const today = new Date().toISOString().split('T')[0];
    
    let query = supabase
      .from('events')
      .select('*')
      .gte('date', today)
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (parish) {
      query = query.eq('parish', parish);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  // Get mass events specifically
  async getMassEvents(parish?: string): Promise<Event[]> {
    let query = supabase
      .from('events')
      .select('*')
      .in('type', ['Morning Mass', 'Evening Mass', 'Special Mass'])
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (parish) {
      query = query.eq('parish', parish);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }
};
