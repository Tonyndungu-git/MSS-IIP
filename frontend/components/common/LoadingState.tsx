'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  label?: string;
  message?: string;
  sublabel?: string;
  heightClass?: string;
}

export function LoadingState({
  label,
  message,
  sublabel = 'Communicating with FastAPI telemetry and asset core',
  heightClass = 'min-h-[280px]',
}: LoadingStateProps) {
  const displayLabel = label || message || 'Querying Industrial Infrastructure Registry...';

  return (
    <div className={`flex flex-col items-center justify-center p-8 rounded-xl border border-slate-800/80 bg-slate-900/30 ${heightClass}`}>
      <div className="relative mb-4">
        <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        </div>
      </div>
      <p className="text-sm font-medium text-slate-200 tracking-wide">
        {displayLabel}
      </p>
      {sublabel && (
        <p className="text-xs text-slate-500 mt-1 font-mono">
          {sublabel}
        </p>
      )}
    </div>
  );
}
