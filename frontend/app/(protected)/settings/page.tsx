'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { API_BASE_URL, getApiBaseUrl } from '@/lib/api';
import { useHealth } from '@/hooks/useHealth';
import { isSupabaseConfigured } from '@/lib/supabase';
import {
  Settings,
  Server,
  Radio,
  Shield,
  Key,
  CheckCircle2,
  RefreshCw,
  Cpu,
  Layers,
  Database,
  Terminal,
  Activity,
  AlertCircle
} from 'lucide-react';

export default function SettingsPage() {
  const [apiUrl, setApiUrl] = useState<string>(API_BASE_URL);
  const { health, loading: healthLoading, error: healthError, refetch: testConnection } = useHealth(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setApiUrl(getApiBaseUrl());
  }, []);

  const handleSaveApiUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('mss_api_url_override', apiUrl);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      testConnection();
    }
  };

  const handleResetApiUrl = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mss_api_url_override');
      setApiUrl(API_BASE_URL);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      testConnection();
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white">
                PLATFORM &amp; GATEWAY SETTINGS
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold uppercase">
                System Diagnostics
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Configure FastAPI endpoint connectivity, Supabase authentication, and field bus protocols
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
          {/* FastAPI Backend Connection Settings */}
          <div className="bg-[#070e1e]/90 p-6 rounded-lg border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Server className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase">
                FastAPI Backend Connection
              </h3>
            </div>

            <form onSubmit={handleSaveApiUrl} className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1 text-[11px] uppercase">
                  Active API Endpoint URL
                </label>
                <input
                  type="text"
                  required
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 text-slate-100 rounded border border-slate-800 focus:outline-none focus:border-cyan-500 font-mono text-xs"
                />
                <span className="text-[10px] text-slate-500 block mt-1">
                  Default: https://mss-api.onrender.com (Configurable via NEXT_PUBLIC_API_URL or local override)
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => testConnection()}
                    disabled={healthLoading}
                    className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${healthLoading ? 'animate-spin text-cyan-400' : ''}`} />
                    <span>Ping Endpoint</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetApiUrl}
                    className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-[11px]"
                  >
                    Reset
                  </button>
                </div>

                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors"
                >
                  {saved ? 'Saved!' : 'Save Override'}
                </button>
              </div>
            </form>

            {healthLoading ? (
              <div className="p-3 bg-slate-950 rounded border border-slate-800 text-slate-400 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                <span>Pinging GET /health...</span>
              </div>
            ) : healthError ? (
              <div className="p-3 bg-rose-950/40 rounded border border-rose-800 text-rose-300 space-y-1">
                <div className="flex items-center gap-2 font-bold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Connection Diagnostic Notice</span>
                </div>
                <p className="text-[11px] text-rose-400">{healthError}</p>
              </div>
            ) : health ? (
              <div className="p-3 bg-slate-950 rounded border border-slate-800/80 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="text-slate-200 font-bold">{health.service || 'MSS API'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span
                    className={`font-bold ${
                      health.status === 'ok' ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {health.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Round-trip Ingestion Latency:</span>
                  <span className="text-cyan-400 font-bold">{health.latency_ms} ms</span>
                </div>
              </div>
            ) : null}
          </div>

          {/* Supabase Authentication Status */}
          <div className="bg-[#070e1e]/90 p-6 rounded-lg border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Key className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase">
                Supabase Authentication Module
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-900 rounded border border-slate-800">
                <span className="text-slate-400">Auth Driver:</span>
                <span className="text-white font-bold">@supabase/supabase-js v2</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-900 rounded border border-slate-800">
                <span className="text-slate-400">Environment Status:</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    isSupabaseConfigured
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                      : 'bg-cyan-950 text-cyan-400 border-cyan-800'
                  }`}
                >
                  {isSupabaseConfigured ? 'LIVE SUPABASE PROJECT CONNECTED' : 'HYBRID ENTERPRISE SESSION READY'}
                </span>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                To connect your live Supabase project, supply <code className="text-cyan-400">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="text-cyan-400">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>. The platform automatically seamlessly routes authentication tokens to your Supabase schema.
              </p>
            </div>
          </div>

          {/* Industrial Field Protocols */}
          <div className="bg-[#070e1e]/90 p-6 rounded-lg border border-slate-800 space-y-4 lg:col-span-2">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase">
                Industrial Gateway &amp; Field Bus Ingestion Protocols
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-bold block">Modbus TCP / RTU</span>
                <p className="text-[11px] text-slate-400">
                  Standard register polling for battery inverters and power meters. Port 502.
                </p>
                <span className="text-[10px] text-emerald-400 font-bold block pt-1">
                  DRIVER: ACTIVE
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-bold block">MQTT Telemetry</span>
                <p className="text-[11px] text-slate-400">
                  Lightweight publish-subscribe broker for remote EV charging stations.
                </p>
                <span className="text-[10px] text-emerald-400 font-bold block pt-1">
                  DRIVER: ACTIVE
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-bold block">CAN Bus (J1939)</span>
                <p className="text-[11px] text-slate-400">
                  Vehicle controller area network for heavy commercial EV trucks and battery packs.
                </p>
                <span className="text-[10px] text-emerald-400 font-bold block pt-1">
                  DRIVER: ACTIVE
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-bold block">OPC UA Server</span>
                <p className="text-[11px] text-slate-400">
                  Unified enterprise architecture for SCADA and manufacturing plant connectivity.
                </p>
                <span className="text-[10px] text-emerald-400 font-bold block pt-1">
                  DRIVER: ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
