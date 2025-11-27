import { LucideIcon } from 'lucide-react';

export enum ModuleId {
  DASHBOARD = 'dashboard',
  ACCOUNTS = 'accounts',
  CAFETERIA = 'cafeteria',
  HOSTEL = 'hostel',
  HRM = 'hrm',
  INVENTORY = 'inventory',
  PROJECTS = 'projects',
  RESEARCH = 'research',
  TRAINING = 'training'
}

export interface ModuleConfig {
  id: ModuleId;
  title: string;
  subtitle: string; // Bangla title
  icon: LucideIcon;
  description: string;
  stats?: { label: string; value: string; trend?: string }[];
}

export interface User {
  name: string;
  role: string;
  avatarUrl: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

// --- Module Specific Data Types ---

export interface Employee {
  id: string;
  name: string;
  designation: string;
  department: string;
  status: 'Active' | 'On Leave' | 'Suspended';
  joinDate: string;
  avatar: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netPay: number;
  status: 'Paid' | 'Processing' | 'Pending';
}

export interface LeaveRequest {
  id: string;
  employeeName: string;
  type: 'Sick' | 'Casual' | 'Earned';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface AttendanceRecord {
  id: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'Present' | 'Late' | 'Absent';
}

export interface Voucher {
  id: string;
  date: string;
  head: string; // Account Head
  amount: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedBy: string;
}

export interface Project {
  id: string;
  title: string;
  director: string;
  budget: number;
  spent: number;
  progress: number; // 0-100
  status: 'Planning' | 'Ongoing' | 'Completed' | 'Delayed';
  milestones: { title: string; completed: boolean }[];
  documents: { name: string; type: string; date: string }[];
}

export interface Room {
  id: string;
  number: string;
  building: string;
  type: 'Single' | 'Double' | 'VIP';
  status: 'Available' | 'Occupied' | 'Maintenance';
  occupant?: string;
}

export interface HostelRequest {
  id: string;
  guestName: string;
  purpose: string;
  checkInDate: string;
  duration: string;
  status: 'Pending' | 'Allocated' | 'Rejected';
}

export interface StockItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
  lastUpdated: string;
}

export interface InventoryRequest {
  id: string;
  itemName: string;
  quantity: number;
  requestedBy: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface MealItem {
  id: string;
  name: string;
  price: number;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  available: boolean;
  image: string;
}

export interface Ingredient {
  id: string;
  name: string;
  stock: number;
  unit: string;
  dailyConsumption: number;
  status: 'Good' | 'Low';
}

export interface ResearchProposal {
  id: string;
  title: string;
  researcher: string;
  submissionDate: string;
  status: 'Submitted' | 'Under Review' | 'Approved' | 'Published';
  category: string;
}

export interface TrainingCourse {
  id: string;
  title: string;
  batch: string;
  startDate: string;
  endDate: string;
  trainees: number;
  instructor: string;
  status: 'Upcoming' | 'Active' | 'Completed';
}