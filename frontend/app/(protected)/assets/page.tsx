'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useAssets } from '@/hooks/useAssets';
import { useOrganizations } from '@/hooks/useOrganizations';
import { Asset, Site } from '@/types';
import { DataTable, Column } from '@/components/common/DataTable';
import { AssetCard } from '@/components/assets/AssetCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { HealthIndicator } from '@/components/common/HealthIndicator';
import { CreateAssetModal } from '@/components/assets/CreateAssetModal';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { PageHeader } from '@/components/common/PageHeader';
import {
  Cpu,
  Plus,
  LayoutGrid,
  List,
  Filter,
  RefreshCw,
  ChevronRight,
  HardDrive
} from 'lucide-react';

export default function AssetsPage() {
  const { assets, loading, error, refetch } = useAssets();
  const { organizations } = useOrganizations();
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Filters
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const handleManualRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const sites: Site[] = [
    {
      id: 'a1b2c3d4-0001-4000-8000-000000000001',
      name: 'Nairobi Central Fleet Hub',
      latitude: -1.286389,
      longitude: 36.817223,
      location: 'Nairobi Industrial Area, Kenya',
      organization_id: organizations[0]?.id || '6909a8f6-5055-45d1-bae2-8562c4153167',
    },
    {
      id: 'a1b2c3d4-0002-4000-8000-000000000002',
      name: 'Mombasa Port Logistics Microgrid',
      latitude: -4.043477,
      longitude: 39.668206,
      location: 'Kilindini Harbour, Mombasa, Kenya',
      organization_id: organizations[1]?.id || '204272e5-8409-4cf1-9430-1f8d67263583',
    },
  ];

  // Filtered Assets
  const filteredAssets = assets.filter((asset) => {
    const matchesType = typeFilter === 'ALL' || asset.asset_type === typeFilter;
    const matchesStatus =
      statusFilter === 'ALL' ||
      (asset.status || '').toUpperCase() === statusFilter.toUpperCase();
    return matchesType && matchesStatus;
  });

  const uniqueTypes = Array.from(
    new Set(assets.map((a) => a.asset_type).filter(Boolean))
  );

  // Table columns definition
  const columns: Column<Asset>[] = [
    {
      key: 'name',
      header: 'Asset Name & ID',
      sortable: true,
      render: (asset) => (
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded bg-slate-900 border border-slate-800 text-cyan-400">
            <Cpu className="w-3.5 h-3.5" />
          </div>
          <div>
            <Link
              href={`/assets/${asset.id}`}
              className="font-bold text-white hover:text-cyan-300 font-mono transition-colors block text-xs"
            >
              {asset.name}
            </Link>
            <span className="text-[10px] font-mono text-slate-500 block">
              UUID: {asset.id.slice(0, 13)}...
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'asset_type',
      header: 'Asset Type',
      sortable: true,
      render: (asset) => (
        <span className="font-mono text-xs text-slate-300 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
          {asset.asset_type}
        </span>
      ),
    },
    {
      key: 'manufacturer',
      header: 'Manufacturer',
      sortable: true,
      render: (asset) => (
        <span className="text-slate-300 font-mono text-xs">{asset.manufacturer || 'OEM Standard'}</span>
      ),
    },
    {
      key: 'model',
      header: 'Model',
      sortable: true,
      render: (asset) => (
        <span className="text-slate-400 font-mono text-xs">{asset.model || 'Standard Unit'}</span>
      ),
    },
    {
      key: 'serial_number',
      header: 'Serial No.',
      sortable: true,
      render: (asset) => (
        <span className="text-cyan-400/90 font-mono text-xs">{asset.serial_number}</span>
      ),
    },
    {
      key: 'status',
      header: 'Operational Status',
      sortable: true,
      render: (asset) => <StatusBadge status={asset.status} size="sm" />,
    },
    {
      key: 'health_score',
      header: 'Health Score',
      sortable: true,
      render: (asset) => (
        <HealthIndicator score={asset.health_score ?? 95} size="compact" />
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (asset) => (
        <div className="flex items-center justify-end">
          <Link
            href={`/assets/${asset.id}`}
            className="p-1 rounded bg-slate-900 hover:bg-cyan-950 text-cyan-400 border border-slate-800 text-xs transition-colors"
            title="Inspect Asset"
          >
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="EQUIPMENT ASSET REGISTRY"
          subtitle="Physical infrastructure registry synchronized directly with FastAPI /assets/ endpoint"
          badge={
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold uppercase">
              {assets.length} Ingested
            </span>
          }
          actions={
            <div className="flex items-center gap-2">
              <button
                onClick={handleManualRefresh}
                disabled={refreshing}
                className="p-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Refresh from FastAPI"
              >
                <RefreshCw
                  className={`w-4 h-4 ${refreshing ? 'animate-spin text-cyan-400' : ''}`}
                />
              </button>

              <div className="flex items-center bg-slate-900 p-1 rounded border border-slate-800">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'table'
                      ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Table View"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'cards'
                      ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Cards View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold transition-all shadow-lg shadow-cyan-950/40"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Register Asset</span>
              </button>
            </div>
          }
        />

        {error && (
          <ErrorState
            title="Unable to load asset registry"
            message={error}
            endpoint="GET /assets/"
            onRetry={handleManualRefresh}
          />
        )}

        {/* Filter Toolbar */}
        <div className="bg-[#070e1e]/90 p-4 rounded-lg border border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              <span>Filter Type:</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-slate-900 text-slate-200 border border-slate-800 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-cyan-500"
              >
                <option value="ALL">All Asset Types</option>
                {uniqueTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-slate-400">
              <span>Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-900 text-slate-200 border border-slate-800 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-cyan-500"
              >
                <option value="ALL">All Statuses</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="REGISTERED">REGISTERED</option>
                <option value="WARNING">WARNING</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>
          </div>

          <div className="text-slate-500 text-[11px]">
            Filtered: <strong className="text-white">{filteredAssets.length}</strong> of{' '}
            {assets.length} total units
          </div>
        </div>

        {/* Content View */}
        {loading ? (
          <LoadingState label="Ingesting equipment registry from FastAPI..." />
        ) : assets.length === 0 ? (
          <EmptyState
            icon="database"
            title="No Infrastructure Assets Found"
            description="The asset registry is currently empty on the backend. Click below to register your first industrial asset."
            actionText="Register Asset"
            onAction={() => setIsModalOpen(true)}
            backendEndpointHint="GET /assets/"
          />
        ) : filteredAssets.length === 0 ? (
          <EmptyState
            icon="alert"
            title="No Matching Equipment"
            description="No assets match the current filter parameters. Try clearing the asset type or status filter."
            actionText="Clear Filters"
            onAction={() => {
              setTypeFilter('ALL');
              setStatusFilter('ALL');
            }}
          />
        ) : viewMode === 'table' ? (
          <DataTable
            columns={columns}
            data={filteredAssets}
            searchKey={(a) => `${a.name} ${a.asset_type} ${a.serial_number} ${a.manufacturer}`}
            searchPlaceholder="Search by name, serial number, type, or OEM..."
            pageSize={10}
            emptyMessage="No equipment matching selected filters."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        )}
      </div>

      <CreateAssetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => refetch()}
        organizations={organizations}
        sites={sites}
      />
    </AppShell>
  );
}
