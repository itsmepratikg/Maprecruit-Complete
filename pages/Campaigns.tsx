
import React, { useState } from 'react';
import { 
  Briefcase, Lock, Archive, Search, ChevronDown, RefreshCw, MoreVertical, HelpCircle, 
  Heart, Share2, Network, ChevronRight, CheckCircle
} from 'lucide-react';
import { GLOBAL_CAMPAIGNS } from '../data';
import { EngageWorkflow } from '../components/EngageWorkflow';
import { Campaign } from '../types';
import { useToast } from '../components/Toast';

// --- SUB-VIEWS PLACEHOLDERS ---
const SourceAIView = ({ campaignId, onClose }: { campaignId: number, onClose: () => void }) => (
  <div className="fixed inset-0 bg-white z-50 flex flex-col animate-in fade-in duration-200">
    <div className="p-4 border-b flex justify-between items-center">
      <h2 className="text-xl font-bold">Source AI: Campaign {campaignId}</h2>
      <button onClick={onClose} className="bg-gray-100 p-2 rounded">Close</button>
    </div>
    <div className="p-8 flex gap-4">
        <div className="p-6 border rounded-xl hover:shadow-md cursor-pointer flex-1">
            <h3 className="font-bold text-lg mb-2">Attach People</h3>
            <p className="text-sm text-gray-500">Find candidates from your database.</p>
        </div>
        <div className="p-6 border rounded-xl hover:shadow-md cursor-pointer flex-1">
            <h3 className="font-bold text-lg mb-2">Integrations</h3>
            <p className="text-sm text-gray-500">Source from LinkedIn, Indeed, etc.</p>
        </div>
        <div className="p-6 border rounded-xl hover:shadow-md cursor-pointer flex-1">
            <h3 className="font-bold text-lg mb-2">Job Description</h3>
            <p className="text-sm text-gray-500">Edit or view the JD.</p>
        </div>
    </div>
  </div>
);

const RecommendedProfilesView = ({ campaignId, onClose }: { campaignId: number, onClose: () => void }) => (
  <div className="fixed inset-0 bg-white z-50 flex flex-col animate-in slide-in-from-right duration-300">
    <div className="p-4 border-b flex justify-between items-center bg-gray-50">
      <h2 className="text-xl font-bold">Recommended Profiles</h2>
      <button onClick={onClose} className="text-sm text-blue-600 hover:underline">Back to Campaign</button>
    </div>
    <div className="p-8">
        <p className="text-gray-500">List of AI recommended profiles for Campaign ID: {campaignId}</p>
    </div>
  </div>
);

// --- MAIN COMPONENTS ---

