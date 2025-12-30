
import React, { useState, useMemo } from 'react';
import { 
  Edit3, Trash2, PlusCircle, Layout, Settings, Zap, GitBranch, X, Plus
} from 'lucide-react';
import { MOCK_QUESTIONS_DATA } from '../../data';
import { EngageNode } from '../../types';

export const AutomationPlaceholderModal = ({ onClose, isEnabled, onToggle }: { onClose: () => void, isEnabled: boolean, onToggle: (val: boolean) => void }) => {
    return (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Zap size={20} className={isEnabled ? "text-green-600" : "text-slate-400"} />
                        {isEnabled ? 'Edit Automation' : 'Configure Automation'}
                    </h2>
                    <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full text-slate-400"><X size={20}/></button>
                </div>
                
                <div className="p-8 text-center space-y-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 ${isEnabled ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                        <GitBranch size={32} />
                    </div>
                    <h3 className="font-bold text-slate-700">
                        {isEnabled ? 'Automation Active' : 'Enable Automation?'}
                    </h3>
                    <p className="text-sm text-slate-500 max-w-xs mx-auto">
                        {isEnabled 
                            ? "Logic conditions are currently active for this transition. Editing functionality coming soon." 
                            : "Define criteria to automatically move candidates to the next stage."}
                    </p>
                    
                    {!isEnabled && (
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-left text-xs text-slate-500 mt-4">
                            <p className="font-bold mb-1">Coming Soon:</p>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Score-based triggers</li>
                                <li>Keyword matching</li>
                                <li>Boolean logic gates</li>
                            </ul>
                        </div>
                    )}
                </div>

                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Status</span>
                    <div className="flex items-center gap-3">
                        <span className={`text-sm font-medium ${isEnabled ? 'text-green-600' : 'text-slate-400'}`}>
                            {isEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                        <button 
                            onClick={() => { onToggle(!isEnabled); onClose(); }}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isEnabled ? 'bg-green-600' : 'bg-slate-300'}`}
                        >
                            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const QuestionsPanel = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="font-bold text-slate-700">Screening Questions</h3>
      <button className="flex items-center gap-2 text-sm text-indigo-600 font-medium hover:text-indigo-800">
        <PlusCircle size={16} /> Add Question
      </button>
    </div>
    <div className="space-y-4">
      {MOCK_QUESTIONS_DATA.slice(0, 3).map((q, i) => (
        <div key={q.id} className="border border-slate-200 rounded-lg p-4 hover:border-indigo-300 transition-colors bg-white">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Question {i + 1}</span>
            <div className="flex gap-2">
              <button className="text-slate-400 hover:text-indigo-600"><Edit3 size={14} /></button>
              <button className="text-slate-400 hover:text-red-600"><Trash2 size={14} /></button>
            </div>
          </div>
          <p className="font-medium text-slate-800 text-sm mb-3">{q.questionText}</p>
          <div className="flex gap-2 text-xs">
            <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">{q.responseType}</span>
            {q.options && q.options.length > 0 && <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">{q.options.length} Options</span>}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const TemplateManager = ({ nodeType, config, onUpdate }: any) => {
  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 flex items-start gap-3">
        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><Layout size={20} /></div>
        <div>
          <h4 className="font-bold text-indigo-900 text-sm">Template Configuration</h4>
          <p className="text-xs text-indigo-700 mt-1">Select or customize the template used for this step.</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Selected Template</label>
          <select 
            className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            value={config.templateId || ''}
            onChange={(e) => onUpdate({...config, templateId: e.target.value})}
          >
            <option value="">Select a template...</option>
            <option value="t1">Standard Screening Template</option>
            <option value="t2">Technical Assessment (React)</option>
            <option value="t3">Behavioral Interview Guide</option>
          </select>
        </div>

        {config.templateId && (
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
             <div className="flex justify-between items-center mb-4">
                <h5 className="font-bold text-slate-700 text-sm">Template Preview</h5>
                <button className="text-xs text-indigo-600 font-medium hover:underline">Edit Template</button>
             </div>
             <div className="space-y-3">
                <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                <div className="h-2 bg-slate-200 rounded w-1/2"></div>
                <div className="h-2 bg-slate-200 rounded w-5/6"></div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const NodeConfigurationModal = ({ node, onClose, onSave }: { node: EngageNode, onClose: () => void, onSave: (node: EngageNode) => void }) => {
  const [roundName, setRoundName] = useState(node.title);
  const [nodeConfig, setNodeConfig] = useState(node.data.config || {});
  const tabs = useMemo(() => {
    if (node.type === 'INTERVIEW') return ['Templates', 'Interview Details'];
    return ['Questionnaire', 'Templates'];
  }, [node.type]);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-start bg-white shrink-0">
           <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-3">
                 Configure Round 
                 <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs font-semibold border border-slate-200 tracking-wide uppercase">{node.type}</span>
              </h2>
              <div className="max-w-md">
                 <input 
                   type="text" 
                   value={roundName} 
                   onChange={(e) => setRoundName(e.target.value)}
                   className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                   placeholder="Round Name"
                 />
              </div>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
              <X size={24} />
           </button>
        </div>
        <div className="px-8 py-4 bg-slate-50 border-b border-slate-200 shrink-0">
           <div className="flex gap-1 p-1 bg-slate-200/60 rounded-lg w-fit">
              {tabs.map(tab => (
                 <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${activeTab === tab ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}>{tab}</button>
              ))}
           </div>
        </div>
        <div className="flex-1 bg-white p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
           {activeTab === 'Questionnaire' ? <QuestionsPanel /> : activeTab === 'Templates' ? <div className="max-w-3xl mx-auto"><TemplateManager nodeType={node.type} config={nodeConfig} onUpdate={setNodeConfig} /></div> : <div className="h-full border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 bg-slate-50/30"><Settings size={32} className="text-indigo-200 mb-4" /><p className="text-sm">Configuration for {activeTab}</p></div>}
        </div>
        <div className="px-8 py-5 border-t border-slate-100 bg-white flex justify-end gap-3 shrink-0">
           <button onClick={onClose} className="px-5 py-2.5 text-slate-600 font-bold text-sm hover:bg-slate-50 rounded-lg transition-colors">Cancel</button>
           <button onClick={() => onSave({ ...node, title: roundName, data: { ...node.data, config: nodeConfig } })} className="px-6 py-2.5 bg-indigo-600 text-white font-bold text-sm rounded-lg hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all transform active:scale-95">Save Changes</button>
        </div>
      </div>
    </div>
  );
};
