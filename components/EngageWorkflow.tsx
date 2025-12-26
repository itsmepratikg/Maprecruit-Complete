import React, { useState, useMemo } from 'react';
import { 
  FileText, Video, MessageSquare, Split, Mail, Edit3, Trash2, 
  HelpCircle, Megaphone, ListChecks, CheckCircle2, Pilcrow, MoveRight, 
  Film, MapPin, Map, MinusCircle, XOctagon, Mic, PlusCircle, Copy, 
  Wand2, X, GripVertical, ArrowRight, GitBranch, AlertCircle
} from 'lucide-react';
import { NODE_TYPES, MOCK_QUESTIONS_DATA, INITIAL_NODES, INITIAL_EDGES } from '../data';
import { EngageNode, EngageEdge, Question } from '../types';

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

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: Date.now(),
      questionText: "New Question",
      questionType: "Standard",
      responseType: "Text",
      options: [],
      responses: 0
    };
    setQuestions([newQuestion, ...questions]);
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <div className="bg-slate-50 p-4 min-h-full">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Questionnaire</h1>
          <p className="text-slate-500 text-sm mt-1">Manage all questions for this round.</p>
        </div>
        <button 
          onClick={handleAddQuestion}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 text-sm transition"
        >
          <PlusCircle size={18} />
          <span>Add Question</span>
        </button>
      </header>

      <div className="space-y-4">
        {questions.map((q) => {
          const qConfig = questionTypeConfig[q.questionType] || { icon: HelpCircle, color: 'bg-gray-100 text-gray-700' };
          const rConfig = responseTypeConfig[q.responseType] || { icon: AlertCircle, color: 'bg-gray-100 text-gray-700' };
          
          return (
            <div key={q.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-start gap-4 hover:-translate-y-0.5 hover:shadow-md transition-all">
              <QuestionTypeIcon type={q.questionType} config={qConfig} />
              
              <div className="flex-grow w-full">
                <p className="text-slate-800 font-medium text-sm">{q.questionText}</p>
                
                {q.options && q.options.length > 0 && (
                  <div className="mt-3 grid grid-cols-1 gap-2">
                    {q.options.map((opt, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-slate-50 p-2 rounded-md border border-slate-200">
                        <p className="text-slate-700 text-xs">{opt.text}</p>
                        <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-100 rounded-full px-2 py-0.5">{opt.responses}</span>
                      </div>
                    ))}
                  </div>
                )}

                {q.questionType === 'Flowchart' && (
                  <button className="flex items-center gap-2 text-xs font-medium text-indigo-600 hover:underline mt-3">
                    <span>View Logic Flow</span>
                    <ArrowRight size={14} />
                  </button>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <DataTag text={q.questionType} config={qConfig} />
                  <DataTag text={q.responseType} config={rConfig} />
                  {q.responses !== null && (
                    <span className="text-xs text-indigo-600 font-medium ml-1">
                      ({q.responses || 0} Responses)
                    </span>
                  )}
                </div>
              </div>

              <div className="flex-shrink-0 flex items-center gap-1 mt-2 sm:mt-0">
                <button className="p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 rounded transition"><Edit3 size={16}/></button>
                <button className="p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 rounded transition"><Copy size={16}/></button>
                <button 
                  onClick={() => handleDeleteQuestion(q.id)}
                  className="p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600 rounded transition"
                >
                  <Trash2 size={16}/>
                </button>
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
      <path d={path} fill="none" stroke="#94a3b8" strokeWidth="2" />
      {label && (
        <foreignObject x={midX - 40} y={(start.y + end.y) / 2 - 12} width="80" height="24">
          <div className="flex justify-center items-center">
            <span className="bg-white border border-gray-200 text-xs text-gray-500 px-2 py-0.5 rounded-full shadow-sm">
              {label}
            </span>
          </div>
        </foreignObject>
      )}
    </g>
  );
};

const NodeCard = ({ node, onSelect, onDelete, onStartConnect, onEndConnect, isSelected, isConnecting }: any) => {
  const config: any = NODE_TYPES[node.type];
  const Icon = config.icon;

  return (
    <div 
      className={`absolute w-64 bg-white rounded-lg shadow-md border-2 transition-all group hover:shadow-xl ${isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-100'}`}
      style={{ left: node.x, top: node.y - 40 }}
      onClick={() => onSelect(node)}
    >
      <div className={`h-2 rounded-t-lg w-full ${config.color.split(' ')[0]}`}></div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className={`p-2 rounded-md ${config.color.replace('border-', '')} bg-opacity-20`}>
            <Icon size={18} />
          </div>
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><Edit3 size={14}/></button>
            <button 
              className="p-1 hover:bg-red-50 rounded text-red-400"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(node.id);
              }}
            >
              <Trash2 size={14}/>
            </button>
          </div>
        </div>
        <h4 className="font-semibold text-gray-800 text-sm mb-1">{node.title}</h4>
        <p className="text-xs text-gray-500 line-clamp-2">{node.data.desc}</p>
      </div>
      <div 
        className={`absolute top-1/2 -left-3 w-4 h-4 rounded-full border-2 border-white cursor-crosshair transition-colors z-10 ${isConnecting ? 'bg-green-400 scale-125 animate-pulse' : 'bg-gray-300 hover:bg-blue-400'}`}
        onClick={(e) => { e.stopPropagation(); onEndConnect(node.id); }}
        title="Connect to this stage"
      ></div>
      <div 
        className={`absolute top-1/2 -right-3 w-4 h-4 rounded-full border-2 border-white cursor-crosshair transition-colors z-10 ${isConnecting ? 'bg-gray-200' : 'bg-gray-300 hover:bg-blue-500'}`}
        onClick={(e) => { e.stopPropagation(); onStartConnect(node.id); }}
        title="Start connection from this stage"
      ></div>
    </div>
  );
};

export const EngageWorkflow = ({ onClose }: { onClose: () => void }) => {
  const [nodes, setNodes] = useState<EngageNode[]>(INITIAL_NODES);
  const [edgesList, setEdgesList] = useState<EngageEdge[]>(INITIAL_EDGES);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [connectingSourceId, setConnectingSourceId] = useState<string | null>(null);
  
  const edges = useMemo(() => edgesList.map(edge => {
    const startNode = nodes.find(n => n.id === edge.from);
    const endNode = nodes.find(n => n.id === edge.to);
    
    if (!startNode || !endNode) return null;

    return {
      ...edge,
      start: { x: startNode.x + 256, y: startNode.y },
      end: { x: endNode.x, y: endNode.y }
    };
  }).filter(Boolean), [nodes, edgesList]);

  const addNode = (type: any) => {
    const id = Date.now().toString();
    const maxX = nodes.reduce((max, node) => Math.max(max, node.x), 0);
    const config: any = NODE_TYPES[type];
    
    const newNode: EngageNode = {
      id,
      type,
      title: `New ${config.label}`,
      x: maxX + 350, 
      y: 300,
      data: { desc: "Drag from the dots to connect to other stages" }
    };
    setNodes((prev) => [...prev, newNode]);
    setSelectedNode(newNode);
  };

  const deleteNode = (id: string) => {
    setNodes((prev) => prev.filter(n => n.id !== id));
    setEdgesList(prev => prev.filter(e => e.from !== id && e.to !== id));
    if (selectedNode?.id === id) setSelectedNode(null);
  };

  const handleStartConnect = (nodeId: string) => {
    setConnectingSourceId(nodeId);
  };

  const handleEndConnect = (nodeId: string) => {
    if (connectingSourceId && connectingSourceId !== nodeId) {
      const exists = edgesList.some(e => e.from === connectingSourceId && e.to === nodeId);
      if (!exists) {
        setEdgesList(prev => [...prev, { from: connectingSourceId, to: nodeId }]);
      }
      setConnectingSourceId(null);
    }
  };

  const handleAutoLayout = () => {
    const graph: any = {}; 
    const incoming: any = {};
    nodes.forEach(n => {
      graph[n.id] = [];
      incoming[n.id] = 0;
    });
    edgesList.forEach(e => {
      if (graph[e.from]) graph[e.from].push(e.to);
      if (typeof incoming[e.to] !== 'undefined') incoming[e.to]++;
    });

    const levels: any = {};
    const queue = nodes.filter(n => incoming[n.id] === 0).map(n => ({ id: n.id, level: 0 }));
    
    if (queue.length === 0 && nodes.length > 0) {
        queue.push({ id: nodes[0].id, level: 0 });
    }

    while (queue.length > 0) {
      const { id, level } = queue.shift()!;
      if (levels[id] !== undefined && levels[id] >= level) continue;
      levels[id] = level;
      const neighbors = graph[id] || [];
      neighbors.forEach((nid: any) => {
        queue.push({ id: nid, level: level + 1 });
      });
    }

    nodes.forEach(n => {
        if (levels[n.id] === undefined) levels[n.id] = 0;
    });

    const levelGroups: any = {};
    Object.entries(levels).forEach(([id, lvl]: any) => {
      if (!levelGroups[lvl]) levelGroups[lvl] = [];
      levelGroups[lvl].push(id);
    });

    const newNodes = nodes.map(n => {
      const lvl = levels[n.id];
      const index = levelGroups[lvl].indexOf(n.id);
      const count = levelGroups[lvl].length;
      const startY = 300 - ((count - 1) * 250) / 2;
      
      return {
        ...n,
        x: 50 + (lvl * 350),
        y: startY + (index * 250)
      };
    });

    setNodes(newNodes);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-slate-50 flex flex-col">
       <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-40">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center"><Wand2 size={24}/></div>
             <div>
                <h3 className="font-bold text-slate-800">Engage AI Workflow</h3>
                <p className="text-xs text-slate-500">Campaign: Test Forklift</p>
             </div>
          </div>
          <div className="flex items-center gap-2">
             <button onClick={handleAutoLayout} className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded font-medium text-sm hover:bg-slate-50">Auto Layout</button>
             <button className="px-4 py-2 bg-indigo-600 text-white rounded font-medium text-sm hover:bg-indigo-700">Save Workflow</button>
             <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded"><X size={24}/></button>
          </div>
       </div>
      
      {connectingSourceId && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg z-50 text-sm font-medium animate-bounce">
          Select another stage to connect
        </div>
      )}

      <div className="flex-1 flex overflow-hidden relative">
        <div 
            className="flex-1 overflow-auto relative cursor-grab active:cursor-grabbing bg-slate-50" 
            onClick={() => setConnectingSourceId(null)}
            style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        >
            <div className="min-w-[1800px] min-h-[1200px] relative p-10">
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                {edges.map((edge: any, i) => (
                <BezierEdge key={i} start={edge.start} end={edge.end} label={edge.label} />
                ))}
            </svg>
            
            {nodes.map(node => (
                <NodeCard 
                key={node.id} 
                node={node} 
                onSelect={setSelectedNode} 
                onDelete={deleteNode}
                onStartConnect={handleStartConnect}
                onEndConnect={handleEndConnect}
                isSelected={selectedNode?.id === node.id}
                isConnecting={!!connectingSourceId && connectingSourceId !== node.id}
                />
            ))}
            </div>
        </div>

        <div className={`w-[400px] bg-white border-l border-gray-200 shadow-2xl transition-transform duration-300 absolute right-0 top-0 h-full overflow-y-auto ${selectedNode ? 'translate-x-0' : 'translate-x-full'} z-30`}>
            {selectedNode && (
            <div className="h-full flex flex-col">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h3 className="text-lg font-bold text-gray-800">Configure {
                    // @ts-ignore
                    NODE_TYPES[selectedNode.type].label
                }</h3>
                <button onClick={() => setSelectedNode(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                </div>

                {selectedNode.type === 'SCREENING' ? (
                <div className="flex-1 overflow-y-auto">
                    <QuestionsPanel />
                </div>
                ) : (
                <div className="p-6 space-y-6">
                    <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Stage Name</label>
                    <input 
                        type="text" 
                        value={selectedNode.title} 
                        onChange={(e) => setNodes(nodes.map(n => n.id === selectedNode.id ? {...n, title: e.target.value} : n))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    />
                    </div>
                    <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Description</label>
                    <textarea 
                        value={selectedNode.data.desc}
                        onChange={(e) => setNodes(nodes.map(n => n.id === selectedNode.id ? {...n, data: { ...n.data, desc: e.target.value }} : n))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                        rows={3}
                    />
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-medium text-gray-700">Generic Settings</span>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3 bg-white p-2 rounded border border-gray-200 shadow-sm">
                        <div className="cursor-move text-gray-300"><GripVertical size={14}/></div>
                        <div className="flex-1">
                            <p className="text-xs font-medium">Require Approval</p>
                        </div>
                        <input type="checkbox" className="rounded text-blue-600"/>
                        </div>
                    </div>
                    </div>
                </div>
                )}
            </div>
            )}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-xl border border-gray-200 p-2 flex items-center space-x-2 z-50">
        <div className="px-3 py-1 border-r border-gray-200">
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Add Stage</span>
        </div>
        {Object.keys(NODE_TYPES).map((type) => {
          const config: any = NODE_TYPES[type];
          const Icon = config.icon;
          return (
            <button
              key={type}
              onClick={() => addNode(type)}
              className="group relative p-2 hover:bg-gray-100 rounded-xl transition-all flex flex-col items-center"
            >
              <div className={`p-2 rounded-lg ${config.color.replace('border-', '')} bg-opacity-20 text-opacity-80`}>
                <Icon size={20} />
              </div>
              <span className="absolute -top-10 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                {config.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  )
};