
import React, { useState } from 'react';
import { 
  Users, Home as HomeIcon, Briefcase, BarChart2, MessageCircle, HelpCircle, ChevronRight,
  ChevronLeft, FileText, Activity, Folder, ThumbsUp, Copy, CheckCircle, Brain, Search, GitBranch, Share2,
  UserPlus, Building2, LogOut, Settings, Lock, UserCog, Phone, User, X, Link
} from 'lucide-react';
import { Home } from './pages/Home';
import { Campaigns } from './pages/Campaigns';
import { Profiles } from './pages/Profiles';
import { Metrics } from './pages/Metrics';
import { CandidateProfile } from './pages/CandidateProfile';
import { CampaignDashboard } from './pages/CampaignDashboard';
import { CANDIDATE } from './data';
import { INITIAL_NODES_GRAPH } from './components/engage/demoData';
import { ToastProvider } from './components/Toast';
import { Campaign } from './types';

// --- MODALS ---

const CreateProfileModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
     <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
           <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <UserPlus size={20} className="text-emerald-600" /> Create New Profile
           </h3>
           <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-200 rounded-full transition-colors"><X size={20}/></button>
        </div>
        <div className="p-6 space-y-4">
           <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">First Name</label>
                 <input type="text" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" placeholder="John" />
              </div>
              <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Last Name</label>
                 <input type="text" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" placeholder="Doe" />
              </div>
           </div>
           <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
              <input type="email" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" placeholder="john.doe@company.com" />
           </div>
           <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone Number</label>
              <input type="tel" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" placeholder="+1 (555) 000-0000" />
           </div>
           
           <div className="pt-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Resume (Optional)</label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                  <FileText size={24} className="mx-auto text-slate-400 mb-2" />
                  <p className="text-sm text-slate-500">Drag & drop or <span className="text-emerald-600 font-medium">browse</span></p>
              </div>
           </div>

           <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-2">
              <button onClick={onClose} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors">Cancel</button>
              <button onClick={onClose} className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 shadow-sm transition-colors">Create Profile</button>
           </div>
        </div>
     </div>
  </div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState<'HOME' | 'CAMPAIGNS' | 'PROFILES' | 'METRICS' | 'CANDIDATE_PROFILE' | 'CAMPAIGN_DASHBOARD'>('HOME');
  const [profilesView, setProfilesView] = useState<'SEARCH' | 'FOLDERS' | 'TAGS'>('SEARCH');
  const [candidateTab, setCandidateTab] = useState('profile');
  const [isCreateProfileOpen, setIsCreateProfileOpen] = useState(false);
  
  // Campaign Context State
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [campaignTab, setCampaignTab] = useState('Intelligence');
  const [isSourceHovered, setIsSourceHovered] = useState(false);
  const [isEngageHovered, setIsEngageHovered] = useState(false);

  // Candidate Navigation Item Helper
  const NavItem = ({ id, icon: Icon, label, activeTab, setActiveTab, onClick }: any) => (
    <button 
      onClick={(e) => {
        if (onClick) onClick(e);
        else setActiveTab(id);
      }} 
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm ${activeTab === id ? 'bg-white shadow-sm text-emerald-700 font-medium translate-x-1' : 'text-slate-600 hover:bg-white/50 hover:text-slate-900'}`}
    >
      <Icon size={16} /> {label}
    </button>
  );

  const SubNavItem = ({ id, label, activeTab, setActiveTab }: any) => (
    <button 
      onClick={(e) => { e.stopPropagation(); setActiveTab(id); }} 
      className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-xs ${activeTab === id ? 'text-emerald-700 font-medium bg-emerald-50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${activeTab === id ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
      {label}
    </button>
  );

  const SidebarFooter = () => (
    <div className="p-2 border-t border-slate-200 bg-white mt-auto space-y-1 shrink-0">
        {/* Create Profile */}
        <button 
          onClick={() => setIsCreateProfileOpen(true)}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-md transition-colors group"
        >
            <UserPlus size={18} className="text-slate-400 group-hover:text-emerald-600" />
            <span className="text-sm font-medium">Create Profile</span>
        </button>
  
        {/* Switch Client */}
        <div className="relative group/client">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-md transition-colors group">
              <Building2 size={18} className="text-slate-400 group-hover:text-emerald-600" />
              <span className="text-sm font-medium truncate">TRC Talent Solutions</span>
          </button>
          
          {/* Client List Popover */}
          <div className="absolute left-full bottom-0 ml-2 w-64 bg-white border border-slate-200 rounded-lg shadow-xl hidden group-hover/client:block p-1 z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50 rounded-t mb-1">Switch Client</div>
              <button className="w-full text-left px-3 py-2 text-sm text-slate-800 bg-slate-50 rounded flex items-center justify-between font-medium">
                 TRC Talent Solutions <CheckCircle size={14} className="text-emerald-600"/>
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded hover:text-emerald-600 transition-colors">
                 Amazon Warehouse Operations
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded hover:text-emerald-600 transition-colors">
                 Google Staffing Services
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded hover:text-emerald-600 transition-colors">
                 Microsoft HR Tech
              </button>
          </div>
        </div>
  
        {/* User Account */}
        <div className="relative group/account pt-2">
           <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-md transition-colors">
               <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300 shrink-0">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" className="w-full h-full object-cover" />
               </div>
               <div className="text-left flex-1 min-w-0">
                   <p className="text-sm font-medium text-slate-700 truncate">Pratik</p>
                   <p className="text-xs text-slate-400 truncate">My Account</p>
               </div>
           </button>
  
           {/* Account Popover */}
           <div className="absolute left-full bottom-0 ml-4 w-72 bg-white border border-slate-200 rounded-lg shadow-xl hidden group-hover/account:block z-50 animate-in fade-in zoom-in-95 duration-200">
               {/* Triangle */}
               <div className="absolute bottom-6 -left-2 w-4 h-4 bg-white transform rotate-45 border-l border-b border-slate-200"></div>
               
               <div className="p-5 border-b border-slate-100 flex flex-col items-center text-center bg-white rounded-t-lg relative">
                   <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden border-4 border-white shadow-md mb-3">
                      <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" className="w-full h-full object-cover" />
                   </div>
                   <h4 className="font-bold text-slate-800 text-lg">Pratik</h4>
                   <p className="text-xs text-slate-500 mb-4">pratik.gaurav@trcdemo.com</p>
                   
                   <div className="w-full border-t border-slate-100 pt-3 space-y-2">
                      <div className="flex items-center gap-3 text-sm text-slate-600 px-2">
                          <User size={16} className="text-slate-400"/> 
                          <span className="font-medium">Product Admin</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600 px-2">
                          <Phone size={16} className="text-slate-400"/> 
                          <span className="font-mono text-xs">+917004029399</span>
                      </div>
                   </div>
               </div>
               
               <div className="py-2 bg-white rounded-b-lg">
                   <div className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 cursor-pointer group/item">
                      <div className="flex items-center gap-3 text-sm text-slate-600 group-hover/item:text-emerald-600 transition-colors">
                        <User size={16} /> 
                        <span className="font-medium">My Account</span>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs font-bold hover:bg-slate-200 transition-colors cursor-help">?</div>
                   </div>

                   <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors font-medium">
                      <Settings size={16} /> Admin Settings
                   </button>
                   <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors font-medium">
                      <UserCog size={16} /> Product Admin Settings
                   </button>
                   <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors font-medium">
                      <Lock size={16} /> Change Password
                   </button>
                   <div className="border-t border-slate-100 my-1"></div>
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
    if (currentPage === 'CANDIDATE_PROFILE') {
      return (
        <div className="flex-1 relative overflow-hidden flex flex-col h-full bg-slate-50/50">
            <div className="p-4 pb-2">
                <button 
                  onClick={() => setCurrentPage('PROFILES')} 
                  className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-emerald-600 mb-4 px-1 group transition-colors"
                >
                  <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Search
                </button>
                <div className="flex items-center gap-3 mb-2 px-1">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold border-2 border-white shadow-sm shrink-0">TM</div>
                  <div className="leading-tight min-w-0">
                      <p className="font-bold text-slate-800 text-sm truncate">{CANDIDATE.name}</p>
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
    if (currentPage === 'CAMPAIGN_DASHBOARD' && selectedCampaign) {
      return (
        <div className="flex-1 relative overflow-hidden flex flex-col h-full bg-slate-50/50">
            <div className="p-4 pb-2">
                <button 
                  onClick={() => setCurrentPage('CAMPAIGNS')} 
                  className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-emerald-600 mb-4 px-1 group transition-colors"
                >
                  <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to List
                </button>
                <div className="flex items-center gap-3 mb-4 px-1">
                  <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm shrink-0">
                    <Briefcase size={20} />
                  </div>
                  <div className="leading-tight min-w-0">
                      <p className="font-bold text-slate-800 text-xs truncate" title={selectedCampaign.name}>{selectedCampaign.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">ID: {selectedCampaign.jobID}</p>
                  </div>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-4 space-y-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Campaign Tools</p>
                  <div className="space-y-0.5">
                    <NavItem id="Intelligence" icon={Brain} label="Intelligence" activeTab={campaignTab} setActiveTab={setCampaignTab} />
                    
                    {/* Source AI Group - Expandable */}
                    <div 
                      className="relative"
                      onMouseEnter={() => setIsSourceHovered(true)}
                      onMouseLeave={() => setIsSourceHovered(false)}
                    >
                       <NavItem 
                          id="Source AI" 
                          icon={Search} 
                          label="Source AI" 
                          activeTab={campaignTab} 
                          setActiveTab={(id: string) => setCampaignTab(campaignTab.startsWith('Source AI') ? campaignTab : 'Source AI:ATTACH')} 
                       />
                       
                       {/* Dropdown Items */}
                       {(campaignTab.startsWith('Source AI') || isSourceHovered) && (
                          <div className="ml-9 mt-1 space-y-1 border-l-2 border-slate-100 pl-2 mb-2 animate-in slide-in-from-top-1 duration-200">
                             <SubNavItem id="Source AI:ATTACH" label="Attach People" activeTab={campaignTab} setActiveTab={setCampaignTab} />
                             <SubNavItem id="Source AI:PROFILES" label="Attached Profiles" activeTab={campaignTab} setActiveTab={setCampaignTab} />
                             <SubNavItem id="Source AI:INTEGRATIONS" label="Integrations" activeTab={campaignTab} setActiveTab={setCampaignTab} />
                             <SubNavItem id="Source AI:JD" label="Job Description" activeTab={campaignTab} setActiveTab={setCampaignTab} />
                          </div>
                       )}
                    </div>

                    <NavItem id="Match AI" icon={CheckCircle} label="Match AI" activeTab={campaignTab} setActiveTab={setCampaignTab} />
                    
                    {/* Engage AI Group - Expandable */}
                    <div 
                      className="relative"
                      onMouseEnter={() => setIsEngageHovered(true)}
                      onMouseLeave={() => setIsEngageHovered(false)}
                    >
                       <NavItem 
                          id="Engage AI" 
                          icon={GitBranch} 
                          label="Engage AI" 
                          activeTab={campaignTab} 
                          setActiveTab={(id: string) => {
                             if (campaignTab.startsWith('Engage AI')) {
                                // If already active, keep current sub-view
                                setCampaignTab(campaignTab);
                             } else {
                                // Logic: If multiple nodes (>1), default to Interview Room (ROOM). Else Builder.
                                const hasMultipleNodes = INITIAL_NODES_GRAPH.length > 1;
                                setCampaignTab(hasMultipleNodes ? 'Engage AI:ROOM' : 'Engage AI:BUILDER');
                             }
                          }}
                       />
                       
                       {/* Dropdown Items */}
                       {(campaignTab.startsWith('Engage AI') || isEngageHovered) && (
                          <div className="ml-9 mt-1 space-y-1 border-l-2 border-slate-100 pl-2 mb-2 animate-in slide-in-from-top-1 duration-200">
                             <SubNavItem id="Engage AI:BUILDER" label="Workflow Builder" activeTab={campaignTab} setActiveTab={setCampaignTab} />
                             <SubNavItem id="Engage AI:TRACKING" label="Candidate Tracking" activeTab={campaignTab} setActiveTab={setCampaignTab} />
                             <SubNavItem id="Engage AI:ROOM" label="Interview Room" activeTab={campaignTab} setActiveTab={setCampaignTab} />
                          </div>
                       )}
                    </div>

                    <NavItem id="Recommended Profiles" icon={ThumbsUp} label="Recommended Profiles" activeTab={campaignTab} setActiveTab={setCampaignTab} />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Settings</p>
                  <div className="space-y-0.5">
                    <NavItem id="Sharing" icon={Share2} label="Sharing & Access" activeTab={campaignTab} setActiveTab={setCampaignTab} />
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
              onClick={() => setCurrentPage('HOME')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all ${currentPage === 'HOME' ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
          >
              <HomeIcon size={18} /> Home
          </button>
          <button 
              onClick={() => setCurrentPage('CAMPAIGNS')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all ${currentPage === 'CAMPAIGNS' ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
          >
              <Briefcase size={18} /> Campaigns
          </button>
          
          {/* Profiles Group */}
          <div className="group relative">
              <button 
                  onClick={() => { setCurrentPage('PROFILES'); setProfilesView('SEARCH'); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-all group ${currentPage === 'PROFILES' ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                  <div className="flex items-center gap-3"><Users size={18} /> Profiles</div>
                  <ChevronRight size={16} className="text-slate-400 group-hover:rotate-90 transition-transform" />
              </button>
              {/* Dropdown Menu */}
              <div className="hidden group-hover:block ml-9 space-y-1 mt-1 animate-in slide-in-from-top-1">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setCurrentPage('PROFILES'); setProfilesView('SEARCH'); }} 
                      className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-slate-50 hover:text-emerald-600 ${profilesView === 'SEARCH' && currentPage === 'PROFILES' ? 'text-emerald-600 font-medium' : 'text-slate-500'}`}
                    >
                      Search Profiles
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setCurrentPage('PROFILES'); setProfilesView('FOLDERS'); }} 
                      className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-slate-50 hover:text-emerald-600 ${profilesView === 'FOLDERS' && currentPage === 'PROFILES' ? 'text-emerald-600 font-medium' : 'text-slate-500'}`}
                    >
                      Folders
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setCurrentPage('PROFILES'); setProfilesView('TAGS'); }} 
                      className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-slate-50 hover:text-emerald-600 ${profilesView === 'TAGS' && currentPage === 'PROFILES' ? 'text-emerald-600 font-medium' : 'text-slate-500'}`}
                    >
                      Tags
                    </button>
              </div>
          </div>

          <button 
              onClick={() => setCurrentPage('METRICS')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all ${currentPage === 'METRICS' ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
          >
              <BarChart2 size={18} /> Metrics
          </button>
      </div>
    );
  };

  const handleNavigateToCampaign = (campaign: Campaign, tab: string = 'Intelligence') => {
    setSelectedCampaign(campaign);
    setCampaignTab(tab);
    setCurrentPage('CAMPAIGN_DASHBOARD');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'HOME': return <Home />;
      case 'CAMPAIGNS': return <Campaigns onNavigateToCampaign={handleNavigateToCampaign} />;
      case 'PROFILES': return <Profiles onNavigateToProfile={() => setCurrentPage('CANDIDATE_PROFILE')} view={profilesView} />;
      case 'METRICS': return <Metrics />;
      case 'CANDIDATE_PROFILE': return <CandidateProfile activeTab={candidateTab} />;
      case 'CAMPAIGN_DASHBOARD': return selectedCampaign ? <CampaignDashboard campaign={selectedCampaign} activeTab={campaignTab} /> : <Campaigns onNavigateToCampaign={handleNavigateToCampaign} />;
      default: return <Home />;
    }
  };

  return (
    <ToastProvider>
      <div className="flex h-screen bg-slate-50 font-sans text-slate-600 overflow-hidden">
          {isCreateProfileOpen && <CreateProfileModal onClose={() => setIsCreateProfileOpen(false)} />}
          
          {/* SIDEBAR */}
          <aside className="w-64 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col z-20">
              <div className="h-16 flex items-center px-6 border-b border-slate-100 shrink-0">
                  <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mr-3"><Users className="text-white" size={18} /></div>
                  <span className="font-bold text-slate-800 text-lg">TalentHub</span>
              </div>
              
              {renderSidebar()}

              <SidebarFooter />
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 flex flex-col h-screen overflow-hidden bg-white">
              {renderPage()}
          </main>
      </div>
    </ToastProvider>
  );
}
