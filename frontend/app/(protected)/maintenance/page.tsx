'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useMaintenance } from '@/hooks/useMaintenance';
import { useAssets } from '@/hooks/useAssets';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingState } from '@/components/common/LoadingState';
import { MaintenanceOrder } from '@/types';
import {
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Calendar,
  Plus,
  User,
  FileText,
  Filter,
  X,
  Cpu,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function MaintenancePage() {
  const { orders, loading, dispatchOrder, updateOrderStatus } = useMaintenance();
  const { assets } = useAssets();
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [assetId, setAssetId] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState<MaintenanceOrder['type']>('PREVENTIVE');
  const [priority, setPriority] = useState<MaintenanceOrder['priority']>('P2_HIGH');
  const [assignedTeam, setAssignedTeam] = useState('Certified Field Engineering Team');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const filteredOrders = useMemo(() => {
    if (statusFilter === 'ALL') return orders;
    return orders.filter((o) => o.status === statusFilter);
  }, [orders, statusFilter]);

  const handleDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const selectedAsset = assets.find((a) => a.id === assetId) || assets[0];
      await dispatchOrder({
        asset_id: selectedAsset ? selectedAsset.id : 'asset-01',
        asset_name: selectedAsset ? selectedAsset.name : 'Infrastructure Asset',
        title,
        type,
        priority,
        status: 'PENDING',
        assigned_team: assignedTeam,
        due_date: dueDate || new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10),
        description,
      });

      setIsModalOpen(false);
      setTitle('');
      setDescription('');
    } finally {
      setSubmitting(false);
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
                INDUSTRIAL MAINTENANCE &amp; WORK ORDERS
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold uppercase">
                {orders.length} Registered Orders
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Field technician dispatching, preventive maintenance schedules, and asset downtime management
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold transition-all shadow-lg shadow-cyan-950/40"
          >
            <Plus className="w-4 h-4" />
            <span>Dispatch Work Order</span>
          </button>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 font-mono text-xs overflow-x-auto pb-1">
          <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          {(['ALL', 'PENDING', 'IN_PROGRESS', 'COMPLETED'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded border transition-colors whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-800 font-bold'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {st} {orders.filter((o) => st === 'ALL' || o.status === st).length > 0 && `(${orders.filter((o) => st === 'ALL' || o.status === st).length})`}
            </button>
          ))}
        </div>

        {/* Work Orders List or Empty State */}
        {loading ? (
          <LoadingState message="Loading work order registry..." />
        ) : filteredOrders.length === 0 ? (
          <div className="space-y-6">
            <EmptyState
              icon={Wrench}
              title={orders.length === 0 ? 'No Active Maintenance Work Orders' : 'No Work Orders Match Filter'}
              description={
                orders.length === 0
                  ? 'Infrastructure operates within certified operational thresholds. No corrective or preventive maintenance tickets have been dispatched yet.'
                  : 'There are no work orders matching the selected status filter.'
              }
              actionLabel="Dispatch Work Order"
              onAction={() => setIsModalOpen(true)}
            />

            {/* Maintenance Protocols Overview */}
            <div className="bg-[#070e1e]/90 rounded-lg border border-slate-800 p-5 font-mono text-xs space-y-3">
              <div className="flex items-center gap-2 text-white border-b border-slate-800 pb-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold uppercase tracking-wider">Asset Maintenance Protocol Matrix</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-slate-300">
                <div className="bg-slate-950 p-3 rounded border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">Preventive Service</span>
                  <p className="text-slate-400 text-[11px]">Routine scheduled filter replacement, insulation tests, torque audits, and firmware updates.</p>
                </div>
                <div className="bg-slate-950 p-3 rounded border border-slate-800">
                  <span className="text-amber-400 font-bold block mb-1">Corrective Remediation</span>
                  <p className="text-slate-400 text-[11px]">Dispatched upon threshold breach (e.g. thermal junction overheat or cell voltage imbalance).</p>
                </div>
                <div className="bg-slate-950 p-3 rounded border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">AI-Assisted Autonomous</span>
                  <p className="text-slate-400 text-[11px]">Dynamic cell balancing cycles and load curtailment dispatches by background optimization agents.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-[#070e1e]/90 rounded-lg border border-slate-800 p-5 font-mono space-y-3 hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-400 font-bold text-xs">
                      {order.id}
                    </span>
                    <span className="text-sm font-bold text-white">{order.title}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      order.priority === 'P1_CRITICAL'
                        ? 'bg-rose-950 text-rose-300 border-rose-800'
                        : order.priority === 'P2_HIGH'
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : 'bg-slate-900 text-slate-300 border-slate-700'
                    }`}>
                      {order.priority}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      order.status === 'COMPLETED'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : order.status === 'IN_PROGRESS'
                        ? 'bg-cyan-950 text-cyan-300 border-cyan-800'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Target: <strong className="text-white">{order.asset_name}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Assigned: <strong className="text-slate-300">{order.assigned_team}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Target Date: <strong className="text-slate-300">{order.due_date}</strong></span>
                  </div>
                </div>

                {order.description && (
                  <p className="text-xs text-slate-400 pt-1 border-t border-slate-800/40">
                    {order.description}
                  </p>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                  <span className="text-[10px] text-slate-500">
                    Type: {order.type} • Created: {new Date(order.created_at).toLocaleDateString()}
                  </span>

                  <div className="flex items-center gap-2">
                    {order.status !== 'COMPLETED' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'COMPLETED')}
                        className="px-2.5 py-1 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 text-[11px] font-bold"
                      >
                        Mark Completed
                      </button>
                    )}
                    {order.status === 'PENDING' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'IN_PROGRESS')}
                        className="px-2.5 py-1 rounded bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 text-[11px] font-bold"
                      >
                        Start Service
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for dispatching work order */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-lg bg-[#070e1e] border border-slate-700 rounded-lg p-6 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white uppercase">
                  Dispatch Field Maintenance Work Order
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleDispatch} className="space-y-3">
                <div>
                  <label className="text-slate-400 block mb-1">Target Infrastructure Asset *</label>
                  {assets.length > 0 ? (
                    <select
                      value={assetId || assets[0].id}
                      onChange={(e) => setAssetId(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 text-slate-100 rounded border border-slate-800 focus:outline-none focus:border-cyan-500 cursor-pointer"
                    >
                      {assets.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name} [{a.asset_type}] (SN: {a.serial_number})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="text-amber-400 py-1">No assets in database. Register assets first.</div>
                  )}
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Work Order Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Heatsink Air Filter Replacement & Torque Audit"
                    className="w-full px-3 py-2 bg-slate-900 text-slate-100 rounded border border-slate-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">Service Type *</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-900 text-slate-100 rounded border border-slate-800 focus:outline-none focus:border-cyan-500 cursor-pointer"
                    >
                      <option value="PREVENTIVE">PREVENTIVE</option>
                      <option value="CORRECTIVE">CORRECTIVE</option>
                      <option value="CALIBRATION">CALIBRATION</option>
                      <option value="OVERHAUL">OVERHAUL</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">SLA Priority *</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-900 text-slate-100 rounded border border-slate-800 focus:outline-none focus:border-cyan-500 cursor-pointer"
                    >
                      <option value="P1_CRITICAL">P1 - Critical (24h)</option>
                      <option value="P2_HIGH">P2 - High (72h)</option>
                      <option value="P3_MEDIUM">P3 - Medium (7 Days)</option>
                      <option value="P4_LOW">P4 - Low (Routine)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">Assigned Unit *</label>
                    <input
                      type="text"
                      required
                      value={assignedTeam}
                      onChange={(e) => setAssignedTeam(e.target.value)}
                      placeholder="e.g. Field Team A"
                      className="w-full px-3 py-2 bg-slate-900 text-slate-100 rounded border border-slate-800 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Due Date *</label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 text-slate-100 rounded border border-slate-800 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Operational Instructions &amp; SOP</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter diagnostic steps, lock-out/tag-out (LOTO) requirements, and replacement part numbers..."
                    className="w-full px-3 py-2 bg-slate-900 text-slate-100 rounded border border-slate-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-3 py-2 rounded bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || assets.length === 0}
                    className="px-4 py-2 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Dispatching...' : 'Dispatch Order'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
