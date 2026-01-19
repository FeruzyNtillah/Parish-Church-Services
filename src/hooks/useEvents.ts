import { useState, useEffect, useCallback } from 'react';
import { eventsService } from '../services/events';
import type { Event } from '../types';

export const useEvents = (parishFilter?: string) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = parishFilter 
        ? await eventsService.getByParish(parishFilter)
        : await eventsService.getAll();
      
      setEvents(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to load events');
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [parishFilter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const createEvent = useCallback(async (eventData: Omit<Event, 'id' | 'created_at'>) => {
    try {
      const newEvent = await eventsService.create(eventData);
      setEvents(prev => [newEvent, ...prev]);
      return newEvent;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create event');
      setError(error.message);
      throw error;
    }
  }, []);

  const updateEvent = useCallback(async (id: string, updates: Partial<Event>) => {
    try {
      const updatedEvent = await eventsService.update(id, updates);
      setEvents(prev => prev.map(event => 
        event.id === id ? updatedEvent : event
      ));
      return updatedEvent;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update event');
      setError(error.message);
      throw error;
    }
  }, []);

  const deleteEvent = useCallback(async (id: string) => {
    try {
      await eventsService.delete(id);
      setEvents(prev => prev.filter(event => event.id !== id));
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete event');
      setError(error.message);
      throw error;
    }
  }, []);

  return {
    events,
    loading,
    error,
    refresh: loadData,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};
