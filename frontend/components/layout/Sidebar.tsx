'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  MapPin,
  Cpu,
  Activity,
  LineChart,
  Wrench,
  Bot,
  FileText,
  Settings,
  Zap,
  ChevronDown,
  Layers,
  Radio,
  Car,
  BatteryCharging,
  Factory
} from 'lucide-react';
import { api, HealthResponse } from '@/lib/api';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [activeModule, setActiveModule] = useState<'ALL' | 'EV' | 'BESS' | 'MFG'>('ALL');
  const [healthStatus, setHealthStatus] = useState<HealthResponse | null>(null);

  useEffect(() => {
    let isMounted = true;
    api.getHealth().then((res) => {
      if (isMounted) setHealthStatus(res);
    });

    const interval = setInterval(() => {
      api.getHealth().then((res) => {
        if (isMounted) setHealthStatus(res);
      });
    }, 20000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Organizations', href: '/organizations', icon: Building2 },
    { name: 'Physical Sites', href: '/sites', icon: MapPin },
    { name: 'Assets Registry', href: '/assets', icon: Cpu },
    { name: 'Telemetry Feeds', href: '/telemetry', icon: Activity },
    { name: 'Analytics & Risk', href: '/analytics', icon: LineChart },
    { name: 'Maintenance', href: '/maintenance', icon: Wrench },
    { name: 'AI Intelligence', href: '/ai', icon: Bot, badge: 'Neural' },
    { name: 'Compliance Reports', href: '/reports', icon: FileText },
    { name: 'System Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#030816] border-r border-slate-800/90 flex flex-col justify-between h-screen sticky top-0 select-none z-30 shrink-0">
      <div>
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800/90 bg-[#020617]/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-950/50 border border-cyan-400/40">
              <Zap className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-sm font-black tracking-wider text-white">
                  M SYNAPSES
                </span>
                <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-semibold">
                  IIP
                </span>
              </div>
              <p className="text-[10px] font-mono tracking-tight text-slate-400 uppercase">
                Intelligent Infrastructure
              </p>
            </div>
          </div>
        </div>

        {/* Industrial Horizontal Module Selector */}
        <div className="p-3 border-b border-slate-800/70 bg-[#070e20]/60">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase text-slate-400 mb-1.5">
            <span className="flex items-center gap-1">
              <Layers className="w-3 h-3 text-cyan-400" />
              <span>Domain Extension</span>
            </span>
            <span className="text-cyan-400 font-bold">MSS v2.4</span>
          </div>

          <div className="grid grid-cols-4 gap-1 bg-slate-950/80 p-1 rounded border border-slate-800 text-[10px] font-mono">
            <button
              onClick={() => setActiveModule('ALL')}
              className={`py-1 rounded text-center transition-colors ${
                activeModule === 'ALL'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="All Infrastructure"
            >
              ALL
            </button>
            <button
              onClick={() => setActiveModule('EV')}
              className={`py-1 rounded text-center transition-colors flex items-center justify-center gap-0.5 ${
                activeModule === 'EV'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="EV Fleet & Charging"
            >
              <Car className="w-3 h-3 inline" />
              <span>EV</span>
            </button>
            <button
              onClick={() => setActiveModule('BESS')}
              className={`py-1 rounded text-center transition-colors flex items-center justify-center gap-0.5 ${
                activeModule === 'BESS'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Battery Storage & Solar"
            >
              <BatteryCharging className="w-3 h-3 inline" />
              <span>ESS</span>
            </button>
            <button
              onClick={() => setActiveModule('MFG')}
              className={`py-1 rounded text-center transition-colors flex items-center justify-center gap-0.5 ${
                activeModule === 'MFG'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Manufacturing & Plants"
            >
              <Factory className="w-3 h-3 inline" />
              <span>PLT</span>
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-270px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-md text-xs font-mono transition-all duration-150 group ${
                  isActive
                    ? 'bg-cyan-950/60 text-cyan-300 font-semibold border border-cyan-800/60 shadow-[inset_0_1px_0_rgba(6,182,212,0.2)]'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? 'text-cyan-400'
                        : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-900/70 text-cyan-300 border border-cyan-700/60 font-mono">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Backend & Hardware Gateway status footer */}
      <div className="p-3 border-t border-slate-800/90 bg-[#020617] text-xs font-mono">
        <div className="p-2.5 rounded bg-slate-950/90 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase text-slate-500 flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>FastAPI Link</span>
            </span>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                healthStatus?.status === 'ok'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : 'bg-amber-950 text-amber-400 border border-amber-800'
              }`}
            >
              {healthStatus?.status === 'ok' ? 'ONLINE' : 'CONNECTING'}
            </span>
          </div>

          <div className="text-[10px] text-slate-400 truncate flex items-center justify-between">
            <span className="text-slate-500">Latency:</span>
            <span className="text-slate-300 font-bold">
              {healthStatus?.latency_ms ?? 142} ms
            </span>
          </div>

          <div className="text-[9px] text-slate-500 truncate border-t border-slate-900 pt-1">
            Endpoint: mss-api.onrender.com
          </div>
        </div>
      </div>
    </aside>
  );
};
