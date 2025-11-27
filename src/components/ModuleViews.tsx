import React, { useState } from 'react';
import {
  Plus, Search, Filter, MoreVertical, FileText, CheckCircle, XCircle,
  AlertCircle, DollarSign, Users, Calendar, Clock, MapPin,
  TrendingUp, Download, ChefHat, Bed, Box, ClipboardList,
  FileSpreadsheet, UserCheck, Utensils, Printer, ChevronDown,
  MoreHorizontal, ArrowUpRight, ArrowDownRight, Coffee, ShoppingBag
} from 'lucide-react';
import {
  ModuleId, Employee, Voucher, Project, Room, StockItem,
  MealItem, ResearchProposal, TrainingCourse, PayrollRecord,
  LeaveRequest, AttendanceRecord, InventoryRequest, HostelRequest, Ingredient
} from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// --- MOCK DATA (unchanged for functionality) ---
const MOCK_EMPLOYEES: Employee[] = [
  { id: 'E001', name: 'Dr. Aminul Islam', designation: 'Director General', department: 'Administration', status: 'Active', joinDate: '2015-03-12', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80' },
  { id: 'E002', name: 'Sarah Rahman', designation: 'Senior Researcher', department: 'Research', status: 'Active', joinDate: '2018-06-23', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80' },
  { id: 'E003', name: 'Kamal Hossain', designation: 'Accounts Officer', department: 'Accounts', status: 'On Leave', joinDate: '2020-01-15', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80' },
  { id: 'E004', name: 'Nusrat Jahan', designation: 'Training Coordinator', department: 'Training', status: 'Active', joinDate: '2019-11-30', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80' },
];

const MOCK_PAYROLL: PayrollRecord[] = [
  { id: 'PR-OCT-001', employeeId: 'E001', employeeName: 'Dr. Aminul Islam', month: 'October 2024', basicSalary: 85000, allowances: 15000, deductions: 5000, netPay: 95000, status: 'Paid' },
  { id: 'PR-OCT-002', employeeId: 'E002', employeeName: 'Sarah Rahman', month: 'October 2024', basicSalary: 65000, allowances: 12000, deductions: 3500, netPay: 73500, status: 'Processing' },
  { id: 'PR-OCT-003', employeeId: 'E003', employeeName: 'Kamal Hossain', month: 'October 2024', basicSalary: 45000, allowances: 8000, deductions: 2000, netPay: 51000, status: 'Pending' },
];

const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  { id: 'L001', employeeName: 'Kamal Hossain', type: 'Sick', startDate: '2024-10-28', endDate: '2024-10-30', reason: 'Viral Fever', status: 'Approved' },
  { id: 'L002', employeeName: 'Nusrat Jahan', type: 'Casual', startDate: '2024-11-05', endDate: '2024-11-06', reason: 'Family Event', status: 'Pending' },
];

const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id: 'A001', employeeName: 'Dr. Aminul Islam', date: '2024-10-30', checkIn: '09:05 AM', checkOut: '05:15 PM', status: 'Present' },
  { id: 'A002', employeeName: 'Sarah Rahman', date: '2024-10-30', checkIn: '09:30 AM', checkOut: '05:00 PM', status: 'Late' },
  { id: 'A003', employeeName: 'Kamal Hossain', date: '2024-10-30', checkIn: '-', checkOut: '-', status: 'Absent' },
];

const MOCK_VOUCHERS: Voucher[] = [
  { id: 'V-2024-001', date: '2024-10-24', head: 'Office Supplies', amount: 15000, status: 'Approved', submittedBy: 'Kamal Hossain' },
  { id: 'V-2024-002', date: '2024-10-25', head: 'Travel Allowance', amount: 5000, status: 'Pending', submittedBy: 'Sarah Rahman' },
  { id: 'V-2024-003', date: '2024-10-26', head: 'Guest Entertainment', amount: 2500, status: 'Rejected', submittedBy: 'Admin Staff' },
  { id: 'V-2024-004', date: '2024-10-26', head: 'IT Maintenance', amount: 45000, status: 'Pending', submittedBy: 'IT Support' },
];

const MOCK_PROJECTS: Project[] = [
  {
    id: 'P01', title: 'Rural Micro-credit Analysis', director: 'Dr. Aminul Islam', budget: 500000, spent: 320000, progress: 65, status: 'Ongoing',
    milestones: [{ title: 'Field Survey', completed: true }, { title: 'Data Analysis', completed: true }, { title: 'Final Report', completed: false }],
    documents: [{ name: 'Project_Proposal_v1.pdf', type: 'PDF', date: '2024-01-10' }, { name: 'Survey_Data_Raw.xlsx', type: 'Excel', date: '2024-06-15' }]
  },
  {
    id: 'P02', title: 'Sustainable Agriculture', director: 'Rafiqul Alam', budget: 1200000, spent: 100000, progress: 10, status: 'Planning',
    milestones: [{ title: 'Project Approval', completed: true }, { title: 'Team Hiring', completed: false }, { title: 'Implementation', completed: false }],
    documents: [{ name: 'Budget_Estimates.pdf', type: 'PDF', date: '2024-09-01' }]
  },
  {
    id: 'P03', title: 'Women Empowerment 2024', director: 'Nusrat Jahan', budget: 800000, spent: 780000, progress: 95, status: 'Completed',
    milestones: [{ title: 'Training Phase', completed: true }, { title: 'Distribution', completed: true }, { title: 'Impact Assessment', completed: true }],
    documents: [{ name: 'Final_Impact_Report.docx', type: 'Word', date: '2024-10-20' }]
  },
];

const MOCK_ROOMS: Room[] = [
  { id: '101', number: '101', building: 'Padma', type: 'VIP', status: 'Occupied', occupant: 'Mr. John Doe (Guest)' },
  { id: '102', number: '102', building: 'Padma', type: 'Single', status: 'Available' },
  { id: '103', number: '103', building: 'Padma', type: 'Single', status: 'Maintenance' },
  { id: '201', number: '201', building: 'Meghna', type: 'Double', status: 'Occupied', occupant: 'Trainee Batch A' },
  { id: '202', number: '202', building: 'Meghna', type: 'Double', status: 'Available' },
  { id: '203', number: '203', building: 'Meghna', type: 'Double', status: 'Available' },
];

const MOCK_HOSTEL_REQUESTS: HostelRequest[] = [
  { id: 'HR-01', guestName: 'Prof. Yunus (Guest Speaker)', purpose: 'Seminar Keynote', checkInDate: '2024-11-01', duration: '2 Days', status: 'Pending' },
  { id: 'HR-02', guestName: 'Ministry Audit Team', purpose: 'Annual Audit', checkInDate: '2024-11-10', duration: '5 Days', status: 'Allocated' },
];

const MOCK_STOCK: StockItem[] = [
  { id: 'S01', name: 'A4 Paper Ream', category: 'Stationery', quantity: 45, unit: 'Box', reorderLevel: 50, lastUpdated: '2 days ago' },
  { id: 'S02', name: 'Ballpoint Pen (Blue)', category: 'Stationery', quantity: 200, unit: 'Pcs', reorderLevel: 100, lastUpdated: '1 week ago' },
  { id: 'S03', name: 'Laptop (Dell)', category: 'Electronics', quantity: 5, unit: 'Units', reorderLevel: 2, lastUpdated: '1 month ago' },
  { id: 'S04', name: 'Printer Toner (HP)', category: 'Electronics', quantity: 2, unit: 'Cartridge', reorderLevel: 5, lastUpdated: 'Yesterday' },
];

const MOCK_INVENTORY_REQUESTS: InventoryRequest[] = [
  { id: 'IR-001', itemName: 'Laptop Stand', quantity: 2, requestedBy: 'Sarah Rahman', date: '2024-10-29', status: 'Pending' },
  { id: 'IR-002', itemName: 'Whiteboard Markers', quantity: 10, requestedBy: 'Training Dept', date: '2024-10-28', status: 'Approved' },
];

const MOCK_MENU: MealItem[] = [
  { id: 'M01', name: 'Chicken Biryani', price: 180, category: 'Lunch', available: true, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400' },
  { id: 'M02', name: 'Beef Curry with Rice', price: 220, category: 'Lunch', available: true, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400' },
  { id: 'M03', name: 'Vegetable Khichuri', price: 120, category: 'Breakfast', available: true, image: 'https://images.unsplash.com/photo-1543353071-087092ec393a?w=400' },
  { id: 'M04', name: 'Evening Snacks Platter', price: 80, category: 'Snacks', available: false, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400' },
];

const MOCK_INGREDIENTS: Ingredient[] = [
  { id: 'ING-01', name: 'Rice (Miniket)', stock: 500, unit: 'kg', dailyConsumption: 45, status: 'Good' },
  { id: 'ING-02', name: 'Soybean Oil', stock: 20, unit: 'L', dailyConsumption: 12, status: 'Low' },
  { id: 'ING-03', name: 'Chicken (Broiler)', stock: 80, unit: 'kg', dailyConsumption: 30, status: 'Good' },
];

const MOCK_RESEARCH: ResearchProposal[] = [
  { id: 'R01', title: 'Climate Change Impact on Crop Yield in Comilla', researcher: 'Dr. Faruk Ahmed', submissionDate: '2024-09-10', status: 'Under Review', category: 'Agriculture' },
  { id: 'R02', title: 'Digital Literacy in Rural Education', researcher: 'Ms. Salma Khatun', submissionDate: '2024-08-22', status: 'Approved', category: 'Education' },
  { id: 'R03', title: 'Post-Harvest Loss Reduction Strategies', researcher: 'Dr. Hasan Mahmud', submissionDate: '2024-10-01', status: 'Submitted', category: 'Agriculture' },
];

const MOCK_COURSES: TrainingCourse[] = [
  { id: 'C01', title: 'Foundation Training for Civil Servants', batch: 'FT-2024-A', startDate: '2024-11-01', endDate: '2024-12-30', trainees: 45, instructor: 'Mr. Asif Iqbal', status: 'Upcoming' },
  { id: 'C02', title: 'Modern Office Management', batch: 'MOM-12', startDate: '2024-10-15', endDate: '2024-10-25', trainees: 25, instructor: 'Mrs. Rehana Parveen', status: 'Active' },
  { id: 'C03', title: 'ICT for Rural Development', batch: 'ICT-05', startDate: '2024-09-01', endDate: '2024-09-30', trainees: 30, instructor: 'Mr. Kabir Hossain', status: 'Completed' },
];

// --- SHARED UI COMPONENTS ---

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    'Active': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Approved': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Completed': 'bg-blue-100 text-blue-700 border-blue-200',
    'Available': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Paid': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Present': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Good': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Allocated': 'bg-purple-100 text-purple-700 border-purple-200',
    'Submitted': 'bg-blue-100 text-blue-700 border-blue-200',
    'Ongoing': 'bg-sky-100 text-sky-700 border-sky-200',
    'Under Review': 'bg-amber-100 text-amber-700 border-amber-200',
    'Processing': 'bg-blue-100 text-blue-700 border-blue-200',
    'Pending': 'bg-amber-100 text-amber-700 border-amber-200',
    'On Leave': 'bg-amber-100 text-amber-700 border-amber-200',
    'Planning': 'bg-slate-100 text-slate-700 border-slate-200',
    'Maintenance': 'bg-orange-100 text-orange-700 border-orange-200',
    'Upcoming': 'bg-indigo-100 text-indigo-700 border-indigo-200',
    'Late': 'bg-orange-100 text-orange-700 border-orange-200',
    'Low': 'bg-rose-100 text-rose-700 border-rose-200',
    'Rejected': 'bg-rose-100 text-rose-700 border-rose-200',
    'Occupied': 'bg-rose-100 text-rose-700 border-rose-200',
    'Delayed': 'bg-rose-100 text-rose-700 border-rose-200',
    'Suspended': 'bg-rose-100 text-rose-700 border-rose-200',
    'Absent': 'bg-rose-100 text-rose-700 border-rose-200',
  };

  const colorClass = styles[status] || 'bg-slate-100 text-slate-600 border-slate-200';

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${colorClass} shadow-sm`}>
      <span className={`w-1.5 h-1.5 rounded-full bg-current opacity-60`} />
      {status}
    </span>
  );
};

const TabButton = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2.5 text-sm font-bold rounded-full transition-all duration-300 flex items-center gap-2 ${active
        ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105'
        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
      }`}
  >
    {children}
  </button>
);

const ModernTable = ({ headers, children }: { headers: string[]; children: React.ReactNode }) => (
  <div className="overflow-hidden bg-white rounded-3xl shadow-soft border border-slate-100">
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50/50 border-b border-slate-100">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className={`px-6 py-5 font-bold text-slate-400 text-xs uppercase tracking-wider ${i === headers.length - 1 ? 'text-right' : ''}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {children}
        </tbody>
      </table>
    </div>
  </div>
);

const TableRow = ({ children }: { children: React.ReactNode }) => (
  <tr className="hover:bg-slate-50/80 transition-colors group">
    {children}
  </tr>
);

const TableCell = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <td className={`px-6 py-5 text-slate-600 font-medium ${className}`}>
    {children}
  </td>
);

