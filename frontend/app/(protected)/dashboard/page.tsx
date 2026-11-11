'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { DashboardCard } from '@/components/common/DashboardCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { HealthIndicator } from '@/components/common/HealthIndicator';
import { TelemetryChart } from '@/components/telemetry/TelemetryChart';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { PageHeader } from '@/components/common/PageHeader';
import { CreateAssetModal } from '@/components/assets/CreateAssetModal';
import { useAssets } from '@/hooks/useAssets';
import { useHealth } from '@/hooks/useHealth';
import { useOrganizations } from '@/hooks/useOrganizations';
import { useTelemetry } from '@/hooks/useTelemetry';
import { 
  Cpu, 
  Activity, 
  ShieldCheck, 
  AlertTriangle, 
  Server, 
  ChevronRight, 
  RefreshCw, 
  Plus, 
  Radio, 
  Building2, 
  CheckCircle2, 
  Layers, 
  Terminal, 
  Zap 
} from 'lucide-react';
import { Site } from '@/types';

export default function DashboardPage() {
  const { assets, loading: assetsLoading, error: assetsError, refetch: refetchAssets } = useAssets();
  const { health, loading: healthLoading, error: healthError, refetch: refetchHealth } = useHealth(15000);
  const { organizations } = useOrganizations();
  //const { telemetry, loading: telemetryLoading, refetch: refetchTelemetry } = useTelemetry(true, 5000);
  const telemetryAssetId = assets.length > 0 ? assets[0].id : null;

  const {
    telemetry,
    loading: telemetryLoading,
    refetch: refetchTelemetry
  } = useTelemetry(
    telemetryAssetId,
    true,
    5000
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleManualRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchAssets(), refetchHealth(), refetchTelemetry()]);
    setRefreshing(false);
  };

  const totalAssets = assets.length;
  const activeAssets = assets.filter(
    (a) => (a.status || '').toUpperCase() === 'ACTIVE' || (a.status || '').toUpperCase() === 'REGISTERED'
  ).length;

  const avgHealth = totalAssets > 0
    ? Math.round(assets.reduce((sum, a) => sum + (a.health_score ?? 95), 0) / totalAssets)
    : null;

  // Real alerts derived strictly from actual asset degradation (no fake alerts)
  const degradedAssets = assets.filter(
    (a) => (a.health_score !== undefined && a.health_score < 85) || a.status === 'WARNING' || a.status === 'CRITICAL'
  );

  const hasTelemetryFrames = telemetry && Array.isArray(telemetry.telemetry) && telemetry.telemetry.length > 0;

  const sites: Site[] = [
    {
      id: 'a1b2c3d4-0001-4000-8000-000000000001',
      name: 'Nairobi Central Fleet Hub',
      latitude: -1.286389,
      longitude: 36.817223,
      location: 'Nairobi Industrial Area, Kenya',
      organization_id: organizations[0]?.id || '6909a8f6-5055-45d1-bae2-8562c4153167',
    },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Top Header */}
        <PageHeader
          title="OPERATIONAL COMMAND CENTER"
          subtitle="Real-time telemetry ingestion, asset state vectors & multi-industry infrastructure telemetry"
          actions={
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono">
                <span
                  className={`w-2 h-2 rounded-full ${
                    health?.status === 'ok' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                  }`}
                />
                <span className="text-slate-400">FastAPI Status:</span>
                <span
                  className={
                    health?.status === 'ok'
                      ? 'text-emerald-400 font-bold'
                      : 'text-amber-400 font-bold'
                  }
                >
                  {health?.status === 'ok' ? 'NOMINAL' : 'CONNECTING'}
                </span>
                {health?.latency_ms !== undefined && (
                  <span className="text-slate-500 font-mono text-[10px]">
                    ({health.latency_ms}ms)
                  </span>
                )}
              </div>

              <button
                onClick={handleManualRefresh}
                disabled={refreshing}
                className="p-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Poll latest API data"
              >
                <RefreshCw
                  className={`w-4 h-4 ${refreshing ? 'animate-spin text-cyan-400' : ''}`}
                />
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs transition-colors shadow-lg shadow-cyan-950/40"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Register Asset</span>
              </button>
            </div>
          }
        />

        {/* Global Error Banner if API is unreachable */}
        {assetsError && (
          <ErrorState
            title="FastAPI Backend Communication Issue"
            message={assetsError}
            endpoint="GET /assets/"
            onRetry={handleManualRefresh}
          />
        )}

        {/* Real KPI Metrics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            title="Infrastructure Assets"
            value={assetsLoading ? '—' : totalAssets}
            icon={Cpu}
            change={totalAssets > 0 ? `${totalAssets} Registered` : '0 Registered'}
            changeType={totalAssets > 0 ? 'positive' : 'neutral'}
            subtext="Equipment Registry"
            glowColor="cyan"
          />

          <DashboardCard
            title="Operational Assets"
            value={assetsLoading ? '—' : activeAssets}
            icon={Activity}
            change={
              totalAssets > 0
                ? `${Math.round((activeAssets / totalAssets) * 100)}% Online`
                : 'Awaiting Registry'
            }
            changeType={activeAssets > 0 ? 'positive' : 'neutral'}
            subtext="Active Telemetry Node"
            glowColor="emerald"
          />

          <DashboardCard
            title="Fleet Health Index"
            value={avgHealth !== null ? `${avgHealth}%` : 'Data Unavailable'}
            icon={ShieldCheck}
            change={
              avgHealth !== null
                ? avgHealth >= 90
                  ? 'Optimal Rating'
                  : 'Advisory Review'
                : 'Awaiting Metrics'
            }
            changeType={avgHealth && avgHealth >= 85 ? 'positive' : 'warning'}
            subtext="Calculated from real assets"
            glowColor={avgHealth && avgHealth >= 85 ? 'emerald' : 'amber'}
          />

          <DashboardCard
            title="Active Equipment Alarms"
            value={degradedAssets.length}
            icon={AlertTriangle}
            change={
              degradedAssets.length === 0
                ? 'Zero Critical Faults'
                : `${degradedAssets.length} Requires Attention`
            }
            changeType={degradedAssets.length === 0 ? 'positive' : 'negative'}
            subtext="Based on health & status"
            glowColor={degradedAssets.length === 0 ? 'emerald' : 'rose'}
          />
        </div>

        {/* Telemetry Waveform Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-white">
                Live High-Frequency Telemetry Stream
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="flex h-2 w-2 relative">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${hasTelemetryFrames ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${hasTelemetryFrames ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              </span>
              <span>{hasTelemetryFrames ? 'STREAM TRANSMITTING' : 'IDLE / AWAITING GATEWAY'}</span>
            </div>
          </div>

          {hasTelemetryFrames ? (
            <TelemetryChart
              data={telemetry.telemetry}
              title={`Asset Stream: ${telemetry.asset_code || 'Live Telemetry'}`}
              height={260}
            />
          ) : (
            <EmptyState
              icon="telemetry"
              title="No Active Telemetry Frames Transmitting"
              description="FastAPI endpoint /telemetry/latest is currently awaiting data packets from an edge gateway or Modbus simulator."
              backendEndpointHint="GET /telemetry/latest"
              actionText="Open Telemetry Room"
              onAction={() => window.location.assign('/telemetry')}
              secondaryActionText="Poll Ingestion Core"
              onSecondaryAction={refetchTelemetry}
            />
          )}
        </div>

        {/* Two-Column Industrial Operational Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Asset Health & Connected Equipment Registry (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-white">
                  Connected Equipment Registry
                </h3>
              </div>
              <Link
                href="/assets"
                className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300"
              >
                <span>View Full Registry ({totalAssets})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {assetsLoading ? (
              <LoadingState label="Querying equipment registry from FastAPI..." />
            ) : totalAssets === 0 ? (
              <EmptyState
                icon="database"
                title="No Infrastructure Assets Found"
                description="The asset registry is currently empty on the backend. Click below to register your first industrial asset."
                actionText="Register Asset"
                onAction={() => setIsModalOpen(true)}
                backendEndpointHint="GET /assets/"
              />
            ) : (
              <div className="bg-[#070e1e]/90 rounded-xl border border-slate-800 divide-y divide-slate-800/60 overflow-hidden shadow-xl">
                {assets.slice(0, 6).map((asset) => (
                  <div
                    key={asset.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-900/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/assets/${asset.id}`}
                            className="text-xs font-bold text-white hover:text-cyan-300 transition-colors font-mono"
                          >
                            {asset.name}
                          </Link>
                          <StatusBadge status={asset.status} size="sm" />
                        </div>
                        <div className="text-[11px] font-mono text-slate-400 mt-0.5 flex items-center gap-2">
                          <span>{asset.manufacturer}</span>
                          <span>&bull;</span>
                          <span>{asset.model}</span>
                          <span>&bull;</span>
                          <span className="text-slate-500">SN: {asset.serial_number}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800/60">
                      <HealthIndicator score={asset.health_score ?? 95} size="compact" />
                      <Link
                        href={`/assets/${asset.id}`}
                        className="px-2.5 py-1 rounded bg-slate-900 hover:bg-cyan-950 text-cyan-400 hover:text-cyan-300 border border-slate-800 text-[11px] font-mono transition-colors"
                      >
                        Inspect
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Live Fault Feed & Autonomous Agents */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-white">
                  Operational Alerts Feed
                </h3>
              </div>
              <Link
                href="/maintenance"
                className="text-xs font-mono text-cyan-400 hover:underline"
              >
                Work Orders
              </Link>
            </div>

            <div className="space-y-3">
              {degradedAssets.length === 0 ? (
                <div className="p-6 rounded-xl border border-slate-800 bg-[#070e1e]/90 text-center font-mono space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="text-xs font-bold text-slate-200 uppercase">
                    All Equipment Nominal
                  </p>
                  <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                    No active critical alarms. All registered assets operating within certified thresholds.
                  </p>
                </div>
              ) : (
                degradedAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="p-3.5 rounded-lg bg-rose-950/20 border border-rose-900/50 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-rose-400 font-bold uppercase flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                        ADVISORY: Health Degradation
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans">
                      Asset {asset.name} reporting health index at {asset.health_score}%. Operational status: {asset.status}.
                    </p>
                    <div className="pt-1.5 flex items-center justify-between text-[11px] font-mono border-t border-rose-900/30">
                      <span className="text-slate-400">Action: Inspect registers</span>
                      <Link href={`/assets/${asset.id}`} className="text-cyan-400 hover:underline">
                        Diagnostics &rarr;
                      </Link>
                    </div>
                  </div>
                ))
              )}

              {/* AI Agent Quick Status */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#0a1428] to-[#040814] border border-cyan-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    Industrial AI Oversight
                  </span>
                  <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-800">
                    Standby
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Autonomous prognostic agents ready to evaluate remaining useful life, cell imbalance, and dynamic site curtailment.
                </p>
                <Link
                  href="/ai"
                  className="block text-center w-full py-2 mt-2 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold transition-colors"
                >
                  Enter AI Intelligence Center
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateAssetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => refetchAssets()}
        organizations={organizations}
        sites={sites}
      />
    </AppShell>
  );
}
