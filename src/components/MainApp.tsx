import React, { useState } from 'react';
import {
  LayoutDashboard, Users, Coffee, BedDouble, Briefcase, Package,
  FolderKanban, BookOpen, GraduationCap, Bell, Search, Menu,
  LogOut, Settings, ChevronDown, ArrowUpRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ModuleId, ModuleConfig, User } from '../types';
import { ModuleCard } from './ModuleCard';
import { BardAssistant } from './BardAssistant';
import { ModuleContent } from './ModuleViews';
import { LoginScreen } from './LoginScreen';

// --- Constants & Config ---

const MOCK_USER: User = {
  name: 'Abdul Rahim',
  role: 'System Admin',
  avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const MODULES: ModuleConfig[] = [
  {
    id: ModuleId.ACCOUNTS,
    title: 'Accounts',
    subtitle: 'অ্যাকাউন্টস',
    icon: Briefcase,
    description: 'Manage chart of accounts, vouchers, payroll, and financial statements.',
    stats: [{ label: 'Pending Bills', value: '12' }, { label: 'Monthly Exp', value: '৳ 2.4M' }]
  },
  {
    id: ModuleId.CAFETERIA,
    title: 'Cafeteria',
    subtitle: 'ক্যাফেটেরিয়া',
    icon: Coffee,
    description: 'Meal order management, stock tracking, and billing for staff/trainees.',
    stats: [{ label: 'Today Orders', value: '450' }, { label: 'Stock Alert', value: '3 Items' }]
  },
  {
    id: ModuleId.HOSTEL,
    title: 'Hostel',
    subtitle: 'হোস্টেল',
    icon: BedDouble,
    description: 'Room allocation, check-in/out, and maintenance tracking.',
    stats: [{ label: 'Occupancy', value: '85%' }, { label: 'Available', value: '12 Rooms' }]
  },
  {
    id: ModuleId.HRM,
    title: 'HRM',
    subtitle: 'মানব সম্পদ',
    icon: Users,
    description: 'Employee profiles, leave management, attendance, and promotion history.',
    stats: [{ label: 'Total Staff', value: '240' }, { label: 'On Leave', value: '8' }]
  },
  {
    id: ModuleId.INVENTORY,
    title: 'Inventory',
    subtitle: 'ইনভেন্টরি',
    icon: Package,
    description: 'Procurement, stock management, and asset lifecycle tracking.',
    stats: [{ label: 'Requests', value: '5' }, { label: 'Low Stock', value: '15' }]
  },
  {
    id: ModuleId.PROJECTS,
    title: 'Projects',
    subtitle: 'প্রকল্প',
    icon: FolderKanban,
    description: 'Project planning, milestone tracking, budget approval, and reporting.',
    stats: [{ label: 'Active', value: '7' }, { label: 'Pending Approval', value: '2' }]
  },
  {
    id: ModuleId.RESEARCH,
    title: 'Research',
    subtitle: 'গবেষণা',
    icon: BookOpen,
    description: 'Research proposals, peer review workflows, and publication catalogs.',
    stats: [{ label: 'Ongoing', value: '14' }, { label: 'Published (YTD)', value: '32' }]
  },
  {
    id: ModuleId.TRAINING,
    title: 'Training',
    subtitle: 'প্রশিক্ষণ',
    icon: GraduationCap,
    description: 'Course creation, trainee registration, scheduling, and certification.',
    stats: [{ label: 'Active Batches', value: '3' }, { label: 'Trainees', value: '120' }]
  },
];

const MOCK_CHART_DATA = [
  { name: 'Jan', budget: 4000, expense: 2400 },
  { name: 'Feb', budget: 3000, expense: 1398 },
  { name: 'Mar', budget: 2000, expense: 9800 },
  { name: 'Apr', budget: 2780, expense: 3908 },
  { name: 'May', budget: 1890, expense: 4800 },
  { name: 'Jun', budget: 2390, expense: 3800 },
];

const MOCK_ACTIVITY_DATA = [
  { id: 1, text: 'New Project Proposal "Rural Micro-credit" submitted by Dr. Hasan', time: '2h ago', type: 'project' },
  { id: 2, text: 'Monthly Payroll for October generated', time: '4h ago', type: 'finance' },
  { id: 3, text: 'Inventory Alert: Paper stock low in Main Store', time: '5h ago', type: 'alert' },
  { id: 4, text: 'Hostel Room 302 maintenance request completed', time: '1d ago', type: 'hostel' },
];

// --- Main App Component ---

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeModule, setActiveModule] = useState<ModuleId>(ModuleId.DASHBOARD);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Helper to get current module details
  const currentModuleConfig = MODULES.find(m => m.id === activeModule);

  const handleModuleClick = (id: ModuleId) => {
    setActiveModule(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = async (email: string, pass: string): Promise<boolean> => {
    // Mock validation logic
    if (email && pass) {
      setCurrentUser(MOCK_USER);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveModule(ModuleId.DASHBOARD);
  };

  // --- RENDER LOGIN IF NOT AUTHENTICATED ---
  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // --- MAIN APP RENDER ---
  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">

      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-[280px]' : 'w-[90px]'
          } bg-slate-900/95 backdrop-blur-xl text-slate-300 flex-shrink-0 transition-all duration-500 ease-in-out flex flex-col fixed md:relative z-50 shadow-2xl border border-slate-700/50 m-4 rounded-3xl h-[calc(100vh-2rem)]`}
      >
        {/* Sidebar Header */}
        <div className="h-24 flex items-center justify-center border-b border-slate-700/50">
          {sidebarOpen ? (
            <div className="flex items-center gap-3 px-4">
              <img src="/logo/logo.png" alt="BARD Logo" className="w-10 h-10 object-contain" />
              <div>
                <span className="text-sm font-bold text-white tracking-tight block leading-tight">Bangladesh Academy for</span>
                <span className="text-xs font-medium text-emerald-400 tracking-wider">Rural Development</span>
              </div>
            </div>
          ) : (
            <img src="/logo/logo.png" alt="BARD Logo" className="w-10 h-10 object-contain" />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 hide-scrollbar">
          <button
            onClick={() => setActiveModule(ModuleId.DASHBOARD)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${activeModule === ModuleId.DASHBOARD
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 translate-x-1'
              : 'hover:bg-slate-800/50 hover:text-white'
              }`}
          >
            <LayoutDashboard size={20} className={activeModule === ModuleId.DASHBOARD ? 'animate-pulse' : ''} />
            {sidebarOpen && <span className="font-semibold tracking-wide">Dashboard</span>}
            {!sidebarOpen && activeModule === ModuleId.DASHBOARD && <div className="absolute left-0 w-1 h-8 bg-emerald-400 rounded-r-full"></div>}
          </button>

          <div className="my-6 border-t border-slate-700/50 mx-2 opacity-50"></div>

          <div className="space-y-1">
            {sidebarOpen && <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Modules</p>}
            {MODULES.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activeModule === module.id
                  ? 'bg-slate-800 text-emerald-400 shadow-inner'
                  : 'hover:bg-slate-800/50 hover:text-white'
                  }`}
              >
                <module.icon size={20} className={`transition-colors ${activeModule === module.id ? 'text-emerald-400' : 'text-slate-400 group-hover:text-white'}`} />
                {sidebarOpen && (
                  <span className="block text-sm font-medium truncate">{module.title}</span>
                )}
                {!sidebarOpen && activeModule === module.id && <div className="absolute left-0 w-1 h-8 bg-emerald-400 rounded-r-full"></div>}
              </button>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-slate-700/50 bg-slate-900/50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors w-full group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            {sidebarOpen && <span className="text-sm font-medium">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50">

        {/* Top Header - Glassmorphism */}
        <header className="h-20 absolute top-4 left-4 right-8 z-40 px-6 flex items-center justify-between glass rounded-2xl shadow-sm transition-all duration-300">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-100/50 rounded-xl text-slate-600 transition-colors"
            >
              <Menu size={22} />
            </button>
            <div className="hidden sm:block">
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                {activeModule === ModuleId.DASHBOARD ? 'Executive Dashboard' : currentModuleConfig?.title}
              </h2>
              <p className="text-xs font-medium text-emerald-600">
                {activeModule === ModuleId.DASHBOARD ? 'Overview & Analytics' : currentModuleConfig?.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center bg-white/80 rounded-full px-4 py-2 border border-slate-200 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all w-72 shadow-sm">
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search anything..."
                className="bg-transparent border-none outline-none text-sm ml-3 w-full text-slate-700 placeholder-slate-400 font-medium"
              />
            </div>

            <button className="relative p-2.5 text-slate-500 hover:bg-white hover:shadow-sm rounded-xl transition-all border border-transparent hover:border-slate-100">
              <Bell size={22} />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-slate-50"></span>
            </button>

            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-slate-800 leading-none mb-1">{currentUser?.name}</p>
                <p className="text-xs font-medium text-slate-500">{currentUser?.role}</p>
              </div>
              <button className="flex items-center gap-1 p-1 pr-2 rounded-full hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 transition-all">
                <img src={currentUser?.avatarUrl} alt="User" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                <ChevronDown size={14} className="text-slate-400 ml-1" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Scrollable Content */}
        <main className="flex-1 overflow-y-auto pt-32 px-8 pb-10 scroll-smooth">
          <div className="max-w-[1600px] mx-auto space-y-8">

            {activeModule === ModuleId.DASHBOARD ? (
              // --- DASHBOARD VIEW ---
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[
                    { label: 'Total Budget', value: '৳ 12.5M', change: '+2.5%', color: 'emerald', icon: Briefcase },
                    { label: 'Active Projects', value: '24', change: '+4', color: 'blue', icon: FolderKanban },
                    { label: 'Total Employees', value: '240', change: 'Stable', color: 'purple', icon: Users },
                    { label: 'Trainees Enrolled', value: '850', change: '+12%', color: 'orange', icon: GraduationCap },
                  ].map((stat, idx) => {
                    const colors: any = {
                      emerald: 'from-emerald-500 to-emerald-600 text-white shadow-emerald-500/30',
                      blue: 'from-blue-500 to-blue-600 text-white shadow-blue-500/30',
                      purple: 'from-purple-500 to-purple-600 text-white shadow-purple-500/30',
                      orange: 'from-orange-500 to-orange-600 text-white shadow-orange-500/30'
                    }
                    const Icon = stat.icon;
                    return (
                      <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft hover:shadow-float hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${colors[stat.color]} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`}></div>

                        <div className="flex justify-between items-start mb-4 relative z-10">
                          <div className={`p-3 rounded-2xl bg-gradient-to-br ${colors[stat.color]} shadow-lg`}>
                            <Icon size={24} className="text-white" />
                          </div>
                          <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                            <ArrowUpRight size={12} /> {stat.change}
                          </div>
                        </div>
                        <h3 className="text-3xl font-black text-slate-800 mb-1 tracking-tight relative z-10">{stat.value}</h3>
                        <p className="text-sm font-bold text-slate-400 relative z-10">{stat.label}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
                  {/* Chart Section */}
                  <div className="xl:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-soft">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">Financial Overview</h3>
                        <p className="text-sm font-medium text-slate-400 mt-1">Budget Allocation vs Actual Expense</p>
                      </div>
                      <select className="bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold px-4 py-2 outline-none hover:bg-slate-100 transition-colors cursor-pointer text-slate-600">
                        <option>Last 6 Months</option>
                        <option>This Fiscal Year</option>
                      </select>
                    </div>
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={MOCK_CHART_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#34d399" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#059669" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} />
                          <Tooltip
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px 16px' }}
                            cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                          />
                          <Area type="monotone" dataKey="budget" stroke="#34d399" strokeWidth={3} fillOpacity={1} fill="url(#colorBudget)" />
                          <Area type="monotone" dataKey="expense" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Activity Feed */}
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-soft flex flex-col">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">Recent Activity</h3>
                    <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                      {MOCK_ACTIVITY_DATA.map((activity, i) => (
                        <div key={activity.id} className="relative pl-6 pb-2 group">
                          {/* Timeline Line */}
                          {i !== MOCK_ACTIVITY_DATA.length - 1 && <div className="absolute left-[9px] top-3 bottom-0 w-[2px] bg-slate-100 group-hover:bg-slate-200 transition-colors"></div>}

                          <div className={`absolute left-0 top-1.5 w-5 h-5 rounded-full border-4 border-white shadow-sm z-10 ${activity.type === 'alert' ? 'bg-rose-500' : 'bg-emerald-500'
                            }`} />
                          <div>
                            <p className="text-sm text-slate-700 font-semibold leading-relaxed group-hover:text-emerald-700 transition-colors">{activity.text}</p>
                            <span className="text-xs font-bold text-slate-400 mt-1 block uppercase tracking-wide">{activity.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-6 py-3 text-sm text-slate-600 font-bold bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
                      View All Notifications
                    </button>
                  </div>
                </div>

                {/* Modules Grid */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-800 pl-1">Quick Access Modules</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {MODULES.map(module => (
                      <ModuleCard key={module.id} module={module} onClick={handleModuleClick} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // --- DETAIL MODULE VIEW ---
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 pb-12">

                {/* Module Header Card */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-soft mb-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-bl-full -mr-20 -mt-20 opacity-70 group-hover:scale-105 transition-transform duration-700 pointer-events-none"></div>

                  <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl shadow-sm">
                          {currentModuleConfig?.icon && <currentModuleConfig.icon size={32} strokeWidth={2.5} />}
                        </div>
                        <div>
                          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">{currentModuleConfig?.title}</h1>
                          <p className="text-emerald-600 font-bold text-sm tracking-wide">{currentModuleConfig?.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-slate-500 font-medium max-w-2xl text-lg leading-relaxed">{currentModuleConfig?.description}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-bold text-sm transition-all flex items-center gap-2 shadow-sm">
                        <Settings size={18} /> Configuration
                      </button>
                    </div>
                  </div>

                  {/* Quick Stats Row for Module */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10">
                    {currentModuleConfig?.stats?.map((stat, i) => (
                      <div key={i} className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-100">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-2xl font-black text-slate-800">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Module Specific Content */}
                <ModuleContent moduleId={activeModule} />

              </div>
            )}

            {/* Footer */}
            <footer className="pt-8 mt-12 border-t border-slate-200/60 text-center">
              <p className="text-slate-400 text-sm font-medium">
                &copy; {new Date().getFullYear()} Bangladesh Academy for Rural Development (BARD). All rights reserved.
              </p>
            </footer>

          </div>
        </main>
      </div>

      {/* Gemini Powered Assistant */}
      <BardAssistant />
    </div>
  );
};

export default App;