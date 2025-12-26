
import React, { useState } from 'react';
import { 
  Users, Home as HomeIcon, Briefcase, BarChart2, MessageCircle, HelpCircle, ChevronRight,
  ChevronLeft, FileText, Activity, Folder, ThumbsUp, Copy, CheckCircle, Brain, Search, GitBranch, Share2
} from 'lucide-react';
import { Home } from './pages/Home';
import { Campaigns } from './pages/Campaigns';
import { Profiles } from './pages/Profiles';
import { Metrics } from './pages/Metrics';
import { CandidateProfile } from './pages/CandidateProfile';
import { CampaignDashboard } from './pages/CampaignDashboard';
import { CANDIDATE } from './data';
import { ToastProvider } from './components/Toast';
import { Campaign } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'HOME' | 'CAMPAIGNS' | 'PROFILES' | 'METRICS' | 'CANDIDATE_PROFILE' | 'CAMPAIGN_DASHBOARD'>('HOME');
  const [profilesView, setProfilesView] = useState<'SEARCH' | 'FOLDERS' | 'TAGS'>('SEARCH');
  const [candidateTab, setCandidateTab] = useState('profile');
  
  // Campaign Context State
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [campaignTab, setCampaignTab] = useState('Intelligence');

  // Candidate Navigation Item Helper
  const NavItem = ({ id, icon: Icon, label, activeTab, setActiveTab }: any) => (
    <button 
      onClick={() => setActiveTab(id)} 
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm ${activeTab === id ? 'bg-white shadow-sm text-emerald-700 font-medium translate-x-1' : 'text-slate-600 hover:bg-white/50 hover:text-slate-900'}`}
    >
      <Icon size={16} /> {label}
    </button>
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
                    <NavItem id="Source AI" icon={Search} label="Source AI" activeTab={campaignTab} setActiveTab={setCampaignTab} />
                    <NavItem id="Match AI" icon={CheckCircle} label="Match AI" activeTab={campaignTab} setActiveTab={setCampaignTab} />
                    <NavItem id="Engage AI" icon={GitBranch} label="Engage AI" activeTab={campaignTab} setActiveTab={setCampaignTab} />
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

  const handleNavigateToCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setCampaignTab('Intelligence');
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
          {/* SIDEBAR */}
          <aside className="w-64 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col z-20">
              <div className="h-16 flex items-center px-6 border-b border-slate-100 shrink-0">
                  <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mr-3"><Users className="text-white" size={18} /></div>
                  <span className="font-bold text-slate-800 text-lg">TalentHub</span>
              </div>
              
              {renderSidebar()}

              <div className="p-4 border-t border-slate-200 bg-slate-50/50 mt-auto">
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-slate-900 transition-colors">
                      <HelpCircle size={18} /><span className="text-sm">Help & Support</span>
                  </button>
              </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 flex flex-col h-screen overflow-hidden bg-white">
              {renderPage()}
          </main>
      </div>
    </ToastProvider>
  );
}
