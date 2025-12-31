
import React from 'react';
import { X, Filter, GitGraph } from 'lucide-react';
import { Sankey, Tooltip, ResponsiveContainer } from 'recharts';

const data = {
  nodes: [
    { name: 'Sourced' },
    { name: 'Screened' },
    { name: 'Interviewed' },
    { name: 'Offered' },
    { name: 'Hired' },
    { name: 'Rejected' }
  ],
  links: [
    { source: 0, target: 1, value: 120 },
    { source: 0, target: 5, value: 40 },
    { source: 1, target: 2, value: 60 },
    { source: 1, target: 5, value: 60 },
    { source: 2, target: 3, value: 30 },
    { source: 2, target: 5, value: 30 },
    { source: 3, target: 4, value: 25 },
    { source: 3, target: 5, value: 5 }
  ]
};

export const NetworkGraphModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200">
       <div className="bg-white w-full max-w-6xl h-[85vh] rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                    <GitGraph size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 text-lg">Campaign Workflow Analysis</h3>
                    <p className="text-xs text-slate-500">Candidate flow distribution across stages</p>
                </div>
             </div>
             <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20}/></button>
          </div>
          
          <div className="flex-1 p-6 overflow-hidden flex flex-col">
             <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                    <select className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>All Campaigns</option>
                        <option>Software Developer</option>
                        <option>Warehouse Associate</option>
                    </select>
                    <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2 bg-white">
                        <Filter size={14}/> Filter Stages
                    </button>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Conversions</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-400 rounded-full"></span> Drop-offs</span>
                </div>
             </div>

             <div className="flex-1 bg-white rounded-xl border border-slate-200 p-4 shadow-inner relative flex flex-col">
                <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <Sankey
                        data={data}
                        node={{ stroke: '#6366f1', strokeWidth: 0, fill: '#818cf8' }} 
                        nodePadding={50}
                        link={{ stroke: '#cbd5e1', fillOpacity: 0.3 }}
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                        >
                        <Tooltip />
                        </Sankey>
                    </ResponsiveContainer>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};
