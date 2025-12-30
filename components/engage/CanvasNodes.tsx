
import React from 'react';
import { 
  Megaphone, ClipboardList, Video, Calendar, Edit3, Trash2, 
  Play, Plus, GitBranch 
} from 'lucide-react';
import { NODE_TYPES } from '../../data';
import { EngageNode } from '../../types';
import { CARD_WIDTH, CARD_HEIGHT, BUBBLE_SIZE, START_NODE_WIDTH, START_NODE_HEIGHT } from './constants';

export const CriteriaBubble = ({ node, onClick, onStartConnect, onEndConnect, isConnecting, isValidTarget }: any) => {
    const isEnabled = node.data.config?.enabled;
    const label = node.data.label;

    return (
        <div className="node-card absolute flex flex-col items-center justify-center z-20"
             style={{ left: node.x, top: node.y, width: BUBBLE_SIZE, height: BUBBLE_SIZE }}
        >
            <div 
                className={`w-full h-full rounded-full shadow-sm border-2 flex items-center justify-center cursor-pointer transition-all hover:scale-110 hover:shadow-md ${isEnabled ? 'bg-green-500 border-white' : 'bg-white border-slate-300 text-slate-400 hover:border-slate-400'}`}
                onClick={(e) => { e.stopPropagation(); onClick(); }}
                title={isEnabled ? "Edit Criteria" : "Add Automation"}
            >
                {isEnabled ? <GitBranch size={18} className="text-white" /> : <Plus size={20} />}
            </div>
            
            {label && (
                <div className="absolute -top-6 whitespace-nowrap bg-white border border-slate-200 px-2 py-0.5 rounded text-[10px] font-bold text-slate-600 shadow-sm">
                    {label}
                </div>
            )}

            {/* Input Handle - Only show if valid target. For CRITERIA nodes, isValidTarget is false when isConnecting=true */}
            {(!isConnecting || isValidTarget) && (
                <div 
                    className={`absolute top-1/2 -translate-y-1/2 -left-[6px] w-2.5 h-2.5 rounded-full border-2 cursor-crosshair transition-all duration-300 ${
                        isConnecting && isValidTarget 
                        ? 'bg-green-500 border-green-200 scale-150 shadow-[0_0_10px_rgba(34,197,94,0.5)] z-50' 
                        : 'bg-slate-400 border-white hover:bg-indigo-600 hover:scale-150'
                    }`}
                    // Hide the handle completely if we are connecting but this node is invalid (e.g., criteria node)
                    style={{ opacity: isConnecting && !isValidTarget ? 0 : 1, pointerEvents: isConnecting && !isValidTarget ? 'none' : 'auto' }}
                    onClick={(e) => { 
                        e.stopPropagation(); 
                        if (isConnecting && isValidTarget) onEndConnect(node.id); 
                    }}
                    title="Connect Input"
                ></div>
            )}

            {/* Output Handle - Hide when connecting */}
            {!isConnecting && (
                <div 
                    className="absolute top-1/2 -translate-y-1/2 -right-[6px] w-2.5 h-2.5 rounded-full bg-slate-400 border-2 border-white cursor-crosshair hover:bg-indigo-600 hover:scale-150 transition-all"
                    onClick={(e) => { e.stopPropagation(); onStartConnect(node.id); }}
                    title="Connect Output"
                ></div>
            )}
        </div>
    );
};

export const StartNode = ({ node, onClick, onStartConnect, isConnecting }: any) => (
    <div 
      className="node-card absolute bg-emerald-50 rounded-full shadow-sm border-2 border-emerald-200 flex items-center justify-center gap-3 z-10 cursor-pointer hover:ring-2 hover:ring-emerald-100 transition-all hover:shadow-md"
      style={{ left: node.x, top: node.y, width: START_NODE_WIDTH, height: START_NODE_HEIGHT }}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      title="Configure Start Trigger"
    >
       <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm border-2 border-emerald-100">
          <Play size={18} fill="currentColor" className="ml-0.5" />
       </div>
       <div className="flex flex-col justify-center">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Start Workflow</span>
          <span className="text-[10px] text-emerald-600 font-medium">Candidate Applied</span>
       </div>
       {/* Output Handle Only - Start Node has no input */}
       {!isConnecting && (
           <div 
              className="absolute top-1/2 -translate-y-1/2 -right-[5px] w-2.5 h-2.5 rounded-full border-2 border-white bg-slate-400 z-20 cursor-crosshair hover:bg-indigo-600 hover:scale-150 transition-all"
              onClick={(e) => { e.stopPropagation(); onStartConnect(node.id); }}
           ></div>
       )}
    </div>
);

