'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { AppShell } from '@/components/layout/AppShell';

import { useAssets } from '@/hooks/useAssets';
import { useOrganizations } from '@/hooks/useOrganizations';
import { useSites } from '@/hooks/useSites';

import { Asset } from '@/types';

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
  Filter,
  RefreshCw,
  ChevronRight
} from 'lucide-react';



export default function AssetsPage() {


  const {
    assets,
    loading,
    error,
    refetch
  } = useAssets();



  const {
    organizations
  } = useOrganizations();



  const {
    sites,
    loading: sitesLoading,
    loadSites
} = useSites();


  const [viewMode,setViewMode] =
    useState<'table' | 'cards'>('table');



  const [isModalOpen,setIsModalOpen] =
    useState(false);



  const [refreshing,setRefreshing] =
    useState(false);



  const [typeFilter,setTypeFilter] =
    useState<string>('ALL');



  const [statusFilter,setStatusFilter] =
    useState<string>('ALL');





  const handleManualRefresh = async()=>{


    setRefreshing(true);


    await refetch();


    setRefreshing(false);


  };






  const filteredAssets =
    assets.filter((asset)=>{


      const matchesType =
        typeFilter === 'ALL'
        ||
        asset.asset_type === typeFilter;



      const matchesStatus =
        statusFilter === 'ALL'
        ||
        (asset.status || '')
          .toUpperCase()
          ===
        statusFilter.toUpperCase();



      return matchesType && matchesStatus;


    });






  const uniqueTypes =
    Array.from(

      new Set(

        assets
          .map(
            asset=>asset.asset_type
          )
          .filter(Boolean)

      )

    );






  const columns: Column<Asset>[] = [



    {
      key:'name',
      header:'Asset Name & ID',
      sortable:true,

      render:(asset)=>(

        <div className="flex items-center gap-2.5">


          <div className="p-2 rounded bg-slate-900 border border-slate-800 text-cyan-400">

            <Cpu className="w-3.5 h-3.5"/>

          </div>



          <div>


            <Link

              href={`/assets/${asset.id}`}

              className="font-bold text-white hover:text-cyan-300 font-mono transition-colors block text-xs"

            >

              {asset.name}

            </Link>



            <span className="text-[10px] font-mono text-slate-500">

              UUID:
              {' '}
              {asset.id.slice(0,13)}...

            </span>


          </div>


        </div>

      )

    },





    {
      key:'asset_type',
      header:'Asset Type',
      sortable:true,

      render:(asset)=>(

        <span className="font-mono text-xs text-slate-300">

          {asset.asset_type}

        </span>

      )

    },





    {
      key:'manufacturer',
      header:'Manufacturer',
      sortable:true,

      render:(asset)=>(

        <span className="text-slate-300 font-mono text-xs">

          {asset.manufacturer || 'OEM Standard'}

        </span>

      )

    },





    {
      key:'model',
      header:'Model',
      sortable:true,

      render:(asset)=>(

        <span className="text-slate-400 font-mono text-xs">

          {asset.model || 'Standard Unit'}

        </span>

      )

    },





    {
      key:'serial_number',
      header:'Serial Number',
      sortable:true,

      render:(asset)=>(

        <span className="text-cyan-400 font-mono text-xs">

          {asset.serial_number}

        </span>

      )

    },





    {
      key:'status',
      header:'Status',
      sortable:true,

      render:(asset)=>(

        <StatusBadge

          status={asset.status}

          size="sm"

        />

      )

    },





    {
      key:'health_score',
      header:'Health',

      sortable:true,

      render:(asset)=>(

        <HealthIndicator

          score={asset.health_score ?? 95}

          size="compact"

        />

      )

    },





    {
      key:'actions',
      header:'',

      render:(asset)=>(


        <Link

          href={`/assets/${asset.id}`}

          className="p-1 rounded bg-slate-900 text-cyan-400 border border-slate-800"

        >

          <ChevronRight className="w-4 h-4"/>


        </Link>


      )

    }


  ];







  return (

    <AppShell>


      <div className="space-y-6">



        <PageHeader

          title="EQUIPMENT ASSET REGISTRY"

          subtitle="Physical infrastructure registry synchronized with FastAPI /assets/ endpoint"


          badge={

            <span className="text-xs font-mono text-cyan-400">

              {assets.length} Assets

            </span>

          }



          actions={

            <div className="flex gap-2">


              <button

                onClick={handleManualRefresh}

                disabled={refreshing}

                className="p-2 rounded bg-slate-900 border border-slate-800"

              >

                <RefreshCw

                  className={
                    refreshing
                    ?
                    "animate-spin text-cyan-400"
                    :
                    "text-slate-400"
                  }

                />

              </button>



              <button
                onClick={async () => {
                  await loadSites();

                  // Don't allow asset creation if there are no sites
                  if (sites.length === 0) {
                    alert(
                      "No sites found.\n\nPlease create a Site before registering an Asset.\n\nGo to the Sites page and create your first site."
                    );
                    return;
                  }

                  setIsModalOpen(true);
                }}
                className="px-3 py-2 rounded bg-cyan-500 text-black font-bold flex items-center gap-2"
              >
                <Plus size={16} />
                Register Asset
              </button>


            </div>

          }


        />






        {error &&

          <ErrorState

            title="Unable to load assets"

            message={error}

            endpoint="GET /assets/"

            onRetry={handleManualRefresh}

          />

        }






        <div className="bg-slate-900 p-4 rounded border border-slate-800 flex gap-3">


          <Filter className="text-cyan-400"/>



          <select

            value={typeFilter}

            onChange={
              e=>setTypeFilter(e.target.value)
            }

            className="bg-black text-white border rounded px-2"

          >

            <option value="ALL">

              All Types

            </option>


            {
              uniqueTypes.map(type=>(

                <option key={type} value={type}>

                  {type}

                </option>

              ))
            }


          </select>




          <select

            value={statusFilter}

            onChange={
              e=>setStatusFilter(e.target.value)
            }

            className="bg-black text-white border rounded px-2"

          >

            <option value="ALL">

              All Status

            </option>

            <option value="ACTIVE">

              ACTIVE

            </option>


            <option value="REGISTERED">

              REGISTERED

            </option>


          </select>



        </div>






        {
          loading ?

          <LoadingState label="Loading assets..." />


          :


          filteredAssets.length === 0 ?


          <EmptyState

            icon="database"

            title="No Assets Found"

            description="Register your first infrastructure asset."

            actionText="Register Asset"

            onAction={
              ()=>setIsModalOpen(true)
            }

          />


          :



          <DataTable

            columns={columns}

            data={filteredAssets}

            searchKey={
              asset =>
              `${asset.name} ${asset.asset_type} ${asset.serial_number}`
            }

            searchPlaceholder="Search assets..."

            pageSize={10}

          />


        }





      </div>






      <CreateAssetModal


        isOpen={isModalOpen}


        onClose={
          ()=>setIsModalOpen(false)
        }


        onSuccess={
          ()=>refetch()
        }


        organizations={organizations}


        sites={sites}


      />





    </AppShell>

  );

}