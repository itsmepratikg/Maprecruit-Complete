
import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { 
  GitBranch, Users, Video, Layout, ZoomIn, ZoomOut, RotateCcw, RotateCw,
  Link as LinkIcon, Save, AlertTriangle, CheckCircle, X
} from 'lucide-react';
import { NODE_TYPES } from '../data';
import { EngageNode, EngageEdge } from '../types';
import { INITIAL_NODES_GRAPH, INITIAL_EDGES_GRAPH } from './engage/demoData';
import { START_NODE_WIDTH, START_NODE_HEIGHT, BUBBLE_SIZE, CARD_WIDTH, CARD_HEIGHT } from './engage/constants';
import { NodeCard, BezierEdge } from './engage/CanvasNodes';
import { AutomationPlaceholderModal, NodeConfigurationModal } from './engage/ConfigModals';
import { CandidateTracking, InterviewRoom } from './engage/Views';

// --- MODALS ---

const SaveConfirmationModal = ({ isOpen, onClose, onConfirm }: any) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 animate-in zoom-in-95 duration-200">
                <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                        <Save size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Save Workflow?</h3>
                    <p className="text-sm text-slate-500 mb-6">
                        This will overwrite the current active workflow configuration. Undo/Redo history will be cleared.
                    </p>
                    <div className="flex gap-3 w-full">
                        <button onClick={onClose} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 transition-colors">Cancel</button>
                        <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-sm transition-colors">Confirm Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ValidationErrorsModal = ({ isOpen, onClose, errors }: any) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200 border-l-4 border-red-500">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <AlertTriangle size={20} className="text-red-500" /> Validation Failed
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                </div>
                <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {errors.map((err: string, i: number) => (
                        <div key={i} className="flex items-start gap-3 bg-red-50 p-3 rounded-lg text-sm text-red-800 border border-red-100">
                            <span className="mt-0.5">•</span>
                            <span>{err}</span>
                        </div>
                    ))}
                </div>
                <button onClick={onClose} className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-bold hover:bg-slate-200 transition-colors">
                    Dismiss & Fix
                </button>
            </div>
        </div>
    );
};

// --- ALIGNMENT ALGORITHM ---
const calculateAutoLayout = (nodes: EngageNode[], edges: EngageEdge[]) => {
    // 1. Hierarchy Calc
    const adjacency: Record<string, string[]> = {};
    const incoming: Record<string, number> = {}; 
    nodes.forEach(n => { adjacency[n.id] = []; incoming[n.id] = 0; });
    edges.forEach(e => {
        if (adjacency[e.from]) adjacency[e.from].push(e.to);
        if (incoming[e.to] !== undefined) incoming[e.to]++;
    });

    const levels: Record<number, string[]> = {};
    const queue: {id: string, depth: number}[] = [];

    // Find roots (Start or no incoming)
    nodes.filter(n => n.type === 'START' || incoming[n.id] === 0).forEach(n => {
        queue.push({ id: n.id, depth: 0 });
    });

    const visited = new Set<string>();
    const processQueue = () => {
        while(queue.length) {
            const { id, depth } = queue.shift()!;
            if (visited.has(id)) continue;
            visited.add(id);
            if (!levels[depth]) levels[depth] = [];
            levels[depth].push(id);
            adjacency[id]?.forEach(childId => queue.push({ id: childId, depth: depth + 1 }));
        }
    };
    processQueue();
    // Process disconnected components
    nodes.forEach(n => { if (!visited.has(n.id)) { queue.push({ id: n.id, depth: 0 }); processQueue(); } });

    // 2. Position Assignment
    const GAP_X = 100;
    const GAP_Y = 60;
    let currentX = 50;
    const newNodes = [...nodes];
    const maxDepth = Math.max(...Object.keys(levels).map(Number));

    for (let d = 0; d <= maxDepth; d++) {
        const levelNodeIds = levels[d] || [];
        if (levelNodeIds.length === 0) continue;
        let maxW = 0;
        
        // Calculate total height for vertical centering relative to canvas center (approx 350)
        const totalHeight = levelNodeIds.reduce((acc, nid) => {
            const n = nodes.find(x => x.id === nid)!;
            const h = n.type === 'START' ? START_NODE_HEIGHT : (n.type === 'CRITERIA' ? BUBBLE_SIZE : CARD_HEIGHT);
            return acc + h;
        }, 0) + (levelNodeIds.length - 1) * GAP_Y;

        let currentY = 350 - (totalHeight / 2); 
        if (currentY < 50) currentY = 50;

        levelNodeIds.forEach(nid => {
            const nodeIndex = newNodes.findIndex(n => n.id === nid);
            if (nodeIndex === -1) return;
            const n = newNodes[nodeIndex];
            const w = n.type === 'START' ? START_NODE_WIDTH : (n.type === 'CRITERIA' ? BUBBLE_SIZE : CARD_WIDTH);
            const h = n.type === 'START' ? START_NODE_HEIGHT : (n.type === 'CRITERIA' ? BUBBLE_SIZE : CARD_HEIGHT);
            
            maxW = Math.max(maxW, w);
            newNodes[nodeIndex] = { ...n, x: currentX, y: currentY };
            currentY += h + GAP_Y;
        });
        currentX += maxW + GAP_X;
    }
    return newNodes;
};

