'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useSites } from '@/hooks/useSites';
import { useOrganizations } from '@/hooks/useOrganizations';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingState } from '@/components/common/LoadingState';
import { MapPin, Plus, Navigation, Globe, Building2, Server, X, Compass } from 'lucide-react';

export default function SitesPage() {
  const { sites, loading: sitesLoading, createSite } = useSites();
  const { organizations, loading: orgsLoading } = useOrganizations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('-1.286389');
  const [longitude, setLongitude] = useState('36.817223');
  const [orgId, setOrgId] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateSite = async (e: React.FormEvent) => {
  e.preventDefault();

  setCreating(true);
  setError(null);

  try {

    if (!orgId) {
      throw new Error("Please select a parent organization.");
    }

    await createSite({
      name,
      location,
      latitude: Number(latitude),
      longitude: Number(longitude),
      organization_id: orgId,
    });

    setIsModalOpen(false);

    setName('');
    setLocation('');
    setLatitude('-1.286389');
    setLongitude('36.817223');
    setOrgId('');

  } catch(err:any){

    setError(
      err?.message || "Failed to create physical site"
    );

  } finally {

    setCreating(false);

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
                PHYSICAL INFRASTRUCTURE SITES
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold uppercase">
                {sites.length} Geocoded Sites
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Geospatial facility topology, substation bounds, and edge cluster gateways via FastAPI <code className="text-cyan-400">/sites/</code>
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold transition-all shadow-lg shadow-cyan-950/40"
          >
            <Plus className="w-4 h-4" />
            <span>Provision Site</span>
          </button>
        </div>

        {/* Sites Content or Empty State */}
        {sitesLoading ? (
          <LoadingState message="Loading site registry..." />
        ) : sites.length === 0 ? (
          <div className="space-y-6">
            <EmptyState
              icon={MapPin}
              title="No Physical Installation Sites Registered Yet"
              description="Physical infrastructure sites define where assets and edge gateways operate geographically. Provision your first facility location to bind equipment coordinates and SCADA telemetry."
              actionLabel="Provision First Site"
              onAction={() => setIsModalOpen(true)}
            />

            {/* Industrial Topology Blueprint Guide */}
            <div className="bg-[#070e1e]/90 rounded-lg border border-slate-800 p-5 font-mono text-xs space-y-3">
              <div className="flex items-center gap-2 text-white border-b border-slate-800 pb-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold uppercase tracking-wider">Site Hierarchy Architecture</h3>
              </div>
              <p className="text-slate-400">
                In M Synapses Systems, physical sites form the root geospatial container for assets, power metering, and edge IoT gateways:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-slate-300">
                <div className="bg-slate-950/80 p-3 rounded border border-slate-800">
                  <span className="text-cyan-400 block font-bold mb-1">1. Multi-Tenant Organization</span>
                  <p className="text-slate-400 text-[11px]">Commercial entity isolating asset ownership and operational access boundaries.</p>
                </div>
                <div className="bg-slate-950/80 p-3 rounded border border-slate-800">
                  <span className="text-emerald-400 block font-bold mb-1">2. Physical Site Facility</span>
                  <p className="text-slate-400 text-[11px]">Substation, factory floor, solar farm, or urban depot with fixed GPS coordinates.</p>
                </div>
                <div className="bg-slate-950/80 p-3 rounded border border-slate-800">
                  <span className="text-purple-400 block font-bold mb-1">3. Edge Gateways & Assets</span>
                  <p className="text-slate-400 text-[11px]">Modbus/MQTT edge concentrators streaming timeseries telemetry to the cloud API.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Grid of registered sites */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {sites.map((site) => (
                <div
                  key={site.id}
                  className="bg-[#070e1e]/90 rounded-lg border border-slate-800 p-5 space-y-4 hover:border-cyan-500/40 transition-all font-mono"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white line-clamp-1">{site.name}</h3>
                        <span className="text-[11px] text-slate-400 font-mono">{site.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-400 pt-3 border-t border-slate-800/80">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Navigation className="w-3.5 h-3.5 text-slate-400" />
                        Coordinates:
                      </span>
                      <span className="text-cyan-400 font-bold">
                        {site.latitude.toFixed(4)}, {site.longitude.toFixed(4)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Site ID:</span>
                      <span className="text-slate-400 text-[10px] select-all font-mono">
                        {site.id}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal for adding site */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-md bg-[#070e1e] border border-slate-700 rounded-lg p-6 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white uppercase">
                  Provision Physical Infrastructure Site
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {error && (
                <div className="p-2.5 bg-rose-950/50 border border-rose-800 rounded text-rose-300 text-xs">
                  {error}
                </div>
              )}

              <form onSubmit={handleCreateSite} className="space-y-3">
                <div>
                  <label className="text-slate-400 block mb-1">Site / Facility Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Athi River BESS Grid Substation"
                    className="w-full px-3 py-2 bg-slate-900 text-slate-100 rounded border border-slate-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Physical Location / Region *</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Machakos County, Kenya"
                    className="w-full px-3 py-2 bg-slate-900 text-slate-100 rounded border border-slate-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">Latitude (GPS) *</label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 text-slate-100 rounded border border-slate-800 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Longitude (GPS) *</label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 text-slate-100 rounded border border-slate-800 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Parent Tenant Organization *</label>
                  {orgsLoading ? (
                    <div className="text-slate-500 py-1">Loading organizations...</div>
                  ) : organizations.length > 0 ? (
                    <select
                      value={orgId || organizations[0].id}
                      onChange={(e) => setOrgId(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 text-slate-100 rounded border border-slate-800 focus:outline-none focus:border-cyan-500 cursor-pointer"
                    >
                      {organizations.map((org) => (
                        <option key={org.id} value={org.id}>
                          {org.name} ({org.country || 'Global'})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="text-amber-400 text-[11px]">
                      No organizations found. Please create an organization first.
                    </div>
                  )}
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
                    disabled={creating || organizations.length === 0}
                    className="px-4 py-2 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold transition-colors disabled:opacity-50"
                  >
                    {creating ? 'Saving to FastAPI...' : 'Provision Site'}
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
