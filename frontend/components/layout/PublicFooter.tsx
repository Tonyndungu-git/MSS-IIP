'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, ShieldCheck, Terminal, Globe, ArrowUpRight } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="bg-[#01040f] border-t border-slate-800/80 text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Col 1: Brand & Thesis */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-slate-950 font-bold">
                <Zap className="w-4 h-4 text-slate-950" />
              </div>
              <span className="text-sm font-bold tracking-wider text-white">
                M SYNAPSES SYSTEMS
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-sm">
              The horizontal intelligent infrastructure platform designed for multi-industry physical assets, sub-second telemetry ingestion, and autonomous industrial AI agents.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>FastAPI Telemetry Core: Operational</span>
            </div>
          </div>

          {/* Col 2: Platform Modules */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/dashboard" className="hover:text-cyan-400 transition-colors">
                  Operations Center
                </Link>
              </li>
              <li>
                <Link href="/assets" className="hover:text-cyan-400 transition-colors">
                  Equipment Registry
                </Link>
              </li>
              <li>
                <Link href="/telemetry" className="hover:text-cyan-400 transition-colors">
                  Telemetry Ingestion
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-cyan-400 transition-colors">
                  Predictive Analytics
                </Link>
              </li>
              <li>
                <Link href="/ai" className="hover:text-cyan-400 transition-colors">
                  Autonomous AI Agents
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Supported Domains */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Horizontal Domains
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>Power &amp; Energy Storage</li>
              <li>Industrial Manufacturing</li>
              <li>Water &amp; Municipal Utilities</li>
              <li>Telecommunications Towers</li>
              <li>Mining &amp; Heavy Extraction</li>
              <li>EV Fleet &amp; Depot Infra</li>
            </ul>
          </div>

          {/* Col 4: Protocols & Gateway */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Edge Protocols
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Modbus TCP / RTU
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                MQTT 5.0 (TLS 1.3)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                OPC-UA Binary
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                CAN Bus 2.0B / CANopen
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                IEEE 2030.5 / DNP3
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} M Synapses Systems (MSS). Intelligent Infrastructure Platform (IIP). All enterprise rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Security Whitepaper</span>
            <span className="hover:text-slate-300 cursor-pointer">ISO 55001 Compliance</span>
            <span className="hover:text-slate-300 cursor-pointer">Privacy &amp; Telemetry Data Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
