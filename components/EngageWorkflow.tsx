
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  FileText, Video, MessageSquare, Split, Mail, Edit3, Trash2, 
  HelpCircle, Megaphone, ListChecks, CheckCircle2, Pilcrow, MoveRight, 
  Film, MapPin, Map, MinusCircle, XOctagon, Mic, PlusCircle, Copy, 
  Wand2, X, GripVertical, ArrowRight, GitBranch, AlertCircle, Users,
  Calendar, CheckCircle, Clock, ThumbsUp, ThumbsDown, ChevronRight,
  User, Search, MoreVertical, Paperclip, Layout, ZoomIn, ZoomOut, RotateCcw,
  ClipboardList, Handshake, BarChart2, Phone, Settings, ChevronDown
} from 'lucide-react';
import { NODE_TYPES, MOCK_QUESTIONS_DATA, INITIAL_NODES, INITIAL_EDGES, MOCK_CANDIDATES_CAMPAIGN } from '../data';
import { EngageNode, EngageEdge, Question } from '../types';

// --- CONSTANTS ---
const CARD_WIDTH = 280;
const CARD_HEIGHT = 160;
const HANDLE_OFFSET = 10; // Half of handle size (20px) to center on border

// --- SHARED COMPONENTS ---

const QuestionTypeIcon = ({ type, config }: any) => {
  const Icon = config.icon;
  return (
    <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${config.color} flex items-center justify-center`}>
      <Icon size={24} />
    </div>
  );
};

const DataTag = ({ text, config }: any) => {
  const Icon = config.icon;
  return (
    <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <Icon size={14} className="mr-1.5" />
      {text}
    </div>
  );
};

// --- SUB-VIEWS ---

const NodeConfigurationModal = ({ node, onClose, onSave }: { node: EngageNode, onClose: () => void, onSave: (node: EngageNode) => void }) => {
  const [roundName, setRoundName] = useState(node.title);
  const [commMethod, setCommMethod] = useState('Outbound');
  
  // Determine Tabs based on Node Type
  const tabs = useMemo(() => {
    if (node.type === 'INTERVIEW') {
      return ['Auto-Schedule', 'ReachOut Templates', 'Interview Templates', 'Automation'];
    }
    // Default for Screening, Survey, Announcement etc.
    return ['Questionnaire', 'ReachOut Templates', 'Automation'];
  }, [node.type]);

  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-start bg-white shrink-0">
           <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                 Configure Round 
                 <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs font-semibold border border-slate-200 tracking-wide uppercase">{node.type}</span>
              </h2>
              <div className="grid grid-cols-2 gap-8 max-w-2xl">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Round Name</label>
                    <input 
                      type="text" 
                      value={roundName} 
                      onChange={(e) => setRoundName(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                      placeholder="e.g. Technical Screening"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Communication Method</label>
                    <div className="relative">
                       <select 
                          value={commMethod}
                          onChange={(e) => setCommMethod(e.target.value)}
                          className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none bg-white transition-all cursor-pointer"
                       >
                          <option value="Outbound">Outbound (System Initiated)</option>
                          <option value="Inbound">Inbound (Candidate Initiated)</option>
                       </select>
                       <ChevronDown size={16} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
                    </div>
                 </div>
              </div>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
              <X size={24} />
           </button>
        </div>

        {/* Tabs - Pill Style */}
        <div className="px-8 py-4 bg-slate-50 border-b border-slate-200 shrink-0">
           <div className="flex gap-1 p-1 bg-slate-200/60 rounded-lg w-fit">
              {tabs.map(tab => (
                 <button 
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${
                     activeTab === tab 
                       ? 'bg-white text-indigo-700 shadow-sm' 
                       : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                   }`}
                 >
                    {tab}
                 </button>
              ))}
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white p-8 overflow-y-auto">
           <div className="h-full border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 bg-slate-50/30">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-100">
                 <Settings size={32} className="text-indigo-200" />
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-1">{activeTab} Configuration</h3>
              <p className="text-sm max-w-md text-center text-slate-500 leading-relaxed">
                This is a placeholder view. Future implementation will allow detailed configuration for {activeTab.toLowerCase()}.
              </p>
              <button className="mt-6 px-4 py-2 bg-indigo-50 text-indigo-600 text-sm font-bold rounded-lg hover:bg-indigo-100 transition-colors">
                 Add {activeTab.split(' ')[0]} Details
              </button>
           </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-slate-100 bg-white flex justify-end gap-3 shrink-0">
           <button onClick={onClose} className="px-5 py-2.5 text-slate-600 font-bold text-sm hover:bg-slate-50 rounded-lg transition-colors">Cancel</button>
           <button 
             onClick={() => onSave({ ...node, title: roundName })} 
             className="px-6 py-2.5 bg-indigo-600 text-white font-bold text-sm rounded-lg hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all transform active:scale-95"
           >
             Save Changes
           </button>
        </div>
      </div>
    </div>
  );
};

