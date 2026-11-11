'use client';

import React, { useState, useMemo } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useOrganizations } from '@/hooks/useOrganizations';
import { Building2, Plus, Globe, Layers, Search, Filter, ShieldCheck, X } from 'lucide-react';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';

export default function OrganizationsPage() {
  const { organizations, loading, error, refetch, createOrganization } = useOrganizations();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('Renewable Energy & Storage');
  const [country, setCountry] = useState('Kenya');
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Extract unique industries for filter
  const industries = useMemo(() => {
    const set = new Set(organizations.map((o) => o.industry).filter(Boolean));
    return Array.from(set);
  }, [organizations]);

  const filteredOrgs = useMemo(() => {
    return organizations.filter((org) => {
      const matchesSearch =
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.industry?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry = selectedIndustry === 'ALL' || org.industry === selectedIndustry;
      return matchesSearch && matchesIndustry;
    });
  }, [organizations, searchTerm, selectedIndustry]);

  const handleCreateOrg = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setFormError(null);
    try {
      await createOrganization({ name, industry, country });
      setName('');
      setIsModalOpen(false);
    } catch (err: any) {
      setFormError(err.message || 'Failed to create organization tenant');
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
                MULTI-TENANT ORGANIZATIONS
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold uppercase">
                {organizations.length} Active Tenants
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Data isolation, physical site clustering and role boundaries managed via FastAPI <code className="text-cyan-400">/organizations/</code>
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold transition-all shadow-lg shadow-cyan-950/40"
          >
            <Plus className="w-4 h-4" />
            <span>Register Organization</span>
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tenant name or country..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 text-xs"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <button
              onClick={() => setSelectedIndustry('ALL')}
              className={`px-2.5 py-1.5 rounded border text-[11px] whitespace-nowrap transition-colors ${
                selectedIndustry === 'ALL'
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-800 font-bold'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              All Industries ({organizations.length})
            </button>
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-2.5 py-1.5 rounded border text-[11px] whitespace-nowrap transition-colors ${
                  selectedIndustry === ind
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-800 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        {loading ? (
          <LoadingState message="Loading tenant organizations from FastAPI..." />
        ) : error ? (
          <ErrorState
            title="Failed to Load Organizations"
            message={error}
            endpoint="/organizations/"
            onRetry={refetch}
          />
        ) : filteredOrgs.length === 0 ? (
          <EmptyState
            icon={Building2}
            title={organizations.length === 0 ? 'No Organizations Found in Database' : 'No Matching Tenants'}
            description={
              organizations.length === 0
                ? 'No organization records were returned from the FastAPI backend. Register your first industrial tenant to begin clustering sites and assets.'
                : 'No tenants match your active search and industry filter criteria.'
            }
            actionLabel="Register Organization"
            onAction={() => setIsModalOpen(true)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredOrgs.map((org) => (
              <div
                key={org.id}
                className="bg-[#070e1e]/90 rounded-lg border border-slate-800 p-5 space-y-4 hover:border-cyan-500/40 transition-all font-mono group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-cyan-400 group-hover:border-cyan-500/50 transition-colors">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white line-clamp-1">{org.name}</h3>
                      <span className="text-[11px] text-cyan-400 font-mono">{org.industry || 'Multi-Industry'}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-400 pt-3 border-t border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-slate-400" />
                      Operating Country:
                    </span>
                    <span className="text-slate-200 font-bold">{org.country || 'Global'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Tenant UUID:</span>
                    <span className="text-slate-400 text-[10px] select-all font-mono">
                      {org.id.slice(0, 16)}...
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for adding organization */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-md bg-[#070e1e] border border-slate-700 rounded-lg p-6 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white uppercase">
                  Register Organization Tenant
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {formError && (
                <div className="p-2.5 bg-rose-950/50 border border-rose-800 rounded text-rose-300 text-xs">
                  {formError}
                </div>
              )}

              <form onSubmit={handleCreateOrg} className="space-y-3">
                <div>
                  <label className="text-slate-400 block mb-1">Company / Entity Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kenya Energy Utilities Ltd."
                    className="w-full px-3 py-2 bg-slate-900 text-slate-100 rounded border border-slate-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Industry Sector *</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 text-slate-100 rounded border border-slate-800 focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="Renewable Energy & Storage">Renewable Energy & Storage (BESS)</option>
                    <option value="Industrial Automation & Robotics">Industrial Automation & Robotics</option>
                    <option value="Water & Wastewater Utilities">Water & Wastewater Utilities</option>
                    <option value="Smart City Infrastructure">Smart City Infrastructure</option>
                    <option value="EV Charging & Mobility Infrastructure">EV Charging & Mobility Infrastructure</option>
                    <option value="Oil, Gas & Chemical Refining">Oil, Gas & Chemical Refining</option>
                    <option value="Telecommunications Network">Telecommunications Network</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Jurisdiction / Country *</label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Kenya, Germany, USA"
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
                    disabled={creating}
                    className="px-4 py-2 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold transition-colors"
                  >
                    {creating ? 'Saving to FastAPI...' : 'Register Tenant'}
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
