import { useState } from 'react';
import { ArrowUpDown, Calendar, MapPin, Clock, Tag } from 'lucide-react';
import { eventsData } from '../data';
import type { Event } from '../types';

type SortKey = keyof Event;

const Events = () => {
  // State for sorting
  const [orderBy, setOrderBy] = useState<SortKey>('date');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (property: SortKey) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Sort function
  const sortedEvents = [...eventsData].sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    
    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });

  // Get status styles
  const getStatusStyles = (status: Event['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'Upcoming':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Planned':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Church Events</h1>
        <p className="text-muted-foreground">
          Upcoming and past events at our church.
        </p>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Head */}
            <thead className="bg-emerald-500 dark:bg-emerald-600 border-b border-emerald-600 dark:border-emerald-500">
              <tr>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('title')}
                    className="flex items-center gap-2 font-semibold text-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Event Title
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('date')}
                    className="flex items-center gap-2 font-semibold text-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Date
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('time')}
                    className="flex items-center gap-2 font-semibold text-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    <Clock className="w-4 h-4" />
                    Time
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('location')}
                    className="flex items-center gap-2 font-semibold text-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    Location
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('type')}
                    className="flex items-center gap-2 font-semibold text-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    <Tag className="w-4 h-4" />
                    Event Type
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('status')}
                    className="flex items-center gap-2 font-semibold text-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    Status
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-border">
              {sortedEvents.map((event) => (
                <tr 
                  key={event.id} 
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-medium text-foreground">
                      {event.title}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {event.date}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {event.time}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {event.location}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {event.type}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(
                        event.status
                      )}`}
                    >
                      {event.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {eventsData.filter(e => e.status === 'Upcoming').length}
          </div>
          <div className="text-sm text-muted-foreground">Upcoming Events</div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {eventsData.filter(e => e.status === 'Scheduled').length}
          </div>
          <div className="text-sm text-muted-foreground">Scheduled Events</div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {eventsData.filter(e => e.status === 'Planned').length}
          </div>
          <div className="text-sm text-muted-foreground">Planned Events</div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
            {eventsData.filter(e => e.status === 'Completed').length}
          </div>
          <div className="text-sm text-muted-foreground">Completed Events</div>
        </div>
      </div>
    </div>
  );
};

export default Events;
