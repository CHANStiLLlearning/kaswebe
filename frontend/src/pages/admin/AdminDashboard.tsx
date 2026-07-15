import { useState, useEffect } from 'react';
import { Newspaper, Mail, Users, Clock, Calendar as CalendarIcon, Filter, GraduationCap } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { API_BASE_URL } from '../../config';

type DataItem = { createdAt: string };

const AdminDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [filterMode, setFilterMode] = useState('all'); // all, today, month, year, custom
  const [selectedDate, setSelectedDate] = useState('');
  
  const [rawData, setRawData] = useState({
    news: [] as DataItem[],
    events: [] as DataItem[],
    contacts: [] as DataItem[],
    subscribers: [] as DataItem[],
    teachers: [] as DataItem[]
  });
  
  const [loading, setLoading] = useState(true);

  // Real-time clock effect
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch data effect
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [newsRes, eventsRes, contactsRes, subsRes, teachersRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/news`),
          fetch(`${API_BASE_URL}/api/events`),
          fetch(`${API_BASE_URL}/api/contact`),
          fetch(`${API_BASE_URL}/api/subscribe`),
          fetch(`${API_BASE_URL}/api/teachers?limit=1000`)
        ]);
        
        const news = await newsRes.json();
        const events = await eventsRes.json();
        const contacts = await contactsRes.json();
        const subs = await subsRes.json();
        const teachers = await teachersRes.json();

        setRawData({ 
          news: news.data || [], 
          events: events.data || [], 
          contacts, 
          subscribers: subs,
          teachers: teachers.data || []
        });
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Filter function
  const filterByDate = (items: DataItem[]) => {
    if (filterMode === 'all') return items;
    
    const now = new Date();
    return items.filter(item => {
      if (!item.createdAt) return false;
      const itemDate = new Date(item.createdAt);
      if (filterMode === 'today') {
        return itemDate.toDateString() === now.toDateString();
      }
      if (filterMode === 'month') {
        return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
      }
      if (filterMode === 'year') {
        return itemDate.getFullYear() === now.getFullYear();
      }
      if (filterMode === 'custom' && selectedDate) {
        const yyyy = itemDate.getFullYear();
        const mm = String(itemDate.getMonth() + 1).padStart(2, '0');
        const dd = String(itemDate.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}` === selectedDate;
      }
      return true;
    });
  };

  const filteredStats = {
    news: filterByDate(rawData.news).length,
    events: filterByDate(rawData.events).length,
    contacts: filterByDate(rawData.contacts).length,
    subscribers: filterByDate(rawData.subscribers).length,
    teachers: filterByDate(rawData.teachers).length,
  };

  const cards = [
    { title: 'News Articles', value: filteredStats.news, icon: <Newspaper className="w-8 h-8 text-blue-500" />, path: '/admin/news', bg: 'bg-blue-50' },
    { title: 'Events', value: filteredStats.events, icon: <CalendarIcon className="w-8 h-8 text-green-500" />, path: '/admin/events', bg: 'bg-green-50' },
    { title: 'Contact Messages', value: filteredStats.contacts, icon: <Mail className="w-8 h-8 text-purple-500" />, path: '/admin/contacts', bg: 'bg-purple-50' },
    { title: 'Subscribers', value: filteredStats.subscribers, icon: <Users className="w-8 h-8 text-orange-500" />, path: '/admin/subscribers', bg: 'bg-orange-50' },
    { title: 'Faculty Members', value: filteredStats.teachers, icon: <GraduationCap className="w-8 h-8 text-red-500" />, path: '/admin/faculty', bg: 'bg-red-50' },
  ];

  const chartData = [
    { name: 'News', count: filteredStats.news, color: '#3b82f6' },
    { name: 'Events', count: filteredStats.events, color: '#22c55e' },
    { name: 'Contacts', count: filteredStats.contacts, color: '#a855f7' },
    { name: 'Subs', count: filteredStats.subscribers, color: '#f97316' },
    { name: 'Faculty', count: filteredStats.teachers, color: '#ef4444' },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome to the Khmer America School Admin Panel.</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100 w-full md:flex md:flex-row md:items-center md:gap-4 md:w-auto">
          <div className="flex items-center gap-2 text-[#9A2220] font-semibold md:pr-4 md:border-r md:border-gray-200">
            <Clock className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
            <span className="text-xs md:text-sm">{currentTime.toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 font-medium md:pr-4 md:border-r md:border-gray-200">
            <CalendarIcon className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
            <span className="text-xs md:text-sm">{currentTime.toLocaleDateString()}</span>
          </div>
          <div className="col-span-2 md:col-span-1 flex items-center gap-1.5 md:gap-2 pt-2 md:pt-0 border-t border-gray-100 md:border-t-0">
            <Filter className="w-4 h-4 md:w-5 md:h-5 text-gray-400 shrink-0" />
            <select 
              value={filterMode}
              onChange={(e) => {
                setFilterMode(e.target.value);
                if (e.target.value !== 'custom') {
                  setSelectedDate('');
                }
              }}
              className="bg-transparent text-gray-700 font-semibold outline-none cursor-pointer text-xs md:text-sm"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="custom">Select Date</option>
            </select>
            {filterMode === 'custom' && (
              <input 
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="ml-1 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 outline-none focus:ring-2 focus:ring-[#9A2220]/20 focus:border-[#9A2220] cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-[#9A2220] border-t-transparent rounded-full animate-spin"></div></div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
            {cards.map((card, idx) => (
              <NavLink key={idx} to={card.path} className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between h-36 md:h-40 relative overflow-hidden">
                <div className="flex items-start justify-between relative z-10">
                  <div>
                    <p className="text-gray-500 font-medium mb-1">{card.title}</p>
                    <h3 className="text-3xl font-bold text-gray-900">{card.value}</h3>
                  </div>
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center ${card.bg} group-hover:scale-110 transition-transform duration-300`}>
                    {card.icon}
                  </div>
                </div>
                <div className="text-sm font-semibold text-[#9A2220] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
                  Manage <span className="text-lg">→</span>
                </div>
              </NavLink>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Content Distribution</h2>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full uppercase tracking-wider">
                {filterMode === 'all' 
                  ? 'All Time' 
                  : filterMode === 'today' 
                  ? 'Today' 
                  : filterMode === 'month' 
                  ? 'This Month' 
                  : filterMode === 'year' 
                  ? 'This Year' 
                  : selectedDate 
                  ? `Date: ${selectedDate}` 
                  : 'Select Date'}
              </span>
            </div>
            <div className="h-72 md:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 10 }} interval={0} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 10 }} allowDecimals={false} width={30} />
                  <RechartsTooltip 
                    cursor={{ fill: '#f3f4f6' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={60}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
