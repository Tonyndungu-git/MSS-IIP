'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useAssets } from '@/hooks/useAssets';
import { useTelemetry } from '@/hooks/useTelemetry';
import { StatusBadge } from '@/components/common/StatusBadge';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingState } from '@/components/common/LoadingState';
import {
  Activity,
  Radio,
  RefreshCw,
  Server,
  Terminal,
  Cpu,
  ArrowRight,
  Database,
  Clock,
  Layers,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function TelemetryPage() {
  const { assets, loading: assetsLoading } = useAssets();
  const [selectedAssetId, setSelectedAssetId] = useState<string>('');
  const [pollInterval, setPollInterval] = useState<number>(5000);
  const [isPolling, setIsPolling] = useState<boolean>(true);

  const assetId = assets.length > 0 ? assets[0].id : null;

  const {
    telemetry,
    loading: telemetryLoading,
    error: telemetryError,
    lastUpdated,
    refetch,
  } = useTelemetry(
    assetId,
    isPolling,
    pollInterval
  );

  const activeAsset = assets.find((a) => a.id === selectedAssetId) || assets[0];
  const telemetryRecords = telemetry?.telemetry || [];
  const hasTelemetry = telemetryRecords.length > 0;

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white">
                LIVE INDUSTRIAL TELEMETRY ROOM
              </h1>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase flex items-center gap-1.5 ${
                hasTelemetry
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : 'bg-amber-950/60 text-amber-400 border border-amber-800/80'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${hasTelemetry ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
                {hasTelemetry ? 'Active Feed' : 'Awaiting Edge Stream'}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Direct telemetry ingestion connected to FastAPI <code className="text-cyan-400">GET /telemetry/latest</code>
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Polling Interval Selector */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs font-mono">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-400 hidden sm:inline">Interval:</span>
              <select
                value={isPolling ? pollInterval : 0}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val === 0) {
                    setIsPolling(false);
                  } else {
                    setIsPolling(true);
                    setPollInterval(val);
                  }
                }}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value={3000} className="bg-slate-900">3s (Real-time)</option>
                <option value={5000} className="bg-slate-900">5s (Standard)</option>
                <option value={10000} className="bg-slate-900">10s (Eco)</option>
                <option value={0} className="bg-slate-900">Paused</option>
              </select>
            </div>

            <button
              onClick={() => refetch()}
              className="p-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Manual Poll"
            >
              <RefreshCw className={`w-4 h-4 ${telemetryLoading ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Equipment Selector Strip */}
        <div className="bg-[#070e1e]/90 p-4 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 flex-wrap">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400 uppercase">Target Equipment Feed:</span>
            {assetsLoading ? (
              <span className="text-slate-500">Querying asset registry...</span>
            ) : assets.length > 0 ? (
              <select
                value={selectedAssetId || activeAsset?.id}
                onChange={(e) => setSelectedAssetId(e.target.value)}
                className="bg-slate-900 text-slate-200 border border-slate-800 rounded px-3 py-1.5 font-bold focus:outline-none focus:border-cyan-500 font-mono"
              >
                {assets.map((asset) => (
                  <option key={asset.id} value={asset.id}>
                    {asset.name} [{asset.asset_type}] — SN: {asset.serial_number}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-slate-500">No assets registered in backend</span>
            )}
          </div>

          {activeAsset && (
            <div className="flex items-center gap-3">
              <StatusBadge status={activeAsset.status} size="sm" />
              <Link
                href={`/assets/${activeAsset.id}`}
                className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 font-bold"
              >
                <span>Asset Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Live Telemetry Display or Empty State */}
        {hasTelemetry ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {telemetryRecords.map((item, idx) => (
                <div key={idx} className="bg-[#070e1e]/90 rounded-lg border border-slate-800 p-4 font-mono">
                  <div className="text-slate-400 text-xs uppercase mb-1">
                    {item.metric}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {item.value} <span className="text-sm text-cyan-400 font-normal">{item.unit}</span>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Timestamp: {item.timestamp || 'Real-time'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <EmptyState
              icon={Activity}
              title="No Active Telemetry Frames Transmitted"
              description="The FastAPI endpoint GET /telemetry/latest returned an empty telemetry payload. This occurs when physical gateways or edge simulation daemons have not published new frames to the telemetry broker."
              actionLabel="Check Gateway Configuration"
              actionHref="/settings"
            />

            {/* Ingestion Stream Protocol Specifications */}
            <div className="bg-[#070e1e]/90 rounded-lg border border-slate-800 p-5 font-mono text-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Radio className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-white uppercase tracking-wider">
                  Edge Gateway Ingestion Pipeline Verification
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-300">
                <div className="bg-slate-950/80 p-3 rounded border border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] text-slate-500 uppercase block font-bold">1. Edge Gateway Broker</span>
                  <p className="text-slate-300">MQTT over TLS (Port 8883) or Modbus TCP (Port 502)</p>
                  <span className="text-[10px] text-cyan-400">mss/telemetry/v1/stream</span>
                </div>
                <div className="bg-slate-950/80 p-3 rounded border border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] text-slate-500 uppercase block font-bold">2. Ingestion Worker</span>
                  <p className="text-slate-300">FastAPI background worker running in backend container</p>
                  <span className="text-[10px] text-emerald-400">Status: Ingestion Listening</span>
                </div>
                <div className="bg-slate-950/80 p-3 rounded border border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] text-slate-500 uppercase block font-bold">3. Timeseries Buffer</span>
                  <p className="text-slate-300">Circular timeseries buffer for low-latency dispatch</p>
                  <span className="text-[10px] text-purple-400">Retains last 10,000 frames</span>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded border border-slate-800/90 text-slate-300">
                <span className="text-[10px] text-slate-500 block mb-1">Simulate Gateway Telemetry Packet via cURL:</span>
                <code className="text-cyan-300 select-all block overflow-x-auto text-[11px] py-1">
                  curl -X POST https://mss-api.onrender.com/telemetry/latest -H &apos;Content-Type: application/json&apos; -d &apos;{JSON.stringify({ asset_code: activeAsset?.serial_number || 'BYD-001', telemetry: [{ metric: 'soc', value: 87.5, unit: '%' }] })}&apos;
                </code>
              </div>
            </div>
          </div>
        )}

        {/* Live Packet Raw Inspector & Synchronized Fleet Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Synchronized Fleet Matrix */}
          <div className="bg-[#070e1e]/90 rounded-lg border border-slate-800 p-5 space-y-4 font-mono">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Fleet Registry ({assets.length} Nodes)
                </h3>
              </div>
              <span className="text-[10px] text-slate-400">
                {assetsLoading ? 'Loading...' : 'FastAPI Connected'}
              </span>
            </div>

            {assetsLoading ? (
              <LoadingState message="Loading registered nodes from FastAPI..." />
            ) : assets.length > 0 ? (
              <div className="divide-y divide-slate-800/60 text-xs">
                {assets.map((a) => (
                  <div key={a.id} className="py-2.5 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-white font-bold block">{a.name}</span>
                      <span className="text-slate-500 text-[10px] block">
                        {a.manufacturer} {a.model} • SN: {a.serial_number}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={a.status} size="sm" />
                      <button
                        onClick={() => setSelectedAssetId(a.id)}
                        className={`px-2 py-1 rounded border text-[10px] transition-colors ${
                          selectedAssetId === a.id
                            ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                            : 'bg-slate-900 hover:bg-slate-800 text-cyan-400 border-slate-800'
                        }`}
                      >
                        {selectedAssetId === a.id ? 'Selected' : 'Inspect'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-500 py-4 text-center">
                No equipment records found in database.
              </div>
            )}
          </div>

          {/* FastAPI Ingestion Inspector */}
          <div className="bg-[#070e1e]/90 rounded-lg border border-slate-800 p-5 space-y-4 font-mono">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Live JSON Packet Inspector (/telemetry/latest)
                </h3>
              </div>
              <span className="text-[10px] text-slate-400">
                {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Polling'}
              </span>
            </div>

            {telemetryError ? (
              <div className="p-3 bg-rose-950/40 border border-rose-800 rounded text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{telemetryError}</span>
              </div>
            ) : (
              <pre className="p-3 bg-slate-950 rounded border border-slate-800/90 text-cyan-300 font-mono text-xs overflow-x-auto max-h-64">
{JSON.stringify(telemetry || { asset_code: null, telemetry: [] }, null, 2)}
              </pre>
            )}

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>Endpoint: GET /telemetry/latest</span>
              <span className="text-slate-400">
                Records in frame: {telemetryRecords.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
