'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number | null | undefined;
  subtitle?: string;
  icon?: LucideIcon;
  status?: 'nominal' | 'warning' | 'critical' | 'neutral';
  trend?: {
    label: string;
    positive?: boolean;
  };
  badge?: string;
  loading?: boolean;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  status = 'neutral',
  trend,
  badge,
  loading = false,
}: MetricCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'nominal':
        return 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5';
      case 'warning':
        return 'border-amber-500/20 text-amber-400 bg-amber-500/5';
      case 'critical':
        return 'border-rose-500/20 text-rose-400 bg-rose-500/5';
      case 'neutral':
      default:
        return 'border-slate-800 text-cyan-400 bg-slate-900/60';
    }
  };

  return (
    <div className="relative p-5 rounded-xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm overflow-hidden group hover:border-slate-700/80 transition-all duration-200">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-xs font-mono font-medium text-slate-400 tracking-wider uppercase">
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-lg border ${getStatusColor()} shrink-0`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        {loading ? (
          <div className="h-8 w-24 bg-slate-800 rounded animate-pulse" />
        ) : (
          <span className="text-2xl font-bold font-mono tracking-tight text-slate-100">
            {value !== null && value !== undefined ? value : '—'}
          </span>
        )}
        {badge && (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-800 border border-slate-700 text-slate-300">
            {badge}
          </span>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="flex items-center justify-between text-xs text-slate-500 mt-2 pt-2 border-t border-slate-800/50">
          {subtitle && <span className="truncate">{subtitle}</span>}
          {trend && (
            <span className={trend.positive ? 'text-emerald-400 font-mono' : 'text-amber-400 font-mono'}>
              {trend.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
