'use client';

import React, { useState } from 'react';
import { TelemetryPacket } from '@/types';
import { Activity, Flame, Zap, Gauge, Radio, ShieldCheck } from 'lucide-react';

interface TelemetryChartProps {
  data: TelemetryPacket[];
  title?: string;
  defaultMetric?: 'soc' | 'temperature' | 'voltage' | 'power' | 'current';
  height?: number;
  showSelector?: boolean;
}

export const TelemetryChart: React.FC<TelemetryChartProps> = ({
  data,
  title = 'Live Telemetry Waveform',
  defaultMetric = 'soc',
  height = 240,
  showSelector = true,
}) => {
  const [selectedMetric, setSelectedMetric] = useState<
    'soc' | 'temperature' | 'voltage' | 'power' | 'current'
  >(defaultMetric);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const metricConfig = {
    soc: {
      label: 'State of Charge (SoC)',
      unit: '%',
      color: '#06b6d4', // cyan
      secondaryColor: 'rgba(6, 182, 212, 0.15)',
      icon: Gauge,
    },
    temperature: {
      label: 'Thermal Core Temp',
      unit: '°C',
      color: '#f97316', // orange
      secondaryColor: 'rgba(249, 115, 22, 0.15)',
      icon: Flame,
    },
    voltage: {
      label: 'Bus DC Voltage',
      unit: 'V',
      color: '#10b981', // emerald
      secondaryColor: 'rgba(16, 185, 129, 0.15)',
      icon: Zap,
    },
    current: {
      label: 'Pack Current',
      unit: 'A',
      color: '#a855f7', // purple
      secondaryColor: 'rgba(168, 85, 247, 0.15)',
      icon: Activity,
    },
    power: {
      label: 'Instantaneous Power',
      unit: 'kW',
      color: '#3b82f6', // blue
      secondaryColor: 'rgba(59, 130, 246, 0.15)',
      icon: Zap,
    },
  };

  const currentConfig = metricConfig[selectedMetric];
  const Icon = currentConfig.icon;

  if (!data || data.length === 0) {
    return (
      <div
        className="w-full bg-[#070e1e]/90 rounded-xl border border-slate-800 p-8 flex flex-col items-center justify-center text-center font-mono"
        style={{ minHeight: height }}
      >
        <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-3 text-cyan-400 shadow-inner">
          <Radio className="w-6 h-6 animate-pulse" />
        </div>
        <p className="text-sm font-semibold text-slate-300 mb-1">
          Telemetry Stream Idle
        </p>
        <p className="text-xs text-slate-500 max-w-sm mb-4">
          No active telemetry packets currently received from edge gateways. The waveform visualizer will render automatically upon payload transmission.
        </p>
        <div className="flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>Polling /telemetry/latest endpoint</span>
        </div>
      </div>
    );
  }

  // Extract values
  const values = data.map((d) => Number(d[selectedMetric] ?? 0));
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const padding = (rawMax - rawMin) * 0.15 || 2;
  const minY = Math.floor(rawMin - padding);
  const maxY = Math.ceil(rawMax + padding);
  const avg = Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;
  const currentVal = values[values.length - 1];

  // SVG dimensions
  const svgWidth = 800;
  const svgHeight = height;
  const padLeft = 55;
  const padRight = 20;
  const padTop = 20;
  const padBottom = 30;

  const chartWidth = svgWidth - padLeft - padRight;
  const chartHeight = svgHeight - padTop - padBottom;

  const points = data.map((d, i) => {
    const val = Number(d[selectedMetric] ?? 0);
    const x = padLeft + (i / Math.max(1, data.length - 1)) * chartWidth;
    const y =
      padTop + chartHeight - ((val - minY) / Math.max(1, maxY - minY)) * chartHeight;
    return { x, y, val, timestamp: d.timestamp };
  });

  const pathD = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x},${
    padTop + chartHeight
  } L ${points[0].x},${padTop + chartHeight} Z`;

  const hoveredPoint = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <div className="w-full bg-[#070e1e]/90 rounded-xl border border-slate-800 p-4 shadow-xl">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-slate-900 border border-slate-800 text-cyan-400">
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide">
              {title}
            </h4>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mt-0.5">
              <span>
                Current:{' '}
                <strong className="text-white">
                  {currentVal} {currentConfig.unit}
                </strong>
              </span>
              <span>•</span>
              <span>
                Avg: <strong className="text-slate-300">{avg} {currentConfig.unit}</strong>
              </span>
              <span>•</span>
              <span>
                Range: [{minY} - {maxY}]
              </span>
            </div>
          </div>
        </div>

        {showSelector && (
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded border border-slate-800 text-xs font-mono">
            {(Object.keys(metricConfig) as Array<keyof typeof metricConfig>).map(
              (key) => (
                <button
                  key={key}
                  onClick={() => setSelectedMetric(key)}
                  className={`px-2.5 py-1 rounded transition-colors text-[11px] uppercase ${
                    selectedMetric === key
                      ? 'bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {key}
                </button>
              )
            )}
          </div>
        )}
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto overflow-visible"
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id={`grad-${selectedMetric}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={currentConfig.color} stopOpacity="0.35" />
              <stop offset="100%" stopColor={currentConfig.color} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const y = padTop + chartHeight * (1 - pct);
            const valLabel = Math.round(minY + pct * (maxY - minY));
            return (
              <g key={idx}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={svgWidth - padRight}
                  y2={y}
                  stroke="#1e293b"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text
                  x={padLeft - 8}
                  y={y + 3}
                  textAnchor="end"
                  fill="#64748b"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {valLabel}
                </text>
              </g>
            );
          })}

          {/* Area fill */}
          <path d={areaD} fill={`url(#grad-${selectedMetric})`} />

          {/* Sparkline curve */}
          <path
            d={pathD}
            fill="none"
            stroke={currentConfig.color}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Hover crosshair and data points */}
          {points.map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r={hoverIndex === i ? 5 : 2}
              fill={hoverIndex === i ? '#ffffff' : currentConfig.color}
              stroke="#070e1e"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-100"
              onMouseEnter={() => setHoverIndex(i)}
            />
          ))}

          {hoveredPoint && (
            <g>
              <line
                x1={hoveredPoint.x}
                y1={padTop}
                x2={hoveredPoint.x}
                y2={padTop + chartHeight}
                stroke="#38bdf8"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
            </g>
          )}
        </svg>

        {/* Floating Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute top-2 pointer-events-none bg-slate-900/95 border border-cyan-500/40 px-3 py-1.5 rounded shadow-2xl text-xs font-mono z-10"
            style={{
              left: `${(hoveredPoint.x / svgWidth) * 100}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="text-cyan-300 font-bold">
              {hoveredPoint.val} {currentConfig.unit}
            </div>
            <div className="text-[10px] text-slate-400">
              {new Date(hoveredPoint.timestamp).toLocaleTimeString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
