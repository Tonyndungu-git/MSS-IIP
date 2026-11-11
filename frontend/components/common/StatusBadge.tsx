'use client';

import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showDot = true,
}) => {
  const norm = (status || '').toUpperCase();

  let colorClasses = 'bg-slate-800 text-slate-300 border-slate-700';
  let dotColor = 'bg-slate-400';

  if (norm === 'ACTIVE' || norm === 'NOMINAL' || norm === 'OPERATIONAL' || norm === 'REGISTERED') {
    colorClasses = 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60';
    dotColor = 'bg-emerald-400';
  } else if (norm === 'WARNING' || norm === 'DEGRADED' || norm === 'ADVISORY') {
    colorClasses = 'bg-amber-950/60 text-amber-300 border-amber-800/60';
    dotColor = 'bg-amber-400';
  } else if (norm === 'CRITICAL' || norm === 'ERROR' || norm === 'FAILED') {
    colorClasses = 'bg-rose-950/60 text-rose-300 border-rose-800/60';
    dotColor = 'bg-rose-400';
  } else if (norm === 'OFFLINE' || norm === 'STANDBY') {
    colorClasses = 'bg-slate-900 text-slate-400 border-slate-800';
    dotColor = 'bg-slate-500';
  } else if (norm === 'MAINTENANCE') {
    colorClasses = 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60';
    dotColor = 'bg-cyan-400';
  }

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider',
    md: 'text-xs px-2.5 py-1 tracking-wide',
    lg: 'text-sm px-3 py-1.5 font-medium',
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded font-mono uppercase font-semibold border ${sizeClasses} ${colorClasses}`}
    >
      {showDot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${dotColor} ${
            norm === 'ACTIVE' ? 'animate-pulse' : ''
          }`}
        />
      )}
      <span>{norm}</span>
    </span>
  );
};
