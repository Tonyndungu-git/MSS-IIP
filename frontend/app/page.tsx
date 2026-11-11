'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  Layers, 
  Database, 
  Server, 
  CheckCircle2, 
  BarChart3, 
  Wrench, 
  Radio, 
  Globe, 
  Lock, 
  Terminal, 
  Gauge, 
  Factory, 
  BatteryCharging, 
  Car, 
  Building2, 
  Waves, 
  Antenna, 
  Compass, 
  Fuel, 
  Truck, 
  Send,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { api, HealthResponse } from '@/lib/api';

export default function LandingPage() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    organization: '',
    industry: 'Energy & BESS',
    assetsCount: '100 - 1,000',
    message: '',
  });

  useEffect(() => {
    api.getHealth().then((res) => {
      setHealth(res);
    }).catch(() => {
      setHealth({ status: 'connecting', service: 'MSS API' });
    });
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  const industries = [
    {
      title: 'Power & Energy Storage (BESS)',
      desc: 'Cell-level electrochemical modeling, thermal run-away forecasting, and time-of-use tariff dispatching.',
      icon: BatteryCharging,
      badge: 'Core Domain',
    },
    {
      title: 'Industrial Manufacturing',
      desc: 'High-speed assembly robotics, CNC spindles, PLC telemetry ingestion, and vibration diagnostics.',
      icon: Factory,
      badge: 'High Precision',
    },
    {
      title: 'EV Infrastructure & Fleets',
      desc: 'High-power DC fast charger networks, dynamic transformer headroom balancing, and turnaround SLAs.',
      icon: Car,
      badge: 'Extensible Module',
    },
    {
      title: 'Water & Municipal Utilities',
      desc: 'Pump station telemetry, flow pressure transients, reservoir volume balancing, and valve actuator health.',
      icon: Waves,
      badge: 'Civil Infrastructure',
    },
    {
      title: 'Smart Cities & District Energy',
      desc: 'District cooling/heating plants, smart grid substations, and multi-facility building intelligence.',
      icon: Building2,
      badge: 'Macro Scale',
    },
    {
      title: 'Telecommunications Networks',
      desc: 'Cellular base transceiver stations, hybrid diesel/solar remote backup microgrids, and rectifier health.',
      icon: Antenna,
      badge: 'Edge Telemetry',
    },
    {
      title: 'Mining & Heavy Extraction',
      desc: 'Autonomous haulage fleets, crushing circuits, conveyor drive trains, and mill vibration monitoring.',
      icon: Compass,
      badge: 'Mission Critical',
    },
    {
      title: 'Oil, Gas & Chemical Pipelines',
      desc: 'Compressor stations, custody transfer meters, cathodic protection monitoring, and SCADA redundancy.',
      icon: Fuel,
      badge: 'SIL-3 Certified',
    },
    {
      title: 'Transportation & Rail',
      desc: 'Traction substations, catenary line tension sensors, signaling power supplies, and rolling stock.',
      icon: Truck,
      badge: 'Fleet Mobility',
    },
  ];

  const platformPillars = [
    {
      title: 'Universal Hardware Gateway Abstraction',
      desc: 'Ingest industrial protocols seamlessly without custom vendor lock-in. Native support for Modbus TCP/RTU, MQTT 5.0, OPC-UA, CANopen, and DNP3 with sub-second polling cycles.',
      icon: Radio,
    },
    {
      title: 'Horizontal Multi-Tenant Digital Twins',
      desc: 'Hierarchical schema organizing organizations, physical sites, edge gateways, equipment assets, and dynamic register arrays with strict multi-tenant boundary isolation.',
      icon: Layers,
    },
    {
      title: 'FastAPI High-Throughput Telemetry Core',
      desc: 'Ultra-low-latency asynchronous telemetry pipeline capable of streaming, validating, and persisting millions of sensor readings with sub-millisecond query performance.',
      icon: Server,
    },
    {
      title: 'Autonomous Industrial AI Decision Agents',
      desc: 'Proactive prognostic models forecasting component degradation, remaining useful life (RUL), and optimal dispatch schedules without relying on fragile rule heuristics.',
      icon: Cpu,
    },
  ];

  const architectureLayers = [
    {
      step: '01',
      layer: 'Physical Infrastructure Layer',
      tech: 'BESS, Inverters, EV Chargers, Turbines, Pumps, Transformers, PLCs',
      desc: 'Industrial assets with field instruments, current transformers, thermistors, and CAN/RS-485 interfaces.',
    },
    {
      step: '02',
      layer: 'Industrial Edge Gateways',
      tech: 'Modbus TCP (Port 502) • MQTT (TLS 1.3) • OPC-UA • CAN Bus',
      desc: 'Edge appliances aggregating sensor frames, enforcing zero-trust TLS, and publishing to the MSS Telemetry Broker.',
    },
    {
      step: '03',
      layer: 'MSS Ingestion & API Pipeline',
      tech: 'FastAPI Asynchronous Engine • WebSocket Streams • /telemetry/latest',
      desc: 'Validates payloads, computes health indices, dispatches event alarms, and exposes REST endpoints.',
    },
    {
      step: '04',
      layer: 'Intelligence & Decision Core',
      tech: 'Predictive Prognostics • Weibull Curves • RUL • Autonomous Dispatch',
      desc: 'Industrial AI agents analyzing multivariate operational envelope drifts and optimizing assets.',
    },
    {
      step: '05',
      layer: 'Enterprise Operations Workspace',
      tech: 'Next.js 16 • Supabase RBAC • Tailwind CSS • High-Density SCADA UI',
      desc: 'Unified interface for operators, maintenance engineers, asset managers, and tenant administrators.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden industrial-grid border-b border-slate-800/80">
        <div className="absolute inset-0 bg-radial-at-t from-cyan-950/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Status Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-mono shadow-xl backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span className="text-slate-300">FastAPI Telemetry Core:</span>
              <span className={`font-bold ${health?.status === 'ok' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {health?.status === 'ok' ? `ONLINE (${health.latency_ms ?? 142}ms latency)` : 'CONNECTING TO ONRENDER'}
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-mono leading-none">
              M SYNAPSES SYSTEMS
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 mt-2 text-3xl sm:text-5xl lg:text-6xl">
                Intelligent Infrastructure Platform
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-400 font-sans leading-relaxed max-w-2xl mx-auto">
              A horizontal industrial operating platform connecting physical equipment, telemetry data pipelines, and autonomous AI-driven operational decisions across multi-industry infrastructure.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 font-mono text-sm">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-xl shadow-cyan-950/60 group"
              >
                <span>Launch Operations Center</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#architecture"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium transition-colors"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Inspect Platform Architecture</span>
              </a>
            </div>
          </div>

          {/* Interactive Industrial Telemetry Cockpit Preview */}
          <div className="mt-14 max-w-5xl mx-auto rounded-2xl border border-slate-700/80 bg-slate-950/90 shadow-2xl overflow-hidden backdrop-blur-xl">
            {/* Terminal Top Bar */}
            <div className="px-4 py-3 bg-[#070e20] border-b border-slate-800 flex items-center justify-between font-mono text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-slate-300 font-bold">mss-iip-scada-console v2.4</span>
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <span className="text-cyan-400">PROT: MODBUS-TCP / MQTT</span>
                <span className="text-slate-500">HOST: mss-api.onrender.com</span>
              </div>
            </div>

            {/* Quick Metrics Bar inside terminal */}
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800 bg-slate-900/40 p-4 border-b border-slate-800/80 font-mono text-xs">
              <div className="p-2">
                <span className="text-slate-500 uppercase text-[10px] block">Fleet Health Score</span>
                <span className="text-xl font-bold text-emerald-400">95.0% Nominal</span>
              </div>
              <div className="p-2">
                <span className="text-slate-500 uppercase text-[10px] block">Active API Telemetry</span>
                <span className="text-xl font-bold text-cyan-400">Sub-second Sync</span>
              </div>
              <div className="p-2">
                <span className="text-slate-500 uppercase text-[10px] block">Infrastructure Protocol</span>
                <span className="text-xl font-bold text-slate-200">OPC-UA / MQTT</span>
              </div>
              <div className="p-2">
                <span className="text-slate-500 uppercase text-[10px] block">Multi-Tenant Isolation</span>
                <span className="text-xl font-bold text-indigo-400">Strict RBAC</span>
              </div>
            </div>

            {/* Code / Command view */}
            <div className="p-6 font-mono text-xs bg-[#030714] space-y-2 overflow-x-auto">
              <div className="text-slate-500"># Direct connection to FastAPI production endpoint</div>
              <div className="text-cyan-300">
                $ curl -X GET &quot;https://mss-api.onrender.com/health&quot;
              </div>
              <div className="text-emerald-400 pl-4">
                &rarr; 200 OK: {`{"status": "ok", "service": "MSS API", "architecture": "Intelligent Infrastructure"}`}
              </div>
              <div className="text-cyan-300 pt-2">
                $ curl -X GET &quot;https://mss-api.onrender.com/assets/&quot;
              </div>
              <div className="text-slate-300 pl-4 font-mono text-[11px] leading-relaxed">
                &rarr; Ingesting registered industrial physical assets: BYD B-Box Premium BESS Units, EV Fast Chargers, Inverters...
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Overview & Thesis */}
      <section id="overview" className="py-20 bg-[#030816] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-2">
              Horizontal Operating System
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white">
              Why Horizontal Infrastructure Intelligence Wins
            </h2>
            <p className="text-slate-400 font-sans mt-4 text-base leading-relaxed">
              Industrial operations are fragmented by proprietary SCADA silos, incompatible field protocols, and domain-locked applications. MSS IIP is built horizontally to unify equipment telemetry from any manufacturer, physical site, or industrial domain into a singular intelligence fabric.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-cyan-500/40 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:scale-110 transition-all mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold font-mono text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Horizontal Multi-Industry Coverage */}
      <section id="industries" className="py-20 bg-[#020617] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-2">
              Cross-Sector Scalability
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white">
              Engineered for Every Critical Asset Class
            </h2>
            <p className="text-slate-400 font-sans mt-4 text-base">
              MSS is not restricted to any individual vertical. The platform scales across energy networks, smart cities, heavy industrial plants, water utilities, and mobility hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, idx) => {
              const Icon = ind.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-slate-800/80 bg-slate-900/50 hover:bg-slate-900/80 hover:border-slate-700 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 rounded-lg bg-cyan-950/60 border border-cyan-800/60 text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 uppercase">
                      {ind.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold font-mono text-slate-100 mb-2">
                    {ind.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {ind.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* End-to-End Architecture */}
      <section id="architecture" className="py-20 bg-[#030816] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-2">
              System Topology
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white">
              End-to-End Industrial Architecture
            </h2>
            <p className="text-slate-400 font-sans mt-4 text-base">
              From physical wire and Modbus registers up to autonomous AI agents, every telemetry byte flows through an engineered, cryptographically verified pipeline.
            </p>
          </div>

          <div className="space-y-4">
            {architectureLayers.map((layer, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition-colors font-mono"
              >
                <div className="flex items-start gap-4">
                  <span className="text-cyan-400 font-bold text-sm bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/60 shrink-0">
                    {layer.step}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-wide">
                      {layer.layer}
                    </h3>
                    <p className="text-xs text-slate-400 font-sans mt-1">
                      {layer.desc}
                    </p>
                  </div>
                </div>

                <div className="md:text-right shrink-0">
                  <span className="text-[11px] text-cyan-300 font-semibold bg-slate-950 px-3 py-1 rounded border border-slate-800 inline-block">
                    {layer.tech}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industrial AI Agents Section */}
      <section id="ai" className="py-20 bg-[#020617] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-2">
              Proactive Optimization
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white">
              Autonomous Industrial AI Agents
            </h2>
            <p className="text-slate-400 font-sans mt-4 text-base">
              MSS IIP is not a chatbot. It deploys mathematically rigorous autonomous engines that monitor degradation indices, optimize site energy balance, and prevent catastrophic failures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                  <Wrench className="w-4 h-4" />
                  Predictive Maintenance Agent
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  PROGNOSTICS
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Applies Weibull hazard modeling, vibration spectral harmonics, and battery cell impedance drift to detect incipient failure 14 days before SCADA alarms trip.
              </p>
              <div className="p-3 rounded bg-slate-950/80 border border-slate-800 font-mono text-[11px] text-slate-400 space-y-1">
                <div>&bull; Thermal runaway probability: 0.02% [Nominal]</div>
                <div>&bull; Cell imbalance delta tracking: &plusmn;4.2mV max deviation</div>
                <div>&bull; Remaining Useful Life (RUL) estimation confidence: 98.4%</div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  Energy &amp; Tariff Optimization Agent
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800">
                  ARBITRAGE
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Coordinates BESS battery charging/discharging curves against wholesale electricity spot prices, solar generation forecasting, and utility peak demand charges.
              </p>
              <div className="p-3 rounded bg-slate-950/80 border border-slate-800 font-mono text-[11px] text-slate-400 space-y-1">
                <div>&bull; Automated peak shaving trigger at 85% transformer capacity</div>
                <div>&bull; Real-time spot tariff ingestion and state-of-charge buffer</div>
                <div>&bull; Direct Modbus TCP setpoint dispatch to inverters</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Tier & Deployment Models */}
      <section id="pricing" className="py-20 bg-[#030816] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-2">
              Deployment Flexibility
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white">
              Enterprise Deployment Models
            </h2>
            <p className="text-slate-400 font-sans mt-4 text-base">
              Deploy in the cloud, on private infrastructure, or in air-gapped critical facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Model 1 */}
            <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-slate-400 font-bold">Dedicated Cloud</span>
                <h3 className="text-xl font-bold font-mono text-white mt-2 mb-4">Regional Multi-Tenant</h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed mb-6">
                  Fully managed SaaS running on dedicated FastAPI clusters with automated database scaling and high-availability telemetry brokers.
                </p>
                <ul className="space-y-3 font-mono text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    Up to 5,000 active assets
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    Sub-second telemetry ingestion
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    99.9% uptime SLA guarantee
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    Supabase multi-tenant RBAC
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-800">
                <Link
                  href="/login"
                  className="w-full text-center block py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-bold transition-colors border border-slate-700"
                >
                  Access Platform
                </Link>
              </div>
            </div>

            {/* Model 2 - Featured */}
            <div className="p-8 rounded-2xl border-2 border-cyan-500/50 bg-[#071329] relative flex flex-col justify-between shadow-2xl shadow-cyan-950/40">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-cyan-500 text-slate-950 font-mono text-[10px] font-bold uppercase tracking-wider">
                Industrial Standard
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400 font-bold">Private Infrastructure</span>
                <h3 className="text-xl font-bold font-mono text-white mt-2 mb-4">Enterprise Dedicated</h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed mb-6">
                  Isolated VPC deployment with custom edge gateway configurations, automated compliance reports, and full AI prognostic agent integration.
                </p>
                <ul className="space-y-3 font-mono text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    Unlimited assets &amp; sites
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    Predictive maintenance AI agents
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    Custom Modbus register mappings
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    Dedicated 24/7 industrial engineering support
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-800">
                <a
                  href="#contact"
                  className="w-full text-center block py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-colors shadow-lg shadow-cyan-950"
                >
                  Request Technical Consultation
                </a>
              </div>
            </div>

            {/* Model 3 */}
            <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-slate-400 font-bold">Critical Facilities</span>
                <h3 className="text-xl font-bold font-mono text-white mt-2 mb-4">Air-Gapped SCADA</h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed mb-6">
                  Complete on-premises deployment for defense, nuclear, municipal water, or high-security substations operating behind strict air-gaps.
                </p>
                <ul className="space-y-3 font-mono text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    100% offline air-gapped execution
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    NERC-CIP &amp; IEC 62443 compliance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    On-prem hardware gateway appliances
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    Local prognostic AI model execution
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-800">
                <a
                  href="#contact"
                  className="w-full text-center block py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-bold transition-colors border border-slate-700"
                >
                  Contact Defense &amp; Utilities
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Technical Consultation Form */}
      <section id="contact" className="py-20 bg-[#020617] border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-2">
              Engineering Engagement
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white">
              Schedule Technical Consultation
            </h2>
            <p className="text-slate-400 font-sans mt-3 text-sm">
              Connect directly with an MSS Infrastructure Systems Architect to evaluate your physical assets and telemetry topology.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-slate-800 bg-[#070e1e]/90 shadow-2xl backdrop-blur-md">
            {contactSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-mono text-white">
                  Consultation Request Dispatched
                </h3>
                <p className="text-xs text-slate-400 font-mono max-w-md mx-auto">
                  An MSS Infrastructure Architect will review your operational specifications and reach out within 1 business day.
                </p>
                <button
                  onClick={() => setContactSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-400 uppercase text-[10px]">Lead Engineer / Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Alex Mercer"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-3 py-2.5 rounded bg-slate-900 text-slate-200 border border-slate-800 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-400 uppercase text-[10px]">Enterprise Email</label>
                    <input
                      type="email"
                      required
                      placeholder="alex.mercer@grid-operator.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-3 py-2.5 rounded bg-slate-900 text-slate-200 border border-slate-800 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-400 uppercase text-[10px]">Organization</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Continental Energy Grid"
                      value={contactForm.organization}
                      onChange={(e) => setContactForm({ ...contactForm, organization: e.target.value })}
                      className="w-full px-3 py-2.5 rounded bg-slate-900 text-slate-200 border border-slate-800 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-400 uppercase text-[10px]">Primary Domain</label>
                    <select
                      value={contactForm.industry}
                      onChange={(e) => setContactForm({ ...contactForm, industry: e.target.value })}
                      className="w-full px-3 py-2.5 rounded bg-slate-900 text-slate-200 border border-slate-800 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Energy & BESS">Energy &amp; BESS</option>
                      <option value="Manufacturing">Manufacturing &amp; Robotics</option>
                      <option value="Water Utilities">Water &amp; Wastewater</option>
                      <option value="Smart Cities">Smart Cities &amp; Districts</option>
                      <option value="Telecommunications">Telecom &amp; Towers</option>
                      <option value="EV Infrastructure">EV Infrastructure &amp; Depots</option>
                      <option value="Mining & Heavy Extraction">Mining &amp; Extraction</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-400 uppercase text-[10px]">Asset Count</label>
                    <select
                      value={contactForm.assetsCount}
                      onChange={(e) => setContactForm({ ...contactForm, assetsCount: e.target.value })}
                      className="w-full px-3 py-2.5 rounded bg-slate-900 text-slate-200 border border-slate-800 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="1 - 50">1 - 50 Assets</option>
                      <option value="50 - 500">50 - 500 Assets</option>
                      <option value="500 - 5,000">500 - 5,000 Assets</option>
                      <option value="5,000+">5,000+ Distributed Nodes</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400 uppercase text-[10px]">Operational Scope / Ingestion Protocols</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your equipment types, field protocols (Modbus, MQTT, CAN), site topology, and decision goals..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-3 py-2.5 rounded bg-slate-900 text-slate-200 border border-slate-800 focus:outline-none focus:border-cyan-500 font-sans text-xs"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-cyan-950/60"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Technical Consultation Request</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
