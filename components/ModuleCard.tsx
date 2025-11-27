import React from 'react';
import { ModuleConfig, ModuleId } from '../types';
import { ArrowRight, TrendingUp } from 'lucide-react';

interface ModuleCardProps {
  module: ModuleConfig;
  onClick: (id: ModuleId) => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onClick }) => {
  const Icon = module.icon;
  
  return (
    <div 
      onClick={() => onClick(module.id)}
      className="group relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
    >
      {/* Decorative Background Blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full blur-2xl group-hover:bg-emerald-100 transition-colors duration-500"></div>
      
      <div className="relative z-10 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-slate-50 text-emerald-600 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-glow">
            <Icon size={24} strokeWidth={2} />
          </div>
          {module.stats && module.stats.length > 0 && (
             <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
                <TrendingUp size={12} />
                <span>{module.stats[0].value}</span>
             </div>
          )}
        </div>
        
        <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-emerald-700 transition-colors">{module.title}</h3>
        <p className="text-xs font-semibold text-emerald-600/80 uppercase tracking-wider mb-3">{module.subtitle}</p>
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{module.description}</p>
      </div>

      <div className="relative z-10 mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-sm font-semibold text-slate-400 group-hover:text-emerald-600 transition-colors">
        <span>Access Module</span>
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 group-hover:bg-emerald-50 transition-colors">
          <ArrowRight size={16} className="transform group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};