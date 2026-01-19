import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon,
  Plus,
  Search,
  Clock,
  MapPin,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useEvents } from '../hooks';
import EventManagementModal from '../components/events/EventManagementModal';
import type { Event } from '../types';

const Events = () => {
  const [selectedParish, setSelectedParish] = useState(1);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 12;

  const parishes = [
    { id: 1, name: "Parokia ya Bikira Maria Mama wa Rozari Takatifu - Makongo Juu" },
    { id: 2, name: "Parokia ya Mt. Petro - Oysterbay" },
    { id: 3, name: "Parokia ya Mt. Martin wa Porres - Mwananyamala" },
    { id: 4, name: "Parokia ya Mt. Anna - Hananasif" },
    { id: 5, name: "Parokia ya Mt. Kolbe - Kijitonyama" },
    { id: 6, name: "Parokia ya Mt. Martha - Mikocheni" },
    { id: 7, name: "Parokia ya Bikira Maria Mama wa Huruma - Mbezi Beach (Mt. Gaspar)" },
    { id: 8, name: "Parokia ya Mt. Michael - Kawe" },
    { id: 9, name: "Parokia ya Bikira Maria Mama wa Mwokozi - Sinza" },
    { id: 10, name: "Parokia ya Mt. Petro - Chuo Kikuu (St. Augustine)" }
  ];

  const selectedParishName = parishes.find(p => p.id === selectedParish)?.name;
  const { events, loading, error, createEvent, updateEvent, deleteEvent } = useEvents(selectedParishName);

  const eventTypes = ['All', 'Morning Mass', 'Evening Mass', 'Special Mass', 'Service', 'Bible Study', 'Youth Fellowship', 'Prayer Meeting', 'Community Event', 'Other'];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || event.type === selectedType;
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + eventsPerPage);

  const handleAddEvent = () => {
    setEditingEvent(null);
    setShowEventModal(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setShowEventModal(true);
  };

  const handleSaveEvent = async (eventData: any) => {
    try {
      if (editingEvent) {
        await updateEvent(editingEvent.id, eventData);
      } else {
        await createEvent(eventData);
      }
      setShowEventModal(false);
      setEditingEvent(null);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to save event');
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(eventId);
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to delete event');
      }
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Morning Mass': 'bg-blue-100 text-blue-800',
      'Evening Mass': 'bg-purple-100 text-purple-800',
      'Special Mass': 'bg-yellow-100 text-yellow-800',
      'Service': 'bg-green-100 text-green-800',
      'Bible Study': 'bg-indigo-100 text-indigo-800',
      'Youth Fellowship': 'bg-pink-100 text-pink-800',
      'Prayer Meeting': 'bg-orange-100 text-orange-800',
      'Community Event': 'bg-teal-100 text-teal-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-foreground">
          Church Events
        </h1>
        
        <div className="flex gap-3">
          <button
            onClick={handleAddEvent}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Event
          </button>
          
          <div className="relative">
            <select
              value={selectedParish}
              onChange={(e) => setSelectedParish(Number(e.target.value))}
              className="px-4 py-2 pr-10 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-foreground"
              aria-label="Select parish"
            >
              {parishes.map((parish) => (
                <option key={parish.id} value={parish.id}>
                  {parish.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card p-4 rounded-lg shadow-sm border border-border mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
          
          {/* Type Filter */}
          <div className="lg:w-48">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {eventTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
          <span className="ml-2 text-muted-foreground">Loading events...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
          <p className="font-medium">Error loading events</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Events Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {paginatedEvents.map((event) => (
            <div key={event.id} className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
              {/* Event Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{event.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                    {event.date && (
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        {formatDate(event.date)}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditEvent(event)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit event"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-2 text-sm">
                {event.time && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {event.time}
                  </div>
                )}
                {event.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                )}
                {event.description && (
                  <p className="text-foreground line-clamp-2">{event.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No events found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? 'Try adjusting your search terms' : 'Get started by adding your first event'}
          </p>
          {!searchQuery && (
            <button
              onClick={handleAddEvent}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Your First Event
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + eventsPerPage, filteredEvents.length)} of {filteredEvents.length} events
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Event Management Modal */}
      <EventManagementModal
        isOpen={showEventModal}
        onClose={() => {
          setShowEventModal(false);
          setEditingEvent(null);
        }}
        onSave={handleSaveEvent}
        initialData={editingEvent || undefined}
        parishName={selectedParishName}
      />
    </div>
  );
};

export default Events;
