'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { useAssetDetails } from '@/hooks/useAssetDetails';
import { StatusBadge } from '@/components/common/StatusBadge';
import { HealthIndicator } from '@/components/common/HealthIndicator';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { PageHeader } from '@/components/common/PageHeader';
import { metricService } from '@/services/metricService';
import { aiService, AIAnalysisResult } from '@/services/aiService';
import {
  Cpu,
  ArrowLeft,
  Activity,
  Flame,
  Zap,
  Gauge,
  Wrench,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Terminal,
  Server,
  Layers,
  CheckCircle2,
  Sliders,
  Plus
} from 'lucide-react';

export default function AssetDetailsPage() {
  const params = useParams();
  const assetId = (params?.id as string) || '';

  const { asset, loading, error, refetch } = useAssetDetails(assetId);
  const [activeTab, setActiveTab] = useState<'overview' | 'telemetry' | 'registers' | 'maintenance' | 'ai'>('overview');
  const [refreshing, setRefreshing] = useState(false);

  // Dynamic Metric Register Form
  const [newMetricName, setNewMetricName] = useState('');
  const [newMetricUnit, setNewMetricUnit] = useState('');
  const [metricSubmitting, setMetricSubmitting] = useState(false);
  const [metricFeedback, setMetricFeedback] = useState<string | null>(null);

  // AI Evaluation State
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null);
  const [evaluatingAI, setEvaluatingAI] = useState(false);

  const handleManualRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleRegisterMetric = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMetricName.trim() || !newMetricUnit.trim()) return;

    setMetricSubmitting(true);
    setMetricFeedback(null);
    try {
      await metricService.setupAssetMetrics({
        asset_id: assetId,
        metrics: [{ metric_name: newMetricName.trim(), unit: newMetricUnit.trim() }],
      });
      setMetricFeedback(`Successfully configured metric register: ${newMetricName} (${newMetricUnit})`);
      setNewMetricName('');
      setNewMetricUnit('');
    } catch (err: any) {
      setMetricFeedback(`Configuration response: ${err?.message || 'Submitted to /asset-metrics/setup'}`);
    } finally {
      setMetricSubmitting(false);
    }
  };

  const handleRunAIEvaluation = async () => {
    if (!asset) return;
    setEvaluatingAI(true);
    try {
      const result = await aiService.evaluateAsset(asset);
      setAiAnalysis(result);
    } finally {
      setEvaluatingAI(false);
    }
  };

  if (loading) {
    return (
      <AppShell>
        <LoadingState
          label={`Querying FastAPI for asset ${assetId}...`}
          sublabel="Endpoint: GET /assets/{asset_id}"
          heightClass="min-h-[50vh]"
        />
      </AppShell>
    );
  }

  if (error || !asset) {
    return (
      <AppShell>
        <div className="space-y-4">
          <Link
            href="/assets"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Asset Registry</span>
          </Link>
          <ErrorState
            title="Asset Not Found in Backend Registry"
            message={error || `FastAPI did not return a valid asset record for UUID: ${assetId}`}
            endpoint={`GET /assets/${assetId}`}
            onRetry={handleManualRefresh}
          />
        </div>
      </AppShell>
    );
  }

  const hasTelemetry = asset.telemetry && Object.keys(asset.telemetry).length > 0;

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Navigation & Header */}
        <PageHeader
          title={asset.name}
          subtitle={`Hardware Class: ${asset.asset_type} • OEM: ${asset.manufacturer} • Model: ${asset.model}`}
          breadcrumbs={[
            { label: 'Assets', href: '/assets' },
            { label: asset.name },
          ]}
          badge={<StatusBadge status={asset.status} size="md" />}
          actions={
            <div className="flex items-center gap-2">
              <button
                onClick={handleManualRefresh}
                disabled={refreshing}
                className="p-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Poll latest asset data"
              >
                <RefreshCw
                  className={`w-4 h-4 ${refreshing ? 'animate-spin text-cyan-400' : ''}`}
                />
              </button>

              <button
                onClick={handleRunAIEvaluation}
                disabled={evaluatingAI}
                className="px-3.5 py-2 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 shadow-sm shadow-cyan-950"
              >
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>{evaluatingAI ? 'Running AI Evaluation...' : 'Run Industrial AI Advisory'}</span>
              </button>
            </div>
          }
        />

        {/* Live Gauges & Spec Header Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#070e1e]/90 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
              Health Index
            </span>
            <div className="my-2">
              <HealthIndicator score={asset.health_score ?? 95} size="large" />
            </div>
            <span className="text-[10px] font-mono text-emerald-400">
              Condition: {asset.health_score >= 90 ? 'Nominal' : 'Requires Review'}
            </span>
          </div>

          <div className="bg-[#070e1e]/90 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
              Serial Number
            </span>
            <div className="my-2">
              <span className="text-xl font-bold font-mono text-cyan-300 select-all">
                {asset.serial_number || 'N/A'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              Manufacturer Serial
            </span>
          </div>

          <div className="bg-[#070e1e]/90 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
              Ingress Telemetry
            </span>
            <div className="my-2">
              <span
                className={`text-xl font-bold font-mono ${
                  hasTelemetry ? 'text-emerald-400' : 'text-slate-400'
                }`}
              >
                {hasTelemetry ? 'Transmitting' : 'Idle'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              {hasTelemetry ? 'Active telemetry stream' : 'Awaiting edge gateway'}
            </span>
          </div>

          <div className="bg-[#070e1e]/90 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
              Operational Status
            </span>
            <div className="my-2">
              <StatusBadge status={asset.status} size="lg" />
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              SCADA State Code
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 font-mono text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-3 transition-colors border-b-2 font-bold whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Engineering Overview
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`pb-3 px-3 transition-colors border-b-2 font-bold whitespace-nowrap ${
              activeTab === 'telemetry'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Telemetry Registers
          </button>
          <button
            onClick={() => setActiveTab('registers')}
            className={`pb-3 px-3 transition-colors border-b-2 font-bold whitespace-nowrap ${
              activeTab === 'registers'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Configure Metric Registers
          </button>
          <button
            onClick={() => setActiveTab('maintenance')}
            className={`pb-3 px-3 transition-colors border-b-2 font-bold whitespace-nowrap ${
              activeTab === 'maintenance'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Maintenance Log
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`pb-3 px-3 transition-colors border-b-2 font-bold whitespace-nowrap ${
              activeTab === 'ai'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            AI Advisory
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#070e1e]/90 rounded-xl border border-slate-800 p-6 font-mono text-xs space-y-4">
              <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Physical Hardware Specification
              </h3>
              <div className="divide-y divide-slate-800/80">
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Asset UUID:</span>
                  <span className="text-cyan-400 select-all font-bold">{asset.id}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Equipment Name:</span>
                  <span className="text-white font-bold">{asset.name}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Asset Type / Class:</span>
                  <span className="text-slate-200 font-bold">{asset.asset_type}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Original Manufacturer:</span>
                  <span className="text-slate-200">{asset.manufacturer}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Model Name:</span>
                  <span className="text-slate-200">{asset.model}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Serial Identification:</span>
                  <span className="text-cyan-400">{asset.serial_number}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#070e1e]/90 rounded-xl border border-slate-800 p-6 font-mono text-xs space-y-4">
              <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Platform &amp; Topology Bindings
              </h3>
              <div className="divide-y divide-slate-800/80">
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Organization Tenant ID:</span>
                  <span className="text-slate-300 truncate max-w-[200px]">
                    {asset.organization_id || 'Global Tenant'}
                  </span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Physical Site ID:</span>
                  <span className="text-slate-300 truncate max-w-[200px]">
                    {asset.site_id || 'Not Assigned'}
                  </span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Edge Gateway ID:</span>
                  <span className="text-slate-300">
                    {asset.gateway_id || 'Unbound (Awaiting gateway registration)'}
                  </span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Protocol Support:</span>
                  <span className="text-cyan-400">Modbus TCP • MQTT 5.0 • CANopen</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Telemetry */}
        {activeTab === 'telemetry' && (
          <div className="space-y-4">
            {hasTelemetry ? (
              <div className="bg-[#070e1e]/90 rounded-xl border border-slate-800 p-6 font-mono text-xs space-y-3">
                <h3 className="text-sm font-bold text-white uppercase">
                  Active Ingested Telemetry Registers
                </h3>
                <pre className="p-4 rounded bg-slate-950 border border-slate-800 text-cyan-300 overflow-x-auto">
                  {JSON.stringify(asset.telemetry, null, 2)}
                </pre>
              </div>
            ) : (
              <EmptyState
                icon="telemetry"
                title="No Telemetry Registers Reporting"
                description="This equipment is registered in the FastAPI database, but no live telemetry payload has been transmitted by an edge gateway for this asset code."
                backendEndpointHint={`GET /assets/${asset.id}`}
                actionText="View Telemetry Room"
                onAction={() => window.location.assign('/telemetry')}
                secondaryActionText="Poll Ingestion Core"
                onSecondaryAction={handleManualRefresh}
              />
            )}
          </div>
        )}

        {/* Tab 3: Configure Metric Registers */}
        {activeTab === 'registers' && (
          <div className="bg-[#070e1e]/90 rounded-xl border border-slate-800 p-6 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                Define Asset Metric Registers
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Direct write to FastAPI endpoint <code className="text-cyan-400">POST /asset-metrics/setup</code>
              </p>
            </div>

            {metricFeedback && (
              <div className="p-3 rounded bg-cyan-950/40 border border-cyan-800 text-xs font-mono text-cyan-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-cyan-400" />
                <span>{metricFeedback}</span>
              </div>
            )}

            <form onSubmit={handleRegisterMetric} className="space-y-4 font-mono text-xs max-w-lg">
              <div>
                <label className="text-slate-400 block mb-1 uppercase text-[11px]">
                  Metric Register Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. dc_bus_voltage, cell_temperature, motor_rpm"
                  value={newMetricName}
                  onChange={(e) => setNewMetricName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 text-slate-200 rounded border border-slate-800 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 uppercase text-[11px]">
                  Engineering Unit
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. V, °C, kW, rpm, bar, A"
                  value={newMetricUnit}
                  onChange={(e) => setNewMetricUnit(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 text-slate-200 rounded border border-slate-800 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                disabled={metricSubmitting}
                className="px-4 py-2.5 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono transition-colors flex items-center gap-2 shadow-lg shadow-cyan-950/40 disabled:opacity-50"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{metricSubmitting ? 'Registering...' : 'Register Metric on FastAPI'}</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 4: Maintenance */}
        {activeTab === 'maintenance' && (
          <EmptyState
            icon="report"
            title="No Maintenance Work Orders Logged"
            description="There are currently no active or historical maintenance records filed for this equipment in the database."
            actionText="Open Work Orders"
            onAction={() => window.location.assign('/maintenance')}
          />
        )}

        {/* Tab 5: AI Advisory */}
        {activeTab === 'ai' && (
          <div className="space-y-4">
            {!aiAnalysis ? (
              <div className="p-8 rounded-xl border border-slate-800 bg-[#070e1e]/90 text-center font-mono space-y-4">
                <Cpu className="w-10 h-10 text-cyan-400 mx-auto" />
                <h3 className="text-sm font-bold text-white uppercase">
                  Industrial AI Prognostics Engine
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  Analyze telemetry attributes, operational status, and health degradation index for {asset.name} without fabricating unverified claims.
                </p>
                <button
                  onClick={handleRunAIEvaluation}
                  disabled={evaluatingAI}
                  className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-cyan-950/60"
                >
                  {evaluatingAI ? 'Evaluating Equipment Telemetry...' : 'Generate AI Prognostic Assessment'}
                </button>
              </div>
            ) : (
              <div className="bg-[#070e1e]/90 rounded-xl border border-slate-800 p-6 font-mono text-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-sm font-bold text-white uppercase flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    AI Prognostic Assessment
                  </span>
                  <span className="text-cyan-400">
                    Confidence: {aiAnalysis.confidenceScore}%
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded border border-slate-800 text-slate-200">
                  {aiAnalysis.healthAssessment}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Findings:</h4>
                  <ul className="space-y-1 text-slate-300">
                    {aiAnalysis.findings.map((finding, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">
                    Recommended Actions:
                  </h4>
                  <ul className="space-y-1 text-slate-300">
                    {aiAnalysis.recommendedActions.map((action, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}
