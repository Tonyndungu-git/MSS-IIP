'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useAIAgents } from '@/hooks/useAIAgents';
import { useAssets } from '@/hooks/useAssets';
import { StatusBadge } from '@/components/common/StatusBadge';
import { LoadingState } from '@/components/common/LoadingState';
import { EmptyState } from '@/components/common/EmptyState';
import {
  Bot,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  Cpu,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Activity,
  SlidersHorizontal,
  Flame,
  Radio
} from 'lucide-react';

export default function AIPage() {
  const { agents, selectedAgentId, setSelectedAgentId, evaluating, analysisResult, evaluateAsset } = useAIAgents();
  const { assets, loading: assetsLoading } = useAssets();
  const [selectedAssetId, setSelectedAssetId] = useState<string>('');

  const activeAgent = agents.find((a) => a.id === selectedAgentId) || agents[0];
  const targetAsset = assets.find((a) => a.id === selectedAssetId) || assets[0];

  const handleRunEvaluation = async () => {
    if (targetAsset) {
      await evaluateAsset(targetAsset);
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
                INDUSTRIAL AI INTELLIGENCE &amp; AUTONOMOUS AGENTS
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold uppercase">
                {agents.length} Registered Micro-Agents
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Autonomous physics-informed prognostic algorithms and telemetry stream optimizers for enterprise infrastructure
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-950/60 border border-emerald-800/80 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Inference Engine: Nominal
            </span>
          </div>
        </div>

        {/* Autonomous Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {agents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => setSelectedAgentId(agent.id)}
              className={`text-left p-4 rounded-lg border font-mono transition-all ${
                selectedAgentId === agent.id
                  ? 'bg-cyan-950/40 border-cyan-500 shadow-lg shadow-cyan-950/30'
                  : 'bg-[#070e1e]/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                  v{agent.version}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1 line-clamp-1">{agent.name}</h3>
              <p className="text-[11px] text-cyan-400 mb-2">{agent.domain}</p>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {agent.description}
              </p>
            </button>
          ))}
        </div>

        {/* Active Agent Capabilities Detail */}
        {activeAgent && (
          <div className="bg-[#070e1e]/90 rounded-lg border border-slate-800 p-5 font-mono space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">Active Agent Pipeline</span>
                <h2 className="text-base font-bold text-white">{activeAgent.name}</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                  STATUS: {activeAgent.status}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-bold">
                  CATEGORY: {activeAgent.category}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase mb-2">Prognostic Capabilities</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {activeAgent.capabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded bg-slate-950 border border-slate-800/80 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Live Asset Diagnostics Evaluator */}
        <div className="bg-[#070e1e]/90 rounded-lg border border-slate-800 p-5 font-mono space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Deterministic Asset Diagnostics Evaluator
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">Target Asset Analysis</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-slate-950 p-4 rounded border border-slate-800/80">
            <div className="flex-1 space-y-1">
              <label className="text-[11px] text-slate-400 block font-bold uppercase">
                Select Real Equipment from FastAPI Database:
              </label>
              {assetsLoading ? (
                <div className="text-xs text-slate-500">Loading asset registry...</div>
              ) : assets.length > 0 ? (
                <select
                  value={selectedAssetId || targetAsset?.id}
                  onChange={(e) => setSelectedAssetId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 text-slate-100 rounded border border-slate-800 text-xs font-mono focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  {assets.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} [{a.asset_type}] (Status: {a.status}, Health: {a.health_score ?? 90}%)
                    </option>
                  ))}
                </select>
              ) : (
                <div className="text-xs text-amber-400">No assets available in database.</div>
              )}
            </div>

            <button
              onClick={handleRunEvaluation}
              disabled={evaluating || !targetAsset}
              className="sm:self-end px-4 py-2 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Play className={`w-3.5 h-3.5 ${evaluating ? 'animate-spin' : ''}`} />
              <span>{evaluating ? 'Evaluating Telemetry...' : 'Run Diagnostics'}</span>
            </button>
          </div>

          {/* Analysis Output */}
          {analysisResult && (
            <div className="p-4 rounded bg-slate-950 border border-cyan-800/60 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-white font-bold text-xs">
                  Prognostic Assessment: {analysisResult.assetName}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  analysisResult.riskLevel === 'CRITICAL'
                    ? 'bg-rose-950 text-rose-300 border-rose-800'
                    : analysisResult.riskLevel === 'MODERATE'
                    ? 'bg-amber-950 text-amber-300 border-amber-800'
                    : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                }`}>
                  Risk Level: {analysisResult.riskLevel}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {analysisResult.healthAssessment}
              </p>

              <div>
                <span className="text-[11px] text-slate-400 font-bold block mb-1 uppercase">
                  Telemetry &amp; Integrity Findings:
                </span>
                <ul className="space-y-1 text-xs text-slate-300">
                  {analysisResult.findings.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 font-bold block mb-1 uppercase">
                  Recommended Engineering Actions:
                </span>
                <ul className="space-y-1 text-xs text-slate-300">
                  {analysisResult.recommendedActions.map((act, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800">
                <span>Confidence Index: {analysisResult.confidenceScore}%</span>
                <span>Evaluated: {new Date(analysisResult.analysisTimestamp).toLocaleTimeString()}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
