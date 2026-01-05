
import React from 'react';
import {
    Briefcase, Search, ArrowLeft, MoreHorizontal, PlusCircle,
    ChevronLeft, ChevronRight, Filter, Link, Upload, Plus, History,
    RotateCcw, MoreVertical, HelpCircle, X, Check, Calendar, Power,
    BarChart as BarChartIcon, PieChart as PieChartIcon, TrendingUp, CheckCircle, Clock, Users,
    AlertCircle, FileText
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend, LineChart, Line
} from 'recharts';
import { PANEL_MEMBERS, CAMPAIGN_ACTIVITIES } from '../data';

// --- MOCK DATA ---

const TREND_DATA = [
    { name: 'Dec 20', profiles: 280, applies: 240 },
    { name: 'Dec 21', profiles: 480, applies: 230 },
    { name: 'Dec 22', profiles: 580, applies: 490 },
    { name: 'Dec 23', profiles: 450, applies: 380 },
    { name: 'Dec 24', profiles: 817, applies: 268 },
    { name: 'Dec 25', profiles: 180, applies: 160 },
    { name: 'Dec 26', profiles: 120, applies: 110 },
];

const SOURCE_DATA = [
    { name: 'LinkedIn', value: 35, color: '#82ca9d' },
    { name: 'ZipRecruiter', value: 25, color: '#ffc658' },
    { name: 'Indeed', value: 14, color: '#ff8042' },
    { name: 'Dice', value: 17, color: '#8884d8' },
    { name: 'Other', value: 9, color: '#a4de6c' },
];

const EMAIL_DATA = [
    { name: 'Dec 20', opened: 0, bounced: 0 },
    { name: 'Dec 21', opened: 0, bounced: 0 },
    { name: 'Dec 22', opened: 0, bounced: 0 },
    { name: 'Dec 23', opened: 0, bounced: 0 },
    { name: 'Dec 24', opened: 0, bounced: 0 },
    { name: 'Dec 25', opened: 0, bounced: 0 },
    { name: 'Dec 26', opened: 0, bounced: 0 },
];

const QUALITY_DATA = [
    { name: 'Good (80%+)', value: 18, color: '#16a34a' }, // green-600
    { name: 'Okay (60-79%)', value: 42, color: '#ca8a04' }, // yellow-600
    { name: 'Bad (<60%)', value: 12, color: '#dc2626' }, // red-600
];

