'use client';

import React, { useEffect, useState } from 'react';

import {
  Activity,
  ArrowRight,
  BatteryCharging,
  Bot,
  Building2,
  CheckCircle2,
  Cpu,
  Factory,
  Gauge,
  Layers,
  LineChart,
  Radio,
  Server,
  ShieldCheck,
  Terminal,
  Zap,
} from 'lucide-react';

import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { PlatformButton } from '@/components/auth/PlatformButton';

import { api, HealthResponse } from '@/lib/api';



export default function LandingPage() {


  const [health,setHealth] =
    useState<HealthResponse | null>(null);



  useEffect(()=>{

    api.getHealth()
      .then(setHealth)
      .catch(()=>{

        setHealth({
          status:'connecting',
          service:'MSS API'
        });

      });


  },[]);





  const platformLayers = [

    {
      step:"01",
      title:"Physical Assets",
      icon:Cpu,
      description:
      "Machines, energy systems, batteries, chargers, production equipment and field devices become connected operational assets."
    },

    {
      step:"02",
      title:"Edge Connectivity",
      icon:Radio,
      description:
      "MSS connects industrial devices through gateways, protocols and telemetry pipelines without replacing existing equipment."
    },

    {
      step:"03",
      title:"Operational Intelligence",
      icon:Activity,
      description:
      "Raw equipment data becomes health indicators, trends, alerts and maintenance insights."
    },

    {
      step:"04",
      title:"Decision Support",
      icon:Bot,
      description:
      "AI-assisted analysis helps teams understand failures, performance and operational improvements."
    }

  ];





  const architecture = [

    {
      layer:"Asset Layer",
      tech:"Machines • Batteries • Chargers • Sensors",
      description:
      "Physical equipment producing operational data."
    },


    {
      layer:"Gateway Layer",
      tech:"MQTT • Modbus • REST • Industrial Protocols",
      description:
      "Local connectivity layer translating equipment signals."
    },


    {
      layer:"MSS Data Platform",
      tech:"FastAPI • Database • Telemetry Services",
      description:
      "Secure ingestion, storage and processing of operational information."
    },


    {
      layer:"Intelligence Layer",
      tech:"Analytics • Monitoring • AI Models",
      description:
      "Turning telemetry into useful operational decisions."
    },


    {
      layer:"Operations Workspace",
      tech:"Dashboard • Reports • Maintenance Views",
      description:
      "A unified interface for engineers and operations teams."
    }


  ];





return (

<div
className="
min-h-screen
bg-[#020617]
text-slate-100
"
>


<PublicNavbar />





<section
className="
relative
overflow-hidden
border-b
border-slate-800
py-20
"
>


<div
className="
absolute
inset-0
bg-gradient-to-br
from-cyan-950/30
via-transparent
to-blue-950/20
"
/>



<div
className="
relative
max-w-7xl
mx-auto
px-6
"
>



<div
className="
text-center
max-w-4xl
mx-auto
"
>


<div
className="
inline-flex
items-center
gap-2
px-4
py-2
rounded-full
bg-slate-900
border
border-slate-700
font-mono
text-xs
mb-8
"
>

<span
className="
w-2
h-2
rounded-full
bg-emerald-400
animate-pulse
"
/>


MSS PLATFORM STATUS:

<span
className="
text-cyan-400
"
>

{
health?.status==="ok"
?
"ONLINE"
:
"CONNECTING"
}

</span>


</div>





<h1
className="
text-4xl
md:text-6xl
font-black
font-mono
tracking-tight
"
>

M SYNAPSES SYSTEMS

<span
className="
block
text-transparent
bg-clip-text
bg-gradient-to-r
from-cyan-400
to-blue-500
mt-3
"
>

Intelligent Infrastructure Platform

</span>

</h1>





<p
className="
mt-8
text-lg
text-slate-400
max-w-3xl
mx-auto
leading-relaxed
"
>

A practical infrastructure intelligence platform helping
industries connect equipment, collect operational data,
and improve decisions through telemetry and analytics.

</p>





<div
className="
flex
justify-center
gap-4
mt-10
"
>


<PlatformButton />


<a
href="#architecture"
className="
px-6
py-3
rounded-lg
border
border-slate-700
bg-slate-900
font-mono
text-sm
flex
items-center
gap-2
"
>

<Terminal
className="w-4 h-4 text-cyan-400"
/>

Architecture

</a>


</div>



</div>







<div
className="
mt-16
max-w-5xl
mx-auto
rounded-2xl
border
border-slate-800
bg-[#030816]
overflow-hidden
shadow-2xl
"
>


<div
className="
flex
justify-between
items-center
px-5
py-3
border-b
border-slate-800
bg-slate-950
font-mono
text-xs
"
>


<div
className="
flex
gap-2
items-center
"
>

<span className="w-3 h-3 rounded-full bg-red-500"/>
<span className="w-3 h-3 rounded-full bg-yellow-500"/>
<span className="w-3 h-3 rounded-full bg-green-500"/>

<span
className="
ml-3
text-slate-400
"
>

mss-operation-console

</span>


</div>


<span
className="
text-cyan-400
"
>
TELEMETRY CORE
</span>


</div>





<div
className="
grid
md:grid-cols-4
divide-y
md:divide-y-0
md:divide-x
divide-slate-800
"
>


<div className="p-5">
<p className="text-xs text-slate-500">
Assets
</p>

<p className="text-2xl font-bold font-mono text-white">
Connected
</p>
</div>


<div className="p-5">

<p className="text-xs text-slate-500">
API
</p>

<p className="text-2xl font-bold font-mono text-cyan-400">
FastAPI
</p>

</div>



<div className="p-5">

<p className="text-xs text-slate-500">
Telemetry
</p>

<p className="text-2xl font-bold font-mono text-emerald-400">
Ready
</p>

</div>



<div className="p-5">

<p className="text-xs text-slate-500">
Intelligence
</p>

<p className="text-2xl font-bold font-mono text-blue-400">
Enabled
</p>

</div>


</div>





<div
className="
p-6
bg-[#020617]
font-mono
text-sm
space-y-3
"
>

<p className="text-slate-500">
# MSS telemetry pipeline
</p>


<p className="text-cyan-400">
gateway → ingestion → database → intelligence → dashboard
</p>


<p className="text-emerald-400">
✓ Infrastructure data ready for analysis
</p>


</div>



</div>





</div>


</section>

<section
id="overview"
className="
py-20
border-b
border-slate-800
bg-[#030816]
"
>


<div
className="
max-w-7xl
mx-auto
px-6
"
>


<div
className="
max-w-3xl
mb-12
"
>


<p
className="
text-xs
font-mono
uppercase
tracking-widest
text-cyan-400
"
>
Platform Foundation
</p>


<h2
className="
text-3xl
md:text-4xl
font-bold
font-mono
mt-3
"
>

One Platform.
Multiple Infrastructure Systems.

</h2>



<p
className="
text-slate-400
mt-5
leading-relaxed
"
>

MSS is designed as a flexible intelligence layer.
Instead of building separate systems for every industry,
it provides a common foundation for assets, telemetry,
analytics and operational decisions.

</p>



</div>





<div
className="
grid
md:grid-cols-2
lg:grid-cols-4
gap-5
"
>


{platformLayers.map((item,index)=>{

const Icon=item.icon;


return (

<div
key={index}
className="
p-6
rounded-xl
border
border-slate-800
bg-slate-900/40
hover:border-cyan-500/40
transition
"
>


<div
className="
w-11
h-11
rounded-lg
bg-cyan-950/50
border
border-cyan-900
flex
items-center
justify-center
mb-5
"
>

<Icon
className="
w-5
h-5
text-cyan-400
"
/>

</div>



<h3
className="
font-mono
font-bold
text-white
mb-2
"
>

{item.title}

</h3>



<p
className="
text-sm
text-slate-400
leading-relaxed
"
>

{item.description}

</p>


</div>


)


})}


</div>


</div>

</section>









<section
id="architecture"
className="
py-20
bg-[#020617]
border-b
border-slate-800
"
>


<div
className="
max-w-7xl
mx-auto
px-6
"
>


<div
className="
max-w-3xl
mb-12
"
>


<p
className="
text-xs
uppercase
tracking-widest
font-mono
text-cyan-400
"
>
System Architecture
</p>


<h2
className="
text-3xl
md:text-4xl
font-bold
font-mono
mt-3
"
>

From Equipment Data
to Operational Intelligence

</h2>


<p
className="
text-slate-400
mt-5
"
>

MSS follows an edge-to-intelligence architecture where
industrial systems can progressively become connected
without replacing existing infrastructure.

</p>


</div>







<div
className="
space-y-4
"
>


{architecture.map((layer,index)=>(


<div
key={index}
className="
p-5
rounded-xl
border
border-slate-800
bg-slate-900/50
flex
flex-col
md:flex-row
md:justify-between
gap-4
"
>


<div
className="
flex
gap-4
"
>


<div
className="
w-9
h-9
rounded
bg-cyan-950
border
border-cyan-900
flex
items-center
justify-center
font-mono
text-cyan-400
text-sm
"
>

0{index+1}

</div>



<div>

<h3
className="
font-bold
font-mono
text-white
"
>

{layer.layer}

</h3>


<p
className="
text-sm
text-slate-400
mt-1
"
>

{layer.description}

</p>


</div>


</div>





<div
className="
font-mono
text-xs
text-cyan-300
bg-slate-950
border
border-slate-800
rounded
px-3
py-2
self-start
"
>

{layer.tech}

</div>


</div>


))}


</div>


</div>


</section>









<section
className="
py-20
bg-[#030816]
border-b
border-slate-800
"
>


<div
className="
max-w-7xl
mx-auto
px-6
"
>


<div
className="
grid
md:grid-cols-3
gap-6
"
>



<div
className="
p-7
rounded-xl
border
border-slate-800
bg-slate-900/50
"
>


<Building2
className="
text-cyan-400
mb-4
"
/>


<h3
className="
font-mono
font-bold
text-lg
"
>

Asset Intelligence

</h3>


<p
className="
text-slate-400
text-sm
mt-3
"
>

Register equipment, monitor health,
and understand operational performance.

</p>


</div>





<div
className="
p-7
rounded-xl
border
border-slate-800
bg-slate-900/50
"
>


<Radio
className="
text-cyan-400
mb-4
"
/>


<h3
className="
font-mono
font-bold
text-lg
"
>

Telemetry Connectivity

</h3>


<p
className="
text-slate-400
text-sm
mt-3
"
>

Connect future gateways, sensors and
industrial devices through flexible data pipelines.

</p>


</div>







<div
className="
p-7
rounded-xl
border
border-slate-800
bg-slate-900/50
"
>


<LineChart
className="
text-cyan-400
mb-4
"
/>


<h3
className="
font-mono
font-bold
text-lg
"
>

Operational Analytics

</h3>


<p
className="
text-slate-400
text-sm
mt-3
"
>

Transform equipment data into trends,
alerts and maintenance insights.

</p>


</div>



</div>


</div>


</section>









<section
className="
py-20
bg-[#020617]
"
>


<div
className="
max-w-4xl
mx-auto
px-6
text-center
"
>


<ShieldCheck
className="
mx-auto
w-12
h-12
text-cyan-400
mb-6
"
/>


<h2
className="
text-3xl
font-bold
font-mono
"
>

Build the Operational Intelligence Layer

</h2>


<p
className="
text-slate-400
mt-5
"
>

MSS is evolving from a monitoring platform into a practical
infrastructure intelligence system for growing industries.

</p>



<div
className="
mt-8
flex
justify-center
"
>

<PlatformButton />

</div>


</div>


</section>





<PublicFooter />


</div>

);

}