const QuestionsPanel = () => {
  const [questions, setQuestions] = useState<Question[]>(MOCK_QUESTIONS_DATA);

  const questionTypeConfig: any = {
      Standard: { icon: HelpCircle, color: 'bg-blue-100 text-blue-800' },
      Knockout: { icon: XOctagon, color: 'bg-red-100 text-red-800' },
      Announcement: { icon: Megaphone, color: 'bg-yellow-100 text-yellow-800' },
      Flowchart: { icon: GitBranch, color: 'bg-purple-100 text-purple-800' },
  };

  const responseTypeConfig: any = {
      'Multiple Correct': { icon: ListChecks, color: 'bg-gray-100 text-gray-800' },
      'Single Correct': { icon: CheckCircle2, color: 'bg-gray-100 text-gray-800' },
      Text: { icon: Pilcrow, color: 'bg-gray-100 text-gray-800' },
      Video: { icon: Video, color: 'bg-rose-100 text-rose-800' },
      Audio: { icon: Mic, color: 'bg-cyan-100 text-cyan-800' },
      Document: { icon: FileText, color: 'bg-gray-100 text-gray-800' },
      'Branching Logic': { icon: MoveRight, color: 'bg-gray-100 text-gray-800' },
      GIF: { icon: Film, color: 'bg-teal-100 text-teal-800' },
      'Single Location': { icon: MapPin, color: 'bg-orange-100 text-orange-800' },
      'Multiple Locations': { icon: Map, color: 'bg-orange-100 text-orange-800' },
      None: { icon: MinusCircle, color: 'bg-gray-100 text-gray-800' },
  };

  return (
    <div className="bg-slate-50 p-6 min-h-full">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Round Configuration</h1>
          <p className="text-slate-500 text-xs mt-1">Design the scorecard and questions for this stage.</p>
        </div>
        <button 
          className="flex items-center justify-center gap-2 px-3 py-1.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 text-xs transition"
        >
          <PlusCircle size={16} />
          <span>Add Criteria</span>
        </button>
      </header>

      <div className="space-y-4">
        {questions.map((q) => {
          const qConfig = questionTypeConfig[q.questionType] || { icon: HelpCircle, color: 'bg-gray-100 text-gray-700' };
          const rConfig = responseTypeConfig[q.responseType] || { icon: AlertCircle, color: 'bg-gray-100 text-gray-700' };
          
          return (
            <div key={q.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-start gap-4 hover:-translate-y-0.5 hover:shadow-md transition-all group">
              <QuestionTypeIcon type={q.questionType} config={qConfig} />
              
              <div className="flex-grow w-full">
                <p className="text-slate-800 font-medium text-sm">{q.questionText}</p>
                {q.options && q.options.length > 0 && (
                  <div className="mt-2 grid grid-cols-1 gap-1.5">
                    {q.options.map((opt, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-slate-50 p-1.5 rounded border border-slate-100">
                        <p className="text-slate-600 text-xs">{opt.text}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <DataTag text={q.questionType} config={qConfig} />
                  <DataTag text={q.responseType} config={rConfig} />
                </div>
              </div>

              <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 rounded"><Edit3 size={14}/></button>
                <button className="p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600 rounded"><Trash2 size={14}/></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const BezierEdge = ({ start, end, label }: any) => {
  const midX = (start.x + end.x) / 2;
  const path = `M ${start.x} ${start.y} C ${midX} ${start.y}, ${midX} ${end.y}, ${end.x} ${end.y}`;

  return (
    <g>
      <path d={path} fill="none" stroke="#94a3b8" strokeWidth="2.5" />
      {label && (
        <foreignObject x={midX - 40} y={(start.y + end.y) / 2 - 12} width="80" height="24">
          <div className="flex justify-center items-center">
            <span className="bg-white border border-slate-200 text-[10px] font-medium text-slate-600 px-2 py-0.5 rounded-full shadow-sm">
              {label}
            </span>
          </div>
        </foreignObject>
      )}
    </g>
  );
};

const NodeCard = ({ node, onSelect, onEdit, onDelete, onStartConnect, onEndConnect, isSelected, isConnecting }: any) => {
  const config: any = NODE_TYPES[node.type] || NODE_TYPES.ANNOUNCEMENT;

  // Resolve Icon Logic based on requirements
  const getNodeIcon = () => {
    if (node.type === 'ANNOUNCEMENT') return Megaphone;
    if (node.type === 'SCREENING') return ClipboardList;
    if (node.type === 'SURVEY') return BarChart2;
    if (node.type === 'INTERVIEW') {
      const meetTypes = node.data.meetType || [];
      if (meetTypes.length > 1) return Calendar;
      if (meetTypes.includes('Video')) return Video;
      if (meetTypes.includes('In-Person')) return Handshake;
      if (meetTypes.includes('Phone')) return Phone;
      return Calendar; // Default fallback
    }
    return config.icon;
  };

  const Icon = getNodeIcon();

  // Render Stats Logic
  const renderStats = () => {
    const stats = node.data.stats || {};
    
    if (node.type === 'ANNOUNCEMENT') {
      return (
        <>
          <div className="flex flex-col border-r border-slate-100 pr-3">
             <span className="text-[10px] text-slate-400 font-medium">Scheduled</span>
             <span className="text-sm font-bold text-slate-700">{stats.scheduled || 0}</span>
          </div>
          <div className="flex flex-col pl-3">
             <span className="text-[10px] text-slate-400 font-medium">Viewed</span>
             <span className="text-sm font-bold text-blue-600">{stats.viewed || 0}</span>
          </div>
        </>
      );
    }

    if (node.type === 'SCREENING' || node.type === 'SURVEY') {
      return (
        <>
          <div className="flex flex-col border-r border-slate-100 pr-3">
             <span className="text-[10px] text-slate-400 font-medium">Scheduled</span>
             <span className="text-sm font-bold text-slate-700">{stats.scheduled || 0}</span>
          </div>
          <div className="flex flex-col pl-3">
             <span className="text-[10px] text-slate-400 font-medium">Responded</span>
             <span className="text-sm font-bold text-green-600">{stats.responded || 0}</span>
          </div>
        </>
      );
    }

    if (node.type === 'INTERVIEW') {
      return (
        <>
          <div className="flex flex-col border-r border-slate-100 pr-3">
             <span className="text-[10px] text-slate-400 font-medium">Scheduled</span>
             <span className="text-sm font-bold text-slate-700">{stats.scheduled || 0}</span>
          </div>
          <div className="flex flex-col pl-3">
             <span className="text-[10px] text-slate-400 font-medium">Booked</span>
             <span className="text-sm font-bold text-purple-600">{stats.booked || 0}</span>
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <div 
      className={`absolute bg-white rounded-lg shadow-md border-2 group hover:shadow-xl flex flex-col z-10 ${isSelected ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-slate-200'}`}
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
        
        {/* Metric Row */}
        <div className="mt-auto pt-3 flex items-center border-t border-slate-50">
           {renderStats()}
        </div>
      </div>
      
      {/* Handles - Centered vertically using top-1/2 */}
      {/* Input Handle (Left) */}
      <div 
        className={`absolute top-1/2 -translate-y-1/2 -left-[10px] w-5 h-5 rounded-full border-4 border-white shadow-sm cursor-crosshair transition-all z-20 flex items-center justify-center ${isConnecting ? 'bg-green-500 scale-125' : 'bg-slate-300 hover:bg-indigo-500'}`}
        onClick={(e) => { e.stopPropagation(); onEndConnect(node.id); }}
      ></div>
      
      {/* Output Handle (Right) */}
      <div 
        className={`absolute top-1/2 -translate-y-1/2 -right-[10px] w-5 h-5 rounded-full border-4 border-white shadow-sm cursor-crosshair transition-all z-20 flex items-center justify-center ${isConnecting ? 'bg-slate-200' : 'bg-slate-300 hover:bg-indigo-500'}`}
        onClick={(e) => { e.stopPropagation(); onStartConnect(node.id); }}
      ></div>
    </div>
  );
};

const WorkflowBuilder = () => {
  const [nodes, setNodes] = useState<EngageNode[]>(INITIAL_NODES);
  const [edgesList, setEdgesList] = useState<EngageEdge[]>(INITIAL_EDGES);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [editingNode, setEditingNode] = useState<EngageNode | null>(null);
  const [connectingSourceId, setConnectingSourceId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [graphDimensions, setGraphDimensions] = useState({ width: 2000, height: 1200 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const edges = useMemo(() => edgesList.map(edge => {
    const startNode = nodes.find(n => n.id === edge.from);
    const endNode = nodes.find(n => n.id === edge.to);
    if (!startNode || !endNode) return null;
    
    // Explicit calculations using constants to ensure perfect alignment
    return { 
      ...edge, 
      start: { x: startNode.x + CARD_WIDTH, y: startNode.y + (CARD_HEIGHT / 2) }, 
      end: { x: endNode.x, y: endNode.y + (CARD_HEIGHT / 2) } 
    };
  }).filter(Boolean), [nodes, edgesList]);

  // Update dimensions when nodes change to prevent SVG clipping
  useEffect(() => {
    if (nodes.length === 0) return;
    const maxX = Math.max(...nodes.map(n => n.x + CARD_WIDTH), 0);
    const maxY = Math.max(...nodes.map(n => n.y + CARD_HEIGHT), 0);
    
    setGraphDimensions({
        width: Math.max(2000, maxX + 300),
        height: Math.max(1200, maxY + 300)
    });
  }, [nodes]);

  // Setup gesture handling (Pinch-to-zoom & Shift-Scroll)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
        // Pinch Gesture (Trackpad) or Ctrl + Wheel (Mouse)
        if (e.ctrlKey) {
            e.preventDefault();
            // Sensitivity adjustment for smooth zoom
            const zoomFactor = -e.deltaY * 0.002;
            setZoom(prevZoom => Math.min(Math.max(0.2, prevZoom + zoomFactor), 2));
        } 
        // Shift + Wheel (Mouse horizontal scroll emulation)
        else if (e.shiftKey) {
           // If it's a trackpad doing a sideways scroll, deltaX will be set naturally.
           // If it's a mouse wheel + shift, deltaX is often 0, deltaY is set.
           // We map Vertical Wheel to Horizontal Scroll manually if needed.
           if (e.deltaX === 0) {
               container.scrollLeft += e.deltaY;
           }
        }
        // Normal trackpad panning (2 fingers) works natively with overflow:auto
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const addNode = (type: any) => {
    const id = Date.now().toString();
    const maxX = nodes.reduce((max, node) => Math.max(max, node.x), 0);
    const newNode: EngageNode = {
      id, type, title: `New ${NODE_TYPES[type].label}`, x: maxX + 500, y: 300,
      data: { desc: "Configure this stage." }
    };
    setNodes(prev => [...prev, newNode]);
    setSelectedNode(newNode);
  };

  const handleEditNode = (node: EngageNode) => {
    setEditingNode(node);
  };

  const handleSaveNode = (updatedNode: EngageNode) => {
    setNodes(prev => prev.map(n => n.id === updatedNode.id ? updatedNode : n));
    setEditingNode(null);
  };

  const handleAutoLayout = () => {
    const graph: any = {}; nodes.forEach(n => graph[n.id] = []);
    const incoming: any = {}; nodes.forEach(n => incoming[n.id] = 0);
    edgesList.forEach(e => { if(graph[e.from]) graph[e.from].push(e.to); incoming[e.to] = (incoming[e.to] || 0) + 1; });
    
    // Find root nodes (level 0)
    const levels: any = {}; 
    const queue = nodes.filter(n => !incoming[n.id]).map(n => ({ id: n.id, level: 0 }));
    
    // Handle case where there are no clear roots (cycles or disjoint)
    if(queue.length === 0 && nodes.length > 0) queue.push({ id: nodes[0].id, level: 0 });
    
    // BFS to assign levels
    while(queue.length > 0) {
      const { id, level } = queue.shift()!;
      if(levels[id] !== undefined && levels[id] >= level) continue;
      levels[id] = level;
      (graph[id] || []).forEach((nid: any) => queue.push({ id: nid, level: level + 1 }));
    }
    
    // Group by level
    const levelGroups: any = {}; 
    Object.entries(levels).forEach(([id, lvl]: any) => { 
        if(!levelGroups[lvl]) levelGroups[lvl] = []; 
        levelGroups[lvl].push(id); 
    });
    
    // Apply layout
    let newNodes = nodes.map(n => {
      const lvl = levels[n.id] || 0;
      const idx = levelGroups[lvl]?.indexOf(n.id) || 0;
      const groupSize = levelGroups[lvl]?.length || 1;
      
      // Horizontal spacing: Level * (Card Width + Gap)
      // Increased gap from 80 to 200
      const x = 50 + (lvl * (CARD_WIDTH + 200)); 
      
      // Vertical spacing: Center based on group size
      // Increased gap from 40 to 80
      const totalHeight = groupSize * (CARD_HEIGHT + 80);
      const startY = 500 - (totalHeight / 2) + (CARD_HEIGHT / 2); // Center around 500px height
      const y = startY + (idx * (CARD_HEIGHT + 80));
      
      return { ...n, x, y };
    });

    // Normalize Y to ensure no nodes are cut off at the top
    const minY = Math.min(...newNodes.map(n => n.y));
    const paddingY = 50;
    if (minY < paddingY) {
        const offset = paddingY - minY;
        newNodes = newNodes.map(n => ({ ...n, y: n.y + offset }));
    }

    setNodes(newNodes);

    // Zoom to Fit Calculation
    if (containerRef.current) {
        // Calculate bounding box of the graph
        const minX = Math.min(...newNodes.map(n => n.x));
        const maxX = Math.max(...newNodes.map(n => n.x + CARD_WIDTH));
        const finalMinY = Math.min(...newNodes.map(n => n.y));
        const finalMaxY = Math.max(...newNodes.map(n => n.y + CARD_HEIGHT));

        const padding = 100;
        const graphWidth = maxX - minX + (padding * 2);
        const graphHeight = finalMaxY - finalMinY + (padding * 2);
        
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;

        // Calculate scales
        const scaleX = containerWidth / graphWidth;
        const scaleY = containerHeight / graphHeight;
        
        // Fit entirely
        let fitZoom = Math.min(scaleX, scaleY);
        
        // Clamp limits (0.2 to 1.0) - don't zoom in greater than 100% automatically if graph is small
        fitZoom = Math.min(Math.max(fitZoom, 0.2), 1); 
        
        setZoom(fitZoom);
        
        // Scroll to top-left to ensure visibility from the start
        containerRef.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex h-full bg-slate-50 overflow-hidden relative">
      
      {/* Node Config Modal */}
      {editingNode && (
        <NodeConfigurationModal 
          node={editingNode} 
          onClose={() => setEditingNode(null)} 
          onSave={handleSaveNode} 
        />
      )}

      <div 
        ref={containerRef}
        className="flex-1 overflow-auto relative cursor-grab active:cursor-grabbing bg-slate-50" 
        onClick={() => setConnectingSourceId(null)}
        style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      >
        <div 
            className="relative p-10 transition-transform duration-200 origin-top-left"
            style={{ 
              transform: `scale(${zoom})`, 
              width: `${graphDimensions.width}px`, 
              height: `${graphDimensions.height}px` 
            }}
        >
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
            {edges.map((edge: any, i) => <BezierEdge key={i} {...edge} />)}
          </svg>
          {nodes.map(node => (
            <NodeCard 
              key={node.id} node={node} 
              onSelect={setSelectedNode} 
              onEdit={handleEditNode}
              onDelete={(id: string) => { setNodes(prev => prev.filter(n => n.id !== id)); setEdgesList(prev => prev.filter(e => e.from !== id && e.to !== id)); }}
              onStartConnect={setConnectingSourceId} 
              onEndConnect={(id: string) => { if(connectingSourceId && connectingSourceId !== id) setEdgesList(prev => [...prev, { from: connectingSourceId, to: id }]); setConnectingSourceId(null); }}
              isSelected={selectedNode?.id === node.id} 
              isConnecting={!!connectingSourceId && connectingSourceId !== node.id}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-xl border border-slate-200 p-2 flex items-center gap-2 z-20">
        <span className="text-[10px] font-bold text-slate-400 uppercase ml-2 mr-1">Add</span>
        {Object.keys(NODE_TYPES).map((type) => {
          const config: any = NODE_TYPES[type]; const Icon = config.icon;
          return (
            <button key={type} onClick={() => addNode(type)} className="p-2 hover:bg-slate-100 rounded-lg group relative" title={config.label}>
              <div className={`p-1.5 rounded-md ${config.color.replace('border-', '')} bg-opacity-30`}><Icon size={18} /></div>
            </button>
          );
        })}
        <div className="w-px h-6 bg-slate-200 mx-1"></div>
        <button onClick={handleAutoLayout} className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg" title="Auto Layout (Zoom to Fit)"><Wand2 size={18} /></button>
        <div className="w-px h-6 bg-slate-200 mx-1"></div>
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
           <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="p-1.5 hover:bg-white rounded text-slate-500 hover:text-slate-700 shadow-sm transition-all"><ZoomOut size={16}/></button>
           <span className="text-[10px] font-mono text-slate-500 w-8 text-center">{Math.round(zoom * 100)}%</span>
           <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="p-1.5 hover:bg-white rounded text-slate-500 hover:text-slate-700 shadow-sm transition-all"><ZoomIn size={16}/></button>
           <button onClick={() => setZoom(1)} className="p-1.5 hover:bg-white rounded text-slate-500 hover:text-slate-700 shadow-sm transition-all ml-1" title="Reset Zoom"><RotateCcw size={14}/></button>
        </div>
      </div>

      <div className={`w-[450px] bg-white border-l border-slate-200 shadow-xl transition-transform duration-300 absolute right-0 top-0 h-full overflow-hidden flex flex-col z-30 ${selectedNode ? 'translate-x-0' : 'translate-x-full'}`}>
        {selectedNode && (
          <>
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">Configure Stage</h3>
              <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-slate-600"><X size={18}/></button>
            </div>
            <div className="p-4 border-b border-slate-100 space-y-3 bg-white">
                <input type="text" value={selectedNode.title} onChange={(e) => setNodes(nodes.map(n => n.id === selectedNode.id ? {...n, title: e.target.value} : n))} className="w-full p-2 border border-slate-300 rounded text-sm font-bold" />
                <textarea value={selectedNode.data.desc} onChange={(e) => setNodes(nodes.map(n => n.id === selectedNode.id ? {...n, data: {...n.data, desc: e.target.value}} : n))} className="w-full p-2 border border-slate-300 rounded text-xs h-16 resize-none" />
            </div>
            <div className="flex-1 overflow-y-auto">
               <QuestionsPanel />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CandidateTracking = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(MOCK_CANDIDATES_CAMPAIGN[0]);

  const steps = [
    { label: "Announcement", status: "completed" },
    { label: "Screening (Basic)", status: "completed" },
    { label: "Tech Quiz", status: "completed" },
    { label: "Interview (System Design)", status: "active" },
    { label: "Offer", status: "locked" }
  ];

  return (
    <div className="flex h-full bg-white">
      <div className="w-80 border-r border-slate-200 bg-slate-50 flex flex-col">
        <div className="p-4 border-b border-slate-200 bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
            <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {MOCK_CANDIDATES_CAMPAIGN.map(c => (
            <div 
              key={c.id} 
              onClick={() => setSelectedCandidate(c)}
              className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-white transition-colors group ${selectedCandidate.id === c.id ? 'bg-white border-l-4 border-l-indigo-600 shadow-sm' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${selectedCandidate.id === c.id ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-500 group-hover:bg-slate-300'}`}>
                  {c.avatar}
                </div>
                <div className="min-w-0">
                  <h4 className={`font-bold text-sm truncate ${selectedCandidate.id === c.id ? 'text-indigo-900' : 'text-slate-700'}`}>{c.name}</h4>
                  <p className="text-xs text-slate-500 truncate">{c.role}</p>
                </div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                 <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">{c.stage}</span>
                 <span className="text-[10px] text-slate-400">2h ago</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden bg-white">
         <div className="p-8 pb-4 border-b border-slate-100">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">{selectedCandidate.name}</h2>
                    <p className="text-slate-500 text-sm flex items-center gap-2"><MapPin size={14}/> San Francisco, CA • {selectedCandidate.role}</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50">View Profile</button>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm">Review & Advance</button>
                </div>
            </div>

            {/* Horizontal Stepper */}
            <div className="relative flex items-center justify-between px-4 pb-4">
                <div className="absolute left-0 top-1/2 w-full h-0.5 bg-slate-100 -z-10"></div>
                {steps.map((step, i) => (
                    <div key={i} className="flex flex-col items-center bg-white px-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 mb-2 transition-all ${
                            step.status === 'completed' ? 'bg-green-500 border-green-500 text-white' :
                            step.status === 'active' ? 'bg-white border-indigo-600 text-indigo-600 shadow-lg scale-110' :
                            'bg-white border-slate-200 text-slate-300'
                        }`}>
                            {step.status === 'completed' ? <CheckCircle size={16}/> : <span className="text-xs font-bold">{i + 1}</span>}
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${step.status === 'active' ? 'text-indigo-600' : 'text-slate-400'}`}>{step.label}</span>
                    </div>
                ))}
            </div>
         </div>

         <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50 space-y-6">
            {/* Active Action Card */}
            <div className="bg-white rounded-xl border border-indigo-100 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-50 to-white px-6 py-4 border-b border-indigo-50 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-pulse"></span>
                        <h3 className="font-bold text-indigo-900">Current Round: System Design Interview</h3>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded font-medium border border-yellow-200">Pending Feedback</span>
                </div>
                <div className="p-6">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400"><User size={24}/></div>
                        <div>
                            <p className="text-sm font-bold text-slate-800">Interviewer: John Doe (Engineering Manager)</p>
                            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><Clock size={12}/> Scheduled for Today, 2:00 PM - 3:00 PM</p>
                            <div className="mt-2 flex gap-2">
                                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">Video Call</span>
                                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">Live Coding</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 pt-4 border-t border-slate-50">
                        <button className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-indigo-700 shadow-sm transition-colors">Launch Interview Room</button>
                        <button className="flex-1 bg-white border border-slate-200 text-slate-600 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">Nudge Interviewer</button>
                    </div>
                </div>
            </div>

            {/* History */}
            <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1">Completed Rounds</h3>
                <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4 border border-slate-200 flex justify-between items-center shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-50 text-green-600 rounded-lg"><FileText size={18}/></div>
                            <div>
                                <p className="font-bold text-slate-700 text-sm">Tech Quiz (React)</p>
                                <p className="text-xs text-slate-500">Score: 88/100 • Automated</p>
                            </div>
                        </div>
                        <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full border border-green-100">Passed</span>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-slate-200 flex justify-between items-center shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Mail size={18}/></div>
                            <div>
                                <p className="font-bold text-slate-700 text-sm">Initial Announcement</p>
                                <p className="text-xs text-slate-500">Sent on Oct 12 • Opened</p>
                            </div>
                        </div>
                        <span className="text-slate-400 text-xs hover:text-indigo-600 cursor-pointer">View Email</span>
                    </div>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const InterviewRoom = () => (
  <div className="flex h-full bg-slate-100 overflow-hidden">
     {/* Left: Context */}
     <div className="w-1/2 bg-slate-600 flex flex-col border-r border-slate-700">
        <div className="h-14 bg-slate-800 flex items-center justify-between px-4 border-b border-slate-700 text-white shrink-0">
           <h3 className="font-bold text-sm flex items-center gap-2"><FileText size={16}/> Candidate Resume</h3>
           <div className="flex gap-2 text-xs text-slate-400">
              <button className="hover:text-white">Download</button>
              <span>|</span>
              <button className="hover:text-white">Pop-out</button>
           </div>
        </div>
        <div className="flex-1 bg-slate-500 p-8 overflow-y-auto">
           <div className="bg-white shadow-2xl min-h-[800px] w-full max-w-2xl mx-auto rounded-sm p-12 relative">
              <div className="w-full h-6 bg-slate-200 mb-8"></div>
              <div className="w-2/3 h-4 bg-slate-300 mb-2"></div>
              <div className="w-1/2 h-4 bg-slate-300 mb-12"></div>
              <div className="space-y-4 mb-8">
                 <div className="w-full h-px bg-slate-200 mb-4"></div>
                 <div className="w-full h-3 bg-slate-100"></div>
                 <div className="w-full h-3 bg-slate-100"></div>
                 <div className="w-3/4 h-3 bg-slate-100"></div>
              </div>
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1">MOCK PDF</span>
           </div>
        </div>
     </div>

     {/* Right: Scorecard */}
     <div className="w-1/2 bg-white flex flex-col">
        <div className="h-14 border-b border-slate-200 px-6 flex items-center justify-between shrink-0 bg-white">
           <div>
              <h2 className="font-bold text-slate-800">System Design Interview</h2>
              <p className="text-xs text-slate-500">Evaluator: You</p>
           </div>
           <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-medium">In Progress</span>
        </div>
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
           {/* Criteria */}
           <div>
              <div className="flex justify-between mb-2">
                 <label className="font-bold text-slate-700 text-sm">Architecture Knowledge</label>
                 <span className="text-xs text-slate-400">Weight: High</span>
              </div>
              <p className="text-xs text-slate-500 mb-3">Ability to design scalable systems and choose correct databases.</p>
              <div className="flex gap-2">
                 {[1,2,3,4,5].map(n => (
                    <button key={n} className="flex-1 py-2 border border-slate-300 rounded hover:border-indigo-500 hover:bg-indigo-50 text-sm font-medium text-slate-600 focus:bg-indigo-600 focus:text-white focus:border-indigo-600 transition-colors">{n}</button>
                 ))}
              </div>
           </div>

           <div>
              <div className="flex justify-between mb-2">
                 <label className="font-bold text-slate-700 text-sm">Communication</label>
              </div>
              <p className="text-xs text-slate-500 mb-3">Clarity of thought and ability to explain trade-offs.</p>
              <div className="flex gap-4">
                 <button className="flex-1 py-3 border border-slate-200 rounded-lg hover:bg-green-50 hover:border-green-300 hover:text-green-700 text-slate-500 flex items-center justify-center gap-2 transition-colors"><ThumbsUp size={18}/> Good</button>
                 <button className="flex-1 py-3 border border-slate-200 rounded-lg hover:bg-red-50 hover:border-red-300 hover:text-red-700 text-slate-500 flex items-center justify-center gap-2 transition-colors"><ThumbsDown size={18}/> Poor</button>
              </div>
           </div>

           <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-amber-800 mb-2">
                 <AlertCircle size={16} />
                 <span className="text-xs font-bold uppercase">Feedback Required</span>
              </div>
              <textarea className="w-full bg-white border border-amber-300 rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[80px]" placeholder="Please explain the score..."></textarea>
           </div>

           <div className="pt-6 border-t border-slate-100">
              <label className="block font-bold text-slate-800 mb-4 text-sm">Final Recommendation</label>
              <div className="grid grid-cols-4 gap-3">
                 <button className="py-3 border border-red-200 bg-red-50 text-red-700 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors">Strong No</button>
                 <button className="py-3 border border-slate-200 bg-white text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">No</button>
                 <button className="py-3 border border-slate-200 bg-white text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">Yes</button>
                 <button className="py-3 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 shadow-md transition-colors">Strong Yes</button>
              </div>
           </div>
        </div>
     </div>
  </div>
);

// --- MAIN ENGAGE COMPONENT ---

export const EngageWorkflow = ({ onClose }: { onClose?: () => void }) => {
  const [activeTab, setActiveTab] = useState<'BUILDER' | 'TRACKING' | 'ROOM'>('BUILDER');

  return (
    <div className="flex flex-col h-full bg-white relative">
       {/* Top Navigation Bar */}
       <div className="h-14 border-b border-slate-200 flex items-center justify-between px-6 bg-white shrink-0 z-40">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-sm">
                <GitBranch size={18} />
             </div>
             <div>
                <h2 className="font-bold text-slate-800 leading-tight">Engage AI</h2>
                <p className="text-[10px] text-slate-500 font-medium">Campaign: Warehouse Bot</p>
             </div>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-lg">
             <button 
               onClick={() => setActiveTab('BUILDER')}
               className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'BUILDER' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
             >
                <Layout size={14} /> Workflow Builder
             </button>
             <button 
               onClick={() => setActiveTab('TRACKING')}
               className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'TRACKING' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
             >
                <Users size={14} /> Candidate Tracking
             </button>
             <button 
               onClick={() => setActiveTab('ROOM')}
               className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'ROOM' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
             >
                <Video size={14} /> Interview Room
             </button>
          </div>

          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-200 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Active
             </div>
             {onClose && <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded text-slate-400"><X size={18}/></button>}
          </div>
       </div>

       {/* Content Area */}
       <div className="flex-1 overflow-hidden relative">
          {activeTab === 'BUILDER' && <WorkflowBuilder />}
          {activeTab === 'TRACKING' && <CandidateTracking />}
          {activeTab === 'ROOM' && <InterviewRoom />}
       </div>
    </div>
  );
};