// --- MODULE VIEWS ---

const AccountsView = () => {
  const [activeTab, setActiveTab] = useState('vouchers');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex p-1 bg-white rounded-full border border-slate-200 w-fit shadow-sm">
        <TabButton active={activeTab === 'vouchers'} onClick={() => setActiveTab('vouchers')}><FileText size={16} /> Vouchers</TabButton>
        <TabButton active={activeTab === 'payroll'} onClick={() => setActiveTab('payroll')}><Users size={16} /> Payroll</TabButton>
        <TabButton active={activeTab === 'budget'} onClick={() => setActiveTab('budget')}><TrendingUp size={16} /> Budget</TabButton>
      </div>

      {activeTab === 'vouchers' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-800">Recent Vouchers</h3>
            <button className="flex items-center gap-2 text-sm bg-emerald-600 text-white px-4 py-2.5 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 font-medium">
              <Plus size={18} /> New Voucher
            </button>
          </div>
          <ModernTable headers={['ID', 'Date', 'Account Head', 'Submitted By', 'Amount', 'Status', 'Actions']}>
            {MOCK_VOUCHERS.map((v) => (
              <TableRow key={v.id}>
                <TableCell><span className="font-mono font-medium text-slate-700">{v.id}</span></TableCell>
                <TableCell>{v.date}</TableCell>
                <TableCell><span className="font-medium text-slate-800">{v.head}</span></TableCell>
                <TableCell>{v.submittedBy}</TableCell>
                <TableCell><span className="font-mono font-bold text-slate-700">৳ {v.amount.toLocaleString()}</span></TableCell>
                <TableCell><StatusBadge status={v.status} /></TableCell>
                <TableCell className="text-right">
                  <button className="text-slate-400 hover:text-emerald-600 p-2 hover:bg-emerald-50 rounded-lg transition-colors"><MoreHorizontal size={18} /></button>
                </TableCell>
              </TableRow>
            ))}
          </ModernTable>
        </div>
      )}

      {activeTab === 'payroll' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Monthly Payroll</h3>
              <p className="text-sm text-slate-500">October 2024</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 text-sm border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 text-slate-600 font-medium">
                <Printer size={16} /> Print
              </button>
              <button className="flex items-center gap-2 text-sm bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10 font-medium">
                <FileSpreadsheet size={16} /> Generate Sheet
              </button>
            </div>
          </div>
          <ModernTable headers={['Employee', 'Month', 'Basic', 'Allowances', 'Deductions', 'Net Pay', 'Status']}>
            {MOCK_PAYROLL.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800">{p.employeeName}</span>
                    <span className="text-xs text-slate-400 font-mono">{p.employeeId}</span>
                  </div>
                </TableCell>
                <TableCell>{p.month}</TableCell>
                <TableCell className="text-right">৳{p.basicSalary.toLocaleString()}</TableCell>
                <TableCell className="text-right text-emerald-600">+৳{p.allowances.toLocaleString()}</TableCell>
                <TableCell className="text-right text-rose-500">-৳{p.deductions.toLocaleString()}</TableCell>
                <TableCell className="text-right"><span className="font-bold text-slate-800 text-lg">৳{p.netPay.toLocaleString()}</span></TableCell>
                <TableCell className="text-center"><StatusBadge status={p.status} /></TableCell>
              </TableRow>
            ))}
          </ModernTable>
        </div>
      )}

      {activeTab === 'budget' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-8 rounded-3xl text-white shadow-xl shadow-emerald-900/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <div className="relative z-10">
              <p className="text-emerald-100 font-medium mb-1">Total Allocation (FY24)</p>
              <h3 className="text-4xl font-bold mb-8">৳ 50,000,000</h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2 opacity-90">
                    <span>Training Budget</span>
                    <span className="font-mono">65%</span>
                  </div>
                  <div className="w-full bg-black/20 rounded-full h-2">
                    <div className="bg-white/90 h-2 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2 opacity-90">
                    <span>Research Grants</span>
                    <span className="font-mono">40%</span>
                  </div>
                  <div className="w-full bg-black/20 rounded-full h-2">
                    <div className="bg-white/60 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6 text-lg">Financial Reports</h3>
            <div className="space-y-4">
              {[
                { title: 'Income Statement Q3', date: 'Oct 15, 2024', color: 'text-rose-500', bg: 'bg-rose-50' },
                { title: 'Balance Sheet FY 23-24', date: 'July 05, 2024', color: 'text-blue-500', bg: 'bg-blue-50' }
              ].map((report, i) => (
                <div key={i} className="group flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${report.bg} ${report.color}`}>
                      <FileText size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-700 group-hover:text-emerald-700 transition-colors">{report.title}</p>
                      <p className="text-xs text-slate-400">{report.date}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <Download size={20} />
                  </div>
                </div>
              ))}

              <button className="w-full py-3 mt-4 text-sm text-emerald-600 border border-dashed border-emerald-200 rounded-xl hover:bg-emerald-50 font-medium transition-colors">
                + Generate New Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const HrmView = () => {
  const [activeTab, setActiveTab] = useState('employees');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex p-1 bg-white rounded-full border border-slate-200 w-fit shadow-sm">
        <TabButton active={activeTab === 'employees'} onClick={() => setActiveTab('employees')}><Users size={16} /> Employees</TabButton>
        <TabButton active={activeTab === 'leave'} onClick={() => setActiveTab('leave')}><Calendar size={16} /> Leave</TabButton>
        <TabButton active={activeTab === 'attendance'} onClick={() => setActiveTab('attendance')}><Clock size={16} /> Attendance</TabButton>
      </div>

      {activeTab === 'employees' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-72 group">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <input type="text" placeholder="Search employees..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all shadow-sm" />
            </div>
            <button className="flex items-center gap-2 text-sm bg-emerald-600 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 font-medium transition-all">
              <Plus size={18} /> Add Employee
            </button>
          </div>
          <ModernTable headers={['Employee', 'Designation', 'Department', 'Join Date', 'Status', 'Actions']}>
            {MOCK_EMPLOYEES.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <img src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
                    <div>
                      <p className="font-bold text-slate-800">{emp.name}</p>
                      <p className="text-xs text-slate-400 font-mono">{emp.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell><span className="text-slate-700">{emp.designation}</span></TableCell>
                <TableCell><span className="px-2 py-1 bg-slate-100 rounded text-xs font-semibold text-slate-600">{emp.department}</span></TableCell>
                <TableCell>{emp.joinDate}</TableCell>
                <TableCell><StatusBadge status={emp.status} /></TableCell>
                <TableCell className="text-right">
                  <button className="text-emerald-600 hover:text-emerald-800 text-sm font-semibold">View Profile</button>
                </TableCell>
              </TableRow>
            ))}
          </ModernTable>
        </div>
      )}

      {activeTab === 'leave' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800">Leave Requests</h3>
            <button className="flex items-center gap-2 text-sm bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 font-medium text-slate-600">
              <Filter size={16} /> Filter
            </button>
          </div>
          <ModernTable headers={['Employee', 'Type', 'Duration', 'Reason', 'Status', 'Action']}>
            {MOCK_LEAVE_REQUESTS.map(req => (
              <TableRow key={req.id}>
                <TableCell><span className="font-bold text-slate-700">{req.employeeName}</span></TableCell>
                <TableCell><span className="text-slate-600">{req.type}</span></TableCell>
                <TableCell>
                  <div className="flex flex-col text-xs">
                    <span className="font-medium text-slate-700">{req.startDate}</span>
                    <span className="text-slate-400">to {req.endDate}</span>
                  </div>
                </TableCell>
                <TableCell><span className="italic text-slate-500">"{req.reason}"</span></TableCell>
                <TableCell><StatusBadge status={req.status} /></TableCell>
                <TableCell className="text-right">
                  {req.status === 'Pending' && (
                    <div className="flex gap-2 justify-end">
                      <button className="text-emerald-600 hover:bg-emerald-50 p-1.5 rounded-lg transition-colors" title="Approve"><CheckCircle size={20} /></button>
                      <button className="text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg transition-colors" title="Reject"><XCircle size={20} /></button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </ModernTable>
        </div>
      )}

      {activeTab === 'attendance' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-800">Attendance Log</h3>
              <p className="text-xs text-slate-500">Synced from Biometric Device: GATE-01</p>
            </div>
            <input type="date" className="text-sm bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-100" defaultValue="2024-10-30" />
          </div>
          <ModernTable headers={['Employee', 'Check In', 'Check Out', 'Status']}>
            {MOCK_ATTENDANCE.map(att => (
              <TableRow key={att.id}>
                <TableCell><span className="font-medium text-slate-800">{att.employeeName}</span></TableCell>
                <TableCell><span className="font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded text-xs">{att.checkIn}</span></TableCell>
                <TableCell><span className="font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded text-xs">{att.checkOut}</span></TableCell>
                <TableCell><StatusBadge status={att.status} /></TableCell>
              </TableRow>
            ))}
          </ModernTable>
        </div>
      )}
    </div>
  );
};

const InventoryView = () => {
  const [activeTab, setActiveTab] = useState('stock');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex p-1 bg-white rounded-full border border-slate-200 w-fit shadow-sm">
        <TabButton active={activeTab === 'stock'} onClick={() => setActiveTab('stock')}><Box size={16} /> Stock</TabButton>
        <TabButton active={activeTab === 'requests'} onClick={() => setActiveTab('requests')}><ClipboardList size={16} /> Requests</TabButton>
      </div>

      {activeTab === 'stock' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-rose-100 text-rose-600 rounded-xl"><AlertCircle size={24} /></div>
              <div><p className="text-slate-400 text-xs uppercase font-bold tracking-wider">Low Stock</p><h4 className="text-2xl font-bold text-slate-800">5</h4></div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><Box size={24} /></div>
              <div><p className="text-slate-400 text-xs uppercase font-bold tracking-wider">Total SKUs</p><h4 className="text-2xl font-bold text-slate-800">1,240</h4></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 text-lg">Inventory Levels</h3>
              <button className="text-sm bg-white border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 font-medium">Filter Category</button>
            </div>
            <ModernTable headers={['Item Name', 'Category', 'Stock Level', 'Status', 'Actions']}>
              {MOCK_STOCK.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-bold text-slate-800">{item.name}</p>
                      <p className="text-xs text-slate-400">Updated {item.lastUpdated}</p>
                    </div>
                  </TableCell>
                  <TableCell><span className="text-slate-600">{item.category}</span></TableCell>
                  <TableCell>
                    <div className="w-full max-w-[140px]">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="font-semibold text-slate-700">{item.quantity} {item.unit}</span>
                        <span className="text-slate-400">/ {item.reorderLevel * 2}</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${item.quantity <= item.reorderLevel ? 'bg-rose-500' : 'bg-emerald-500'}`}
                          style={{ width: `${Math.min((item.quantity / (item.reorderLevel * 2)) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.quantity <= item.reorderLevel ? (
                      <span className="text-xs font-bold text-rose-600 bg-rose-100 px-2.5 py-1 rounded-md">Low Stock</span>
                    ) : (
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-md">In Stock</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <button className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm">Reorder</button>
                  </TableCell>
                </TableRow>
              ))}
            </ModernTable>
          </div>
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 text-lg">Requisition Requests</h3>
          <ModernTable headers={['Item', 'Qty', 'Requested By', 'Date', 'Status', 'Actions']}>
            {MOCK_INVENTORY_REQUESTS.map(req => (
              <TableRow key={req.id}>
                <TableCell><span className="font-bold text-slate-800">{req.itemName}</span></TableCell>
                <TableCell><span className="font-mono text-slate-600">{req.quantity}</span></TableCell>
                <TableCell>{req.requestedBy}</TableCell>
                <TableCell><span className="text-slate-500 text-xs">{req.date}</span></TableCell>
                <TableCell><StatusBadge status={req.status} /></TableCell>
                <TableCell className="text-right">
                  {req.status === 'Pending' && (
                    <div className="flex gap-3 justify-end text-sm font-medium">
                      <button className="text-emerald-600 hover:underline">Approve</button>
                      <button className="text-rose-500 hover:underline">Reject</button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </ModernTable>
        </div>
      )}
    </div>
  );
};

const ProjectsView = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-end">
        <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 font-medium">
          <Plus size={18} /> New Project
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {MOCK_PROJECTS.map((project) => (
          <div key={project.id} className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-emerald-200 transition-all duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{project.title}</h3>
                  <StatusBadge status={project.status} />
                </div>
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <Users size={14} /> Director: <span className="font-medium text-slate-700">{project.director}</span>
                </p>
              </div>
              <div className="text-right bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Budget Used</p>
                <p className="text-lg font-bold text-slate-800">
                  ৳ {project.spent.toLocaleString()} <span className="text-slate-400 text-sm font-normal">/ {project.budget.toLocaleString()}</span>
                </p>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-slate-700">Completion</span>
                <span className="font-bold text-emerald-600">{project.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 p-0.5">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full transition-all duration-1000 shadow-sm"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 pt-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <TrendingUp size={16} className="text-emerald-600" /> Key Milestones
                </h4>
                <div className="space-y-3 pl-2 border-l-2 border-slate-100">
                  {project.milestones.map((ms, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm pl-4 relative">
                      {/* Dot */}
                      <div className={`absolute -left-[21px] w-3 h-3 rounded-full border-2 border-white ${ms.completed ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                      <span className={ms.completed ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}>{ms.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText size={16} className="text-blue-500" /> Project Documents
                </h4>
                <div className="space-y-3">
                  {project.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50/80 rounded-xl border border-slate-100 text-sm hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="bg-white p-1.5 rounded-lg border border-slate-100">
                          <FileText size={14} className="text-slate-500" />
                        </div>
                        <span className="truncate font-medium text-slate-600">{doc.name}</span>
                      </div>
                      <Download size={16} className="text-slate-400 hover:text-emerald-600" />
                    </div>
                  ))}
                  <button className="w-full text-xs text-center text-emerald-600 border border-dashed border-emerald-200 rounded-lg p-2.5 hover:bg-emerald-50 font-medium transition-colors mt-2">
                    + Upload New Document
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HostelView = () => {
  const [activeTab, setActiveTab] = useState('rooms');
  const [buildingFilter, setBuildingFilter] = useState('All');

  const filteredRooms = buildingFilter === 'All' ? MOCK_ROOMS : MOCK_ROOMS.filter(r => r.building === buildingFilter);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex p-1 bg-white rounded-full border border-slate-200 w-fit shadow-sm">
        <TabButton active={activeTab === 'rooms'} onClick={() => setActiveTab('rooms')}><Bed size={16} /> Rooms</TabButton>
        <TabButton active={activeTab === 'requests'} onClick={() => setActiveTab('requests')}><ClipboardList size={16} /> Requests</TabButton>
        <TabButton active={activeTab === 'billing'} onClick={() => setActiveTab('billing')}><DollarSign size={16} /> Billing</TabButton>
      </div>

      {activeTab === 'rooms' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex gap-1">
              {['All', 'Padma', 'Meghna'].map(b => (
                <button
                  key={b}
                  onClick={() => setBuildingFilter(b)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${buildingFilter === b ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  {b}
                </button>
              ))}
            </div>
            <div className="flex gap-4 text-xs font-semibold text-slate-600 px-4">
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm"></div> Available</div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm"></div> Occupied</div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm"></div> Maintenance</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRooms.map((room) => (
              <div key={room.id} className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1.5 h-full ${room.status === 'Available' ? 'bg-emerald-500' : room.status === 'Occupied' ? 'bg-rose-500' : 'bg-amber-500'}`}></div>
                <div className="pl-3">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{room.building}</span>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase ${room.type === 'VIP' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>{room.type}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-1 font-mono">{room.number}</h3>
                  <p className={`text-sm font-bold ${room.status === 'Available' ? 'text-emerald-600' : room.status === 'Occupied' ? 'text-rose-600' : 'text-amber-600'}`}>
                    {room.status}
                  </p>

                  {room.occupant ? (
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <p className="text-xs text-slate-400 font-medium mb-1">Current Guest</p>
                      <p className="text-sm font-semibold text-slate-700 truncate flex items-center gap-2">
                        <Users size={14} className="text-slate-400" /> {room.occupant}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4 h-[50px] flex items-end">
                      <button className="w-full py-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
                        Allocate Room
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 text-lg">Room Allocation Requests</h3>
          <ModernTable headers={['Guest Name', 'Purpose', 'Check-In', 'Duration', 'Status', 'Action']}>
            {MOCK_HOSTEL_REQUESTS.map(req => (
              <TableRow key={req.id}>
                <TableCell><span className="font-bold text-slate-800">{req.guestName}</span></TableCell>
                <TableCell>{req.purpose}</TableCell>
                <TableCell>{req.checkInDate}</TableCell>
                <TableCell>{req.duration}</TableCell>
                <TableCell><StatusBadge status={req.status} /></TableCell>
                <TableCell className="text-right">
                  {req.status === 'Pending' && <button className="text-emerald-600 font-bold text-sm hover:underline">Assign</button>}
                </TableCell>
              </TableRow>
            ))}
          </ModernTable>
        </div>
      )}

      {activeTab === 'billing' && (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-3xl border border-slate-200 border-dashed text-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-6 shadow-sm">
            <DollarSign size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Automated Billing</h3>
          <p className="text-slate-500 mb-8 max-w-md leading-relaxed">System automatically calculates charges based on check-in duration and room type configuration.</p>
          <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
            Generate Monthly Bills
          </button>
        </div>
      )}
    </div>
  );
};

const CafeteriaView = () => {
  const [activeTab, setActiveTab] = useState('menu');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex p-1 bg-white rounded-full border border-slate-200 w-fit shadow-sm">
        <TabButton active={activeTab === 'menu'} onClick={() => setActiveTab('menu')}><Utensils size={16} /> Menu</TabButton>
        <TabButton active={activeTab === 'stock'} onClick={() => setActiveTab('stock')}><Box size={16} /> Ingredients</TabButton>
        <TabButton active={activeTab === 'orders'} onClick={() => setActiveTab('orders')}><ShoppingBag size={16} /> Orders</TabButton>
      </div>

      {activeTab === 'menu' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_MENU.map((item) => (
            <div key={item.id} className="group bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-48 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <span className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800 z-20 shadow-sm">
                  {item.category}
                </span>
                <div className="absolute bottom-4 left-4 z-20">
                  <h4 className="font-bold text-white text-lg line-clamp-1">{item.name}</h4>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-2xl font-bold text-slate-800">৳{item.price}</span>
                  {item.available ? (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Available</span>
                  ) : (
                    <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded-md">Sold Out</span>
                  )}
                </div>
                <button
                  disabled={!item.available}
                  className="w-full py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-slate-900/10 active:scale-95"
                >
                  Add to Plate
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'stock' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800">Kitchen Ingredients</h3>
            <button className="text-sm bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-all font-medium shadow-lg shadow-emerald-600/20">Update Stock</button>
          </div>
          <ModernTable headers={['Ingredient', 'Current Stock', 'Daily Avg.', 'Status']}>
            {MOCK_INGREDIENTS.map(ing => (
              <TableRow key={ing.id}>
                <TableCell><span className="font-bold text-slate-700">{ing.name}</span></TableCell>
                <TableCell><span className="font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded">{ing.stock} {ing.unit}</span></TableCell>
                <TableCell><span className="text-slate-500">{ing.dailyConsumption} {ing.unit}</span></TableCell>
                <TableCell><StatusBadge status={ing.status} /></TableCell>
              </TableRow>
            ))}
          </ModernTable>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-slate-200 border-dashed">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
            <Coffee size={32} />
          </div>
          <h4 className="text-lg font-bold text-slate-800">No Active Orders</h4>
          <p className="text-slate-400 text-sm">Your order history will appear here.</p>
        </div>
      )}
    </div>
  );
};

const ResearchView = () => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in duration-500">
      <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between md:items-center gap-6 bg-slate-50/50">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Research Proposals</h3>
          <p className="text-slate-500 mt-1">Manage submissions, peer reviews, and publications.</p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 flex items-center gap-2 transition-all shadow-lg shadow-slate-900/10">
          <Plus size={18} /> Submit Proposal
        </button>
      </div>
      <div className="divide-y divide-slate-100">
        {MOCK_RESEARCH.map((item) => (
          <div key={item.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center group">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-md">{item.id}</span>
                <StatusBadge status={item.status} />
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1"><Box size={12} /> {item.category}</span>
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors">{item.title}</h4>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
                <span className="flex items-center gap-1.5"><Users size={16} className="text-slate-400" /> {item.researcher}</span>
                <span className="flex items-center gap-1.5"><Calendar size={16} className="text-slate-400" /> {item.submissionDate}</span>
              </div>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none px-4 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-white hover:border-emerald-300 transition-all shadow-sm">Review</button>
              <button className="flex-1 sm:flex-none px-4 py-2 text-sm font-semibold text-emerald-700 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-all">Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TrainingView = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-end">
        <button className="flex items-center gap-2 text-sm bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl hover:bg-slate-50 transition-all font-medium shadow-sm">
          <UserCheck size={18} className="text-slate-400" /> Attendance Sheet
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_COURSES.map((course) => (
          <div key={course.id} className="group bg-white rounded-3xl shadow-sm border border-slate-200 p-8 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">
            <div className="absolute top-0 right-0 p-8">
              <StatusBadge status={course.status} />
            </div>
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-sm">
              <Users size={28} />
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight">{course.title}</h3>
            <p className="text-sm font-medium text-slate-400 mb-6 uppercase tracking-wider">{course.batch}</p>

            <div className="space-y-4 mt-auto border-t border-slate-50 pt-6">
              <div className="flex items-center text-sm text-slate-600 gap-3">
                <div className="p-1.5 bg-slate-50 rounded-lg"><Calendar size={16} className="text-slate-400" /></div>
                <span className="font-medium">{course.startDate} - {course.endDate}</span>
              </div>
              <div className="flex items-center text-sm text-slate-600 gap-3">
                <div className="p-1.5 bg-slate-50 rounded-lg"><MapPin size={16} className="text-slate-400" /></div>
                <span className="font-medium">Academic Building 2</span>
              </div>
              <div className="flex items-center text-sm text-slate-600 gap-3">
                <div className="p-1.5 bg-slate-50 rounded-lg"><Users size={16} className="text-slate-400" /></div>
                <span className="font-medium">{course.trainees} Trainees Enrolled</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-8">
              <button className="py-2.5 border border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50 transition-colors">
                Manage
              </button>
              <button className="py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
                Certificate
              </button>
            </div>
          </div>
        ))}

        <button className="border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center text-slate-400 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50/30 transition-all min-h-[300px] group cursor-pointer">
          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:bg-emerald-100">
            <Plus size={32} />
          </div>
          <span className="font-bold text-lg">Create New Course</span>
          <span className="text-sm mt-1 opacity-70">Define schedule & content</span>
        </button>
      </div>
    </div>
  );
};

// --- MAIN EXPORT ---

export const ModuleContent: React.FC<{ moduleId: ModuleId }> = ({ moduleId }) => {
  switch (moduleId) {
    case ModuleId.ACCOUNTS: return <AccountsView />;
    case ModuleId.CAFETERIA: return <CafeteriaView />;
    case ModuleId.HOSTEL: return <HostelView />;
    case ModuleId.HRM: return <HrmView />;
    case ModuleId.INVENTORY: return <InventoryView />;
    case ModuleId.PROJECTS: return <ProjectsView />;
    case ModuleId.RESEARCH: return <ResearchView />;
    case ModuleId.TRAINING: return <TrainingView />;
    default: return <div className="p-12 text-center text-slate-400 animate-pulse">Loading module...</div>;
  }
};