import React from 'react';
import { Home as HomeIcon } from 'lucide-react';

export const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8">
      <div className="bg-slate-100 p-6 rounded-full mb-4">
        <HomeIcon size={48} />
      </div>
      <h2 className="text-2xl font-bold text-slate-700 mb-2">Welcome to TalentHub</h2>
      <p>Select a module from the sidebar to get started.</p>
    </div>
  );
};
