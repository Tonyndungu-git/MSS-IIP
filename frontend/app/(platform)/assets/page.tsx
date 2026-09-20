"use client";

import { useEffect, useState } from "react";

import AssetCard from "@/components/cards/AssetCard";
import Loading from "@/components/ui/Loading";
import EmptyState from "@/components/ui/EmptyState";
import Section from "@/components/ui/Section";

import { getAssets } from "@/lib/api";


export default function Assets() {


    const [assets, setAssets] = useState<any[]>([]);

    const [loading, setLoading] = useState(true);



    useEffect(() => {


        async function loadAssets() {


            try {


                const data = await getAssets();


                setAssets(data);


            }

            catch(error){

                console.error(
                    "Asset loading error:",
                    error
                );

            }


            finally {

                setLoading(false);

            }

        }



        loadAssets();



        const interval = setInterval(
            loadAssets,
            5000
        );



        return () => clearInterval(interval);



    }, []);



    return (

        <div>


            <h1 className="text-4xl font-bold">

                Asset Registry

            </h1>


            <p className="text-slate-400 mt-2">

                Connected intelligent infrastructure

            </p>




            {loading ? (


                <Loading message="Loading infrastructure..." />


            ) : assets.length === 0 ? (


                <EmptyState

                    title="No Assets"

                    description="Register infrastructure to begin monitoring."

                />


            ) : (


                <Section

                    title="Connected Assets"

                    description={`${assets.length} assets registered`}

                >


                    <div className="grid lg:grid-cols-3 gap-6">


                        {assets.map((asset)=>(


                            <AssetCard

                                key={asset.id}

                                asset={asset}

                            />


                        ))}


                    </div>


                </Section>


            )}



        </div>

    );

}