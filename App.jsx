
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  Users, Home as HomeIcon, Briefcase, BarChart2, MessageCircle, HelpCircle, ChevronRight,
  ChevronLeft, FileText, Activity, Folder, ThumbsUp, Copy, CheckCircle, Brain, Search, GitBranch, Share2,
  UserPlus, Building2, LogOut, Settings, Lock, UserCog, Phone, User, X, Link, Upload, Loader2, Mail, MapPin, Moon, Sun
} from 'lucide-react';
import { Home } from './pages/Home.jsx';
import { Campaigns } from './pages/Campaigns.jsx';
import { Profiles } from './pages/Profiles.jsx';
import { Metrics } from './pages/Metrics.jsx';
import { CandidateProfile } from './pages/CandidateProfile.jsx';
import { CampaignDashboard } from './pages/CampaignDashboard.jsx';
import { CANDIDATE } from './data.js';
import { INITIAL_NODES_GRAPH } from './components/engage/demoData.js';
import { ToastProvider, useToast } from './components/Toast.jsx';

// --- MODALS ---

const CreateProfileModal = ({ isOpen, onClose }) => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    title: '',
    company: '',
    location: '',
    source: 'Direct',
    skills: ''
  });

  if (!isOpen) return null;

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    simulateUpload(e.dataTransfer.files[0]?.name);
  };

  const simulateUpload = (fileName) => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      // Simulate parsing
      setFormData({
        firstName: 'Alex',
        lastName: 'Morgan',
        email: 'alex.morgan@example.com',
        phone: '+1 (555) 012-3456',
        title: 'Senior Software Engineer',
        company: 'TechFlow Inc.',
        location: 'San Francisco, CA',
        source: 'Upload',
        skills: 'React, TypeScript, Node.js'
      });
      setActiveTab('manual'); // Switch to review
      addToast("Resume parsed successfully! Please review details.", "success");
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast(`Profile created for ${formData.firstName} ${formData.lastName}`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-700 rounded-xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800">Create Profile</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:bg-slate-700 rounded-full text-slate-400 hover:text-slate-600 dark:text-slate-300 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex gap-4 mb-6 border-b border-slate-100 dark:border-slate-700 pb-1">
            <button
              onClick={() => setActiveTab('upload')}
              className={`pb-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'upload' ? 'border-emerald-500 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
              Upload Resume
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`pb-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'manual' ? 'border-emerald-500 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
              Manual Entry
            </button>
          </div>

          {activeTab === 'upload' ? (
            <div
              className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-all ${isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300 hover:bg-slate-50'}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {uploading ? (
                <div className="flex flex-col items-center">
                  <Loader2 size={48} className="text-emerald-500 animate-spin mb-4" />
                  <p className="text-slate-600 dark:text-slate-300 font-medium">Parsing resume...</p>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4 text-slate-400">
                    <Upload size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-2">Drop resume here</h3>
                  <p className="text-sm text-slate-500 mb-6">Supported formats: PDF, DOCX, TXT</p>
                  <button className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-700 shadow-sm">
                    Browse Files
                  </button>
                </>
              )}
            </div>
          ) : (
            <form id="create-profile-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">First Name *</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-2.5 text-slate-400" />
                  <input
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="John"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Last Name *</label>
                <input
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="Doe"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Email *</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-2.5 text-slate-400" />
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Phone</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-2.5 text-slate-400" />
                  <input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Job Title</label>
                <div className="relative">
                  <Briefcase size={16} className="absolute left-3 top-2.5 text-slate-400" />
                  <input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="e.g. Software Engineer"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Current Company</label>
                <input
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="Current Employer"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Location</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-2.5 text-slate-400" />
                  <input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="City, State"
                  />
                </div>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Skills (Comma separated)</label>
                <textarea
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none h-20 resize-none"
                  placeholder="Java, Python, Leadership, etc."
                />
              </div>
            </form>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-200 rounded-lg transition-colors text-sm">Cancel</button>
          {activeTab === 'manual' ? (
            <button form="create-profile-form" type="submit" className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 shadow-sm transition-colors text-sm flex items-center gap-2">
              <CheckCircle size={16} /> Create Profile
            </button>
          ) : (
            <button onClick={() => setActiveTab('manual')} className="px-6 py-2 bg-slate-200 text-slate-600 dark:text-slate-300 font-bold rounded-lg hover:bg-slate-300 transition-colors text-sm">
              Skip Upload
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [candidateTab, setCandidateTab] = useState('profile');
  const [isCreateProfileOpen, setIsCreateProfileOpen] = useState(false);
  const [profilesView, setProfilesView] = useState('SEARCH');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // React Router Hooks
  const location = useLocation();
  const navigate = useNavigate();

  // Campaign Context Navigation Helper (Moved from state to URL param logic in sub-components, 
  // but Sidebar need to know context. For simplicity, we'll keep sidebar mostly static 
  // or use location.pathname to determine sidebar state).

  const [isSourceHovered, setIsSourceHovered] = useState(false);

  const [isEngageHovered, setIsEngageHovered] = useState(false);
  const [campaignTab, setCampaignTab] = useState('Intelligence');

  // Candidate Navigation Item Helper
  const NavItem = ({ id, icon: Icon, label, activeTab, setActiveTab, onClick }) => (
    <button
      onClick={(e) => {
        if (onClick) onClick(e);
        else setActiveTab(id);
      }}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm ${activeTab === id ? 'bg-white dark:bg-slate-700 shadow-sm text-emerald-700 dark:text-emerald-400 font-medium translate-x-1' : 'text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white dark:hover:text-white'}`}
    >
      <Icon size={16} /> {label}
    </button>
  );

  const SubNavItem = ({ id, label, activeTab, setActiveTab, onClick }) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
        else setActiveTab(id);
      }}
      className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-xs ${activeTab === id ? 'text-emerald-700 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-900/30' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:text-slate-200 dark:hover:text-slate-200 hover:bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-700'}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${activeTab === id ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
      {label}
    </button>
  );

  const SidebarFooter = ({ setIsCreateProfileOpen }) => (
    <div className="p-2 border-t border-slate-200 dark:border-slate-700 dark:border-slate-700 bg-white dark:bg-slate-700 mt-auto space-y-1 shrink-0">
      {/* Create Profile */}
      <button
        onClick={() => setIsCreateProfileOpen(true)}
        className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-700 rounded-md transition-colors group"
      >
        <UserPlus size={18} className="text-slate-400 group-hover:text-emerald-600" />
        <span className="text-sm font-medium">Create Profile</span>
      </button>

      {/* Switch Client */}
      <div className="relative group/client">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-700 rounded-md transition-colors group">
          <Building2 size={18} className="text-slate-400 group-hover:text-emerald-600" />
          <span className="text-sm font-medium truncate">TRC Talent Solutions</span>
        </button>

        {/* Client List Popover */}
        <div className="absolute left-full bottom-0 ml-2 w-64 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-700 dark:border-slate-700 rounded-lg shadow-xl hidden group-hover/client:block p-1 z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="px-3 py-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-50 dark:bg-slate-700 rounded-t mb-1">Switch Client</div>
          <button className="w-full text-left px-3 py-2 text-sm text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-700 rounded flex items-center justify-between font-medium">
            TRC Talent Solutions <CheckCircle size={14} className="text-emerald-600" />
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-700 rounded hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Amazon Warehouse Operations
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-700 rounded hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Google Staffing Services
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-700 rounded hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Microsoft HR Tech
          </button>
        </div>
      </div>

      {/* User Account */}
      <div className="relative group/account pt-2">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-700 rounded-md transition-colors">
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300 shrink-0">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" className="w-full h-full object-cover" />
          </div>
          <div className="text-left flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">Pratik</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 truncate">My Account</p>
          </div>
        </button>

        {/* Account Popover */}
        <div className="absolute left-full bottom-0 ml-4 w-72 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-700 dark:border-slate-700 rounded-lg shadow-xl hidden group-hover/account:block z-50 animate-in fade-in zoom-in-95 duration-200">
          {/* Triangle */}
          <div className="absolute bottom-6 -left-2 w-4 h-4 bg-white dark:bg-slate-700 transform rotate-45 border-l border-b border-slate-200 dark:border-slate-700 dark:border-slate-700"></div>

          <div className="p-5 border-b border-slate-100 dark:border-slate-700 dark:border-slate-700 flex flex-col items-center text-center bg-white dark:bg-slate-700 rounded-t-lg relative">
            <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border-4 border-white dark:border-slate-600 shadow-md mb-3">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" className="w-full h-full object-cover" />
            </div>
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg">Pratik</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">pratik.gaurav@trcdemo.com</p>

            <div className="w-full border-t border-slate-100 dark:border-slate-700 dark:border-slate-700 pt-3 space-y-2">
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 px-2">
                <User size={16} className="text-slate-400 dark:text-slate-500" />
                <span className="font-medium">Product Admin</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 px-2">
                <Phone size={16} className="text-slate-400 dark:text-slate-500" />
                <span className="font-mono text-xs">+917004029399</span>
              </div>
            </div>
          </div>

          <div className="py-2 bg-white dark:bg-slate-700 rounded-b-lg">
            <div className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-700 cursor-pointer group/item">
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-400 transition-colors">
                <User size={16} />
                <span className="font-medium">My Account</span>
              </div>
              <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 flex items-center justify-center text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-help">?</div>
            </div>

            <div
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-700 cursor-pointer group/item"
            >
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-400 transition-colors">
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                <span className="font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </div>
              <div className={`w-8 h-4 rounded-full relative transition-colors ${darkMode ? 'bg-emerald-600' : 'bg-slate-300'}`}>
                <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white dark:bg-slate-700 rounded-full transition-transform ${darkMode ? 'translate-x-4' : 'translate-x-0'}`}></div>
              </div>
            </div>

            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-700 hover:text-emerald-600 transition-colors font-medium">
              <Settings size={16} /> Admin Settings
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-700 hover:text-emerald-600 transition-colors font-medium">
              <UserCog size={16} /> Product Admin Settings
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-700 hover:text-emerald-600 transition-colors font-medium">
              <Lock size={16} /> Change Password
            </button>
            <div className="border-t border-slate-100 dark:border-slate-700 my-1"></div>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSidebar = () => {
    // 1. Candidate Context Sidebar
    if (location.pathname.startsWith('/candidate/')) {
      return (
        <div className="flex-1 relative overflow-hidden flex flex-col h-full bg-slate-50/50">
          <div className="p-4 pb-2">
            <button
              onClick={() => navigate('/profiles')}
              className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-emerald-600 mb-4 px-1 group transition-colors"
            >
              <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Search
            </button>
            <div className="flex items-center gap-3 mb-2 px-1">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold border-2 border-white shadow-sm shrink-0">TM</div>
              <div className="leading-tight min-w-0">
                <p className="font-bold text-slate-800 dark:text-slate-200 text-sm truncate">{CANDIDATE.name}</p>
                <p className="text-[10px] text-emerald-600 font-medium uppercase truncate flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{CANDIDATE.availability}
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-4 space-y-6">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">General</p>
              <div className="space-y-0.5">
                <NavItem id="profile" icon={Users} label="Profile Details" activeTab={candidateTab} setActiveTab={setCandidateTab} />
                <NavItem id="resume" icon={FileText} label="Resume" activeTab={candidateTab} setActiveTab={setCandidateTab} />
                <NavItem id="activity" icon={Activity} label="Activity" activeTab={candidateTab} setActiveTab={setCandidateTab} />
                <NavItem id="chat" icon={MessageCircle} label="Talent Chat" activeTab={candidateTab} setActiveTab={setCandidateTab} />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Matching</p>
              <div className="space-y-0.5">
                <NavItem id="campaigns" icon={Briefcase} label="Linked Campaigns" activeTab={candidateTab} setActiveTab={setCandidateTab} />
                <NavItem id="folders" icon={Folder} label="Linked Folders" activeTab={candidateTab} setActiveTab={setCandidateTab} />
                <NavItem id="interviews" icon={MessageCircle} label="Interviews" activeTab={candidateTab} setActiveTab={setCandidateTab} />
                <NavItem id="recommended" icon={ThumbsUp} label="Recommended" activeTab={candidateTab} setActiveTab={setCandidateTab} />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">System</p>
              <div className="space-y-0.5">
                <NavItem id="duplicate" icon={Copy} label="Duplicate Profile" activeTab={candidateTab} setActiveTab={setCandidateTab} />
                <NavItem id="similar" icon={Users} label="Similar Profiles" activeTab={candidateTab} setActiveTab={setCandidateTab} />
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 2. Campaign Dashboard Context Sidebar
    if (location.pathname.startsWith('/campaign/')) {
      // We'd ideally need the campaign object here to show name/ID in sidebar.
      // For now, we will use a placeholder or rely on context if we had one.
      // Skipping dynamic name for this iteration to keep it simple, or using param?
      // Let's assume we can't easily get the name without fetching. 
      // We will keep the layout but maybe "Loading..." or just "Campaign".
      // Actually, we can pass state via navigate if we come from list, but direct link wouldn't have it.
      // Better to have CampaignDashboard fetch IT and update a context?
      // For this refactor, I will just hardcode "Campaign View" or keep generic.
      // Wait, the original code used `selectedCampaign` state.
      // I will rely on the `CampaignDashboard` to render the content, sidebar might be slightly less informative 
      // regarding the specific campaign name unless we lift state up or use a Context.
      // I will leave the sidebar "Campaign Tools" generic for now as per instructions to just route.
      // OR, I can use a global Context for "Current Campaign" set by the page.
      // Let's stick to the structure but remove `selectedCampaign.name` dependency in sidebar for now 
      // or mock it.
      const campaignId = location.pathname.split('/').pop();

      return (
        <div className="flex-1 relative overflow-hidden flex flex-col h-full bg-slate-50/50">
          <div className="p-4 pb-2">
            <button
              onClick={() => navigate('/activecampaigns')}
              className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-emerald-600 mb-4 px-1 group transition-colors"
            >
              <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to List
            </button>
            <div className="flex items-center gap-3 mb-4 px-1">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm shrink-0">
                <Briefcase size={20} />
              </div>
              <div className="leading-tight min-w-0">
                <p className="font-bold text-slate-800 dark:text-slate-200 text-xs truncate">Campaign {campaignId}</p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">ID: {campaignId}</p>
              </div>
            </div>
          </div>
          {/* ... Sidebar content ... (Simplified for brevity, keeping structure) */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-4 space-y-6">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Campaign Tools</p>
              {/* Note: Active tab state logic here is tricky without props drilling or context. 
                  For now, we'll just show the menu. Real app would sync this with URL params/hash */}
              <div className="space-y-0.5">
                <NavItem id="Intelligence" icon={Brain} label="Intelligence" activeTab={campaignTab} setActiveTab={setCampaignTab} />

                <div className="relative" onMouseEnter={() => setIsSourceHovered(true)} onMouseLeave={() => setIsSourceHovered(false)}>
                  <NavItem id="Source AI" icon={Search} label="Source AI" activeTab={campaignTab} onClick={() => setCampaignTab('Source AI')} />
                  {(isSourceHovered || campaignTab.startsWith('Source AI')) && (
                    <div className="ml-9 mt-1 space-y-1 border-l-2 border-slate-100 dark:border-slate-700 pl-2 mb-2 animate-in slide-in-from-top-1 duration-200">
                      <SubNavItem id="Source AI:ATTACH" label="Attach People" activeTab={campaignTab} setActiveTab={setCampaignTab} />
                      <SubNavItem id="Source AI:ATTACHED" label="Attached People" activeTab={campaignTab} setActiveTab={setCampaignTab} />
                      <SubNavItem id="Source AI:INTEGRATIONS" label="Integrations" activeTab={campaignTab} setActiveTab={setCampaignTab} />
                      <SubNavItem id="Source AI:JD" label="Job Description" activeTab={campaignTab} setActiveTab={setCampaignTab} />
                    </div>
                  )}
                </div>

                <NavItem id="Match AI" icon={GitBranch} label="Match AI" activeTab={campaignTab} setActiveTab={setCampaignTab} />

                <div className="relative" onMouseEnter={() => setIsEngageHovered(true)} onMouseLeave={() => setIsEngageHovered(false)}>
                  <NavItem id="Engage AI" icon={MessageCircle} label="Engage AI" activeTab={campaignTab} onClick={() => setCampaignTab('Engage AI')} />
                  {(isEngageHovered || campaignTab.startsWith('Engage AI')) && (
                    <div className="ml-9 mt-1 space-y-1 border-l-2 border-slate-100 dark:border-slate-700 pl-2 mb-2 animate-in slide-in-from-top-1 duration-200">
                      <SubNavItem id="Engage AI:BUILDER" label="Workflow Builder" activeTab={campaignTab} setActiveTab={setCampaignTab} />
                      <SubNavItem id="Engage AI:CANDIDATES" label="Candidate List" activeTab={campaignTab} setActiveTab={setCampaignTab} />
                      <SubNavItem id="Engage AI:PANEL" label="Interview Panel" activeTab={campaignTab} setActiveTab={setCampaignTab} />
                    </div>
                  )}
                </div>

                <NavItem id="Sharing" icon={Share2} label="Sharing & Settings" activeTab={campaignTab} setActiveTab={setCampaignTab} />
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 3. Default Global Sidebar
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        <button
          onClick={() => navigate('/dashboard')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all ${location.pathname === '/dashboard' ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50'}`}
        >
          <HomeIcon size={18} /> Home
        </button>
        <button
          onClick={() => navigate('/activecampaigns')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all ${location.pathname === '/activecampaigns' ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50'}`}
        >
          <Briefcase size={18} /> Campaigns
        </button>

        {/* Profiles Group */}
        <div className="group relative">
          <button
            onClick={() => { navigate('/profiles'); setProfilesView('SEARCH'); }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-all group ${location.pathname === '/profiles' ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50'}`}
          >
            <div className="flex items-center gap-3"><Users size={18} /> Profiles</div>
            <ChevronRight size={16} className="text-slate-400 group-hover:rotate-90 transition-transform" />
          </button>
          <div className="hidden group-hover:block ml-9 space-y-1 mt-1 animate-in slide-in-from-top-1">
            <button
              onClick={(e) => { e.stopPropagation(); navigate('/profiles'); setProfilesView('SEARCH'); }}
              className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-700 hover:text-emerald-600 ${profilesView === 'SEARCH' && location.pathname === '/profiles' ? 'text-emerald-600 font-medium' : 'text-slate-500'}`}
            >
              Search Profiles
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate('/profiles'); setProfilesView('FOLDERS'); }}
              className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-700 hover:text-emerald-600 ${profilesView === 'FOLDERS' && location.pathname === '/profiles' ? 'text-emerald-600 font-medium' : 'text-slate-500'}`}
            >
              Folders
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate('/profiles'); setProfilesView('TAGS'); }}
              className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-700 hover:text-emerald-600 ${profilesView === 'TAGS' && location.pathname === '/profiles' ? 'text-emerald-600 font-medium' : 'text-slate-500'}`}
            >
              Tags
            </button>
          </div>
        </div>

        <button
          onClick={() => navigate('/metrics')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all ${location.pathname === '/metrics' ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50'}`}
        >
          <BarChart2 size={18} /> Metrics
        </button>
      </div>
    );
  };

  return (
    <ToastProvider>
      <div className="flex h-screen bg-slate-50 dark:bg-slate-700 font-sans text-slate-600 dark:text-slate-300 overflow-hidden">
        <CreateProfileModal isOpen={isCreateProfileOpen} onClose={() => setIsCreateProfileOpen(false)} />

        {/* SIDEBAR */}
        <aside className="w-64 bg-white dark:bg-slate-700 border-r border-slate-200 dark:border-slate-700 dark:border-slate-800 flex-shrink-0 flex flex-col z-20">
          <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-slate-700 dark:border-slate-800 shrink-0">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mr-3"><Users className="text-white" size={18} /></div>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-lg">Maprecruit.ai</span>
          </div>

          {renderSidebar()}

          <SidebarFooter setIsCreateProfileOpen={setIsCreateProfileOpen} />
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden bg-white">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/activecampaigns" element={<Campaigns onNavigateToCampaign={(campaign) => navigate(`/campaign/${campaign.id}`)} />} />
            <Route path="/campaign/:id" element={<CampaignDashboard activeTab={campaignTab} />} />
            <Route path="/profiles" element={<Profiles onNavigateToProfile={() => navigate('/candidate/1')} view={profilesView} />} />
            <Route path="/candidate/:id" element={<CandidateProfile activeTab={candidateTab} />} />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </ToastProvider>
  );
}
