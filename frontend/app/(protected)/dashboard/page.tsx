'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { AppShell } from '@/components/layout/AppShell';
import { DashboardCard } from '@/components/common/DashboardCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { HealthIndicator } from '@/components/common/HealthIndicator';
import { TelemetryChart } from '@/components/telemetry/TelemetryChart';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { PageHeader } from '@/components/common/PageHeader';
import { CreateAssetModal } from '@/components/assets/CreateAssetModal';

import { useAssets } from '@/hooks/useAssets';
import { useHealth } from '@/hooks/useHealth';
import { useOrganizations } from '@/hooks/useOrganizations';
import { useTelemetry } from '@/hooks/useTelemetry';
import { useSites } from '@/hooks/useSites';

import {
  Cpu,
  Activity,
  ShieldCheck,
  AlertTriangle,
  Server,
  ChevronRight,
  RefreshCw,
  Plus,
  CheckCircle2,
  Zap,
} from 'lucide-react';


export default function DashboardPage() {


  const {
    assets,
    loading: assetsLoading,
    error: assetsError,
    refetch: refetchAssets
  } = useAssets();



  const {
    health,
    refetch: refetchHealth
  } = useHealth(15000);



  const {
    organizations
  } = useOrganizations();



  const {
    sites,
    loading: sitesLoading,
    refetch: refetchSites
  } = useSites();




  const telemetryAssetId =
    assets.length > 0
      ? assets[0].id
      : null;



  const {
    telemetry,
    refetch: refetchTelemetry
  } =
    useTelemetry(
      telemetryAssetId,
      true,
      5000
    );




  const [isModalOpen,setIsModalOpen] =
    useState(false);



  const [refreshing,setRefreshing] =
    useState(false);




  const handleManualRefresh =
    async () => {

      setRefreshing(true);


      await Promise.all([
        refetchAssets(),
        refetchHealth(),
        refetchTelemetry(),
        refetchSites()
      ]);


      setRefreshing(false);

    };




  const totalAssets =
    assets.length;




  const activeAssets =
    assets.filter(
      asset =>
        [
          "ACTIVE",
          "REGISTERED",
          "ONLINE"
        ].includes(
          (asset.status || "")
            .toUpperCase()
        )
    ).length;




  const avgHealth =
    totalAssets > 0
      ?
        Math.round(
          assets.reduce(
            (sum,asset)=>
              sum +
              (
                asset.health_score ??
                95
              ),
            0
          )
          /
          totalAssets
        )
      :
        null;




  const degradedAssets =
    assets.filter(
      asset =>
        (
          asset.health_score !== undefined &&
          asset.health_score < 85
        )
        ||
        asset.status === "WARNING"
        ||
        asset.status === "CRITICAL"
    );




  const hasTelemetryFrames =
    telemetry &&
    Array.isArray(
      telemetry.telemetry
    )
    &&
    telemetry.telemetry.length > 0;

  return (

<AppShell>

<div className="space-y-6">


<PageHeader
title="OPERATIONAL COMMAND CENTER"
subtitle="Real-time telemetry ingestion, asset state vectors & multi-industry infrastructure telemetry"

actions={
<div className="flex items-center gap-2">


<div className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono">

<span
className={`w-2 h-2 rounded-full ${
health?.status === "ok"
? "bg-emerald-400 animate-pulse"
: "bg-amber-400"
}`}
/>


<span className="text-slate-400">
FastAPI Status:
</span>


<span
className={
health?.status === "ok"
?
"text-emerald-400 font-bold"
:
"text-amber-400 font-bold"
}
>

{
health?.status === "ok"
?
"NOMINAL"
:
"CONNECTING"
}

</span>


{
health?.latency_ms &&
(
<span className="text-slate-500 font-mono text-[10px]">
({health.latency_ms}ms)
</span>
)
}

</div>




<button
onClick={handleManualRefresh}
disabled={refreshing}
className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-400"
>

<RefreshCw
className={
`w-4 h-4 ${
refreshing
?
"animate-spin text-cyan-400"
:
""
}`
}
/>

</button>




<button
onClick={()=>setIsModalOpen(true)}
className="flex items-center gap-1.5 px-3 py-2 rounded bg-cyan-500 text-slate-950 font-mono font-bold text-xs"
>

<Plus className="w-3.5 h-3.5"/>

Register Asset

</button>


</div>
}

/>



{
assetsError &&
<ErrorState
title="FastAPI Backend Communication Issue"
message={assetsError}
endpoint="GET /assets/"
onRetry={handleManualRefresh}
/>
}





<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">



<DashboardCard

title="Infrastructure Assets"

value={
assetsLoading
?
"—"
:
totalAssets
}

icon={Cpu}

change={
`${totalAssets} Registered`
}

changeType={
totalAssets
?
"positive"
:
"neutral"
}

subtext="Equipment Registry"

glowColor="cyan"

/>





<DashboardCard

title="Operational Assets"

value={
assetsLoading
?
"—"
:
activeAssets
}

icon={Activity}

change={
totalAssets
?
`${Math.round(
(activeAssets/totalAssets)*100
)}% Online`
:
"Awaiting Registry"
}

changeType={
activeAssets
?
"positive"
:
"neutral"
}

subtext="Active Infrastructure"

glowColor="emerald"

/>





<DashboardCard

title="Fleet Health Index"

value={
avgHealth !== null
?
`${avgHealth}%`
:
"Unavailable"
}

icon={ShieldCheck}

change={
avgHealth && avgHealth >= 90
?
"Optimal Rating"
:
"Review Required"
}

changeType={
avgHealth && avgHealth >=85
?
"positive"
:
"warning"
}

subtext="Calculated from assets"

glowColor={
avgHealth && avgHealth>=85
?
"emerald"
:
"amber"
}

/>





<DashboardCard

title="Active Equipment Alarms"

value={
degradedAssets.length
}

icon={AlertTriangle}

change={
degradedAssets.length
?
`${degradedAssets.length} Requires Attention`
:
"Zero Critical Faults"
}

changeType={
degradedAssets.length
?
"negative"
:
"positive"
}

subtext="Health & status monitoring"

glowColor={
degradedAssets.length
?
"rose"
:
"emerald"
}

/>


</div>





<div className="space-y-3">


<div className="flex items-center justify-between">

<div className="flex items-center gap-2">

<Activity className="w-4 h-4 text-cyan-400"/>

<h2 className="text-sm font-bold font-mono uppercase text-white">

Live High-Frequency Telemetry Stream

</h2>

</div>


<span className="text-xs font-mono text-slate-400">

{
hasTelemetryFrames
?
"STREAM TRANSMITTING"
:
"IDLE / AWAITING GATEWAY"
}

</span>


</div>




{
hasTelemetryFrames

?

<TelemetryChart

data={telemetry.telemetry}

title={
`Asset Stream: ${
telemetry.asset_code || "Telemetry"
}`
}

height={260}

/>


:

<EmptyState

icon="telemetry"

title="No Active Telemetry Frames Transmitting"

description="FastAPI telemetry endpoint is waiting for edge gateway data."

backendEndpointHint="GET /telemetry/latest"

actionText="Open Telemetry Room"

onAction={()=>
window.location.assign("/telemetry")
}

secondaryActionText="Poll Ingestion Core"

onSecondaryAction={refetchTelemetry}

/>

}



</div>





<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


<div className="lg:col-span-2 space-y-4">


<div className="flex items-center justify-between">

<div className="flex items-center gap-2">

<Server className="w-4 h-4 text-cyan-400"/>

<h3 className="text-sm font-bold font-mono uppercase text-white">

Connected Equipment Registry

</h3>

</div>



<Link
href="/assets"
className="text-xs font-mono text-cyan-400"
>

View Full Registry ({totalAssets})

</Link>


</div>





{
assetsLoading

?

<LoadingState label="Loading assets from API"/>


:

assets.length===0

?

<EmptyState
icon="database"
title="No Assets Registered"
description="Register your first infrastructure asset."
actionText="Register Asset"
onAction={()=>setIsModalOpen(true)}
/>


:

<div className="bg-[#070e1e]/90 rounded-xl border border-slate-800 divide-y divide-slate-800">

{
assets.slice(0,6).map(asset=>(


<div
key={asset.id}
className="p-4 flex justify-between items-center"
>


<div>


<Link
href={`/assets/${asset.id}`}
className="text-xs font-bold text-white"
>

{asset.name}

</Link>


<div className="text-[11px] text-slate-400">

{asset.manufacturer}
{" • "}
{asset.model}
{" • SN: "}
{asset.serial_number}

</div>


</div>



<div className="flex gap-3 items-center">

<HealthIndicator
score={asset.health_score ?? 95}
size="compact"
/>


<StatusBadge
status={asset.status}
size="sm"
/>


</div>



</div>


))

}

</div>

}


</div>





<div className="space-y-4">


<h3 className="text-sm font-bold font-mono uppercase text-white">

Operational Alerts Feed

</h3>



{
degradedAssets.length===0

?

<div className="p-6 rounded-xl border border-slate-800 bg-[#070e1e] text-center">


<CheckCircle2 className="mx-auto text-emerald-400"/>


<p className="text-xs font-bold text-white">

All Equipment Nominal

</p>


</div>


:

degradedAssets.map(asset=>(

<div
key={asset.id}
className="p-3 rounded bg-rose-950/20 border border-rose-900"
>

Asset {asset.name} requires inspection.

</div>

))

}





<div className="p-4 rounded-xl border border-cyan-500/30 bg-[#071020]">


<div className="flex justify-between">

<span className="text-xs text-cyan-300 font-mono">

Industrial AI Oversight

</span>


<span className="text-xs text-cyan-300">

Standby

</span>


</div>


<p className="text-xs text-slate-400 mt-2">

Autonomous agents ready for predictive maintenance and infrastructure intelligence.

</p>


<Link
href="/ai"
className="block text-center mt-3 py-2 border border-cyan-500/30 text-cyan-300 text-xs"
>

Enter AI Intelligence Center

</Link>


</div>



</div>



</div>


</div>

<CreateAssetModal
  isOpen={isModalOpen}

  onClose={() =>
    setIsModalOpen(false)
  }

  onSuccess={async () => {

    await refetchAssets();

    await refetchSites();

    setIsModalOpen(false);

  }}

  organizations={
    organizations
  }

  sites={
    sites
  }
/>   

</AppShell>
  );
}