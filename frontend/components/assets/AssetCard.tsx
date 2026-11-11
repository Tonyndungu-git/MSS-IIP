'use client';

import React from 'react';
import Link from 'next/link';
import { Asset } from '@/types';
import { StatusBadge } from '@/components/common/StatusBadge';
import { HealthIndicator } from '@/components/common/HealthIndicator';
import { Cpu, ChevronRight, Zap, Hash, Building2 } from 'lucide-react';

interface AssetCardProps {
  asset: Asset;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset }) => {
  return (
    <div className="bg-[#070e1e]/90 rounded-lg border border-slate-800 p-5 hover:border-cyan-500/40 transition-all duration-200 flex flex-col justify-between group shadow-lg hover:shadow-cyan-950/20">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-slate-900 border border-slate-800 text-cyan-400 group-hover:text-cyan-300 transition-colors">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                {asset.asset_type || 'EQUIPMENT'}
              </span>
              <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                {asset.name}
              </h3>
            </div>
          </div>
          <StatusBadge status={asset.status} size="sm" />
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-900/60 rounded p-2.5 border border-slate-800/80 mb-4">
          <div>
            <span className="text-[10px] text-slate-500 block uppercase">Manufacturer</span>
            <span className="text-slate-300 truncate block font-medium">
              {asset.manufacturer || 'OEM Standard'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block uppercase">Model</span>
            <span className="text-slate-300 truncate block font-medium">
              {asset.model || 'Standard Unit'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block uppercase">Serial No.</span>
            <span className="text-cyan-400/90 truncate block flex items-center gap-1">
              <Hash className="w-3 h-3 text-slate-500 inline" />
              {asset.serial_number || 'N/A'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block uppercase">Protocol</span>
            <span className="text-slate-400 truncate block">Modbus TCP / MQTT</span>
          </div>
        </div>

        {/* Health Indicator & Telemetry quick state */}
        <div className="flex items-center justify-between py-2 border-t border-slate-800/60">
          <HealthIndicator score={asset.health_score ?? 95} size="compact" />
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <Zap className="w-3 h-3 text-cyan-400" />
            <span>Telemetry Online</span>
          </div>
        </div>
      </div>

      {/* Action footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-[10px] font-mono text-slate-500 truncate max-w-[140px]">
          ID: {asset.id.slice(0, 8)}...
        </span>
        <Link
          href={`/assets/${asset.id}`}
          className="inline-flex items-center gap-1 text-xs font-mono font-medium text-cyan-400 hover:text-cyan-300 transition-colors group-hover:translate-x-0.5"
        >
          <span>Telemetry & Specs</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