export const NodeCard = ({ node, onSelect, onEdit, onDelete, onStartConnect, onEndConnect, isSelected, isConnecting, isValidTarget }: any) => {
  if (node.type === 'START') return <StartNode node={node} onClick={() => onEdit(node)} onStartConnect={onStartConnect} isConnecting={isConnecting} />;
  if (node.type === 'CRITERIA') return <CriteriaBubble node={node} onClick={() => onEdit(node)} onStartConnect={onStartConnect} onEndConnect={onEndConnect} isConnecting={isConnecting} isValidTarget={isValidTarget} />;

  const config: any = NODE_TYPES[node.type] || NODE_TYPES.ANNOUNCEMENT;
  
  const getNodeIcon = () => {
    if (node.type === 'ANNOUNCEMENT') return Megaphone;
    if (node.type === 'SCREENING') return ClipboardList;
    if (node.type === 'INTERVIEW') {
      const meetTypes = node.data.meetType || [];
      if (meetTypes.includes('Video')) return Video;
      return Calendar;
    }
    return config.icon;
  };
  const Icon = getNodeIcon();

  const renderStats = () => {
    const stats = node.data.stats || {};
    return (
        <>
          <div className="flex flex-col border-r border-slate-100 pr-3">
             <span className="text-[10px] text-slate-400 font-medium">Scheduled</span>
             <span className="text-sm font-bold text-slate-700">{stats.scheduled || 0}</span>
          </div>
          <div className="flex flex-col pl-3">
             <span className="text-[10px] text-slate-400 font-medium">{node.type === 'ANNOUNCEMENT' ? 'Viewed' : 'Completed'}</span>
             <span className="text-sm font-bold text-blue-600">{stats.viewed || stats.responded || 0}</span>
          </div>
        </>
    );
  };

  return (
    <div 
      className={`node-card absolute bg-white rounded-lg shadow-md border-2 group hover:shadow-xl flex flex-col z-10 ${isSelected ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-slate-200'}`}
      style={{ left: node.x, top: node.y, width: CARD_WIDTH, height: CARD_HEIGHT }} 
      onClick={() => onSelect(node)}
    >
      <div className={`h-1.5 rounded-t-sm w-full shrink-0 ${config.color.split(' ')[0]}`}></div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-1.5 rounded-md ${config.color.replace('border-', '')} bg-opacity-20`}>
            <Icon size={16} />
          </div>
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600"
              onClick={(e) => { e.stopPropagation(); onEdit(node); }}
              title="Edit Configuration"
            >
              <Edit3 size={12}/>
            </button>
            <button 
              className="p-1 hover:bg-red-50 rounded text-slate-400 hover:text-red-500"
              onClick={(e) => { e.stopPropagation(); onDelete(node.id); }}
              title="Delete"
            >
              <Trash2 size={12}/>
            </button>
          </div>
        </div>
        <h4 className="font-bold text-slate-800 text-sm mb-1">{node.title}</h4>
        <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">{node.data.desc}</p>
        
        <div className="mt-auto pt-3 flex items-center border-t border-slate-50">
           {renderStats()}
        </div>
      </div>
      
      {/* Input Handle - Shows Green if Valid Target during connection mode */}
      {(!isConnecting || isValidTarget) && (
          <div 
            className={`absolute top-1/2 -translate-y-1/2 -left-[10px] w-5 h-5 rounded-full border-4 shadow-sm transition-all duration-300 cursor-crosshair z-20 ${
                isConnecting && isValidTarget 
                ? 'bg-green-500 border-green-200 scale-125 shadow-[0_0_15px_rgba(34,197,94,0.6)] animate-pulse' 
                : 'bg-slate-300 border-white hover:bg-indigo-500 hover:scale-125'
            }`} 
            onClick={(e) => { 
                e.stopPropagation(); 
                if (isConnecting && isValidTarget) onEndConnect(node.id); 
            }}
          ></div>
      )}
      
      {/* Output Handle - Hidden during connection mode to reduce clutter */}
      {!isConnecting && (
          <div 
            className="absolute top-1/2 -translate-y-1/2 -right-[10px] w-5 h-5 rounded-full border-4 border-white shadow-sm bg-slate-300 hover:bg-indigo-500 hover:scale-125 transition-all cursor-crosshair z-20" 
            onClick={(e) => { e.stopPropagation(); onStartConnect(node.id); }}
          ></div>
      )}
    </div>
  );
};

export const BezierEdge = ({ start, end, label }: any) => {
  const distX = Math.abs(end.x - start.x);
  
  // Adjusted curve calculation for close proximity nodes
  // If nodes are very close (e.g. < 50px), reduce curve to almost straight but preserve a tiny curve for aesthetics
  // If nodes are far, clamp curve to 150 max to avoid huge loops
  let controlOffset = Math.min(distX * 0.4, 150);
  
  // Ensure minimal curve so it doesn't look like a glitchy straight line when *too* close
  if (controlOffset < 20 && distX > 20) controlOffset = 20;

  const path = `M ${start.x} ${start.y} C ${start.x + controlOffset} ${start.y}, ${end.x - controlOffset} ${end.y}, ${end.x} ${end.y}`;

  return (
    <g>
      <path d={path} fill="none" stroke="#94a3b8" strokeWidth="2.5" />
      {label && (
        <foreignObject x={(start.x + end.x) / 2 - 20} y={(start.y + end.y) / 2 - 10} width={40} height={20}>
           <div className="bg-white text-[10px] text-slate-500 border border-slate-200 rounded px-1 text-center truncate">{label}</div>
        </foreignObject>
      )}
    </g>
  );
};
