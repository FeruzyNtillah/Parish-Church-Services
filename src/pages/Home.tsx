import React, { useState } from 'react';
import { 
  Users as FamilyIcon,
  User as MaleIcon,
  UserPlus as FemaleIcon,
  Baby as ChildIcon,
  Volume2 as AnnouncementIcon,
  Calendar as CalendarIcon,
  Church,
  ChevronDown,
  Edit2,
  Save,
  X,
  Clock,
  MapPin
} from 'lucide-react';
import { useMembers, useEvents } from '../hooks';

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

const Home = () => {
  const [selectedParish, setSelectedParish] = useState(parishes[0].id);
  const selectedParishName = parishes.find(p => p.id === selectedParish)?.name;
  const { loading: membersLoading, error: membersError, stats } = useMembers(selectedParishName);
  const { events, loading: eventsLoading } = useEvents(selectedParishName);
  
  // State for editable announcements
  const [isEditingAnnouncements, setIsEditingAnnouncements] = useState(false);
  const [announcements, setAnnouncements] = useState([
    "Next baptism ceremony - July 15th",
    "Guest speaker this Sunday - Pastor John",
    "Building fund collection ongoing"
  ]);
  const [tempAnnouncements, setTempAnnouncements] = useState([...announcements]);

  const handleParishChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedParish(Number(event.target.value));
  };

  // Announcement editing functions
  const handleEditAnnouncements = () => {
    setTempAnnouncements([...announcements]);
    setIsEditingAnnouncements(true);
  };

  const handleSaveAnnouncements = () => {
    setAnnouncements([...tempAnnouncements]);
    setIsEditingAnnouncements(false);
    // TODO: Save to backend/database
  };

  const handleCancelEditAnnouncements = () => {
    setTempAnnouncements([...announcements]);
    setIsEditingAnnouncements(false);
  };

  const handleAnnouncementChange = (index: number, value: string) => {
    const updated = [...tempAnnouncements];
    updated[index] = value;
    setTempAnnouncements(updated);
  };

  const statsData = [
    { title: 'Total Members', value: stats.totalMembers.toString(), icon: <FamilyIcon className="w-6 h-6" />, color: 'emerald' },
    { title: 'Male Members', value: stats.maleMembers.toString(), icon: <MaleIcon className="w-6 h-6" />, color: 'blue' },
    { title: 'Female Members', value: stats.femaleMembers.toString(), icon: <FemaleIcon className="w-6 h-6" />, color: 'purple' },
    { title: 'Children', value: stats.children.toString(), icon: <ChildIcon className="w-6 h-6" />, color: 'green' },
  ];

  const activities = {
    announcements: announcements,
    events: events.slice(0, 3), // Show first 3 events
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; border: string; light: string }> = {
      emerald: { bg: 'bg-emerald-500', text: 'text-emerald-600', border: 'border-emerald-500', light: 'bg-emerald-50' },
      blue: { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-500', light: 'bg-blue-50' },
      purple: { bg: 'bg-purple-500', text: 'text-purple-600', border: 'border-purple-500', light: 'bg-purple-50' },
      green: { bg: 'bg-green-500', text: 'text-green-600', border: 'border-green-500', light: 'bg-green-50' },
    };
    return colorMap[color] || colorMap.emerald;
  };

  return (
    <div className="flex-1 p-6 bg-background h-full overflow-auto">
      {/* Header with Parish Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-foreground">
          Parish Dashboard
        </h1>
        
        <div className="relative">
          <select
            value={selectedParish}
            onChange={handleParishChange}
            className="min-w-55 px-4 py-2 pr-10 bg-emerald-500 border border-border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-foreground dark:text-slate-100 parish-select"
            aria-label="Select parish"
          >
            {parishes.map((parish) => (
              <option key={parish.id} value={parish.id} className="dark:bg-slate-900 dark:text-slate-100">
                {parish.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Church className="w-4 h-4" />
          <span>Showing analytics for: <strong>{selectedParishName}</strong></span>
        </div>
      </div>
      
      {membersLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card border-l-4 border-emerald-500 shadow-sm rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : membersError ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
          <p className="font-medium">Error loading member statistics</p>
          <p className="text-sm mt-1">{membersError}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {statsData.map((stat, index) => {
            const colors = getColorClasses(stat.color);
            return (
              <div key={index} className={`bg-card border-l-4 ${colors.border} shadow-sm rounded-lg p-6 transition-transform hover:scale-[1.02]`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {stat.title}
                    </p>
                    <p className={`text-2xl font-bold ${colors.text}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${colors.light} ${colors.text}`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Parish-Specific Content */}
      <div className="flex items-center gap-2 mb-4">
        <Church className="w-5 h-5 text-emerald-600" />
        <h2 className="text-xl font-semibold text-foreground">
          {parishes.find(p => p.id === selectedParish)?.name} Activities
        </h2>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Announcements Section */}
        <div className="lg:col-span-2">
          <div className="bg-card shadow-sm rounded-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <AnnouncementIcon className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-semibold text-foreground">
                  Church Announcements
                </h3>
              </div>
              {!isEditingAnnouncements ? (
                <button
                  onClick={handleEditAnnouncements}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                  title="Edit announcements"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveAnnouncements}
                    className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                    title="Save announcements"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCancelEditAnnouncements}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    title="Cancel editing"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex flex-col gap-4 mb-8">
              {(isEditingAnnouncements ? tempAnnouncements : activities.announcements).map((text, index) => (
                <div key={index} className="flex items-center gap-3">
                  <AnnouncementIcon className="w-4 h-4 text-emerald-500 shrink-0" />
                  {isEditingAnnouncements ? (
                    <input
                      type="text"
                      value={text}
                      onChange={(e) => handleAnnouncementChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="Enter announcement"
                    />
                  ) : (
                    <p className="text-sm text-foreground">{text}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Enhanced Announcements Section */}
            <div className="mt-8">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AnnouncementIcon className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-xl font-bold text-emerald-800">
                    Community Updates
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activities.announcements.map((text, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
                      <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <AnnouncementIcon className="w-5 h-5 text-emerald-600" />
                      </div>
                      <p className="text-gray-700 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div> {/* This closing div was missing - closes the main announcements card */}
        </div>

        {/* Enhanced Events Section */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg rounded-xl overflow-hidden">
            <div className="bg-emerald-600 p-4 border-b border-emerald-700">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-emerald-100" />
                <h3 className="text-lg font-semibold text-white">
                  Upcoming Events
                </h3>
              </div>
            </div>
            
            <div className="bg-white p-4">
              {eventsLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 border-b border-gray-200 animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {activities.events.map((event) => (
                    <div
                      key={event.id}
                      className="group p-4 border-b border-gray-100 hover:bg-emerald-50 transition-colors cursor-pointer rounded-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-emerald-700 group-hover:text-emerald-800 transition-colors">
                            {event.title}
                          </h4>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                              <CalendarIcon className="w-3 h-3" />
                              {formatDate(event.date)}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                              <Clock className="w-3 h-3" />
                              {event.time}
                            </span>
                            {event.location && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                                <MapPin className="w-3 h-3" />
                                {event.location}
                              </span>
                            )}
                          </div>
                          {event.description && (
                            <p className="text-gray-600 text-sm mt-2 line-clamp-2">{event.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div> {/* This closes the main grid div */}
    </div> /* This closes the main container div */
  );
};

export default Home;