'use client';

import { useEffect, useState } from "react";

import { api } from "@/lib/api";

import { Site } from "@/types";


export function useSites() {


  const [
    sites,
    setSites
  ] = useState<Site[]>([]);



  const [
    loading,
    setLoading
  ] = useState(true);





  useEffect(()=>{


    async function loadSites(){


      try{


        const data =
          await api.getSites();



        setSites(data);



      }

      catch(error){


        console.error(
          "Failed loading sites",
          error
        );


      }

      finally{


        setLoading(false);


      }


    }



    loadSites();



  },[]);





  return {

    sites,

    loading

  };


}