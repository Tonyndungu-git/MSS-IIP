'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral' | 'warning';
  subtext?: string;
  badge?: string;
  glowColor?: 'cyan' | 'emerald' | 'amber' | 'rose' | 'slate';
  className?: string;
  children?: React.ReactNode;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  unit,
  icon: Icon,
  change,
  changeType = 'neutral',
  subtext,
  badge,
  glowColor = 'cyan',
  className = '',
  children,
}) => {
  const glowMap = {
    cyan: 'border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.06)] hover:border-cyan-500/40',
    emerald: 'border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.06)] hover:border-emerald-500/40',
    amber: 'border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.06)] hover:border-amber-500/40',
    rose: 'border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.06)] hover:border-rose-500/40',
    slate: 'border-slate-800 hover:border-slate-700',
  };

  const changeColor = {
    positive: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40',
    negative: 'text-rose-400 bg-rose-950/40 border-rose-800/40',
    warning: 'text-amber-400 bg-amber-950/40 border-amber-800/40',
    neutral: 'text-slate-400 bg-slate-900 border-slate-800',
  }[changeType];

  return (
    <div
      className={`relative bg-[#070e1e]/90 backdrop-blur-md rounded-lg border p-5 transition-all duration-200 group ${glowMap[glowColor]} ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-medium">
          {title}
        </span>
        <div className="flex items-center gap-2">
          {badge && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
              {badge}
            </span>
          )}
          {Icon && (
            <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-cyan-400 group-hover:text-cyan-300 transition-colors">
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-2 font-mono">
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          {value}
        </span>
        {unit && <span className="text-sm font-semibold text-slate-400">{unit}</span>}
      </div>

      {(change || subtext) && (
        <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/60 mt-2">
          {change && (
            <span
              className={`inline-flex items-center px-1.5 py-0.5 rounded border text-[11px] font-mono font-medium ${changeColor}`}
            >
              {change}
            </span>
          )}
          {subtext && (
            <span className="text-slate-500 font-mono text-[11px] truncate">
              {subtext}
            </span>
          )}
        </div>
      )}

      {children && <div className="mt-3">{children}</div>}
    </div>
  );
};
