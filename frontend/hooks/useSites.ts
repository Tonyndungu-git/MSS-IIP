'use client';

import { useEffect, useState } from "react";

import { api } from "@/lib/api";

import { Site, CreateSiteInput } from "@/types";


export function useSites() {

  const [sites, setSites] = useState<Site[]>([]);

  const [loading, setLoading] = useState(true);



  async function loadSites() {

    try {

      setLoading(true);

      const data = await api.getSites();

      setSites(
        Array.isArray(data)
          ? data
          : []
      );


    } catch(error) {

      console.error(
        "Failed loading sites",
        error
      );


    } finally {

      setLoading(false);

    }

  }



  async function createSite(
    siteData: CreateSiteInput
  ) {

    const newSite =
      await api.createSite(siteData);


    setSites(current => [
      ...current,
      newSite
    ]);


    return newSite;

  }



  useEffect(()=>{

    loadSites();

  },[]);



  return {

    sites,

    loading,

    loadSites,

    createSite

  };

}