"use client";

import { useParams } from "next/navigation";
import { useState } from "react";


const API = "http://127.0.0.1:8000";


export default function ConfigureTelemetryPage(){

    const params = useParams();

    const assetId = params.id as string;


    const [metrics,setMetrics] = useState([
        {
            metric_name:"Voltage",
            unit:"V"
        },
        {
            metric_name:"Current",
            unit:"A"
        },
        {
            metric_name:"Temperature",
            unit:"°C"
        }
    ]);


    const [newMetric,setNewMetric] = useState({
        metric_name:"",
        unit:""
    });


    const [message,setMessage] = useState("");



    function addMetric(){

        if(!newMetric.metric_name || !newMetric.unit)
            return;


        setMetrics([
            ...metrics,
            newMetric
        ]);


        setNewMetric({
            metric_name:"",
            unit:""
        });

    }



    async function saveConfiguration(){


        const response = await fetch(
            `${API}/asset-metrics/setup`,
            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    asset_id:assetId,

                    metrics:metrics

                })

            }
        );


        const data = await response.json();


        setMessage(
            `✓ ${data.message}. ${data.metrics_created} metrics configured`
        );


    }



return (

<div className="p-8">


<h1 className="text-3xl font-bold">
Configure Asset Telemetry
</h1>



<div className="mt-6 border rounded-xl p-5">

<h2 className="text-xl font-semibold">
Asset
</h2>


<p>
ID: {assetId}
</p>


<p className="mt-2">
Configure the measurements this asset produces.
</p>


</div>




<div className="mt-8">


<h2 className="text-xl font-semibold">
Configured Metrics
</h2>



{
metrics.map((metric,index)=>(

<div 
key={index}
className="flex gap-4 mt-3"
>


<input
className="border rounded p-2"
value={metric.metric_name}
readOnly
/>


<input
className="border rounded p-2"
value={metric.unit}
readOnly
/>


</div>


))
}


</div>




<div className="mt-8">


<h2 className="font-semibold">
Add New Measurement
</h2>



<div className="flex gap-3 mt-3">


<input
className="border rounded p-2"
placeholder="Metric"
value={newMetric.metric_name}

onChange={(e)=>
setNewMetric({
...newMetric,
metric_name:e.target.value
})
}

/>



<input
className="border rounded p-2"
placeholder="Unit"

value={newMetric.unit}

onChange={(e)=>
setNewMetric({
...newMetric,
unit:e.target.value
})
}

/>


<button

onClick={addMetric}

className="bg-blue-600 text-white px-4 rounded"

>
+
</button>



</div>


</div>




<button

onClick={saveConfiguration}

className="mt-8 bg-green-600 text-white px-6 py-3 rounded"

>

Save Configuration

</button>



<p className="mt-4 text-green-600">

{message}

</p>



</div>

)

}