export const KPIMetricsWidget = () => (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm p-6 space-y-8">
        <div className="flex justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-4">
            <h3 className="font-bold text-gray-700 dark:text-slate-200 text-sm flex items-center gap-2">
                <BarChartIcon size={16} className="text-indigo-600 dark:text-indigo-400" /> Campaign Performance Metrics
            </h3>
            <select className="text-xs border border-gray-200 dark:border-slate-600 rounded px-2 py-1 bg-white dark:bg-slate-700 focus:outline-none text-gray-600 dark:text-slate-200">
                <option>Last 30 Days</option>
                <option>Last 7 Days</option>
                <option>All Time</option>
            </select>
        </div>

        {/* 1. Sourcing Efficiency Metrics */}
        <div>
            <h4 className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-4 flex items-center gap-2">
                <PieChartIcon size={14} /> Sourcing Efficiency
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Active vs Passive */}
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 border border-slate-100 dark:border-slate-600">
                    <p className="text-xs font-medium text-gray-500 dark:text-slate-300 mb-2">Active vs. Passive Mix</p>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">45%</span>
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden flex">
                            <div className="w-[45%] bg-blue-500"></div>
                            <div className="w-[55%] bg-purple-500"></div>
                        </div>
                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">55%</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400 dark:text-slate-400">
                        <span>Inbound (Active)</span>
                        <span>Outbound (Passive)</span>
                    </div>
                </div>

                {/* Source of Hire */}
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 border border-slate-100 dark:border-slate-600 flex items-center gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                        <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
                            <path className="text-gray-200 dark:text-slate-600" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                            <path className="text-blue-500" strokeDasharray="40, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                            <path className="text-green-500" strokeDasharray="30, 100" strokeDashoffset="-40" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                            <path className="text-orange-400" strokeDasharray="20, 100" strokeDashoffset="-70" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                        </svg>
                    </div>
                    <div className="flex-1 space-y-1 text-slate-700 dark:text-slate-200">
                        <div className="flex justify-between text-[10px]"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Job Boards</span> <span className="font-bold">40%</span></div>
                        <div className="flex justify-between text-[10px]"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Internal DB</span> <span className="font-bold">30%</span></div>
                        <div className="flex justify-between text-[10px]"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-400"></span> Referrals</span> <span className="font-bold">20%</span></div>
                    </div>
                </div>

                {/* DB Utilization */}
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 border border-slate-100 dark:border-slate-600 flex flex-col justify-center">
                    <p className="text-xs font-medium text-gray-500 dark:text-slate-300 mb-2">Database Utilization Rate</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">68%</span>
                        <span className="text-xs text-green-600 dark:text-green-400 flex items-center"><TrendingUp size={10} className="mr-1" /> +12%</span>
                    </div>
                    <p className="text-[10px] text-gray-400 dark:text-slate-400 mt-1">Hires rediscovered from internal DB</p>
                </div>
            </div>
        </div>

        {/* 2. Candidate Quality Segmentation */}
        <div>
            <h4 className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-4 flex items-center gap-2">
                <Check size={14} /> Quality Segmentation (Skill-Based)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-lg p-4 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={QUALITY_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                            <Tooltip
                                cursor={{ fill: '#f8fafc' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={60}>
                                {QUALITY_DATA.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex flex-col justify-center items-center bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800 p-4 text-center">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-full mb-2"><CheckCircle size={24} /></div>
                    <span className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">18</span>
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">Qualified Candidates</span>
                    <span className="text-[9px] text-indigo-400 dark:text-indigo-300 mt-1">Interview Ready</span>
                </div>
            </div>
        </div>

        {/* 3. Pipeline Health */}
        <div>
            <h4 className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-4 flex items-center gap-2">
                <Filter size={14} /> Pipeline Health & Drip Flow
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Yield Ratio */}
                <div className="col-span-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600 rounded-lg p-4">
                    <p className="text-xs font-medium text-gray-500 dark:text-slate-300 mb-4">Yield Ratio (Conversion)</p>
                    <div className="flex items-center gap-1">
                        <div className="flex-1 relative h-10 bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-[10px] font-bold text-gray-600 dark:text-gray-300 pl-2 rounded-l-md">
                            App (100%)
                        </div>
                        <div className="flex-1 relative h-10 bg-blue-200 dark:bg-blue-900/40 flex items-center justify-center text-[10px] font-bold text-blue-800 dark:text-blue-300 pl-2 border-l border-white dark:border-slate-700">
                            Screen (65%)
                        </div>
                        <div className="flex-1 relative h-10 bg-indigo-200 dark:bg-indigo-900/40 flex items-center justify-center text-[10px] font-bold text-indigo-800 dark:text-indigo-300 pl-2 border-l border-white dark:border-slate-700">
                            Intvw (40%)
                        </div>
                        <div className="flex-1 relative h-10 bg-green-200 dark:bg-green-900/40 flex items-center justify-center text-[10px] font-bold text-green-800 dark:text-green-300 pl-2 border-l border-white dark:border-slate-700 rounded-r-md">
                            Offer (10%)
                        </div>
                    </div>
                </div>

                {/* Time Metrics */}
                <div className="space-y-3">
                    <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-lg p-3 flex justify-between items-center">
                        <span className="text-xs text-gray-500 dark:text-slate-400">App Completion Rate</span>
                        <span className="text-sm font-bold text-gray-800 dark:text-slate-200">82%</span>
                    </div>
                    <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-lg p-3 flex justify-between items-center">
                        <span className="text-xs text-gray-500 dark:text-slate-400">Submit-to-Interview</span>
                        <span className="text-sm font-bold text-gray-800 dark:text-slate-200">1 : 1.5</span>
                    </div>
                    <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-lg p-3 flex justify-between items-center">
                        <span className="text-xs text-gray-500 dark:text-slate-400">Avg Time per Stage</span>
                        <span className="text-sm font-bold text-gray-800 dark:text-slate-200">2.4 Days</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export const PanelMembersWidget = () => (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-700 dark:text-slate-200 text-sm flex items-center gap-2">
                <Users size={16} className="text-indigo-600 dark:text-indigo-400" /> Panel Members
            </h3>
            <button className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"><PlusCircle size={16} /></button>
        </div>
        <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {PANEL_MEMBERS.map(member => (
                <div key={member.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${member.color} shrink-0`}>
                        {member.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-800 dark:text-slate-200 truncate" title={member.name}>{member.name}</p>
                        <p className="text-xs text-gray-500 dark:text-slate-400 truncate" title={member.role}>{member.role}</p>
                    </div>
                    <button className="text-gray-300 hover:text-gray-500"><MoreHorizontal size={14} /></button>
                </div>
            ))}
        </div>
    </div>
);

export const RemindersWidget = () => (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-700 dark:text-slate-200 text-sm flex items-center gap-2">
                <Clock size={16} className="text-orange-500" /> Reminders
            </h3>
            <button className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"><PlusCircle size={16} /></button>
        </div>
        <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {[
                { id: 1, text: "Follow up with Sarah regarding offer", date: "Today, 2:00 PM", type: "urgent" },
                { id: 2, text: "Review new applications for Sr. Dev", date: "Tomorrow, 10:00 AM", type: "normal" },
                { id: 3, text: "Sync with Hiring Manager", date: "Dec 30, 11:30 AM", type: "normal" }
            ].map(reminder => (
                <div key={reminder.id} className="flex gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors group">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${reminder.type === 'urgent' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                    <div>
                        <p className={`text-sm text-gray-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors ${reminder.type === 'urgent' ? 'font-semibold' : ''}`}>{reminder.text}</p>
                        <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">{reminder.date}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export const NotesWidget = () => (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-700 dark:text-slate-200 text-sm flex items-center gap-2">
                <FileText size={16} className="text-yellow-500" /> Team Notes
            </h3>
            <button className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"><PlusCircle size={16} /></button>
        </div>
        <div className="bg-yellow-50/50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30 rounded-lg p-3 h-full overflow-y-auto text-sm text-gray-600 dark:text-slate-300 custom-scrollbar">
            <p className="mb-2"><strong>Strategy:</strong> Focus on candidates with React Native experience for the mobile initiative.</p>
            <p className="mb-2"><strong>Budget:</strong> Approved for senior range up to $160k.</p>
            <p><strong>Next Steps:</strong> Schedule debrief with Engineering VP by Friday.</p>
        </div>
    </div>
);

export const ActivitiesWidget = () => (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-700 dark:text-slate-200 text-sm flex items-center gap-2">
                <History size={16} className="text-blue-500" /> Recent Activity
            </h3>
            <button className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"><Filter size={16} /></button>
        </div>
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {CAMPAIGN_ACTIVITIES.map(group => (
                <div key={group.id}>
                    <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase mb-2 sticky top-0 bg-white dark:bg-slate-800 py-1">{group.date}</p>
                    <div className="space-y-3">
                        {group.items.map(item => (
                            <div key={item.id} className="flex gap-3 relative pl-4 border-l border-gray-100 dark:border-slate-700 ml-1">
                                <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-800 ${item.type === 'link' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                                <div>
                                    <p className="text-xs text-gray-600 dark:text-slate-300">{item.title}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] text-gray-400 dark:text-slate-500">{item.time}</span>
                                        <span className="text-[10px] font-medium text-gray-500 dark:text-slate-400">• {item.author}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export const AlertsWidget = () => (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-4 shadow-sm flex items-center justify-between h-full min-h-[100px]">
        <div className="flex items-center gap-6 flex-1 justify-center border-r border-gray-100 dark:border-slate-700 pr-6">
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/business-failure-illustration-download-in-svg-png-gif-file-formats--bankruptcy-market-crash-pack-people-illustrations-3791244.png" className="w-16 h-16 object-contain opacity-80" alt="Alert" />
            <div className="text-center">
                <span className="block text-3xl font-bold text-red-500">0</span>
                <span className="text-xs text-gray-500 dark:text-slate-400">Campaigns have high Opt-Out percentage</span>
            </div>
        </div>
        <div className="flex items-center gap-6 flex-1 justify-center pl-6 relative">
            <div className="text-center">
                <span className="block text-3xl font-bold text-red-500">0</span>
                <span className="text-xs text-gray-500 dark:text-slate-400 block max-w-[150px] mx-auto">Have unsubscribed or not reachable in the last 24 hours</span>
            </div>
            <div className="absolute top-0 right-0 flex flex-col gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-50"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-20"></div>
            </div>
        </div>
    </div>
);

export const TrendGraph = () => (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-6 shadow-sm h-full flex flex-col">
        <div className="flex justify-between items-start mb-6">
            <div>
                <h3 className="text-gray-800 dark:text-slate-100 font-bold text-base">Profiles / Applies Trends</h3>
                <p className="text-xs text-gray-400 dark:text-slate-400">1,000</p>
            </div>
            <select className="text-xs border border-gray-200 dark:border-slate-600 rounded px-2 py-1 bg-white dark:bg-slate-700 text-gray-600 dark:text-slate-200 outline-none">
                <option>Last 7 days</option>
            </select>
        </div>
        <div className="flex-1 flex gap-4">
            <div className="flex-1 min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={TREND_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            itemStyle={{ fontSize: '12px' }}
                        />
                        <Line type="monotone" dataKey="profiles" stroke="#6366f1" strokeWidth={2} dot={{ r: 3, fill: '#6366f1', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="applies" stroke="#82ca9d" strokeWidth={2} dot={{ r: 3, fill: '#82ca9d', strokeWidth: 0 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="w-32 flex flex-col justify-center gap-6 text-right border-l border-gray-50 dark:border-slate-700 pl-4">
                <div>
                    <div className="flex items-center justify-end gap-1 text-red-500 text-xs font-bold mb-1">
                        <span>↓ 87%</span>
                        <span className="text-2xl text-gray-700 dark:text-slate-200">2,922</span>
                    </div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">New Profiles</p>
                </div>
                <div>
                    <div className="flex items-center justify-end gap-1 text-red-500 text-xs font-bold mb-1">
                        <span>↓ 41%</span>
                        <span className="text-2xl text-gray-700 dark:text-slate-200">1,874</span>
                    </div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">New Applies</p>
                </div>
                <div>
                    <div className="flex items-center justify-end gap-1 text-red-500 text-xs font-bold mb-1">
                        <span>↓ 100%</span>
                        <span className="text-2xl text-gray-700 dark:text-slate-200">0</span>
                    </div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">New Campaigns</p>
                </div>
            </div>
        </div>
    </div>
);

export const SourceDistributionChart = () => (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-6 shadow-sm h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-800 dark:text-slate-100 font-bold text-base">New Profile Source Distribution</h3>
            <div className="flex gap-2">
                <select className="text-xs border border-gray-200 dark:border-slate-600 rounded px-2 py-1 bg-white dark:bg-slate-700 text-gray-600 dark:text-slate-200 outline-none">
                    <option>Last 7 days</option>
                </select>
                <div className="flex bg-gray-100 dark:bg-slate-700 rounded p-0.5">
                    <button className="px-2 py-0.5 text-[10px] bg-white dark:bg-slate-600 shadow-sm rounded text-gray-700 dark:text-slate-200 font-medium">Profiles</button>
                    <button className="px-2 py-0.5 text-[10px] text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300">Applies</button>
                </div>
            </div>
        </div>
        <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={SOURCE_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                    >
                        {SOURCE_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ fontSize: '11px', color: '#64748b' }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export const EmptyWidget = ({ title, sub }) => (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-6 shadow-sm h-full flex flex-col relative overflow-hidden group">
        <div className="flex justify-between items-center mb-6 z-10 relative">
            <h3 className="text-gray-800 dark:text-slate-100 font-bold text-sm flex items-center gap-2">
                {title}
                {title === 'Upcoming Interviews' && <span className="text-red-500 text-xs cursor-pointer">x</span>}
            </h3>
            {sub && sub}
        </div>
        <div className="flex-1 flex flex-col items-center justify-center relative z-10 min-h-[150px]">
            <div className="w-16 h-16 mb-2 opacity-50">
                {title.includes('Portal') ? (
                    <div className="relative">
                        <span className="text-4xl">💤</span>
                    </div>
                ) : (
                    <span className="text-gray-300 dark:text-slate-600 text-4xl">📭</span>
                )}
            </div>
            <p className="text-xs text-gray-400">{title.includes('Interviews') ? 'No Upcoming Interviews' : 'No Data Found'}</p>
        </div>
        {title.includes('Portal') && (
            <div className="border-t border-gray-100 dark:border-slate-700 pt-4 mt-auto flex justify-between text-[10px] text-gray-500 dark:text-slate-400 w-full z-10">
                <div className="text-center"><span className="block text-blue-600 font-bold text-lg">0</span> Searches</div>
                <div className="text-center"><span className="block text-blue-600 font-bold text-lg">0</span> Downloads</div>
                <div className="text-center"><span className="block text-blue-600 font-bold text-lg">0</span> Contacted</div>
                <div className="text-center"><span className="block text-green-600 font-bold text-lg">0</span> Interested</div>
            </div>
        )}
    </div>
);

export const EmailDeliveryReport = () => (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-6 shadow-sm h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-gray-800 dark:text-slate-100 font-bold text-sm">Mass Email Delivery Report</h3>
            <select className="text-xs border border-gray-200 dark:border-slate-600 rounded px-2 py-1 bg-white dark:bg-slate-700 text-gray-600 dark:text-slate-200 outline-none">
                <option>Last 7 days</option>
            </select>
        </div>
        <div className="flex-1 flex gap-4 min-h-[150px]">
            <div className="w-32 flex flex-col justify-center gap-4 border-r border-gray-50 dark:border-slate-700 pr-4">
                <div className="text-center">
                    <span className="block text-xl font-bold text-blue-600">0</span>
                    <span className="text-[10px] text-gray-400">Total Mails</span>
                </div>
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-center">
                    <div><span className="block font-bold text-green-600">0</span><span className="text-[9px] text-gray-400">Delivered</span></div>
                    <div><span className="block font-bold text-red-500">0%</span><span className="text-[9px] text-gray-400">Bounced</span></div>
                    <div><span className="block font-bold text-green-600">0</span><span className="text-[9px] text-gray-400">Viewed</span></div>
                    <div><span className="block font-bold text-red-500">0%</span><span className="text-[9px] text-gray-400">Opt-out</span></div>
                </div>
                <div className="text-center">
                    <span className="block font-bold text-green-600">0</span>
                    <span className="text-[10px] text-gray-400">Replied</span>
                </div>
            </div>
            <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={EMAIL_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                        <Bar dataKey="opened" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="bounced" fill="#ff8042" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
);

export const PreScreeningProgress = () => (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-6 shadow-sm h-full relative overflow-hidden">
        <div className="flex justify-between items-center mb-8">
            <h3 className="text-gray-800 dark:text-slate-100 font-bold text-sm flex items-center gap-2">
                <AlertCircle size={14} className="text-gray-400" /> Pre-Screening Progress Report
            </h3>
            <div className="flex bg-gray-100 dark:bg-slate-700 rounded p-0.5">
                <button className="px-3 py-1 text-[10px] bg-white dark:bg-slate-600 shadow-sm rounded text-gray-700 dark:text-slate-200 font-medium">Pre-Screening</button>
                <button className="px-3 py-1 text-[10px] text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300">Interview</button>
            </div>
        </div>

        {/* Funnel Visualization */}
        <div className="relative h-[250px] flex items-center justify-between px-10">
            {/* Node 1 */}
            <div className="relative z-10 flex flex-col items-center">
                <span className="text-lg font-bold text-blue-600">23k</span>
                <span className="text-[9px] text-blue-400 mb-1">Total Profiles</span>
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 shadow-sm border-2 border-white dark:border-slate-600"><Users size={14} /></div>
            </div>

            {/* Edges */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                <path d="M 80 125 C 150 125, 150 50, 220 50" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="4 2" />
                <path d="M 80 125 C 150 125, 150 200, 220 200" fill="none" stroke="#ef4444" strokeWidth="1" />
                <path d="M 250 50 L 350 50" fill="none" stroke="#22c55e" strokeWidth="1" />
                <path d="M 250 50 C 280 50, 280 200, 350 200" fill="none" stroke="#ef4444" strokeWidth="1" />
            </svg>

            {/* Top Branch */}
            <div className="flex flex-col gap-10">
                <div className="flex gap-16">
                    <div className="flex flex-col items-center">
                        <span className="text-sm font-bold text-green-600">9</span>
                        <span className="text-[8px] text-gray-400 mb-1">Comm...</span>
                        <div className="w-6 h-6 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 flex items-center justify-center border border-green-200 dark:border-green-800"><Link size={10} /></div>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-sm font-bold text-green-600">4</span>
                        <span className="text-[8px] text-gray-400 mb-1">Delivered</span>
                        <div className="w-6 h-6 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 flex items-center justify-center border border-green-200 dark:border-green-800"><Check size={10} /></div>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-sm font-bold text-green-600">4</span>
                        <span className="text-[8px] text-gray-400 mb-1">Viewed</span>
                        <div className="w-6 h-6 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 flex items-center justify-center border border-green-200 dark:border-green-800"><CheckCircle size={10} /></div>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-sm font-bold text-green-600">2</span>
                        <span className="text-[8px] text-gray-400 mb-1">Completed</span>
                        <div className="w-6 h-6 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 flex items-center justify-center border border-green-200 dark:border-green-800"><CheckCircle size={10} /></div>
                    </div>
                </div>

                {/* Bottom Branch (Dropoffs) */}
                <div className="flex gap-16 mt-10">
                    <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-red-50 dark:bg-red-900/30 text-red-500 flex items-center justify-center border border-red-200 dark:border-red-800 mb-1"><AlertCircle size={10} /></div>
                        <span className="text-xs font-bold text-red-500">2,695</span>
                        <span className="text-[8px] text-gray-400">Not Reachable</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-red-50 dark:bg-red-900/30 text-red-500 flex items-center justify-center border border-red-200 dark:border-red-800 mb-1"><X size={10} /></div>
                        <span className="text-xs font-bold text-red-500">0</span>
                        <span className="text-[8px] text-gray-400">Bounced</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
