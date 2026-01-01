import { Play, Calendar, User, Users } from 'lucide-react';

interface Sermon {
  id: number;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  category: string;
  attendees: number;
  thumbnail: string;
}

const Sermons = () => {
  const sermons: Sermon[] = [
    {
      id: 1,
      title: 'The Power of Faith',
      speaker: 'Pastor John Smith',
      date: '2023-06-15',
      duration: '45:22',
      category: 'Inspiration',
      attendees: 125,
      thumbnail: '/sermon1.jpg',
    },
    {
      id: 2,
      title: 'Finding Peace in Troubled Times',
      speaker: 'Reverend Sarah Johnson',
      date: '2023-06-08',
      duration: '38:15',
      category: 'Comfort',
      attendees: 98,
      thumbnail: '/sermon2.jpg',
    },
    {
      id: 3,
      title: 'The Prodigal Son Revisited',
      speaker: 'Pastor Michael Brown',
      date: '2023-06-01',
      duration: '52:40',
      category: 'Teaching',
      attendees: 142,
      thumbnail: '/sermon3.jpg',
    },
    {
      id: 4,
      title: 'Building Strong Communities',
      speaker: 'Deacon Emily Wilson',
      date: '2023-05-25',
      duration: '41:05',
      category: 'Community',
      attendees: 87,
      thumbnail: '/sermon4.jpg',
    },
  ];

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      Inspiration: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      Comfort: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      Teaching: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      Community: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Sermons</h1>
          <p className="text-lg text-muted-foreground">
            Browse our collection of spiritual teachings and messages
          </p>
        </div>

        {/* Recent Sermons Section */}
        <div className="mb-8">
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Recent Sermons</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                      Title
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                      Speaker
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                      Duration
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                      Category
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground">
                      Attendees
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sermons.map((sermon) => (
                    <tr
                      key={sermon.id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center shrink-0">
                            <Play className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <span className="font-medium text-foreground">{sermon.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-foreground">
                          <User className="w-4 h-4 text-muted-foreground" />
                          {sermon.speaker}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-foreground">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          {formatDate(sermon.date)}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-foreground">{sermon.duration}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                            sermon.category
                          )}`}
                        >
                          {sermon.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right text-foreground">{sermon.attendees}</td>
                      <td className="py-4 px-4 text-center">
                        <button className="inline-flex items-center gap-2 px-3 py-1 rounded border border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors text-sm font-medium">
                          <Play className="w-4 h-4" />
                          Listen
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Most Popular Sermons Section */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Most Popular Sermons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sermons.slice(0, 3).map((sermon) => (
              <div
                key={sermon.id}
                className="bg-card rounded-lg shadow-sm border border-border p-5 hover:shadow-md transition-shadow"
              >
                <div className="w-full h-32 rounded bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mb-4">
                  <Play className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                  {sermon.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{sermon.speaker}</p>
                <div className="flex gap-2 flex-wrap">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${getCategoryColor(
                      sermon.category
                    )}`}
                  >
                    {sermon.category}
                  </span>
                  <span className="inline-block px-2 py-1 rounded bg-muted text-muted-foreground text-xs font-medium">
                    <Users className="w-3 h-3 inline mr-1" />
                    {sermon.attendees}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sermons;
