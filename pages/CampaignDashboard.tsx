
import React, { useState, useEffect, useRef } from 'react';
import { 
  Briefcase, Search, ArrowLeft, MoreHorizontal, PlusCircle, 
  ChevronLeft, ChevronRight, Filter, Link, Upload, Plus, History,
  RotateCcw, MoreVertical, HelpCircle, X, Check, Calendar, Power,
  BarChart, PieChart, TrendingUp, CheckCircle, Clock, Users
} from 'lucide-react';
import { Campaign, PanelMember, CampaignActivity } from '../types';
import { PANEL_MEMBERS, CAMPAIGN_ACTIVITIES } from '../data';

// --- SUB-COMPONENTS ---

const CampaignHeader = ({ campaign, isScrolled }: { campaign: Campaign, isScrolled: boolean }) => {
  return (
    <div className={`bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-0'}`}>
      <div className="flex flex-col lg:flex-row">
        {/* Left Side: Campaign Info */}
        <div className={`flex-1 flex items-start gap-4 transition-all duration-300 ${isScrolled ? 'px-6 items-center' : 'p-6'}`}>
          <div className="flex-shrink-0">
             <div className={`rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md transition-all duration-300 ${isScrolled ? 'w-10 h-10' : 'w-14 h-14'}`}>
                <Briefcase size={isScrolled ? 18 : 24} />
             </div>
          </div>
          <div className="flex-1 min-w-0">
             <div className="flex items-center gap-3 mb-1">
                <h1 className={`font-bold text-gray-800 truncate transition-all duration-300 ${isScrolled ? 'text-base' : 'text-lg'}`} title={campaign.name}>{campaign.name}</h1>
                
                {/* Always visible info */}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                   <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                   <span className="font-mono text-gray-700">ID: {campaign.jobID}</span>
                   <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                   <span className={campaign.daysLeft < 5 ? "text-red-500 font-medium" : "text-green-600 font-medium"}>
                      {campaign.daysLeft} Days Left
                   </span>
                </div>
             </div>
             
             {/* Collapsible Details */}
             <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600 transition-all duration-300 overflow-hidden ${isScrolled ? 'h-0 opacity-0' : 'h-auto opacity-100'}`}>
                <div className="flex items-center gap-1">
                   <span className="text-gray-400">Job Type:</span>
                   <span className="font-medium">{campaign.type || 'Direct Hire'}</span>
                </div>
                <div className="flex items-center gap-1">
                   <span className="text-gray-400">Location:</span>
                   <span className="font-medium">{campaign.location || 'Hyderabad (+1)'}</span>
                </div>
                <div className="flex items-center gap-1">
                   <span className="text-gray-400">Total Profiles:</span>
                   <span className="font-medium text-indigo-600">{campaign.profilesCount}</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SETTINGS VIEW ---

const ToggleSwitch = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
  <div 
    onClick={onChange}
    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${checked ? 'bg-indigo-600' : 'bg-gray-300'}`}
  >
    <div 
      className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-0'}`}
    />
    <span className={`absolute ml-1.5 text-[9px] font-bold text-white pointer-events-none ${checked ? 'opacity-100' : 'opacity-0'}`}>Yes</span>
    <span className={`absolute ml-6 text-[9px] font-bold text-gray-500 pointer-events-none ${checked ? 'opacity-0' : 'opacity-100'}`}>No</span>
  </div>
);

const UserChip = ({ text, badgeColor = "bg-blue-600", count }: { text: string, badgeColor?: string, count?: number }) => (
  <div className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-1.5 bg-white text-sm text-gray-700">
    <span>{text}</span>
    {count && <span className={`text-xs text-white px-1.5 py-0.5 rounded-full ${badgeColor}`}>{count}</span>}
    <button className="text-gray-400 hover:text-gray-600"><X size={14} /></button>
  </div>
);

