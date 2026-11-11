'use client';

import React from 'react';

interface HealthIndicatorProps {
  score: number;
  size?: 'compact' | 'standard' | 'large' | 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const HealthIndicator: React.FC<HealthIndicatorProps> = ({
  score,
  size = 'standard',
  showLabel = true,
}) => {
  const normalizedSize = size === 'sm' ? 'compact' : size === 'lg' ? 'large' : size === 'md' ? 'standard' : size;
  const safeScore = Math.max(0, Math.min(100, Math.round(score)));

  let color = 'text-emerald-400';
  let strokeColor = '#10b981';
  let bgColor = 'bg-emerald-950/40 border-emerald-800/40';

  if (safeScore < 75) {
    color = 'text-rose-400';
    strokeColor = '#f43f5e';
    bgColor = 'bg-rose-950/40 border-rose-800/40';
  } else if (safeScore < 90) {
    color = 'text-amber-400';
    strokeColor = '#f59e0b';
    bgColor = 'bg-amber-950/40 border-amber-800/40';
  }

  if (normalizedSize === 'compact') {
    return (
      <div className="flex items-center gap-2 font-mono">
        <div className="w-16 h-2 bg-slate-800 rounded-sm overflow-hidden border border-slate-700">
          <div
            className="h-full transition-all duration-500 rounded-sm"
            style={{ width: `${safeScore}%`, backgroundColor: strokeColor }}
          />
        </div>
        <span className={`text-xs font-bold ${color}`}>{safeScore}%</span>
      </div>
    );
  }

  // Circular gauge for standard or large
  const radius = normalizedSize === 'large' ? 44 : 26;
  const strokeWidth = normalizedSize === 'large' ? 6 : 4;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (safeScore / 100) * circumference;
  const dimension = (radius + strokeWidth) * 2;

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex items-center justify-center">
        <svg
          width={dimension}
          height={dimension}
          className="-rotate-90 transform"
        >
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center font-mono">
          <span
            className={`font-bold ${
              size === 'large' ? 'text-xl' : 'text-xs'
            } ${color}`}
          >
            {safeScore}
          </span>
          {size === 'large' && (
            <span className="text-[10px] text-slate-400 uppercase font-sans tracking-wider">
              Health
            </span>
          )}
        </div>
      </div>

      {showLabel && size !== 'large' && (
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">
            Health Index
          </span>
          <span className={`text-xs font-semibold font-mono ${color}`}>
            {safeScore >= 90 ? 'Optimal' : safeScore >= 75 ? 'Advisory' : 'Degraded'}
          </span>
        </div>
      )}
    </div>
  );
};
