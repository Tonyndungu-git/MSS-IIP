'use client';

import React from 'react';
import { AlertCircle, RefreshCw, Terminal, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  endpoint?: string;
}

export function ErrorState({
  title = 'API Communication Interrupted',
  message,
  onRetry,
  endpoint,
}: ErrorStateProps) {
  return (
    <div className="p-6 rounded-xl border border-rose-900/40 bg-rose-950/10 backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 shrink-0">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-rose-200 uppercase tracking-wider mb-1">
            {title}
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed font-mono text-xs bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 mb-3 break-words">
            {message}
          </p>
          {endpoint && (
            <p className="text-xs text-slate-400 mb-4">
              Failed target endpoint:{' '}
              <span className="font-mono text-cyan-400">{endpoint}</span>
            </p>
          )}
          <div className="flex items-center gap-3">
            {onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry Request
              </button>
            )}
            <Link
              href="/settings"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors border border-slate-700"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              Verify API Configuration
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