// --- WORKFLOW BUILDER LOGIC ---

interface WorkflowBuilderProps {
    onDirtyChange: (isDirty: boolean) => void;
}

const WorkflowBuilder = ({ onDirtyChange }: WorkflowBuilderProps) => {
  // Graph State
  const [nodes, setNodes] = useState<EngageNode[]>(INITIAL_NODES_GRAPH);
  const [edgesList, setEdgesList] = useState<EngageEdge[]>(INITIAL_EDGES_GRAPH);
  
  // History State
  const [history, setHistory] = useState<{nodes: EngageNode[], edges: EngageEdge[]}[]>([{nodes: INITIAL_NODES_GRAPH, edges: INITIAL_EDGES_GRAPH}]);
  const [historyStep, setHistoryStep] = useState(0);
  const [isSaved, setIsSaved] = useState(true);

  // Interaction State
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [editingNode, setEditingNode] = useState<EngageNode | null>(null);
  const [configCriteriaId, setConfigCriteriaId] = useState<string | null>(null);
  const [connectingNodeId, setConnectingNodeId] = useState<string | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  
  const [zoom, setZoom] = useState(0.85); 
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [scrollStart, setScrollStart] = useState({ left: 0, top: 0 });

  // Initial Auto Align
  useEffect(() => {
      // Run alignment once on mount to ensure dynamic look is default
      const aligned = calculateAutoLayout(INITIAL_NODES_GRAPH, INITIAL_EDGES_GRAPH);
      setNodes(aligned);
      // Reset history with aligned state so undo doesn't jump to unaligned
      setHistory([{nodes: aligned, edges: INITIAL_EDGES_GRAPH}]);
  }, []);

  // Sync dirty state with parent
  useEffect(() => {
      onDirtyChange(!isSaved);
  }, [isSaved, onDirtyChange]);

  // --- HISTORY MANAGEMENT ---

  const recordHistory = useCallback((newNodes: EngageNode[], newEdges: EngageEdge[]) => {
      const newHistory = history.slice(0, historyStep + 1);
      newHistory.push({ nodes: JSON.parse(JSON.stringify(newNodes)), edges: JSON.parse(JSON.stringify(newEdges)) });
      if (newHistory.length > 50) newHistory.shift();

      setHistory(newHistory);
      setHistoryStep(newHistory.length - 1);
      setIsSaved(false);
  }, [history, historyStep]);

  const handleUndo = () => {
      if (historyStep > 0) {
          const prevStep = historyStep - 1;
          const prevState = history[prevStep];
          setNodes(prevState.nodes);
          setEdgesList(prevState.edges);
          setHistoryStep(prevStep);
          setIsSaved(false);
      }
  };

  const handleRedo = () => {
      if (historyStep < history.length - 1) {
          const nextStep = historyStep + 1;
          const nextState = history[nextStep];
          setNodes(nextState.nodes);
          setEdgesList(nextState.edges);
          setHistoryStep(nextStep);
          setIsSaved(false);
      }
  };

  // --- VALIDATION & SAVE ---

  const validateWorkflow = () => {
      const errors: string[] = [];
      const adj: Record<string, string[]> = {};
      nodes.forEach(n => adj[n.id] = []);
      edgesList.forEach(e => {
          if (adj[e.from]) adj[e.from].push(e.to);
      });

      const startNode = nodes.find(n => n.type === 'START');
      if (!startNode) {
          errors.push("Missing Start Node. Workflow must have a start trigger.");
      } else {
          const visited = new Set<string>();
          const queue = [startNode.id];
          visited.add(startNode.id);

          while (queue.length > 0) {
              const curr = queue.shift()!;
              const neighbors = adj[curr] || [];
              neighbors.forEach(n => {
                  if (!visited.has(n)) {
                      visited.add(n);
                      queue.push(n);
                  }
              });
          }

          const orphans = nodes.filter(n => !visited.has(n.id));
          if (orphans.length > 0) {
              orphans.forEach(o => {
                  errors.push(`Node "${o.title}" is unreachable from Start.`);
              });
          }
      }

      nodes.forEach(n => {
          if (!n.title || n.title.trim() === '') {
              errors.push(`A node of type ${n.type} has an empty title.`);
          }
      });

      return errors;
  };

  const handleSaveRequest = () => {
      const errors = validateWorkflow();
      if (errors.length > 0) {
          setValidationErrors(errors);
      } else {
          setShowSaveModal(true);
      }
  };

  const confirmSave = () => {
      setIsSaved(true);
      // Reset history stack base to current state
      setHistory([{ nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edgesList)) }]);
      setHistoryStep(0);
      setShowSaveModal(false);
  };

  // --- CANVAS CALCULATIONS ---

  const contentSize = useMemo(() => {
      let maxX = 0;
      let maxY = 0;
      nodes.forEach(node => {
          const w = node.type === 'START' ? START_NODE_WIDTH : (node.type === 'CRITERIA' ? BUBBLE_SIZE : CARD_WIDTH);
          const h = node.type === 'START' ? START_NODE_HEIGHT : (node.type === 'CRITERIA' ? BUBBLE_SIZE : CARD_HEIGHT);
          maxX = Math.max(maxX, node.x + w);
          maxY = Math.max(maxY, node.y + h);
      });
      return { width: maxX + 400, height: maxY + 400 };
  }, [nodes]);

  const edges = useMemo(() => edgesList.map(edge => {
    const startNode = nodes.find(n => n.id === edge.from);
    const endNode = nodes.find(n => n.id === edge.to);
    if (!startNode || !endNode) return null;
    
    const getOutputPos = (n: EngageNode) => {
        if (n.type === 'START') return { x: n.x + START_NODE_WIDTH, y: n.y + (START_NODE_HEIGHT / 2) };
        if (n.type === 'CRITERIA') return { x: n.x + BUBBLE_SIZE, y: n.y + (BUBBLE_SIZE / 2) };
        return { x: n.x + CARD_WIDTH, y: n.y + (CARD_HEIGHT / 2) };
    };

    const getInputPos = (n: EngageNode) => {
        if (n.type === 'CRITERIA') return { x: n.x, y: n.y + (BUBBLE_SIZE / 2) };
        return { x: n.x, y: n.y + (CARD_HEIGHT / 2) };
    };

    return { 
      ...edge, 
      start: getOutputPos(startNode), 
      end: getInputPos(endNode)
    };
  }).filter(Boolean), [nodes, edgesList]);

  // --- HANDLERS ---

  const handleEditNode = (node: EngageNode) => {
      if (node.type === 'CRITERIA' || node.type === 'START') {
          setConfigCriteriaId(node.id);
      } else {
          setEditingNode(node);
      }
  };

  const handleSaveNode = (updatedNode: EngageNode) => {
    const newNodes = nodes.map(n => n.id === updatedNode.id ? updatedNode : n);
    setNodes(newNodes);
    setEditingNode(null);
    recordHistory(newNodes, edgesList);
  };

  const handleToggleAutomation = (criteriaId: string, enabled: boolean) => {
      const newNodes = nodes.map(n => {
          if (n.id === criteriaId) {
              return { ...n, data: { ...n.data, config: { ...n.data.config, enabled } } };
          }
          return n;
      });
      setNodes(newNodes);
      recordHistory(newNodes, edgesList);
  };

  const handleStartConnect = (nodeId: string) => {
      setConnectingNodeId(nodeId);
  };

  const isConnectionValid = (sourceId: string, targetId: string) => {
      if (sourceId === targetId) return false;
      const sourceNode = nodes.find(n => n.id === sourceId);
      const targetNode = nodes.find(n => n.id === targetId);
      if (!sourceNode || !targetNode) return false;
      if (targetNode.type === 'START') return false;
      if (targetNode.type === 'CRITERIA') return false;
      return targetNode.x > sourceNode.x + 10;
  };

  const handleEndConnect = (targetNodeId: string) => {
      if (connectingNodeId && connectingNodeId !== targetNodeId) {
          if (!isConnectionValid(connectingNodeId, targetNodeId)) {
              setConnectingNodeId(null);
              return;
          }

          const sourceNode = nodes.find(n => n.id === connectingNodeId);
          const targetNode = nodes.find(n => n.id === targetNodeId);
          
          if (!sourceNode || !targetNode) return;

          const isSourceRound = sourceNode.type !== 'START' && sourceNode.type !== 'CRITERIA';
          const isTargetRound = targetNode.type !== 'CRITERIA';

          let nextNodes = [...nodes];
          let nextEdges = [...edgesList];

          if (isSourceRound && isTargetRound) {
              // Automatically Insert Criteria Node
              const criteriaId = Date.now().toString() + '_auto_c';
              // Temporary positions, will be fixed by auto-align
              const midX = (sourceNode.x + targetNode.x) / 2;
              const midY = (sourceNode.y + targetNode.y) / 2;
              
              const newCriteria: EngageNode = {
                  id: criteriaId, type: 'CRITERIA', title: 'Logic', x: midX, y: midY,
                  data: { desc: 'Logic', config: { enabled: false } }
              };
              
              nextNodes.push(newCriteria);
              nextEdges.push({ from: connectingNodeId, to: criteriaId });
              nextEdges.push({ from: criteriaId, to: targetNodeId });
          } else {
              if (!edgesList.some(e => e.from === connectingNodeId && e.to === targetNodeId)) {
                  nextEdges.push({ from: connectingNodeId, to: targetNodeId });
              }
          }
          
          // Auto-align immediately on new connection to handle multiple nodes/branches smoothly
          const aligned = calculateAutoLayout(nextNodes, nextEdges);
          setNodes(aligned);
          setEdgesList(nextEdges);
          recordHistory(aligned, nextEdges);
          setConnectingNodeId(null);
      }
  };

  // Gestures
  useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
      const handleWheel = (e: WheelEvent) => {
          if (e.ctrlKey) {
              e.preventDefault();
              setZoom(prevZoom => Math.min(Math.max(prevZoom - e.deltaY * 0.005, 0.1), 3.0));
              return;
          }
          if (e.shiftKey) {
              if (Math.abs(e.deltaX) === 0 && Math.abs(e.deltaY) > 0) {
                   e.preventDefault();
                   container.scrollLeft += e.deltaY;
              }
          }
      };
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest('.node-card')) return;
      setIsDragging(true);
      setStartPan({ x: e.clientX, y: e.clientY });
      if (containerRef.current) {
          setScrollStart({ left: containerRef.current.scrollLeft, top: containerRef.current.scrollTop });
      }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      e.preventDefault();
      const x = e.clientX - startPan.x;
      const y = e.clientY - startPan.y;
      containerRef.current.scrollLeft = scrollStart.left - x;
      containerRef.current.scrollTop = scrollStart.top - y;
  };

  const handleMouseUp = () => {
      setIsDragging(false);
  };

  useEffect(() => {
      const handleClickOutside = () => setConnectingNodeId(null);
      if (connectingNodeId) {
          window.addEventListener('click', handleClickOutside);
      }
      return () => window.removeEventListener('click', handleClickOutside);
  }, [connectingNodeId]);

  const handleAddNode = (type: string) => {
      const sortedNodes = [...nodes].sort((a, b) => b.x - a.x);
      const lastNode = sortedNodes[0];
      if (!lastNode) return; 

      const lastNodeWidth = lastNode.type === 'START' ? START_NODE_WIDTH : (lastNode.type === 'CRITERIA' ? BUBBLE_SIZE : CARD_WIDTH);
      const centerY = lastNode.y; 
      
      const criteriaId = `c_${Date.now()}`;
      const newNodeId = `n_${Date.now()}`;

      const newCriteria: EngageNode = {
          id: criteriaId, type: 'CRITERIA', title: 'Logic', x: lastNode.x + lastNodeWidth + 50, y: centerY,
          data: { desc: 'Logic', config: { enabled: false } }
      };

      const newNode: EngageNode = {
          id: newNodeId, type, title: `New ${NODE_TYPES[type]?.label || 'Step'}`, x: lastNode.x + lastNodeWidth + 150, y: centerY,
          data: { desc: 'Configure this step' }
      };
      
      const nextNodes = [...nodes, newCriteria, newNode];
      const nextEdges = [...edgesList, { from: lastNode.id, to: criteriaId }, { from: criteriaId, to: newNodeId }];
      
      // Auto Align immediately
      const alignedNodes = calculateAutoLayout(nextNodes, nextEdges);
      
      setNodes(alignedNodes);
      setEdgesList(nextEdges);
      recordHistory(alignedNodes, nextEdges);
  };

  const handleManualAlign = () => {
      const aligned = calculateAutoLayout(nodes, edgesList);
      setNodes(aligned);
      recordHistory(aligned, edgesList);
  };

  return (
    <div className="flex h-full bg-slate-50 overflow-hidden relative">
      <SaveConfirmationModal isOpen={showSaveModal} onClose={() => setShowSaveModal(false)} onConfirm={confirmSave} />
      <ValidationErrorsModal isOpen={validationErrors.length > 0} onClose={() => setValidationErrors([])} errors={validationErrors} />

      {/* Top Toolbar - Save Action */}
      <div className="absolute top-4 right-6 z-20">
          <button 
            onClick={handleSaveRequest}
            disabled={isSaved}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold shadow-sm transition-all ${
                isSaved 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md'
            }`}
          >
             <Save size={16} /> 
             {isSaved ? 'Saved' : 'Save Workflow'}
          </button>
      </div>

      {connectingNodeId && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold flex items-center gap-2 animate-pulse">
              <LinkIcon size={16} /> Select a valid target node (green) to connect
          </div>
      )}

      {configCriteriaId && (
          <AutomationPlaceholderModal 
             isEnabled={nodes.find(n => n.id === configCriteriaId)?.data.config?.enabled || false}
             onClose={() => setConfigCriteriaId(null)}
             onToggle={(val) => handleToggleAutomation(configCriteriaId, val)}
          />
      )}

      {editingNode && (
        <NodeConfigurationModal node={editingNode} onClose={() => setEditingNode(null)} onSave={handleSaveNode} />
      )}

      <div 
        ref={containerRef}
        className={`flex-1 overflow-auto relative ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} bg-slate-50 select-none`}
        style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
            className="relative p-10 transition-transform duration-200 origin-top-left"
            style={{ 
              transform: `scale(${zoom})`, 
              width: `${contentSize.width}px`, 
              height: `${contentSize.height}px` 
            }}
        >
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
            {edges.map((edge: any, i) => <BezierEdge key={i} {...edge} />)}
            {connectingNodeId && (
                <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" fill="#6366f1" />
                    </marker>
                </defs>
            )}
          </svg>
          {nodes.map(node => (
            <React.Fragment key={node.id}>
                <NodeCard 
                node={node} 
                onSelect={setSelectedNode} 
                onEdit={handleEditNode}
                onDelete={() => {}}
                onStartConnect={handleStartConnect}
                onEndConnect={handleEndConnect}
                isSelected={selectedNode?.id === node.id} 
                isConnecting={connectingNodeId !== null}
                isValidTarget={connectingNodeId ? isConnectionValid(connectingNodeId, node.id) : false}
                />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Bottom Floating Toolbar */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-xl border border-slate-200 p-2 flex items-center gap-3 z-20">
        {/* Add Nodes */}
        <div className="flex items-center gap-1 pr-3 border-r border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase mr-2 ml-2">Add Step</span>
            {Object.keys(NODE_TYPES).map(type => {
                const config = NODE_TYPES[type];
                const Icon = config.icon;
                return (
                    <button 
                        key={type}
                        onClick={() => handleAddNode(type)}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-indigo-600 transition-colors relative group"
                        title={`Add ${config.label}`}
                    >
                        <Icon size={18} />
                    </button>
                )
            })}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
           <button onClick={() => setZoom(z => Math.max(0.1, z - 0.1))} className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-700"><ZoomOut size={16}/></button>
           <span className="text-[10px] font-mono text-slate-500 w-8 text-center">{Math.round(zoom * 100)}%</span>
           <button onClick={() => setZoom(z => Math.min(3, z + 0.1))} className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-700"><ZoomIn size={16}/></button>
           <button onClick={() => setZoom(0.85)} className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-700 ml-1" title="Reset View"><RotateCcw size={14}/></button>
           
           <div className="w-px h-4 bg-slate-300 mx-2"></div>

           {/* Layout Tools */}
           <button onClick={handleManualAlign} className="p-1.5 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 rounded transition-colors" title="Auto Align Layout">
              <Layout size={16}/> 
           </button>

           <div className="w-px h-4 bg-slate-300 mx-2"></div>

           {/* Undo / Redo */}
           <button 
             onClick={handleUndo} 
             disabled={isSaved || historyStep === 0}
             className={`p-1.5 rounded transition-colors ${isSaved || historyStep === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`}
             title="Undo"
           >
              <RotateCcw size={16} /> 
           </button>
           <button 
             onClick={handleRedo} 
             disabled={isSaved || historyStep === history.length - 1}
             className={`p-1.5 rounded transition-colors ${isSaved || historyStep === history.length - 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`}
             title="Redo"
           >
              <RotateCw size={16} /> 
           </button>
        </div>
      </div>
    </div>
  );
};

export const EngageWorkflow = () => {
  const [activeTab, setActiveTab] = useState<'BUILDER' | 'TRACKING' | 'ROOM'>('BUILDER');
  const [isWorkflowDirty, setIsWorkflowDirty] = useState(false);

  // Tab switching guard
  const handleTabChange = (tab: 'BUILDER' | 'TRACKING' | 'ROOM') => {
      if (activeTab === 'BUILDER' && isWorkflowDirty && tab !== 'BUILDER') {
          if (!window.confirm("You have unsaved changes in the workflow. Navigate away and discard changes?")) {
              return;
          }
          setIsWorkflowDirty(false); 
      }
      setActiveTab(tab);
  };

  // Browser navigation guard
  useEffect(() => {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
          if (isWorkflowDirty && activeTab === 'BUILDER') {
              e.preventDefault();
              e.returnValue = ''; // Required for modern browsers
              return '';
          }
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isWorkflowDirty, activeTab]);

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
               onClick={() => handleTabChange('BUILDER')}
               className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'BUILDER' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
             >
                <Layout size={14} /> Workflow Builder
                {isWorkflowDirty && <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>}
             </button>
             <button 
               onClick={() => handleTabChange('TRACKING')}
               className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'TRACKING' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
             >
                <Users size={14} /> Candidate Tracking
             </button>
             <button 
               onClick={() => handleTabChange('ROOM')}
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
          </div>
       </div>

       {/* Content Area */}
       <div className="flex-1 overflow-hidden relative">
          {activeTab === 'BUILDER' && <WorkflowBuilder onDirtyChange={setIsWorkflowDirty} />}
          {activeTab === 'TRACKING' && <CandidateTracking />}
          {activeTab === 'ROOM' && <InterviewRoom />}
       </div>
    </div>
  );
};
