'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  LayoutDashboard,
  Building2,
  MapPin,
  Cpu,
  Activity,
  Wrench,
  BrainCircuit,
  FileText,
  Settings,
  Zap,
  Layers,
  Radio,
  Network,
  Gauge,
  Factory,
  Car
} from 'lucide-react';

import { api, HealthResponse } from '@/lib/api';



export const Sidebar: React.FC = () => {


  const pathname = usePathname();


  const [
    activeModule,
    setActiveModule
  ] = useState<
    'ALL' | 'ENERGY' | 'INDUSTRY' | 'MOBILITY'
  >('ALL');



  const [
    healthStatus,
    setHealthStatus
  ] = useState<HealthResponse | null>(null);





  useEffect(()=>{

    let mounted = true;


    const checkHealth = async()=>{

      try{

        const response =
          await api.getHealth();


        if(mounted){

          setHealthStatus(response);

        }


      }catch{

        if(mounted){

          setHealthStatus(null);

        }

      }

    };



    checkHealth();



    const interval =
      setInterval(
        checkHealth,
        20000
      );



    return ()=>{

      mounted=false;

      clearInterval(interval);

    };


  },[]);






  const navItems = [


    {
      name:'Dashboard',
      href:'/dashboard',
      icon:LayoutDashboard
    },


    {
      name:'Organizations',
      href:'/organizations',
      icon:Building2
    },


    {
      name:'Physical Sites',
      href:'/sites',
      icon:MapPin
    },


    {
      name:'Assets Registry',
      href:'/assets',
      icon:Cpu
    },


    {
      name:'Edge Gateway',
      href:'/gateway',
      icon:Network,
      badge:'MVP'
    },


    {
      name:'Telemetry',
      href:'/telemetry',
      icon:Activity
    },


    {
      name:'Operational Intelligence',
      href:'/analytics',
      icon:BrainCircuit
    },


    {
      name:'Maintenance',
      href:'/maintenance',
      icon:Wrench
    },


    {
      name:'Reports',
      href:'/reports',
      icon:FileText
    },


    {
      name:'Settings',
      href:'/settings',
      icon:Settings
    }


  ];





return (

<aside

className="
w-64
bg-[#030816]
border-r
border-slate-800/90
flex
flex-col
justify-between
h-screen
sticky
top-0
select-none
z-30
shrink-0
"

>



<div>




{/* BRAND */}

<div

className="
p-4
border-b
border-slate-800/90
bg-[#020617]/90
"

>


<div className="flex items-center gap-3">


<div

className="
w-9
h-9
rounded-md
bg-gradient-to-br
from-cyan-500
to-blue-700
flex
items-center
justify-center
shadow-lg
shadow-cyan-950/50
border
border-cyan-400/40
"

>

<Zap

className="
w-5
h-5
text-slate-950
"

/>

</div>





<div>


<div className="flex items-center gap-1.5">


<span

className="
font-mono
text-sm
font-black
tracking-wider
text-white
"

>

M SYNAPSES

</span>



<span

className="
text-[10px]
font-mono
px-1
rounded
bg-cyan-950
text-cyan-400
border
border-cyan-800/60
font-semibold
"

>

SYSTEMS

</span>


</div>



<p

className="
text-[10px]
font-mono
tracking-tight
text-slate-400
uppercase
"

>

Industrial Intelligence Platform

</p>


</div>


</div>


</div>








{/* DOMAIN SELECTOR */}


<div

className="
p-3
border-b
border-slate-800/70
bg-[#070e20]/60
"

>


<div

className="
flex
items-center
justify-between
text-[10px]
font-mono
uppercase
text-slate-400
mb-1.5
"

>


<span

className="
flex
items-center
gap-1
"

>


<Layers

className="
w-3
h-3
text-cyan-400
"

/>


Domain

</span>


<span

className="
text-cyan-400
font-bold
"

>

MSS MVP

</span>


</div>





<div

className="
grid
grid-cols-4
gap-1
bg-slate-950/80
p-1
rounded
border
border-slate-800
text-[10px]
font-mono
"

>


{
[
{
id:'ALL',
label:'ALL'
},
{
id:'ENERGY',
label:'ENG',
icon:Gauge
},
{
id:'INDUSTRY',
label:'IND',
icon:Factory
},
{
id:'MOBILITY',
label:'MOB',
icon:Car
}

].map((item:any)=>{


const Icon=item.icon;



return (

<button

key={item.id}

onClick={()=>
setActiveModule(item.id)
}

className={

`
py-1
rounded
flex
items-center
justify-center
gap-0.5
transition-colors
${
activeModule===item.id

?

'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'

:

'text-slate-400 hover:text-slate-200'

}
`

}

>


{
Icon &&

<Icon className="w-3 h-3"/>

}


{item.label}


</button>


)


})

}


</div>


</div>









{/* NAVIGATION */}



<nav

className="
p-3
space-y-1
overflow-y-auto
max-h-[calc(100vh-270px)]
"

>


{
navItems.map(item=>{


const Icon=item.icon;


const active =

pathname===item.href ||

(
item.href!=='/dashboard' &&
pathname.startsWith(item.href)
);



return (

<Link

key={item.name}

href={item.href}

className={

`
flex
items-center
justify-between
px-3
py-2
rounded-md
text-xs
font-mono
transition-all
group

${
active

?

'bg-cyan-950/60 text-cyan-300 border border-cyan-800/60'

:

'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'

}

`

}

>


<div

className="
flex
items-center
gap-2.5
"

>


<Icon

className={

`
w-4
h-4

${
active
?
'text-cyan-400'
:
'text-slate-500 group-hover:text-slate-300'
}

`

}


/>


<span>

{item.name}

</span>


</div>





{
item.badge &&

<span

className="
text-[10px]
px-1.5
rounded
bg-cyan-900/70
text-cyan-300
border
border-cyan-700/60
"

>

{item.badge}

</span>

}



</Link>


)


})

}


</nav>



</div>









{/* FOOTER */}



<div

className="
p-3
border-t
border-slate-800/90
bg-[#020617]
"

>


<div

className="
p-2.5
rounded
bg-slate-950/90
border
border-slate-800/80
space-y-2
"

>



<div

className="
flex
items-center
justify-between
"

>


<span

className="
text-[10px]
uppercase
text-slate-500
flex
items-center
gap-1.5
"

>


<Radio

className="
w-3
h-3
text-cyan-400
animate-pulse
"

/>


MSS Core API


</span>



<span

className={

`
text-[10px]
font-bold
px-1.5
rounded

${
healthStatus?.status==="ok"

?

'bg-emerald-950 text-emerald-400 border border-emerald-800'

:

'bg-amber-950 text-amber-400 border border-amber-800'

}

`

}

>

{
healthStatus?.status==="ok"
?
'ONLINE'
:
'CHECK'
}

</span>


</div>







<div

className="
text-[10px]
text-slate-400
flex
justify-between
"

>


<span className="text-slate-500">

Latency

</span>


<span className="text-slate-300 font-bold">

{
healthStatus?.latency_ms ?? '--'
}

ms

</span>


</div>






<div

className="
text-[9px]
text-slate-500
border-t
border-slate-900
pt-1
truncate
"

>

Endpoint: api.msynapses.co.ke

</div>



</div>


</div>





</aside>


);


};