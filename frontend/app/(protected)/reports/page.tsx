'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useReports } from '@/hooks/useReports';
import { useAssets } from '@/hooks/useAssets';
import { useTelemetry } from '@/hooks/useTelemetry';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingState } from '@/components/common/LoadingState';
import {
  FileText,
  Download,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Filter,
  FileSpreadsheet,
  Terminal,
  Activity,
  Cpu
} from 'lucide-react';

export default function ReportsPage() {
  const { reports, loading: reportsLoading, exportAssetInventory, exportTelemetrySnapshot } = useReports();
  const { assets, loading: assetsLoading } = useAssets();
  const { telemetry } = useTelemetry(null, false);
  const [exportingType, setExportingType] = useState<string | null>(null);

  const handleExportAssets = async () => {
    setExportingType('assets');
    try {
      await exportAssetInventory(assets);
    } finally {
      setExportingType(null);
    }
  };

  const handleExportTelemetry = async () => {
    setExportingType('telemetry');
    try {
      await exportTelemetrySnapshot(telemetry, assets[0]?.name);
    } finally {
      setExportingType(null);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white">
                COMPLIANCE &amp; INDUSTRIAL AUDIT REPORTS
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold uppercase">
                Audit Trail
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Deterministic data extraction for ISO 55001 Asset Management and IEEE 1547 Grid Compliance
            </p>
          </div>
        </div>

        {/* Quick Export Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
          <div className="bg-[#070e1e]/90 p-5 rounded-lg border border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Full Asset Fleet Inventory (CSV)</h3>
                <p className="text-xs text-slate-400">Exports all verified equipment records, serials, and health scores</p>
              </div>
            </div>
            <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
              <span className="text-xs text-slate-500">{assets.length} items ready</span>
              <button
                onClick={handleExportAssets}
                disabled={exportingType === 'assets' || assets.length === 0}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{exportingType === 'assets' ? 'Generating...' : 'Download CSV'}</span>
              </button>
            </div>
          </div>

          <div className="bg-[#070e1e]/90 p-5 rounded-lg border border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-purple-400">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Telemetry Frame Raw Snapshot (JSON)</h3>
                <p className="text-xs text-slate-400">Exports latest ingested frames directly from GET /telemetry/latest</p>
              </div>
            </div>
            <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
              <span className="text-xs text-slate-500">Live Ingest Frame</span>
              <button
                onClick={handleExportTelemetry}
                disabled={exportingType === 'telemetry'}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-purple-500 hover:bg-purple-400 text-slate-950 text-xs font-bold transition-all disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{exportingType === 'telemetry' ? 'Extracting...' : 'Export JSON'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Audit History or Empty State */}
        <div className="bg-[#070e1e]/90 rounded-lg border border-slate-800 p-5 space-y-4 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Generated Compliance Log History
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">{reports.length} Reports Logged</span>
          </div>

          {reportsLoading ? (
            <LoadingState message="Loading report history..." />
          ) : reports.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No Exported Reports in Log History"
              description="No audit certificates or telemetry archives have been downloaded during this session. Use the export actions above to generate real-time asset inventories or JSON snapshots."
              actionLabel="Export Fleet Inventory (CSV)"
              onAction={handleExportAssets}
            />
          ) : (
            <div className="divide-y divide-slate-800/80 text-xs">
              {reports.map((rep) => (
                <div key={rep.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{rep.title}</span>
                      <span className="text-[10px] bg-slate-900 text-cyan-300 px-2 py-0.5 rounded border border-slate-800">
                        {rep.format}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      ID: {rep.id} • Generated: {new Date(rep.generated_at).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-[11px]">{rep.file_size}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                      {rep.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
