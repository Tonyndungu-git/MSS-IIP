'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Database, 
  Activity, 
  Radio, 
  AlertTriangle, 
  ShieldAlert, 
  RefreshCw, 
  Layers, 
  FileText, 
  Cpu,
  BarChart3,
  MapPin,
  Wrench,
  LucideIcon
} from 'lucide-react';

interface EmptyStateProps {
  icon?: 'database' | 'telemetry' | 'signal' | 'alert' | 'layers' | 'report' | 'ai' | 'generic' | LucideIcon | React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  actionText?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  secondaryActionText?: string;
  onSecondaryAction?: () => void;
  backendEndpointHint?: string;
}

export function EmptyState({
  icon = 'database',
  title,
  description,
  actionText,
  actionLabel,
  actionHref,
  onAction,
  secondaryActionText,
  onSecondaryAction,
  backendEndpointHint,
}: EmptyStateProps) {
  const finalActionLabel = actionLabel || actionText;

  const renderIcon = () => {
    if (typeof icon === 'function' || (typeof icon === 'object' && icon !== null)) {
      const CustomIcon = icon as any;
      return <CustomIcon className="w-8 h-8 text-cyan-400" />;
    }

    switch (icon) {
      case 'telemetry':
        return <Activity className="w-8 h-8 text-cyan-400" />;
      case 'signal':
        return <Radio className="w-8 h-8 text-amber-400" />;
      case 'alert':
        return <AlertTriangle className="w-8 h-8 text-amber-400" />;
      case 'layers':
        return <Layers className="w-8 h-8 text-blue-400" />;
      case 'report':
        return <FileText className="w-8 h-8 text-slate-400" />;
      case 'ai':
        return <Cpu className="w-8 h-8 text-cyan-400" />;
      case 'generic':
      case 'database':
      default:
        return <Database className="w-8 h-8 text-slate-400" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-xl border border-dashed border-slate-800 bg-slate-900/30 backdrop-blur-sm">
      <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center mb-4 shadow-inner">
        {renderIcon()}
      </div>
      <h3 className="text-lg font-semibold text-slate-200 tracking-tight mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-400 max-w-md leading-relaxed mb-4">
        {description}
      </p>

      {backendEndpointHint && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-800/80 border border-slate-700/50 text-xs font-mono text-cyan-400 mb-6">
          <span className="text-slate-400">Target Endpoint:</span>
          <span>{backendEndpointHint}</span>
        </div>
      )}

      {(finalActionLabel || secondaryActionText) && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {finalActionLabel && (
            actionHref ? (
              <Link
                href={actionHref}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-semibold text-sm transition-colors shadow-lg shadow-cyan-950/40"
              >
                {finalActionLabel}
              </Link>
            ) : onAction ? (
              <button
                onClick={onAction}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-semibold text-sm transition-colors shadow-lg shadow-cyan-950/40"
              >
                {finalActionLabel}
              </button>
            ) : null
          )}
          {secondaryActionText && onSecondaryAction && (
            <button
              onClick={onSecondaryAction}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm transition-colors border border-slate-700"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {secondaryActionText}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
