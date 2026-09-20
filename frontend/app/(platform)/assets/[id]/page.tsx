"use client";


import { useEffect, useState } from "react";

import { useParams } from "next/navigation";


import Loading from "@/components/ui/Loading";
import EmptyState from "@/components/ui/EmptyState";
import Badge from "@/components/ui/Badge";
import Section from "@/components/ui/Section";

import MetricCard from "@/components/cards/MetricCard";

import { getAsset } from "@/lib/api";



export default function DigitalTwin() {


    const { id } = useParams();


    const [asset,setAsset] = useState<any>(null);


    const [loading,setLoading] = useState(true);




    useEffect(()=>{



        async function loadAsset(){



            try{


                const data = await getAsset(
                    id as string
                );


                setAsset(data);



            }


            catch(error){


                console.error(
                    "Digital Twin error:",
                    error
                );


            }


            finally{


                setLoading(false);


            }


        }




        if(id){


            loadAsset();



            const interval = setInterval(
                loadAsset,
                3000
            );



            return ()=>clearInterval(interval);


        }



    },[id]);







    if(loading){


        return (

            <Loading message="Loading Digital Twin..." />

        );


    }






    if(!asset){


        return (

            <EmptyState

                title="Asset not found"

                description="The requested Digital Twin does not exist."

            />

        );


    }







    return (

        <div>



            <div className="flex justify-between items-center">


                <div>


                    <h1 className="text-5xl font-bold">

                        {asset.name}

                    </h1>


                    <p className="text-slate-400 mt-2">

                        {asset.asset_type}

                    </p>


                </div>




                <Badge

                    status={asset.status}

                />



            </div>







            <Section

                title="Operational Metrics"

                description="Current infrastructure state"

            >


                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">



                    <MetricCard

                        title="Power"

                        value={
                            asset.telemetry?.power_kw ?? "--"
                        }

                        unit="kW"

                    />



                    <MetricCard

                        title="Temperature"

                        value={
                            asset.telemetry?.temperature ?? "--"
                        }

                        unit="°C"

                    />



                    <MetricCard

                        title="Energy"

                        value={
                            asset.telemetry?.energy_kwh ?? "--"
                        }

                        unit="kWh"

                    />



                    <MetricCard

                        title="Health"

                        value={
                            asset.health_score ?? "--"
                        }

                        unit="%"

                    />


                </div>


            </Section>







            <Section

                title="AI Infrastructure Insight"

                description="Operational intelligence"

            >



                <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">


                    <p className="text-lg">


                        Infrastructure operating normally.


                    </p>



                    <p className="mt-4 text-slate-400">


                        Latest telemetry indicates stable operational behaviour.
                        MSS intelligence services will continuously analyse
                        performance and detect future anomalies.


                    </p>



                </div>


            </Section>





        </div>

    );


}