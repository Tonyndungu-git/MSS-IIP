'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  badge?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  actions,
  badge,
}: PageHeaderProps) {
  return (
    <div className="mb-6 pb-5 border-b border-slate-800/80">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-2 font-mono">
          <Link
            href="/dashboard"
            className="hover:text-slate-200 transition-colors flex items-center gap-1"
          >
            <Home className="w-3.5 h-3.5" />
            <span>IIP</span>
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-slate-200">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-100 font-mono">
              {title}
            </h1>
            {badge}
          </div>
          {subtitle && (
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
      </div>
    </div>
  );
}