const AvatarGroup = () => (
  <div className="flex items-center -space-x-2">
    <div className="w-8 h-8 rounded-full bg-red-700 text-white flex items-center justify-center text-xs border-2 border-white">AC</div>
    <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs border-2 border-white">HM</div>
    <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs border-2 border-white">AY</div>
    <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs border-2 border-white">MZ</div>
    <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs border-2 border-white">NT</div>
    <div className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center text-xs border-2 border-white">+182</div>
  </div>
);

const CampaignSettingsView = () => {
  const [formData, setFormData] = useState({
    title: 'Corporate TRC Recruiter',
    displayTitle: 'Job Title',
    status: 'Active',
    closingDate: '2026-07-02',
    publish: false,
    notifications: true,
    jobPosting: true,
    sourceAI: true,
    matchAI: true,
    engageAI: true,
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-lg font-bold text-gray-800">Campaign Details</h2>
        <button className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-500 mb-1">Campaign Title</label>
          <input 
            type="text" 
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-500 mb-1">Job Seeker Display Title</label>
          <div className="relative">
            <select 
              value={formData.displayTitle}
              onChange={(e) => setFormData({...formData, displayTitle: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
            >
              <option>Job Title</option>
              <option>Campaign Title</option>
            </select>
            <ChevronRight size={16} className="absolute right-3 top-2.5 text-gray-400 rotate-90" />
          </div>
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-500 mb-1">Campaign Status</label>
          <div className="flex items-center gap-2 mt-2">
            <Power size={16} className="text-green-600" />
            <span className="text-sm text-gray-700">Active</span>
          </div>
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-500 mb-1">Closing Date</label>
          <div className="relative">
             <input 
               type="text" 
               value="02/07/2026"
               readOnly
               className="w-full border-none text-sm text-gray-700 focus:outline-none bg-transparent"
             />
             <Calendar size={16} className="absolute right-0 top-0 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Publish</label>
          <ToggleSwitch checked={formData.publish} onChange={() => setFormData({...formData, publish: !formData.publish})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Notifications</label>
          <ToggleSwitch checked={formData.notifications} onChange={() => setFormData({...formData, notifications: !formData.notifications})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Job Posting</label>
          <ToggleSwitch checked={formData.jobPosting} onChange={() => setFormData({...formData, jobPosting: !formData.jobPosting})} />
        </div>
        <div className="md:col-span-1">
           <label className="block text-sm font-medium text-gray-500 mb-1">Job Boards</label>
           <div className="flex flex-wrap gap-2 mb-2">
              <UserChip text="LinkedIn, AppCast" badgeColor="bg-blue-600" count={2} />
           </div>
           <div className="flex gap-2">
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">LinkedIn</span>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">AppCast</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Owners</label>
            <div className="flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 bg-white">
               <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">Carrie Vargas(TAC)</span>
                  <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">1</span>
               </div>
               <ChevronRight size={16} className="text-gray-400 rotate-90" />
            </div>
            <div className="mt-2">
               <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-medium">CV</div>
            </div>
         </div>
         <div>
            <div className="flex justify-between mb-1">
               <label className="block text-sm font-medium text-gray-500">Hiring Managers</label>
               <div className="flex items-center gap-1">
                  <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-xs text-gray-500">Select All</span>
               </div>
            </div>
            <div className="flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-400 text-sm">
               <span>Select</span>
               <ChevronRight size={16} className="rotate-90" />
            </div>
         </div>
         <div>
            <div className="flex justify-between mb-1">
               <label className="block text-sm font-medium text-gray-500">Recruiters</label>
               <div className="flex items-center gap-1">
                  <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-xs text-gray-500">Select All</span>
               </div>
            </div>
            <div className="flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 bg-white mb-2">
               <div className="flex items-center gap-2 overflow-hidden">
                  <span className="text-sm text-gray-700 truncate">Katherine Olguin(Recruiter), Pr...</span>
                  <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full shrink-0">99+</span>
               </div>
               <X size={16} className="text-gray-400 shrink-0" />
            </div>
            <AvatarGroup />
         </div>
      </div>

      <div className="flex gap-4 mb-8">
         <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded shadow-sm hover:bg-indigo-700">Copy Job Apply URL</button>
         <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded shadow-sm hover:bg-indigo-700">Create a Copy of the Campaign</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Source AI</label>
          <ToggleSwitch checked={formData.sourceAI} onChange={() => setFormData({...formData, sourceAI: !formData.sourceAI})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Match AI</label>
          <ToggleSwitch checked={formData.matchAI} onChange={() => setFormData({...formData, matchAI: !formData.matchAI})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Engage AI</label>
          <ToggleSwitch checked={formData.engageAI} onChange={() => setFormData({...formData, engageAI: !formData.engageAI})} />
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-gray-100">
         <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded hover:bg-gray-200">Cancel</button>
         <button className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded shadow-sm hover:bg-indigo-700">Save</button>
      </div>
    </div>
  );
};

// --- WIDGETS ---

const KPIMetricsWidget = () => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-8">
    <div className="flex justify-between items-center border-b border-gray-100 pb-4">
      <h3 className="font-bold text-gray-700 text-sm flex items-center gap-2">
         <BarChart size={16} className="text-indigo-600"/> Campaign Performance Metrics
      </h3>
      <select className="text-xs border border-gray-200 rounded px-2 py-1 bg-white focus:outline-none text-gray-600">
         <option>Last 30 Days</option>
         <option>Last 7 Days</option>
         <option>All Time</option>
      </select>
    </div>
    
    {/* 1. Sourcing Efficiency Metrics */}
    <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase mb-4 flex items-center gap-2">
            <PieChart size={14} /> Sourcing Efficiency
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Active vs Passive */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                <p className="text-xs font-medium text-gray-500 mb-2">Active vs. Passive Mix</p>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-blue-600">45%</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden flex">
                        <div className="w-[45%] bg-blue-500"></div>
                        <div className="w-[55%] bg-purple-500"></div>
                    </div>
                    <span className="text-sm font-bold text-purple-600">55%</span>
                </div>
                <div className="flex justify-between text-[10px] text-gray-400">
                    <span>Inbound (Active)</span>
                    <span>Outbound (Passive)</span>
                </div>
            </div>

            {/* Source of Hire */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 flex items-center gap-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
                       <path className="text-gray-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"/>
                       <path className="text-blue-500" strokeDasharray="40, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                       <path className="text-green-500" strokeDasharray="30, 100" strokeDashoffset="-40" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                       <path className="text-orange-400" strokeDasharray="20, 100" strokeDashoffset="-70" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                    </svg>
                </div>
                <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-[10px]"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Job Boards</span> <span className="font-bold">40%</span></div>
                    <div className="flex justify-between text-[10px]"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Internal DB</span> <span className="font-bold">30%</span></div>
                    <div className="flex justify-between text-[10px]"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-400"></span> Referrals</span> <span className="font-bold">20%</span></div>
                </div>
            </div>

            {/* DB Utilization */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 flex flex-col justify-center">
                <p className="text-xs font-medium text-gray-500 mb-2">Database Utilization Rate</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-green-600">68%</span>
                    <span className="text-xs text-green-600 flex items-center"><TrendingUp size={10} className="mr-1"/> +12%</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Hires rediscovered from internal DB</p>
            </div>
        </div>
    </div>

    {/* 2. Candidate Quality Segmentation */}
    <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase mb-4 flex items-center gap-2">
            <Check size={14} /> Quality Segmentation (Skill-Based)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <div className="lg:col-span-3 bg-white border border-gray-100 rounded-lg p-4">
                <div className="flex items-end gap-4 h-32 px-4 pb-2 border-b border-gray-100">
                    {/* Good */}
                    <div className="flex-1 flex flex-col justify-end items-center gap-2 group">
                        <span className="text-xs font-bold text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">18</span>
                        <div className="w-full bg-green-100 hover:bg-green-200 rounded-t h-[60%] relative transition-all"></div>
                        <span className="text-[10px] font-medium text-gray-500">Good (80%+)</span>
                    </div>
                    {/* Okay */}
                    <div className="flex-1 flex flex-col justify-end items-center gap-2 group">
                        <span className="text-xs font-bold text-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity">42</span>
                        <div className="w-full bg-yellow-100 hover:bg-yellow-200 rounded-t h-[85%] relative transition-all"></div>
                        <span className="text-[10px] font-medium text-gray-500">Okay (60-79%)</span>
                    </div>
                    {/* Bad */}
                    <div className="flex-1 flex flex-col justify-end items-center gap-2 group">
                        <span className="text-xs font-bold text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">12</span>
                        <div className="w-full bg-red-100 hover:bg-red-200 rounded-t h-[30%] relative transition-all"></div>
                        <span className="text-[10px] font-medium text-gray-500">Bad (&lt;60%)</span>
                    </div>
                </div>
             </div>
             
             <div className="flex flex-col justify-center items-center bg-indigo-50 rounded-lg border border-indigo-100 p-4 text-center">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full mb-2"><CheckCircle size={24} /></div>
                <span className="text-3xl font-bold text-indigo-700">18</span>
                <span className="text-xs text-indigo-600 font-medium">Qualified Candidates</span>
                <span className="text-[9px] text-indigo-400 mt-1">Interview Ready</span>
             </div>
        </div>
    </div>

    {/* 3. Pipeline Health */}
    <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase mb-4 flex items-center gap-2">
            <Filter size={14} /> Pipeline Health & Drip Flow
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Yield Ratio */}
            <div className="col-span-2 bg-slate-50 border border-slate-100 rounded-lg p-4">
                <p className="text-xs font-medium text-gray-500 mb-4">Yield Ratio (Conversion)</p>
                <div className="flex items-center gap-1">
                    <div className="flex-1 relative h-10 bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 pl-2 rounded-l-md">
                        App (100%)
                    </div>
                    <div className="flex-1 relative h-10 bg-blue-200 flex items-center justify-center text-[10px] font-bold text-blue-800 pl-2 border-l border-white">
                        Screen (65%)
                    </div>
                    <div className="flex-1 relative h-10 bg-indigo-200 flex items-center justify-center text-[10px] font-bold text-indigo-800 pl-2 border-l border-white">
                        Intvw (40%)
                    </div>
                    <div className="flex-1 relative h-10 bg-green-200 flex items-center justify-center text-[10px] font-bold text-green-800 pl-2 border-l border-white rounded-r-md">
                        Offer (10%)
                    </div>
                </div>
            </div>

            {/* Time Metrics */}
            <div className="space-y-3">
                <div className="bg-white border border-gray-100 rounded-lg p-3 flex justify-between items-center">
                    <span className="text-xs text-gray-500">App Completion Rate</span>
                    <span className="text-sm font-bold text-gray-800">82%</span>
                </div>
                <div className="bg-white border border-gray-100 rounded-lg p-3 flex justify-between items-center">
                    <span className="text-xs text-gray-500">Submit-to-Interview</span>
                    <span className="text-sm font-bold text-gray-800">1 : 1.5</span>
                </div>
                <div className="bg-white border border-gray-100 rounded-lg p-3 flex justify-between items-center">
                    <span className="text-xs text-gray-500">Avg Time per Stage</span>
                    <span className="text-sm font-bold text-gray-800">2.4 Days</span>
                </div>
            </div>
        </div>
    </div>
  </div>
);

const PanelMembersWidget = () => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col h-full">
     <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-bold text-gray-700 text-sm">Panel Members</h3>
        <button className="text-gray-400 hover:text-green-600"><PlusCircle size={16} /></button>
     </div>
     <div className="flex-1 overflow-y-auto p-2 space-y-1 max-h-[300px] scrollbar-thin">
        {PANEL_MEMBERS.map(member => (
           <div key={member.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg group">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${member.color} shadow-sm flex-shrink-0`}>
                 {member.initials}
              </div>
              <div className="min-w-0 flex-1">
                 <p className="text-xs font-medium text-gray-800 truncate" title={member.role}>{member.role}</p>
                 <p className="text-[10px] text-gray-500">{member.subRole}</p>
              </div>
              <div className="w-1 h-8 bg-gray-200 rounded-full opacity-0 group-hover:opacity-100"></div>
           </div>
        ))}
     </div>
  </div>
);

const RemindersWidget = () => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col h-full">
     <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-bold text-gray-700 text-sm">Reminders</h3>
        <div className="flex items-center gap-2">
           <button className="text-gray-400 hover:text-green-600"><PlusCircle size={16} /></button>
           <div className="flex bg-gray-100 rounded p-0.5">
              <button className="px-2 py-0.5 text-[10px] bg-white shadow-sm rounded text-gray-700 font-medium">Upcoming</button>
              <button className="px-2 py-0.5 text-[10px] text-gray-500 hover:text-gray-700">Previous</button>
           </div>
        </div>
     </div>
     <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <p className="text-xs text-gray-400 mb-2">No Upcoming Reminders</p>
     </div>
     <div className="p-3 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400">
        <span>Total Rows: 0</span>
        <div className="flex items-center gap-1">
           <span>10 / page</span>
           <div className="flex gap-1 ml-2">
              <button className="hover:text-gray-600"><ChevronLeft size={12} /></button>
              <button className="hover:text-gray-600"><ChevronRight size={12} /></button>
           </div>
        </div>
     </div>
  </div>
);

const NotesWidget = () => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col h-full">
     <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-bold text-gray-700 text-sm">Notes</h3>
        <button className="text-gray-400 hover:text-green-600"><PlusCircle size={16} /></button>
     </div>
     <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <p className="text-xs text-gray-400">No Notes Found</p>
     </div>
  </div>
);

const ActivityItem = ({ item }: { item: any }) => {
   const isLink = item.type === 'link';
   const isUpload = item.type === 'upload';
   
   return (
      <div className="flex gap-4 group relative pb-8 last:pb-0">
         <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm z-10 ${isLink ? 'bg-green-100 text-green-600' : isUpload ? 'bg-sky-100 text-sky-600' : 'bg-gray-100 text-gray-500'}`}>
               {isLink && <Link size={14} />}
               {isUpload && <Upload size={14} />}
            </div>
            <div className="w-px h-full bg-gray-200 absolute top-8 bottom-0 left-4 group-last:hidden"></div>
         </div>
         <div className="flex-1 pt-1 pb-4 border-b border-gray-50 group-last:border-0">
            <p className="text-xs text-green-600 font-medium mb-0.5 hover:underline cursor-pointer">{item.title}</p>
            <p className="text-[10px] text-gray-500 mb-1">{item.subtitle}</p>
            <div className="flex items-center gap-2 text-[10px] text-gray-400">
               <span>by <span className="text-gray-600">{item.author}</span></span>
               <span>•</span>
               <span>{item.time}</span>
            </div>
         </div>
      </div>
   );
};

const ActivitiesWidget = () => (
   <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
         <h3 className="font-bold text-gray-700 text-sm">Campaign Activities</h3>
         <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-1 text-[10px] text-gray-500 cursor-pointer bg-gray-50 px-2 py-1 rounded border border-gray-200 hover:bg-gray-100">
               <input type="checkbox" className="rounded text-green-600 border-gray-300 focus:ring-green-500 w-3 h-3" defaultChecked />
               Select All Activity Types
            </label>
            <select className="text-[10px] border border-gray-200 rounded px-2 py-1 bg-white focus:outline-none focus:border-green-500 text-gray-600">
               <option>Select activity type</option>
            </select>
            <div className="relative">
               <input type="text" placeholder="Select Date Range" className="text-[10px] border border-gray-200 rounded px-2 py-1 pl-7 bg-white focus:outline-none focus:border-green-500 text-gray-600 w-32" />
               <History size={10} className="absolute left-2 top-1.5 text-gray-400" />
            </div>
            <button className="flex items-center gap-1 text-[10px] font-bold text-gray-600 hover:text-green-600"><Filter size={10} /> Filter</button>
         </div>
      </div>

      <div className="space-y-8">
         {CAMPAIGN_ACTIVITIES.map(group => (
            <div key={group.id}>
               <h4 className="text-xs font-bold text-green-600 mb-4">{group.date}</h4>
               <div className="pl-2">
                  {group.items.map(item => (
                     <ActivityItem key={item.id} item={item} />
                  ))}
               </div>
            </div>
         ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center text-[10px] text-green-600 font-medium">
         <span>Showing 1-10 of 104 Activities</span>
         <div className="flex items-center gap-2 mt-2 sm:mt-0 text-gray-500">
            <div className="flex items-center border border-gray-200 rounded px-1">
               <span>10 / page</span>
               <ChevronDownIcon className="ml-1 w-3 h-3" />
            </div>
            <div className="flex items-center gap-1 ml-2">
               <button className="w-5 h-5 flex items-center justify-center hover:bg-gray-100 rounded text-gray-400">&lt;</button>
               <button className="w-5 h-5 flex items-center justify-center border border-green-500 text-green-600 rounded">1</button>
               <button className="w-5 h-5 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600">2</button>
               <button className="w-5 h-5 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600">3</button>
               <button className="w-5 h-5 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600">4</button>
               <button className="w-5 h-5 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600">5</button>
               <span className="text-gray-400">...</span>
               <button className="w-5 h-5 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600">11</button>
               <button className="w-5 h-5 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600">&gt;</button>
            </div>
            <div className="flex items-center gap-1 ml-2">
               <span>Go to</span>
               <input type="text" className="w-8 border border-gray-200 rounded text-center" />
            </div>
         </div>
      </div>
   </div>
);

// --- MAIN PAGE COMPONENT ---

export const CampaignDashboard = ({ campaign, activeTab }: { campaign: Campaign, activeTab: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [intelligenceSubView, setIntelligenceSubView] = useState<'OVERVIEW' | 'ACTIVITIES'>('OVERVIEW');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setIsScrolled(scrollContainerRef.current.scrollTop > 50);
      }
    };
    const container = scrollContainerRef.current;
    if (container) container.addEventListener('scroll', handleScroll);
    return () => { if (container) container.removeEventListener('scroll', handleScroll); };
  }, []);

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden animate-in fade-in duration-300">
       <CampaignHeader campaign={campaign} isScrolled={isScrolled} />
       
       <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar">
          {activeTab === 'Sharing' ? (
             <div className="max-w-6xl mx-auto">
               <CampaignSettingsView />
             </div>
          ) : activeTab === 'Intelligence' ? (
             <>
               {/* Toggle Sub-nav */}
               <div className="flex items-center gap-4 mb-6 border-b border-gray-200">
                  <button 
                    onClick={() => setIntelligenceSubView('OVERVIEW')}
                    className={`pb-2 text-sm font-medium transition-colors border-b-2 ${intelligenceSubView === 'OVERVIEW' ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    Overview
                  </button>
                  <button 
                    onClick={() => setIntelligenceSubView('ACTIVITIES')}
                    className={`pb-2 text-sm font-medium transition-colors border-b-2 ${intelligenceSubView === 'ACTIVITIES' ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    Activity Log
                  </button>
               </div>

               {intelligenceSubView === 'OVERVIEW' ? (
                   <div className="space-y-6">
                       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          <div className="lg:col-span-1 h-[350px]"><PanelMembersWidget /></div>
                          <div className="lg:col-span-1 h-[350px]"><RemindersWidget /></div>
                          <div className="lg:col-span-1 h-[350px]"><NotesWidget /></div>
                       </div>
                       <div className="w-full">
                          <KPIMetricsWidget />
                       </div>
                   </div>
               ) : (
                   <div className="w-full">
                      <ActivitiesWidget />
                   </div>
               )}
             </>
          ) : (
             <div className="p-8 text-center text-gray-500">
                View for {activeTab} is coming soon.
             </div>
          )}
       </div>
    </div>
  );
};

const ChevronDownIcon = ({ className }: { className?: string }) => (
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6"/>
   </svg>
);
