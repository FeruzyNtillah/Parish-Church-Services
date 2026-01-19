import React, { useState } from 'react';
import { X, Calendar, Save } from 'lucide-react';
import type { Event } from '../../types';

interface EventManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventData: Omit<Event, 'id' | 'created_at'>) => void;
  initialData?: Partial<Event>;
  parishName?: string;
}

const EventManagementModal: React.FC<EventManagementModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  parishName
}) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: parishName ? `${parishName} Church` : '',
    type: 'Service',
    status: 'Upcoming' as Event['status'],
    description: '',
    ...initialData
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!formData.title || !formData.date || !formData.time) {
      alert('Title, date, and time are required');
      return;
    }

    const eventData = {
      ...formData,
      parish: parishName || 'Unknown Parish'
    };

    onSave(eventData);
    onClose();
    
    // Reset form
    setFormData({
      title: '',
      date: '',
      time: '',
      location: parishName ? `${parishName} Church` : '',
      type: 'Service',
      status: 'Upcoming',
      description: ''
    });
  };

  const eventTypes = [
    'Morning Mass',
    'Evening Mass', 
    'Special Mass',
    'Service',
    'Bible Study',
    'Youth Fellowship',
    'Prayer Meeting',
    'Community Event',
    'Other'
  ];

  return (
    <>
      {/* Modal backdrop */}
      <div className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="fixed inset-0 flex items-center justify-center z-60 p-4">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {initialData?.id ? 'Edit Event' : 'Add New Event'}
              </h4>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label="Close event modal" title="Close">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="md:col-span-2">
              <label htmlFor="event-title" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Event Title *</label>
              <input
                id="event-title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter event title"
                required
              />
            </div>

            {/* Date */}
            <div>
              <label htmlFor="event-date" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Date *</label>
              <input
                id="event-date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                required
              />
            </div>

            {/* Time */}
            <div>
              <label htmlFor="event-time" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Time *</label>
              <input
                id="event-time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                required
              />
            </div>

            {/* Type */}
            <div>
              <label htmlFor="event-type" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Event Type</label>
              <select
                id="event-type"
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              >
                {eventTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <label htmlFor="event-location" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
              <input
                id="event-location"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter event location"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="event-description" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <textarea
                id="event-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                placeholder="Enter event description (optional)"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button 
              onClick={onClose} 
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {initialData?.id ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventManagementModal;
