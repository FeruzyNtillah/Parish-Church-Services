import React, { useState } from 'react';
import { 
  Users as FamilyIcon,
  User as MaleIcon,
  UserPlus as FemaleIcon,
  Baby as ChildIcon,
  Volume2 as AnnouncementIcon,
  Calendar as CalendarIcon,
  TrendingUp as GrowthIcon,
  Church,
  ChevronDown
} from 'lucide-react';
import ProgressCircle from '../components/ProgressCircle';

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

  const handleParishChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedParish(Number(event.target.value));
  };

  const stats = [
    { title: 'Total Members', value: '1,250', icon: <FamilyIcon className="w-6 h-6" />, color: 'emerald' },
    { title: 'Male Members', value: '210', icon: <MaleIcon className="w-6 h-6" />, color: 'blue' },
    { title: 'Female Members', value: '280', icon: <FemaleIcon className="w-6 h-6" />, color: 'purple' },
    { title: 'Children', value: '52', icon: <ChildIcon className="w-6 h-6" />, color: 'green' },
  ];

  const activities = {
    announcements: [
      "Next baptism ceremony - July 15th",
      "Guest speaker this Sunday - Pastor John",
      "Building fund collection ongoing"
    ],
    events: [
      { id: 1, title: "Sunday Service", date: "2023-06-25", time: "10:00 AM" },
      { id: 2, title: "Bible Study", date: "2023-06-28", time: "7:00 PM" },
      { id: 3, title: "Youth Fellowship", date: "2023-07-01", time: "4:00 PM" }
    ],
    metrics: [
      { title: "Attendance", value: 82, description: "Weekly Average" },
      { title: "Giving", value: 65, description: "Monthly Target" },
      { title: "Volunteering", value: 45, description: "Participation" }
    ]
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
            className="min-w-55 px-4 py-2 pr-10 bg-card border border-border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            aria-label="Select parish"
          >
            {parishes.map((parish) => (
              <option key={parish.id} value={parish.id}>
                {parish.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => {
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
            <div className="flex items-center gap-2 mb-5">
              <AnnouncementIcon className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-semibold text-foreground">
                Church Announcements
              </h3>
            </div>
            
            <div className="flex flex-col gap-4 mb-8">
              {activities.announcements.map((text, index) => (
                <div key={index} className="flex items-center gap-3">
                  <AnnouncementIcon className="w-4 h-4 text-emerald-500 shrink-0" />
                  <p className="text-sm text-foreground">{text}</p>
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-5">
                <GrowthIcon className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-semibold text-foreground">
                  Monthly Growth
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {activities.metrics.map((metric, index) => (
                  <div key={index} className="bg-card border border-border rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      {metric.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {metric.value}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Events Section */}
        <div className="lg:col-span-1">
          <div className="bg-card shadow-sm rounded-lg overflow-hidden">
            <div className="bg-emerald-100 dark:bg-emerald-950 p-4 border-b border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-semibold text-foreground">
                  Upcoming Events
                </h3>
              </div>
            </div>
            
            <div>
              {activities.events.map((event) => (
                <div
                  key={event.id}
                  className="p-4 border-b border-border hover:bg-muted transition-colors cursor-pointer"
                >
                  <p className="font-semibold text-emerald-600">
                    {event.title}
                  </p>
                  <div className="flex justify-between mt-1">
                    <p className="text-sm text-muted-foreground">
                      {formatDate(event.date)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Metrics */}
        {activities.metrics.map((metric, index) => (
          <div key={index} className="bg-card shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {metric.title} Progress
            </h3>
            <div className="flex flex-col items-center">
              <ProgressCircle size={100} progress={metric.value / 100} />
              <p className="text-lg font-semibold text-emerald-600 mt-2">
                {metric.value}% {metric.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
