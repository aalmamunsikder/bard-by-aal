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
      className="group relative bg-white p-6 rounded-3xl border border-slate-100 shadow-soft hover:shadow-float hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col h-full"
    >
      {/* Decorative Background Blob */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-full blur-3xl group-hover:bg-emerald-100/50 transition-colors duration-500"></div>

      <div className="relative z-10 flex-1">
        <div className="flex justify-between items-start mb-6">
          <div className="w-14 h-14 bg-slate-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-glow">
            <Icon size={28} strokeWidth={2} />
          </div>
          {module.stats && module.stats.length > 0 && (
            <div className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 group-hover:border-emerald-100 transition-colors">
              <TrendingUp size={14} className="text-emerald-500" />
              <span>{module.stats[0].value}</span>
            </div>
          )}
        </div>

        <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors">{module.title}</h3>
        <p className="text-xs font-bold text-emerald-600/80 uppercase tracking-wider mb-3">{module.subtitle}</p>
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed font-medium">{module.description}</p>
      </div>

      <div className="relative z-10 mt-8 pt-4 border-t border-slate-50 flex items-center justify-between text-sm font-bold text-slate-400 group-hover:text-emerald-600 transition-colors">
        <span>Access Module</span>
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 group-hover:bg-emerald-50 transition-colors">
          <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};