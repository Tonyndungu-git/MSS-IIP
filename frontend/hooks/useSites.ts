'use client';

import { useEffect, useState } from "react";

import { api } from "@/lib/api";

import { Site, CreateSiteInput } from "@/types";


export function useSites() {

  const [sites, setSites] = useState<Site[]>([]);

  const [loading, setLoading] = useState(true);


  async function loadSites() {

    try {

      const data = await api.getSites();

      setSites(data);

    } catch (error) {

      console.error(
        "Failed loading sites",
        error
      );

    } finally {

      setLoading(false);

    }

  }


  async function createSite(siteData: CreateSiteInput) {

    try {

      const newSite = await api.createSite(siteData);


      setSites((currentSites) => [
        ...currentSites,
        newSite
      ]);


      return newSite;


    } catch (error) {

      console.error(
        "Failed creating site",
        error
      );


      throw error;

    }

  }



  useEffect(() => {

    loadSites();

  }, []);



  return {

    sites,

    loading,

    createSite

  };

}