const CampaignStats = ({ activeTab, onTabChange, counts }: { activeTab: string, onTabChange: (tab: string) => void, counts: any }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div 
      onClick={() => onTabChange('Active')}
      className={`p-6 rounded-xl shadow-sm border cursor-pointer transition-all ${activeTab === 'Active' ? 'ring-2 ring-emerald-500 border-emerald-500 bg-white' : 'bg-white border-gray-100 hover:border-emerald-200'}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{counts.active}</h2>
          <p className="text-sm text-gray-500 font-medium">Active Campaigns</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl">
          <Briefcase size={32} className="text-gray-400" />
        </div>
      </div>
    </div>
    <div 
      onClick={() => onTabChange('Closed')}
      className={`p-6 rounded-xl shadow-sm border cursor-pointer transition-all ${activeTab === 'Closed' ? 'ring-2 ring-emerald-500 border-emerald-500 bg-white' : 'bg-white border-gray-100 hover:border-emerald-200'}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-green-500">{counts.closed}</h2>
          <p className="text-sm text-green-600 font-medium">Closed Campaigns</p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl">
          <Lock size={32} className="text-green-600" />
        </div>
      </div>
    </div>
    <div 
      onClick={() => onTabChange('Archived')}
      className={`p-6 rounded-xl shadow-sm border cursor-pointer transition-all ${activeTab === 'Archived' ? 'ring-2 ring-emerald-500 border-emerald-500 bg-white' : 'bg-white border-gray-100 hover:border-emerald-200'}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-green-700">{counts.archived}</h2>
          <p className="text-sm text-green-600 font-medium">Archived Campaigns</p>
        </div>
        <div className="bg-green-500 p-4 rounded-xl">
          <Archive size={32} className="text-white" />
        </div>
      </div>
    </div>
  </div>
);

const FilterDropdown = ({ onChange }: { onChange: (filter: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('All');

  const options = ['All', 'Created by Me', 'Shared with Me', 'Favorites', 'New'];

  const handleSelect = (option: string) => {
    setSelected(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 focus:ring-2 focus:ring-green-100 transition-all min-w-[140px] justify-between"
      >
        <span>Filter: {selected}</span>
        <ChevronDown size={14} className="text-gray-400" />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
            <div className="px-3 py-2 border-b border-gray-100">
               <div className="relative">
                 <input type="text" placeholder="Search..." className="w-full pl-7 pr-2 py-1 text-xs bg-gray-50 rounded border border-gray-200 focus:outline-none focus:border-green-500" />
                 <Search size={10} className="absolute left-2 top-1.5 text-gray-400" />
               </div>
            </div>
            {options.map(opt => (
              <button 
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-green-50 hover:text-green-700 ${selected === opt ? 'text-green-700 font-medium bg-green-50' : 'text-gray-600'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const HoverMenu = ({ campaign, onAction }: { campaign: Campaign, onAction: (action: string) => void }) => {
  return (
    <div className="absolute left-full top-0 ml-4 z-50 animate-in fade-in zoom-in-95 duration-200 hidden group-hover/title:block w-56">
      {/* Connector triangle */}
      <div className="absolute top-3 -left-2 w-4 h-4 bg-white transform rotate-45 border-l border-b border-gray-100 shadow-sm"></div>
      
      <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden relative">
        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
           <h4 className="font-bold text-gray-800 text-sm truncate" title={campaign.name}>{campaign.name}</h4>
        </div>
        <div className="py-1">
           <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors">
              Intelligence
           </button>
           
           {/* Source AI Group */}
           <div className="group/submenu relative">
             <button className="w-full text-left px-4 py-2 text-sm text-gray-600 group-hover/submenu:bg-sky-50 group-hover/submenu:text-green-600 transition-colors flex justify-between items-center">
                <span>Source AI</span>
                <ChevronRight size={14} className="text-gray-400 group-hover/submenu:text-green-600" />
             </button>
             {/* Nested Menu for Source AI */}
             <div className="hidden group-hover/submenu:block absolute left-full top-0 w-48 bg-white rounded-lg shadow-xl border border-gray-100 ml-1 py-1">
                <button onClick={() => onAction('ATTACH_PEOPLE')} className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-700">Attach People</button>
                <button onClick={() => onAction('INTEGRATIONS')} className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-700">Integrations</button>
                <button onClick={() => onAction('JOB_DESC')} className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-700">Job Description</button>
             </div>
           </div>

           <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors">
              Match AI
           </button>
           <button 
             onClick={() => onAction('ENGAGE_AI')}
             className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors"
           >
              Engage AI
           </button>
           <button 
             onClick={() => onAction('RECOMMENDED')}
             className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors"
           >
              Recommended Profiles
           </button>
        </div>
      </div>
    </div>
  );
};

interface CampaignsProps {
  onNavigateToCampaign: (campaign: Campaign) => void;
}

export const Campaigns: React.FC<CampaignsProps> = ({ onNavigateToCampaign }) => {
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('Active');
  
  // View States
  const [activeView, setActiveView] = useState<'LIST' | 'ENGAGE' | 'SOURCE' | 'RECOMMENDED'>('LIST');
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);
  
  const [campaigns, setCampaigns] = useState<Campaign[]>(GLOBAL_CAMPAIGNS);

  const filteredCampaigns = campaigns.filter(c => {
    // 1. Filter by Tab (Active/Closed/Archived)
    if (c.status !== activeTab) return false;

    // 2. Filter by Search
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.jobID.includes(searchQuery);
    if (!matchesSearch) return false;

    // 3. Filter by Dropdown
    let matchesDropdown = true;
    if (activeFilter === 'Created by Me') matchesDropdown = true; // Mock logic
    if (activeFilter === 'Shared with Me') matchesDropdown = false; 
    if (activeFilter === 'Favorites') matchesDropdown = c.isFavorite || false;
    if (activeFilter === 'New') matchesDropdown = c.isNew || false;
    
    return matchesDropdown;
  });

  const handleMenuAction = (campaignId: number, action: string) => {
    setSelectedCampaignId(campaignId);
    if (action === 'ENGAGE_AI') setActiveView('ENGAGE');
    else if (action === 'ATTACH_PEOPLE' || action === 'INTEGRATIONS' || action === 'JOB_DESC') setActiveView('SOURCE');
    else if (action === 'RECOMMENDED') setActiveView('RECOMMENDED');
  };

  const handleCampaignClick = (campaign: Campaign) => {
      onNavigateToCampaign(campaign);
  };

  const toggleFavorite = (id: number) => {
    setCampaigns(prev => prev.map(c => {
        if (c.id === id) {
            const newVal = !c.isFavorite;
            addToast(newVal ? "Campaign added to favorites" : "Campaign removed from favorites", "success");
            return { ...c, isFavorite: newVal };
        }
        return c;
    }));
  };

  const counts = {
      active: campaigns.filter(c => c.status === 'Active').length,
      closed: campaigns.filter(c => c.status === 'Closed').length,
      archived: campaigns.filter(c => c.status === 'Archived').length,
  };

  // Render Sub-Views (Modal style for quick actions, dashboard navigation handled by App)
  if (activeView === 'ENGAGE' && selectedCampaignId) {
    return <EngageWorkflow onClose={() => setActiveView('LIST')} />;
  }
  if (activeView === 'SOURCE' && selectedCampaignId) {
    return <SourceAIView campaignId={selectedCampaignId} onClose={() => setActiveView('LIST')} />;
  }
  if (activeView === 'RECOMMENDED' && selectedCampaignId) {
    return <RecommendedProfilesView campaignId={selectedCampaignId} onClose={() => setActiveView('LIST')} />;
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-screen bg-slate-50/50">
      <CampaignStats activeTab={activeTab} onTabChange={setActiveTab} counts={counts} />

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-t-xl border border-gray-200 border-b-0 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
           <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-gray-50 hover:bg-white hover:border-gray-300 transition-colors">
              Default Campaign Table <ChevronDown size={14} />
           </button>
        </div>

        <div className="flex items-center gap-3 flex-1 justify-end">
           <FilterDropdown onChange={setActiveFilter} />
           
           <div className="relative w-64">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100 transition-all"
              />
              <Search size={16} className="absolute right-3 top-2.5 text-gray-400" />
           </div>

           <button 
             onClick={() => { setSearchQuery(''); setActiveFilter('All'); }} 
             className="text-green-600 text-sm font-medium hover:underline px-2"
           >
             Clear
           </button>
           <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg"><RefreshCw size={16} /></button>
           <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg"><MoreVertical size={16} /></button>
           <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg"><HelpCircle size={16} /></button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-b-xl shadow-sm overflow-hidden min-h-[500px] flex flex-col">
        <div className="overflow-visible flex-1">
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" /></th>
                <th className="px-6 py-4 cursor-pointer hover:text-gray-700 group flex items-center gap-1">
                   Title <ArrowUpDownIcon className="opacity-0 group-hover:opacity-50" />
                </th>
                <th className="px-6 py-4 cursor-pointer hover:text-gray-700 group"><div className="flex items-center gap-1">Job ID <ArrowUpDownIcon className="opacity-0 group-hover:opacity-50" /></div></th>
                <th className="px-6 py-4 cursor-pointer hover:text-gray-700 group"><div className="flex items-center gap-1">Days Left <ArrowUpDownIcon className="opacity-0 group-hover:opacity-50" /></div></th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4">Members</th>
                <th className="px-6 py-4 cursor-pointer hover:text-gray-700 group"><div className="flex items-center gap-1">Updated Date <ArrowUpDownIcon className="opacity-0 group-hover:opacity-50" /></div></th>
                <th className="px-6 py-4 cursor-pointer hover:text-gray-700 group"><div className="flex items-center gap-1">Profiles <ArrowUpDownIcon className="opacity-0 group-hover:opacity-50" /></div></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCampaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-green-50/10 transition-colors group relative cursor-pointer" onClick={() => handleCampaignClick(camp)}>
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}><input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" /></td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-3">
                        {camp.isNew && (
                           <div className="relative">
                               <span className="absolute -top-4 -left-2 bg-green-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-br-md rounded-tl-md shadow-sm z-10 transform -rotate-12">New</span>
                           </div>
                        )}
                        
                        {/* Title & Hover Menu Container */}
                        <div className="relative group/title inline-block">
                           <button className="font-medium text-blue-600 hover:underline text-left block max-w-[220px] truncate">
                              {camp.name}
                           </button>
                           {/* Hover Menu positioned to right */}
                           <HoverMenu campaign={camp} onAction={(action) => handleMenuAction(camp.id, action)} />
                        </div>
                        
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                           <button 
                             onClick={(e) => { e.stopPropagation(); toggleFavorite(camp.id); }}
                             className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1 rounded transition-colors"
                           >
                             <Heart size={14} className={camp.isFavorite ? "fill-red-500 text-red-500" : ""} />
                           </button>
                           <button onClick={(e) => e.stopPropagation()} className="text-gray-400 hover:text-green-600 hover:bg-green-50 p-1 rounded transition-colors"><Network size={14} /></button>
                        </div>
                     </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{camp.jobID}</td>
                  <td className={`px-6 py-4 font-medium ${camp.daysLeft < 5 && camp.daysLeft > 0 ? 'text-red-500' : 'text-red-400'}`}>
                     {camp.daysLeft}
                  </td>
                  <td className="px-6 py-4">
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${camp.owner.color} border-2 border-white shadow-sm`} title={camp.owner.name}>
                        {camp.owner.initials}
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex -space-x-2">
                        {camp.members.map((m, i) => (
                           <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${m.color} border-2 border-white shadow-sm ring-1 ring-white`} title={m.name}>
                              {m.initials}
                           </div>
                        ))}
                        <div className="w-8 h-8 rounded-full bg-slate-500 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-sm ring-1 ring-white">
                           +421
                        </div>
                     </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{camp.updatedDate}</td>
                  <td className="px-6 py-4">
                     <span className={`font-medium ${camp.profilesCount > 0 ? 'text-blue-600 hover:underline cursor-pointer' : 'text-gray-400'}`}>
                        {camp.profilesCount}
                     </span>
                  </td>
                </tr>
              ))}
              {filteredCampaigns.length === 0 && (
                  <tr>
                      <td colSpan={8} className="text-center py-10 text-gray-400">
                          No campaigns found matching your criteria.
                      </td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500 mt-auto bg-white">
           <span>Total Rows: {filteredCampaigns.length}</span>
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                 <span>10 / page</span>
                 <ChevronDown size={14} />
              </div>
              <div className="flex items-center gap-2">
                 <button className="hover:text-gray-900 disabled:opacity-50">&lt;</button>
                 <button className="w-6 h-6 flex items-center justify-center rounded border border-green-500 text-green-600 font-medium">1</button>
                 <button className="hover:text-gray-900">&gt;</button>
              </div>
              <div className="flex items-center gap-2">
                 <span>Go to</span>
                 <input type="text" className="w-10 border border-gray-200 rounded px-1 py-0.5 text-center" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const ArrowUpDownIcon = ({ className }: { className?: string }) => (
   <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/>
   </svg>
);
