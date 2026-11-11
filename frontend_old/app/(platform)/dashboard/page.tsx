"use client";


import {
    useEffect,
    useState
} from "react";


import Section from "@/components/ui/Section";
import MetricCard from "@/components/cards/MetricCard";
import Loading from "@/components/ui/Loading";
import Badge from "@/components/ui/Badge";


import {
    getAssets
} from "@/lib/api";



export default function Dashboard(){


const [assets,setAssets]=
useState<any[]>([]);


const [loading,setLoading]=
useState(true);



async function load(){


    try{


        const data =
        await getAssets();


        setAssets(data);


    }

    catch(error){

        console.error(error);

    }

    finally{

        setLoading(false);

    }

}




useEffect(()=>{


    load();


    const interval =
    setInterval(
        load,
        5000
    );


    return ()=>clearInterval(interval);


},[]);





if(loading){

    return (

        <Loading

        message="Loading MSS intelligence platform..."

        />

    );

}





const onlineAssets =
assets.filter(
a=>a.status==="ONLINE"
).length;



const faultAssets =
assets.filter(
a=>a.status==="FAULT"
).length;



const averageHealth =
assets.length
?
Math.round(

assets.reduce(

(sum,a)=>
sum+(a.health_score ?? 0)

,0)

/
assets.length

)
:
0;





return (

<div className="space-y-10">



<div>

<h1 className="
text-5xl
font-bold
">

Infrastructure Command Center

</h1>


<p className="
text-slate-400
mt-3
text-lg
">

Real-time operational intelligence across connected assets

</p>


</div>





<Section

title="Live Infrastructure KPIs"

description="Current platform state"

>


<div className="
grid
md:grid-cols-4
gap-6
">


<MetricCard

title="Assets"

value={assets.length}

unit="Total"

/>



<MetricCard

title="Online"

value={onlineAssets}

unit="Systems"

/>



<MetricCard

title="Faults"

value={faultAssets}

unit="Alerts"

/>



<MetricCard

title="Health"

value={averageHealth}

unit="%"

/>



</div>


</Section>







<Section

title="Active Assets"

description="Connected infrastructure registry"

>


<div className="
grid
lg:grid-cols-3
gap-6
">


{

assets.map(asset=>(


<div

key={asset.id}

className="
bg-slate-900
border
border-slate-800
rounded-xl
p-6
"

>


<div className="
flex
justify-between
">


<h3 className="
font-bold
text-xl
">

{asset.name}

</h3>


<Badge

status={asset.status}

/>


</div>



<p className="
text-slate-400
mt-2
">

{asset.asset_type}

</p>



<div className="
grid
grid-cols-2
gap-4
mt-6
">


<MetricCard

title="Power"

value={
asset.telemetry?.power_kw ?? "--"
}

unit="kW"

/>



<MetricCard

title="Health"

value={
asset.health_score ?? "--"
}

unit="%"

/>


</div>



</div>


))


}


</div>


</Section>






<Section

title="Live Telemetry Feed"

description="Latest asset signals"

>


<div className="
bg-slate-900
border
border-slate-800
rounded-xl
p-6
space-y-4
">


{

assets.map(asset=>(


<div

key={asset.id}

className="
flex
justify-between
border-b
border-slate-800
pb-4
"

>


<div>

<p className="font-semibold">

{asset.name}

</p>


<p className="
text-slate-400
text-sm
">

Last telemetry update

</p>


</div>



<p className="
text-cyan-400
font-bold
">

{
asset.telemetry?.power_kw ?? "--"
}

 kW

</p>


</div>


))


}



</div>


</Section>







<Section

title="AI Infrastructure Insight"

description="Machine intelligence layer"

>


<div className="
bg-slate-900
border
border-slate-800
rounded-xl
p-8
">


<h3 className="text-xl font-bold">

Operational Intelligence

</h3>


<p className="
text-slate-400
mt-3
">

MSS AI agents will analyse telemetry,
predict failures, optimise operations and support infrastructure investment decisions.

</p>


</div>


</Section>





</div>


);


}